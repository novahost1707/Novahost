import { describe, expect, it } from "vitest";
import {
  clean,
  hasErrors,
  normalizeUrl,
  validateLead,
  type LeadPayload,
} from "@/lib/validation";

const projekt: Partial<LeadPayload> = {
  type: "projekt",
  company: "Musterbetrieb GmbH",
  services: ["Neue Website"],
  budget: "1.500-2.500 EUR",
  timeframe: "in 1-3 Monaten",
  name: "Max Mustermann",
  email: "max@beispiel.de",
  consent: true,
};

describe("normalizeUrl", () => {
  it("ergaenzt ein fehlendes Protokoll", () => {
    expect(normalizeUrl("beispiel.de")).toBe("https://beispiel.de/");
    expect(normalizeUrl("www.beispiel.de/leistungen")).toBe("https://www.beispiel.de/leistungen");
  });

  it("laesst vollstaendige URLs unveraendert gueltig", () => {
    expect(normalizeUrl("http://beispiel.de")).toBe("http://beispiel.de/");
  });

  it("weist Eingaben ohne erkennbare Domain zurueck", () => {
    expect(normalizeUrl("beispiel")).toBeNull();
    expect(normalizeUrl("   ")).toBeNull();
    expect(normalizeUrl("http://")).toBeNull();
  });
});

describe("validateLead - Projektanfrage", () => {
  it("akzeptiert eine vollstaendige Anfrage", () => {
    expect(hasErrors(validateLead(projekt))).toBe(false);
  });

  it("verlangt Unternehmen, Budget, Zeitraum und Leistungen", () => {
    const errors = validateLead({ ...projekt, company: "", budget: "", timeframe: "", services: [] });
    expect(errors.company).toBeDefined();
    expect(errors.budget).toBeDefined();
    expect(errors.timeframe).toBeDefined();
    expect(errors.services).toBeDefined();
  });

  it("akzeptiert nur Budgetwerte aus der Auswahl", () => {
    expect(validateLead({ ...projekt, budget: "1 EUR" }).budget).toBeDefined();
  });

  it("laesst die Website leer, meldet aber eine unlesbare Adresse", () => {
    expect(validateLead({ ...projekt, website: "" }).website).toBeUndefined();
    expect(validateLead({ ...projekt, website: "kaputt" }).website).toBeDefined();
  });

  it("verlangt eine Einwilligung", () => {
    expect(validateLead({ ...projekt, consent: false }).consent).toBeDefined();
  });

  it("prueft die E-Mail-Adresse", () => {
    expect(validateLead({ ...projekt, email: "max@beispiel" }).email).toBeDefined();
    expect(validateLead({ ...projekt, email: "max.mustermann@sub.beispiel.de" }).email).toBeUndefined();
  });
});

describe("validateLead - Website-Analyse", () => {
  it("verlangt eine Website, aber kein Unternehmen", () => {
    const errors = validateLead({
      type: "analyse",
      name: "Max Mustermann",
      email: "max@beispiel.de",
      consent: true,
      website: "beispiel.de",
    });
    expect(hasErrors(errors)).toBe(false);
  });

  it("meldet eine fehlende Website", () => {
    const errors = validateLead({
      type: "analyse",
      name: "Max Mustermann",
      email: "max@beispiel.de",
      consent: true,
    });
    expect(errors.website).toBeDefined();
  });
});

describe("clean", () => {
  it("entfernt Steuerzeichen und kuerzt auf die Maximallaenge", () => {
    expect(clean("Zeile1\nZeile2")).toBe("Zeile1 Zeile2");
    expect(clean("abcdef", 3)).toBe("abc");
    expect(clean(42)).toBe("");
  });
});
