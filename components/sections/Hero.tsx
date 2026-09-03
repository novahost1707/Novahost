import { PixelField } from "@/components/fx/PixelField";
import { Cta } from "@/components/ui/Cta";
import { hero } from "@/lib/content";

/**
 * Hero: In fünf Sekunden muss klar sein, was wir machen, für wen, mit
 * welchem Nutzen und was der nächste Schritt ist. Das Pixel-Feld liegt
 * hinter der Typo, nie darüber - Lesbarkeit schlägt Effekt.
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

        <h1 className="hero__title display" id="hero-title">
          {hero.headline.map((line, index) => (
            <span className="hero__line" key={line}>
              <span className="hero__line-inner" style={{ animationDelay: `${index * 90}ms` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero__bottom">
          <p className="hero__sub lead">{hero.sub}</p>

          <div className="hero__actions">
            <div className="btn-row">
              <Cta href={hero.ctaPrimary.href} variant="primary" size="lg" magnetic cursor="LOS">
                {hero.ctaPrimary.label}
              </Cta>
              <Cta href={hero.ctaSecondary.href} variant="ghost" size="lg" cursor="CHECK">
                {hero.ctaSecondary.label}
              </Cta>
            </div>

            <dl className="hero__meta">
              {hero.meta.map((item) => (
                <div className="hero__meta-item" key={item.k}>
                  <dt className="pixel">{item.k}</dt>
                  <dd>{item.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <a href="#problem" className="hero__scroll pixel" aria-label="Weiter zum nächsten Abschnitt">
        SCROLL <span aria-hidden="true">&#8595;</span>
      </a>
    </section>
  );
}
