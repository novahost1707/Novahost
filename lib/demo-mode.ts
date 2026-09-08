import type { Bildplatz } from "@/lib/demo-bilder";

/**
 * Sortiment des Demo-Shops ARVO (erfundenes Label).
 *
 * Marke: urbane Essentials aus Hamburg, kleine Serien, gedeckte Farben.
 * Der Name ist kurz, aussprechbar und trägt keine Bedeutung, die im Weg
 * steht - so arbeiten Modelabels tatsächlich.
 *
 * Ein Ort für alle Produktdaten, damit Startseite, Kategorie-, Produkt- und
 * Merklistenseite nicht auseinanderlaufen. Die Bildplätze zeigen auf
 * public/demo/mode/ - liegt dort ein Foto, wird es ausgeliefert.
 */

export const marke = {
  name: "ARVO",
  claim: "Urbane Essentials aus Hamburg",
  versandfreiAb: "80 €",
} as const;

export type Farbe = { name: string; wert: string };
export type Zielgruppe = "damen" | "herren" | "unisex";
export type KategorieId = "shirts" | "sweats" | "hosen" | "jacken" | "accessoires";

export type Produkt = {
  slug: string;
  name: string;
  kategorie: KategorieId;
  zielgruppe: Zielgruppe;
  /** Preis in Euro, ohne Währungszeichen. */
  preis: string;
  /** Vorheriger Preis, falls reduziert. Nur dann erscheint der Artikel im Sale. */
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

/* --- Farben -------------------------------------------------------------- */
const SCHWARZ: Farbe = { name: "Schwarz", wert: "#16171a" };
const BETON: Farbe = { name: "Beton", wert: "#8d8a84" };
const SAND: Farbe = { name: "Sand", wert: "#c3b4a0" };
const OLIV: Farbe = { name: "Oliv", wert: "#5a5c47" };
const KREIDE: Farbe = { name: "Kreide", wert: "#e6e2da" };
const RUSS: Farbe = { name: "Ruß", wert: "#3a3b3d" };
const LEHM: Farbe = { name: "Lehm", wert: "#9b7d5c" };

/* --- Kategorien ---------------------------------------------------------- */
export const kategorien: {
  id: KategorieId;
  name: string;
  kurz: string;
  text: string;
  bild: Bildplatz;
}[] = [
  {
    id: "shirts",
    name: "Shirts & Hemden",
    kurz: "Shirts",
    text: "Schwere Jerseys und gewaschenes Leinen, weit geschnitten.",
    bild: { src: "/demo/mode/kategorie-shirts.jpg", alt: "Model trägt ein weites Shirt vor einer Betonwand", ratio: "4 / 5", motiv: "mode-shirt", variante: 0, ton: "#9a938a" },
  },
  {
    id: "sweats",
    name: "Sweats & Strick",
    kurz: "Sweats",
    text: "480 g Jersey und Merinostrick für neun Monate im Jahr.",
    bild: { src: "/demo/mode/kategorie-sweats.jpg", alt: "Detailaufnahme eines schweren Hoodies", ratio: "4 / 5", motiv: "mode-hoodie", variante: 0, ton: "#7c7871" },
  },
  {
    id: "hosen",
    name: "Hosen",
    kurz: "Hosen",
    text: "Cargo, Twill und Jersey aus europäischer Fertigung.",
    bild: { src: "/demo/mode/kategorie-hosen.jpg", alt: "Weite Cargohose im Gehen", ratio: "4 / 5", motiv: "mode-hose", variante: 0, ton: "#5a5c47" },
  },
  {
    id: "jacken",
    name: "Jacken & Mäntel",
    kurz: "Jacken",
    text: "Vom Bomber bis zum ungefütterten Wollmantel.",
    bild: { src: "/demo/mode/kategorie-jacken.jpg", alt: "Wollmantel, offen getragen", ratio: "4 / 5", motiv: "mode-mantel", variante: 0, ton: "#6f6a63" },
  },
  {
    id: "accessoires",
    name: "Accessoires",
    kurz: "Accessoires",
    text: "Taschen, Caps und Kleinteile aus Restmengen.",
    bild: { src: "/demo/mode/kategorie-accessoires.jpg", alt: "Ledertasche und Cap auf einer Betonstufe", ratio: "4 / 5", motiv: "mode-tasche", variante: 0, ton: "#9b7d5c" },
  },
];

export const zielgruppen: { id: Zielgruppe; name: string; pfad: string }[] = [
  { id: "damen", name: "Damen", pfad: "/demo/mode/damen" },
  { id: "herren", name: "Herren", pfad: "/demo/mode/herren" },
];

type StueckMotiv =
  | "mode-hoodie" | "mode-shirt" | "mode-hemd" | "mode-strick" | "mode-mantel"
  | "mode-hose" | "mode-tasche" | "mode-cap" | "mode-jacke" | "mode-stepp"
  | "mode-muetze" | "mode-guertel";

/**
 * Drei Bildplätze je Artikel: zwei Ansichten des Stücks, eine Stoffaufnahme.
 * Jedes Stück bekommt seine eigene Zeichnung und seinen eigenen Ton, damit
 * ein Raster nicht wie mehrfach dasselbe Bild aussieht.
 */
function bilder(slug: string, alt: string, motiv: StueckMotiv, ton: string): Bildplatz[] {
  return [
    { src: `/demo/mode/${slug}-1.jpg`, alt: `${alt} - Vorderansicht`, ratio: "4 / 5", motiv, variante: 0, ton },
    { src: `/demo/mode/${slug}-2.jpg`, alt: `${alt} - Rückansicht`, ratio: "4 / 5", motiv, variante: 1, ton },
    { src: `/demo/mode/${slug}-3.jpg`, alt: `${alt} - Stoffdetail`, ratio: "4 / 5", motiv: "mode-stoff", variante: 2, ton },
  ];
}

const VERSAND = {
  titel: "Versand & Rückgabe",
  text: "Versandkostenfrei ab 80 € innerhalb Deutschlands, Lieferung in zwei bis vier Werktagen. Rückgabe innerhalb von 30 Tagen, ungetragen und mit Etikett. Das Rücksendeetikett liegt bei.",
};

export const produkte: Produkt[] = [
  /* --- Shirts & Hemden --- */
  {
    slug: "tee-kern",
    name: "T-Shirt Kern",
    kategorie: "shirts",
    zielgruppe: "unisex",
    preis: "49",
    stoff: "240 g/m² mercerisierte Baumwolle",
    kurz: "Boxy geschnittenes Shirt mit stehendem Rippkragen.",
    beschreibung: [
      "Das Shirt, das wir selbst am häufigsten tragen. Mercerisierte Baumwolle, damit die Oberfläche auch nach dreißig Wäschen noch glatt bleibt.",
      "Der Rippkragen ist doppelt genäht und steht - kein Wellenkragen nach dem zweiten Sommer.",
    ],
    details: [
      { titel: "Material", text: "100 % mercerisierte Baumwolle, 240 g/m², vorgewaschen." },
      { titel: "Passform", text: "Boxy, gerade Seitennaht. Fällt weit aus - im Zweifel eine Nummer kleiner." },
      { titel: "Herstellung", text: "Gestrickt und genäht in Porto, Portugal." },
      { titel: "Pflege", text: "30 °C, auf links. Trocknergeeignet bei niedriger Stufe." },
      VERSAND,
    ],
    farben: [SCHWARZ, KREIDE, SAND],
    groessen: ["XS", "S", "M", "L", "XL"],
    marker: "Bestseller",
    bilder: bilder("tee-kern", "T-Shirt Kern in Kreide", "mode-shirt", "#a8a29a"),
  },
  {
    slug: "longsleeve-nord",
    name: "Longsleeve Nord",
    kategorie: "shirts",
    zielgruppe: "unisex",
    preis: "65",
    stoff: "260 g/m² Baumwolle, gerippte Bündchen",
    kurz: "Langarmshirt mit tief angesetzter Schulter und langen Bündchen.",
    beschreibung: [
      "Etwas schwerer als das Kern und mit tief angesetzter Schulter. Die Bündchen sind bewusst lang - sie lassen sich zweimal umschlagen, ohne auszuleiern.",
      "Unter einem Hemd oder für sich allein. Beides funktioniert.",
    ],
    details: [
      { titel: "Material", text: "100 % Bio-Baumwolle, 260 g/m². Bündchen mit 4 % Elasthan." },
      { titel: "Passform", text: "Gerade, tief angesetzte Schulter. Entspricht der gewohnten Größe." },
      { titel: "Herstellung", text: "Genäht in Porto, Portugal." },
      { titel: "Pflege", text: "30 °C, auf links. Nicht in den Trockner." },
      VERSAND,
    ],
    farben: [RUSS, KREIDE, OLIV],
    groessen: ["XS", "S", "M", "L", "XL"],
    ausverkauft: ["XS"],
    bilder: bilder("longsleeve-nord", "Longsleeve Nord in Ruß", "mode-shirt", "#6f6a63"),
  },
  {
    slug: "hemd-vika",
    name: "Leinenhemd Vika",
    kategorie: "shirts",
    zielgruppe: "damen",
    preis: "119",
    stoff: "Gewaschenes belgisches Leinen",
    kurz: "Weit geschnittenes Hemd aus vorgewaschenem Leinen.",
    beschreibung: [
      "Leinen aus Belgien, vorgewaschen, damit es beim ersten Waschen nicht eingeht. Es knittert - das ist der Punkt.",
      "Weit geschnitten, mit Kastenfalte im Rücken und Perlmuttknöpfen.",
    ],
    details: [
      { titel: "Material", text: "100 % europäisches Leinen, 165 g/m², steinvorgewaschen." },
      { titel: "Passform", text: "Weit, gerade. Kastenfalte im Rücken." },
      { titel: "Herstellung", text: "Gewebt in Kortrijk, Belgien. Genäht in Porto." },
      { titel: "Pflege", text: "40 °C, Schonwaschgang. Feucht aufhängen, dann muss kaum gebügelt werden." },
      VERSAND,
    ],
    farben: [KREIDE, SAND, SCHWARZ],
    groessen: ["XS", "S", "M", "L", "XL"],
    bilder: bilder("hemd-vika", "Leinenhemd Vika in Kreide", "mode-hemd", "#9a938a"),
  },
  {
    slug: "shirt-linie",
    name: "Ripp-Shirt Linie",
    kategorie: "shirts",
    zielgruppe: "damen",
    preis: "55",
    stoff: "Feinripp aus Baumwolle und Modal",
    kurz: "Anliegendes Ripp-Shirt mit schmalem Rundhals.",
    beschreibung: [
      "Das einzige Teil im Sortiment, das eng sitzt. Feinripp aus Baumwolle und Modal, deshalb fällt es weich statt steif.",
      "Gedacht als Gegenstück zu den weiten Hosen - der Kontrast macht die Silhouette.",
    ],
    details: [
      { titel: "Material", text: "62 % Baumwolle, 33 % Modal, 5 % Elasthan." },
      { titel: "Passform", text: "Körpernah. Dehnt sich beim Tragen leicht - im Zweifel die kleinere Größe." },
      { titel: "Herstellung", text: "Gestrickt und genäht in Porto, Portugal." },
      { titel: "Pflege", text: "30 °C, Schonwaschgang. Nicht in den Trockner." },
      VERSAND,
    ],
    farben: [SCHWARZ, KREIDE, LEHM],
    groessen: ["XS", "S", "M", "L"],
    bilder: bilder("shirt-linie", "Ripp-Shirt Linie in Schwarz", "mode-shirt", "#4a4b4d"),
  },

  /* --- Sweats & Strick --- */
  {
    slug: "hoodie-werft",
    name: "Hoodie Werft",
    kategorie: "sweats",
    zielgruppe: "unisex",
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
      { titel: "Pflege", text: "30 °C im Schonwaschgang, auf links. Nicht in den Trockner." },
      VERSAND,
    ],
    farben: [SCHWARZ, BETON, OLIV],
    groessen: ["XS", "S", "M", "L", "XL"],
    ausverkauft: ["XS"],
    marker: "Bestseller",
    bilder: bilder("hoodie-werft", "Hoodie Werft in Beton", "mode-hoodie", "#7c7871"),
  },
  {
    slug: "hoodie-kai",
    name: "Zip-Hoodie Kai",
    kategorie: "sweats",
    zielgruppe: "herren",
    preis: "149",
    stoff: "440 g/m² Baumwolle, Zweiwege-Reißverschluss",
    kurz: "Durchgeknöpfter Sweat mit Stehkragen und Zweiwege-Zipper.",
    beschreibung: [
      "Der Zipper läuft von beiden Seiten - unten geöffnet fällt der Sweat über der Hose wie eine Jacke.",
      "Stehkragen statt Kapuze, damit er unter einem Mantel nicht aufträgt.",
    ],
    details: [
      { titel: "Material", text: "100 % Bio-Baumwolle, 440 g/m². Metallzipper von YKK, unlackiert." },
      { titel: "Passform", text: "Gerade, etwas schmaler als der Werft. Entspricht der gewohnten Größe." },
      { titel: "Herstellung", text: "Genäht in Vila Nova de Gaia, Portugal." },
      { titel: "Pflege", text: "30 °C, Zipper geschlossen waschen." },
      VERSAND,
    ],
    farben: [SCHWARZ, RUSS],
    groessen: ["S", "M", "L", "XL"],
    bilder: bilder("hoodie-kai", "Zip-Hoodie Kai in Ruß", "mode-hoodie", "#4a4b4d"),
  },
  {
    slug: "sweater-kante",
    name: "Sweater Kante",
    kategorie: "sweats",
    zielgruppe: "damen",
    preis: "119",
    stoff: "420 g/m² Baumwolle, gekürzter Saum",
    kurz: "Kurz geschnittener Sweater mit breitem Rippbund.",
    beschreibung: [
      "Auf Taillenhöhe gekürzt, mit breitem Rippbund - gedacht über den weiten Hosen aus derselben Serie.",
      "Innen angeraut, außen glatt. Er behält seine Form, weil der Bund doppelt gelegt ist.",
    ],
    details: [
      { titel: "Material", text: "100 % Bio-Baumwolle, 420 g/m², innen angeraut." },
      { titel: "Passform", text: "Kastig und kurz. Der Bund sitzt auf Taillenhöhe." },
      { titel: "Herstellung", text: "Gestrickt und genäht in Porto, Portugal." },
      { titel: "Pflege", text: "30 °C, auf links. Nicht in den Trockner." },
      VERSAND,
    ],
    farben: [KREIDE, LEHM, SCHWARZ],
    groessen: ["XS", "S", "M", "L"],
    bilder: bilder("sweater-kante", "Sweater Kante in Lehm", "mode-hoodie", "#9b7d5c"),
  },
  {
    slug: "strick-dock",
    name: "Strickpullover Dock",
    kategorie: "sweats",
    zielgruppe: "unisex",
    preis: "169",
    vorher: "199",
    stoff: "Extrafeine Merinowolle, Grobstrick",
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
      VERSAND,
    ],
    farben: [SAND, OLIV],
    groessen: ["S", "M", "L", "XL"],
    ausverkauft: ["S", "XL"],
    marker: "Letzte Teile",
    bilder: bilder("strick-dock", "Strickpullover Dock in Sand", "mode-strick", "#b09a80"),
  },

  /* --- Hosen --- */
  {
    slug: "hose-kai",
    name: "Cargohose Kai",
    kategorie: "hosen",
    zielgruppe: "herren",
    preis: "149",
    stoff: "320 g/m² Baumwoll-Twill",
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
      VERSAND,
    ],
    farben: [OLIV, SCHWARZ, BETON],
    groessen: ["XS", "S", "M", "L", "XL"],
    ausverkauft: ["XL"],
    bilder: bilder("hose-kai", "Cargohose Kai in Oliv", "mode-hose", "#5a5c47"),
  },
  {
    slug: "hose-ebbe",
    name: "Weite Hose Ebbe",
    kategorie: "hosen",
    zielgruppe: "damen",
    preis: "139",
    stoff: "Tencel-Baumwoll-Mischung, fließend",
    kurz: "Fließende Palazzohose mit Bundfalte und hohem Bund.",
    beschreibung: [
      "Fällt weich statt steif, weil Tencel im Gewebe steckt. Die Bundfalte gibt Volumen, ohne aufzutragen.",
      "Zwei eingesetzte Seitentaschen, hinten geschlossen - damit die Linie sauber bleibt.",
    ],
    details: [
      { titel: "Material", text: "58 % Tencel Lyocell, 42 % Baumwolle." },
      { titel: "Passform", text: "Sehr weit, hohe Leibhöhe. Innenbeinlänge 80 cm bei Größe M." },
      { titel: "Herstellung", text: "Genäht in Guimarães, Portugal." },
      { titel: "Pflege", text: "30 °C, Schonwaschgang. Bügeln bei mittlerer Temperatur." },
      VERSAND,
    ],
    farben: [SCHWARZ, SAND, OLIV],
    groessen: ["XS", "S", "M", "L"],
    marker: "Neu",
    bilder: bilder("hose-ebbe", "Weite Hose Ebbe in Sand", "mode-hose", "#b6a992"),
  },
  {
    slug: "jogger-deich",
    name: "Jogger Deich",
    kategorie: "hosen",
    zielgruppe: "unisex",
    preis: "99",
    stoff: "380 g/m² Baumwolle, angeraut",
    kurz: "Schwerer Jogger mit Kordelzug und abgesetzten Bündchen.",
    beschreibung: [
      "Kein Trainingsanzug: Der Stoff ist so schwer, dass die Hose fällt wie eine Stoffhose - nur eben mit Bund.",
      "Passt zum Werft und zum Kai, absichtlich im selben Ton gefärbt.",
    ],
    details: [
      { titel: "Material", text: "100 % Bio-Baumwolle, 380 g/m², innen angeraut." },
      { titel: "Passform", text: "Gerade, leicht verjüngt. Entspricht der gewohnten Größe." },
      { titel: "Herstellung", text: "Genäht in Vila Nova de Gaia, Portugal." },
      { titel: "Pflege", text: "30 °C, auf links. Nicht in den Trockner." },
      VERSAND,
    ],
    farben: [SCHWARZ, BETON, OLIV],
    groessen: ["XS", "S", "M", "L", "XL"],
    bilder: bilder("jogger-deich", "Jogger Deich in Beton", "mode-hose", "#8d8a84"),
  },

  /* --- Jacken & Mäntel --- */
  {
    slug: "mantel-fjord",
    name: "Wollmantel Fjord",
    kategorie: "jacken",
    zielgruppe: "unisex",
    preis: "289",
    vorher: "389",
    stoff: "Wollmischung, ungefüttert",
    kurz: "Ungefütterter Mantel mit fallendem Revers, bewusst über der Jacke getragen.",
    beschreibung: [
      "Der Fjord ist unser einziges Teil, das absichtlich zu groß ist. Er wird über der Jacke getragen, nicht statt ihr.",
      "Ungefüttert, mit versäuberten Innennähten - dadurch fällt er weich und lässt sich auch im Übergang tragen.",
    ],
    details: [
      { titel: "Material", text: "72 % Schurwolle, 28 % Polyamid. Ungefüttert, Innennähte mit Baumwollband eingefasst." },
      { titel: "Passform", text: "Sehr weit. Nehmen Sie die gewohnte Größe, nicht kleiner." },
      { titel: "Herstellung", text: "Gewebt in Biella, Italien. Genäht in Porto, Portugal." },
      { titel: "Pflege", text: "Nur Reinigung. Ausbürsten statt waschen." },
      VERSAND,
    ],
    farben: [BETON, SCHWARZ],
    groessen: ["S", "M", "L"],
    marker: "Kleinserie",
    bilder: bilder("mantel-fjord", "Wollmantel Fjord in Beton", "mode-mantel", "#6f6a63"),
  },
  {
    slug: "jacke-halde",
    name: "Bomber Halde",
    kategorie: "jacken",
    zielgruppe: "herren",
    preis: "219",
    stoff: "Beschichteter Baumwoll-Canvas",
    kurz: "Kurze Blousonjacke mit Rippbund und verdeckten Taschen.",
    beschreibung: [
      "Der Canvas ist beschichtet, deshalb hält die Jacke Nieselregen ab, ohne wie eine Regenjacke zu rascheln.",
      "Rippbund an Saum und Ärmeln, Taschen verdeckt in der Seitennaht - außen ist nichts zu sehen außer der Naht.",
    ],
    details: [
      { titel: "Material", text: "100 % Baumwoll-Canvas mit Wachsbeschichtung, 340 g/m². Futter aus Viskose." },
      { titel: "Passform", text: "Kurz und gerade. Über einem Sweat getragen die gewohnte Größe." },
      { titel: "Herstellung", text: "Genäht in Porto, Portugal." },
      { titel: "Pflege", text: "Nicht waschen. Feucht abwischen, jährlich nachwachsen lassen." },
      VERSAND,
    ],
    farben: [OLIV, SCHWARZ, RUSS],
    groessen: ["S", "M", "L", "XL"],
    bilder: bilder("jacke-halde", "Bomber Halde in Oliv", "mode-jacke", "#5f6350"),
  },
  {
    slug: "jacke-moewe",
    name: "Steppjacke Möwe",
    kategorie: "jacken",
    zielgruppe: "damen",
    preis: "149",
    vorher: "199",
    stoff: "Recyceltes Nylon, Daunenersatz",
    kurz: "Leichte Steppjacke, packbar, mit hohem Kragen.",
    beschreibung: [
      "Wiegt 380 Gramm und passt zusammengelegt in die eigene Innentasche. Trotzdem warm genug für den Übergang.",
      "Die Füllung ist tierfrei und aus Recyclingmaterial. Der Kragen steht bis zum Kinn.",
    ],
    details: [
      { titel: "Material", text: "Außen 100 % recyceltes Nylon, Füllung 100 % recyceltes Polyester." },
      { titel: "Passform", text: "Gerade, leicht tailliert. Entspricht der gewohnten Größe." },
      { titel: "Herstellung", text: "Genäht in Porto, Portugal." },
      { titel: "Pflege", text: "30 °C, Schonwaschgang. Im Trockner mit Tennisbällen auflockern." },
      VERSAND,
    ],
    farben: [SCHWARZ, SAND],
    groessen: ["XS", "S", "M", "L"],
    ausverkauft: ["XS"],
    bilder: bilder("jacke-moewe", "Steppjacke Möwe in Sand", "mode-stepp", "#b6a992"),
  },

  /* --- Accessoires --- */
  {
    slug: "tasche-skagen",
    name: "Tasche Skagen",
    kategorie: "accessoires",
    zielgruppe: "unisex",
    preis: "229",
    stoff: "Pflanzlich gegerbtes Rindsleder",
    kurz: "Schultertasche aus vegetabil gegerbtem Leder, ungefüttert.",
    beschreibung: [
      "Ungefüttert, damit man sieht, woraus sie ist. Das Leder ist pflanzlich gegerbt und wird mit der Zeit dunkler - nach einem Jahr sieht jede Tasche anders aus.",
      "Passt ein 13-Zoll-Rechner, ein Notizbuch und eine Wasserflasche.",
    ],
    details: [
      { titel: "Material", text: "Pflanzlich gegerbtes Rindsleder, 2,2 mm. Messingbeschläge, unlackiert." },
      { titel: "Maße", text: "38 × 30 × 11 cm. Riemen 8-fach verstellbar, 62 bis 118 cm." },
      { titel: "Herstellung", text: "Gefertigt in Ubrique, Spanien." },
      { titel: "Pflege", text: "Trocken abwischen. Zweimal im Jahr mit farblosem Lederfett behandeln." },
      VERSAND,
    ],
    farben: [SAND, SCHWARZ],
    groessen: ["Einheitsgröße"],
    bilder: bilder("tasche-skagen", "Ledertasche Skagen in Sand", "mode-tasche", "#9b7d5c"),
  },
  {
    slug: "cap-signal",
    name: "Cap Signal",
    kategorie: "accessoires",
    zielgruppe: "unisex",
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
      { titel: "Herstellung", text: "Genäht in Porto aus Reststoffen der Hose Kai." },
      { titel: "Pflege", text: "Handwäsche, kalt. Nicht in die Maschine." },
      VERSAND,
    ],
    farben: [OLIV, SCHWARZ, BETON],
    groessen: ["Einheitsgröße"],
    bilder: bilder("cap-signal", "Cap Signal in Oliv", "mode-cap", "#5f6350"),
  },
  {
    slug: "muetze-ripp",
    name: "Mütze Ripp",
    kategorie: "accessoires",
    zielgruppe: "unisex",
    preis: "29",
    vorher: "39",
    stoff: "Merinowolle, doppelt gerippt",
    kurz: "Kurze Rippmütze aus Merinowolle, ohne Umschlag.",
    beschreibung: [
      "Sitzt kurz, ohne Umschlag - deshalb drückt sie nicht auf die Stirn.",
      "Aus derselben Merinowolle wie der Dock. Restmengen, deshalb reduziert.",
    ],
    details: [
      { titel: "Material", text: "100 % extrafeine Merinowolle, 19,5 Mikron." },
      { titel: "Passform", text: "Einheitsgröße, dehnbar." },
      { titel: "Herstellung", text: "Gestrickt in Bergamo, Italien." },
      { titel: "Pflege", text: "Handwäsche, kalt. Liegend trocknen." },
      VERSAND,
    ],
    farben: [SCHWARZ, SAND, OLIV],
    groessen: ["Einheitsgröße"],
    bilder: bilder("muetze-ripp", "Mütze Ripp in Schwarz", "mode-muetze", "#4a4b4d"),
  },
  {
    slug: "guertel-kante",
    name: "Gürtel Kante",
    kategorie: "accessoires",
    zielgruppe: "unisex",
    preis: "79",
    stoff: "Pflanzlich gegerbtes Rindsleder, 3,5 mm",
    kurz: "Breiter Ledergürtel mit unlackierter Messingschnalle.",
    beschreibung: [
      "Aus einem Stück geschnitten, nicht gespalten und zusammengeklebt. Deshalb hält er länger als die meisten.",
      "Die Schnalle ist unlackiert und läuft an - so wie die Beschläge an der Tasche Skagen.",
    ],
    details: [
      { titel: "Material", text: "Pflanzlich gegerbtes Rindsleder, 3,5 mm. Messingschnalle, unlackiert." },
      { titel: "Maße", text: "3,5 cm breit. Fünf Löcher im Abstand von 2,5 cm." },
      { titel: "Herstellung", text: "Gefertigt in Ubrique, Spanien." },
      { titel: "Pflege", text: "Trocken abwischen, gelegentlich mit Lederfett behandeln." },
      VERSAND,
    ],
    farben: [SCHWARZ, LEHM],
    groessen: ["80", "85", "90", "95", "100"],
    ausverkauft: ["100"],
    bilder: bilder("guertel-kante", "Gürtel Kante in Lehm", "mode-guertel", "#8a6a4a"),
  },
];

