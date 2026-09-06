import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/lead/route";
import { resetRateLimit } from "@/lib/rate-limit";

/**
 * Prüft den Weg vom abgeschickten Formular bis zu den beiden Nachrichten.
 * Resend wird dabei nicht wirklich aufgerufen - stattdessen zeichnen wir auf,
 * was gesendet worden wäre.
 */

type Aufruf = { key: string; from: string; to: string[]; subject: string; reply_to?: string };

const gesichert = { ...process.env };
let aufrufe: Aufruf[] = [];

function anfrage(body: Record<string, unknown>, ip = "203.0.113.7") {
  return new Request("https://nova-host.org/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const projekt = {
  type: "projekt",
  company: "Elektro Musterbetrieb GmbH",
  services: ["Neue Website"],
  budget: "1.500-2.500 EUR",
  timeframe: "in 1-3 Monaten",
  name: "Max Mustermann",
  email: "max@example.com",
  consent: true,
};

const analyse = {
  type: "analyse",
  website: "beispiel.de",
  name: "Anna Beispiel",
  email: "anna@example.com",
  consent: true,
};

beforeEach(() => {
  resetRateLimit();
  aufrufe = [];
  process.env.LEAD_MAIL_TO = "ich@nova-host.org";
  process.env.RESEND_API_KEY_ANALYSE = "re_analyse";
  process.env.RESEND_API_KEY_PROJEKT = "re_projekt";
  process.env.LEAD_MAIL_FROM_ANALYSE = "Novahost Analyse <analyse@nova-host.org>";
  process.env.LEAD_MAIL_FROM_PROJEKT = "Novahost <anfrage@nova-host.org>";
  delete process.env.LEAD_WEBHOOK_URL;

  vi.stubGlobal("fetch", async (url: string, init: RequestInit) => {
    const body = JSON.parse(String(init.body));
    aufrufe.push({
      key: String((init.headers as Record<string, string>).Authorization).replace("Bearer ", ""),
      from: body.from,
      to: body.to,
      subject: body.subject,
      reply_to: body.reply_to,
    });
    return new Response(JSON.stringify({ id: "test" }), { status: 200 });
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  process.env = { ...gesichert };
});

describe("POST /api/lead", () => {
  it("schickt beim Erstgespräch zwei Nachrichten mit dem Projekt-Schlüssel", async () => {
    const response = await POST(anfrage(projekt));
    expect(response.status).toBe(200);
    expect(aufrufe).toHaveLength(2);

    const [an_uns, an_kunde] = aufrufe;
    expect(an_uns.key).toBe("re_projekt");
    expect(an_uns.to).toEqual(["ich@nova-host.org"]);
    expect(an_uns.reply_to).toBe("max@example.com");
    expect(an_uns.subject).toContain("Projektanfrage");

    expect(an_kunde.key).toBe("re_projekt");
    expect(an_kunde.from).toBe("Novahost <anfrage@nova-host.org>");
    expect(an_kunde.to).toEqual(["max@example.com"]);
    expect(an_kunde.reply_to).toBe("ich@nova-host.org");
    expect(an_kunde.subject).toContain("Erstgespräch");
  });

  it("nutzt bei der Analyse den anderen Schlüssel und Absender", async () => {
    await POST(anfrage(analyse));
    expect(aufrufe.map((a) => a.key)).toEqual(["re_analyse", "re_analyse"]);
    expect(aufrufe[1].from).toBe("Novahost Analyse <analyse@nova-host.org>");
    expect(aufrufe[1].subject).toContain("Website-Analyse");
  });

  it("setzt das Kennzeichen für die Bestätigungsseite", async () => {
    const response = await POST(anfrage(analyse));
    expect(response.headers.get("set-cookie")).toContain("novahost_anfrage=analyse");
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
  });

  it("meldet einen Fehler, wenn die Benachrichtigung an uns scheitert", async () => {
    vi.stubGlobal("fetch", async () => new Response("nope", { status: 401 }));
    const response = await POST(anfrage(projekt));
    expect(response.status).toBe(502);
  });

  it("gilt trotzdem als angenommen, wenn nur die Bestätigung scheitert", async () => {
    let n = 0;
    vi.stubGlobal("fetch", async () => {
      n += 1;
      return n === 1
        ? new Response("{}", { status: 200 })
        : new Response("nope", { status: 500 });
    });
    const fehler = vi.spyOn(console, "error").mockImplementation(() => {});
    const response = await POST(anfrage(projekt));
    expect(response.status).toBe(200);
    expect(fehler).toHaveBeenCalled();
    fehler.mockRestore();
  });

  it("stellt bei ausgefülltem Honeypot nichts zu", async () => {
    const response = await POST(anfrage({ ...projekt, fax: "bot" }));
    expect(response.status).toBe(200);
    expect(aufrufe).toHaveLength(0);
  });

  it("weist fehlerhafte Angaben ab, ohne zu versenden", async () => {
    const response = await POST(anfrage({ ...projekt, email: "keine-adresse" }));
    expect(response.status).toBe(422);
    expect(aufrufe).toHaveLength(0);
  });

  it("begrenzt die Zahl der Anfragen je Absender", async () => {
    for (let i = 0; i < 5; i += 1) await POST(anfrage(projekt, "198.51.100.4"));
    const response = await POST(anfrage(projekt, "198.51.100.4"));
    expect(response.status).toBe(429);
  });
});
