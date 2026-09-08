import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProduktRaster } from "@/components/demo/shop/ProduktRaster";
import { kategorien, kategorieById, nachKategorie } from "@/lib/demo-mode";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return kategorien.map((k) => ({ slug: k.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const k = kategorieById((await params).slug);
  if (!k) return { title: "Nicht gefunden" };
  return { title: k.name, description: `${k.name} von ARVO: ${k.text} Demo-Projekt von Novahost.` };
}

/** Eine Seite je Kategorie. Die Filterreihe führt zu den Nachbarkategorien. */
export default async function KategorieSeite({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const kategorie = kategorieById(slug);
  if (!kategorie) notFound();

  const produkte = nachKategorie(kategorie.id);

  return (
    <>
      <div className="demo__shell">
        <div className="shop__seitenkopf">
          <nav className="shop__krumen shop__mini" aria-label="Pfad">
            <Link href="/demo/mode">Shop</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{kategorie.name}</span>
          </nav>
          <div className="shop__seitenkopf-zeile">
            <div>
              <h1 className="shop__display">{kategorie.name}</h1>
              <p>{kategorie.text}</p>
            </div>
            <span className="shop__anzahl">{produkte.length} Teile</span>
          </div>
          <div className="shop__filter">
            <Link href="/demo/mode/damen">Damen</Link>
            <Link href="/demo/mode/herren">Herren</Link>
            {kategorien.map((k) => (
              <Link
                key={k.id}
                href={`/demo/mode/kategorie/${k.id}`}
                aria-current={k.id === kategorie.id ? "page" : undefined}
              >
                {k.kurz}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="shop__section shop__section--schmal">
        <div className="demo__shell">
          <ProduktRaster produkte={produkte} />
        </div>
      </section>
    </>
  );
}
