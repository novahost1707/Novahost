import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import { Bild } from "@/components/demo/Bild";
import type { Bildplatz } from "@/lib/demo-bilder";
import "@/styles/demo-cafe.css";

/**
 * Demo 1 - Morgentau Kaffeerösterei (erfundener Betrieb).
 *
 * Haltung: Specialty Coffee. Warm und handgemacht, aber präzise - eine
 * Rösterei, die ihr Handwerk ernst nimmt. Serifenschrift mit optischer Größe,
 * cremiger Grund, redaktioneller Rhythmus statt Kachelraster. Bewusst das
 * Gegenteil des Novahost-Auftritts.
 *
 * Bildplätze: public/demo/cafe/*. Solange dort nichts liegt, zeichnet <Bild>
 * das jeweilige Motiv in der Farbwelt der Seite.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Morgentau Kaffeerösterei - Demo-Projekt",
  description: "Demo-Projekt von Novahost: Website für eine Specialty-Coffee-Rösterei mit Café.",
};

export const viewport: Viewport = { themeColor: "#f5efe6", colorScheme: "light" };

/* --- Bildplätze ---------------------------------------------------------- */
const BILD_HERO: Bildplatz = {
  src: "/demo/cafe/hero.jpg",
  alt: "Barista an der Siebträgermaschine, Blick über die Theke",
  ratio: "4 / 5",
  motiv: "kaffee-tasse",
};
const BILD_ROESTUNG: Bildplatz[] = [
  { src: "/demo/cafe/roestung-morgentau.jpg", alt: "Helle Röstung Morgentau, Bohnen in der Schale", ratio: "1 / 1", motiv: "kaffee-bohnen", variante: 0 },
  { src: "/demo/cafe/roestung-sieben.jpg", alt: "Hausmischung Nummer Sieben, Bohnen in der Schale", ratio: "1 / 1", motiv: "kaffee-bohnen", variante: 1 },
  { src: "/demo/cafe/roestung-nachtschicht.jpg", alt: "Dunkle Röstung Nachtschicht, Bohnen in der Schale", ratio: "1 / 1", motiv: "kaffee-bohnen", variante: 2 },
];
const BILD_ROESTER: Bildplatz = {
  src: "/demo/cafe/roester.jpg",
  alt: "Trommelröster in der Rösterei während des Röstvorgangs",
  ratio: "3 / 4",
  motiv: "kaffee-handwerk",
};
const BILD_RAUM: Bildplatz[] = [
  { src: "/demo/cafe/raum-theke.jpg", alt: "Blick in den Gastraum mit Theke am Morgen", ratio: "16 / 11", motiv: "kaffee-raum", variante: 0 },
  { src: "/demo/cafe/raum-hof.jpg", alt: "Der begrünte Innenhof mit Sitzplätzen", ratio: "4 / 5", motiv: "kaffee-bohnen", variante: 3 },
  { src: "/demo/cafe/raum-tisch.jpg", alt: "Gedeckter Tisch mit Frühstücksbrett und Cappuccino", ratio: "4 / 5", motiv: "kaffee-handwerk", variante: 1 },
  { src: "/demo/cafe/raum-fenster.jpg", alt: "Fensterplatz mit Blick auf die Lindenstraße", ratio: "16 / 11", motiv: "kaffee-raum", variante: 1 },
];

