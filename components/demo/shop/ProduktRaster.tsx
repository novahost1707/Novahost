"use client";

import { ProduktKarte } from "@/components/demo/shop/ProduktKarte";
import type { Produkt } from "@/lib/demo-mode";

/** Produktraster - überall im Shop dasselbe, damit nichts auseinanderläuft. */
export function ProduktRaster({ produkte, sizes }: { produkte: Produkt[]; sizes?: string }) {
  return (
    <div className="shop__raster">
      {produkte.map((p) => (
        <ProduktKarte key={p.slug} produkt={p} sizes={sizes} />
      ))}
    </div>
  );
}
