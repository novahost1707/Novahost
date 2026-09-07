import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Silkscreen } from "next/font/google";
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Erlaubt grosse Bildvorschauen und ungekuerzte Textausschnitte im
      // Suchergebnis. Ohne diese Angabe entscheidet Google konservativer.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0a",
  colorScheme: "dark",
};

/**
 * Wurzel-Layout: nur Dokumentgeruest, Schriften und die Basis-Metadaten.
 *
 * Der sichtbare Rahmen (Kopf, Fuss, Cursor, Easter Egg, Einwilligung) steckt
 * in components/layout/SiteChrome und wird von der Routengruppe (site)
 * gesetzt. Die Demo-Projekte unter /demo sind eigenstaendige Auftritte fremder
 * (erfundener) Marken und bekommen ihn deshalb nicht.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${interTight.variable} ${silkscreen.variable}`}>
      <body>
        {/* Ohne JavaScript darf kein Inhalt unsichtbar bleiben. */}
        <noscript>
          <style>{".reveal{opacity:1 !important;transform:none !important}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
