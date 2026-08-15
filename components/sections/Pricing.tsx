import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import Icon from "@/components/ui/Icon";
import TiltCard from "@/components/TiltCard";
import { pricingPlans } from "@/lib/content";
import { cn, formatPrice } from "@/lib/utils";

/**
 * Vier Tarife, einer davon hervorgehoben.
 *
 * Die Hervorhebung passiert ueber drei zurueckhaltende Mittel gleichzeitig:
 * ein Band ueber der Karte, ein dauerhafter Schein und ein gefuellter Button.
 * Eine groessere Karte waere das vierte — das wuerde das Raster brechen.
 */
export default function Pricing() {
  return (
    <Section id="pricing" className="panel-backdrop" grid>
      <Container>
        <SectionHead
          centered
          eyebrow="Pricing"
          title="Klare Preise, keine Überraschungen."
          accent="keine Überraschungen"
          text="Alle Tarife monatlich kündbar, ohne Einrichtungsgebühr. Was im Tarif steht, gilt auch unter Last."
        />

        <div className="stagger grid grid-cols-4 items-stretch gap-5 max-[1080px]:grid-cols-2 max-[620px]:grid-cols-1">
          {pricingPlans.map((plan) => (
            <div key={plan.slug} className="h-full">
              <TiltCard
                className={cn(
                  "flex h-full flex-col p-7 max-[760px]:p-6",
                  plan.featured && "plan-featured",
                )}
              >
                {plan.featured ? (
                  <>
                    {/* Farbband am oberen Kartenrand. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#0b3bbf,#1a5cff,#00c2e0)]"
                    />
                    <span className="absolute top-5 right-5 rounded-full bg-[linear-gradient(140deg,#1a5cff,#00c2e0)] px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-white uppercase">
                      popular
                    </span>
                  </>
                ) : null}

                <div className="tilt-layer relative z-[2] flex h-full flex-col">
                  <h3 className="font-display text-[19px] font-extrabold text-nh-ink">
                    {plan.name}
                  </h3>

                  <p className="mt-2 min-h-[42px] text-[13.5px] leading-[1.6] text-nh-mute">
                    {plan.tagline}
                  </p>

                  {/* Preis */}
                  <div className="mt-6 flex items-end gap-1.5">
                    {plan.price === null ? (
                      <span className="font-display text-[32px] leading-none font-extrabold text-nh-ink">
                        Auf Anfrage
                      </span>
                    ) : (
                      <>
                        <span className="font-display text-[42px] leading-none font-extrabold tracking-[-0.03em] text-nh-ink">
                          {formatPrice(plan.price)}
                        </span>
                        <span className="font-display text-[20px] leading-none font-bold text-nh-blue">
                          €
                        </span>
                        <span className="pb-0.5 font-mono text-[11.5px] text-nh-mute">
                          / Monat
                        </span>
                      </>
                    )}
                  </div>

                  <div className="mt-4 rounded-[10px] border border-nh-line bg-white/60 px-3 py-2 font-mono text-[11px] leading-[1.5] text-nh-mute">
                    {plan.spec}
                  </div>

                  <ul className="mt-6 flex flex-col gap-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-nh-body"
                      >
                        <Icon
                          name="check"
                          strokeWidth={2.4}
                          className="mt-[3px] h-3.5 w-3.5 flex-none text-nh-blue"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Der Button sitzt immer am Kartenfuss, egal wie lang die
                      Liste darueber ist. */}
                  <Link
                    href="#contact"
                    className={cn(
                      "btn mt-7 w-full",
                      !plan.featured && "btn-ghost",
                    )}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        <p className="reveal mt-8 text-center font-mono text-[11.5px] text-nh-mute">
          Alle Preise zzgl. USt. · Migration bestehender Systeme ohne Aufpreis
        </p>
      </Container>
    </Section>
  );
}
