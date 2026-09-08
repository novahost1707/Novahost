"use client";

import { BildInhalt } from "@/components/demo/BildInhalt";
import { useShop } from "@/components/demo/shop/ShopProvider";
import type { Bildplatz } from "@/lib/demo-bilder";

/**
 * Bildplatz innerhalb der Shop-Bedienung.
 *
 * Im Browser lässt sich nicht im Dateisystem nachsehen. Deshalb löst der
 * Server beim Bauen alle Produktbilder einmal auf und reicht das Ergebnis
 * über den ShopProvider herein; hier wird nur noch nachgeschlagen.
 */
export function ShopBild(props: { platz: Bildplatz; className?: string; sizes?: string; priority?: boolean }) {
  const { fotos } = useShop();
  return <BildInhalt {...props} datei={fotos[props.platz.src] ?? null} />;
}
