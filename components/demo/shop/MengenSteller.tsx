"use client";

import { MAX_MENGE } from "@/lib/shop-state";

/** Menge erhöhen, verringern - bei eins abwärts wird die Position entfernt. */
export function MengenSteller({
  menge,
  aendern,
  entfernen,
  name,
}: {
  menge: number;
  aendern: (menge: number) => void;
  entfernen: () => void;
  name: string;
}) {
  return (
    <div className="shop__menge">
      <button
        type="button"
        onClick={() => (menge <= 1 ? entfernen() : aendern(menge - 1))}
        aria-label={menge <= 1 ? `${name} entfernen` : `Menge von ${name} verringern`}
      >
        &minus;
      </button>
      <span aria-live="polite" aria-label={`Menge ${menge}`}>{menge}</span>
      <button
        type="button"
        onClick={() => aendern(menge + 1)}
        disabled={menge >= MAX_MENGE}
        aria-label={`Menge von ${name} erhöhen`}
      >
        +
      </button>
    </div>
  );
}
