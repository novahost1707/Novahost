import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Terminal from "@/components/Terminal";
import { buildTerminal, craftFeatures } from "@/lib/content";

/**
 * Wie die Websites entstehen.
 *
 * Der Abschnitt bricht bewusst mit dem hellen Rest: das Terminal ist die
 * einzige dunkle Flaeche der Seite. Genau dieser Kontrast macht den Punkt —
 * hier wird nicht in einem Baukasten geklickt, hier wird gebaut.
 */
export default function Craft() {
  return (
    <Section id="craft" className="accent-backdrop">
      <Container>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-14 max-[1000px]:grid-cols-1 max-[1000px]:gap-10">
          {/* Textspalte */}
          <div className="reveal">
            <Eyebrow>Handarbeit</Eyebrow>

            <h2 className="mt-[18px] text-[clamp(30px,4.4vw,52px)]">
              Gebaut, nicht{" "}
              <span className="text-gradient">zusammengeklickt.</span>
            </h2>

            <p className="mt-5 max-w-[520px] text-[16.5px] leading-[1.7] text-nh-body">
              Wir schreiben den Code eurer Website selbst. Das dauert länger als
              ein Baukasten — dafür lädt die Seite schneller, lässt sich
              erweitern und gehört am Ende wirklich euch.
            </p>

            <div className="mt-9 flex flex-col gap-4">
              {craftFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="glow-hover group rounded-[16px] border border-nh-line bg-nh-surface/55 p-5 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-nh-blue)_28%,transparent)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-[16px] font-extrabold text-nh-ink">
                      {feature.title}
                    </h3>

                    <code className="rounded-md bg-nh-panel px-2.5 py-1.5 font-mono text-[11px] whitespace-nowrap text-nh-blue transition-colors duration-[var(--dur-hover)] group-hover:bg-[color-mix(in_oklab,var(--color-nh-blue)_12%,transparent)]">
                      {feature.code}
                    </code>
                  </div>

                  <p className="mt-2.5 text-[14px] leading-[1.65] text-nh-body">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 font-mono text-[12.5px] tracking-[0.06em] text-nh-blue"
            >
              Beispiele ansehen
              <Icon
                name="arrow"
                className="h-4 w-4 transition-transform duration-[var(--dur-hover)] group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Terminal */}
          <div className="reveal relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-nh-blue)_20%,transparent),transparent_64%)] blur-[10px]"
            />

            <div className="float relative" style={{ animationDuration: "13s" }}>
              <Terminal lines={buildTerminal} title="nova-cli — kundenprojekt" />
            </div>

            {/* Kleine schwebende Kennzahl, halb ueber dem Terminal. */}
            <div
              className="glass glass-edge float absolute -right-4 -bottom-6 rounded-[14px] px-4 py-3 max-[560px]:right-0 max-[560px]:-bottom-4"
              style={{ animationDelay: "-3s", animationDuration: "10s" }}
            >
              <div className="font-mono text-[10.5px] tracking-[0.14em] text-nh-mute uppercase">
                lighthouse
              </div>
              <div className="mt-1 font-display text-[20px] leading-none font-extrabold text-nh-ink">
                98<span className="text-[13px] text-nh-blue">/100</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
