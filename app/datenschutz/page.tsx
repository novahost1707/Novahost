import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { datenschutz, siteMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: `${datenschutz.title} — ${siteMeta.name}`,
  description: `${datenschutz.title} von ${siteMeta.name}.`,
  // Pflichtseiten gehoeren nicht in die Suchergebnisse, bleiben aber erreichbar.
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return <LegalPage content={datenschutz} />;
}
