import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import Counter from "@/components/Counter";
import { metrics } from "@/lib/content";

/**
 * Die vier grossen Kennzahlen.
 *
 * Bewusst der ruhigste Abschnitt der Seite: keine Icons, keine Karten mit
 * Rahmen, nur sehr grosse Zahlen auf viel Weissraum. Die Zahlen zaehlen beim
 * Erscheinen hoch (siehe components/Counter.tsx).
 */
export default function Performance() {
  return (
    <Section id="performance" grid>
      <Container>
        <SectionHead
          centered
          eyebrow="Performance"
          title="Zahlen, die wir öffentlich messen."
          accent="öffentlich"
          text="Alle Werte stammen aus dem eigenen Monitoring der letzten zwölf Monate und werden auf der Statusseite fortlaufend aktualisiert."
        />

        <div className="stagger grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {metrics.map((metric) => (
            <div key={metric.label} className="group relative text-center">
              {/* Der Schein erscheint erst beim Hover — sonst leuchtet die
                  ganze Reihe dauerhaft und nichts hebt sich mehr ab. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[24px] bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--color-nh-blue)_12%,transparent),transparent_68%)] opacity-0 transition-opacity duration-[var(--dur-slow)] group-hover:opacity-100"
              />

              <div className="relative px-2 py-6">
                <div className="font-display text-[clamp(38px,5.4vw,60px)] leading-none font-extrabold tracking-[-0.04em] text-nh-ink">
                  <Counter
                    value={metric.value}
                    decimals={metric.decimals}
                    prefix={metric.prefix}
                  />
                  <span className="text-gradient">{metric.suffix}</span>
                </div>

                <div className="mt-4 font-mono text-[11.5px] tracking-[0.16em] text-nh-blue uppercase">
                  {metric.label}
                </div>

                <p className="mx-auto mt-2.5 max-w-[220px] text-[13.5px] leading-[1.6] text-nh-mute">
                  {metric.hint}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
