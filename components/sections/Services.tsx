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
            <TiltCard key={service.num} className="flex h-full flex-col">
              {/* Kartenreiter wie im Editor — Nummer, Dateiname, Zustand. */}
              <div className="panel-head justify-between">
                <span className="flex items-center gap-2.5">
                  <span className="font-semibold text-nh-blue">{service.num}</span>
                  {service.file}
                </span>

                <span
                  aria-hidden="true"
                  className="h-[7px] w-[7px] rounded-full bg-nh-line transition-colors duration-[var(--dur-hover)] group-hover:bg-nh-blue"
                />
              </div>

              <div className="tilt-layer relative z-[2] flex flex-1 flex-col p-7 max-[760px]:p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-card border border-nh-line bg-nh-surface text-nh-blue transition-all duration-[var(--dur-hover)] group-hover:-translate-y-0.5 group-hover:border-transparent group-hover:bg-nh-blue group-hover:text-white">
                  <Icon name={service.icon} className="h-[21px] w-[21px]" />
                </span>

                <h3 className="mt-5 font-display text-[20px] leading-[1.2] font-extrabold text-nh-ink">
                  {service.title}
                </h3>

                <p className="mt-3 text-[14.5px] leading-[1.7] text-nh-body">
                  {service.text}
                </p>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {service.specs.map((spec) => (
                    <li
                      key={spec}
                      className="rounded-chip border border-nh-line bg-nh-surface px-2 py-1 font-mono text-[10.5px] leading-none text-nh-mute"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between border-t border-nh-line pt-4">
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
