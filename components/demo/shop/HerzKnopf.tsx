"use client";

import { useShop } from "@/components/demo/shop/ShopProvider";

/**
 * Merken-Schalter an Produktkarte und Produktseite.
 *
 * Der Zustand kommt aus dem Speicher, wird aber erst nach dem Mounten
 * angezeigt - sonst blitzt beim Laden ein leeres Herz auf, obwohl der Artikel
 * gemerkt ist.
 */
export function HerzKnopf({ slug, name, gross = false }: { slug: string; name: string; gross?: boolean }) {
  const { istFavorit, favorit, bereit } = useShop();
  const gemerkt = bereit && istFavorit(slug);

  return (
    <button
      type="button"
      className="shop__herz"
      data-gross={gross || undefined}
      data-aktiv={gemerkt || undefined}
      aria-pressed={gemerkt}
      aria-label={gemerkt ? `${name} aus den Favoriten entfernen` : `${name} zu den Favoriten`}
      title={gemerkt ? "Aus den Favoriten entfernen" : "Merken"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        favorit(slug);
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.5 4.3 13a5 5 0 0 1 7.1-7l.6.6.6-.6a5 5 0 1 1 7.1 7z" />
      </svg>
    </button>
  );
}
