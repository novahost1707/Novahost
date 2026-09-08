import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Jost } from "next/font/google";
import { ShopProvider } from "@/components/demo/shop/ShopProvider";
import { KorbSchublade } from "@/components/demo/shop/KorbSchublade";
import { FavoritenKnopf, KorbKnopf } from "@/components/demo/shop/KorbKnopf";
import { ShopKategorienNav, ShopNavLinks } from "@/components/demo/shop/ShopNav";
import { kategorien, marke, produkte } from "@/lib/demo-mode";
import { findeBilder } from "@/lib/demo-bilder.server";
import "@/styles/demo-shop.css";

/**
 * Demo 2 - ARVO (erfundenes Modelabel).
 *
 * Gemeinsamer Rahmen für alle Shopseiten: Ankündigungsband, Kopfzeile mit
 * Damen/Herren/Sale, Kategorienzeile, Warenkorb-Schublade und Fuß. Genau
 * dieser durchgehende Rahmen unterscheidet einen Shop von einer Einzelseite:
 * Man kann von überall überall hin.
 */
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap", weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: { default: `${marke.name} - Demo-Projekt`, template: `%s - ${marke.name}` },
  description: "Demo-Projekt von Novahost: Onlineshop für ein Label mit urbanen Essentials in Kleinserien.",
};

export const viewport: Viewport = { themeColor: "#f6f5f2", colorScheme: "light" };

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  /* Einmal beim Bauen nachsehen, zu welchen Plätzen ein Foto vorliegt. Die
     Bedienung im Browser kann das nicht selbst - dort gibt es kein
     Dateisystem. */
  const fotos = findeBilder([
    ...produkte.flatMap((p) => p.bilder.map((b) => b.src)),
    ...kategorien.map((k) => k.bild.src),
  ]);

  return (
    <ShopProvider fotos={fotos}>
      <div className={`demo shop ${jost.variable}`}>
        <p className="shop__band shop__mini">
          Versandkostenfrei ab {marke.versandfreiAb} &middot; 30 Tage Rückgabe &middot; Serie 04 ist online
        </p>

        <header className="shop__kopfleiste">
          <div className="demo__shell">
            <nav className="shop__nav" aria-label="Hauptnavigation">
              <ShopNavLinks />
              <Link href="/demo/mode" className="shop__marke">{marke.name}</Link>
              <div className="shop__navrechts">
                <FavoritenKnopf />
                <KorbKnopf />
              </div>
            </nav>
          </div>
          <ShopKategorienNav />
        </header>

        {children}

        <footer className="shop__fuss">
          <div className="demo__shell">
            <div className="shop__fuss-grid">
              <div>
                <p className="shop__marke" style={{ textAlign: "left", color: "var(--weiss)" }}>{marke.name}</p>
                <p style={{ marginTop: "16px", maxWidth: "34ch" }}>
                  {marke.claim}. Kleine Serien aus wenigen Stoffen, entworfen in Hamburg,
                  gefertigt in Portugal und Italien. Wir legen nicht nach.
                </p>
                <form className="shop__brief-form" aria-label="Newsletter (Attrappe)">
                  <input type="email" placeholder="E-Mail für sechs Mails im Jahr" disabled aria-label="E-Mail-Adresse" />
                  <button type="button" className="shop__btn shop__btn--hell demo__fake" disabled>
                    Eintragen
                  </button>
                </form>
              </div>
              <div>
                <h4 className="shop__mini">Sortiment</h4>
                <ul>
                  <li><Link href="/demo/mode/damen">Damen</Link></li>
                  <li><Link href="/demo/mode/herren">Herren</Link></li>
                  {kategorien.slice(0, 3).map((k) => (
                    <li key={k.id}><Link href={`/demo/mode/kategorie/${k.id}`}>{k.name}</Link></li>
                  ))}
                  <li><Link href="/demo/mode/sale">Sale</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="shop__mini">Konto</h4>
                <ul>
                  <li><Link href="/demo/mode/favoriten">Favoriten</Link></li>
                  <li><Link href="/demo/mode/warenkorb">Warenkorb</Link></li>
                  <li>Bestellung verfolgen</li>
                  <li>Rücksendung anmelden</li>
                </ul>
              </div>
              <div>
                <h4 className="shop__mini">Service</h4>
                <ul>
                  <li>Größenberatung</li>
                  <li>Versand &amp; Lieferung</li>
                  <li>Reparatur</li>
                  <li>Impressum &amp; Datenschutz</li>
                </ul>
              </div>
            </div>
            <div className="shop__fuss-schluss">
              <span>Demo-Projekt. Erfundenes Label, erfundene Preise - hier lässt sich nichts bestellen.</span>
              <span>Gestaltet von Novahost</span>
            </div>
          </div>
        </footer>

        <KorbSchublade />
      </div>
    </ShopProvider>
  );
}
