import Image from "next/image";
import { Motiv } from "@/components/demo/Motiv";
import { findeBild, type Bildplatz } from "@/lib/demo-bilder";

/**
 * Ein Bildplatz auf einer Demo-Seite.
 *
 * Liegt unter public/ ein Foto zum hinterlegten Namen, wird es ausgeliefert -
 * über next/image, also in passender Größe und im modernen Format. Fehlt es,
 * zeichnet die Seite das zugehörige Motiv. Beides füllt denselben Rahmen im
 * selben Seitenverhältnis, das Layout verschiebt sich also nicht, wenn später
 * Fotos dazukommen.
 */
export function Bild({
  platz,
  className,
  sizes = "(max-width: 760px) 100vw, 50vw",
  priority = false,
}: {
  platz: Bildplatz;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const datei = findeBild(platz.src);

  /* Kennt der Browser color-mix nicht, sind die Deklarationen ungültig und es
     gilt weiter die Farbwelt der Seite - der Platz bleibt in jedem Fall
     gefüllt. */
  const ton = platz.ton
    ? {
        "--m-1": `color-mix(in oklab, ${platz.ton} 11%, #ffffff)`,
        "--m-2": `color-mix(in oklab, ${platz.ton} 52%, #ffffff)`,
        "--m-3": `color-mix(in oklab, ${platz.ton} 76%, #ffffff)`,
        "--m-4": platz.ton,
      }
    : null;

  return (
    <span
      className={["bildplatz", className].filter(Boolean).join(" ")}
      style={{ aspectRatio: platz.ratio, ...ton } as React.CSSProperties}
      data-foto={datei ? "ja" : "nein"}
    >
      {datei ? (
        <Image src={datei} alt={platz.alt} fill sizes={sizes} priority={priority} className="bildplatz__foto" />
      ) : (
        <Motiv art={platz.motiv} variante={platz.variante ?? 0} />
      )}
    </span>
  );
}
