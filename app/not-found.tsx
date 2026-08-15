import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Terminal from "@/components/Terminal";
import type { TerminalLine } from "@/types";

/** Die Fehlermeldung als Terminal-Ausgabe — im Ton der restlichen Seite. */
const lines: TerminalLine[] = [
  { kind: "prompt", text: "nova route resolve --path $REQUEST" },
  { kind: "blank", text: "" },
  { kind: "log", text: "> resolving route ..." },
  { kind: "log", text: "> status: 404 not found" },
  { kind: "log", text: "> hint: check the url or head back home" },
];

export default function NotFound() {
  return (
    <div className="hero-backdrop relative overflow-hidden pt-[150px] pb-[120px] max-[760px]:pt-[124px] max-[760px]:pb-20">
      <div aria-hidden="true" className="tech-grid tech-grid-fade" />

      <Container className="relative z-[1]">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div>
            <Eyebrow>Error 404</Eyebrow>

            <h1 className="mt-[18px] text-[clamp(34px,5vw,60px)]">
              Diese Seite gibt es{" "}
              <span className="text-gradient">nicht (mehr).</span>
            </h1>

            <p className="mt-5 max-w-[440px] text-[16px] leading-[1.7] text-nh-body">
              Die Adresse führt ins Leere. Alles andere läuft — versprochen.
            </p>

            <div className="mt-9 flex flex-wrap gap-3.5">
              <Link href="/" className="btn">
                Zur Startseite
              </Link>
              <Link href="/#contact" className="btn btn-ghost">
                Support kontaktieren
              </Link>
            </div>
          </div>

          <Terminal lines={lines} title="nova-cli — router" />
        </div>
      </Container>
    </div>
  );
}
