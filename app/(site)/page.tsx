import { site, siteUrl } from "@/lib/site";
import { faq, services } from "@/lib/content";
import { projectTiers } from "@/lib/pricing";
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
 * Strukturierte Daten bewusst minimal: nur Angaben, die tatsächlich zutreffen
 * (Name, URL, Beschreibung, Leistungsangebot). Keine erfundene Adresse, keine
 * erfundenen Bewertungen.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      description: site.description,
      inLanguage: "de-DE",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: site.name,
      url: siteUrl,
      description: site.description,
      slogan: site.tagline,
      logo: `${siteUrl}/icon.svg`,
      ...(site.email ? { email: site.email } : {}),
      ...(site.phone ? { telephone: site.phone } : {}),
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: `${siteUrl}/`,
      name: `${site.name} - ${site.tagline}`,
      description: site.description,
      inLanguage: "de-DE",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      primaryImageOfPage: `${siteUrl}/opengraph-image`,
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      name: "Webdesign und Webentwicklung für Unternehmen",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "DE",
      serviceType: "Webdesign, Webentwicklung, Conversion-Optimierung",
      // Der Katalog listet genau die Leistungen, die auch auf der Seite
      // stehen - er wird aus derselben Quelle erzeugt und kann deshalb nicht
      // auseinanderlaufen.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Leistungen",
        itemListElement: services.items.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item.title, description: item.body },
        })),
      },
      offers: projectTiers.map((tier) => ({
        "@type": "Offer",
        name: tier.name,
        description: tier.positioning,
        price: tier.price.replace(/[^0-9]/g, ""),
        priceCurrency: "EUR",
        // Die Preise sind Nettopreise fuer Unternehmen, siehe Hinweis auf der Seite
        valueAddedTaxIncluded: false,
        category: tier.audience,
      })),
    },
    {
      // Die Fragen und Antworten stehen so auch sichtbar auf der Seite -
      // strukturierte Daten duerfen nichts behaupten, was ein Besucher dort
      // nicht findet.
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      isPartOf: { "@id": `${siteUrl}/#webpage` },
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
