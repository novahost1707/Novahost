import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Bild } from "@/components/demo/Bild";
import { Reservierung } from "@/components/demo/restaurant/Reservierung";
import type { Bildplatz } from "@/lib/demo-bilder";
import "@/styles/demo-restaurant.css";

/**
 * Demo 4 - Restaurant Amsel (erfundenes Haus).
 *
 * Marke: gehobene Saisonküche, 34 Plätze, offene Küche, zwei Menüs. Kein
 * Sterne-Getue, aber ein klarer Anspruch: was auf den Teller kommt, wächst
 * höchstens 120 Kilometer entfernt.
 *
 * Haltung: ruhig, warm, zeitlos. Fast schwarzer Grund, hohe Serifenschrift,
 * Messing als einziger Akzent, grosse Bilder und viel Luft. Bewusst wenige
 * Kanten - kaum Karten, keine Glasflächen, keine technisch wirkenden
 * Bausteine.
 *
 * Conversion: Die Seite hat genau ein Ziel, und alles führt darauf hin - den
 * Tisch zu reservieren. Der Knopf steht im Kopf, im Hero, nach dem Konzept,
 * unter der Karte, im eigenen Abschnitt und auf dem Handy dauerhaft am
 * unteren Rand.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Restaurant Amsel - Demo-Projekt",
  description: "Demo-Projekt von Novahost: Website für ein Restaurant mit Saisonküche und Reservierung.",
};

export const viewport: Viewport = { themeColor: "#14100e", colorScheme: "dark" };

/* --- Bildplätze ---------------------------------------------------------- */
const BILD_HERO: Bildplatz = {
  src: "/demo/restaurant/hero.jpg",
  alt: "Der Gastraum am Abend, gedeckte Tische unter Messingleuchten",
  ratio: "16 / 9",
  motiv: "essen-raum",
  variante: 0,
};
const BILD_KONZEPT: Bildplatz = {
  src: "/demo/restaurant/konzept.jpg",
  alt: "Blick in die offene Küche während des Service",
  ratio: "4 / 5",
  motiv: "essen-koch",
  variante: 0,
};
const BILD_KUECHENCHEF: Bildplatz = {
  src: "/demo/restaurant/kuechenchef.jpg",
  alt: "Porträt der Küchenchefin am Pass",
  ratio: "4 / 5",
  motiv: "essen-koch",
  variante: 1,
};
const BILD_GERICHT: Bildplatz[] = [
  { src: "/demo/restaurant/gericht-saibling.jpg", alt: "Saibling mit Gurke und Buttermilch, von oben", ratio: "1 / 1", motiv: "essen-teller", variante: 0 },
  { src: "/demo/restaurant/gericht-sellerie.jpg", alt: "Sellerie in Salzteig mit Haselnuss, von oben", ratio: "1 / 1", motiv: "essen-teller", variante: 1 },
  { src: "/demo/restaurant/gericht-taube.jpg", alt: "Taube mit Rote Bete und Wacholder, von oben", ratio: "1 / 1", motiv: "essen-teller", variante: 2 },
];
const BILD_RAUM: Bildplatz[] = [
  { src: "/demo/restaurant/raum-saal.jpg", alt: "Der Saal mit hohen Fenstern und alten Dielen", ratio: "16 / 11", motiv: "essen-raum", variante: 1 },
  { src: "/demo/restaurant/raum-bar.jpg", alt: "Die Bar mit Weinregal aus Eiche", ratio: "4 / 5", motiv: "essen-wein", variante: 0 },
  { src: "/demo/restaurant/raum-detail.jpg", alt: "Detail: Kräuter aus dem eigenen Garten", ratio: "4 / 5", motiv: "essen-detail", variante: 0 },
  { src: "/demo/restaurant/raum-tisch.jpg", alt: "Gedeckter Tisch am Fenster zur blauen Stunde", ratio: "16 / 11", motiv: "essen-raum", variante: 2 },
];

/* --- Inhalte ------------------------------------------------------------- */
const ZAHLEN = [
  { wert: "34", text: "Plätze im Saal" },
  { wert: "2019", text: "eröffnet" },
  { wert: "120 km", text: "weitester Lieferant" },
  { wert: "7", text: "Gänge im großen Menü" },
];

