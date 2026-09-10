import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { Cursor } from "@/components/fx/Cursor";
import { DinoGame } from "@/components/easteregg/DinoGame";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollStart } from "@/components/layout/ScrollStart";

/**
 * Der gemeinsame Rahmen der Novahost-Seite: Kopf, Fuss, Cursor, Easter Egg
 * und die Einwilligungsabfrage.
 *
 * Bewusst eine eigene Komponente statt Teil des Wurzel-Layouts: die
 * Demo-Projekte unter /demo sind fremde Marken und duerfen weder unseren Kopf
 * noch unseren Fuss tragen. Das Wurzel-Layout bleibt deshalb leer, und dieser
 * Rahmen wird nur dort gesetzt, wo er hingehoert - in der Routengruppe (site)
 * und auf der 404-Seite.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollStart />
      <a className="skip" href="#main">Zum Inhalt springen</a>
      <div className="texture" aria-hidden="true" />
      <Cursor />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <DinoGame />
      <ConsentBanner />
    </>
  );
}
