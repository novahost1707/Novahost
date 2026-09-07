import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Bild } from "@/components/demo/Bild";
import type { Bildplatz } from "@/lib/demo-bilder";
import "@/styles/demo-freizeit.css";

/**
 * Demo 4 - Freizeitpark Wolkenhain (erfundener Park).
 *
 * Marke: "Der Park im Wald". In einen bestehenden Mischwald gebaut statt auf
 * eine Asphaltfläche - kurze Wege, Schatten, Bäume zwischen den Bahnen. Das
 * ist das Versprechen, an dem sich hier alles ausrichtet, von der Farbwelt
 * bis zu den Texten.
 *
 * Zielgruppe: Familien mit Kindern zwischen 3 und 14, dazu Jugendliche für
 * die beiden großen Bahnen.
 *
 * Haltung: emotional und warm, nicht neonbunt. Waldgrün als Grund,
 * Abendorange als Ruf zum Ticket, Sonnengelb als Akzent. Große Bilder, klare
 * Preise, Öffnungszeiten weit oben - danach wird auf solchen Seiten zuerst
 * gesucht.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Freizeitpark Wolkenhain - Demo-Projekt",
  description: "Demo-Projekt von Novahost: Website für einen Freizeitpark mit Themenwelten, Tickets und Übernachtung.",
};

export const viewport: Viewport = { themeColor: "#16281f", colorScheme: "light" };

/* --- Bildplätze ---------------------------------------------------------- */
const BILD_HERO: Bildplatz = {
  src: "/demo/park/hero.jpg",
  alt: "Blick über den Park: Holzachterbahn zwischen Baumwipfeln im Abendlicht",
  ratio: "16 / 8",
  motiv: "park-landschaft",
  variante: 0,
};

const BILD_WELT: Bildplatz[] = [
  { src: "/demo/park/welt-talstation.jpg", alt: "Alpine Themenwelt Talstation mit Holzhäusern", ratio: "3 / 4", motiv: "park-welt", variante: 0, ton: "#3f6b4d" },
  { src: "/demo/park/welt-hafen.jpg", alt: "Hafenviertel mit Booten und Kais", ratio: "3 / 4", motiv: "park-wasser", variante: 0, ton: "#2f6d86" },
  { src: "/demo/park/welt-forst.jpg", alt: "Wilder Forst: Wege zwischen hohen Bäumen", ratio: "3 / 4", motiv: "park-wald", variante: 0, ton: "#2c5a3a" },
  { src: "/demo/park/welt-wolke.jpg", alt: "Kleine Wolke: Karussell im Kleinkindbereich", ratio: "3 / 4", motiv: "park-karussell", variante: 0, ton: "#c98a2e" },
];

const BILD_ATTRAKTION: Bildplatz[] = [
  { src: "/demo/park/attraktion-donnerhall.jpg", alt: "Holzachterbahn Donnerhall in der ersten Abfahrt", ratio: "4 / 3", motiv: "park-bahn", variante: 0, ton: "#8a4326" },
  { src: "/demo/park/attraktion-nebelschlucht.jpg", alt: "Wildwasserbahn Nebelschlucht am Wasserfall", ratio: "4 / 3", motiv: "park-wasser", variante: 1, ton: "#2f6d86" },
  { src: "/demo/park/attraktion-eichhorn.jpg", alt: "Familienachterbahn Eichhorn zwischen den Bäumen", ratio: "4 / 3", motiv: "park-bahn", variante: 1, ton: "#4a7a58" },
];

const BILD_HOTEL: Bildplatz = {
  src: "/demo/park/hotel.jpg",
  alt: "Waldhotel Wolkenhain: Holzhäuser zwischen Bäumen am Abend",
  ratio: "4 / 3",
  motiv: "park-hotel",
  variante: 0,
  ton: "#3f6b4d",
};

const BILD_ESSEN: Bildplatz[] = [
  { src: "/demo/park/essen-forsthaus.jpg", alt: "Teller mit Eintopf im Forsthaus", ratio: "16 / 10", motiv: "park-essen", variante: 0, ton: "#9a6a2e" },
  { src: "/demo/park/essen-kombuese.jpg", alt: "Fischbrötchen an der Kombüse", ratio: "16 / 10", motiv: "park-essen", variante: 1, ton: "#2f6d86" },
  { src: "/demo/park/essen-eiche.jpg", alt: "Eisstand unter der alten Eiche", ratio: "16 / 10", motiv: "park-essen", variante: 2, ton: "#4a7a58" },
];

