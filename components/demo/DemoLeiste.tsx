"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Der Hinweisbalken über jeder Demo-Seite.
 *
 * Er klebt oben - und genau da kleben auch die Kopfleisten von Shop und
 * Restaurant. Ohne Absprache lägen sie übereinander, und auf schmalen
 * Schirmen (wo der Balken zweizeilig wird) verschwände die Kopfleiste
 * vollständig darunter: Marke, Favoriten und Warenkorb wären nicht mehr
 * anklickbar.
 *
 * Deshalb misst der Balken sich selbst und schreibt seine Höhe nach
 * --demoleiste. Die Kopfleisten kleben um diesen Betrag tiefer. Gemessen
 * statt geschätzt, weil die Höhe vom Umbruch abhängt und der wiederum von
 * Schriftgröße und Sprache.
 */
export function DemoLeiste() {
  const leiste = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = leiste.current;
    if (!el) return;
    const wurzel = document.documentElement;
    const messen = () => wurzel.style.setProperty("--demoleiste", `${el.offsetHeight}px`);
    messen();
    const beobachter = new ResizeObserver(messen);
    beobachter.observe(el);
    return () => {
      beobachter.disconnect();
      wurzel.style.removeProperty("--demoleiste");
    };
  }, []);

  return (
    <div className="demobar" ref={leiste}>
      <span className="demobar__tag">DEMO</span>
      <span className="demobar__text">
        Gestaltungsbeispiel von Novahost.
        <span className="demobar__lang">
          {" "}Erfundenes Unternehmen, erfundene Angaben - hier lässt sich nichts bestellen oder
          buchen.
        </span>
      </span>
      <Link href="/#projekte" className="demobar__back">
        <span aria-hidden="true">&#8592;</span> Zurück zu Novahost
      </Link>
    </div>
  );
}
