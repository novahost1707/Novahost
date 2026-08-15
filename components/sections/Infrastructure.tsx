import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import StatusDot from "@/components/ui/StatusDot";
import NetworkMap from "@/components/NetworkMap";
import CodeSnippet from "@/components/CodeSnippet";
import { infrastructureFacts, infrastructureSnippet, regions } from "@/lib/content";

/**
 * Die Infrastruktur — Netzwerkkarte, Standortliste und harte Eckdaten.
 *
 * Die Karte ist rein visuell; dieselben Standorte stehen daneben als Liste
 * mit Latenzangabe, damit die Information auch ohne Grafik vollstaendig ist.
 */
export default function Infrastructure() {
  return (
    <Section id="infrastructure" className="accent-backdrop">
      <Container>
        <SectionHead
          eyebrow="Global Infrastructure"
          title="Neun Regionen, ein Netz."
          accent="ein Netz."
          text="Eigene Hardware in europäischen Rechenzentren, direkt an DE-CIX und AMS-IX angebunden, ergänzt um Edge-Standorte in Nordamerika und Asien."
        />

        <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-start gap-12 max-[1000px]:grid-cols-1 max-[1000px]:gap-10">
          {/* Karte */}
          <div className="reveal glass glass-edge relative overflow-hidden rounded-[24px] p-6 max-[560px]:p-4">
            <div aria-hidden="true" className="tech-dots" />

            <div className="relative z-[1] mb-4 flex items-center justify-between gap-4">
              <span className="font-mono text-[11px] tracking-[0.14em] text-nh-mute uppercase">
                network topology
              </span>

              <span className="flex items-center gap-2 font-mono text-[11px] text-nh-ok">
                <StatusDot />
                9 / 9 online
              </span>
            </div>

            <div className="relative z-[1]">
              <NetworkMap />
            </div>
          </div>

          {/* Standorte und Eckdaten */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-display text-[15px] tracking-[0.02em] text-nh-ink">
                Standorte
              </h3>

              <ul className="stagger mt-4 flex flex-col divide-y divide-nh-line border-y border-nh-line">
                {regions.map((region) => (
                  <li
                    key={region.code}
                    className="flex items-center gap-3 py-3 transition-colors duration-[var(--dur-hover)] hover:bg-white/60"
                  >
                    <StatusDot tone={region.primary ? "blue" : "cyan"} />

                    <span className="font-mono text-[11px] tracking-[0.08em] text-nh-mute-2 uppercase">
                      {region.code}
                    </span>

                    <span className="min-w-0 flex-1 truncate text-[14.5px] font-medium text-nh-ink">
                      {region.city}
                    </span>

                    <span className="hidden text-[13px] text-nh-mute min-[420px]:inline">
                      {region.country}
                    </span>

                    <span className="w-14 text-right font-mono text-[12px] text-nh-blue">
                      {region.latency}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal grid grid-cols-2 gap-3 max-[420px]:grid-cols-1">
              {infrastructureFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="glow-hover rounded-[16px] border border-nh-line bg-white/60 px-4 py-3.5"
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
              title="infrastructure.ts"
              code={infrastructureSnippet}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
