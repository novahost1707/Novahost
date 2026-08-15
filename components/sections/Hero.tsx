import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import StatusDot from "@/components/ui/StatusDot";
import HeroBackdrop from "@/components/HeroBackdrop";
import HeroDashboard from "@/components/HeroDashboard";
import { hero, marqueeItems } from "@/lib/content";

/**
 * Der Hero baut sich beim Laden gestaffelt auf (`hero-rise-*`): Eyebrow,
 * Headline, Text, Buttons, Vertrauenszeile und zuletzt das Dashboard.
 *
 * Die Hintergrundebenen bewegen sich mit Maus und Scroll — siehe
 * components/HeroBackdrop.tsx.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      /*
       * Spalten-Flexbox statt Zeile: unter 900px rutscht das Laufband aus der
       * absoluten Position in den Fluss und wuerde als zweites Flex-Item in
       * einer Zeile den Inhalt zusammenquetschen — sein Track ist bewusst
       * `max-content` breit.
       */
      className="hero-backdrop relative flex min-h-svh flex-col justify-center overflow-hidden pt-[132px] pb-[92px] max-[900px]:min-h-0 max-[900px]:pt-[116px] max-[760px]:pb-16"
    >
      <HeroBackdrop />

      <Container className="relative z-[2]">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,540px)] items-center gap-16 max-[1080px]:grid-cols-1 max-[1080px]:gap-12">
          {/* Textspalte */}
          <div>
            <div className="hero-rise hero-rise-1">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </div>

            <h1 className="hero-rise hero-rise-2 mt-5 text-[clamp(40px,6.2vw,74px)]">
              {hero.headlineTop}
              <br />
              <span className="text-gradient">{hero.headlineAccent}</span>
            </h1>

            <p className="hero-rise hero-rise-3 mt-6 max-w-[520px] text-[17px] leading-[1.7] text-nh-body">
              {hero.text}
            </p>

            <div className="hero-rise hero-rise-4 mt-9 flex flex-wrap gap-3.5">
              <Link href={hero.primaryCta.hash} className="btn">
                {hero.primaryCta.label}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>

              <Link href={hero.secondaryCta.hash} className="btn btn-ghost">
                {hero.secondaryCta.label}
              </Link>
            </div>

            {/* Vertrauenszeile: drei harte Fakten in Monospace. */}
            <div className="hero-rise hero-rise-5 mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[12px] text-nh-mute">
              <span className="flex items-center gap-2">
                <StatusDot />
                99,99 % Uptime-SLA
              </span>
              <span className="flex items-center gap-2">
                <StatusDot tone="blue" />
                Rechenzentren in der EU
              </span>
              <span className="flex items-center gap-2">
                <StatusDot tone="cyan" />
                Setup in unter 60 Sekunden
              </span>
            </div>
          </div>

          {/* Dashboard-Spalte */}
          <div className="hero-rise hero-rise-6 relative">
            {/* Weicher Schein hinter der Karte — laesst sie schweben. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-14%] rounded-full bg-[radial-gradient(circle,rgba(26,92,255,0.16),transparent_66%)] blur-[8px]"
            />
            <div className="float relative" style={{ animationDuration: "11s" }}>
              <HeroDashboard />
            </div>
          </div>
        </div>
      </Container>

      {/* Laufband mit technischen Stichworten am unteren Rand. */}
      <div className="marquee-wrap marquee-mask absolute right-0 bottom-0 left-0 border-t border-nh-line bg-white/40 py-3.5 backdrop-blur-sm max-[900px]:static max-[900px]:mt-12">
        <div className="marquee">
          {/* Der Inhalt liegt doppelt im DOM, damit das Band nahtlos umlaeuft. */}
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex">
              {marqueeItems.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-3 px-6 font-mono text-[11.5px] tracking-[0.06em] whitespace-nowrap text-nh-mute"
                >
                  <span className="h-1 w-1 rounded-full bg-nh-blue/50" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[76px] left-6 flex items-center gap-3 font-mono text-[10.5px] tracking-[0.16em] text-nh-mute-2 uppercase max-[1180px]:hidden">
        <span>Scroll</span>
        <div className="scroll-cue-line" />
      </div>
    </section>
  );
}
