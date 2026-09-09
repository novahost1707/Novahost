import Link from "next/link";
import { Bild } from "@/components/demo/Bild";
import { ProduktRaster } from "@/components/demo/shop/ProduktRaster";
import type { Bildplatz } from "@/lib/demo-bilder";
import { kategorien, marke, produktBySlug } from "@/lib/demo-mode";

/**
 * Startseite von ARVO.
 *
 * Sie verkauft nicht selbst, sie sortiert: ein Kampagnenbild, die beiden
 * Einstiege Damen und Herren, die Kategorien, vier ausgewählte Teile und
 * danach die Gründe, hier zu kaufen. Das gesamte Sortiment liegt bewusst auf
 * den Unterseiten - eine Startseite, die alle achtzehn Teile zeigt, trifft
 * keine Auswahl und wirkt deshalb billiger, als sie ist.
 */

const BILD_HERO: Bildplatz = {
  src: "/demo/mode/hero.jpg",
  alt: "Zwei Personen in Mänteln der Serie 04 vor einer Hafenkulisse",
  ratio: "16 / 8",
  motiv: "mode-lookbook",
  variante: 0,
};

const BILD_DAMEN: Bildplatz = {
  src: "/demo/mode/einstieg-damen.jpg",
  alt: "Model in weiter Hose und Ripp-Shirt, Ganzkörperaufnahme",
  ratio: "3 / 2",
  motiv: "mode-auslage",
  variante: 0,
  ton: "#8a857d",
};

const BILD_HERREN: Bildplatz = {
  src: "/demo/mode/einstieg-herren.jpg",
  alt: "Model in Bomberjacke und Cargohose, Ganzkörperaufnahme",
  ratio: "3 / 2",
  motiv: "mode-auslage",
  variante: 1,
  ton: "#5f5e58",
};

const BILD_EDITORIAL: Bildplatz = {
  src: "/demo/mode/editorial.jpg",
  alt: "Stoffbahnen in der Weberei, Detailaufnahme",
  ratio: "4 / 5",
  motiv: "mode-stoff",
  variante: 0,
};

const AUSGEWAEHLT = ["hoodie-werft", "hose-ebbe", "mantel-fjord", "tee-kern"];

const VERSPRECHEN = [
  { titel: `Versandfrei ab ${marke.versandfreiAb}`, text: "Innerhalb Deutschlands, klimaneutral mit DHL GoGreen. Lieferung in zwei bis vier Werktagen." },
  { titel: "30 Tage Rückgabe", text: "Ungetragen und mit Etikett zurück. Das Rücksendeetikett liegt jeder Bestellung bei." },
  { titel: "Reparatur statt Ersatz", text: "Naht auf, Zipper defekt? Im ersten Jahr kostenlos, danach zum Selbstkostenpreis." },
  { titel: "Kleine Auflagen", text: "40 bis 120 Stück je Serie. Was ausverkauft ist, legen wir nicht nach." },
];

const STIMMEN = [
  { text: "Der Werft ist der erste Hoodie, der nach einem Jahr noch aussieht wie am ersten Tag. Der Preis hat mich zuerst gestört, inzwischen nicht mehr.", name: "Jonas K.", kauf: "Hoodie Werft, seit 14 Monaten" },
  { text: "Größenberatung angeschrieben, am selben Tag eine Antwort mit konkreten Maßen bekommen. Danach hat die Hose gepasst.", name: "Merve A.", kauf: "Weite Hose Ebbe" },
  { text: "Zipper am Sweat war nach acht Monaten kaputt. Eingeschickt, repariert, zurück - ohne Diskussion und ohne Rechnung.", name: "Timo B.", kauf: "Zip-Hoodie Kai" },
];

