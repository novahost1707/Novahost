import { BildInhalt } from "@/components/demo/BildInhalt";
import { findeBild } from "@/lib/demo-bilder.server";
import type { Bildplatz } from "@/lib/demo-bilder";

/**
 * Bildplatz für Serverkomponenten: sieht nach, ob ein Foto vorliegt, und
 * überlässt die Darstellung BildInhalt. Im Browser übernimmt das ShopBild.
 */
export function Bild(props: {
  platz: Bildplatz;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return <BildInhalt {...props} datei={findeBild(props.platz.src)} />;
}
