import { afterEach, describe, expect, it } from "vitest";
import { buildLead, firstName } from "@/lib/lead";
import { confirmationFor, internalNotification } from "@/lib/email/templates";
import { mailConfig } from "@/lib/email/send";
import type { LeadPayload } from "@/lib/validation";

const analyse: Partial<LeadPayload> = {
  type: "analyse",
  website: "beispiel-dachdecker.de",
  name: "Anna Beispiel",
  email: "anna@beispiel.de",
  consent: true,
};

const projekt: Partial<LeadPayload> = {
  type: "projekt",
  company: "Musterbetrieb GmbH",
  branch: "Elektro",
  services: ["Neue Website", "SEO-Basis"],
  budget: "1.500-2.500 EUR",
  timeframe: "in 1-3 Monaten",
  name: "Max Mustermann",
  email: "max@beispiel.de",
  message: "Wir brauchen mehr Anfragen.",
  consent: true,
};

describe("Bestaetigungen", () => {
  it("kennzeichnet die Analyse eindeutig als Website-Analyse", () => {
    const mail = confirmationFor(buildLead(analyse));
    expect(mail.subject).toContain("Website-Analyse");
    expect(mail.html).toContain("KOSTENLOSE WEBSITE-ANALYSE");
    expect(mail.html).not.toContain("Erstgespräch");
  });

  it("kennzeichnet die Projektanfrage eindeutig als Erstgespraech", () => {
    const mail = confirmationFor(buildLead(projekt));
    expect(mail.subject).toContain("Erstgespräch");
    expect(mail.html).toContain("KOSTENLOSES ERSTGESPRÄCH");
    expect(mail.html).not.toContain("Website-Analyse");
  });

  it("nutzt fuer beide Formulare unterschiedliche Betreffzeilen", () => {
    expect(confirmationFor(buildLead(analyse)).subject).not.toBe(
      confirmationFor(buildLead(projekt)).subject,
    );
  });

  it("nennt die geprüfte Adresse und den Vornamen", () => {
    const lead = buildLead(analyse);
    const mail = confirmationFor(lead);
    expect(firstName(lead)).toBe("Anna");
    expect(mail.html).toContain("Hallo Anna");
    expect(mail.html).toContain("https://beispiel-dachdecker.de/");
    expect(mail.text).toContain("https://beispiel-dachdecker.de/");
  });

  it("gibt die gewaehlten Leistungen im Erstgespraech wieder", () => {
    const mail = confirmationFor(buildLead(projekt));
    expect(mail.html).toContain("Neue Website, SEO-Basis");
    expect(mail.html).toContain("1.500-2.500 EUR");
  });

  it("erklaert in jeder Bestaetigung, warum sie ankommt", () => {
    for (const eingabe of [analyse, projekt]) {
      const mail = confirmationFor(buildLead(eingabe));
      expect(mail.html).toContain("Sie erhalten diese E-Mail, weil");
      expect(mail.html).toContain("/datenschutz");
      expect(mail.text).toContain("/datenschutz");
    }
  });

  it("liefert zu jeder Fassung auch reinen Text", () => {
    for (const eingabe of [analyse, projekt]) {
      const mail = confirmationFor(buildLead(eingabe));
      expect(mail.text.length).toBeGreaterThan(200);
      expect(mail.text).not.toContain("<td");
    }
  });
});

describe("Benachrichtigung an uns", () => {
  it("nennt Art, Name und Unternehmen im Betreff", () => {
    expect(internalNotification(buildLead(projekt)).subject).toBe(
      "Projektanfrage: Max Mustermann (Musterbetrieb GmbH)",
    );
    expect(internalNotification(buildLead(analyse)).subject).toBe(
      "Website-Analyse: Anna Beispiel",
    );
  });

  it("laesst leere Felder weg", () => {
    const mail = internalNotification(buildLead(analyse));
    expect(mail.html).not.toContain("BUDGET");
    expect(mail.text).not.toContain("Budget:");
  });

  it("uebernimmt alle ausgefuellten Felder", () => {
    const mail = internalNotification(buildLead(projekt));
    for (const wert of ["Max Mustermann", "max@beispiel.de", "Musterbetrieb GmbH", "Elektro"]) {
      expect(mail.html).toContain(wert);
      expect(mail.text).toContain(wert);
    }
  });
});

describe("Eingaben im HTML", () => {
  it("maskiert Markup aus dem Formular", () => {
    const boesartig = buildLead({
      ...projekt,
      name: '<script>alert("x")</script>',
      company: 'A" onmouseover="b',
      message: "erste Zeile\nzweite Zeile",
    });
    const mail = internalNotification(boesartig);
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).toContain("&lt;script&gt;");
    expect(mail.html).toContain('A&quot; onmouseover=&quot;b');
    expect(mail.html).toContain("erste Zeile<br>zweite Zeile");
  });

  it("maskiert den Namen auch in der Bestaetigung", () => {
    const mail = confirmationFor(buildLead({ ...analyse, name: "<b>Anna</b>" }));
    expect(mail.html).not.toContain("<b>Anna</b>");
    expect(mail.html).toContain("&lt;b&gt;Anna");
  });
});

describe("Schluessel je Formular", () => {
  const gesichert = { ...process.env };
  afterEach(() => {
    process.env = { ...gesichert };
  });

  it("waehlt getrennte Schluessel und Absender", () => {
    process.env.LEAD_MAIL_TO = "ich@example.com";
    process.env.RESEND_API_KEY_ANALYSE = "re_analyse";
    process.env.RESEND_API_KEY_PROJEKT = "re_projekt";
    process.env.LEAD_MAIL_FROM_ANALYSE = "Analyse <analyse@example.com>";
    process.env.LEAD_MAIL_FROM_PROJEKT = "Novahost <anfrage@example.com>";

    expect(mailConfig("analyse")).toEqual({
      apiKey: "re_analyse",
      from: "Analyse <analyse@example.com>",
      to: "ich@example.com",
    });
    expect(mailConfig("projekt")?.apiKey).toBe("re_projekt");
  });

  it("faellt auf den gemeinsamen Schluessel zurueck", () => {
    process.env.LEAD_MAIL_TO = "ich@example.com";
    process.env.RESEND_API_KEY_ANALYSE = "";
    process.env.RESEND_API_KEY_PROJEKT = "";
    process.env.LEAD_MAIL_FROM_ANALYSE = "";
    process.env.LEAD_MAIL_FROM_PROJEKT = "";
    process.env.RESEND_API_KEY = "re_gemeinsam";
    process.env.LEAD_MAIL_FROM = "Novahost <anfrage@example.com>";

    expect(mailConfig("analyse")?.apiKey).toBe("re_gemeinsam");
    expect(mailConfig("projekt")?.apiKey).toBe("re_gemeinsam");
  });

  it("liefert nichts, solange etwas fehlt", () => {
    process.env.LEAD_MAIL_TO = "";
    process.env.RESEND_API_KEY = "re_gemeinsam";
    process.env.RESEND_API_KEY_ANALYSE = "";
    process.env.RESEND_API_KEY_PROJEKT = "";
    process.env.LEAD_MAIL_FROM = "Novahost <anfrage@example.com>";
    expect(mailConfig("analyse")).toBeNull();
  });
});
