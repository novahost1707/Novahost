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
    betrieb: "Morgentau Kaffeerösterei",
    branche: "Specialty Coffee & Café",
    umfang: "Startseite, Röstungen, Karte, Öffnungszeiten, Anfahrt",
    haltung: "Warm und handgemacht, aber präzise. Serifen, Creme, viel Luft.",
    vorschau: { grund: "#f5efe6", flaeche: "#fffdf9", text: "#241812", akzent: "#9e4e2a" },
  },
  {
    slug: "mode",
    betrieb: "Nordlicht",
    branche: "Mode-Onlineshop",
    umfang: "Lookbook, Kategorien, Produktseiten, Warenkorb, Größenberatung",
    haltung: "Streng, kühl, fast monochrom. Die Ware trägt die Seite.",
    vorschau: { grund: "#f6f5f2", flaeche: "#ffffff", text: "#131416", akzent: "#a8998a" },
  },
  {
    slug: "handwerk",
    betrieb: "Tischlerei Brandhorst",
    branche: "Tischlerei & Innenausbau",
    umfang: "Leistungen, Referenzen, Ablauf, Team, Anfragestrecke",
    haltung: "Präzise und bodenständig. Haarlinien statt Werbekacheln.",
    vorschau: { grund: "#f3f0ea", flaeche: "#fbfaf7", text: "#1e211e", akzent: "#a9762f" },
  },
  {
    slug: "freizeitpark",
    betrieb: "Freizeitpark Wolkenhain",
    branche: "Freizeitpark & Erlebnis",
    umfang: "Themenwelten, Attraktionen, Tickets, Übernachtung, Anfahrt",
    haltung: "Warm und abenteuerlich statt neonbunt. Waldgrün und Abendorange.",
    vorschau: { grund: "#fbf6ec", flaeche: "#ffffff", text: "#16281f", akzent: "#e8622b" },
  },
];
