import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "@/styles/demo-mode.css";

/**
 * Demo 2 - Atelier Nordlicht (erfundener Onlineshop).
 *
 * Gestalterische Haltung: das Gegenteil des Cafés. Kühl, streng, fast
 * monochrom, geometrische Grotesk in Versalien. Die Seite nimmt sich zurück,
 * damit die Ware wirkt - so arbeiten Modeshops tatsächlich.
 *
 * Die Produktbilder sind CSS-Silhouetten. Ein echter Shop hätte hier
 * Aufnahmen; eine Attrappe soll aber keine Fotos vortäuschen.
 */
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap", weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Atelier Nordlicht - Demo-Projekt",
  description: "Demo-Projekt von Novahost: Onlineshop für ein Modelabel mit Kleinserien.",
};

export const viewport: Viewport = { themeColor: "#f7f6f4", colorScheme: "light" };

const ARTIKEL = [
  { name: "Hemdbluse Vika", stoff: "Leinen, gewaschen", preis: "149", form: "oberteil", ton: "#8c8579", marker: "Neu", farben: ["#e8e4dc", "#8a7c6a", "#2b2723"] },
  { name: "Weite Hose Ola", stoff: "Baumwoll-Twill", preis: "179", form: "hose", ton: "#4c4740", marker: "", farben: ["#4c4740", "#1c1a17"] },
  { name: "Mantel Fjord", stoff: "Wollmischung, ungefüttert", preis: "389", form: "mantel", ton: "#6b6459", marker: "Kleinserie", farben: ["#6b6459", "#22201d"] },
  { name: "Tasche Skagen", stoff: "Pflanzlich gegerbtes Leder", preis: "229", form: "tasche", ton: "#7d6a55", marker: "", farben: ["#7d6a55", "#2e2822"] },
];

const GROESSEN = [
  { g: "XS", brust: "82 - 86", taille: "62 - 66", hueft: "88 - 92" },
  { g: "S", brust: "86 - 90", taille: "66 - 70", hueft: "92 - 96" },
  { g: "M", brust: "90 - 96", taille: "70 - 76", hueft: "96 - 102" },
  { g: "L", brust: "96 - 102", taille: "76 - 82", hueft: "102 - 108" },
  { g: "XL", brust: "102 - 110", taille: "82 - 90", hueft: "108 - 116" },
];

const VERSPRECHEN = [
  { titel: "Versand ab 80 €", text: "Innerhalb Deutschlands kostenfrei, Lieferung in zwei bis vier Werktagen." },
  { titel: "30 Tage Rückgabe", text: "Ungetragen und mit Etikett zurück - das Rücksendeetikett liegt bei." },
  { titel: "Kleine Auflagen", text: "Jede Serie umfasst 40 bis 120 Stück. Was weg ist, kommt nicht wieder." },
];