/* --- Inhalte ------------------------------------------------------------- */
const ROESTUNGEN = [
  {
    name: "Morgentau",
    herkunft: "Äthiopien · Sidamo · 1.900 m",
    preis: "9,80",
    text: "Hell geröstet, gewaschen aufbereitet. Wach und klar - die Röstung, mit der wir angefangen haben.",
    noten: ["Zitrone", "Jasmin", "Schwarztee"],
    profil: [["Säure", 82], ["Körper", 38], ["Süße", 64]] as const,
    bild: 0,
  },
  {
    name: "Nummer Sieben",
    herkunft: "Kolumbien · Huila · 1.650 m",
    preis: "8,90",
    text: "Unsere Hausmischung, siebter Versuch und seitdem unverändert. Funktioniert im Espresso wie im Filter.",
    noten: ["Haselnuss", "Karamell", "Orange"],
    profil: [["Säure", 46], ["Körper", 68], ["Süße", 78]] as const,
    bild: 1,
  },
  {
    name: "Nachtschicht",
    herkunft: "Brasilien · Sul de Minas · 1.100 m",
    preis: "8,40",
    text: "Dunkel geröstet, für alle, die Milch mögen. Trägt durch den Cappuccino, ohne bitter zu werden.",
    noten: ["Kakao", "Malz", "Walnuss"],
    profil: [["Säure", 24], ["Körper", 88], ["Süße", 58]] as const,
    bild: 2,
  },
];

const SCHRITTE = [
  { num: "01", titel: "Einkauf", text: "Wir kaufen über zwei Importeure, die Höhenlage, Aufbereitung und Erntejahr offenlegen. Kein Blend aus unbekannter Herkunft." },
  { num: "02", titel: "Röstung", text: "Dienstags am 12-Kilo-Trommelröster. Jede Charge bekommt ein eigenes Profil, das wir mitschreiben und nachjustieren." },
  { num: "03", titel: "Ruhezeit", text: "Sieben Tage Rast, bevor eine Bohne in die Mühle darf. Vorher schmeckt sie flach, nachher wird sie müde." },
  { num: "04", titel: "Ausschank", text: "Espressomühle täglich neu eingestellt, Filter nach Gewicht gebrüht. Was älter als drei Wochen ist, geht nicht mehr in die Tasse." },
];

const KAFFEE = [
  { name: "Espresso", preis: "2,40", note: "Doppelt 3,10 €" },
  { name: "Cappuccino", preis: "3,60", note: "Hafer-, Soja- oder Kuhmilch, ohne Aufpreis" },
  { name: "Filterkaffee", preis: "3,20", note: "Wechselnde Röstung, serviert in der Karaffe" },
  { name: "Cold Brew", preis: "4,10", note: "18 Stunden kalt gezogen, auf Eis" },
  { name: "Heiße Schokolade", preis: "3,90", note: "Mit 62 % Kakao aus Hamburg" },
];

const KUECHE = [
  { name: "Frühstücksbrett", preis: "12,50", note: "Sauerteig, Ei, Käse, Marmelade, Obst der Saison" },
  { name: "Zimtschnecke", preis: "3,80", note: "Ab sieben Uhr im Ofen, meist mittags weg" },
  { name: "Käsekuchen", preis: "4,20", note: "Nach dem Rezept von Frau Kellner" },
  { name: "Suppe des Tages", preis: "6,90", note: "Immer vegetarisch, mit Brot" },
  { name: "Avocadobrot", preis: "9,40", note: "Sauerteig, Limette, Chili, wahlweise mit Ei" },
];

const ZEITEN = [
  { tag: "Montag", zeit: "Ruhetag", heute: false },
  { tag: "Dienstag - Freitag", zeit: "07:30 - 18:00", heute: true },
  { tag: "Samstag", zeit: "08:30 - 18:00", heute: false },
  { tag: "Sonntag", zeit: "09:00 - 16:00", heute: false },
];

const LAUFBAND = [
  "Eigene Rösterei",
  "Direkt gehandelter Rohkaffee",
  "Frühstück bis 15 Uhr",
  "Röstschau samstags",
  "Hof mit 30 Plätzen",
];