const GERICHTE = [
  {
    gang: "Zweiter Gang",
    name: "Saibling, Gurke, Buttermilch",
    text: "Saibling aus dem Nachbarort, 24 Stunden in Salzlake, dazu eingelegte Gurke und eine kalte Buttermilch mit Dill.",
    bild: 0,
  },
  {
    gang: "Vierter Gang",
    name: "Sellerie im Salzteig",
    text: "Zwei Stunden im Salzteig gegart, danach in eigener Brühe glasiert. Mit gerösteter Haselnuss und Kerbel.",
    bild: 1,
  },
  {
    gang: "Sechster Gang",
    name: "Taube, Rote Bete, Wacholder",
    text: "Brust am Knochen gebraten, Keule als Praline. Rote Bete aus dem Sandboden vor der Stadt, Jus mit Wacholder.",
    bild: 2,
  },
];

const MENUE_KLEIN = [
  { name: "Brot & Butter", note: "Sauerteig aus 36 Stunden, gesalzene Butter" },
  { name: "Saibling, Gurke, Buttermilch", note: "" },
  { name: "Sellerie im Salzteig", note: "Haselnuss, Kerbel" },
  { name: "Reh, Pilze, Preiselbeere", note: "aus dem Forst hinter Kleinbach" },
  { name: "Quitte, Sauerrahm, Mandel", note: "" },
];

const MENUE_GROSS = [
  { name: "Brot & Butter", note: "Sauerteig aus 36 Stunden, gesalzene Butter" },
  { name: "Auster, Apfel, Meerrettich", note: "" },
  { name: "Saibling, Gurke, Buttermilch", note: "" },
  { name: "Sellerie im Salzteig", note: "Haselnuss, Kerbel" },
  { name: "Steinbutt, Fenchel, Safran", note: "" },
  { name: "Taube, Rote Bete, Wacholder", note: "" },
  { name: "Käse aus der Region", note: "drei Sorten, gereift im eigenen Keller" },
  { name: "Quitte, Sauerrahm, Mandel", note: "" },
];

const PRESSE = [
  { wert: "16", quelle: "Punkte im Gault&Millau", zitat: "„Eine Küche, die sich traut, wenig auf den Teller zu legen.“" },
  { wert: "4,8", quelle: "aus 486 Gästebewertungen", zitat: "„Der Service erklärt jeden Gang, ohne zu dozieren.“" },
  { wert: "2023", quelle: "Aufnahme in den Guide", zitat: "„Ein Haus, für das sich die Anfahrt lohnt.“" },
  { wert: "94 %", quelle: "kommen wieder", zitat: "„Wir waren zum vierten Mal da. Es war nie zweimal dasselbe.“" },
];

const ZEITEN = [
  { tag: "Dienstag - Donnerstag", zeit: "18:00 - 23:00" },
  { tag: "Freitag & Samstag", zeit: "17:30 - 00:00" },
  { tag: "Sonntag", zeit: "12:00 - 16:00 (Mittagsmenü)" },
  { tag: "Montag", zeit: "Ruhetag" },
];