/* --- Inhalte ------------------------------------------------------------- */
const WELTEN = [
  { name: "Talstation", text: "Alpenholz, Seilbahn und die Sommerrodelbahn am Hang.", marke: "6 Fahrgeschäfte", bild: 0 },
  { name: "Hafenviertel", text: "Wildwasserbahn, Fischbrötchen und ein Leuchtturm zum Hochsteigen.", marke: "5 Fahrgeschäfte", bild: 1 },
  { name: "Wilder Forst", text: "Unsere beiden großen Bahnen, mitten im alten Baumbestand.", marke: "4 Fahrgeschäfte", bild: 2 },
  { name: "Kleine Wolke", text: "Für alle unter 1,20 m: Karussell, Wasserspiel, Streichelgehege.", marke: "9 Fahrgeschäfte", bild: 3 },
];

const ATTRAKTIONEN = [
  {
    name: "Donnerhall",
    welt: "Wilder Forst",
    text: "Unsere Holzachterbahn, gebaut aus 1.400 Kubikmetern Kiefer. Die erste Abfahrt geht durch eine Senke, in der schon vorher Bäume standen - wir haben um sie herum gebaut.",
    schild: "Neu in dieser Saison",
    werte: [["Höhe", "38 m"], ["Tempo", "92 km/h"], ["Länge", "1.180 m"], ["ab", "1,40 m"]],
    bild: 0,
  },
  {
    name: "Nebelschlucht",
    welt: "Hafenviertel",
    text: "Wildwasserbahn mit zwei Abfahrten und einem Tunnel, in dem es tatsächlich nebelt. Nass wird man - aber nicht so nass, dass der Tag gelaufen ist.",
    schild: "Beliebt bei Familien",
    werte: [["Höhe", "18 m"], ["Tempo", "54 km/h"], ["Länge", "640 m"], ["ab", "1,10 m"]],
    bild: 1,
  },
  {
    name: "Eichhorn",
    welt: "Wilder Forst",
    text: "Die Familienachterbahn: schnell genug für die Großen, sanft genug für Sechsjährige. Fährt in den Baumkronen, deshalb sieht man vom Boden fast nichts von ihr.",
    schild: "Ab 6 Jahren in Begleitung",
    werte: [["Höhe", "14 m"], ["Tempo", "48 km/h"], ["Länge", "720 m"], ["ab", "1,05 m"]],
    bild: 2,
  },
];

const TERMINE = [
  { tag: "12", monat: "Apr", titel: "Saisonstart", text: "Der Park öffnet, alle Bahnen laufen. Freier Eintritt für Kinder unter 6 Jahren." },
  { tag: "28", monat: "Jun", titel: "Lange Waldnacht", text: "Geöffnet bis 23 Uhr, Lichterpfad durch den Forst, Feuershow an der Talstation." },
  { tag: "18", monat: "Okt", titel: "Herbstleuchten", text: "Drei Wochen Kürbisdeko, Nebelmaschinen und ein Umzug durch das Hafenviertel." },
];

const TICKETS = [
  {
    name: "Tageskarte",
    preis: "39,50",
    einheit: "pro Person ab 12 Jahren",
    beliebt: false,
    punkte: ["Alle Bahnen und Themenwelten", "Kinder unter 4 Jahren frei", "Online 3 € günstiger"],
  },
  {
    name: "Familienkarte",
    preis: "129,00",
    einheit: "2 Erwachsene, bis 3 Kinder",
    beliebt: true,
    punkte: ["Alle Bahnen und Themenwelten", "Parkplatz inklusive", "10 % in allen Lokalen", "Wiederkommen am Folgetag: 19 €"],
  },
  {
    name: "Saisonkarte",
    preis: "119,00",
    einheit: "pro Person, ganze Saison",
    beliebt: false,
    punkte: ["Unbegrenzt an allen Öffnungstagen", "Parkplatz inklusive", "Vorabend-Einlass bei Events", "Rechnet sich ab dem dritten Besuch"],
  },
];

const HOTEL = [
  ["Zimmer", "48 Holzhäuser für 2 bis 6 Personen"],
  ["Lage", "Am Waldrand, 400 m vom Haupteingang"],
  ["Inklusive", "Frühstück, Parkplatz, Eintritt am Anreisetag"],
  ["Ab", "168 € pro Nacht für zwei Personen"],
];

