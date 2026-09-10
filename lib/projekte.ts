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
 * Jede Kachel zeigt eine Aufnahme der Seite, im Kachelformat 16/11
 * aufgenommen - dadurch muss nichts beschnitten werden. Die Aufnahmen der
 * Demos entstehen aus den Seiten selbst (scripts/kacheln.mjs), die des
 * Kundenprojekts kommt von der veroeffentlichten Seite.
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
  /** Aufnahme der Seite, im Kachelformat 16/11 aufgenommen. */
  bild: { src: string; alt: string };
  /**
   * Grundfarbe der Seite. Sie steht hinter der Aufnahme, solange die noch
   * laedt - so blitzt an der Stelle nicht kurz die dunkle Kachel auf.
   */
  grund: string;
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
    grund: "#0b0a09",
  },

  {
    slug: "mode",
    art: "demo",
    ziel: "/demo/mode",
    betrieb: "ARVO",
    branche: "Mode-Onlineshop",
    umfang: "Damen, Herren, Kategorien, Produktseiten, Favoriten, Warenkorb",
    haltung: "Streng, kühl, fast monochrom. Die Ware trägt die Seite.",
    bild: {
      src: "/work/arvo.png",
      alt: "Startseite des Demo-Shops ARVO: Kopfleiste, Kategorien und Kleiderständer",
    },
    grund: "#f6f5f2",
  },
  {
    slug: "handwerk",
    art: "demo",
    ziel: "/demo/handwerk",
    betrieb: "Tischlerei Brandhorst",
    branche: "Tischlerei & Innenausbau",
    umfang: "Leistungen, Referenzen, Ablauf, Team, Anfragestrecke",
    haltung: "Präzise und bodenständig. Haarlinien statt Werbekacheln.",
    bild: {
      src: "/work/brandhorst.png",
      alt: "Startseite der Demo-Tischlerei Brandhorst: Kopfleiste, Werkbank und Kennzahlen",
    },
    grund: "#191d1d",
  },
  {
    slug: "restaurant",
    art: "demo",
    ziel: "/demo/restaurant",
    betrieb: "Restaurant Amsel",
    branche: "Restaurant & Saisonküche",
    umfang: "Konzept, Menüs, Küche, Raum, Öffnungszeiten, Reservierung",
    haltung: "Beige Karte, Burgunder als Akzent. Ruhig, zeitlos, alles führt auf den Tisch.",
    bild: {
      src: "/work/amsel.png",
      alt: "Startseite des Demo-Restaurants Amsel: Kopfleiste und Hero mit Reservierungsknopf",
    },
    grund: "#f2e6cb",
  },
];