export default function RestaurantDemo() {
  return (
    <div className={`demo rt ${cormorant.variable}`}>
      <header className="rt__kopfleiste">
        <div className="demo__shell">
          <nav className="rt__nav" aria-label="Hauptnavigation">
            <div className="rt__navlinks">
              <a href="#konzept">Haus</a>
              <a href="#karte">Karte</a>
              <a href="#kueche">Küche</a>
              <a href="#raum">Raum</a>
            </div>
            <a href="#" className="rt__marke">
              Amsel
              <small>Restaurant seit 2019</small>
            </a>
            <div className="rt__navrechts">
              <a href="#reservierung" className="rt__tel">0 12345 67890</a>
              <a href="#reservierung" className="rt__btn rt__btn--klein">Tisch reservieren</a>
            </div>
          </nav>
        </div>
      </header>

      <section className="rt__hero">
        <Bild platz={BILD_HERO} sizes="100vw" priority />
        <div className="rt__hero-schleier" aria-hidden="true" />
        <div className="rt__hero-inhalt">
          <div className="demo__shell">
            <p className="rt__mini">Saisonküche &middot; Musterstadt</p>
            <h1 className="rt__display">
              Vier Zutaten auf dem Teller.
              <br />
              <em>Vierzig im Kopf.</em>
            </h1>
            <p>
              Zwei Menüs, wechselnd mit der Saison, gekocht aus dem, was in dieser Woche
              tatsächlich gut ist. Vierunddreißig Plätze, offene Küche, kein Dresscode.
            </p>
            <div className="rt__hero-aktionen">
              <a href="#reservierung" className="rt__btn rt__btn--voll">Tisch reservieren</a>
              <a href="#karte" className="rt__btn rt__btn--creme">Menü ansehen</a>
            </div>
            <p className="rt__hero-hinweis">
              <i aria-hidden="true" />
              Für diese Woche sind noch Tische am Donnerstag und Sonntag frei
            </p>
          </div>
        </div>
      </section>

      <div className="demo__shell">
        <div className="rt__zahlen">
          {ZAHLEN.map((z) => (
            <div className="rt__zahl" key={z.text}>
              <b>{z.wert}</b>
              <span>{z.text}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="rt__section" id="konzept">
        <div className="demo__shell rt__doppel">
          <div className="auf">
            <p className="rt__mini rt__strich">Das Haus</p>
            <h2 className="rt__h2 rt__display">Wir kochen, was diese Woche hergibt.</h2>
            <p style={{ color: "var(--grau)", maxWidth: "46ch" }}>
              Es gibt keine feste Karte. Am Montag telefonieren wir mit acht Höfen, am Dienstag
              steht das Menü. Was nicht geliefert wird, kommt nicht auf den Teller - auch wenn
              es letzte Woche noch der Liebling war.
            </p>
            <blockquote className="rt__zitat">
              Ein Gericht ist fertig, wenn nichts mehr weggenommen werden kann. Nicht, wenn
              nichts mehr draufpasst.
            </blockquote>
            <p className="rt__signatur">Marlene Ahrend &middot; Küchenchefin</p>
            <div style={{ marginTop: "30px" }}>
              <a href="#karte" className="rt__btn">Zur Karte</a>
            </div>
          </div>
          <div className="auf">
            <Bild platz={BILD_KONZEPT} sizes="(max-width: 900px) 100vw, 46vw" />
          </div>
        </div>
      </section>

      <section className="rt__section rt__section--weich" id="signature">
        <div className="demo__shell">
          <div className="rt__kopf rt__kopf--mitte auf">
            <p className="rt__mini rt__strich" style={{ justifyContent: "center" }}>Aus dem aktuellen Menü</p>
            <h2 className="rt__h2 rt__display">Drei Gänge, die geblieben sind.</h2>
            <p>
              Das Menü wechselt alle zwei Wochen. Diese drei haben es über mehrere Saisons
              hinweg immer wieder zurück auf die Karte geschafft.
            </p>
          </div>
          <div className="rt__gerichte">
            {GERICHTE.map((g) => (
              <article className="rt__gericht zoom auf" key={g.name}>
                <Bild platz={BILD_GERICHT[g.bild]!} sizes="(max-width: 900px) 100vw, 30vw" />
                <p className="rt__gericht-gang">{g.gang}</p>
                <h3>{g.name}</h3>
                <p>{g.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rt__section" id="karte">
        <div className="demo__shell">
          <div className="rt__kopf rt__kopf--mitte auf">
            <p className="rt__mini rt__strich" style={{ justifyContent: "center" }}>Die Karte</p>
            <h2 className="rt__h2 rt__display">Zwei Menüs, kein à la carte.</h2>
            <p>
              Wir kochen für alle Gäste dasselbe - so bleibt die Küche klein und die Qualität
              gleich. Unverträglichkeiten sagen Sie bei der Reservierung, wir richten uns danach.
            </p>
          </div>

          <div className="rt__menues auf">
            <div className="rt__menue">
              <div className="rt__menue-kopf">
                <h3>Das kleine Menü</h3>
                <span className="rt__menue-preis">98 &euro;</span>
              </div>
              {MENUE_KLEIN.map((g) => (
                <div className="rt__gang" key={g.name}>
                  <b>{g.name}</b>
                  {g.note && <small>{g.note}</small>}
                </div>
              ))}
              <p className="rt__menue-fuss">Fünf Gänge &middot; etwa zweieinhalb Stunden</p>
            </div>

            <div className="rt__menue">
              <div className="rt__menue-kopf">
                <h3>Das große Menü</h3>
                <span className="rt__menue-preis">148 &euro;</span>
              </div>
              {MENUE_GROSS.map((g) => (
                <div className="rt__gang" key={g.name}>
                  <b>{g.name}</b>
                  {g.note && <small>{g.note}</small>}
                </div>
              ))}
              <p className="rt__menue-fuss">Acht Gänge &middot; etwa dreieinhalb Stunden</p>
            </div>
          </div>

          <div className="rt__begleitung auf">
            <span><b>Weinbegleitung</b> 68 € / 94 €</span>
            <span><b>Alkoholfreie Begleitung</b> 44 €</span>
            <span><b>Vegetarisch</b> beide Menüs, ohne Aufpreis</span>
          </div>

          <div style={{ textAlign: "center", marginTop: "clamp(30px, 4vw, 52px)" }}>
            <a href="#reservierung" className="rt__btn rt__btn--voll">Tisch reservieren</a>
          </div>
        </div>
      </section>

      <section className="rt__section rt__section--weich" id="kueche">
        <div className="demo__shell rt__doppel rt__doppel--gedreht">
          <div className="auf">
            <p className="rt__mini rt__strich">Die Küche</p>
            <h2 className="rt__h2 rt__display">Marlene Ahrend</h2>
            <p style={{ color: "var(--grau)", maxWidth: "46ch" }}>
              Gelernt in Kopenhagen und im Burgund, seit 2019 hier. Sie kocht ohne Sous-vide und
              ohne Schaum - alles, was auf den Teller kommt, ist über Feuer oder in der Pfanne
              gewesen.
            </p>
            <p style={{ color: "var(--grau)", maxWidth: "46ch", marginTop: "16px" }}>
              Neun Leute in Küche und Service, davon zwei in Ausbildung. Am Pass steht sie
              selbst, an jedem Abend, an dem geöffnet ist.
            </p>
            <div className="rt__kontaktblock" style={{ marginTop: "30px" }}>
              <div>
                <dt>Küchenteam</dt>
                <dd>5 Köchinnen und Köche, 2 Auszubildende</dd>
              </div>
              <div>
                <dt>Service</dt>
                <dd>Yannick Brahms, Restaurantleitung &amp; Sommelier</dd>
              </div>
            </div>
          </div>
          <div className="auf">
            <Bild platz={BILD_KUECHENCHEF} sizes="(max-width: 900px) 100vw, 46vw" />
          </div>
        </div>
      </section>

      <section className="rt__section" id="raum">
        <div className="demo__shell">
          <div className="rt__kopf rt__kopf--mitte auf">
            <p className="rt__mini rt__strich" style={{ justifyContent: "center" }}>Der Raum</p>
            <h2 className="rt__h2 rt__display">Ein Kontorhaus von 1911.</h2>
            <p>
              Alte Dielen, hohe Fenster, vierunddreißig Plätze an massiven Eichentischen. Kein
              weißes Tischtuch, kein Dresscode - aber gutes Licht und genug Abstand zum
              Nachbartisch.
            </p>
          </div>
          <div className="rt__galerie">
            <div className="zoom auf rt__galerie-gross"><Bild platz={BILD_RAUM[0]!} sizes="(max-width: 760px) 50vw, 56vw" /></div>
            <div className="zoom auf rt__galerie-klein"><Bild platz={BILD_RAUM[1]!} sizes="(max-width: 760px) 50vw, 40vw" /></div>
            <div className="zoom auf rt__galerie-klein"><Bild platz={BILD_RAUM[2]!} sizes="(max-width: 760px) 50vw, 40vw" /></div>
            <div className="zoom auf rt__galerie-gross"><Bild platz={BILD_RAUM[3]!} sizes="(max-width: 760px) 50vw, 56vw" /></div>
          </div>
        </div>
      </section>

      <section className="rt__section rt__section--weich">
        <div className="demo__shell">
          <div className="rt__kopf rt__kopf--mitte auf">
            <p className="rt__mini rt__strich" style={{ justifyContent: "center" }}>Stimmen</p>
            <h2 className="rt__h2 rt__display">Was über uns geschrieben wird.</h2>
          </div>
          <div className="rt__presse">
            {PRESSE.map((p) => (
              <div className="rt__presse-eintrag auf" key={p.quelle}>
                <b>{p.wert}</b>
                <span>{p.quelle}</span>
                <em>{p.zitat}</em>
              </div>
            ))}
          </div>
          <p className="demo__note" style={{ marginTop: "34px", textAlign: "center" }}>
            Demo-Seite: Auszeichnungen, Bewertungen und Zitate gehören zum erfundenen Haus.
          </p>
        </div>
      </section>

      <section className="rt__section" id="reservierung">
        <div className="demo__shell rt__reservierung">
          <div className="auf">
            <p className="rt__mini rt__strich">Reservierung</p>
            <h2 className="rt__h2 rt__display">Wir halten Ihnen einen Tisch frei.</h2>
            <p style={{ color: "var(--grau)", maxWidth: "42ch" }}>
              Reservierungen nehmen wir bis zu drei Monate im Voraus an. Für Gruppen ab sechs
              Personen rufen Sie uns bitte an - dann sprechen wir das Menü vorher ab.
            </p>

            <table className="rt__zeiten">
              <tbody>
                {ZEITEN.map((z) => (
                  <tr key={z.tag}>
                    <th scope="row">{z.tag}</th>
                    <td>{z.zeit}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <dl className="rt__kontaktblock">
              <div>
                <dt>Telefon</dt>
                <dd>0 12345 67890</dd>
              </div>
              <div>
                <dt>Adresse</dt>
                <dd>Kontorhaus am Fleet, Speicherstraße 4<br />12345 Musterstadt</dd>
              </div>
              <div>
                <dt>Anfahrt</dt>
                <dd>Fünf Gehminuten vom Hauptbahnhof. Parkhaus Fleetpassage gegenüber.</dd>
              </div>
            </dl>
          </div>

          <Reservierung />
        </div>
      </section>

      <footer className="rt__fuss">
        <div className="demo__shell">
          <div className="rt__fuss-grid">
            <div>
              <p className="rt__marke" style={{ textAlign: "left" }}>
                Amsel
                <small>Restaurant seit 2019</small>
              </p>
              <p style={{ marginTop: "18px", maxWidth: "32ch", color: "var(--grau)", fontSize: "15px" }}>
                Saisonküche im Kontorhaus am Fleet. Zwei Menüs, vierunddreißig Plätze,
                offene Küche.
              </p>
            </div>
            <div>
              <h4>Besuch</h4>
              <ul>
                <li><a href="#reservierung">Reservieren</a></li>
                <li><a href="#karte">Die Karte</a></li>
                <li><a href="#reservierung">Öffnungszeiten</a></li>
                <li><a href="#reservierung">Anfahrt</a></li>
              </ul>
            </div>
            <div>
              <h4>Haus</h4>
              <ul>
                <li><a href="#konzept">Das Haus</a></li>
                <li><a href="#kueche">Die Küche</a></li>
                <li><a href="#raum">Der Raum</a></li>
                <li>Gutscheine</li>
              </ul>
            </div>
            <div>
              <h4>Kontakt</h4>
              <ul>
                <li>Speicherstraße 4</li>
                <li>12345 Musterstadt</li>
                <li>0 12345 67890</li>
                <li>tisch@amsel.example</li>
              </ul>
            </div>
          </div>
          <div className="rt__fuss-schluss">
            <span>Demo-Projekt. Erfundenes Haus, erfundene Adresse, Preise und Auszeichnungen.</span>
            <span>Gestaltet von Novahost</span>
          </div>
        </div>
      </footer>

      <div className="rt__leiste">
        <span>
          Heute geöffnet
          <b>18:00 - 23:00 Uhr</b>
        </span>
        <a href="#reservierung" className="rt__btn rt__btn--voll rt__btn--klein">Reservieren</a>
      </div>
    </div>
  );
}
