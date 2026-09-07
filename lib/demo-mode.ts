import type { Bildplatz } from "@/lib/demo-bilder";

/**
 * Sortiment des Demo-Shops NORDLICHT (erfundenes Label).
 *
 * Ein Ort für alle Produktdaten, damit Startseite, Produktseite und
 * Empfehlungen nicht auseinanderlaufen. Die Bildplätze zeigen auf
 * public/demo/mode/ - liegt dort ein Foto, wird es ausgeliefert.
 */

export type Farbe = { name: string; wert: string };

export type Produkt = {
  slug: string;
  name: string;
  kategorie: KategorieId;
  /** Preis in Euro, ohne Währungszeichen. */
  preis: string;
  /** Vorheriger Preis, falls reduziert. */
  vorher?: string;
  stoff: string;
  kurz: string;
  beschreibung: string[];
  details: { titel: string; text: string }[];
  farben: Farbe[];
  groessen: string[];
  /** Ausverkaufte Größen - im Größenwähler durchgestrichen. */
  ausverkauft?: string[];
  marker?: string;
  bilder: Bildplatz[];
};

export type KategorieId = "oberteile" | "hosen" | "outerwear" | "accessoires";

export const kategorien: { id: KategorieId; name: string; text: string; bild: Bildplatz }[] = [
  {
    id: "oberteile",
    name: "Oberteile",
    text: "Schwere Jersey-Qualitäten, weit geschnitten",
    bild: { src: "/demo/mode/kategorie-oberteile.jpg", alt: "Model trägt einen weiten Hoodie vor einer Betonwand", ratio: "3 / 4", motiv: "mode-hoodie", variante: 0, ton: "#6f6a63" },
  },
  {
    id: "hosen",
    name: "Hosen",
    text: "Cargo, Twill und Denim aus europäischer Fertigung",
    bild: { src: "/demo/mode/kategorie-hosen.jpg", alt: "Detailaufnahme einer weiten Cargohose im Gehen", ratio: "3 / 4", motiv: "mode-hose", variante: 0, ton: "#5a5c47" },
  },
  {
    id: "outerwear",
    name: "Outerwear",
    text: "Mäntel und Jacken für neun Monate im Jahr",
    bild: { src: "/demo/mode/kategorie-outerwear.jpg", alt: "Wollmantel, offen getragen, Halbtotale", ratio: "3 / 4", motiv: "mode-mantel", variante: 0, ton: "#7c7871" },
  },
  {
    id: "accessoires",
    name: "Accessoires",
    text: "Taschen, Caps, Kleinteile aus Restmengen",
    bild: { src: "/demo/mode/kategorie-accessoires.jpg", alt: "Ledertasche und Cap auf einer Betonstufe", ratio: "3 / 4", motiv: "mode-tasche", variante: 0, ton: "#9b7d5c" },
  },
];

type StueckMotiv = "mode-hoodie" | "mode-shirt" | "mode-hemd" | "mode-strick" | "mode-mantel" | "mode-hose" | "mode-tasche" | "mode-cap";

/**
 * Drei Bildplätze je Artikel: zwei Ansichten des Stücks, eine Stoffaufnahme.
 * Jedes Stück bekommt seine eigene Zeichnung und seinen eigenen Ton, damit
 * das Raster nicht wie achtmal dasselbe Bild aussieht.
 */
function bilder(slug: string, alt: string, motiv: StueckMotiv, ton: string): Bildplatz[] {
  return [
    { src: `/demo/mode/${slug}-1.jpg`, alt: `${alt} - Vorderansicht`, ratio: "3 / 4", motiv, variante: 0, ton },
    { src: `/demo/mode/${slug}-2.jpg`, alt: `${alt} - Rückansicht`, ratio: "3 / 4", motiv, variante: 1, ton },
    { src: `/demo/mode/${slug}-3.jpg`, alt: `${alt} - Stoffdetail`, ratio: "3 / 4", motiv: "mode-stoff", variante: 2, ton },
  ];
}

