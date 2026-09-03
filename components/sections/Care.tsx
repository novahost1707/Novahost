import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import Icon from "@/components/ui/Icon";
import StatusDot from "@/components/ui/StatusDot";
import { careItems, sectionHeads } from "@/lib/content";

/**
 * Was im monatlichen Abo steckt.
 *
 * Flachere Karten als bei den Leistungen — hier geht es um Vollstaendigkeit,
 * nicht um Auswahl. Jede Karte traegt eine Statuszeile in Monospace, die den
 * jeweiligen Punkt konkret macht: "monatlich", "30 tage", "5 min". Ohne diese
 * Zahlen waere der Abschnitt eine Liste unverbindlicher Versprechen.
 */
export default function Care() {
  return (
    <Section id="care" className="panel-backdrop" grid>
      <Container>
        <SectionHead
          index="06"
          centered
          eyebrow={sectionHeads.care.eyebrow}
          title={sectionHeads.care.title}
          accent={sectionHeads.care.accent}
          text={sectionHeads.care.text}
        />

        <div className="stagger grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {careItems.map((item) => (
            <div
              key={item.title}
              className="panel glow-hover group relative overflow-hidden rounded-panel p-6 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-card border border-nh-line bg-nh-surface/70 text-nh-blue transition-all duration-[var(--dur-hover)] group-hover:border-transparent group-hover:bg-[linear-gradient(140deg,var(--color-nh-blue),var(--color-nh-cyan))] group-hover:text-white">
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
