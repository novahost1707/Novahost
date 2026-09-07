import type { Metadata, Viewport } from "next";
import { Baloo_2 } from "next/font/google";
import "@/styles/demo-freizeit.css";

/**
 * Demo 4 - Aqualuna Erlebnisbad (erfundener Betrieb).
 *
 * Gestalterische Haltung: laut und rund. Kräftige Farben, weiche Schrift,
 * viel Bewegung. Familien suchen auf solchen Seiten zuerst nach Preis und
 * Öffnungszeit - beides steht deshalb weit oben und noch einmal als eigener
 * Abschnitt.
 *
 * Attraktionen, Wellen und Zeichen sind reines CSS; ein echtes Bad hätte hier
 * Fotos der Anlage.
 */
const baloo = Baloo_2({ subsets: ["latin"], variable: "--font-baloo", display: "swap", weight: ["600", "700"] });

export const metadata: Metadata = {
  title: "Aqualuna Erlebnisbad - Demo-Projekt",
  description: "Demo-Projekt von Novahost: Website für ein Erlebnisbad mit Preisen, Zeiten und Attraktionen.",
};

export const viewport: Viewport = { themeColor: "#e4f5fa", colorScheme: "light" };

const ATTRAKTIONEN = [
  { art: "rutsche", name: "Turbo-Twister", text: "82 Meter Reifenrutsche mit vier Kurven und Zeitmessung am Ende.", merkmal: "ab 8 Jahren", farbe: "linear-gradient(150deg,#19b1d1,#0b6f92)" },
  { art: "welle", name: "Wellenbecken", text: "Alle 20 Minuten Wellengang, dazwischen ruhiges Schwimmwasser.", merkmal: "für alle", farbe: "linear-gradient(150deg,#2ec2c9,#128aa8)" },
  { art: "sauna", name: "Saunagarten", text: "Vier Kabinen, Aufguss zur vollen Stunde, Ruheraum mit Blick ins Grüne.", merkmal: "ab 16 Jahren", farbe: "linear-gradient(150deg,#f0964a,#c85f2a)" },
  { art: "kinder", name: "Krabbelwelt", text: "Warmes Planschbecken, kleine Rutsche und Wasserspielhaus.", merkmal: "bis 6 Jahre", farbe: "linear-gradient(150deg,#63c9e6,#1a86ac)" },
];

const TICKETS = [
  {
    name: "Tageskarte",
    preis: "16,50",
    einheit: "pro Erwachsener",
    beliebt: false,
    punkte: ["Ganzer Tag im Bad", "Wellenbecken und alle Rutschen", "Schließfach inklusive"],
  },
  {
    name: "Familienkarte",
    preis: "42,00",
    einheit: "2 Erwachsene, bis 3 Kinder",
    beliebt: true,
    punkte: ["Ganzer Tag im Bad", "Kinder unter 4 Jahren frei", "Zwei Schließfächer inklusive", "10 % im Bistro"],
  },
  {
    name: "Sauna-Zuschlag",
    preis: "9,00",
    einheit: "zusätzlich zur Tageskarte",
    beliebt: false,
    punkte: ["Vier Kabinen und Ruheraum", "Aufguss zur vollen Stunde", "Handtuch leihweise"],
  },
];

const ZEITEN = [
  { tag: "Montag", zeit: "geschlossen (Wartung)" },
  { tag: "Dienstag - Donnerstag", zeit: "10:00 - 21:00" },
  { tag: "Freitag", zeit: "10:00 - 23:00" },
  { tag: "Samstag & Sonntag", zeit: "09:00 - 21:00" },
  { tag: "Feiertage", zeit: "09:00 - 21:00" },
];

