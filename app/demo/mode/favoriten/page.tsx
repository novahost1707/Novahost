import type { Metadata } from "next";
import Link from "next/link";
import { FavoritenListe } from "@/components/demo/shop/FavoritenListe";

export const metadata: Metadata = {
  title: "Favoriten",
  description: "Gemerkte Teile - Demo-Projekt von Novahost.",
};

export default function FavoritenSeite() {
  return (
    <>
      <div className="demo__shell">
        <div className="shop__seitenkopf">
          <nav className="shop__krumen shop__mini" aria-label="Pfad">
            <Link href="/demo/mode">Shop</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Favoriten</span>
          </nav>
          <h1 className="shop__display">Favoriten</h1>
          <p>Was Sie sich gemerkt haben. Gespeichert auf diesem Gerät, nicht in einem Konto.</p>
        </div>
      </div>

      <section className="shop__section shop__section--schmal">
        <div className="demo__shell">
          <FavoritenListe />
        </div>
      </section>
    </>
  );
}
