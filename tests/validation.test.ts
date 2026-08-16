import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  FIELD_LIMITS,
  emptyContactForm,
  parseContactPayload,
  validateContactForm,
} from "@/lib/validation";
import type { ContactFormValues } from "@/types";

/** Gültige Basiswerte; einzelne Felder werden pro Test überschrieben. */
function form(overrides: Partial<ContactFormValues> = {}): ContactFormValues {
  return {
    ...emptyContactForm,
    name: "Lena Fischer",
    role: "website",
    email: "lena@example.com",
    phone: "+49 170 1234567",
    message: "Hallo, wir suchen einen neuen Hosting-Partner.",
    ...overrides,
  };
}

describe("validateContactForm", () => {
  it("akzeptiert vollständige Eingaben", () => {
    assert.deepEqual(validateContactForm(form()), {});
  });

  it("akzeptiert eine leere Telefonnummer (optionales Feld)", () => {
    assert.deepEqual(validateContactForm(form({ phone: "" })), {});
  });

  it("bemängelt fehlende Pflichtfelder", () => {
    const errors = validateContactForm(
      form({ name: "  ", role: "", message: "" }),
    );

    assert.equal(errors.name, true);
    assert.equal(errors.role, true);
    assert.equal(errors.message, true);
  });

  it("bemängelt ungültige E-Mail-Adressen", () => {
    for (const email of ["", "kein-at-zeichen", "a@b", "a b@c.de"]) {
      assert.equal(
        validateContactForm(form({ email })).email,
        true,
        `sollte ungültig sein: ${email}`,
      );
    }
  });

  it("bemängelt ungültige Telefonnummern, wenn eine angegeben ist", () => {
    assert.equal(validateContactForm(form({ phone: "abc" })).phone, true);
  });

  it("bemängelt zu lange Eingaben", () => {
    const tooLongName = "a".repeat(FIELD_LIMITS.name + 1);
    const tooLongMessage = "a".repeat(FIELD_LIMITS.message + 1);

    assert.equal(validateContactForm(form({ name: tooLongName })).name, true);
    assert.equal(
      validateContactForm(form({ message: tooLongMessage })).message,
      true,
    );
  });

  it("akzeptiert Eingaben exakt auf der Längengrenze", () => {
    const maxName = "a".repeat(FIELD_LIMITS.name);
    assert.deepEqual(validateContactForm(form({ name: maxName })), {});
  });
});

describe("parseContactPayload", () => {
  it("normalisiert einen gültigen Body und trimmt Werte", () => {
    const parsed = parseContactPayload({
      name: "  Lena Fischer  ",
      role: "website",
      email: " lena@example.com ",
      phone: "",
      message: " Hallo ",
      company_website: "",
    });

    assert.deepEqual(parsed, {
      name: "Lena Fischer",
      role: "website",
      email: "lena@example.com",
      phone: "",
      message: "Hallo",
      company_website: "",
    });
  });

  it("ergänzt fehlende Felder als leere Strings", () => {
    const parsed = parseContactPayload({ name: "Lena" });

    assert.equal(parsed?.name, "Lena");
    assert.equal(parsed?.email, "");
    assert.equal(parsed?.message, "");
  });

  it("lehnt Bodys ab, die kein Objekt sind", () => {
    for (const input of [null, "string", 42, [], undefined, true]) {
      assert.equal(parseContactPayload(input), null, `sollte null sein: ${String(input)}`);
    }
  });

  it("lehnt Felder mit falschem Typ ab", () => {
    assert.equal(parseContactPayload({ name: 42 }), null);
    assert.equal(parseContactPayload({ message: { text: "hi" } }), null);
    assert.equal(parseContactPayload({ email: ["a@b.de"] }), null);
  });

  it("lehnt unbekannte Rollen ab", () => {
    assert.equal(parseContactPayload(form({ role: "admin" as never })), null);
  });

  it("lehnt ein absurd langes Honeypot-Feld ab", () => {
    assert.equal(
      parseContactPayload(form({ company_website: "x".repeat(500) })),
      null,
    );
  });
});
