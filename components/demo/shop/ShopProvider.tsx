"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  anzahlImKorb,
  entferneAusKorb,
  inDenKorb,
  leereKorb,
  leseZustand,
  LEERER_ZUSTAND,
  schalteFavorit,
  setzeMenge,
  SPEICHER_SCHLUESSEL,
  summeInCent,
  versandInCent,
  type Korbzeile,
  type ShopZustand,
} from "@/lib/shop-state";
import { produktBySlug } from "@/lib/demo-mode";

/**
 * Warenkorb und Merkliste des Demo-Shops.
 *
 * Die Rechenarbeit steckt in lib/shop-state.ts und ist dort geprüft; hier
 * kommt nur dazu, was React braucht: ein Kontext, die Ablage im Browser und
 * das Öffnen der Schublade.
 *
 * Der Zustand liegt im localStorage - er überlebt damit einen Seitenwechsel
 * und das Schließen des Tabs, verlässt aber nie das Gerät.
 */

type ShopApi = {
  zustand: ShopZustand;
  /** Bildpfad aus den Produktdaten auf die tatsächlich vorhandene Datei. */
  fotos: Record<string, string | null>;
  /** Erst nach dem ersten Rendern true. Vorher darf nichts vom Speicher abhängen. */
  bereit: boolean;
  anzahl: number;
  warenwert: number;
  versand: number;
  gesamt: number;
  istFavorit: (slug: string) => boolean;
  favorit: (slug: string) => void;
  hinzufuegen: (zeile: Omit<Korbzeile, "menge">, menge?: number) => void;
  menge: (zeile: Pick<Korbzeile, "slug" | "groesse" | "farbe">, menge: number) => void;
  entfernen: (zeile: Pick<Korbzeile, "slug" | "groesse" | "farbe">) => void;
  leeren: () => void;
  schubladeOffen: boolean;
  setSchubladeOffen: (offen: boolean) => void;
};

const Kontext = createContext<ShopApi | null>(null);

export function ShopProvider({
  children,
  fotos,
}: {
  children: React.ReactNode;
  /* Vom Server beim Bauen aufgelöst - im Browser gibt es kein Dateisystem. */
  fotos: Record<string, string | null>;
}) {
  const [zustand, setZustand] = useState<ShopZustand>(LEERER_ZUSTAND);
  const [bereit, setBereit] = useState(false);
  const [schubladeOffen, setSchubladeOffen] = useState(false);

  /* Server und erster Durchlauf im Browser müssen dasselbe ergeben, sonst
     meckert React. Deshalb wird der Speicher erst nach dem Mounten gelesen. */
  useEffect(() => {
    try {
      setZustand(leseZustand(window.localStorage.getItem(SPEICHER_SCHLUESSEL)));
    } catch {
      // Privater Modus oder blockierter Speicher: dann eben nur für diesen Besuch.
    }
    setBereit(true);
  }, []);

  useEffect(() => {
    if (!bereit) return;
    try {
      window.localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(zustand));
    } catch {
      // Speicher voll oder gesperrt - der Korb gilt dann nur für diesen Besuch.
    }
  }, [zustand, bereit]);

  /* Schublade schließt mit Escape. */
  useEffect(() => {
    if (!schubladeOffen) return;
    const zu = (e: KeyboardEvent) => e.key === "Escape" && setSchubladeOffen(false);
    window.addEventListener("keydown", zu);
    return () => window.removeEventListener("keydown", zu);
  }, [schubladeOffen]);

  const hinzufuegen = useCallback((zeile: Omit<Korbzeile, "menge">, menge = 1) => {
    setZustand((z) => inDenKorb(z, zeile, menge));
    setSchubladeOffen(true);
  }, []);

  const api = useMemo<ShopApi>(() => {
    const warenwert = summeInCent(zustand, (slug) => produktBySlug(slug)?.preis);
    const versand = versandInCent(warenwert);
    return {
      zustand,
      fotos,
      bereit,
      anzahl: anzahlImKorb(zustand),
      warenwert,
      versand,
      gesamt: warenwert + versand,
      istFavorit: (slug) => zustand.favoriten.includes(slug),
      favorit: (slug) => setZustand((z) => schalteFavorit(z, slug)),
      hinzufuegen,
      menge: (zeile, menge) => setZustand((z) => setzeMenge(z, zeile, menge)),
      entfernen: (zeile) => setZustand((z) => entferneAusKorb(z, zeile)),
      leeren: () => setZustand(leereKorb),
      schubladeOffen,
      setSchubladeOffen,
    };
  }, [zustand, fotos, bereit, schubladeOffen, hinzufuegen]);

  return <Kontext.Provider value={api}>{children}</Kontext.Provider>;
}

export function useShop(): ShopApi {
  const api = useContext(Kontext);
  if (!api) throw new Error("useShop braucht den ShopProvider aus dem Shop-Layout.");
  return api;
}
