/**
 * Zustand des Demo-Shops: Warenkorb und Merkliste.
 *
 * Bewusst reine Funktionen ohne React. Der Anbieter in
 * components/demo/shop/ShopProvider.tsx ist nur eine dünne Hülle darum -
 * dadurch lässt sich die Logik hier unabhängig prüfen, und genau das
 * passiert in tests/shop-state.test.ts.
 */

export type Korbzeile = {
  slug: string;
  groesse: string;
  farbe: string;
  menge: number;
};

export type ShopZustand = {
  korb: Korbzeile[];
  favoriten: string[];
};

export const LEERER_ZUSTAND: ShopZustand = { korb: [], favoriten: [] };

/** Höchstmenge je Zeile - schützt vor Vertippern im Mengenfeld. */
export const MAX_MENGE = 10;

/**
 * Zwei Zeilen sind dieselbe Position, wenn Artikel, Größe und Farbe
 * übereinstimmen. Ein Shirt in M und dasselbe in L sind zwei Positionen.
 */
function gleich(a: Korbzeile, b: Pick<Korbzeile, "slug" | "groesse" | "farbe">): boolean {
  return a.slug === b.slug && a.groesse === b.groesse && a.farbe === b.farbe;
}

export function zeilenSchluessel(zeile: Pick<Korbzeile, "slug" | "groesse" | "farbe">): string {
  return `${zeile.slug}|${zeile.groesse}|${zeile.farbe}`;
}

export function inDenKorb(zustand: ShopZustand, zeile: Omit<Korbzeile, "menge">, menge = 1): ShopZustand {
  const vorhanden = zustand.korb.find((z) => gleich(z, zeile));
  if (vorhanden) {
    return {
      ...zustand,
      korb: zustand.korb.map((z) =>
        gleich(z, zeile) ? { ...z, menge: Math.min(MAX_MENGE, z.menge + menge) } : z,
      ),
    };
  }
  return { ...zustand, korb: [...zustand.korb, { ...zeile, menge: Math.min(MAX_MENGE, menge) }] };
}

/** Setzt die Menge. Null oder weniger entfernt die Position. */
export function setzeMenge(
  zustand: ShopZustand,
  zeile: Pick<Korbzeile, "slug" | "groesse" | "farbe">,
  menge: number,
): ShopZustand {
  if (menge < 1) return entferneAusKorb(zustand, zeile);
  return {
    ...zustand,
    korb: zustand.korb.map((z) => (gleich(z, zeile) ? { ...z, menge: Math.min(MAX_MENGE, menge) } : z)),
  };
}

export function entferneAusKorb(
  zustand: ShopZustand,
  zeile: Pick<Korbzeile, "slug" | "groesse" | "farbe">,
): ShopZustand {
  return { ...zustand, korb: zustand.korb.filter((z) => !gleich(z, zeile)) };
}

export function leereKorb(zustand: ShopZustand): ShopZustand {
  return { ...zustand, korb: [] };
}

export function schalteFavorit(zustand: ShopZustand, slug: string): ShopZustand {
  const drin = zustand.favoriten.includes(slug);
  return {
    ...zustand,
    favoriten: drin ? zustand.favoriten.filter((s) => s !== slug) : [...zustand.favoriten, slug],
  };
}

export function anzahlImKorb(zustand: ShopZustand): number {
  return zustand.korb.reduce((summe, z) => summe + z.menge, 0);
}

/**
 * Summe in Cent, damit sich beim Rechnen keine Nachkommastellen verlieren.
 * Preise stehen als "129" oder "89,50" in den Produktdaten.
 */
export function preisInCent(preis: string): number {
  const [euro, cent = "0"] = preis.replace(/\s/g, "").split(",");
  return Number(euro) * 100 + Number(cent.padEnd(2, "0").slice(0, 2));
}

export function formatEuro(cent: number): string {
  return `${(cent / 100).toFixed(2).replace(".", ",")} €`;
}

export function summeInCent(
  zustand: ShopZustand,
  preisVon: (slug: string) => string | undefined,
): number {
  return zustand.korb.reduce((summe, z) => {
    const preis = preisVon(z.slug);
    return preis ? summe + preisInCent(preis) * z.menge : summe;
  }, 0);
}

/** Versandkosten: ab dieser Summe entfällt der Versand. */
export const VERSANDFREI_AB_CENT = 8000;
export const VERSAND_CENT = 495;

export function versandInCent(warenwert: number): number {
  if (warenwert === 0) return 0;
  return warenwert >= VERSANDFREI_AB_CENT ? 0 : VERSAND_CENT;
}

/* --- Speicherung im Browser ---------------------------------------------- */

export const SPEICHER_SCHLUESSEL = "arvo:shop";

export function leseZustand(roh: string | null): ShopZustand {
  if (!roh) return LEERER_ZUSTAND;
  try {
    const daten = JSON.parse(roh) as Partial<ShopZustand>;
    const korb = Array.isArray(daten.korb)
      ? daten.korb
          .filter(
            (z): z is Korbzeile =>
              !!z && typeof z.slug === "string" && typeof z.groesse === "string" &&
              typeof z.farbe === "string" && Number.isFinite(z.menge),
          )
          .map((z) => ({ ...z, menge: Math.max(1, Math.min(MAX_MENGE, Math.round(z.menge))) }))
      : [];
    const favoriten = Array.isArray(daten.favoriten)
      ? daten.favoriten.filter((s): s is string => typeof s === "string")
      : [];
    return { korb, favoriten };
  } catch {
    // Beschädigter oder fremder Inhalt: lieber leer starten als abstürzen.
    return LEERER_ZUSTAND;
  }
}
