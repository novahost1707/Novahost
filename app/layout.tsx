import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Silkscreen } from "next/font/google";
import { Cursor } from "@/components/fx/Cursor";
import { DinoGame } from "@/components/easteregg/DinoGame";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

/* Zwei typografische Ebenen: ca. 80 % moderne Sans, ca. 20 % Pixel. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["600", "700", "800"],
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} - Websites, die aus Besuchern Kunden machen`,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Website erstellen lassen",
    "Webdesign für Unternehmen",
    "Website Agentur",
    "Website für Handwerker",
    "Website für lokale Unternehmen",
    "professionelle Unternehmenswebsite",
    "Conversion Optimierung",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} - Websites, die aus Besuchern Kunden machen`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - Websites, die aus Besuchern Kunden machen`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0a",
  colorScheme: "dark",
};

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
      ...(site.email ? { email: site.email } : {}),
      ...(site.phone ? { telephone: site.phone } : {}),
    },
    {
      "@type": "Service",
      name: "Webdesign und Webentwicklung für Unternehmen",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "DE",
      serviceType: "Webdesign, Webentwicklung, Conversion-Optimierung",
      offers: [
        { "@type": "Offer", name: "Launch", price: "1490", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Business", price: "2490", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Custom", price: "4900", priceCurrency: "EUR" },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${interTight.variable} ${silkscreen.variable}`}>
      <body>
        {/* Ohne JavaScript darf kein Inhalt unsichtbar bleiben. */}
        <noscript>
          <style>{".reveal{opacity:1 !important;transform:none !important}"}</style>
        </noscript>
        <a className="skip" href="#main">Zum Inhalt springen</a>
        <div className="texture" aria-hidden="true" />
        <Cursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <DinoGame />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
