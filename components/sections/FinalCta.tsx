import { Reveal } from "@/components/fx/Reveal";
import { Cta } from "@/components/ui/Cta";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { finalCta } from "@/lib/content";

/** Letzte große Fläche vor dem Footer: eine Botschaft, ein klarer Schritt. */
export function FinalCta() {
  return (
    <section className="section final" aria-labelledby="final-title">
      <div className="shell">
        <Reveal>
          <SectionLabel>{finalCta.label}</SectionLabel>
        </Reveal>

        <Reveal>
          <h2 className="final__title display" id="final-title">
            {finalCta.headline.map((line, index) => (
              <span className="final__line" key={line} data-dim={index === 0}>
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <div className="final__foot">
          <Reveal delay={80}>
            <p className="lead">{finalCta.sub}</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="btn-row final__actions">
              <Cta href="#kontakt" variant="primary" size="lg" magnetic cursor="LOS">
                {finalCta.primary}
              </Cta>
              <Cta href="#analyse" variant="ghost" size="lg" cursor="CHECK">
                {finalCta.secondary}
              </Cta>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
