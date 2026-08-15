/**
 * Prüft den vollständigen Serverpfad bis unmittelbar vor Resend.
 *
 * Statt eines echten Versands wird global.fetch abgefangen: dadurch ist
 * sichtbar, was das SDK tatsächlich an api.resend.com schicken würde —
 * inklusive der Umbenennung von `replyTo` zu `reply_to` in der REST-API.
 * Es geht dabei zu keinem Zeitpunkt eine Anfrage ins Netz.
 */
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import { sendContactEmails } from "@/lib/email/send";
import { emptyContactForm } from "@/lib/validation";
import type { ContactFormValues } from "@/types";

/** Resend nimmt Adressfelder als String oder Array entgegen. */
function addresses(value: unknown): string[] {
  if (typeof value === "string") return [value];
  return Array.isArray(value) ? (value as string[]) : [];
}

interface CapturedRequest {
  url: string;
  authorization: string | null;
  body: Record<string, unknown>;
}

const VALUES: ContactFormValues = {
  ...emptyContactForm,
  name: "Lena Fischer",
  role: "infrastruktur",
  email: "lena@example.com",
  phone: "+49 170 1234567",
  message: "Hallo, wir planen eine Migration im Herbst.",
};

let captured: CapturedRequest[] = [];
let originalFetch: typeof globalThis.fetch;

/** Antwortet wie die Resend-API bei Erfolg — oder scheitert beim n-ten Aufruf. */
function stubFetch(failAtCall: number | null = null): void {
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input as RequestInfo, init);
    const raw = await request.text();

    captured.push({
      url: request.url,
      authorization: request.headers.get("authorization"),
      body: JSON.parse(raw) as Record<string, unknown>,
    });

    if (failAtCall !== null && captured.length === failAtCall) {
      return new Response(
        JSON.stringify({ name: "validation_error", message: "Testfehler" }),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ id: `mail-${captured.length}` }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;
}

describe("sendContactEmails", () => {
  beforeEach(() => {
    captured = [];
    originalFetch = globalThis.fetch;
    process.env.RESEND_API_KEY = "re_test_key_niemals_echt";
    delete process.env.CONTACT_EMAIL_TO;
    mock.method(console, "error", () => {});
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    delete process.env.RESEND_API_KEY;
    mock.restoreAll();
  });

  it("verschickt genau zwei E-Mails und meldet Erfolg", async () => {
    stubFetch();

    const result = await sendContactEmails(VALUES);

    assert.deepEqual(result, { status: "sent" });
    assert.equal(captured.length, 2);
    for (const request of captured) {
      assert.match(request.url, /api\.resend\.com/);
    }
  });

  it("baut die Anfrage an den Betreiber korrekt auf", async () => {
    stubFetch();
    await sendContactEmails(VALUES);

    const owner = captured[0].body;

    assert.equal(owner.from, "Nova Host <hello@novahost.dev>");
    assert.deepEqual(addresses(owner.to), ["hello@novahost.dev"]);
    // Die REST-API erwartet reply_to — hier landet die Besucheradresse.
    assert.deepEqual(addresses(owner.reply_to), ["lena@example.com"]);
    assert.match(String(owner.subject), /Lena Fischer/);
    assert.match(String(owner.html), /Herbst/);
  });

  it("baut die Bestätigung an den Besucher korrekt auf", async () => {
    stubFetch();
    await sendContactEmails(VALUES);

    const visitor = captured[1].body;

    assert.equal(visitor.from, "Nova Host <hello@novahost.dev>");
    assert.deepEqual(addresses(visitor.to), ["lena@example.com"]);
    assert.equal(visitor.reply_to, undefined);
    assert.match(String(visitor.html), /Hallo Lena Fischer,/);
  });

  it("berücksichtigt CONTACT_EMAIL_TO als Empfänger", async () => {
    process.env.CONTACT_EMAIL_TO = "support@novahost.dev";
    stubFetch();

    await sendContactEmails(VALUES);

    assert.deepEqual(addresses(captured[0].body.to), [
      "support@novahost.dev",
    ]);
  });

  it("sendet keine Bestätigung, wenn die Anfrage nicht zugestellt wurde", async () => {
    stubFetch(1);

    const result = await sendContactEmails(VALUES);

    assert.deepEqual(result, { status: "failed", reason: "delivery" });
    assert.equal(captured.length, 1, "die zweite Mail darf nicht rausgehen");
  });

  it("meldet Teilerfolg, wenn nur die Bestätigung scheitert", async () => {
    stubFetch(2);

    const result = await sendContactEmails(VALUES);

    assert.deepEqual(result, { status: "partial" });
    assert.equal(captured.length, 2);
  });

  it("meldet einen Konfigurationsfehler ohne Netzwerkaufruf, wenn der Key fehlt", async () => {
    delete process.env.RESEND_API_KEY;
    stubFetch();

    const result = await sendContactEmails(VALUES);

    assert.deepEqual(result, { status: "failed", reason: "config" });
    assert.equal(captured.length, 0);
  });

  it("behandelt Netzwerkfehler als fehlgeschlagene Zustellung", async () => {
    globalThis.fetch = (async () => {
      throw new TypeError("fetch failed");
    }) as typeof globalThis.fetch;

    const result = await sendContactEmails(VALUES);

    assert.deepEqual(result, { status: "failed", reason: "delivery" });
  });

  it("schreibt den API-Key in keine Log-Ausgabe", async () => {
    stubFetch(1);
    await sendContactEmails(VALUES);

    const logged = (console.error as unknown as ReturnType<typeof mock.fn>).mock.calls
      .map((call) => call.arguments.join(" "))
      .join("\n");

    assert.ok(logged.length > 0, "der Fehlschlag sollte protokolliert werden");
    assert.ok(!logged.includes("re_test_key_niemals_echt"));
  });
});
