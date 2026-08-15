"use client";

import { useEffect, useState } from "react";

/**
 * Liest `prefers-reduced-motion` und reagiert auf Aenderungen im laufenden
 * Betrieb — die Einstellung kann waehrend des Besuchs umgestellt werden.
 *
 * Der Startwert ist bewusst `false`: waehrend des Server-Renderings gibt es
 * keine Media Query, und ein Umschalten nach dem Mounten waere ein
 * Hydration-Unterschied. Jede Animation, die davon abhaengt, startet ohnehin
 * erst im Effekt.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);

    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
