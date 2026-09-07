/**
 * Die vier Demo-Projekte.
 *
 * Es sind bewusst erfundene Unternehmen: keine echten Namen, keine echten
 * Adressen, keine echten Preise, keine erfundenen Ergebniszahlen. Jede Seite
 * traegt oben einen sichtbaren Hinweis darauf, und alle vier sind fuer
 * Suchmaschinen gesperrt - sie sollen den Auftritt von Novahost belegen, nicht
 * mit ihm um Sichtbarkeit konkurrieren.
 *
 * Zweck der Auswahl: vier moeglichst weit auseinanderliegende Branchen. Wer
 * sie nebeneinander sieht, erkennt, dass hier nicht ein Stil viermal recycelt
 * wurde.
 */

export type Demo = {
  slug: string;
  /** Erfundener Betrieb, der auf der Demo-Seite auftritt. */
  betrieb: string;
  /** Branche - steht so auch auf der Projektkachel. */
  branche: string;
  /** Was auf der Demo-Seite gebaut wurde. */
  umfang: string;
  /** Ein Satz zur gestalterischen Haltung, erscheint auf der Kachel. */
  haltung: string;
  /** Farbwelt fuer die Vorschau auf der Startseite. */
  vorschau: { grund: string; flaeche: string; text: string; akzent: string };
};

export const demos: Demo[] = [
  {
    slug: "cafe",
    betrieb: "Kaffeehaus Morgentau",
    branche: "Café & Rösterei",
    umfang: "Startseite, Karte, Öffnungszeiten, Anfahrt",
    haltung: "Warm, handgemacht, ruhig. Serifen statt Technik.",
    vorschau: { grund: "#f4ece0", flaeche: "#ffffff", text: "#2e1f16", akzent: "#b5643a" },
  },
  {
    slug: "mode",
    betrieb: "Atelier Nordlicht",
    branche: "Mode-Onlineshop",
    umfang: "Lookbook, Produktraster, Größenberatung, Warenkorbstrecke",
    haltung: "Streng, kühl, viel Weißraum. Die Ware trägt die Seite.",
    vorschau: { grund: "#f7f6f4", flaeche: "#ffffff", text: "#12100e", akzent: "#8a7c6a" },
  },
  {
    slug: "handwerk",
    betrieb: "Zimmerei Lindhorst",
    branche: "Zimmerei & Holzbau",
    umfang: "Leistungen, Referenzen, Notdienst, Anfragestrecke",
    haltung: "Massiv und geradeaus. Kontakt immer eine Handbewegung entfernt.",
    vorschau: { grund: "#12181d", flaeche: "#1b242c", text: "#eef1f3", akzent: "#e0721f" },
  },
  {
    slug: "freizeitpark",
    betrieb: "Aqualuna Erlebnisbad",
    branche: "Erlebnisbad & Freizeit",
    umfang: "Attraktionen, Preise, Öffnungszeiten, Tickets",
    haltung: "Laut, bunt, für Familien. Preise und Zeiten sofort sichtbar.",
    vorschau: { grund: "#e4f5fa", flaeche: "#ffffff", text: "#07394a", akzent: "#ff6a3d" },
  },
];
