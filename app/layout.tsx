import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import { siteMeta } from "@/lib/content";
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
    "Hosting",
    "VPS",
    "Dedicated Server",
    "Cloud Infrastructure",
    "Managed IT",
    "Game Hosting",
    "Rechenzentrum Deutschland",
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
  // Faerbt die Browserleiste auf Mobilgeraeten im Weiss der Seite ein.
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Erste Tabulator-Station: direkt zum Inhalt, an der Navigation vorbei. */}
        <a href="#main" className="skip-link">
          Zum Inhalt springen
        </a>

        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
