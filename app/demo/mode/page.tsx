import Link from "next/link";
import { Bild } from "@/components/demo/Bild";
import type { Bildplatz } from "@/lib/demo-bilder";
import { kategorien, produkte } from "@/lib/demo-mode";

/**
 * Startseite des Demo-Shops NORDLICHT.
 *
 * Aufbau wie bei einem echten Label: ein grosses Kampagnenbild, darunter die
 * Kategorien, dann die aktuelle Serie, ein redaktioneller Teil zum Material,
 * die Versandbedingungen und der Brief. Kein Karussell, keine Rabattbanner -
 * die Ruhe ist hier Teil des Versprechens.
 */

const BILD_HERO: Bildplatz = {
  src: "/demo/mode/hero.jpg",
  alt: "Zwei Personen in Mänteln der Serie 04 vor einer Hafenkulisse",
  ratio: "16 / 8",
  motiv: "mode-strasse",
  variante: 0,
};

const BILD_EDITORIAL: Bildplatz = {
  src: "/demo/mode/editorial.jpg",
  alt: "Stoffbahnen in der Weberei, Detailaufnahme",
  ratio: "4 / 5",
  motiv: "mode-stoff",
  variante: 0,
};

const VERSPRECHEN = [
  { titel: "Versandkostenfrei ab 80 €", text: "Innerhalb Deutschlands. Lieferung in zwei bis vier Werktagen, klimaneutral mit DHL GoGreen." },
  { titel: "30 Tage Rückgabe", text: "Ungetragen und mit Etikett zurück. Das Rücksendeetikett liegt jeder Bestellung bei." },
  { titel: "Reparatur statt Ersatz", text: "Naht auf, Reißverschluss defekt? Wir reparieren im ersten Jahr kostenlos, danach zum Selbstkostenpreis." },
];

