/**
 * Die vier Demo-Projekte.
 *
 * Es sind bewusst erfundene Unternehmen: keine echten Namen, keine echten
 * Adressen, keine echten Preise, keine erfundenen Ergebniszahlen. Jede Seite
 * traegt oben einen sichtbaren Hinweis darauf, und alle vier sind fuer
 * Suchmaschinen gesperrt - sie sollen den Auftritt von Novahost belegen, nicht
 * mit ihm um Sichtbarkeit konkurrieren.
 *
 * Zweck der Auswahl: vier moeglichst weit auseinanderliegende Branchen mit
 * vier verschiedenen Geschaeftszielen - Besuch, Kauf, Anfrage, Reservierung.
 * Wer sie nebeneinander sieht, erkennt, dass hier nicht ein Stil viermal
 * recycelt wurde.
 *
 * Die Farbwerte unter `vorschau` sind aus der jeweiligen Seite uebernommen
 * (styles/demo-*.css). Wer dort die Palette aendert, muss sie hier
 * nachziehen - sonst verspricht die Kachel etwas anderes als die Seite.
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
    umfang: "Tagesangebot, Röstungen, Karte, Öffnungszeiten, Anfahrt",
    haltung: "Warm und handgemacht, aber präzise. Gebrannte Erde, Creme, viel Luft.",
    vorschau: { grund: "#433024", flaeche: "#50392b", text: "#f4ead9", akzent: "#e08a55" },
  },
  {
    slug: "mode",
    betrieb: "ARVO",
    branche: "Mode-Onlineshop",
    umfang: "Damen, Herren, Kategorien, Produktseiten, Favoriten, Warenkorb",
    haltung: "Streng, kühl, fast monochrom. Die Ware trägt die Seite.",
    vorschau: { grund: "#f6f5f2", flaeche: "#ffffff", text: "#131416", akzent: "#a8998a" },
  },
  {
    slug: "handwerk",
    betrieb: "Tischlerei Brandhorst",
    branche: "Tischlerei & Innenausbau",
    umfang: "Leistungen, Referenzen, Ablauf, Team, Anfragestrecke",
    haltung: "Präzise und bodenständig. Haarlinien statt Werbekacheln.",
    vorschau: { grund: "#eaedeb", flaeche: "#f7f9f8", text: "#191d1d", akzent: "#1c5a6b" },
  },
  {
    slug: "restaurant",
    betrieb: "Restaurant Amsel",
    branche: "Restaurant & Saisonküche",
    umfang: "Konzept, Menüs, Küche, Raum, Öffnungszeiten, Reservierung",
    haltung: "Beige Karte, Burgunder als Akzent. Ruhig, zeitlos, alles führt auf den Tisch.",
    vorschau: { grund: "#f2e6cb", flaeche: "#eadcba", text: "#2b1418", akzent: "#8c2233" },
  },
];
