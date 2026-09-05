/**
 * Zentrale Seiten-Konfiguration.
 * Alles, was von echten Unternehmensdaten abhängt, kommt aus ENV und wird
 * ausgeblendet, solange nichts hinterlegt ist - es werden keine Daten erfunden.
 */

/**
 * Basis-URL der Seite. Sie steckt in Canonicals, Open Graph, robots.txt und
 * sitemap.xml - eine falsche Adresse dort schadet der Auffindbarkeit spuerbar.
 *
 * Reihenfolge:
 * 1. NEXT_PUBLIC_SITE_URL, sobald die echte Domain hinterlegt ist
 * 2. die Produktionsdomain des Hosters, damit die Angaben auch ohne gesetzte
 *    Variable auf die tatsaechlich ausgelieferte Adresse zeigen
 * 3. erst danach der Platzhalter
 *
 * Wird nur serverseitig ausgewertet (Metadaten, robots, sitemap).
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return withProtocol(configured);

  const hosted = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (hosted) return withProtocol(hosted);

  return "https://novahost.de";
}

function withProtocol(value: string): string {
  const url = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return url.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: "Novahost",
  wordmark: "NOVAHOST",
  tagline: "Websites, die aus Besuchern Kunden machen.",
  /**
   * Bewusst unter 160 Zeichen: laengere Beschreibungen schneidet Google im
   * Suchergebnis ab, der abgeschnittene Teil wirkt dann unfertig.
   */
  description:
    "Professionelle Websites für Handwerk, lokale Dienstleister und KMU: Strategie, Design, Entwicklung, laufende Betreuung. Transparente Preise ab 1.490 EUR.",
  locale: "de_DE",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  build: "BUILD 01.0",
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Projekte", href: "#projekte" },
  { label: "Preise", href: "#preise" },
  { label: "Prozess", href: "#prozess" },
  { label: "FAQ", href: "#faq" },
];

export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

/** Landingpages, die später ergänzt werden können (Architektur steht). */
export const plannedLandingPages: string[] = [
  "/webdesign-handwerker",
  "/webdesign-elektriker",
  "/webdesign-dachdecker",
  "/webdesign-dienstleister",
];
