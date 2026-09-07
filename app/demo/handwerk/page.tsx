import type { Metadata, Viewport } from "next";
import { Barlow_Condensed } from "next/font/google";
import "@/styles/demo-handwerk.css";

/**
 * Demo 3 - Zimmerei Lindhorst (erfundener Betrieb).
 *
 * Gestalterische Haltung: massiv und geradeaus. Dunkles Holz, Stahl,
 * schmale Versalien, Signalorange fuer alles, was zum Kontakt fuehrt.
 * Handwerkskunden entscheiden am Telefon - deshalb steht die Nummer oben,
 * im Kopf, im Fuss und in der Notdienstzeile.
 *
 * Das Formular ist eine Attrappe: es sendet nichts. Der Hinweis darunter
 * sagt das auch.
 */
const barlow = Barlow_Condensed({ subsets: ["latin"], variable: "--font-barlow", display: "swap", weight: ["600", "700"] });

export const metadata: Metadata = {
  title: "Zimmerei Lindhorst - Demo-Projekt",
  description: "Demo-Projekt von Novahost: Website für eine Zimmerei mit Notdienst und Anfragestrecke.",
};

export const viewport: Viewport = { themeColor: "#12181d", colorScheme: "dark" };

const ZAHLEN = [
  { wert: "1968", text: "gegründet, in dritter Generation" },
  { wert: "14", text: "Gesellen, Meister und Azubis" },
  { wert: "60 km", text: "Einsatzgebiet rund um den Betrieb" },
  { wert: "24 h", text: "Notdienst bei Sturm- und Wasserschaden" },
];

const LEISTUNGEN = [
  {
    titel: "Dachstuhl & Holzbau",
    text: "Neubau, Aufstockung, Sanierung. Wir zeichnen, fertigen im eigenen Abbund und richten selbst auf.",
    punkte: ["Sparren- und Kehlbalkendächer", "Aufstockungen in Holzrahmenbau", "Statik in Abstimmung mit Ihrem Planer"],
  },
  {
    titel: "Carports & Terrassen",
    text: "Vom einfachen Unterstand bis zur überdachten Terrasse mit Seitenwand - alles aus heimischem Holz.",
    punkte: ["Carports mit Geräteraum", "Terrassendielen in Lärche und Douglasie", "Sichtschutz und Zäune"],
  },
  {
    titel: "Reparatur & Notdienst",
    text: "Sturm, Marder, undichte Stelle: Wir sichern kurzfristig ab und reparieren dauerhaft.",
    punkte: ["Notabdichtung binnen 24 Stunden", "Balkenkopf- und Schwellensanierung", "Schädlingsbefall im Gebälk"],
  },
];

const REFERENZEN = [
  { titel: "Aufstockung Zweifamilienhaus", ort: "Musterstadt-Nord", text: "Zusätzliches Geschoss in Holzrahmenbau, in elf Werktagen dicht." },
  { titel: "Scheunendach Hof Wieland", ort: "Kleinbach", text: "Kompletter Dachstuhl neu, historische Balken erhalten und ergänzt." },
  { titel: "Doppelcarport mit Geräteraum", ort: "Musterstadt-Süd", text: "Lärche unbehandelt, Gründach vorbereitet, Aufbau an zwei Tagen." },
];

