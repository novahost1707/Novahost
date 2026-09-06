import {
  clean,
  cleanMultiline,
  normalizeUrl,
  type LeadPayload,
  type LeadType,
} from "@/lib/validation";

/**
 * Ein geprüfter, bereinigter Lead - so, wie er zugestellt wird.
 *
 * Die Form ist bewusst von LeadPayload getrennt: dort steht, was der Browser
 * schickt, hier steht, was wir davon behalten. Alle Felder sind Strings, damit
 * die Vorlagen nichts prüfen müssen.
 */
export type Lead = {
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
  receivedAt: string;
};

/** Kürzt, entfernt Steuerzeichen und bringt die Website-Adresse in Form. */
export function buildLead(body: Partial<LeadPayload>, now = new Date()): Lead {
  return {
    type: body.type === "analyse" ? "analyse" : "projekt",
    company: clean(body.company, 160),
    website: body.website ? (normalizeUrl(body.website) ?? "") : "",
    branch: clean(body.branch, 160),
    goal: cleanMultiline(body.goal, 2000),
    services: Array.isArray(body.services)
      ? body.services.slice(0, 12).map((service) => clean(service, 80))
      : [],
    budget: clean(body.budget, 80),
    timeframe: clean(body.timeframe, 80),
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    message: cleanMultiline(body.message, 4000),
    receivedAt: now.toISOString(),
  };
}

/** Vorname für die Anrede. Fällt auf den ganzen Namen zurück. */
export function firstName(lead: Lead): string {
  return lead.name.split(/\s+/)[0] || lead.name;
}

/** Zeitpunkt in deutscher Schreibweise, für die Benachrichtigung an uns. */
export function formatReceivedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(date);
}
