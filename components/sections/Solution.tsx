import { Reveal } from "@/components/fx/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { solution } from "@/lib/content";

/** Antwort auf die Problem-Section: vom Einzelprojekt zur Vertriebsfläche. */
export function Solution() {
  return (
    <section className="section section--sunken solution" aria-labelledby="solution-title">
      <div className="shell">
        <Reveal>
          <SectionLabel>{solution.label}</SectionLabel>
        </Reveal>

        <div className="solution__head">
          <Reveal>
            <h2 className="display solution__title" id="solution-title">
              <span className="solution__line-dim">{solution.headline[0]}</span>
              <br />
              {solution.headline[1]}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lead solution__body">{solution.body}</p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <ol className="chain" aria-label="Ablauf">
            {solution.chain.map((step, index) => (
              <li className="chain__step" key={step} style={{ "--i": index } as React.CSSProperties}>
                <span className="chain__dot" aria-hidden="true" />
                <span className="chain__label pixel">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={160}>
          <p className="mono solution__note">{solution.chainNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