export default function FreizeitparkDemo() {
  return (
    <div className={`demo fz ${baloo.variable}`}>
      <div className="demo__shell">
        <nav className="fz__nav">
          <span className="fz__marke">
            <span className="fz__tropfen" aria-hidden="true" />
            <strong>Aqualuna</strong>
          </span>
          <div className="fz__navlinks">
            <a href="#attraktionen">Attraktionen</a>
            <a href="#preise">Preise</a>
            <a href="#zeiten">Öffnungszeiten</a>
          </div>
          <a href="#preise" className="fz__btn fz__btn--koralle">Tickets sichern</a>
        </nav>

        <header className="fz__hero">
          <div className="fz__hero-inhalt">
            <p className="fz__mini">Erlebnisbad &amp; Saunagarten</p>
            <h1 className="fz__display">Ein ganzer Tag, an dem keinem langweilig wird.</h1>
            <p>
              Vier Rutschen, ein Wellenbecken, ein Saunagarten und ein Bereich, in dem die
              Kleinsten zum ersten Mal ins Wasser dürfen. Drinnen wie draußen, das ganze Jahr.
            </p>
            <div className="fz__hero-aktionen">
              <a href="#preise" className="fz__btn fz__btn--koralle">
                Preise ansehen <span aria-hidden="true">&#8594;</span>
              </a>
              <a href="#attraktionen" className="fz__btn fz__btn--weiss">Attraktionen</a>
            </div>
          </div>
        </header>

        <div className="fz__heute">
          <span className="fz__punkt">
            <span className="fz__ampel" aria-hidden="true" />
            <b>Heute geöffnet bis 21:00</b>
          </span>
          <span className="fz__punkt">Wassertemperatur <b>29 °C</b></span>
          <span className="fz__punkt">Nächster Aufguss <b>15:00</b></span>
          <span className="fz__punkt">Auslastung: entspannt</span>
        </div>
      </div>

      <section className="fz__section" id="attraktionen">
        <div className="demo__shell">
          <div className="fz__kopf">
            <p className="fz__mini" style={{ color: "var(--tuerkis)" }}>Attraktionen</p>
            <h2 className="fz__h2 fz__display">Was Sie bei uns erwartet.</h2>
            <p>Alles unter einem Dach, alles in der Tageskarte enthalten - bis auf die Sauna.</p>
          </div>
          <div className="fz__attraktionen">
            {ATTRAKTIONEN.map((a) => (
              <article className="fz__attraktion" key={a.name}>
                <div className="fz__attraktion-bild" style={{ background: a.farbe }}>
                  <span className="fz__zeichen" data-art={a.art} aria-hidden="true" />
                </div>
                <div className="fz__attraktion-text">
                  <span className="fz__merkmal">{a.merkmal}</span>
                  <h3>{a.name}</h3>
                  <p>{a.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fz__section fz__section--weiss" id="preise">
        <div className="demo__shell">
          <div className="fz__kopf">
            <p className="fz__mini" style={{ color: "var(--koralle)" }}>Preise</p>
            <h2 className="fz__h2 fz__display">Ohne Kleingedrucktes.</h2>
            <p>Alle Preise gelten für den ganzen Tag. Wer nach 18 Uhr kommt, zahlt die Hälfte.</p>
          </div>
          <div className="fz__preise">
            {TICKETS.map((t) => (
              <article className="fz__karte" key={t.name} data-beliebt={t.beliebt}>
                <h3>{t.name}</h3>
                <p className="fz__betrag">
                  {t.preis} &euro; <small>{t.einheit}</small>
                </p>
                <ul>
                  {t.punkte.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <button type="button" className="fz__btn fz__btn--rand demo__fake" disabled style={{ justifySelf: "start", marginTop: "4px" }}>
                  In den Warenkorb
                </button>
              </article>
            ))}
          </div>
          <p className="demo__note" style={{ marginTop: "20px" }}>
            Attrappe: Auf dieser Demo-Seite lässt sich nichts kaufen.
          </p>
        </div>
      </section>

      <section className="fz__section" id="zeiten">
        <div className="demo__shell">
          <div className="fz__kopf">
            <p className="fz__mini" style={{ color: "var(--tuerkis)" }}>Öffnungszeiten</p>
            <h2 className="fz__h2 fz__display">Wann Sie kommen können.</h2>
          </div>
          <div className="fz__zeiten-grid">
            <table className="fz__zeiten">
              <tbody>
                {ZEITEN.map((z) => (
                  <tr key={z.tag}>
                    <th scope="row">{z.tag}</th>
                    <td>{z.zeit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="fz__hinweise">
              <div className="fz__hinweis">
                <strong>Letzter Einlass</strong>
                <p>Eine Stunde vor Schließung. Die Rutschen laufen bis 30 Minuten vorher.</p>
              </div>
              <div className="fz__hinweis">
                <strong>Schulferien</strong>
                <p>In den Ferien öffnen wir täglich ab 09:00 Uhr, auch montags.</p>
              </div>
              <div className="fz__hinweis">
                <strong>Anfahrt</strong>
                <p>Seeuferweg 8, 12345 Musterstadt. 300 Parkplätze, Bus 12 hält direkt davor.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="fz__fuss">
        <div className="demo__shell">
          <div className="fz__fuss-grid">
            <div>
              <span className="fz__marke" style={{ color: "var(--weiss)" }}>
                <span className="fz__tropfen" aria-hidden="true" />
                <strong>Aqualuna</strong>
              </span>
              <p style={{ marginTop: "12px", maxWidth: "34ch", fontSize: "14.5px" }}>
                Erlebnisbad, Saunagarten und Bistro. Seit 1994 am See.
              </p>
            </div>
            <div>
              <h4>Besuch</h4>
              <ul>
                <li><a href="#preise">Preise &amp; Tickets</a></li>
                <li><a href="#zeiten">Öffnungszeiten</a></li>
                <li><a href="#attraktionen">Attraktionen</a></li>
                <li>Kurse &amp; Schwimmunterricht</li>
              </ul>
            </div>
            <div>
              <h4>Kontakt</h4>
              <ul>
                <li>Seeuferweg 8</li>
                <li>12345 Musterstadt</li>
                <li>0 12345 00000</li>
                <li>hallo@aqualuna.example</li>
              </ul>
            </div>
          </div>
          <div className="fz__fuss-schluss">
            <span>Demo-Projekt. Erfundenes Bad, erfundene Preise und Zeiten.</span>
            <span>Gestaltet von Novahost</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
