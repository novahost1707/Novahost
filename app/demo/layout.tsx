import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/demo.css";

/**
 * Rahmen der Demo-Projekte.
 *
 * Bewusst ohne Novahost-Kopf und -Fuss: die Seiten sollen wie eigenstaendige
 * Auftritte wirken, sonst belegen sie nichts. Was bleibt, ist der Balken
 * oben - Hinweis auf die Demo und Weg zurueck in einem.
 */
export const metadata: Metadata = {
  // Demos gehoeren nicht in den Suchindex: sie wuerden mit der eigenen Seite
  // um Sichtbarkeit konkurrieren und koennten fuer echte Betriebe gehalten
  // werden. "follow" bleibt an, damit die Links zurueck zaehlen.
  robots: { index: false, follow: true },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="demobar">
        <span className="demobar__tag">DEMO</span>
        <span className="demobar__text">
          Gestaltungsbeispiel von Novahost.
          <span className="demobar__lang">
            {" "}Erfundenes Unternehmen, erfundene Angaben - hier lässt sich nichts bestellen oder
            buchen.
          </span>
        </span>
        <Link href="/#projekte" className="demobar__back">
          <span aria-hidden="true">&#8592;</span> Zurück zu Novahost
        </Link>
      </div>
      <main id="main">{children}</main>
    </>
  );
}
