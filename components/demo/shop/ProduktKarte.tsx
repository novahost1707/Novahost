"use client";

import Link from "next/link";
import { ShopBild } from "@/components/demo/shop/ShopBild";
import { HerzKnopf } from "@/components/demo/shop/HerzKnopf";
import { rabattProzent, type Produkt } from "@/lib/demo-mode";

/**
 * Produktkarte im Raster.
 *
 * Aufgabe: den Klick auf die Produktseite auslösen. Alles darin dient dem -
 * das Herz ist die einzige Ausnahme und fängt seinen Klick selbst ab.
 * Die Größen erscheinen erst beim Überfahren; auf Touchgeräten bleiben sie
 * weg, weil es dort kein Überfahren gibt.
 */
export function ProduktKarte({ produkt, sizes }: { produkt: Produkt; sizes?: string }) {
  const rabatt = rabattProzent(produkt);

  return (
    <article className="shop__karte">
      <Link href={`/demo/mode/produkt/${produkt.slug}`} className="shop__karte-bild zoom">
        {rabatt ? (
          <span className="shop__marker shop__marker--sale">&minus;{rabatt} %</span>
        ) : produkt.marker ? (
          <span className="shop__marker">{produkt.marker}</span>
        ) : null}
        <ShopBild platz={produkt.bilder[0]!} sizes={sizes ?? "(max-width: 760px) 50vw, 25vw"} />
        <span className="shop__groessen-blitz" aria-hidden="true">
          {produkt.groessen.map((g) => (
            <span key={g} data-weg={produkt.ausverkauft?.includes(g) ? "true" : undefined}>
              {g}
            </span>
          ))}
        </span>
      </Link>

      <HerzKnopf slug={produkt.slug} name={produkt.name} />

      <div className="shop__karte-text">
        <div className="shop__karte-zeile">
          <h3>
            <Link href={`/demo/mode/produkt/${produkt.slug}`}>{produkt.name}</Link>
          </h3>
          <span className="shop__preis">
            {produkt.vorher && <span className="shop__vorher">{produkt.vorher},00 &euro;</span>}
            <span data-reduziert={produkt.vorher ? "true" : undefined}>{produkt.preis},00 &euro;</span>
          </span>
        </div>
        <p className="shop__karte-stoff">{produkt.stoff}</p>
        <span className="shop__farbpunkte" aria-label={`${produkt.farben.length} Farben`}>
          {produkt.farben.map((f) => (
            <i key={f.name} style={{ background: f.wert }} />
          ))}
        </span>
      </div>
    </article>
  );
}
