import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Die Sitemap enthaelt ausschliesslich Seiten, die auch indexiert werden
 * sollen. Impressum und Datenschutz sind bewusst auf noindex gesetzt und
 * stehen deshalb nicht darin - eine als noindex markierte URL in der Sitemap
 * meldet die Google Search Console sonst als Fehler.
 *
 * Branchen-Landingpages (siehe plannedLandingPages in lib/site.ts) werden hier
 * ergaenzt, sobald sie existieren.
 */

/**
 * Fester Stand des Inhalts. Bewusst kein new Date(): das waere der Zeitpunkt
 * des letzten Deployments und wuerde Suchmaschinen bei jedem Build eine
 * Aenderung melden, die es gar nicht gab.
 */
const lastContentUpdate = new Date("2026-09-03T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: lastContentUpdate,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
