import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Counter from "@/components/Counter";
import SectionMarker from "@/components/ui/SectionMarker";
import { metrics, sectionHeads } from "@/lib/content";

/**
 * Die Kennzahlen — als Ausgabe eines Messlaufs, nicht als Kachelreihe.
 *
 * Vorher standen hier vier gleich grosse Zahlen nebeneinander, wie in jedem
 * zweiten SaaS-Baukasten. Jetzt liest sich der Abschnitt wie das, was beim
 * Messen tatsaechlich herauskommt: eine Befehlszeile, darunter je eine Zeile
 * pro Wert mit gepunkteter Fuehrung.
 *
 * Der Abschnitt laeuft als dunkles Band ueber die volle Breite und bricht
 * damit die Gleichfoermigkeit der hellen Seite. Die Zahlen zaehlen weiter
 * hoch (components/Counter.tsx).
 */
export default function Performance() {
  return (
    <Section id="performance" className="band-dark">
      <Container>
        <div className="reveal">
          <SectionMarker index="03" label={sectionHeads.performance.eyebrow} />

          <h2 className="mt-3.5 max-w-[680px] text-[clamp(30px,4.4vw,52px)]">
            Woran ihr uns{" "}
            <span className="text-accent" data-caret>
              messen könnt.
            </span>
          </h2>

          <p className="mt-5 max-w-[620px] text-[16.5px] leading-[1.7] text-nh-body">
            {sectionHeads.performance.text}
          </p>
        </div>

        {/* Die Messung als Terminalausgabe. */}
        <div className="reveal panel mt-12 overflow-hidden rounded-panel">
          <div className="panel-head">
            <span className="h-2 w-2 rounded-[2px] bg-nh-blue/60" />
            <span>nova bench — kundenprojekte</span>
          </div>

          <div className="overflow-x-auto px-6 py-6 max-[560px]:px-4">
            <div className="min-w-[420px]">
              <div className="flex gap-2 font-mono text-[13px]">
                <span className="text-nh-cyan select-none">$</span>
                <span className="text-nh-ink">nova bench --alle --seit 12m</span>
              </div>

              <dl className="mt-5 flex flex-col gap-3.5">
                {metrics.map((metric) => (
                  <div key={metric.label} className="out-row text-[13.5px]">
                    <dt className="whitespace-nowrap text-nh-body">
                      {metric.label.toLowerCase()}
                    </dt>

                    <span aria-hidden="true" className="out-fill" />

                    <dd className="flex items-baseline gap-3 whitespace-nowrap">
                      <span className="hidden text-[12px] text-nh-mute-2 min-[760px]:inline">
                        {metric.hint}
                      </span>

                      <span className="w-[92px] text-right text-[15px] font-semibold text-nh-ink">
                        <Counter
                          value={metric.value}
                          decimals={metric.decimals}
                          prefix={metric.prefix}
                        />
                        <span className="text-accent">{metric.suffix}</span>
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 border-t border-nh-line pt-4 font-mono text-[12.5px] text-nh-mute">
                <span className="text-nh-ok">✓</span> 4 Messwerte · erhoben beim
                Launch und im laufenden Betrieb
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
