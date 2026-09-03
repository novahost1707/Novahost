import { trustPoints } from "@/lib/content";

/**
 * Statt erfundener Kundenlogos: die Punkte, für die wir tatsächlich
 * geradestehen. Laufband, weil es Fläche spart und Bewegung an einer Stelle
 * bündelt, an der nichts gelesen werden muss.
 */
export function TrustBar() {
  const items = [...trustPoints, ...trustPoints];

  return (
    <div className="trustbar" aria-label="Was Sie von uns erwarten können">
      <div className="marquee">
        <ul className="marquee__track" aria-hidden="false">
          {items.map((point, index) => (
            <li key={`${point}-${index}`} className="trustbar__item pixel" aria-hidden={index >= trustPoints.length}>
              <span className="trustbar__dot" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
