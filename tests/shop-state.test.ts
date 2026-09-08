import { describe, expect, it } from "vitest";
import {
  anzahlImKorb,
  entferneAusKorb,
  formatEuro,
  inDenKorb,
  leereKorb,
  leseZustand,
  LEERER_ZUSTAND,
  MAX_MENGE,
  preisInCent,
  schalteFavorit,
  setzeMenge,
  summeInCent,
  versandInCent,
  type ShopZustand,
} from "@/lib/shop-state";

const hoodie = { slug: "hoodie-werft", groesse: "M", farbe: "Beton" };
const shirt = { slug: "tee-basis", groesse: "L", farbe: "Kreide" };
const preise: Record<string, string> = { "hoodie-werft": "129", "tee-basis": "49,50" };
const preisVon = (slug: string) => preise[slug];

describe("Warenkorb", () => {
  it("legt eine neue Position an", () => {
    const z = inDenKorb(LEERER_ZUSTAND, hoodie);
    expect(z.korb).toHaveLength(1);
    expect(z.korb[0]).toMatchObject({ ...hoodie, menge: 1 });
  });

  it("zählt dieselbe Position hoch statt sie zu verdoppeln", () => {
    let z = inDenKorb(LEERER_ZUSTAND, hoodie);
    z = inDenKorb(z, hoodie, 2);
    expect(z.korb).toHaveLength(1);
    expect(z.korb[0]!.menge).toBe(3);
  });

  it("führt dieselbe Ware in zwei Größen als zwei Positionen", () => {
    let z = inDenKorb(LEERER_ZUSTAND, hoodie);
    z = inDenKorb(z, { ...hoodie, groesse: "L" });
    expect(z.korb).toHaveLength(2);
  });

  it("unterscheidet auch nach Farbe", () => {
    let z = inDenKorb(LEERER_ZUSTAND, hoodie);
    z = inDenKorb(z, { ...hoodie, farbe: "Schwarz" });
    expect(z.korb).toHaveLength(2);
  });

  it("begrenzt die Menge nach oben", () => {
    const z = inDenKorb(LEERER_ZUSTAND, hoodie, 99);
    expect(z.korb[0]!.menge).toBe(MAX_MENGE);
    expect(setzeMenge(z, hoodie, 99).korb[0]!.menge).toBe(MAX_MENGE);
  });

  it("ändert die Menge einer Position", () => {
    const z = setzeMenge(inDenKorb(LEERER_ZUSTAND, hoodie), hoodie, 4);
    expect(z.korb[0]!.menge).toBe(4);
  });

  it("entfernt die Position, wenn die Menge unter eins fällt", () => {
    const z = setzeMenge(inDenKorb(LEERER_ZUSTAND, hoodie), hoodie, 0);
    expect(z.korb).toHaveLength(0);
  });

  it("entfernt eine Position gezielt und lässt die andere stehen", () => {
    let z = inDenKorb(LEERER_ZUSTAND, hoodie);
    z = inDenKorb(z, shirt);
    z = entferneAusKorb(z, hoodie);
    expect(z.korb).toHaveLength(1);
    expect(z.korb[0]!.slug).toBe("tee-basis");
  });

  it("leert den Korb, ohne die Merkliste anzutasten", () => {
    let z = schalteFavorit(inDenKorb(LEERER_ZUSTAND, hoodie), "mantel-fjord");
    z = leereKorb(z);
    expect(z.korb).toHaveLength(0);
    expect(z.favoriten).toEqual(["mantel-fjord"]);
  });

  it("zählt alle Stücke, nicht nur die Positionen", () => {
    let z = inDenKorb(LEERER_ZUSTAND, hoodie, 3);
    z = inDenKorb(z, shirt, 2);
    expect(anzahlImKorb(z)).toBe(5);
  });
});

describe("Preise", () => {
  it("rechnet Preise mit und ohne Nachkommastelle", () => {
    expect(preisInCent("129")).toBe(12900);
    expect(preisInCent("49,50")).toBe(4950);
    expect(preisInCent("8,05")).toBe(805);
  });

  it("bildet die Summe über Mengen", () => {
    let z = inDenKorb(LEERER_ZUSTAND, hoodie, 2);
    z = inDenKorb(z, shirt, 1);
    expect(summeInCent(z, preisVon)).toBe(12900 * 2 + 4950);
  });

  it("ändert die Summe, wenn sich die Menge ändert", () => {
    const z = inDenKorb(LEERER_ZUSTAND, hoodie, 1);
    expect(summeInCent(z, preisVon)).toBe(12900);
    expect(summeInCent(setzeMenge(z, hoodie, 3), preisVon)).toBe(38700);
  });

  it("überspringt Artikel ohne bekannten Preis", () => {
    const z = inDenKorb(LEERER_ZUSTAND, { slug: "gibtsnicht", groesse: "M", farbe: "X" });
    expect(summeInCent(z, preisVon)).toBe(0);
  });

  it("formatiert deutsche Beträge", () => {
    expect(formatEuro(12900)).toBe("129,00 €");
    expect(formatEuro(4950)).toBe("49,50 €");
  });

  it("berechnet den Versand nach Warenwert", () => {
    expect(versandInCent(0)).toBe(0);
    expect(versandInCent(4900)).toBe(495);
    expect(versandInCent(8000)).toBe(0);
    expect(versandInCent(12900)).toBe(0);
  });
});

describe("Merkliste", () => {
  it("nimmt auf und entfernt wieder", () => {
    let z = schalteFavorit(LEERER_ZUSTAND, "mantel-fjord");
    expect(z.favoriten).toEqual(["mantel-fjord"]);
    z = schalteFavorit(z, "mantel-fjord");
    expect(z.favoriten).toEqual([]);
  });

  it("hält mehrere Artikel", () => {
    let z = schalteFavorit(LEERER_ZUSTAND, "a");
    z = schalteFavorit(z, "b");
    expect(z.favoriten).toEqual(["a", "b"]);
  });
});

describe("Gespeicherter Zustand", () => {
  it("gibt bei fehlendem Eintrag einen leeren Zustand", () => {
    expect(leseZustand(null)).toEqual(LEERER_ZUSTAND);
  });

  it("übersteht beschädigten Inhalt", () => {
    expect(leseZustand("kein json")).toEqual(LEERER_ZUSTAND);
    expect(leseZustand('{"korb":"quatsch"}')).toEqual(LEERER_ZUSTAND);
  });

  it("wirft unvollständige Zeilen weg", () => {
    const roh = JSON.stringify({ korb: [{ slug: "a" }, { slug: "b", groesse: "M", farbe: "X", menge: 2 }], favoriten: ["c", 7] });
    const z: ShopZustand = leseZustand(roh);
    expect(z.korb).toHaveLength(1);
    expect(z.favoriten).toEqual(["c"]);
  });

  it("begrenzt gespeicherte Mengen", () => {
    const roh = JSON.stringify({ korb: [{ slug: "a", groesse: "M", farbe: "X", menge: 999 }], favoriten: [] });
    expect(leseZustand(roh).korb[0]!.menge).toBe(MAX_MENGE);
  });
});
