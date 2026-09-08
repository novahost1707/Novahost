"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { kategorien, zielgruppen } from "@/lib/demo-mode";

/**
 * Hauptnavigation und Kategorienzeile.
 *
 * Beide markieren die aktuelle Seite - ohne diese Rückmeldung weiß niemand,
 * wo im Shop er gerade steht. Das ist bei einem mehrseitigen Sortiment
 * wichtiger als jede Animation.
 */
export function ShopNavLinks() {
  const pfad = usePathname();
  return (
    <div className="shop__navlinks shop__mini">
      {zielgruppen.map((z) => (
        <Link key={z.id} href={z.pfad} aria-current={pfad === z.pfad ? "page" : undefined}>
          {z.name}
        </Link>
      ))}
      <Link href="/demo/mode/sale" data-sale="true" aria-current={pfad === "/demo/mode/sale" ? "page" : undefined}>
        Sale
      </Link>
    </div>
  );
}

export function ShopKategorienNav() {
  const pfad = usePathname();
  return (
    <nav className="shop__unternav" aria-label="Kategorien">
      <div className="demo__shell shop__unternav-inner shop__mini">
        {/* Auf schmalen Schirmen ist die obere Zeile zu eng fuer Damen, Herren
            und Sale. Ohne sie kaeme man von der Kopfleiste aus nicht mehr in
            die beiden Sortimente - deshalb stehen sie hier vorn und fallen auf
            breiten Schirmen wieder weg. */}
        <span className="shop__unternav-schmal">
          {zielgruppen.map((z) => (
            <Link key={z.id} href={z.pfad} aria-current={pfad === z.pfad ? "page" : undefined}>
              {z.name}
            </Link>
          ))}
          <Link href="/demo/mode/sale" data-sale="true" aria-current={pfad === "/demo/mode/sale" ? "page" : undefined}>
            Sale
          </Link>
        </span>
        <Link href="/demo/mode" aria-current={pfad === "/demo/mode" ? "page" : undefined}>
          Alle Teile
        </Link>
        {kategorien.map((k) => {
          const ziel = `/demo/mode/kategorie/${k.id}`;
          return (
            <Link key={k.id} href={ziel} aria-current={pfad === ziel ? "page" : undefined}>
              {k.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
