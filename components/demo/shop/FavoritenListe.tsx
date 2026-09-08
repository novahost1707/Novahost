"use client";

import Link from "next/link";
import { ProduktRaster } from "@/components/demo/shop/ProduktRaster";
import { useShop } from "@/components/demo/shop/ShopProvider";
import { produktBySlug } from "@/lib/demo-mode";

/**
 * Merkliste.
 *
 * Solange der Speicher noch nicht gelesen ist, steht hier nichts - weder
 * Liste noch "leer". Sonst blitzt der leere Zustand auf, obwohl gemerkte
 * Teile vorhanden sind, und das wirkt wie ein Datenverlust.
 */
export function FavoritenListe() {
  const { zustand, bereit } = useShop();
  const produkte = zustand.favoriten.map((s) => produktBySlug(s)).filter((p) => p !== undefined);

  if (!bereit) return <div style={{ minHeight: "40vh" }} aria-busy="true" />;

  if (produkte.length === 0) {
    return (
      <div className="shop__leer" style={{ minHeight: "44vh" }}>
        <svg className="shop__leer-zeichen" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20.5 4.3 13a5 5 0 0 1 7.1-7l.6.6.6-.6a5 5 0 1 1 7.1 7z" />
        </svg>
        <p className="shop__leer-titel">Noch nichts gemerkt.</p>
        <p>
          Tippen Sie an einem Teil auf das Herz, dann landet es hier. Die Merkliste bleibt auf
          diesem Gerät gespeichert - auch wenn Sie später wiederkommen.
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/demo/mode/damen" className="shop__btn">Damen ansehen</Link>
          <Link href="/demo/mode/herren" className="shop__btn shop__btn--leer">Herren ansehen</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="shop__kopf">
        <div>
          <p className="shop__mini" style={{ color: "var(--grau)" }}>Gemerkt</p>
          <h2 className="shop__display">{produkte.length} {produkte.length === 1 ? "Teil" : "Teile"}</h2>
        </div>
        <p>Zum Entfernen erneut auf das Herz tippen. Die Liste bleibt auf diesem Gerät.</p>
      </div>
      <ProduktRaster produkte={produkte} />
    </>
  );
}