const LOKALE = [
  { name: "Forsthaus", ort: "Wilder Forst", text: "Eintopf, Bratkartoffeln, Kuchen. Drinnen 120 Plätze, draußen noch mal so viele unter Bäumen." },
  { name: "Kombüse", ort: "Hafenviertel", text: "Fischbrötchen, Pommes und ein sehr ordentlicher Milchshake. Auch vegetarisch." },
  { name: "Alte Eiche", ort: "Kleine Wolke", text: "Eis, Waffeln, Kaffee für die Eltern. Direkt neben dem Wasserspielplatz." },
];

const ZEITEN = [
  { tag: "April - Juni", zeit: "10:00 - 18:00", heute: false },
  { tag: "Juli - August", zeit: "09:00 - 19:00", heute: true },
  { tag: "September - Oktober", zeit: "10:00 - 18:00", heute: false },
  { tag: "Lange Waldnacht", zeit: "bis 23:00", heute: false },
  { tag: "November - März", zeit: "Winterpause", heute: false },
];

export default function ParkDemo() {
  return (
    <div className={`demo fz ${bricolage.variable}`}>
      <div className="fz__status">
        <div className="demo__shell fz__status-inner">
          <span className="fz__punkt"><span className="fz__ampel" aria-hidden="true" />Heute geöffnet bis <b>19:00</b></span>
          <span className="fz__punkt">Auslastung: <b>entspannt</b></span>
          <span className="fz__punkt">Donnerhall: <b>15 Min</b> Wartezeit</span>
          <span className="fz__punkt">18 °C, sonnig</span>
        </div>
      </div>

      <header className="fz__kopf">
        <div className="demo__shell">
          <nav className="fz__nav">
            <a href="#" className="fz__marke">
              <span className="fz__zeichen" aria-hidden="true" />
              <span>
                <strong>Wolkenhain</strong>
                <span>Freizeitpark im Wald</span>
              </span>
            </a>
            <div className="fz__navlinks">
              <a href="#welten">Themenwelten</a>
              <a href="#attraktionen">Attraktionen</a>
              <a href="#tickets">Tickets</a>
              <a href="#hotel">Übernachten</a>
              <a href="#planen">Planen</a>
            </div>
            <a href="#tickets" className="fz__btn fz__btn--abend fz__btn--klein">Tickets kaufen</a>
          </nav>
        </div>
      </header>

      <section className="fz__hero">
        <Bild platz={BILD_HERO} sizes="100vw" priority />
        <div className="fz__hero-schleier" aria-hidden="true" />
        <div className="fz__hero-inhalt">
          <div className="demo__shell">
            <p className="fz__mini">24 Fahrgeschäfte · 4 Themenwelten · 62 Hektar Wald</p>
            <h1 className="fz__display">Ein Park, der schon vorher ein Wald war.</h1>
            <p>
              Wir haben nicht gerodet und dann gebaut, sondern zwischen die Bäume gebaut. Deshalb
              stehen Sie hier nie länger als zehn Minuten in der Sonne - und nie länger als sieben
              Minuten von der nächsten Bahn entfernt.
            </p>
            <div className="fz__hero-aktionen">
              <a href="#tickets" className="fz__btn fz__btn--abend">
                Tickets ab 36,50 € <span aria-hidden="true">&#8594;</span>
              </a>
              <a href="#attraktionen" className="fz__btn fz__btn--creme">Attraktionen ansehen</a>
              <span className="fz__hero-preis">Online <b>3 €</b> günstiger als an der Kasse</span>
            </div>
          </div>
        </div>
      </section>

      <section className="fz__section" id="welten">
        <div className="demo__shell">
          <div className="fz__abschnittkopf--reihe fz__abschnittkopf auf">
            <div>
              <p className="fz__mini" style={{ color: "var(--moos)" }}>Themenwelten</p>
              <h2 className="fz__h2 fz__display">Vier Welten, ein Rundweg.</h2>
              <p>
                Alles liegt an einem 2,4 Kilometer langen Rundweg. Wer mit kleinen Kindern kommt,
                schafft ihn in einem Tag - ohne Hetze und ohne doppelte Strecken.
              </p>
            </div>
            <a href="#planen" className="fz__btn fz__btn--rand fz__btn--klein">Parkplan ansehen</a>
          </div>

          <div className="fz__welten">
            {WELTEN.map((w) => (
              <a href="#attraktionen" className="fz__welt zoom auf" key={w.name}>
                <Bild platz={BILD_WELT[w.bild]!} sizes="(max-width: 980px) 50vw, 25vw" />
                <span className="fz__welt-marke">{w.marke}</span>
                <span className="fz__welt-text">
                  <h3>{w.name}</h3>
                  <p>{w.text}</p>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="fz__section fz__section--creme" id="attraktionen">
        <div className="demo__shell">
          <div className="fz__abschnittkopf auf">
            <p className="fz__mini" style={{ color: "var(--moos)" }}>Attraktionen</p>
            <h2 className="fz__h2 fz__display">Die drei, für die man wiederkommt.</h2>
            <p>
              24 Fahrgeschäfte hat der Park insgesamt. Diese drei stehen bei uns am häufigsten im
              Gästebuch - jedes davon in einer anderen Welt.
            </p>
          </div>

          <div className="fz__attraktionen">
            {ATTRAKTIONEN.map((a) => (
              <article className="fz__attraktion zoom auf" key={a.name}>
                <Bild platz={BILD_ATTRAKTION[a.bild]!} sizes="(max-width: 900px) 100vw, 46vw" />
                <div className="fz__attraktion-text">
                  <span className="fz__schild">{a.schild}</span>
                  <h3 className="fz__display">{a.name}</h3>
                  <p style={{ color: "var(--moos)", fontWeight: 600, marginBottom: "10px" }}>{a.welt}</p>
                  <p>{a.text}</p>
                  <dl className="fz__werte">
                    {a.werte.map(([k, v]) => (
                      <div className="fz__wert" key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fz__section fz__section--wald" id="events">
        <div className="demo__shell">
          <div className="fz__abschnittkopf auf">
            <p className="fz__mini">Saison 2026</p>
            <h2 className="fz__h2 fz__display">Drei Tage, die anders sind.</h2>
            <p>Im Eintritt enthalten, keine Extrakarte nötig. Bei Events lohnt sich früh kommen.</p>
          </div>
          <div className="fz__termine">
            {TERMINE.map((t) => (
              <article className="fz__termin auf" key={t.titel}>
                <div className="fz__datum">
                  <b>{t.tag}</b>
                  <span>{t.monat}</span>
                </div>
                <div>
                  <h3>{t.titel}</h3>
                  <p>{t.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fz__section" id="tickets">
        <div className="demo__shell">
          <div className="fz__abschnittkopf auf">
            <p className="fz__mini" style={{ color: "var(--abend)" }}>Tickets</p>
            <h2 className="fz__h2 fz__display">Ein Preis, alles drin.</h2>
            <p>
              Keine Zusatzkarten für einzelne Bahnen, kein Aufpreis am Wochenende. Wer nach 16 Uhr
              kommt, zahlt die Hälfte.
            </p>
          </div>

          <div className="fz__tickets">
            {TICKETS.map((t) => (
              <article className="fz__ticket auf" key={t.name} data-beliebt={t.beliebt}>
                <h3>{t.name}</h3>
                <p className="fz__betrag">
                  {t.preis} &euro; <small>{t.einheit}</small>
                </p>
                <ul>
                  {t.punkte.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <button
                  type="button"
                  className={`fz__btn ${t.beliebt ? "fz__btn--abend" : "fz__btn--rand"} demo__fake`}
                  disabled
                  style={{ justifySelf: "start" }}
                >
                  In den Warenkorb
                </button>
              </article>
            ))}
          </div>
          <p className="demo__note" style={{ marginTop: "22px" }}>
            Attrappe: Auf dieser Demo-Seite lässt sich nichts kaufen.
          </p>
        </div>
      </section>

      <section className="fz__section fz__section--creme" id="hotel">
        <div className="demo__shell fz__hotel">
          <div className="auf zoom">
            <Bild platz={BILD_HOTEL} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="auf">
            <p className="fz__mini" style={{ color: "var(--moos)" }}>Übernachten</p>
            <h2 className="fz__h2 fz__display">Waldhotel Wolkenhain</h2>
            <p style={{ color: "var(--grau)", maxWidth: "44ch" }}>
              48 Holzhäuser am Waldrand, vier Gehminuten vom Haupteingang. Wer hier schläft, darf
              schon am Anreisetag in den Park und morgens eine halbe Stunde vor allen anderen rein.
            </p>
            <dl className="fz__hotel-liste">
              {HOTEL.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <a href="#tickets" className="fz__btn fz__btn--abend">
              Verfügbarkeit prüfen <span aria-hidden="true">&#8594;</span>
            </a>
          </div>
        </div>
      </section>

      <section className="fz__section">
        <div className="demo__shell">
          <div className="fz__abschnittkopf auf">
            <p className="fz__mini" style={{ color: "var(--moos)" }}>Gastronomie</p>
            <h2 className="fz__h2 fz__display">Essen, ohne anzustehen.</h2>
            <p>
              Drei Lokale, alle mit Terrasse im Schatten. Eigene Verpflegung dürfen Sie
              selbstverständlich mitbringen - Picknicktische stehen überall.
            </p>
          </div>
          <div className="fz__essen">
            {LOKALE.map((l, i) => (
              <article className="fz__lokal zoom auf" key={l.name}>
                <Bild platz={BILD_ESSEN[i]!} sizes="(max-width: 900px) 100vw, 33vw" />
                <div className="fz__lokal-text">
                  <p className="fz__lokal-ort">{l.ort}</p>
                  <h3>{l.name}</h3>
                  <p>{l.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fz__section fz__section--creme" id="planen">
        <div className="demo__shell">
          <div className="fz__abschnittkopf auf">
            <p className="fz__mini" style={{ color: "var(--moos)" }}>Besuch planen</p>
            <h2 className="fz__h2 fz__display">Wann und wie Sie herkommen.</h2>
          </div>
          <div className="fz__planen">
            <table className="fz__zeiten">
              <tbody>
                {ZEITEN.map((z) => (
                  <tr key={z.tag} data-heute={z.heute}>
                    <th scope="row">{z.tag}</th>
                    <td>{z.zeit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="fz__hinweise">
              <div className="fz__hinweis">
                <strong>Anfahrt</strong>
                <p>Wolkenhainer Weg 1, 12345 Musterstadt. Abfahrt 14 der A99, dann 6 km. 2.400 Parkplätze, 8 € pro Tag.</p>
              </div>
              <div className="fz__hinweis">
                <strong>Mit Bus und Bahn</strong>
                <p>Regionalbahn bis Musterstadt-Wald, von dort Buslinie 41 im 20-Minuten-Takt bis vor den Eingang.</p>
              </div>
              <div className="fz__hinweis">
                <strong>Barrierefrei</strong>
                <p>Der ganze Rundweg ist mit Rollstuhl und Kinderwagen befahrbar. 14 der 24 Bahnen sind barrierefrei zugänglich.</p>
              </div>
              <div className="fz__hinweis">
                <strong>Ruhige Tage</strong>
                <p>Dienstag und Mittwoch außerhalb der Ferien. Am vollsten ist es an Samstagen im Juli.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="fz__fuss">
        <div className="demo__shell">
          <div className="fz__fuss-grid">
            <div>
              <span className="fz__marke">
                <span className="fz__zeichen" aria-hidden="true" />
                <span>
                  <strong>Wolkenhain</strong>
                  <span>Freizeitpark im Wald</span>
                </span>
              </span>
              <p style={{ marginTop: "16px", maxWidth: "34ch", fontSize: "14.5px" }}>
                62 Hektar Mischwald, 24 Fahrgeschäfte, vier Themenwelten. Seit 1998 in
                Familienbesitz.
              </p>
            </div>
            <div>
              <h4>Besuch</h4>
              <ul>
                <li><a href="#tickets">Tickets &amp; Preise</a></li>
                <li><a href="#planen">Öffnungszeiten</a></li>
                <li><a href="#planen">Anfahrt</a></li>
                <li><a href="#planen">Parkplan</a></li>
              </ul>
            </div>
            <div>
              <h4>Park</h4>
              <ul>
                <li><a href="#welten">Themenwelten</a></li>
                <li><a href="#attraktionen">Attraktionen</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="#hotel">Waldhotel</a></li>
              </ul>
            </div>
            <div>
              <h4>Kontakt</h4>
              <ul>
                <li>Wolkenhainer Weg 1</li>
                <li>12345 Musterstadt</li>
                <li>0 12345 00000</li>
                <li>hallo@wolkenhain.example</li>
              </ul>
            </div>
          </div>
          <div className="fz__fuss-schluss">
            <span>Demo-Projekt. Erfundener Park, erfundene Preise, Zeiten und Adressen.</span>
            <span>Gestaltet von Novahost</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
