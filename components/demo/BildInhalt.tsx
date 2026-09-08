import Image from "next/image";
import { Motiv } from "@/components/demo/Motiv";
import type { Bildplatz } from "@/lib/demo-bilder";

/**
 * Darstellung eines Bildplatzes.
 *
 * Bekommt die bereits aufgelöste Datei gereicht und sieht selbst nicht im
 * Dateisystem nach - dadurch lässt sie sich auf dem Server wie im Browser
 * verwenden. Liegt keine Datei vor, wird das hinterlegte Motiv gezeichnet;
 * beides füllt denselben Rahmen im selben Seitenverhältnis, das Layout
 * verschiebt sich also nicht, wenn später Fotos dazukommen.
 */
export function BildInhalt({
  platz,
  datei,
  className,
  sizes = "(max-width: 760px) 100vw, 50vw",
  priority = false,
}: {
  platz: Bildplatz;
  datei: string | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
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
      /* Das Seitenverhaeltnis kommt als Variable, nicht als eigene Angabe:
         eine Angabe im style-Attribut waere staerker als jede Regel im
         Stylesheet, und Seiten koennten den Platz auf schmalen Schirmen nicht
         hochkant stellen. */
      style={{ "--bild-ratio": platz.ratio, ...ton } as React.CSSProperties}
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