export default function CafeDemo() {
  return (
    <div className={`demo cafe ${fraunces.variable}`}>
      <div className="cafe__topbar">
        <div className="demo__shell cafe__topbar-inner">
          <span><i aria-hidden="true" />Röstschau jeden Samstag um 11 Uhr - ohne Anmeldung</span>
          <span>Lindenstraße 14 · 12345 Musterstadt</span>
        </div>
      </div>

      <div className="demo__shell">
        <nav className="cafe__nav">
          <a href="#" className="cafe__marke">
            <span className="cafe__bohne" aria-hidden="true" />
            <span>
              Morgentau
              <small>Kaffeerösterei</small>
            </span>
          </a>
          <div className="cafe__navlinks">
            <a href="#roesterei">Rösterei</a>
            <a href="#handwerk">Handwerk</a>
            <a href="#karte">Karte</a>
            <a href="#besuch">Besuch</a>
          </div>
          <a href="#besuch" className="cafe__btn cafe__btn--leer cafe__btn--klein">Tisch anfragen</a>
        </nav>

        <header className="cafe__hero">
          <div>
            <p className="cafe__kicker">Rösterei und Frühstück seit 2009</p>
            <h1 className="cafe__titel cafe__display">
              Guter Kaffee braucht <em>Zeit</em> und einen Ort.
            </h1>
            <p className="cafe__lead">
              Wir rösten zwei Straßen weiter, backen jeden Morgen und lassen niemanden hetzen.
              Kommen Sie zum Frühstück, bleiben Sie bis zum zweiten Kaffee.
            </p>
            <div className="cafe__hero-aktionen">
              <a href="#karte" className="cafe__btn cafe__btn--voll">
                Zur Karte <span aria-hidden="true">&#8594;</span>
              </a>
              <a href="#roesterei" className="cafe__btn cafe__btn--leer">Unsere Röstungen</a>
            </div>
            <div className="cafe__hero-fuss">
              <span><b>44</b> Plätze innen</span>
              <span><b>30</b> im Hof</span>
              <span><b>3</b> eigene Röstungen</span>
              <span><b>7:30</b> Uhr geöffnet</span>
            </div>
          </div>
          <div className="cafe__hero-bild">
            <Bild platz={BILD_HERO} sizes="(max-width: 900px) 100vw, 44vw" priority />
            <p className="cafe__bildnote">Jeden Morgen ab 6:30 Uhr in der Backstube</p>
          </div>
        </header>
      </div>

      <div className="cafe__laufband" aria-hidden="true">
        <div className="cafe__laufband-spur">
          {[0, 1].map((durchlauf) => (
            <span key={durchlauf}>
              {LAUFBAND.map((wort) => (
                <span key={wort}>{wort}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section className="cafe__section">
        <div className="demo__shell cafe__statement auf">
          <p className="cafe__display">
            Wir machen keinen Kaffee für alle. Wir machen den Kaffee, den wir selbst jeden Tag
            trinken - und erklären gern, warum er so schmeckt.
          </p>
          <dl className="cafe__fakten">
            <div className="cafe__fakt"><dt>Gegründet</dt><dd>2009</dd></div>
            <div className="cafe__fakt"><dt>Röstmenge im Jahr</dt><dd>ca. 6 Tonnen</dd></div>
            <div className="cafe__fakt"><dt>Herkünfte</dt><dd>3 Länder, 5 Höfe</dd></div>
            <div className="cafe__fakt"><dt>Team</dt><dd>9 Personen</dd></div>
          </dl>
        </div>
      </section>

      <section className="cafe__section cafe__section--papier" id="roesterei">
        <div className="demo__shell">
          <div className="cafe__kopf cafe__kopf--reihe auf">
            <div>
              <p className="cafe__kicker">Unsere Rösterei</p>
              <h2 className="cafe__h2 cafe__display">Drei Röstungen, mehr brauchen wir nicht.</h2>
              <p>
                Kleine Mengen, direkt eingekauft, jeden Dienstag frisch geröstet. Alle drei gibt es
                als 250-Gramm-Beutel über die Theke - ganze Bohne oder auf Ihre Mühle gemahlen.
              </p>
            </div>
            <a href="#besuch" className="cafe__btn cafe__btn--leer cafe__btn--klein">
              Im Laden erhältlich <span aria-hidden="true">&#8594;</span>
            </a>
          </div>

          <div className="cafe__roestungen">
            {ROESTUNGEN.map((r) => (
              <article className="cafe__roestung zoom auf" key={r.name}>
                <Bild platz={BILD_ROESTUNG[r.bild]!} sizes="(max-width: 620px) 100vw, (max-width: 900px) 46vw, 30vw" />
                <div className="cafe__roestung-kopf">
                  <h3>{r.name}</h3>
                  <span className="cafe__roestung-preis">{r.preis} &euro;</span>
                </div>
                <p className="cafe__label">{r.herkunft}</p>
                <p>{r.text}</p>
                <div className="cafe__noten">
                  {r.noten.map((n) => <span className="cafe__note" key={n}>{n}</span>)}
                </div>
                <div className="cafe__balken">
                  {r.profil.map(([was, wert]) => (
                    <div className="cafe__balken-zeile" key={was}>
                      <span>{was}</span>
                      <span className="cafe__balken-spur">
                        <i style={{ width: `${wert}%` }} />
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cafe__section cafe__section--tief" id="handwerk">
        <div className="demo__shell cafe__ablauf">
          <div className="auf">
            <Bild platz={BILD_ROESTER} sizes="(max-width: 900px) 100vw, 40vw" />
          </div>
          <div>
            <div className="cafe__kopf auf" style={{ marginBottom: "10px" }}>
              <p className="cafe__kicker">Vom Rohkaffee zur Tasse</p>
              <h2 className="cafe__h2 cafe__display">Vier Schritte, keiner davon abgekürzt.</h2>
            </div>
            <div className="cafe__schritte">
              {SCHRITTE.map((s) => (
                <div className="cafe__schritt auf" key={s.num}>
                  <span className="cafe__schritt-num">{s.num}</span>
                  <div>
                    <h3>{s.titel}</h3>
                    <p>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cafe__section" id="karte">
        <div className="demo__shell">
          <div className="cafe__kopf auf">
            <p className="cafe__kicker">Karte</p>
            <h2 className="cafe__h2 cafe__display">Was heute da ist.</h2>
            <p>
              Kuchen und Suppe wechseln täglich. Was aus ist, ist aus - das ist kein Fehler,
              das ist frisch.
            </p>
          </div>

          <div className="cafe__karte auf">
            <div className="cafe__karte-spalte">
              <h3>Aus der Rösterei <small>ganztags</small></h3>
              {KAFFEE.map((p) => (
                <div className="cafe__posten" key={p.name}>
                  <div className="cafe__posten-zeile">
                    <b>{p.name}</b>
                    <span className="cafe__punkte" aria-hidden="true" />
                    <span className="cafe__preis">{p.preis} &euro;</span>
                  </div>
                  {p.note && <small>{p.note}</small>}
                </div>
              ))}
            </div>
            <div className="cafe__karte-spalte">
              <h3>Aus der Küche <small>bis 15 Uhr</small></h3>
              {KUECHE.map((p) => (
                <div className="cafe__posten" key={p.name}>
                  <div className="cafe__posten-zeile">
                    <b>{p.name}</b>
                    <span className="cafe__punkte" aria-hidden="true" />
                    <span className="cafe__preis">{p.preis} &euro;</span>
                  </div>
                  {p.note && <small>{p.note}</small>}
                </div>
              ))}
            </div>
          </div>

          <p className="cafe__karte-hinweis auf">
            <b>Allergien und Unverträglichkeiten:</b> Sagen Sie uns kurz Bescheid - fast alles lässt
            sich anpassen. Hafermilch kostet bei uns nichts extra, glutenfreies Brot haben wir
            täglich da.
          </p>
        </div>
      </section>

      <section className="cafe__section cafe__section--papier">
        <div className="demo__shell">
          <div className="cafe__galerie">
            <div className="zoom auf cafe__galerie-breit"><Bild platz={BILD_RAUM[0]!} sizes="(max-width: 720px) 50vw, 56vw" /></div>
            <div className="zoom auf cafe__galerie-schmal"><Bild platz={BILD_RAUM[1]!} sizes="(max-width: 720px) 50vw, 40vw" /></div>

            <figure className="cafe__zitat auf">
              <blockquote className="cafe__display">
                &bdquo;Der beste Tisch ist der, an dem man vergisst, wie spät es ist.&ldquo;
              </blockquote>
              <figcaption>Hanna Kellner, Gründerin</figcaption>
            </figure>

            <div className="zoom auf cafe__galerie-schmal"><Bild platz={BILD_RAUM[2]!} sizes="(max-width: 720px) 50vw, 40vw" /></div>
            <div className="zoom auf cafe__galerie-breit"><Bild platz={BILD_RAUM[3]!} sizes="(max-width: 720px) 50vw, 56vw" /></div>
          </div>
        </div>
      </section>

      <section className="cafe__section" id="besuch">
        <div className="demo__shell cafe__besuch">
          <div className="auf">
            <p className="cafe__kicker">Besuch</p>
            <h2 className="cafe__h2 cafe__display">Wann wir da sind.</h2>
            <table className="cafe__zeiten">
              <tbody>
                {ZEITEN.map((z) => (
                  <tr key={z.tag} data-heute={z.heute}>
                    <th scope="row">{z.tag}</th>
                    <td>{z.zeit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <dl className="cafe__adresse">
              <div className="cafe__adresse-zeile">
                <dt>Adresse</dt>
                <dd>Lindenstraße 14, 12345 Musterstadt<br />Hinterhof, zweite Tür links</dd>
              </div>
              <div className="cafe__adresse-zeile">
                <dt>Reservierung</dt>
                <dd>Ab sechs Personen bitte kurz anrufen: 030 000000</dd>
              </div>
            </dl>
            <div className="cafe__hero-aktionen">
              <a href="#karte" className="cafe__btn cafe__btn--voll">
                Tisch anfragen <span aria-hidden="true">&#8594;</span>
              </a>
            </div>
          </div>

          <figure className="cafe__plan auf">
            <span className="cafe__nadel" aria-hidden="true" />
            <figcaption>
              <strong>Lindenstraße 14</strong> · Bus 12 bis Lindenplatz, dann 200 Meter.
              Im Hof zwei Fahrradbügel.
            </figcaption>
          </figure>
        </div>
      </section>

      <footer className="cafe__fuss">
        <div className="demo__shell">
          <div className="cafe__fuss-grid">
            <div>
              <span className="cafe__marke">
                <span className="cafe__bohne" aria-hidden="true" />
                <span>
                  Morgentau
                  <small>Kaffeerösterei</small>
                </span>
              </span>
              <p className="cafe__fuss-text">
                Rösterei, Frühstück und ein Hof, in dem man den Nachmittag verlieren kann.
              </p>
            </div>
            <div>
              <h4>Besuch</h4>
              <ul>
                <li><a href="#karte">Karte</a></li>
                <li><a href="#besuch">Öffnungszeiten</a></li>
                <li><a href="#besuch">Anfahrt</a></li>
                <li>Räume mieten</li>
              </ul>
            </div>
            <div>
              <h4>Rösterei</h4>
              <ul>
                <li><a href="#roesterei">Unsere Röstungen</a></li>
                <li><a href="#handwerk">Wie wir rösten</a></li>
                <li>Röstschau samstags</li>
                <li>Gastronomie beliefern</li>
              </ul>
            </div>
            <div>
              <h4>Kontakt</h4>
              <ul>
                <li>Lindenstraße 14</li>
                <li>12345 Musterstadt</li>
                <li>030 000000</li>
                <li>hallo@morgentau.example</li>
              </ul>
            </div>
          </div>
          <div className="cafe__fuss-schluss">
            <span>Demo-Projekt. Erfundenes Unternehmen, erfundene Adresse und Preise.</span>
            <span>Gestaltet von Novahost</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