export default function ModeStartseite() {
  const serie = produkte.slice(0, 8);

  return (
    <>
      <header className="mode__hero">
        <Bild platz={BILD_HERO} sizes="100vw" priority />
        <div className="mode__hero-schleier" aria-hidden="true" />
        <div className="mode__hero-inhalt">
          <div className="demo__shell mode__hero-zeile">
            <div>
              <p className="mode__mini">Serie 04 &middot; Winter 26</p>
              <h1 className="mode__display">Weniger Teile, länger getragen.</h1>
            </div>
            <div>
              <p>
                Vier Stoffe, elf Schnitte, gefertigt in einer Manufaktur bei Porto. Wir legen keine
                Serie nach - was ausverkauft ist, bleibt es.
              </p>
              <Link href="/demo/mode#serie" className="mode__btn mode__btn--hell" style={{ marginTop: "22px" }}>
                Serie ansehen
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="mode__section" id="kategorien">
        <div className="demo__shell">
          <div className="mode__kopf auf">
            <div>
              <p className="mode__mini" style={{ color: "var(--grau)" }}>Sortiment</p>
              <h2 className="mode__display">Vier Kategorien, elf Teile.</h2>
            </div>
            <p>
              Wir führen bewusst wenig. Jedes Teil muss sich mit jedem anderen kombinieren lassen -
              sonst nehmen wir es nicht ins Sortiment.
            </p>
          </div>

          <div className="mode__kategorien">
            {kategorien.map((k) => (
              <Link href="/demo/mode#serie" className="mode__kategorie zoom auf" key={k.id}>
                <Bild platz={k.bild} sizes="(max-width: 900px) 50vw, 25vw" />
                <span className="mode__kategorie-text">
                  <h3>{k.name}</h3>
                  <p>{k.text}</p>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mode__section mode__section--weiss" id="serie">
        <div className="demo__shell">
          <div className="mode__kopf auf">
            <div>
              <p className="mode__mini" style={{ color: "var(--grau)" }}>Serie 04</p>
              <h2 className="mode__display">Neu im Atelier</h2>
            </div>
            <p>
              Alle Teile der aktuellen Serie. Auflage zwischen 40 und 120 Stück, danach ist Schluss.
            </p>
          </div>

          <div className="mode__raster">
            {serie.map((p) => (
              <article className="mode__karte auf" key={p.slug}>
                <Link href={`/demo/mode/produkt/${p.slug}`} className="mode__karte-bild zoom">
                  {p.marker && <span className="mode__marker">{p.marker}</span>}
                  <Bild platz={p.bilder[0]!} sizes="(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw" />
                  <span className="mode__schnellwahl" aria-hidden="true">
                    {p.groessen.map((g) => (
                      <span key={g} data-weg={p.ausverkauft?.includes(g) ? "true" : undefined}>{g}</span>
                    ))}
                  </span>
                </Link>
                <div className="mode__karte-text">
                  <div className="mode__karte-zeile">
                    <h3>
                      <Link href={`/demo/mode/produkt/${p.slug}`}>{p.name}</Link>
                    </h3>
                    <span className="mode__preis">
                      {p.vorher && <span className="mode__vorher">{p.vorher},00 &euro;</span>}
                      {p.preis},00 &euro;
                    </span>
                  </div>
                  <p className="mode__karte-stoff">{p.stoff}</p>
                  <span className="mode__farbpunkte" aria-label={`${p.farben.length} Farben`}>
                    {p.farben.map((f) => <i key={f.name} style={{ background: f.wert }} />)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mode__section mode__section--tinte" id="material">
        <div className="demo__shell mode__editorial">
          <div className="auf">
            <Bild platz={BILD_EDITORIAL} sizes="(max-width: 900px) 100vw, 46vw" />
          </div>
          <div className="auf">
            <p className="mode__mini" style={{ color: "var(--sand)" }}>Material</p>
            <h2 className="mode__display">Wir kaufen den Stoff, bevor wir den Schnitt zeichnen.</h2>
            <p>
              Die meisten Marken entwerfen erst und suchen dann einen Stoff, der billig genug ist.
              Wir machen es umgekehrt: Wir kaufen jährlich bei vier Webereien ein und entwerfen
              danach, was sich daraus nähen lässt.
            </p>
            <dl className="mode__editorial-liste">
              <div><dt>Baumwolle</dt><dd>GOTS-zertifiziert, gestrickt in Vila Nova de Gaia</dd></div>
              <div><dt>Wolle</dt><dd>Mulesing-frei, gewebt in Biella und Bergamo</dd></div>
              <div><dt>Leinen</dt><dd>Angebaut und gewebt in Belgien</dd></div>
              <div><dt>Leder</dt><dd>Pflanzlich gegerbt, verarbeitet in Ubrique</dd></div>
            </dl>
            <Link href="/demo/mode#serie" className="mode__btn mode__btn--hell">Zur Serie</Link>
          </div>
        </div>
      </section>

      <div className="mode__versprechen">
        {VERSPRECHEN.map((v) => (
          <div key={v.titel} className="auf">
            <p className="mode__mini" style={{ color: "var(--sand)" }}>Service</p>
            <h3>{v.titel}</h3>
            <p>{v.text}</p>
          </div>
        ))}
      </div>

      <section className="mode__section mode__section--tinte">
        <div className="demo__shell mode__brief">
          <div>
            <p className="mode__mini" style={{ color: "var(--sand)" }}>Brief</p>
            <h2 className="mode__display">Sechs Mails im Jahr, nicht mehr.</h2>
            <p style={{ color: "rgba(246,245,242,0.7)", maxWidth: "44ch" }}>
              Wir schreiben, wenn eine Serie fertig ist. Keine Rabattaktionen, keine
              Countdown-Mails. Abmelden mit einem Klick.
            </p>
          </div>
          <form className="mode__brief-form" aria-label="Newsletter (Attrappe)">
            <input type="email" placeholder="Ihre E-Mail-Adresse" disabled aria-label="E-Mail-Adresse" />
            <button type="button" className="mode__btn mode__btn--hell demo__fake" disabled>
              Eintragen
            </button>
            <p className="demo__note" style={{ flexBasis: "100%", color: "rgba(246,245,242,0.55)" }}>
              Attrappe: Auf dieser Demo-Seite wird nichts versendet und nichts gespeichert.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
