import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bild } from "@/components/demo/Bild";
import { passtDazu, produkte, produktBySlug } from "@/lib/demo-mode";

/**
 * Produktseite des Demo-Shops.
 *
 * Aufbau wie im echten Handel: Bildstrecke links, Kaufentscheidung rechts und
 * dort mitlaufend, Details im Akkordeon statt in einer Textwand, darunter
 * passende Teile. Farb- und Größenwahl funktionieren als Bedienelemente -
 * abgeschickt wird nichts, und das steht auch da.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return produkte.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const produkt = produktBySlug((await params).slug);
  if (!produkt) return { title: "Nicht gefunden" };
  return { title: produkt.name, description: produkt.kurz };
}

export default async function ProduktSeite({ params }: { params: Promise<Params> }) {
  const produkt = produktBySlug((await params).slug);
  if (!produkt) notFound();

  const weitere = passtDazu(produkt.slug);
  const verfuegbar = produkt.groessen.filter((g) => !produkt.ausverkauft?.includes(g));

  return (
    <>
      <div className="demo__shell">
        <nav className="mode__krumen mode__mini" aria-label="Pfad">
          <Link href="/demo/mode">Shop</Link>
          <span aria-hidden="true">/</span>
          <Link href="/demo/mode#kategorien">{kategorieName(produkt.kategorie)}</Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: "var(--tinte)" }}>{produkt.name}</span>
        </nav>

        <div className="mode__pdp">
          <div className="mode__pdp-bilder">
            {produkt.bilder.map((b, i) => (
              <Bild
                key={b.src}
                platz={b}
                sizes="(max-width: 900px) 100vw, 55vw"
                priority={i === 0}
              />
            ))}
          </div>

          <div className="mode__pdp-info">
            <div>
              {produkt.marker && <p className="mode__mini" style={{ color: "var(--sand)" }}>{produkt.marker}</p>}
              <h1 className="mode__display">{produkt.name}</h1>
              <p className="mode__pdp-preis mode__preis" style={{ marginTop: "10px" }}>
                {produkt.vorher && <span className="mode__vorher">{produkt.vorher},00 &euro;</span>}
                {produkt.preis},00 &euro;
              </p>
              <p className="mode__pdp-kurz" style={{ marginTop: "12px" }}>{produkt.kurz}</p>
            </div>

            <div className="mode__wahl">
              <div className="mode__wahl-kopf">
                <span className="mode__mini">Farbe</span>
                <span>{produkt.farben[0]!.name}</span>
              </div>
              <div className="mode__farbwahl">
                {produkt.farben.map((f, i) => (
                  <label key={f.name} title={f.name}>
                    <input type="radio" name="farbe" defaultChecked={i === 0} />
                    <i style={{ background: f.wert }} />
                    <span className="vh">{f.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mode__wahl">
              <div className="mode__wahl-kopf">
                <span className="mode__mini">Größe</span>
                <span>{verfuegbar.length} von {produkt.groessen.length} verfügbar</span>
              </div>
              <div className="mode__groessen">
                {produkt.groessen.map((g) => {
                  const weg = produkt.ausverkauft?.includes(g) ?? false;
                  return (
                    <label key={g}>
                      <input type="radio" name="groesse" disabled={weg} defaultChecked={g === verfuegbar[0]} />
                      <span>{g}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <button type="button" className="mode__btn mode__btn--voll demo__fake" disabled>
                In den Warenkorb
              </button>
              <p className="demo__note" style={{ marginTop: "10px" }}>
                Attrappe: Auf dieser Demo-Seite lässt sich nichts bestellen.
              </p>
            </div>

            <div className="mode__akkordeon">
              <details open>
                <summary>Beschreibung</summary>
                <div className="mode__akkordeon-text">
                  {produkt.beschreibung.map((absatz) => (
                    <p key={absatz} style={{ marginBottom: "10px" }}>{absatz}</p>
                  ))}
                </div>
              </details>
              {produkt.details.map((d) => (
                <details key={d.titel}>
                  <summary>{d.titel}</summary>
                  <div className="mode__akkordeon-text">{d.text}</div>
                </details>
              ))}
              <details>
                <summary>Versand &amp; Rückgabe</summary>
                <div className="mode__akkordeon-text">
                  Versandkostenfrei ab 80 € innerhalb Deutschlands, Lieferung in zwei bis vier
                  Werktagen. Rückgabe innerhalb von 30 Tagen, ungetragen und mit Etikett. Das
                  Rücksendeetikett liegt bei.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      <section className="mode__section mode__section--weiss">
        <div className="demo__shell">
          <div className="mode__kopf">
            <div>
              <p className="mode__mini" style={{ color: "var(--grau)" }}>Passt dazu</p>
              <h2 className="mode__display">Aus derselben Serie</h2>
            </div>
            <Link href="/demo/mode#serie" className="mode__mini">Alle Teile &#8594;</Link>
          </div>
          <div className="mode__raster">
            {weitere.map((p) => (
              <article className="mode__karte" key={p.slug}>
                <Link href={`/demo/mode/produkt/${p.slug}`} className="mode__karte-bild zoom">
                  {p.marker && <span className="mode__marker">{p.marker}</span>}
                  <Bild platz={p.bilder[0]!} sizes="(max-width: 760px) 50vw, 25vw" />
                </Link>
                <div className="mode__karte-text">
                  <div className="mode__karte-zeile">
                    <h3><Link href={`/demo/mode/produkt/${p.slug}`}>{p.name}</Link></h3>
                    <span className="mode__preis">{p.preis},00 &euro;</span>
                  </div>
                  <p className="mode__karte-stoff">{p.stoff}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function kategorieName(id: string): string {
  return { oberteile: "Oberteile", hosen: "Hosen", outerwear: "Outerwear", accessoires: "Accessoires" }[id] ?? id;
}
