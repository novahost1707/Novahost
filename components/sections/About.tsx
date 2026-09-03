import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionMarker from "@/components/ui/SectionMarker";
import Counter from "@/components/Counter";
import { about } from "@/lib/content";

/**
 * Wer hinter Nova Host steht.
 *
 * Der einzige Abschnitt mit laengerem Fliesstext — deshalb zweispaltig
 * aufgebaut und ohne Glaskarten: hier soll gelesen, nicht geklickt werden.
 */
export default function About() {
  return (
    <Section id="about">
      <Container>
        <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div className="reveal">
            <SectionMarker index="07" label={about.eyebrow} />

            <h2 className="mt-3.5 text-[clamp(28px,3.8vw,44px)]">
              {about.title}
            </h2>

            <p className="mt-5 max-w-[460px] text-[16px] leading-[1.75] text-nh-body">
              {about.text}
            </p>

            {/* Zwei Zahlen als Beleg — bewusst nicht als Kachelraster. */}
            <div className="mt-10 flex gap-10">
              <div>
                <div className="font-display text-[34px] leading-none font-extrabold text-nh-ink">
                  {/* Jahreszahl ohne Tausenderpunkt. */}
                  <Counter value={2019} grouping={false} />
                </div>
                <div className="mt-2 font-mono text-[11px] tracking-[0.14em] text-nh-mute uppercase">
                  gegründet
                </div>
              </div>

              <div>
                <div className="font-display text-[34px] leading-none font-extrabold text-nh-ink">
                  <Counter value={3400} suffix="+" />
                </div>
                <div className="mt-2 font-mono text-[11px] tracking-[0.14em] text-nh-mute uppercase">
                  betreute Systeme
                </div>
              </div>
            </div>
          </div>

          <div className="stagger flex flex-col gap-px overflow-hidden rounded-panel border border-nh-line bg-nh-line">
            {about.points.map((point) => (
              <div
                key={point.num}
                className="group relative bg-nh-surface px-7 py-7 transition-colors duration-[var(--dur-hover)] hover:bg-nh-canvas max-[560px]:px-5"
              >
                {/* Der Akzentstrich faehrt beim Hover von oben herunter. */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 left-0 w-[2px] origin-top scale-y-0 bg-[linear-gradient(180deg,var(--color-nh-blue),var(--color-nh-cyan))] transition-transform duration-[var(--dur-slow)] ease-[var(--ease-nh)] group-hover:scale-y-100"
                />

                <div className="font-mono text-[11px] tracking-[0.16em] text-nh-blue">
                  {point.num}
                </div>

                <h3 className="mt-3 font-display text-[19px] leading-tight font-extrabold text-nh-ink">
                  {point.title}
                </h3>

                <p className="mt-2.5 text-[14.5px] leading-[1.7] text-nh-body">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
