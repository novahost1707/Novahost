"use client";

import Link from "next/link";
import { useShop } from "@/components/demo/shop/ShopProvider";

/**
 * Die beiden Zaehler in der Kopfleiste.
 *
 * Auf schmalen Schirmen ist kein Platz fuer die Woerter "Favoriten" und
 * "Warenkorb" - dann bleibt das Zeichen stehen. Ohne Zeichen waeren dort zwei
 * gleich aussehende Zahlen, und niemand wuesste, welche welche ist.
 */

function HerzZeichen() {
  return (
    <svg className="shop__knopf-zeichen" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20s-7.5-4.7-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.3 12 20 12 20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BeutelZeichen() {
  return (
    <svg className="shop__knopf-zeichen" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 8h12l1 12H5L6 8Zm3 0V6.5a3 3 0 0 1 6 0V8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Warenkorbzähler in der Kopfzeile. Öffnet die Schublade. */
export function KorbKnopf() {
  const { anzahl, bereit, setSchubladeOffen } = useShop();
  return (
    <button
      type="button"
      className="shop__korb-knopf shop__mini"
      onClick={() => setSchubladeOffen(true)}
      aria-label={`Warenkorb, ${bereit ? anzahl : 0} Teile`}
    >
      <BeutelZeichen />
      <span className="shop__knopf-wort">Warenkorb</span>
      <b data-leer={bereit && anzahl === 0 ? "true" : undefined}>{bereit ? anzahl : 0}</b>
    </button>
  );
}

/** Merklistenzähler in der Kopfzeile. Führt auf die Merkliste. */
export function FavoritenKnopf() {
  const { zustand, bereit } = useShop();
  const n = bereit ? zustand.favoriten.length : 0;
  return (
    <Link
      href="/demo/mode/favoriten"
      className="shop__korb-knopf shop__mini"
      aria-label={`Favoriten, ${n} Teile`}
    >
      <HerzZeichen />
      <span className="shop__knopf-wort">Favoriten</span>
      <b data-leer={n === 0 ? "true" : undefined}>{n}</b>
    </Link>
  );
}
