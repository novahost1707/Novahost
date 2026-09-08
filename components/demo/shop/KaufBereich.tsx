"use client";

import { useState } from "react";
import { HerzKnopf } from "@/components/demo/shop/HerzKnopf";
import { MengenSteller } from "@/components/demo/shop/MengenSteller";
import { useShop } from "@/components/demo/shop/ShopProvider";
import { rabattProzent, type Produkt } from "@/lib/demo-mode";
import { MAX_MENGE } from "@/lib/shop-state";

/**
 * Kaufentscheidung auf der Produktseite: Farbe, Größe, Menge, in den Korb.
 *
 * Ohne gewählte Größe bleibt der Knopf gesperrt und sagt auch, warum - das
 * ist verlässlicher als ein Knopf, der nichts tut. Nach dem Hinzufügen öffnet
 * sich die Schublade, damit die Aktion sichtbar ankommt.
 */
export function KaufBereich({ produkt }: { produkt: Produkt }) {
  const { hinzufuegen } = useShop();
  const verfuegbar = produkt.groessen.filter((g) => !produkt.ausverkauft?.includes(g));
  const einzelgroesse = produkt.groessen.length === 1;

  const [farbe, setFarbe] = useState(produkt.farben[0]!.name);
  const [groesse, setGroesse] = useState<string | null>(einzelgroesse ? verfuegbar[0] ?? null : null);
  const [menge, setMenge] = useState(1);

  const rabatt = rabattProzent(produkt);

  return (
    <div className="shop__kauf">
      <div>
        {rabatt ? (
          <p className="shop__mini shop__mini--sale">Reduziert um {rabatt} %</p>
        ) : produkt.marker ? (
          <p className="shop__mini" style={{ color: "var(--sand)" }}>{produkt.marker}</p>
        ) : null}
        <div className="shop__pdp-titelzeile">
          <h1 className="shop__display">{produkt.name}</h1>
          <HerzKnopf slug={produkt.slug} name={produkt.name} gross />
        </div>
        <p className="shop__pdp-preis shop__preis">
          {produkt.vorher && <span className="shop__vorher">{produkt.vorher},00 &euro;</span>}
          <span data-reduziert={produkt.vorher ? "true" : undefined}>{produkt.preis},00 &euro;</span>
        </p>
        <p className="shop__pdp-kurz">{produkt.kurz}</p>
      </div>

      <div className="shop__wahl">
        <div className="shop__wahl-kopf">
          <span className="shop__mini">Farbe</span>
          <span>{farbe}</span>
        </div>
        <div className="shop__farbwahl">
          {produkt.farben.map((f) => (
            <label key={f.name} title={f.name}>
              <input
                type="radio"
                name="farbe"
                checked={farbe === f.name}
                onChange={() => setFarbe(f.name)}
              />
              <i style={{ background: f.wert }} />
              <span className="vh">{f.name}</span>
            </label>
          ))}
        </div>
      </div>

      {!einzelgroesse && (
        <div className="shop__wahl">
          <div className="shop__wahl-kopf">
            <span className="shop__mini">Größe</span>
            <span>{verfuegbar.length} von {produkt.groessen.length} verfügbar</span>
          </div>
          <div className="shop__groessen">
            {produkt.groessen.map((g) => {
              const weg = produkt.ausverkauft?.includes(g) ?? false;
              return (
                <label key={g}>
                  <input
                    type="radio"
                    name="groesse"
                    disabled={weg}
                    checked={groesse === g}
                    onChange={() => setGroesse(g)}
                  />
                  <span>{g}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <div className="shop__wahl">
        <div className="shop__wahl-kopf">
          <span className="shop__mini">Menge</span>
          {menge >= MAX_MENGE && <span>Mehr auf Anfrage</span>}
        </div>
        <MengenSteller
          menge={menge}
          name={produkt.name}
          aendern={setMenge}
          entfernen={() => setMenge(1)}
        />
      </div>

      <div>
        <button
          type="button"
          className="shop__btn shop__btn--voll"
          disabled={!groesse}
          onClick={() => groesse && hinzufuegen({ slug: produkt.slug, groesse, farbe }, menge)}
        >
          {groesse ? "In den Warenkorb" : "Bitte Größe wählen"}
        </button>
        <p className="shop__lieferhinweis">
          Versandkostenfrei ab 80 € &middot; Lieferung in 2 bis 4 Werktagen &middot; 30 Tage Rückgabe
        </p>
      </div>
    </div>
  );
}
