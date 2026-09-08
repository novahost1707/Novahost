import type { Metadata } from "next";
import Link from "next/link";
import { ProduktRaster } from "@/components/demo/shop/ProduktRaster";
import { imSale, rabattProzent } from "@/lib/demo-mode";

export const metadata: Metadata = {
  title: "Sale",
  description: "Reduzierte Teile aus abgelaufenen Serien von ARVO - Demo-Projekt von Novahost.",
};

/**
 * Sale.
 *
 * Bewusst kein Rabattgewitter: ein dunkler Kopfbereich, ein ehrlicher Grund
 * für die Reduzierung und die Prozentangabe am Bild. Wer eine Marke als
 * hochwertig verkaufen will, darf den Sale nicht wie einen Räumungsverkauf
 * aussehen lassen - das entwertet auch alles daneben.
 */
export default function SaleSeite() {
  const produkte = imSale();
  const hoechster = Math.max(...produkte.map((p) => rabattProzent(p) ?? 0));

  return (
    <>
      <div className="shop__salekopf">
        <div className="demo__shell">
          <nav className="shop__krumen shop__mini" aria-label="Pfad">
            <Link href="/demo/mode">Shop</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Sale</span>
          </nav>
          <p className="shop__saleschild">
            <i aria-hidden="true" />
            Bis zu {hoechster} % reduziert
          </p>
          <h1 className="shop__display">Letzte Teile aus Serie 03.</h1>
          <p>
            Wir reduzieren nicht saisonal, sondern nur, wenn eine Serie ausläuft. Was hier steht,
            gibt es in dieser Farbe nicht wieder - meist sind nur noch einzelne Größen da.
          </p>
        </div>
      </div>

      <section className="shop__section shop__section--schmal">
        <div className="demo__shell">
          <div className="shop__kopf">
            <div>
              <p className="shop__mini" style={{ color: "var(--grau)" }}>Reduziert</p>
              <h2 className="shop__display">{produkte.length} Teile</h2>
            </div>
            <p>Rückgabe gilt auch für reduzierte Ware: 30 Tage, ungetragen, mit Etikett.</p>
          </div>
          <ProduktRaster produkte={produkte} />
        </div>
      </section>
    </>
  );
}
