/**
 * Zentrale Seiten-Konfiguration.
 * Alles, was von echten Unternehmensdaten abhängt, kommt aus ENV und wird
 * ausgeblendet, solange nichts hinterlegt ist - es werden keine Daten erfunden.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://novahost.de"
).replace(/\/$/, "");

export const site = {
  name: "Novahost",
  wordmark: "NOVAHOST",
  tagline: "Websites, die aus Besuchern Kunden machen.",
  description:
    "Novahost entwickelt professionelle Websites für Handwerksbetriebe, lokale Dienstleister und KMU - mit Strategie, Design, Entwicklung und laufender Betreuung. Transparente Preise ab 1.490 EUR.",
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
