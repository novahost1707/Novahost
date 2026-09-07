import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Jost } from "next/font/google";
import { Bild } from "@/components/demo/Bild";
import { produktBySlug, warenkorb } from "@/lib/demo-mode";
import "@/styles/demo-mode.css";

/**
 * Demo 2 - NORDLICHT (erfundenes Modelabel).
 *
 * Gemeinsamer Rahmen für Startseite und Produktseiten: Ankündigungsband,
 * Kopfzeile, Warenkorb-Schublade und Fuß. So bleibt der Shop über alle Seiten
 * hinweg derselbe - genau das unterscheidet einen Auftritt von einer
 * Einzelseite.
 *
 * Die Schublade läuft ohne JavaScript: ein Kontrollkästchen im Kopf schaltet
 * sie über einen Geschwisterselektor auf. Sie ist eine Attrappe und sagt das
 * auch.
 */
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap", weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: { default: "NORDLICHT - Demo-Projekt", template: "%s - NORDLICHT" },
  description: "Demo-Projekt von Novahost: Onlineshop für ein Label mit urbanen Basics in Kleinserien.",
};

export const viewport: Viewport = { themeColor: "#f6f5f2", colorScheme: "light" };

export default function ModeLayout({ children }: { children: React.ReactNode }) {
  const zeilen = warenkorb
    .map((z) => ({ ...z, produkt: produktBySlug(z.slug)! }))
    .filter((z) => z.produkt);
  const summe = zeilen.reduce((s, z) => s + Number(z.produkt.preis) * z.menge, 0);

  return (
    <div className={`demo mode ${jost.variable}`}>
      {/* Schaltet die Warenkorb-Schublade. Sichtbar unsichtbar, damit sie
          mit der Tastatur erreichbar bleibt. */}
      <input type="checkbox" id="mode-korb" className="mode__schalter" aria-label="Warenkorb öffnen" />

      <p className="mode__band mode__mini">Versandkostenfrei ab 80 € &middot; Serie 04 ist online</p>

      <header className="mode__kopf">
        <div className="demo__shell">
          <nav className="mode__nav">
            <div className="mode__navlinks mode__mini">
              <Link href="/demo/mode#serie">Serie 04</Link>
              <Link href="/demo/mode#kategorien">Kategorien</Link>
              <Link href="/demo/mode#material">Material</Link>
            </div>
            <Link href="/demo/mode" className="mode__marke">Nordlicht</Link>
            <div className="mode__navrechts mode__mini">
              <Link href="/demo/mode#serie">Suche</Link>
              <label htmlFor="mode-korb" className="mode__korb-knopf mode__mini">
                Warenkorb <b>{zeilen.reduce((s, z) => s + z.menge, 0)}</b>
              </label>
            </div>
          </nav>
        </div>
      </header>

      {children}

      <footer className="mode__fuss">
        <div className="demo__shell">
          <div className="mode__fuss-grid">
            <div>
              <p className="mode__marke" style={{ textAlign: "left", color: "var(--weiss)" }}>Nordlicht</p>
              <p style={{ marginTop: "16px", maxWidth: "34ch" }}>
                Urbane Basics in kleinen Serien. Entworfen in Hamburg, gefertigt in Portugal und
                Italien. Wir legen nicht nach.
              </p>
            </div>
            <div>
              <h4 className="mode__mini">Shop</h4>
              <ul>
                <li><Link href="/demo/mode#serie">Serie 04</Link></li>
                <li><Link href="/demo/mode#kategorien">Oberteile</Link></li>
                <li><Link href="/demo/mode#kategorien">Hosen</Link></li>
                <li><Link href="/demo/mode#kategorien">Accessoires</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mode__mini">Service</h4>
              <ul>
                <li>Größenberatung</li>
                <li>Versand &amp; Lieferung</li>
                <li>Rückgabe</li>
                <li>Reparatur</li>
              </ul>
            </div>
            <div>
              <h4 className="mode__mini">Über uns</h4>
              <ul>
                <li><Link href="/demo/mode#material">Material</Link></li>
                <li>Fertigung</li>
                <li>Impressum</li>
                <li>Datenschutz</li>
              </ul>
            </div>
          </div>
          <div className="mode__fuss-schluss">
            <span>Demo-Projekt. Erfundenes Label, erfundene Preise - hier lässt sich nichts bestellen.</span>
            <span>Gestaltet von Novahost</span>
          </div>
        </div>
      </footer>

      <label htmlFor="mode-korb" className="mode__schleier" aria-hidden="true" />

      <aside className="mode__schublade" aria-label="Warenkorb">
        <div className="mode__schublade-kopf">
          <span className="mode__mini">Warenkorb ({zeilen.reduce((s, z) => s + z.menge, 0)})</span>
          <label htmlFor="mode-korb" className="mode__schliessen" aria-label="Warenkorb schließen">
            &times;
          </label>
        </div>
        <div className="mode__schublade-liste">
          {zeilen.map((z) => (
            <div className="mode__korbzeile" key={z.slug}>
              <Bild platz={z.produkt.bilder[0]!} sizes="68px" />
              <div>
                <h4>{z.produkt.name}</h4>
                <p>{z.farbe} &middot; Größe {z.groesse}</p>
                <p>Menge {z.menge}</p>
              </div>
              <span className="mode__preis">{(Number(z.produkt.preis) * z.menge).toFixed(0)},00 &euro;</span>
            </div>
          ))}
        </div>
        <div className="mode__schublade-fuss">
          <div className="mode__summe">
            <span>Zwischensumme</span>
            <b className="mode__preis">{summe.toFixed(0)},00 &euro;</b>
          </div>
          <p className="demo__note">Versand wird im nächsten Schritt berechnet.</p>
          <button type="button" className="mode__btn mode__btn--voll demo__fake" disabled>
            Zur Kasse
          </button>
          <p className="demo__note">Attrappe: Auf dieser Demo-Seite lässt sich nichts bestellen.</p>
        </div>
      </aside>
    </div>
  );
}
