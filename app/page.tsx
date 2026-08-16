import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Performance from "@/components/sections/Performance";
import Pricing from "@/components/sections/Pricing";
import Craft from "@/components/sections/Craft";
import Care from "@/components/sections/Care";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import { carePlans, siteMeta, websitePackages } from "@/lib/content";

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
};

/**
 * Die Startseite ist ein One-Pager. Die Reihenfolge ist bewusst gewaehlt:
 * erst das Versprechen (Hero), dann die Leistungen, dann der Ablauf und die
 * Kennzahlen als Beleg — danach der Preis. Erst wenn klar ist, was das Ganze
 * kostet, folgen die vertiefenden Abschnitte zu Handarbeit und Betreuung.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Performance />
      <Pricing />
      <Craft />
      <Care />
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
            // Beide Teile des Angebots: der einmalige Kauf und das Abo.
            makesOffer: [
              ...websitePackages
                .filter((pack) => pack.price !== null)
                .map((pack) => ({
                  "@type": "Offer",
                  name: `Website-Paket ${pack.name}`,
                  description: pack.tagline,
                  price: pack.price,
                  priceCurrency: "EUR",
                })),
              ...carePlans
                .filter((plan) => plan.price !== null)
                .map((plan) => ({
                  "@type": "Offer",
                  name: `Betreuung ${plan.name}`,
                  description: `${plan.tagline} ${plan.included}.`,
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: plan.price,
                    priceCurrency: "EUR",
                    billingIncrement: 1,
                    unitCode: "MON",
                  },
                })),
            ],
          }),
        }}
      />
    </>
  );
}
