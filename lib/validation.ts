/**
 * Serverseitige Validierung der Lead-Formulare.
 * Bewusst ohne externe Dependency: wenig Code, kein Bundle-Overhead,
 * dieselben Regeln laufen im Client (sofortiges Feedback) und im Server
 * (verbindliche Prüfung).
 */

export type LeadType = "projekt" | "analyse";

export type LeadPayload = {
  type: LeadType;
  company: string;
  website: string;
  branch: string;
  goal: string;
  services: string[];
  budget: string;
  timeframe: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  /** Honeypot - muss leer bleiben. */
  fax?: string;
};

export type FieldErrors = Partial<Record<keyof LeadPayload, string>>;

export const budgetOptions = [
  "unter 1.500 EUR",
  "1.500-2.500 EUR",
  "2.500-5.000 EUR",
  "5.000 EUR+",
  "noch unklar",
] as const;

export const timeframeOptions = [
  "so schnell wie möglich",
  "in 1-3 Monaten",
  "in 3-6 Monaten",
  "noch offen",
] as const;

export const serviceOptions = [
  "Neue Website",
  "Relaunch",
  "Mehr Anfragen / Conversion",
  "SEO-Basis",
  "Online-Shop",
  "Laufende Betreuung",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const CONTROL_RE = /[\u0000-\u001F\u007F]/g;

/** Lässt "example.de", "www.example.de" und volle URLs zu. */
export function normalizeUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withProtocol);
    if (!url.hostname.includes(".") || url.hostname.endsWith(".")) return null;
    if (!/^[a-z0-9.-]+$/i.test(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function len(value: unknown): number {
  return typeof value === "string" ? value.trim().length : 0;
}

export function validateLead(input: Partial<LeadPayload>): FieldErrors {
  const errors: FieldErrors = {};
  const type: LeadType = input.type === "analyse" ? "analyse" : "projekt";

  if (len(input.name) < 2) errors.name = "Bitte geben Sie Ihren Namen an.";
  else if (len(input.name) > 120) errors.name = "Der Name ist zu lang.";

  if (!input.email || !EMAIL_RE.test(input.email.trim())) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  }

  if (input.phone && len(input.phone) > 40) errors.phone = "Die Telefonnummer ist zu lang.";

  if (type === "analyse") {
    if (!input.website || !normalizeUrl(input.website)) {
      errors.website = "Bitte geben Sie eine gültige Website-Adresse an.";
    }
  } else {
    if (len(input.company) < 2) errors.company = "Bitte geben Sie Ihr Unternehmen an.";
    if (input.website && !normalizeUrl(input.website)) {
      errors.website = "Diese Adresse konnten wir nicht lesen.";
    }
    if (!input.budget || !budgetOptions.includes(input.budget as (typeof budgetOptions)[number])) {
      errors.budget = "Bitte wählen Sie einen Budgetrahmen.";
    }
    if (
      !input.timeframe ||
      !timeframeOptions.includes(input.timeframe as (typeof timeframeOptions)[number])
    ) {
      errors.timeframe = "Bitte wählen Sie einen Zeitraum.";
    }
    if (!input.services?.length) errors.services = "Bitte wählen Sie mindestens eine Leistung.";
  }

  if (len(input.message) > 4000) errors.message = "Die Nachricht ist zu lang.";
  if (len(input.goal) > 2000) errors.goal = "Der Text ist zu lang.";
  if (!input.consent) errors.consent = "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.";

  return errors;
}

/** Entfernt Steuerzeichen und begrenzt die Länge - gegen Header- und Log-Injection. */
export function clean(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL_RE, " ").trim().slice(0, max);
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
