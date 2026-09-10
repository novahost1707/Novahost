/**
 * Die Projekte auf der Startseite.
 *
 * Zwei Sorten stehen hier nebeneinander, und die Kachel sagt jeweils, welche:
 *
 *   art: "kunde"  Ein echtes, veroeffentlichtes Projekt. Die Kachel fuehrt auf
 *                 die Seite selbst und zeigt eine Aufnahme davon.
 *   art: "demo"   Ein eigenes Konzept mit erfundenem Unternehmen: keine echten
 *                 Namen, keine echten Adressen, keine erfundenen Ergebnis-
 *                 zahlen. Jede dieser Seiten traegt oben einen sichtbaren
 *                 Hinweis darauf und ist fuer Suchmaschinen gesperrt - sie
 *                 sollen den Auftritt belegen, nicht mit ihm um Sichtbarkeit
 *                 konkurrieren.
 *
 * Zweck der Auswahl bei den Demos: weit auseinanderliegende Branchen mit
 * verschiedenen Geschaeftszielen - Kauf, Anfrage, Reservierung. Wer sie
 * nebeneinander sieht, erkennt, dass hier nicht ein Stil recycelt wurde.
 *
 * Die Farbwerte unter `vorschau` sind aus der jeweiligen Seite uebernommen
 * (styles/demo-*.css). Wer dort die Palette aendert, muss sie hier
 * nachziehen - sonst verspricht die Kachel etwas anderes als die Seite.
 */

export type Projekt = {
  slug: string;
  /** Echtes Projekt oder eigenes Konzept - entscheidet ueber Kennzeichnung. */
  art: "kunde" | "demo";
  /** Wohin die Kachel fuehrt. Bei "kunde" eine vollstaendige fremde Adresse. */
  ziel: string;
  /** Betrieb, der auf der Seite auftritt. */
  betrieb: string;
  /** Branche - steht so auch auf der Projektkachel. */
  branche: string;
  /** Was auf der Seite gebaut wurde. */
  umfang: string;
  /** Ein Satz zur gestalterischen Haltung, erscheint auf der Kachel. */
  haltung: string;
  /**
   * Aufnahme der Seite. Nur bei echten Projekten - die Demos zeichnen ihre
   * Vorschau in CSS, damit die Startseite ohne Bilddateien auskommt.
   */
  bild?: { src: string; alt: string };
  /** Farbwelt fuer die Vorschau auf der Startseite. */
  vorschau: { grund: string; flaeche: string; text: string; akzent: string };
};

export const projekte: Projekt[] = [
  {
    slug: "redeemed-booking",
    art: "kunde",
    ziel: "https://www.redeemedbooking.de",
    betrieb: "Redeemed Booking",
    branche: "Booking-Agentur · Christliche urbane Musik",
    umfang: "Markenauftritt, Artists, Insights, Kontaktstrecke",
    haltung: "Dunkel und warm. Bernstein auf Schwarz, die Marke trägt die Seite.",
    bild: {
      src: "/work/redeemedbooking.jpg",
      alt: "Startseite von Redeemed Booking: Wortmarke und Kontaktknopf auf schwarzem Grund",
    },
    vorschau: { grund: "#0b0a09", flaeche: "#151210", text: "#ffffff", akzent: "#e8a857" },
  },

  {
    slug: "mode",
    art: "demo",
    ziel: "/demo/mode",
    betrieb: "ARVO",
    branche: "Mode-Onlineshop",
    umfang: "Damen, Herren, Kategorien, Produktseiten, Favoriten, Warenkorb",
    haltung: "Streng, kühl, fast monochrom. Die Ware trägt die Seite.",
    vorschau: { grund: "#f6f5f2", flaeche: "#ffffff", text: "#131416", akzent: "#a8998a" },
  },
  {
    slug: "handwerk",
    art: "demo",
    ziel: "/demo/handwerk",
    betrieb: "Tischlerei Brandhorst",
    branche: "Tischlerei & Innenausbau",
    umfang: "Leistungen, Referenzen, Ablauf, Team, Anfragestrecke",
    haltung: "Präzise und bodenständig. Haarlinien statt Werbekacheln.",
    vorschau: { grund: "#eaedeb", flaeche: "#f7f9f8", text: "#191d1d", akzent: "#1c5a6b" },
  },
  {
    slug: "restaurant",
    art: "demo",
    ziel: "/demo/restaurant",
    betrieb: "Restaurant Amsel",
    branche: "Restaurant & Saisonküche",
    umfang: "Konzept, Menüs, Küche, Raum, Öffnungszeiten, Reservierung",
    haltung: "Beige Karte, Burgunder als Akzent. Ruhig, zeitlos, alles führt auf den Tisch.",
    vorschau: { grund: "#f2e6cb", flaeche: "#eadcba", text: "#2b1418", akzent: "#8c2233" },
  },
];
