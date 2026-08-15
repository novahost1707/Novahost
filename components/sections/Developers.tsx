import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Terminal from "@/components/Terminal";
import { deployTerminal, developerFeatures } from "@/lib/content";

/**
 * Die Section fuer Entwickler.
 *
 * Sie bricht bewusst mit dem hellen Rest: das Terminal ist die einzige dunkle
 * Flaeche der Seite. Genau dieser Kontrast macht den Punkt — hier arbeitet
 * jemand auf der Kommandozeile.
 */
export default function Developers() {
  return (
    <Section id="developers" className="accent-backdrop">
      <Container>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-14 max-[1000px]:grid-cols-1 max-[1000px]:gap-10">
          {/* Textspalte */}
          <div className="reveal">
            <Eyebrow>Developer Experience</Eyebrow>

            <h2 className="mt-[18px] text-[clamp(30px,4.4vw,52px)]">
              Built for <span className="text-gradient">developers.</span>
            </h2>

            <p className="mt-5 max-w-[520px] text-[16.5px] leading-[1.7] text-nh-body">
              Kein Klickpfad durch sieben Menüs. Nova Host wird über CLI, API
              und Terraform bedient — und deployt, sobald der Push durch ist.
            </p>

            <div className="mt-9 flex flex-col gap-4">
              {developerFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="glow-hover group rounded-[16px] border border-nh-line bg-white/55 p-5 hover:-translate-y-0.5 hover:border-[rgba(26,92,255,0.28)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-[16px] font-extrabold text-nh-ink">
                      {feature.title}
                    </h3>

                    <code className="rounded-md bg-nh-panel px-2.5 py-1.5 font-mono text-[11px] whitespace-nowrap text-nh-blue transition-colors duration-[var(--dur-hover)] group-hover:bg-[rgba(26,92,255,0.1)]">
                      {feature.code}
                    </code>
                  </div>

                  <p className="mt-2.5 text-[14px] leading-[1.65] text-nh-body">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 font-mono text-[12.5px] tracking-[0.06em] text-nh-blue"
            >
              Dokumentation anfordern
              <Icon
                name="arrow"
                className="h-4 w-4 transition-transform duration-[var(--dur-hover)] group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Terminal */}
          <div className="reveal relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgba(26,92,255,0.2),transparent_64%)] blur-[10px]"
            />

            <div className="float relative" style={{ animationDuration: "13s" }}>
              <Terminal lines={deployTerminal} title="nova-cli — production" />
            </div>

            {/* Kleine schwebende Statuskarte, halb ueber dem Terminal. */}
            <div
              className="glass glass-edge float absolute -right-4 -bottom-6 rounded-[14px] px-4 py-3 max-[560px]:right-0 max-[560px]:-bottom-4"
              style={{ animationDelay: "-3s", animationDuration: "10s" }}
            >
              <div className="font-mono text-[10.5px] tracking-[0.14em] text-nh-mute uppercase">
                build time
              </div>
              <div className="mt-1 font-display text-[20px] leading-none font-extrabold text-nh-ink">
                12.4<span className="text-[13px] text-nh-blue">s</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
