import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DEFAULT_CONTACT_RECIPIENT,
  FROM_ADDRESS,
  SITE_URL,
  STATUS_URL,
} from "@/lib/email/config";
import { buildOwnerEmail, buildVisitorEmail } from "@/lib/email/templates";
import { emptyContactForm } from "@/lib/validation";
import type { ContactFormValues } from "@/types";

function form(overrides: Partial<ContactFormValues> = {}): ContactFormValues {
  return {
    ...emptyContactForm,
    name: "Lena Fischer",
    role: "hosting",
    email: "lena@example.com",
    phone: "+49 170 1234567",
    message: "Hallo Nova-Team,\nwir wollen unsere Umgebung migrieren.",
    ...overrides,
  };
}

const FIXED_DATE = new Date("2026-05-04T10:15:00Z");

describe("buildOwnerEmail — Kontaktanfrage an den Betreiber", () => {
  const email = buildOwnerEmail(form(), DEFAULT_CONTACT_RECIPIENT, FIXED_DATE);

  it("verwendet hello@novahost.dev als Absender", () => {
    assert.equal(email.from, FROM_ADDRESS);
    assert.match(email.from, /hello@novahost\.dev/);
  });

  it("geht an die konfigurierte Empfängeradresse", () => {
    assert.equal(email.to, "hello@novahost.dev");
  });

  it("setzt replyTo auf die Adresse des Besuchers", () => {
    assert.equal(email.replyTo, "lena@example.com");
  });

  it("nennt den Namen im Betreff", () => {
    assert.match(email.subject, /Lena Fischer/);
    assert.doesNotMatch(email.subject, /[\r\n]/);
  });

  it("enthält alle Formularfelder", () => {
    for (const value of [
      "Lena Fischer",
      "lena@example.com",
      "+49 170 1234567",
      "migrieren",
    ]) {
      assert.ok(email.html.includes(value), `fehlt im HTML: ${value}`);
      assert.ok(email.text.includes(value), `fehlt im Text: ${value}`);
    }
  });

  it("nennt das gewählte Anliegen", () => {
    // Im HTML maskiert, im Text unverändert — beides ist korrekt.
    assert.ok(email.html.includes("Hosting &amp; Server"));
    assert.ok(email.text.includes("Hosting & Server"));
  });

  it("zeigt ein Strich-Platzhalter, wenn keine Telefonnummer angegeben ist", () => {
    const withoutPhone = buildOwnerEmail(
      form({ phone: "" }),
      DEFAULT_CONTACT_RECIPIENT,
      FIXED_DATE,
    );

    assert.match(withoutPhone.text, /Telefon:\s+—/);
  });

  it("übernimmt Zeilenumbrüche der Nachricht als <br />", () => {
    assert.ok(email.html.includes("Hallo Nova-Team,<br />wir wollen unsere Umgebung"));
  });

  it("liefert eine Textalternative", () => {
    assert.ok(email.text.length > 0);
  });
});

describe("buildVisitorEmail — Bestätigung an den Besucher", () => {
  const email = buildVisitorEmail(form());

  it("verwendet hello@novahost.dev als Absender", () => {
    assert.equal(email.from, FROM_ADDRESS);
  });

  it("geht an die vom Besucher angegebene Adresse", () => {
    assert.equal(email.to, "lena@example.com");
  });

  it("setzt kein replyTo auf eine fremde Adresse", () => {
    assert.equal(email.replyTo, undefined);
  });

  it("spricht den Besucher mit Namen an", () => {
    assert.ok(email.html.includes("Hallo Lena Fischer,"));
    assert.ok(email.text.startsWith("Hallo Lena Fischer,"));
  });

  it("enthält den geforderten Bestätigungstext", () => {
    for (const phrase of [
      "danke für deine Anfrage bei Nova Host.",
      "innerhalb weniger Minuten",
      "Beste Grüße",
      "Das Nova-Host-Team",
    ]) {
      assert.ok(email.html.includes(phrase), `fehlt: ${phrase}`);
    }
  });

  it("verlinkt Website und Statusseite als Buttons", () => {
    assert.ok(email.html.includes(SITE_URL));
    assert.ok(email.html.includes(STATUS_URL));
    assert.ok(email.html.includes("Zur Website"));
    assert.ok(email.html.includes("Systemstatus"));
  });

  it("setzt die Buttonschrift fett", () => {
    const buttonStyles = email.html.match(/border-radius:999px;[^"]*/g) ?? [];
    assert.ok(buttonStyles.length >= 2, "es sollten zwei Buttons vorhanden sein");
    for (const style of buttonStyles) {
      assert.match(style, /font-weight:700/);
    }
  });
});

describe("Escaping von Nutzereingaben", () => {
  const hostile = form({
    name: '<script>alert("xss")</script>',
    message: 'Klick <a href="https://evil.example">hier</a> & so weiter',
  });

  const owner = buildOwnerEmail(hostile, DEFAULT_CONTACT_RECIPIENT, FIXED_DATE);
  const visitor = buildVisitorEmail(hostile);

  it("gibt kein rohes Markup aus der Nachricht weiter", () => {
    for (const html of [owner.html, visitor.html]) {
      assert.doesNotMatch(html, /<script/i);
      assert.ok(!html.includes('<a href="https://evil.example"'));
    }
  });

  it("maskiert Sonderzeichen statt sie zu entfernen", () => {
    assert.ok(owner.html.includes("&lt;script&gt;"));
    assert.ok(owner.html.includes("&amp; so weiter"));
  });

  it("hält Steuerzeichen aus dem Betreff heraus", () => {
    const injected = buildOwnerEmail(
      form({ name: "Lena\r\nBcc: opfer@example.com" }),
      DEFAULT_CONTACT_RECIPIENT,
      FIXED_DATE,
    );

    assert.doesNotMatch(injected.subject, /[\r\n]/);
  });
});
