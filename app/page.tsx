import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Infrastructure from "@/components/sections/Infrastructure";
import Performance from "@/components/sections/Performance";
import Pricing from "@/components/sections/Pricing";
import Developers from "@/components/sections/Developers";
import Security from "@/components/sections/Security";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import { pricingPlans, siteMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
};

/**
 * Die Startseite ist ein One-Pager. Die Reihenfolge ist bewusst gewaehlt:
 * erst das Versprechen (Hero), dann das Angebot, dann der Beleg
 * (Infrastruktur, Performance), dann der Preis — und erst danach die
 * vertiefenden Abschnitte fuer Entwickler und Sicherheitsfragen.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Infrastructure />
      <Performance />
      <Pricing />
      <Developers />
      <Security />
      <About />
      <Contact />

      {/*
        Strukturierte Daten fuer Suchmaschinen. Der Inhalt stammt aus
        lib/content.ts, damit Angebot und Auszeichnung nicht auseinanderlaufen.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteMeta.name,
            description: siteMeta.description,
            email: siteMeta.email,
            telephone: siteMeta.phone,
            slogan: siteMeta.claim,
            makesOffer: pricingPlans
              .filter((plan) => plan.price !== null)
              .map((plan) => ({
                "@type": "Offer",
                name: plan.name,
                description: plan.tagline,
                price: plan.price,
                priceCurrency: "EUR",
              })),
          }),
        }}
      />
    </>
  );
}