const SCHWARZ: Farbe = { name: "Schwarz", wert: "#16171a" };
const BETON: Farbe = { name: "Beton", wert: "#8d8a84" };
const SAND: Farbe = { name: "Sand", wert: "#c3b4a0" };
const OLIV: Farbe = { name: "Oliv", wert: "#5a5c47" };
const KREIDE: Farbe = { name: "Kreide", wert: "#e6e2da" };

export const produkte: Produkt[] = [
  {
    slug: "hoodie-werft",
    name: "Hoodie Werft",
    kategorie: "oberteile",
    preis: "129",
    stoff: "480 g/m² Bio-Baumwolle, angeraut",
    kurz: "Schwerer Hoodie, kastig geschnitten, mit doppelt gelegter Kapuze.",
    beschreibung: [
      "Der Werft ist unser schwerster Hoodie. 480 Gramm pro Quadratmeter, in Portugal gestrickt und dort auch gefärbt - er hält die Form, statt nach drei Wäschen auszuleiern.",
      "Kastiger Schnitt mit tief angesetzter Schulter. Wir empfehlen die gewohnte Größe; wer ihn eng mag, nimmt eine kleiner.",
    ],
    details: [
      { titel: "Material", text: "100 % Bio-Baumwolle (GOTS), 480 g/m², innen angeraut. Bündchen mit 5 % Elasthan." },
      { titel: "Passform", text: "Kastig, tief angesetzte Schulter. Model ist 184 cm groß und trägt M." },
      { titel: "Herstellung", text: "Gestrickt, gefärbt und genäht in Vila Nova de Gaia, Portugal." },
      { titel: "Pflege", text: "30 °C im Schonwaschgang, auf links. Nicht in den Trockner, nicht bügeln über dem Druck." },
    ],
    farben: [SCHWARZ, BETON, OLIV],
    groessen: ["XS", "S", "M", "L", "XL"],
    ausverkauft: ["XS"],
    marker: "Neu",
    bilder: bilder("hoodie-werft", "Hoodie Werft in Beton", "mode-hoodie", "#7c7871"),
  },
  {
    slug: "tee-basis",
    name: "T-Shirt Basis",
    kategorie: "oberteile",
    preis: "49",
    stoff: "240 g/m² Baumwolle, mercerisiert",
    kurz: "Boxy geschnittenes Shirt mit stehendem Rippkragen.",
    beschreibung: [
      "Das Shirt, das wir selbst am häufigsten tragen. Mercerisierte Baumwolle, damit die Oberfläche auch nach dreißig Wäschen noch glatt bleibt.",
      "Der Rippkragen ist doppelt genäht und steht - kein Wellenkragen nach dem zweiten Sommer.",
    ],
    details: [
      { titel: "Material", text: "100 % mercerisierte Baumwolle, 240 g/m², vorgewaschen." },
      { titel: "Passform", text: "Boxy, gerade Seitennaht. Fällt weit aus." },
      { titel: "Herstellung", text: "Genäht in Porto, Portugal." },
      { titel: "Pflege", text: "30 °C, auf links. Trocknergeeignet bei niedriger Stufe." },
    ],
    farben: [SCHWARZ, KREIDE, SAND],
    groessen: ["XS", "S", "M", "L", "XL"],
    bilder: bilder("tee-basis", "T-Shirt Basis in Kreide", "mode-shirt", "#a8a29a"),
  },
  {
    slug: "hose-kai",
    name: "Cargohose Kai",
    kategorie: "hosen",
    preis: "149",
    stoff: "Baumwoll-Twill, 320 g/m²",
    kurz: "Weite Cargohose mit Kordelzug am Saum.",
    beschreibung: [
      "Weit geschnitten, hoch sitzend, mit zwei aufgesetzten Beintaschen. Der Twill ist fest genug, dass die Hose steht, und weich genug, dass man sie den ganzen Tag trägt.",
      "Am Saum sitzt ein Kordelzug - offen fällt sie gerade, zugezogen wird sie zur Ballonform.",
    ],
    details: [
      { titel: "Material", text: "98 % Baumwolle, 2 % Elasthan. Twillbindung, 320 g/m²." },
      { titel: "Passform", text: "Weit, hohe Leibhöhe. Innenbeinlänge 78 cm bei Größe M." },
      { titel: "Herstellung", text: "Genäht in Guimarães, Portugal." },
      { titel: "Pflege", text: "30 °C, auf links. Bügeln bei mittlerer Temperatur." },
    ],
    farben: [OLIV, SCHWARZ, BETON],
    groessen: ["XS", "S", "M", "L", "XL"],
    ausverkauft: ["XL"],
    bilder: bilder("hose-kai", "Cargohose Kai in Oliv", "mode-hose", "#5a5c47"),
  },
  {
    slug: "mantel-fjord",
    name: "Wollmantel Fjord",
    kategorie: "outerwear",
    preis: "389",
    stoff: "Wollmischung, ungefüttert",
    kurz: "Ungefütterter Mantel mit fallendem Revers, bewusst über der Jacke getragen.",
    beschreibung: [
      "Der Fjord ist unser einziges Teil, das absichtlich zu groß ist. Er wird über der Jacke getragen, nicht statt ihr.",
      "Ungefüttert, mit versäuberten Innennähten - dadurch fällt er weich und lässt sich auch im Übergang tragen.",
    ],
    details: [
      { titel: "Material", text: "72 % Schurwolle, 28 % Polyamid. Ungefüttert, Innennähten mit Baumwollband eingefasst." },
      { titel: "Passform", text: "Sehr weit. Nehmen Sie die gewohnte Größe, nicht kleiner." },
      { titel: "Herstellung", text: "Gewebt in Biella, Italien. Genäht in Porto, Portugal." },
      { titel: "Pflege", text: "Nur Reinigung. Ausbürsten statt waschen." },
    ],
    farben: [BETON, SCHWARZ],
    groessen: ["S", "M", "L"],
    marker: "Kleinserie",
    bilder: bilder("mantel-fjord", "Wollmantel Fjord in Beton", "mode-mantel", "#6f6a63"),
  },
  {
    slug: "pullover-dock",
    name: "Strickpullover Dock",
    kategorie: "oberteile",
    preis: "169",
    vorher: "199",
    stoff: "Merinowolle, Grobstrick",
    kurz: "Grober Merinostrick mit Sattelschulter.",
    beschreibung: [
      "Grobstrick aus extrafeiner Merinowolle - warm, aber nicht kratzig. Die Sattelschulter macht ihn schulterbeweglich, ohne dass er ausbeult.",
      "Letzte Teile der Herbstserie, deshalb reduziert. Kommt in dieser Farbe nicht wieder.",
    ],
    details: [
      { titel: "Material", text: "100 % extrafeine Merinowolle, 19,5 Mikron. Strickstärke 5 gg." },
      { titel: "Passform", text: "Gerade, Sattelschulter. Entspricht der gewohnten Größe." },
      { titel: "Herstellung", text: "Gestrickt in Bergamo, Italien." },
      { titel: "Pflege", text: "Wollwaschgang bei 30 °C oder Handwäsche. Liegend trocknen." },
    ],
    farben: [SAND, OLIV],
    groessen: ["S", "M", "L", "XL"],
    ausverkauft: ["S", "XL"],
    marker: "Letzte Teile",
    bilder: bilder("pullover-dock", "Strickpullover Dock in Sand", "mode-strick", "#b09a80"),
  },
  {
    slug: "hemd-vika",
    name: "Leinenhemd Vika",
    kategorie: "oberteile",
    preis: "119",
    stoff: "Gewaschenes Leinen",
    kurz: "Weit geschnittenes Hemd aus vorgewaschenem Leinen.",
    beschreibung: [
      "Leinen aus Belgien, vorgewaschen, damit es beim ersten Waschen nicht eingeht. Es knittert - das ist der Punkt.",
      "Weit geschnitten, mit Kastenfalte im Rücken und Perlmuttknöpfen.",
    ],
    details: [
      { titel: "Material", text: "100 % europäisches Leinen, 165 g/m², steinvorgewaschen." },
      { titel: "Passform", text: "Weit, gerade. Kastenfalte im Rücken." },
      { titel: "Herstellung", text: "Gewebt in Kortrijk, Belgien. Genäht in Porto, Portugal." },
      { titel: "Pflege", text: "40 °C, Schonwaschgang. Feucht aufhängen, dann muss kaum gebügelt werden." },
    ],
    farben: [KREIDE, SAND, SCHWARZ],
    groessen: ["XS", "S", "M", "L", "XL"],
    bilder: bilder("hemd-vika", "Leinenhemd Vika in Kreide", "mode-hemd", "#9a938a"),
  },
  {
    slug: "tasche-skagen",
    name: "Tasche Skagen",
    kategorie: "accessoires",
    preis: "229",
    stoff: "Pflanzlich gegerbtes Rindsleder",
    kurz: "Schulterlasche aus vegetabil gegerbtem Leder, ungefüttert.",
    beschreibung: [
      "Ungefüttert, damit man sieht, woraus sie ist. Das Leder ist pflanzlich gegerbt und wird mit der Zeit dunkler - nach einem Jahr sieht jede Tasche anders aus.",
      "Passt ein 13-Zoll-Rechner, ein Notizbuch und eine Wasserflasche.",
    ],
    details: [
      { titel: "Material", text: "Pflanzlich gegerbtes Rindsleder, 2,2 mm. Messingbeschläge, unlackiert." },
      { titel: "Maße", text: "38 × 30 × 11 cm. Riemen 8-fach verstellbar, 62 bis 118 cm." },
      { titel: "Herstellung", text: "Gefertigt in Ubrique, Spanien." },
      { titel: "Pflege", text: "Trocken abwischen. Zweimal im Jahr mit farblosem Lederfett behandeln." },
    ],
    farben: [SAND, SCHWARZ],
    groessen: ["Einheitsgröße"],
    bilder: bilder("tasche-skagen", "Ledertasche Skagen in Sand", "mode-tasche", "#9b7d5c"),
  },
  {
    slug: "cap-signal",
    name: "Cap Signal",
    kategorie: "accessoires",
    preis: "45",
    stoff: "Baumwoll-Canvas, ungefüttert",
    kurz: "Sechsteilige Cap mit weichem Schirm und Metallschnalle.",
    beschreibung: [
      "Weicher, ungefütterter Schirm, damit sich die Cap zusammenrollen lässt. Rückwärtige Metallschnalle statt Klettverschluss.",
      "Der Canvas ist derselbe wie bei der Cargohose - Restmengen aus derselben Weberei.",
    ],
    details: [
      { titel: "Material", text: "100 % Baumwoll-Canvas, 320 g/m². Messingschnalle." },
      { titel: "Passform", text: "Einheitsgröße, verstellbar von 54 bis 61 cm." },
      { titel: "Herstellung", text: "Genäht in Porto, Portugal, aus Reststoffen der Hose Kai." },
      { titel: "Pflege", text: "Handwäsche, kalt. Nicht in die Maschine." },
    ],
    farben: [OLIV, SCHWARZ, BETON],
    groessen: ["Einheitsgröße"],
    bilder: bilder("cap-signal", "Cap Signal in Oliv", "mode-cap", "#5f6350"),
  },
];

export function produktBySlug(slug: string): Produkt | undefined {
  return produkte.find((p) => p.slug === slug);
}

/** Drei weitere Teile, die zum aufgerufenen passen - nie das Teil selbst. */
export function passtDazu(slug: string): Produkt[] {
  const aktuell = produktBySlug(slug);
  const andere = produkte.filter((p) => p.slug !== slug);
  const gleiche = andere.filter((p) => p.kategorie === aktuell?.kategorie);
  const rest = andere.filter((p) => p.kategorie !== aktuell?.kategorie);
  return [...gleiche, ...rest].slice(0, 3);
}

/** Attrappe eines gefüllten Warenkorbs für die Warenkorb-Schublade. */
export const warenkorb = [
  { slug: "hoodie-werft", groesse: "M", farbe: "Beton", menge: 1 },
  { slug: "tee-basis", groesse: "L", farbe: "Kreide", menge: 2 },
];
