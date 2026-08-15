/**
 * Tests der Route selbst — ohne echten Versand.
 *
 * Alle geprüften Pfade enden, bevor Resend kontaktiert wird: entweder durch
 * Validierung, durch das Honeypot-Feld oder durch den fehlenden API-Key.
 * RESEND_API_KEY wird dafür bewusst entfernt, damit unter keinen Umständen
 * eine echte E-Mail verschickt wird.
 */
import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { DELETE, GET, POST, PUT } from "@/app/api/contact/route";
import { resetRateLimit } from "@/lib/rate-limit";

delete process.env.RESEND_API_KEY;

const VALID_BODY = {
  name: "Lena Fischer",
  role: "hosting",
  email: "lena@example.com",
  phone: "",
  message: "Hallo, wir suchen einen neuen Hosting-Partner.",
  company_website: "",
};

function post(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request("https://www.novahost.dev/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

interface ResponseBody {
  status?: string;
  code?: string;
  message?: string;
}

async function read(response: Response): Promise<ResponseBody> {
  return (await response.json()) as ResponseBody;
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    resetRateLimit();
  });

  it("lehnt andere HTTP-Methoden mit 405 ab", async () => {
    for (const handler of [GET, PUT, DELETE]) {
      const response = handler();
      assert.equal(response.status, 405);
      assert.equal(response.headers.get("Allow"), "POST");
    }
  });

  it("lehnt einen falschen Content-Type ab", async () => {
    const response = await POST(
      new Request("https://www.novahost.dev/api/contact", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: "name=Lena",
      }),
    );

    assert.equal(response.status, 415);
  });

  it("lehnt ungültiges JSON ab", async () => {
    const response = await POST(post("{ kaputt"));
    const body = await read(response);

    assert.equal(response.status, 400);
    assert.equal(body.code, "invalid_request");
  });

  it("lehnt fehlende Pflichtfelder ab", async () => {
    const response = await POST(post({ ...VALID_BODY, name: "", message: "" }));
    const body = await read(response);

    assert.equal(response.status, 400);
    assert.equal(body.code, "validation_error");
  });

  it("lehnt eine ungültige E-Mail-Adresse ab", async () => {
    const response = await POST(post({ ...VALID_BODY, email: "keine-adresse" }));

    assert.equal(response.status, 400);
  });

  it("lehnt zu lange Eingaben ab", async () => {
    const response = await POST(
      post({ ...VALID_BODY, message: "a".repeat(50_000) }),
    );
    const body = await read(response);

    assert.equal(response.status, 413);
    assert.equal(body.code, "validation_error");
  });

  it("verwirft ein ausgefülltes Honeypot-Feld ohne Versand", async () => {
    const response = await POST(
      post({ ...VALID_BODY, company_website: "https://spam.example" }),
    );
    const body = await read(response);

    // Erfolg nach außen, damit der Bot nichts lernt — versendet wird nichts.
    assert.equal(response.status, 200);
    assert.equal(body.status, "sent");
  });

  it("greift nach zu vielen Anfragen aus derselben IP", async () => {
    const headers = { "x-forwarded-for": "9.9.9.9" };
    let last: Response | null = null;

    for (let attempt = 0; attempt < 7; attempt += 1) {
      last = await POST(post({ ...VALID_BODY, email: "nope" }, headers));
    }

    const body = await read(last as Response);

    assert.equal(last?.status, 429);
    assert.equal(body.code, "rate_limited");
    assert.ok(Number(last?.headers.get("Retry-After")) > 0);
  });

  it("meldet einen allgemeinen Fehler, wenn RESEND_API_KEY fehlt", async () => {
    const response = await POST(post(VALID_BODY));
    const body = await read(response);

    assert.equal(response.status, 502);
    assert.equal(body.code, "send_failed");
    // Keine technischen Interna nach außen.
    assert.doesNotMatch(body.message ?? "", /RESEND|API|Key|Resend/i);
  });

  it("gibt in keiner Antwort ein Secret zurück", async () => {
    process.env.RESEND_API_KEY = "re_test_geheim";

    try {
      const response = await POST(post({ ...VALID_BODY, email: "kaputt" }));
      const raw = JSON.stringify(await read(response));

      assert.equal(response.status, 400);
      assert.ok(!raw.includes("re_test_geheim"));
    } finally {
      delete process.env.RESEND_API_KEY;
    }
  });

  it("setzt Cache-Control auf no-store", async () => {
    const response = await POST(post({ ...VALID_BODY, email: "kaputt" }));

    assert.equal(response.headers.get("Cache-Control"), "no-store");
  });
});
