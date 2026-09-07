import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import "@/styles/demo-cafe.css";

/**
 * Demo 1 - Kaffeehaus Morgentau (erfundener Betrieb).
 *
 * Gestalterische Haltung: warm und handgemacht. Serifenschrift, cremiger
 * Grund, runde Formen, viel Luft. Alles, was der Novahost-Auftritt nicht ist -
 * genau darum geht es bei diesen vier Seiten.
 *
 * Ohne Bilddateien: die Tasse, der Lageplan und die Röstungsscheiben sind
 * reines CSS. Eine echte Umsetzung haette hier Fotos.
 */
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Kaffeehaus Morgentau - Demo-Projekt",
  description: "Demo-Projekt von Novahost: Website für ein Café mit eigener Rösterei.",
};

export const viewport: Viewport = { themeColor: "#f4ece0", colorScheme: "light" };

const ROESTUNGEN = [
  { name: "Morgentau", herkunft: "Äthiopien, Sidamo", note: "Hell geröstet. Zitrus, Jasmin, sehr klar im Abgang.", farbe: "linear-gradient(150deg,#c08a52,#8a5a32)" },
  { name: "Nummer Sieben", herkunft: "Kolumbien, Huila", note: "Unsere Hausmischung. Nuss, Karamell, wenig Säure.", farbe: "linear-gradient(150deg,#8d5c3a,#523320)" },
  { name: "Nachtschicht", herkunft: "Brasilien, Sul de Minas", note: "Dunkel geröstet. Kakao und Malz, trägt durch die Milch.", farbe: "linear-gradient(150deg,#4a3020,#241610)" },
];

const KAFFEE = [
  { name: "Espresso", preis: "2,40", note: "" },
  { name: "Cappuccino", preis: "3,60", note: "Hafer- oder Kuhmilch, ohne Aufpreis" },
  { name: "Filterkaffee", preis: "3,20", note: "Wechselnde Röstung, in der Karaffe" },
  { name: "Cold Brew", preis: "4,10", note: "18 Stunden kalt gezogen" },
];

const KUECHE = [
  { name: "Frühstücksbrett", preis: "12,50", note: "Sauerteig, Ei, Käse, Marmelade, Obst" },
  { name: "Zimtschnecke", preis: "3,80", note: "Morgens gebacken, meist mittags weg" },
  { name: "Käsekuchen", preis: "4,20", note: "Nach dem Rezept von Frau Kellner" },
  { name: "Suppe des Tages", preis: "6,90", note: "Immer vegetarisch, mit Brot" },
];

const ZEITEN = [
  { tag: "Montag", zeit: "Ruhetag" },
  { tag: "Dienstag - Freitag", zeit: "07:30 - 18:00" },
  { tag: "Samstag", zeit: "08:30 - 18:00" },
  { tag: "Sonntag", zeit: "09:00 - 16:00" },
];

export default function CafeDemo() {
  return (
    <div className={`demo cafe ${fraunces.variable}`}>
      <div className="demo__shell">
        <nav className="cafe__nav">
          <span className="cafe__marke">
            <span className="cafe__bohne" aria-hidden="true" />
            Kaffeehaus Morgentau
          </span>
          <div className="cafe__navlinks">
            <a href="#roestung">Rösterei</a>
            <a href="#karte">Karte</a>
            <a href="#besuch">Besuch</a>
          </div>
          <a href="#besuch" className="cafe__btn cafe__btn--leer">Tisch anfragen</a>
        </nav>

        <header className="cafe__hero">
          <div>
            <p className="cafe__kicker">Rösterei &amp; Frühstück seit 2009</p>
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
              <a href="#besuch" className="cafe__btn cafe__btn--leer">Öffnungszeiten</a>
            </div>
          </div>
          <div className="cafe__tasse" role="img" aria-label="Eine Tasse Cappuccino von oben" />
        </header>
      </div>

      <dl className="cafe__fakten">
        <div className="cafe__fakt">
          <dt>Eigene Rösterei</dt>
          <dd className="cafe__display">Drei Röstungen, wöchentlich frisch</dd>
        </div>
        <div className="cafe__fakt">
          <dt>Küche</dt>
          <dd className="cafe__display">Frühstück bis 15 Uhr</dd>
        </div>
        <div className="cafe__fakt">
          <dt>Platz</dt>
          <dd className="cafe__display">44 innen, 30 im Hof</dd>
        </div>
      </dl>

      <section className="cafe__section" id="roestung">
        <div className="demo__shell">
          <div className="cafe__kopf">
            <p className="cafe__kicker">Unsere Rösterei</p>
            <h2 className="cafe__h2 cafe__display">Drei Röstungen, mehr brauchen wir nicht.</h2>
            <p>
              Wir kaufen kleine Mengen direkt ein und rösten jeden Dienstag. Was übrig bleibt,
              geht als Bohne über die Theke - nichts liegt länger als drei Wochen.
            </p>
          </div>
          <div className="cafe__roestungen">
            {ROESTUNGEN.map((r) => (
              <article className="cafe__roestung" key={r.name}>
                <span className="cafe__scheibe" style={{ background: r.farbe }} aria-hidden="true" />
                <p className="cafe__herkunft">{r.herkunft}</p>
                <h3>{r.name}</h3>
                <p>{r.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cafe__section cafe__section--papier" id="karte">
        <div className="demo__shell">
          <div className="cafe__kopf">
            <p className="cafe__kicker">Karte</p>
            <h2 className="cafe__h2 cafe__display">Was heute da ist.</h2>
            <p>Kuchen und Suppe wechseln täglich. Was aus ist, ist aus - das ist kein Fehler, das ist frisch.</p>
          </div>
          <div className="cafe__karte">
            <div>
              <h3>Aus der Rösterei</h3>
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
            <div>
              <h3>Aus der Küche</h3>
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
        </div>
      </section>

      <section className="cafe__section" id="besuch">
        <div className="demo__shell">
          <div className="cafe__unten">
            <div>
              <p className="cafe__kicker">Besuch</p>
              <h2 className="cafe__h2 cafe__display">Wann wir da sind.</h2>
              <table className="cafe__zeiten">
                <tbody>
                  {ZEITEN.map((z) => (
                    <tr key={z.tag} data-heute={z.tag === "Dienstag - Freitag"}>
                      <th scope="row">{z.tag}</th>
                      <td>{z.zeit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="demo__note" style={{ marginTop: "18px" }}>
                Für Gruppen ab sechs Personen rufen Sie uns bitte kurz an. Sonst brauchen Sie
                keinen Tisch zu reservieren.
              </p>
            </div>
            <figure className="cafe__plan">
              <span className="cafe__nadel" aria-hidden="true" />
              <figcaption>Lindenstraße 14 &middot; Hinterhof, zweite Tür links</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <footer className="cafe__fuss">
        <div className="demo__shell">
          <div className="cafe__fuss-grid">
            <div>
              <span className="cafe__marke" style={{ color: "var(--papier)" }}>
                <span className="cafe__bohne" aria-hidden="true" />
                Kaffeehaus Morgentau
              </span>
              <p style={{ marginTop: "12px", fontSize: "15px", maxWidth: "34ch", opacity: 0.85 }}>
                Rösterei, Frühstück und ein Hof, in dem man den Nachmittag verlieren kann.
              </p>
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
            <div>
              <h4>Seiten</h4>
              <ul>
                <li><a href="#roestung">Rösterei</a></li>
                <li><a href="#karte">Karte</a></li>
                <li><a href="#besuch">Öffnungszeiten</a></li>
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
