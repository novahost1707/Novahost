import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Analysis } from "@/components/sections/Analysis";
import { LeadForm } from "@/components/sections/LeadForm";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Reihenfolge folgt dem Conversion-Funnel:
 * Aufmerksamkeit -> Problem -> Lösung -> Leistung -> Beleg -> Ablauf ->
 * Preis -> Einstiegsangebot -> Anfrage -> offene Fragen -> Abschluss.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Problem />
      <Solution />
      <Services />
      <Work />
      <Process />
      <Pricing />
      <Analysis />
      <LeadForm />
      <Faq />
      <FinalCta />
    </>
  );
}
