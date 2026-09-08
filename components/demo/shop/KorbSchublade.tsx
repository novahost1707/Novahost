"use client";

import Link from "next/link";
import { ShopBild } from "@/components/demo/shop/ShopBild";
import { MengenSteller } from "@/components/demo/shop/MengenSteller";
import { useShop } from "@/components/demo/shop/ShopProvider";
import { produktBySlug } from "@/lib/demo-mode";
import { formatEuro, preisInCent, VERSANDFREI_AB_CENT } from "@/lib/shop-state";

/**
 * Kompakte Warenkorbansicht, die von rechts einfährt.
 *
 * Öffnet sich automatisch, sobald etwas hineingelegt wird - der Nutzer sieht
 * damit sofort, dass die Aktion angekommen ist, ohne die Seite zu verlassen.
 * Die ausführliche Bearbeitung passiert auf /demo/mode/warenkorb.
 */
export function KorbSchublade() {
  const { zustand, schubladeOffen, setSchubladeOffen, menge, entfernen, warenwert, anzahl } = useShop();
  const zeilen = zustand.korb
    .map((z) => ({ ...z, produkt: produktBySlug(z.slug) }))
    .filter((z): z is typeof z & { produkt: NonNullable<typeof z.produkt> } => Boolean(z.produkt));

  const fehlt = VERSANDFREI_AB_CENT - warenwert;

  return (
    <>
      <button
        type="button"
        className="shop__schleier"
        data-offen={schubladeOffen || undefined}
        tabIndex={schubladeOffen ? 0 : -1}
        aria-label="Warenkorb schließen"
        onClick={() => setSchubladeOffen(false)}
      />

      <aside
        className="shop__schublade"
        data-offen={schubladeOffen || undefined}
        aria-label="Warenkorb"
        aria-hidden={!schubladeOffen}
        inert={!schubladeOffen}
      >
        <div className="shop__schublade-kopf">
          <span className="shop__mini">Warenkorb ({anzahl})</span>
          <button type="button" className="shop__schliessen" onClick={() => setSchubladeOffen(false)} aria-label="Warenkorb schließen">
            &times;
          </button>
        </div>

        {zeilen.length === 0 ? (
          <div className="shop__leer">
            <p className="shop__leer-titel">Noch nichts drin.</p>
            <p>Sehen Sie sich um - die aktuelle Serie umfasst achtzehn Teile.</p>
            <Link href="/demo/mode/kategorie/sweats" className="shop__btn" onClick={() => setSchubladeOffen(false)}>
              Sweats &amp; Strick ansehen
            </Link>
          </div>
        ) : (
          <>
            <div className="shop__schublade-liste">
              {zeilen.map((z) => (
                <div className="shop__korbzeile" key={`${z.slug}|${z.groesse}|${z.farbe}`}>
                  <Link href={`/demo/mode/produkt/${z.slug}`} onClick={() => setSchubladeOffen(false)}>
                    <ShopBild platz={z.produkt.bilder[0]!} sizes="76px" />
                  </Link>
                  <div>
                    <h4>
                      <Link href={`/demo/mode/produkt/${z.slug}`} onClick={() => setSchubladeOffen(false)}>
                        {z.produkt.name}
                      </Link>
                    </h4>
                    <p>{z.farbe} &middot; {z.groesse}</p>
                    <MengenSteller
                      menge={z.menge}
                      name={z.produkt.name}
                      aendern={(m) => menge(z, m)}
                      entfernen={() => entfernen(z)}
                    />
                  </div>
                  <div className="shop__korbzeile-rechts">
                    <span className="shop__preis">{formatEuro(preisInCent(z.produkt.preis) * z.menge)}</span>
                    <button type="button" className="shop__weg" onClick={() => entfernen(z)}>
                      Entfernen
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="shop__schublade-fuss">
              {fehlt > 0 ? (
                <p className="shop__versandhinweis">
                  Noch <b>{formatEuro(fehlt)}</b> bis zum versandkostenfreien Versand.
                  <span className="shop__balken" aria-hidden="true">
                    <i style={{ width: `${Math.min(100, (warenwert / VERSANDFREI_AB_CENT) * 100)}%` }} />
                  </span>
                </p>
              ) : (
                <p className="shop__versandhinweis" data-erreicht="true">Versandkostenfrei erreicht.</p>
              )}
              <div className="shop__summe">
                <span>Zwischensumme</span>
                <b className="shop__preis">{formatEuro(warenwert)}</b>
              </div>
              <Link href="/demo/mode/warenkorb" className="shop__btn shop__btn--voll" onClick={() => setSchubladeOffen(false)}>
                Zum Warenkorb
              </Link>
              <button type="button" className="shop__weiter" onClick={() => setSchubladeOffen(false)}>
                Weiter einkaufen
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
