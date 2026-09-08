import type { Metadata } from "next";
import { DemoLeiste } from "@/components/demo/DemoLeiste";
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
      <DemoLeiste />
      <main id="main">{children}</main>
    </>
  );
}
