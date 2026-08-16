import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import { siteMeta } from "@/lib/content";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

/** Headlines — fett bis extrafett, das Rueckgrat der Typografie. */
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

/** Fliesstext. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Alles Technische: Labels, Kennzahlen, Terminal, Code. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  applicationName: siteMeta.name,
  keywords: [
    "Webdesign",
    "Website erstellen lassen",
    "Website Relaunch",
    "Website Betreuung",
    "Webentwicklung",
    "SEO",
    "Website Wartung Abo",
  ],
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  alternates: { canonical: "/" },
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    siteName: siteMeta.name,
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
  },
};

export const viewport: Viewport = {
  // Faerbt die Browserleiste auf Mobilgeraeten passend zum jeweiligen Modus.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      /*
       * Das Init-Skript unten setzt data-theme noch vor dem ersten Bild.
       * React weiss davon nichts und wuerde die Abweichung sonst als
       * Hydration-Fehler melden.
       */
      suppressHydrationWarning
    >
      <head>
        {/*
          Muss vor jedem Stylesheet und vor dem ersten Zeichnen laufen, sonst
          blitzt bei dunkler Ansicht kurz die helle Seite auf. Deshalb inline
          und nicht als eigene Datei — ein zusaetzlicher Request waere genau
          der Moment, den es zu vermeiden gilt.
        */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>

      <body>
        {/* Erste Tabulator-Station: direkt zum Inhalt, an der Navigation vorbei. */}
        <a href="#main" className="skip-link">
          Zum Inhalt springen
        </a>

        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
        <CookieConsent />
      </body>
    </html>
  );
}
