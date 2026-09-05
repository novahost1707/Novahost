import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Web-App-Manifest. Sorgt für einen sauberen Namen und die richtigen Farben,
 * wenn jemand die Seite auf den Homescreen legt, und liefert Suchmaschinen
 * eine weitere eindeutige Namensangabe.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} - ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    lang: "de",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b0a",
    theme_color: "#0a0b0a",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
