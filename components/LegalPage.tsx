import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import type { LegalPageContent } from "@/types";

interface LegalPageProps {
  content: LegalPageContent;
}

/**
 * Darstellung der Rechtsseiten (/impressum, /datenschutz).
 *
 * Bewusst ohne Scroll-Reveal und ohne Hover-Spielereien: bei Pflichtangaben
 * zaehlt Lesbarkeit, nicht Bewegung. Header und Footer kommen wie ueberall
 * aus dem Layout, dadurch bleibt die visuelle Identitaet erhalten.
 *
 * Das Textmass ist bewusst schmal (rund 70 Zeichen pro Zeile), weil lange
 * Zeilen bei Fliesstext am schlechtesten zu lesen sind.
 */
export default function LegalPage({ content }: LegalPageProps) {
  return (
    <div className="relative overflow-hidden pt-[132px] pb-[120px] max-[760px]:pt-[112px] max-[760px]:pb-20">
      <div aria-hidden="true" className="tech-grid tech-grid-fade" />

      <Container className="relative z-[1]">
        <div className="max-w-[760px]">
          <Eyebrow>{content.eyebrow}</Eyebrow>

          <h1 className="mt-[18px] text-[clamp(32px,4.6vw,52px)]">
            {content.title}
          </h1>

          <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.75] text-nh-body">
            {content.intro}
          </p>

          <div className="mt-12 flex flex-col gap-10">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-[19px] leading-[1.3] font-extrabold text-nh-ink">
                  {section.heading}
                </h2>

                <div className="mt-3.5 flex flex-col gap-3">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-[68ch] text-[15.5px] leading-[1.8] text-nh-body"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