/* --- Zugriffe ------------------------------------------------------------ */

export function produktBySlug(slug: string): Produkt | undefined {
  return produkte.find((p) => p.slug === slug);
}

export function kategorieById(id: string) {
  return kategorien.find((k) => k.id === id);
}

export function nachKategorie(id: KategorieId): Produkt[] {
  return produkte.filter((p) => p.kategorie === id);
}

/** Damen und Herren sehen jeweils auch die Unisex-Teile. */
export function nachZielgruppe(z: Zielgruppe): Produkt[] {
  return produkte.filter((p) => p.zielgruppe === z || p.zielgruppe === "unisex");
}

export function imSale(): Produkt[] {
  return produkte.filter((p) => p.vorher);
}

/** Rabatt in ganzen Prozent, für die Kennzeichnung im Sale. */
export function rabattProzent(p: Produkt): number | null {
  if (!p.vorher) return null;
  const alt = Number(p.vorher.replace(",", "."));
  const neu = Number(p.preis.replace(",", "."));
  if (!alt || alt <= neu) return null;
  return Math.round(((alt - neu) / alt) * 100);
}

/** Drei weitere Teile, die zum aufgerufenen passen - nie das Teil selbst. */
export function passtDazu(slug: string): Produkt[] {
  const aktuell = produktBySlug(slug);
  const andere = produkte.filter((p) => p.slug !== slug);
  const gleicheZielgruppe = andere.filter(
    (p) => aktuell && (p.zielgruppe === aktuell.zielgruppe || p.zielgruppe === "unisex"),
  );
  const andereKategorie = gleicheZielgruppe.filter((p) => p.kategorie !== aktuell?.kategorie);
  return [...andereKategorie, ...gleicheZielgruppe].slice(0, 3);
}
