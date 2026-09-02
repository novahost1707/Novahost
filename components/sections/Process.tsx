import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import CodeSnippet from "@/components/CodeSnippet";
import { processFacts, processSnippet, processSteps, sectionHeads } from "@/lib/content";

/**
 * Der Projektablauf vom Erstgespraech bis zur laufenden Betreuung.
 *
 * Als senkrechte Zeitleiste: die Schritte haben sehr unterschiedlich lange
 * Texte, nebeneinander wuerde das Raster dadurch unruhig. Die Linie zwischen
 * den Knoten waechst beim Einblenden von oben nach unten mit — sie zeigt, dass
 * die Schritte aufeinander folgen.
 *
 * Der letzte Schritt ist bewusst die Betreuung: sie ist kein Nachklapp,
 * sondern Teil des Pakets.
 */
export default function Process() {
  return (
    <Section id="process" className="accent-backdrop">
      <Container>
        <SectionHead
          eyebrow={sectionHeads.process.eyebrow}
          title={sectionHeads.process.title}
          accent={sectionHeads.process.accent}
          text={sectionHeads.process.text}
        />

        <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-start gap-14 max-[1000px]:grid-cols-1 max-[1000px]:gap-10">
          {/* Zeitleiste */}
          <ol className="stagger relative flex flex-col">
            {/* Die durchgehende Linie liegt hinter den Knoten. */}
            <span
              aria-hidden="true"
              className="process-line absolute top-2 bottom-8 left-[19px] w-[2px] max-[560px]:left-[15px]"
            />

            {processSteps.map((step) => (
              <li key={step.num} className="relative flex gap-5 pb-9 last:pb-0">
                {/* Knoten */}
                <span className="relative z-[1] flex h-10 w-10 flex-none items-center justify-center rounded-full border border-nh-line bg-nh-surface font-mono text-[12px] font-semibold text-nh-blue shadow-[0_6px_18px_-10px_rgba(11,39,96,0.5)] max-[560px]:h-8 max-[560px]:w-8 max-[560px]:text-[11px]">
                  {step.num}
                </span>

                <div className="min-w-0 pt-1.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-display text-[19px] leading-tight font-extrabold text-nh-ink">
                      {step.title}
                    </h3>

                    <span className="rounded-chip border border-nh-line bg-nh-surface/70 px-2 py-1 font-mono text-[10.5px] leading-none text-nh-mute">
                      {step.duration}
                    </span>
                  </div>

                  <p className="mt-2.5 max-w-[52ch] text-[14.5px] leading-[1.7] text-nh-body">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Eckdaten und Snippet */}
          <div className="flex flex-col gap-6">
            <div className="reveal grid grid-cols-2 gap-3 max-[420px]:grid-cols-1">
              {processFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="glow-hover rounded-card border border-nh-line bg-nh-surface/60 px-4 py-3.5"
                >
                  <div className="font-mono text-[10.5px] tracking-[0.14em] text-nh-mute uppercase">
                    {fact.label}
                  </div>
                  <div className="mt-1.5 font-display text-[16px] leading-tight font-bold text-nh-ink">
                    {fact.value}
                  </div>
                  <div className="mt-1 text-[12.5px] text-nh-mute">{fact.hint}</div>
                </div>
              ))}
            </div>

            <CodeSnippet
              className="reveal"
              title="projekt.ts"
              code={processSnippet}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