export default function HandwerkDemo() {
  return (
    <div className={`demo hw ${barlow.variable}`}>
      <p className="hw__notdienst">
        <span>Sturmschaden oder undichtes Dach?</span>
        <span>Notdienst rund um die Uhr: <b>0800 0000000</b></span>
      </p>

      <div className="demo__shell">
        <nav className="hw__nav">
          <span className="hw__marke">
            <span className="hw__zeichen" aria-hidden="true" />
            <span className="hw__marke-text">
              <strong>Zimmerei Lindhorst</strong>
              <span>Holzbau seit 1968</span>
            </span>
          </span>
          <div className="hw__navlinks">
            <a href="#leistungen">Leistungen</a>
            <a href="#referenzen">Referenzen</a>
            <a href="#anfrage">Anfrage</a>
          </div>
          <a href="#anfrage" className="hw__tel">
            <span aria-hidden="true">&#9742;</span> 0 12345 67890
          </a>
        </nav>

        <header className="hw__hero">
          <div className="hw__hero-inhalt">
            <p className="hw__mini">Zimmerei &amp; Holzbau</p>
            <h1 className="hw__titel hw__display">
              Wir bauen, was <span>hält</span>.
            </h1>
            <p>
              Dachstühle, Aufstockungen, Carports. Vom eigenen Abbundplatz, mit eigenen Leuten,
              ohne Subunternehmer. Wenn es eilt, sind wir am selben Tag da.
            </p>
            <div className="hw__aktionen">
              <a href="#anfrage" className="hw__btn hw__btn--voll">
                Angebot anfordern <span aria-hidden="true">&#8594;</span>
              </a>
              <a href="#leistungen" className="hw__btn hw__btn--leer">Leistungen ansehen</a>
            </div>
          </div>
        </header>
      </div>

      <div className="hw__zahlen">
        {ZAHLEN.map((z) => (
          <div className="hw__zahl" key={z.wert}>
            <b>{z.wert}</b>
            <span>{z.text}</span>
          </div>
        ))}
      </div>

      <section className="hw__section" id="leistungen">
        <div className="demo__shell">
          <div className="hw__kopf">
            <p className="hw__mini">Leistungen</p>
            <h2 className="hw__h2 hw__display">Drei Bereiche, ein Betrieb.</h2>
            <p>
              Wir machen nicht alles - dafür das, was wir machen, komplett selbst. Planung,
              Abbund, Aufrichten und Nacharbeit bleiben in einer Hand.
            </p>
          </div>
          <div className="hw__leistungen">
            {LEISTUNGEN.map((l) => (
              <article className="hw__leistung" key={l.titel}>
                <h3>{l.titel}</h3>
                <p>{l.text}</p>
                <ul>
                  {l.punkte.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hw__section hw__section--stahl" id="referenzen">
        <div className="demo__shell">
          <div className="hw__kopf">
            <p className="hw__mini">Referenzen</p>
            <h2 className="hw__h2 hw__display">Zuletzt gebaut.</h2>
            <p>Drei von rund vierzig Aufträgen im vergangenen Jahr.</p>
          </div>
          <div className="hw__referenzen">
            {REFERENZEN.map((r) => (
              <article className="hw__referenz" key={r.titel}>
                <div className="hw__ref-bild" role="img" aria-label="Skizze eines Dachstuhls" />
                <div className="hw__ref-text">
                  <p className="hw__ref-ort">{r.ort}</p>
                  <h3>{r.titel}</h3>
                  <p>{r.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hw__section" id="anfrage">
        <div className="demo__shell">
          <div className="hw__anfrage">
            <div>
              <p className="hw__mini">Anfrage</p>
              <h2 className="hw__h2 hw__display">Sagen Sie uns, worum es geht.</h2>
              <p style={{ color: "var(--grau)", maxWidth: "44ch", marginBottom: "28px" }}>
                Wir melden uns am selben oder nächsten Werktag. Ein Vor-Ort-Termin und der
                Kostenvoranschlag sind kostenlos.
              </p>
              <dl className="hw__kontaktliste">
                <div className="hw__kontaktzeile">
                  <dt>Telefon</dt>
                  <dd>0 12345 67890</dd>
                </div>
                <div className="hw__kontaktzeile">
                  <dt>Notdienst</dt>
                  <dd>0800 0000000</dd>
                </div>
                <div className="hw__kontaktzeile">
                  <dt>Werkstatt</dt>
                  <dd>Sägewerkstraße 3, 12345 Musterstadt</dd>
                </div>
              </dl>
            </div>

            <div className="hw__formular">
              <div className="hw__feld">
                <label htmlFor="hw-name">Name</label>
                <input id="hw-name" type="text" placeholder="Vor- und Nachname" disabled />
              </div>
              <div className="hw__feld">
                <label htmlFor="hw-tel">Telefon</label>
                <input id="hw-tel" type="tel" placeholder="Für Rückfragen" disabled />
              </div>
              <div className="hw__feld">
                <label htmlFor="hw-art">Worum geht es?</label>
                <select id="hw-art" disabled defaultValue="">
                  <option value="">Bitte wählen</option>
                  <option>Dachstuhl / Holzbau</option>
                  <option>Carport / Terrasse</option>
                  <option>Reparatur</option>
                  <option>Notfall</option>
                </select>
              </div>
              <div className="hw__feld">
                <label htmlFor="hw-text">Beschreibung</label>
                <textarea id="hw-text" placeholder="Was ist zu tun, und bis wann?" disabled />
              </div>
              <button type="button" className="hw__btn hw__btn--voll demo__fake" disabled>
                Anfrage senden
              </button>
              <p className="demo__note">
                Attrappe: Dieses Formular gehört zu einer Demo-Seite und versendet nichts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="hw__fuss">
        <div className="demo__shell">
          <div className="hw__fuss-grid">
            <div>
              <span className="hw__marke">
                <span className="hw__zeichen" aria-hidden="true" />
                <span className="hw__marke-text">
                  <strong>Zimmerei Lindhorst</strong>
                  <span>Holzbau seit 1968</span>
                </span>
              </span>
              <p style={{ marginTop: "14px", color: "var(--grau)", maxWidth: "34ch", fontSize: "14.5px" }}>
                Familienbetrieb in dritter Generation. Eigener Abbundplatz, eigene Mannschaft.
              </p>
            </div>
            <div>
              <h4>Betrieb</h4>
              <ul>
                <li>Sägewerkstraße 3</li>
                <li>12345 Musterstadt</li>
                <li>0 12345 67890</li>
                <li>buero@lindhorst.example</li>
              </ul>
            </div>
            <div>
              <h4>Öffnungszeiten</h4>
              <ul>
                <li>Mo - Do 07:00 - 16:30</li>
                <li>Fr 07:00 - 13:00</li>
                <li>Notdienst rund um die Uhr</li>
              </ul>
            </div>
          </div>
          <div className="hw__fuss-schluss">
            <span>Demo-Projekt. Erfundener Betrieb, erfundene Adresse und Rufnummern.</span>
            <span>Gestaltet von Novahost</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
