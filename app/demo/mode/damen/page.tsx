import type { Metadata } from "next";
import Link from "next/link";
import { ProduktRaster } from "@/components/demo/shop/ProduktRaster";
import { kategorien, nachZielgruppe } from "@/lib/demo-mode";

export const metadata: Metadata = {
  title: "Damen",
  description: "Teile für Damen aus der aktuellen Serie von ARVO - Demo-Projekt von Novahost.",
};

/**
 * Übersicht für Damen. Unisex-Teile erscheinen hier ebenfalls - sie sind für
 * beide gemacht, und ein Sortiment, das sie ausblendet, wirkt kleiner als es
 * ist.
 */
export default function DamenSeite() {
  const produkte = nachZielgruppe("damen");

  return (
    <>
      <div className="demo__shell">
        <div className="shop__seitenkopf">
          <nav className="shop__krumen shop__mini" aria-label="Pfad">
            <Link href="/demo/mode">Shop</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Damen</span>
          </nav>
          <div className="shop__seitenkopf-zeile">
            <div>
              <h1 className="shop__display">Damen</h1>
              <p>
                Alle Teile für Damen aus Serie 04, dazu die Stücke, die für beide gemacht sind.
                Auflage zwischen 40 und 120 Stück.
              </p>
            </div>
            <span className="shop__anzahl">{produkte.length} Teile</span>
          </div>
          <div className="shop__filter">
            <Link href="/demo/mode/damen" aria-current="page">Alle</Link>
            {kategorien.map((k) => (
              <Link key={k.id} href={`/demo/mode/kategorie/${k.id}`}>{k.kurz}</Link>
            ))}
          </div>
        </div>
      </div>

      <section className="shop__section shop__section--schmal">
        <div className="demo__shell">
          <ProduktRaster produkte={produkte} />
        </div>
      </section>
    </>
  );
}
