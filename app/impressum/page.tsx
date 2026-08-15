import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { impressum, siteMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: `${impressum.title} — ${siteMeta.name}`,
  description: `${impressum.title} von ${siteMeta.name}.`,
  // Pflichtseiten gehoeren nicht in die Suchergebnisse, bleiben aber erreichbar.
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return <LegalPage content={impressum} />;
}
