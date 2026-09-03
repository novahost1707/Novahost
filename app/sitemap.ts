import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Startseite und Rechtsseiten. Branchen-Landingpages (siehe
 * plannedLandingPages in lib/site.ts) werden hier ergänzt, sobald sie
 * existieren - die Struktur ist darauf ausgelegt.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
