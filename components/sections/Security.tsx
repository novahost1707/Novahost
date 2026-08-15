import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import Icon from "@/components/ui/Icon";
import StatusDot from "@/components/ui/StatusDot";
import { securityItems } from "@/lib/content";

/**
 * Sicherheit und Betrieb.
 *
 * Flachere Karten als bei den Services — hier geht es um Vollstaendigkeit,
 * nicht um Auswahl. Jede Karte traegt eine Statuszeile in Monospace, die den
 * jeweiligen Mechanismus konkret macht.
 */
export default function Security() {
  return (
    <Section id="security" className="panel-backdrop" grid>
      <Container>
        <SectionHead
          centered
          eyebrow="Trust & Security"
          title="Abgesichert, bevor ihr fragt."
          accent="bevor ihr fragt"
          text="Sicherheitsmechanismen sind bei Nova Host keine Zusatzoption, sondern Teil jedes Tarifs — vom Starter bis Enterprise."
        />

        <div className="stagger grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {securityItems.map((item) => (
            <div
              key={item.title}
              className="glass glass-edge glow-hover group relative overflow-hidden rounded-[20px] p-6 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[13px] border border-nh-line bg-white/70 text-nh-blue transition-all duration-[var(--dur-hover)] group-hover:border-transparent group-hover:bg-[linear-gradient(140deg,#1a5cff,#00c2e0)] group-hover:text-white">
                  <Icon name={item.icon} className="h-[21px] w-[21px]" />
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-[17px] leading-tight font-extrabold text-nh-ink">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[14px] leading-[1.65] text-nh-body">
                    {item.text}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-nh-line pt-3.5">
                <StatusDot />
                <span className="font-mono text-[11px] text-nh-mute">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