export default function ShopStartseite() {
  const ausgewaehlt = AUSGEWAEHLT.map((s) => produktBySlug(s)!).filter(Boolean);

  return (
    <>
      <header className="shop__hero">
        <Bild platz={BILD_HERO} sizes="100vw" priority />
        <div className="shop__hero-schleier" aria-hidden="true" />
        <div className="shop__hero-inhalt">
          <div className="demo__shell shop__hero-zeile">
            <div>
              <p className="shop__mini">Serie 04 &middot; Winter 26</p>
              <h1 className="shop__display">Weniger Teile, länger getragen.</h1>
            </div>
            <div>
              <p>
                Achtzehn Teile aus vier Stoffen, gefertigt in einer Manufaktur bei Porto.
                Wir legen keine Serie nach - was ausverkauft ist, bleibt es.
              </p>
              <div className="shop__hero-aktionen">
                <Link href="/demo/mode/damen" className="shop__btn shop__btn--hell">Damen ansehen</Link>
                <Link href="/demo/mode/herren" className="shop__btn shop__btn--hell">Herren ansehen</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="shop__section shop__section--schmal">
        <div className="demo__shell">
          <div className="shop__einstiege">
            <Link href="/demo/mode/damen" className="shop__einstieg zoom">
              <Bild platz={BILD_DAMEN} sizes="(max-width: 760px) 100vw, 50vw" />
              <span className="shop__einstieg-text">
                <h3>Damen</h3>
                <span>Zwölf Teile ansehen</span>
              </span>
            </Link>
            <Link href="/demo/mode/herren" className="shop__einstieg zoom">
              <Bild platz={BILD_HERREN} sizes="(max-width: 760px) 100vw, 50vw" />
              <span className="shop__einstieg-text">
                <h3>Herren</h3>
                <span>Dreizehn Teile ansehen</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="shop__section shop__section--weiss">
        <div className="demo__shell">
          <div className="shop__kopf auf">
            <div>
              <p className="shop__mini" style={{ color: "var(--grau)" }}>Sortiment</p>
              <h2 className="shop__display">Fünf Kategorien.</h2>
            </div>
            <p>
              Wir führen bewusst wenig. Jedes Teil muss sich mit jedem anderen kombinieren
              lassen - sonst nehmen wir es nicht ins Sortiment.
            </p>
          </div>

          <div className="shop__kategorien">
            {kategorien.map((k) => (
              <Link href={`/demo/mode/kategorie/${k.id}`} className="shop__kategorie zoom auf" key={k.id}>
                <Bild platz={k.bild} sizes="(max-width: 680px) 50vw, (max-width: 1100px) 33vw, 20vw" />
                <span className="shop__kategorie-text">
                  <h3>{k.kurz}</h3>
                  <p>{k.text}</p>
                  <span>Ansehen</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="shop__section">
        <div className="demo__shell">
          <div className="shop__kopf auf">
            <div>
              <p className="shop__mini" style={{ color: "var(--grau)" }}>Ausgewählt</p>
              <h2 className="shop__display">Vier, mit denen man anfängt.</h2>
            </div>
            <Link href="/demo/mode/kategorie/sweats" className="shop__mini">Alle Teile &#8594;</Link>
          </div>
          <ProduktRaster produkte={ausgewaehlt} />
        </div>
      </section>

      <section className="shop__section shop__section--tinte">
        <div className="demo__shell shop__editorial">
          <div className="auf">
            <Bild platz={BILD_EDITORIAL} sizes="(max-width: 900px) 100vw, 46vw" />
          </div>
          <div className="auf">
            <p className="shop__mini" style={{ color: "var(--sand)" }}>Material</p>
            <h2 className="shop__display">Wir kaufen den Stoff, bevor wir den Schnitt zeichnen.</h2>
            <p>
              Die meisten Marken entwerfen erst und suchen dann einen Stoff, der billig genug
              ist. Wir machen es umgekehrt: Wir kaufen jährlich bei vier Webereien ein und
              entwerfen danach, was sich daraus nähen lässt.
            </p>
            <dl className="shop__editorial-liste">
              <div><dt>Baumwolle</dt><dd>GOTS-zertifiziert, gestrickt in Vila Nova de Gaia</dd></div>
              <div><dt>Wolle</dt><dd>Mulesing-frei, gewebt in Biella und Bergamo</dd></div>
              <div><dt>Leinen</dt><dd>Angebaut und gewebt in Belgien</dd></div>
              <div><dt>Leder</dt><dd>Pflanzlich gegerbt, verarbeitet in Ubrique</dd></div>
            </dl>
            <Link href="/demo/mode/kategorie/jacken" className="shop__btn shop__btn--hell">Jacken ansehen</Link>
          </div>
        </div>
      </section>

      <div className="shop__versprechen">
        {VERSPRECHEN.map((v) => (
          <div key={v.titel} className="auf">
            <p className="shop__mini" style={{ color: "var(--sand)" }}>Service</p>
            <h3>{v.titel}</h3>
            <p>{v.text}</p>
          </div>
        ))}
      </div>

      <section className="shop__section shop__section--weiss">
        <div className="demo__shell">
          <div className="shop__kopf auf">
            <div>
              <p className="shop__mini" style={{ color: "var(--grau)" }}>Kundenstimmen</p>
              <h2 className="shop__display">4,7 von 5 aus 312 Bewertungen.</h2>
            </div>
            <p>Bewertungen stammen aus dem Versandbestätigungsmail, vier Wochen nach Erhalt.</p>
          </div>
          <div className="shop__stimmen">
            {STIMMEN.map((s) => (
              <figure className="shop__stimme auf" key={s.name}>
                <span className="shop__sterne" aria-label="Fünf von fünf Sternen">★★★★★</span>
                <blockquote>{s.text}</blockquote>
                <figcaption>
                  <b>{s.name}</b> &middot; {s.kauf}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="demo__note" style={{ marginTop: "26px" }}>
            Demo-Seite: Bewertungen und Kennzahlen gehören zum erfundenen Label.
          </p>
        </div>
      </section>
    </>
  );
}