export default function ModeDemo() {
  return (
    <div className={`demo mode ${jost.variable}`}>
      <p className="mode__band mode__mini">Kostenfreier Versand ab 80 € &middot; Neue Serie: Winter 26</p>

      <div className="demo__shell">
        <nav className="mode__nav">
          <div className="mode__navlinks mode__mini">
            <a href="#neu">Neuheiten</a>
            <a href="#groessen">Größen</a>
            <a href="#service">Service</a>
          </div>
          <span className="mode__marke">Atelier Nordlicht</span>
          <div className="mode__navrechts mode__mini">
            <a href="#service">Suche</a>
            <a href="#neu" className="mode__korb">
              Warenkorb <b>2</b>
            </a>
          </div>
        </nav>
      </div>

      <header className="mode__hero">
        <div className="mode__hero-inhalt">
          <p className="mode__mini">Serie 04 &middot; Winter 26</p>
          <h1 className="mode__display">Weniger Teile, länger getragen.</h1>
          <p>
            Vier Stoffe, elf Schnitte, gefertigt in einer Manufaktur in Portugal. Wir legen keine
            Kollektion nach - was ausverkauft ist, bleibt es.
          </p>
          <a href="#neu" className="mode__btn">
            Serie ansehen <span aria-hidden="true">&#8594;</span>
          </a>
        </div>
      </header>

      <section className="mode__section" id="neu">
        <div className="demo__shell">
          <div className="mode__kopf">
            <div>
              <p className="mode__mini" style={{ color: "var(--grau)" }}>Serie 04</p>
              <h2 className="mode__display">Neu im Atelier</h2>
            </div>
            <a href="#neu" className="mode__mini">Alle 11 Teile &#8594;</a>
          </div>

          <div className="mode__raster">
            {ARTIKEL.map((a) => (
              <article className="mode__artikel" key={a.name}>
                <div className="mode__bild">
                  {a.marker && <span className="mode__marker">{a.marker}</span>}
                  <span
                    className="mode__stueck"
                    data-form={a.form}
                    style={{ color: a.ton }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3>{a.name}</h3>
                  <p>{a.stoff}</p>
                </div>
                <div className="mode__artikel-fuss">
                  <span className="mode__farben" aria-label={`${a.farben.length} Farben`}>
                    {a.farben.map((f) => (
                      <span key={f} style={{ background: f }} />
                    ))}
                  </span>
                  <span className="mode__preis">{a.preis},00 &euro;</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mode__section mode__groessen" id="groessen">
        <div className="demo__shell">
          <div className="mode__groessen-inhalt">
            <div>
              <p className="mode__mini" style={{ color: "var(--grau)" }}>Größenberatung</p>
              <h2 className="mode__display" style={{ fontSize: "clamp(1.7rem,3.4vw,2.6rem)", margin: "12px 0 16px" }}>
                Im Zweifel die kleinere.
              </h2>
              <p style={{ color: "var(--grau)", maxWidth: "42ch" }}>
                Unsere Schnitte fallen weit aus. Wenn Sie zwischen zwei Größen liegen, nehmen Sie
                die kleinere - außer beim Mantel Fjord, der wird bewusst über der Jacke getragen.
              </p>
              <a href="#service" className="mode__btn mode__btn--dunkel">Beratung anfragen</a>
            </div>
            <table className="mode__tabelle">
              <caption className="mode__mini" style={{ textAlign: "left", paddingBottom: "12px", color: "var(--grau)" }}>
                Angaben in Zentimetern
              </caption>
              <thead>
                <tr>
                  <th scope="col">Größe</th>
                  <th scope="col">Brust</th>
                  <th scope="col">Taille</th>
                  <th scope="col">Hüfte</th>
                </tr>
              </thead>
              <tbody>
                {GROESSEN.map((g) => (
                  <tr key={g.g}>
                    <th scope="row">{g.g}</th>
                    <td>{g.brust}</td>
                    <td>{g.taille}</td>
                    <td>{g.hueft}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="mode__versprechen" id="service">
        {VERSPRECHEN.map((v) => (
          <div key={v.titel}>
            <p className="mode__mini" style={{ color: "var(--sand)" }}>Service</p>
            <h3>{v.titel}</h3>
            <p>{v.text}</p>
          </div>
        ))}
      </div>

      <footer className="mode__fuss">
        <div className="demo__shell">
          <div className="mode__fuss-grid">
            <div>
              <p className="mode__marke" style={{ textAlign: "left", color: "var(--weiss)" }}>Atelier Nordlicht</p>
              <p style={{ marginTop: "14px", maxWidth: "32ch", fontSize: "14px" }}>
                Kleine Serien aus wenigen Stoffen. Entworfen in Hamburg, genäht in Porto.
              </p>
            </div>
            <div>
              <h4 className="mode__mini">Shop</h4>
              <ul>
                <li><a href="#neu">Neuheiten</a></li>
                <li><a href="#neu">Oberteile</a></li>
                <li><a href="#neu">Hosen</a></li>
                <li><a href="#neu">Accessoires</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mode__mini">Service</h4>
              <ul>
                <li><a href="#groessen">Größenberatung</a></li>
                <li><a href="#service">Versand</a></li>
                <li><a href="#service">Rückgabe</a></li>
                <li><a href="#service">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mode__mini">Rechtliches</h4>
              <ul>
                <li>Impressum</li>
                <li>Datenschutz</li>
                <li>AGB</li>
                <li>Widerruf</li>
              </ul>
            </div>
          </div>
          <div className="mode__fuss-schluss">
            <span>Demo-Projekt. Erfundenes Label, erfundene Preise - hier lässt sich nichts bestellen.</span>
            <span>Gestaltet von Novahost</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
