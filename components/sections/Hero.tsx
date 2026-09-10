import { PixelField } from "@/components/fx/PixelField";
import { Cta } from "@/components/ui/Cta";
import { Wordmark } from "@/components/ui/Wordmark";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Hero.
 *
 * Aufbau: das Zeichen klein und mittig, darunter die Aussage in ruhiger
 * Größe, darunter die beiden Wege weiter - und am unteren Rand der Name in
 * voller Breite, vom Bildrand angeschnitten.
 *
 * Der Gedanke dahinter: die Wucht kommt aus dem Namen, nicht aus der
 * Schlagzeile. Dadurch bleibt der Satz lesbar wie ein Satz, statt in vier
 * Zeilen Versalien zu zerfallen, und der Auftritt merkt sich über die
 * Wortmarke statt über die Typogröße.
 *
 * Das Pixel-Feld liegt hinter allem, nie darüber - Lesbarkeit schlägt Effekt.
 */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <PixelField />
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__inner shell">
        <div className="hero__top">
          <p className="chip pixel">
            <span className="chip__dot" aria-hidden="true" />
            {hero.status}
          </p>
          <p className="pixel hero__label">{hero.label}</p>
        </div>

        <div className="hero__mitte">
          {/* Zeichen und Name zusammen - dieselbe Wortmarke wie in der
              Kopfleiste, nur groesser. */}
          <Wordmark className="hero__marke" />

          {/* Die Zeilen stehen im Inhalt getrennt und behalten ihre Farben.
              Sie fliessen hier aber als ein Satz, statt untereinander zu
              stehen - lange Zeilen statt eines schmalen Klumpens. */}
          <h1 className="hero__aussage" id="hero-title">
            {hero.headline.map((teil) => (
              <span className="hero__wort" key={teil}>
                {teil}
              </span>
            ))}
          </h1>

          <p className="hero__sub">{hero.sub}</p>

          <div className="btn-row hero__aktionen">
            <Cta href={hero.ctaPrimary.href} variant="primary" size="lg" magnetic cursor="LOS">
              {hero.ctaPrimary.label}
            </Cta>
            <Cta href={hero.ctaSecondary.href} variant="ghost" size="lg" cursor="CHECK">
              {hero.ctaSecondary.label}
            </Cta>
          </div>

          {/* Eckdaten als schmale Zeile direkt unter den Knöpfen: sie helfen
              bei der Entscheidung und lassen dem Namen darunter trotzdem die
              ganze Fläche. */}
          <dl className="hero__eckdaten">
            {hero.meta.map((item) => (
              <div key={item.k}>
                <dt className="pixel">{item.k}</dt>
                <dd>{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Der Name in voller Breite, unten angeschnitten. Für Vorlese-
          programme ist er nichts Neues - er steht schon in der Kopfleiste. */}
      <p className="hero__wortmarke" aria-hidden="true">{site.name}</p>
    </section>
  );
}
