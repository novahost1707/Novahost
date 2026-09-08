"use client";

import Link from "next/link";
import { ShopBild } from "@/components/demo/shop/ShopBild";
import { MengenSteller } from "@/components/demo/shop/MengenSteller";
import { useShop } from "@/components/demo/shop/ShopProvider";
import { produktBySlug } from "@/lib/demo-mode";
import { formatEuro, preisInCent, VERSANDFREI_AB_CENT } from "@/lib/shop-state";

/**
 * Ausführliche Warenkorbseite.
 *
 * Hier kann alles, was die Schublade nur andeutet: Menge ändern, Positionen
 * einzeln entfernen, Versandkosten und Gesamtsumme sehen. Die Summe rechnet
 * bei jeder Änderung neu - das ist der Unterschied zwischen einem Warenkorb
 * und einem Bild von einem Warenkorb.
 */
export function KorbSeite() {
  const { zustand, bereit, menge, entfernen, leeren, warenwert, versand, gesamt, anzahl } = useShop();
  const zeilen = zustand.korb
    .map((z) => ({ ...z, produkt: produktBySlug(z.slug) }))
    .filter((z): z is typeof z & { produkt: NonNullable<typeof z.produkt> } => Boolean(z.produkt));

  if (!bereit) return <div style={{ minHeight: "40vh" }} aria-busy="true" />;

  if (zeilen.length === 0) {
    return (
      <div className="shop__leer" style={{ minHeight: "44vh" }}>
        <svg className="shop__leer-zeichen" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h16l-1.5 12.5A2 2 0 0 1 16.5 20h-9a2 2 0 0 1-2-1.5z" />
          <path d="M9 6V4.5a3 3 0 0 1 6 0V6" />
        </svg>
        <p className="shop__leer-titel">Ihr Warenkorb ist leer.</p>
        <p>
          Noch nichts ausgesucht. Die aktuelle Serie umfasst achtzehn Teile - fangen Sie
          bei den Sweats an, die tragen wir selbst am häufigsten.
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/demo/mode/kategorie/sweats" className="shop__btn">Sweats &amp; Strick</Link>
          <Link href="/demo/mode/sale" className="shop__btn shop__btn--leer">Sale ansehen</Link>
        </div>
      </div>
    );
  }

  const fehlt = VERSANDFREI_AB_CENT - warenwert;

  return (
    <div className="shop__korbseite">
      <div>
        <div className="shop__korbtabelle">
          {zeilen.map((z) => (
            <article className="shop__korbposten" key={`${z.slug}|${z.groesse}|${z.farbe}`}>
              <Link href={`/demo/mode/produkt/${z.slug}`} className="zoom">
                <ShopBild platz={z.produkt.bilder[0]!} sizes="118px" />
              </Link>

              <div>
                <h3>
                  <Link href={`/demo/mode/produkt/${z.slug}`}>{z.produkt.name}</Link>
                </h3>
                <div className="shop__korbposten-daten">
                  <span>Farbe: {z.farbe}</span>
                  <span>Größe: {z.groesse}</span>
                  <span className="shop__einzelpreis">Einzelpreis {formatEuro(preisInCent(z.produkt.preis))}</span>
                </div>
                <MengenSteller
                  menge={z.menge}
                  name={z.produkt.name}
                  aendern={(m) => menge(z, m)}
                  entfernen={() => entfernen(z)}
                />
              </div>

              <div className="shop__korbposten-rechts">
                <span className="shop__preis" style={{ fontSize: "17px" }}>
                  {formatEuro(preisInCent(z.produkt.preis) * z.menge)}
                </span>
                <button type="button" className="shop__weg" onClick={() => entfernen(z)}>
                  Entfernen
                </button>
              </div>
            </article>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", marginTop: "22px", flexWrap: "wrap" }}>
          <Link href="/demo/mode" className="shop__weg" style={{ textDecoration: "underline" }}>
            &#8592; Weiter einkaufen
          </Link>
          <button type="button" className="shop__weg" onClick={leeren}>
            Warenkorb leeren
          </button>
        </div>
      </div>

      <aside className="shop__zusammenfassung" aria-label="Zusammenfassung">
        <h2>Zusammenfassung</h2>
        <div className="shop__zeile">
          <span>Zwischensumme ({anzahl} {anzahl === 1 ? "Teil" : "Teile"})</span>
          <span className="shop__preis">{formatEuro(warenwert)}</span>
        </div>
        <div className="shop__zeile">
          <span>Versand</span>
          <span className="shop__preis">{versand === 0 ? "kostenfrei" : formatEuro(versand)}</span>
        </div>
        {fehlt > 0 && (
          <p className="shop__versandhinweis">
            Noch <b>{formatEuro(fehlt)}</b> bis zum versandkostenfreien Versand.
            <span className="shop__balken" aria-hidden="true">
              <i style={{ width: `${Math.min(100, (warenwert / VERSANDFREI_AB_CENT) * 100)}%` }} />
            </span>
          </p>
        )}
        <div className="shop__zeile shop__zeile--gesamt">
          <span>Gesamt</span>
          <b className="shop__preis">{formatEuro(gesamt)}</b>
        </div>
        <button type="button" className="shop__btn shop__btn--voll demo__fake" disabled>
          Zur Kasse
        </button>
        <p className="demo__note">Attrappe: Auf dieser Demo-Seite lässt sich nichts bestellen.</p>
        <div className="shop__zahlarten" aria-label="Zahlarten">
          <span>Rechnung</span>
          <span>Lastschrift</span>
          <span>PayPal</span>
          <span>Karte</span>
        </div>
      </aside>
    </div>
  );
}
