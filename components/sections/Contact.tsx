import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import StatusDot from "@/components/ui/StatusDot";
import ContactForm from "@/components/ContactForm";
import { contact, siteMeta } from "@/lib/content";

/**
 * Kontaktabschnitt: links die Ansprache und die direkten Wege, rechts das
 * Formular. Das Formular ist die einzige interaktive Insel der Seite und
 * deshalb die einzige Client-Komponente in diesem Abschnitt.
 */
export default function Contact() {
  return (
    <Section id="contact" className="accent-backdrop" grid>
      <Container>
        <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] items-start gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div className="reveal">
            <Eyebrow>{contact.eyebrow}</Eyebrow>

            <h2 className="mt-[18px] text-[clamp(28px,3.8vw,46px)]">
              {contact.title}
            </h2>

            <p className="mt-5 max-w-[420px] text-[16px] leading-[1.7] text-nh-body">
              {contact.text}
            </p>

            {/* Direkte Wege */}
            <div className="mt-9 flex flex-col gap-3">
              <a
                href={`mailto:${siteMeta.email}`}
                className="glow-hover group flex items-center justify-between gap-4 rounded-[14px] border border-nh-line bg-nh-surface/60 px-5 py-4 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-nh-blue)_28%,transparent)]"
              >
                <span className="font-mono text-[11px] tracking-[0.14em] text-nh-mute uppercase">
                  E-Mail
                </span>
                <span className="truncate text-[14.5px] font-medium text-nh-ink transition-colors duration-[var(--dur-hover)] group-hover:text-nh-blue">
                  {siteMeta.email}
                </span>
              </a>

              <a
                href={`tel:${siteMeta.phone.replace(/\s/g, "")}`}
                className="glow-hover group flex items-center justify-between gap-4 rounded-[14px] border border-nh-line bg-nh-surface/60 px-5 py-4 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-nh-blue)_28%,transparent)]"
              >
                <span className="font-mono text-[11px] tracking-[0.14em] text-nh-mute uppercase">
                  Telefon
                </span>
                <span className="truncate text-[14.5px] font-medium text-nh-ink transition-colors duration-[var(--dur-hover)] group-hover:text-nh-blue">
                  {siteMeta.phone}
                </span>
              </a>
            </div>

            {/* Kennzahlen zum Support */}
            <dl className="stagger mt-9 flex flex-col gap-3.5 border-t border-nh-line pt-7">
              {contact.facts.map((fact) => (
                <div key={fact.label} className="flex items-center gap-3">
                  <StatusDot />
                  <dt className="font-mono text-[11.5px] text-nh-mute">
                    {fact.label}
                  </dt>
                  <dd className="ml-auto text-[13.5px] font-medium text-nh-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
