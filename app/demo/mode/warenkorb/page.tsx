import type { Metadata } from "next";
import Link from "next/link";
import { KorbSeite } from "@/components/demo/shop/KorbSeite";

export const metadata: Metadata = {
  title: "Warenkorb",
  description: "Warenkorb - Demo-Projekt von Novahost.",
};

export default function WarenkorbSeite() {
  return (
    <>
      <div className="demo__shell">
        <div className="shop__seitenkopf">
          <nav className="shop__krumen shop__mini" aria-label="Pfad">
            <Link href="/demo/mode">Shop</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Warenkorb</span>
          </nav>
          <h1 className="shop__display">Warenkorb</h1>
        </div>
      </div>

      <section className="shop__section shop__section--schmal">
        <div className="demo__shell">
          <KorbSeite />
        </div>
      </section>
    </>
  );
}
