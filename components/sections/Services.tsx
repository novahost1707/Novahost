import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import Icon from "@/components/ui/Icon";
import TiltCard from "@/components/TiltCard";
import { sectionHeads, services } from "@/lib/content";

/**
 * Die sechs Angebote als Glaskarten.
 *
 * Jede Karte traegt dieselben vier Ebenen: Nummer im Hintergrund, Icon,
 * Text und die technischen Mikrodetails. Dadurch bleibt das Raster ruhig,
 * obwohl die Inhalte unterschiedlich lang sind.
 */
export default function Services() {
  return (
    <Section id="services" className="panel-backdrop" grid>
      <Container>
        <SectionHead
          index="01"
          eyebrow={sectionHeads.services.eyebrow}
          title={sectionHeads.services.title}
          accent={sectionHeads.services.accent}
          text={sectionHeads.services.text}
        />

        <div className="stagger grid grid-cols-3 gap-5 max-[1000px]:grid-cols-2 max-[680px]:grid-cols-1">
          {services.map((service) => (
            <TiltCard key={service.num} className="p-7 max-[760px]:p-6">
              {/* Grosse Nummer im Hintergrund — traegt die Hierarchie. */}
              <span
                aria-hidden="true"
                className="card-index pointer-events-none absolute -top-4 right-4 select-none"
              >
                {service.num}
              </span>

              <div className="tilt-layer relative z-[2]">
                <span className="flex h-12 w-12 items-center justify-center rounded-card border border-nh-line bg-nh-surface/70 text-nh-blue transition-all duration-[var(--dur-hover)] group-hover:-translate-y-0.5 group-hover:border-transparent group-hover:bg-[linear-gradient(140deg,var(--color-nh-blue),var(--color-nh-cyan))] group-hover:text-white group-hover:shadow-[0_12px_26px_-12px_color-mix(in_oklab,var(--color-nh-blue)_85%,transparent)]">
                  <Icon name={service.icon} className="h-[23px] w-[23px]" />
                </span>

                <h3 className="mt-6 font-display text-[21px] leading-[1.2] font-extrabold text-nh-ink">
                  {service.title}
                </h3>

                <p className="mt-3 text-[14.5px] leading-[1.7] text-nh-body">
                  {service.text}
                </p>

                {/* Technische Mikrodetails */}
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {service.specs.map((spec) => (
                    <li
                      key={spec}
                      className="rounded-chip border border-nh-line bg-nh-surface/60 px-2 py-1 font-mono text-[10.5px] leading-none text-nh-mute"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-nh-line pt-4">
                  <span className="font-mono text-[11.5px] text-nh-blue">
                    {service.meta}
                  </span>

                  <Icon
                    name="arrow"
                    className="h-4 w-4 text-nh-mute-2 transition-all duration-[var(--dur-hover)] group-hover:translate-x-1 group-hover:text-nh-blue"
                  />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
