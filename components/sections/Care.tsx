import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import SectionMarker from "@/components/ui/SectionMarker";
import { careItems, sectionHeads } from "@/lib/content";

/**
 * Was im Abo steckt — als Ausgabe eines Testlaufs.
 *
 * Vorher ein Raster aus sechs gleichen Karten, wie in den beiden Abschnitten
 * davor. Jetzt eine durchlaufende Liste mit Haken, gepunkteter Fuehrung und
 * Statuswert rechts — die Form, in der ein Testlauf sein Ergebnis ausgibt.
 *
 * Das passt inhaltlich: Es sind Zusagen, die entweder erfuellt sind oder
 * nicht. Und es unterscheidet den Abschnitt deutlich von den Kartenrastern.
 */
export default function Care() {
  return (
    <Section id="care" className="panel-backdrop" grid>
      <Container>
        <div className="reveal max-w-[680px]">
          <SectionMarker index="06" label={sectionHeads.care.eyebrow} />

          <h2 className="mt-3.5 text-[clamp(30px,4.4vw,52px)]">
            Was wir übernehmen,{" "}
            <span className="text-accent">damit ihr es nicht müsst.</span>
          </h2>

          <p className="mt-5 text-[16.5px] leading-[1.7] text-nh-body">
            {sectionHeads.care.text}
          </p>
        </div>

        <div className="reveal panel mt-12 overflow-hidden rounded-panel">
          <div className="panel-head justify-between">
            <span className="flex items-center gap-2.5">
              <span className="rounded-[3px] bg-nh-ok px-1.5 py-0.5 text-[10px] font-bold text-white">
                PASS
              </span>
              betreuung.spec.ts
            </span>

            <span className="text-nh-mute-2">
              {careItems.length} / {careItems.length}
            </span>
          </div>

          <ul className="divide-y divide-nh-line">
            {careItems.map((item) => (
              <li
                key={item.title}
                className="group flex items-start gap-4 px-6 py-5 transition-colors duration-[var(--dur-hover)] hover:bg-nh-panel max-[560px]:px-4"
              >
                <span className="mt-0.5 flex-none font-mono text-[13px] text-nh-ok select-none">
                  ✓
                </span>

                <span className="mt-px flex-none text-nh-blue">
                  <Icon name={item.icon} className="h-[18px] w-[18px]" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="out-row">
                    <h3 className="font-display text-[16px] leading-tight font-extrabold text-nh-ink">
                      {item.title}
                    </h3>

                    <span aria-hidden="true" className="out-fill" />

                    <span className="hidden text-[12px] whitespace-nowrap text-nh-mute min-[640px]:inline">
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-2 max-w-[68ch] text-[14px] leading-[1.65] text-nh-body">
                    {item.text}
                  </p>

                  {/* Auf schmalen Geraeten steht der Status unter dem Text. */}
                  <div className="mt-2 font-mono text-[11.5px] text-nh-mute min-[640px]:hidden">
                    {item.status}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-nh-line px-6 py-4 font-mono text-[12px] text-nh-mute max-[560px]:px-4">
            <span className="text-nh-ok">✓</span> alle Zusagen gelten ab dem
            kleinsten Tarif — nichts davon ist Aufpreis
          </div>
        </div>
      </Container>
    </Section>
  );
}
