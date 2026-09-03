import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import Icon from "@/components/ui/Icon";
import TiltCard from "@/components/TiltCard";
import { carePlans, pricing, websitePackages } from "@/lib/content";
import { cn, formatPrice } from "@/lib/utils";

/**
 * Die Preise — in zwei Schritten statt in einer Tabelle.
 *
 * Das Angebot besteht aus zwei Teilen, die zusammengehoeren: einmalig das
 * Website-Paket, danach verpflichtend die monatliche Betreuung. Genau so ist
 * der Abschnitt aufgebaut, mit einer sichtbaren Klammer dazwischen — eine
 * gemeinsame Preistabelle wuerde verschleiern, dass beides zusammen anfaellt.
 *
 * Die Aenderungskontingente stehen bewusst gross auf den Abo-Karten und nicht
 * im Kleingedruckten: sie sind der eigentliche Unterschied zwischen den
 * Tarifen — und der Grund, warum spaeter niemand von einer Rechnung
 * ueberrascht wird.
 */
export default function Pricing() {
  return (
    <Section id="pricing" className="panel-backdrop" grid>
      <Container>
        <SectionHead
          index="04"
          centered
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          accent={pricing.accent}
          text={pricing.text}
        />

        {/* ------------------------ Schritt 1: Website -------------------- */}
        <StepHeading
          label={pricing.stepOne.label}
          title={pricing.stepOne.title}
          note={pricing.stepOne.note}
          text={pricing.stepOne.text}
          first
        />

        <div className="stagger grid grid-cols-3 items-stretch gap-5 max-[900px]:grid-cols-1">
          {websitePackages.map((pack) => (
            <div key={pack.slug} className="h-full">
              <TiltCard
                className={cn(
                  "flex h-full flex-col p-7 max-[760px]:p-6",
                  pack.featured && "plan-featured",
                )}
              >
                {pack.featured ? <FeaturedMarks /> : null}

                <div className="tilt-layer relative z-[2] flex h-full flex-col">
                  <h4 className="font-display text-[20px] font-extrabold text-nh-ink">
                    {pack.name}
                  </h4>

                  <p className="mt-2 min-h-[42px] text-[13.5px] leading-[1.6] text-nh-mute">
                    {pack.tagline}
                  </p>

                  <div className="mt-6 flex items-end gap-1.5">
                    {pack.price === null ? (
                      <span className="font-display text-[30px] leading-none font-extrabold text-nh-ink">
                        Auf Anfrage
                      </span>
                    ) : (
                      <>
                        <span className="font-display text-[40px] leading-none font-extrabold tracking-[-0.03em] text-nh-ink">
                          {formatPrice(pack.price)}
                        </span>
                        <span className="font-display text-[20px] leading-none font-bold text-nh-blue">
                          €
                        </span>
                      </>
                    )}
                  </div>

                  <div className="mt-2 font-mono text-[11.5px] text-nh-mute">
                    {pack.note}
                  </div>

                  <ul className="mt-6 flex flex-col gap-2.5">
                    {pack.features.map((feature) => (
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

                  <div aria-hidden="true" className="h-7 flex-none" />

                  {/* mt-auto haelt die Schaltflaeche am Kartenfuss — die
                      Listen darueber sind unterschiedlich lang. */}
                  <Link
                    href="#contact"
                    className={cn(
                      "btn mt-auto w-full",
                      !pack.featured && "btn-ghost",
                    )}
                  >
                    {pack.cta}
                  </Link>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* Die Klammer zwischen beiden Schritten. */}
        <div className="reveal mt-12 flex items-center gap-4 max-[560px]:flex-col">
          <span aria-hidden="true" className="h-px flex-1 bg-nh-line max-[560px]:w-full" />

          <span className="flex items-center gap-2.5 rounded-chip border border-nh-line bg-nh-surface/70 px-4 py-2 font-mono text-[11.5px] whitespace-nowrap text-nh-mute">
            <Icon name="arrow" className="h-3.5 w-3.5 rotate-90 text-nh-blue" />
            danach verpflichtend
          </span>

          <span aria-hidden="true" className="h-px flex-1 bg-nh-line max-[560px]:w-full" />
        </div>

        {/* ----------------------- Schritt 2: Betreuung ------------------- */}
        <StepHeading
          label={pricing.stepTwo.label}
          title={pricing.stepTwo.title}
          note={pricing.stepTwo.note}
          text={pricing.stepTwo.text}
        />

        <div className="stagger grid grid-cols-4 items-stretch gap-5 max-[1080px]:grid-cols-2 max-[620px]:grid-cols-1">
          {carePlans.map((plan) => (
            <div key={plan.slug} className="h-full">
              <TiltCard
                className={cn(
                  "flex h-full flex-col p-7 max-[760px]:p-6",
                  plan.featured && "plan-featured",
                )}
              >
                {plan.featured ? <FeaturedMarks /> : null}

                <div className="tilt-layer relative z-[2] flex h-full flex-col">
                  <h4 className="font-display text-[19px] font-extrabold text-nh-ink">
                    {plan.name}
                  </h4>

                  <p className="mt-2 min-h-[42px] text-[13.5px] leading-[1.6] text-nh-mute">
                    {plan.tagline}
                  </p>

                  <div className="mt-6 flex items-end gap-1.5">
                    {plan.price === null ? (
                      <span className="font-display text-[28px] leading-none font-extrabold text-nh-ink">
                        Auf Anfrage
                      </span>
                    ) : (
                      <>
                        <span className="font-display text-[38px] leading-none font-extrabold tracking-[-0.03em] text-nh-ink">
                          {formatPrice(plan.price)}
                        </span>
                        <span className="font-display text-[19px] leading-none font-bold text-nh-blue">
                          €
                        </span>
                        <span className="pb-0.5 font-mono text-[11.5px] text-nh-mute">
                          / Monat
                        </span>
                      </>
                    )}
                  </div>

                  {/*
                    Kontingent, Reaktionszeit und Nachzahlung stehen zusammen in
                    einem Kasten — das sind die drei Angaben, wegen derer man
                    sich fuer oder gegen ein Abo entscheidet.
                  */}
                  <dl className="mt-5 flex flex-col gap-2 rounded-card border border-nh-line bg-nh-surface/60 px-3.5 py-3">
                    <div>
                      <dt className="font-mono text-[10px] tracking-[0.14em] text-nh-mute uppercase">
                        enthalten
                      </dt>
                      <dd className="mt-1 text-[13px] leading-[1.45] font-semibold text-nh-ink">
                        {plan.included}
                      </dd>
                    </div>

                    <div className="border-t border-nh-line pt-2">
                      <dt className="font-mono text-[10px] tracking-[0.14em] text-nh-mute uppercase">
                        reaktion
                      </dt>
                      <dd className="mt-1 text-[13px] leading-[1.45] text-nh-body">
                        {plan.response}
                      </dd>
                    </div>

                    <div className="border-t border-nh-line pt-2">
                      <dt className="font-mono text-[10px] tracking-[0.14em] text-nh-mute uppercase">
                        darüber hinaus
                      </dt>
                      <dd className="mt-1 font-mono text-[12px] leading-[1.5] text-nh-blue">
                        {plan.overageRate === null
                          ? "nach Vereinbarung"
                          : `${formatPrice(plan.overageRate)} € je angefangene halbe Stunde`}
                      </dd>
                    </div>
                  </dl>

                  <ul className="mt-5 flex flex-col gap-2.5">
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

                  <div aria-hidden="true" className="h-7 flex-none" />

                  {/* mt-auto haelt die Schaltflaeche am Kartenfuss — die
                      Listen darueber sind unterschiedlich lang. */}
                  <Link
                    href="#contact"
                    className={cn(
                      "btn mt-auto w-full",
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

        {/* Erklaerung zur Nachzahlung — die Frage stellt sich sonst jeder. */}
        <div className="reveal glass glass-edge mt-8 flex items-start gap-5 rounded-panel p-6 max-[620px]:flex-col max-[620px]:gap-4">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-card border border-nh-line bg-nh-surface/70 text-nh-blue">
            <Icon name="spark" className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <h4 className="font-display text-[17px] font-extrabold text-nh-ink">
              {pricing.overageTitle}
            </h4>

            <p className="mt-2 max-w-[70ch] text-[14px] leading-[1.7] text-nh-body">
              {pricing.overageText}
            </p>
          </div>
        </div>

        <p className="reveal mt-6 text-center font-mono text-[11.5px] leading-[1.8] text-nh-mute">
          {pricing.footnote}
        </p>
      </Container>
    </Section>
  );
}

/** Farbband und Abzeichen der hervorgehobenen Karte. */
function FeaturedMarks() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-nh-blue-deep),var(--color-nh-blue),var(--color-nh-cyan))]"
      />
      <span className="absolute top-5 right-5 rounded-chip bg-nh-blue px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-white uppercase">
        beliebt
      </span>
    </>
  );
}

interface StepHeadingProps {
  label: string;
  title: string;
  note: string;
  text: string;
  /** Der erste Schritt braucht keinen Abstand nach oben. */
  first?: boolean;
}

/** Zwischenueberschrift eines der beiden Schritte. */
function StepHeading({ label, title, note, text, first }: StepHeadingProps) {
  return (
    <div className={cn("reveal mb-7", first ? "mt-0" : "mt-12")}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-chip bg-nh-blue px-3 py-1 font-mono text-[10.5px] tracking-[0.14em] text-white uppercase">
          {label}
        </span>

        <h3 className="font-display text-[24px] leading-none font-extrabold text-nh-ink">
          {title}
        </h3>

        <span className="font-mono text-[11.5px] text-nh-mute">{note}</span>
      </div>

      <p className="mt-3 max-w-[62ch] text-[14.5px] leading-[1.7] text-nh-body">
        {text}
      </p>
    </div>
  );
}
