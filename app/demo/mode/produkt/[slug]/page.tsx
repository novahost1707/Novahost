import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bild } from "@/components/demo/Bild";
import { KaufBereich } from "@/components/demo/shop/KaufBereich";
import { ProduktRaster } from "@/components/demo/shop/ProduktRaster";
import { kategorieById, passtDazu, produkte, produktBySlug } from "@/lib/demo-mode";

/**
 * Produktseite.
 *
 * Aufbau wie im echten Handel: Bildstrecke links, Kaufentscheidung rechts und
 * dort mitlaufend, Details im Akkordeon statt in einer Textwand, darunter
 * passende Teile. Farbe, Größe und Menge sind echte Bedienelemente - was hier
 * in den Korb wandert, liegt danach wirklich drin.
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

  const kategorie = kategorieById(produkt.kategorie);
  const weitere = passtDazu(produkt.slug);

  return (
    <>
      <div className="demo__shell">
        <nav className="shop__krumen shop__mini" aria-label="Pfad" style={{ paddingTop: "26px", marginBottom: 0 }}>
          <Link href="/demo/mode">Shop</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/demo/mode/kategorie/${produkt.kategorie}`}>{kategorie?.name}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{produkt.name}</span>
        </nav>

        <div className="shop__pdp">
          <div className="shop__pdp-bilder">
            {produkt.bilder.map((b, i) => (
              <Bild key={b.src} platz={b} sizes="(max-width: 900px) 100vw, 55vw" priority={i === 0} />
            ))}
          </div>

          <div className="shop__pdp-info">
            <KaufBereich produkt={produkt} />

            <div className="shop__akkordeon">
              <details open>
                <summary>Beschreibung</summary>
                <div className="shop__akkordeon-text">
                  {produkt.beschreibung.map((absatz) => (
                    <p key={absatz} style={{ marginBottom: "10px" }}>{absatz}</p>
                  ))}
                </div>
              </details>
              {produkt.details.map((d) => (
                <details key={d.titel}>
                  <summary>{d.titel}</summary>
                  <div className="shop__akkordeon-text">{d.text}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="shop__section shop__section--weiss">
        <div className="demo__shell">
          <div className="shop__kopf">
            <div>
              <p className="shop__mini" style={{ color: "var(--grau)" }}>Passt dazu</p>
              <h2 className="shop__display">Aus derselben Serie</h2>
            </div>
            <Link href={`/demo/mode/kategorie/${produkt.kategorie}`} className="shop__mini">
              Alle {kategorie?.kurz} &#8594;
            </Link>
          </div>
          <ProduktRaster produkte={weitere} sizes="(max-width: 760px) 50vw, 25vw" />
        </div>
      </section>
    </>
  );
}
