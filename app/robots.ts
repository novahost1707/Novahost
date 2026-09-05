import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Alles ist zum Crawlen freigegeben ausser den API-Routen - dort gibt es
 * nichts zu indexieren. Impressum und Datenschutz bleiben crawlbar und
 * regeln ihre Nicht-Indexierung ueber ihr eigenes robots-Meta; so kann
 * Google den Seiten weiterhin folgen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
