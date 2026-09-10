"use client";

import { useEffect } from "react";

/**
 * Die Seite beginnt oben - auch nach einem Neuladen.
 *
 * Browser merken sich die Scrollposition und stellen sie beim Neuladen
 * wieder her. Auf einer langen Startseite landet man dadurch mitten im
 * Text, ohne zu wissen warum; der Einstieg, für den die Seite gebaut ist,
 * wird übersprungen.
 *
 * Ausnahme ist ein Anker in der Adresse (/#projekte). Wer den aufruft, will
 * genau dorthin - da wäre ein Sprung nach oben falsch. Deshalb greift die
 * Korrektur nur, wenn kein Anker gesetzt ist.
 */
export function ScrollStart() {
  useEffect(() => {
    const vorher = history.scrollRestoration;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const anker = window.location.hash;
    if (!anker) {
      window.scrollTo(0, 0);
      return;
    }

    /* Mit abgeschalteter Wiederherstellung springt der Browser beim Neuladen
       auch nicht mehr selbst zum Anker - das muss die Seite dann selbst tun.
       scrollIntoView beachtet dabei scroll-margin-top, der Abschnitt landet
       also nicht unter der Kopfleiste. */
    let ziel: Element | null = null;
    try {
      ziel = document.querySelector(anker);
    } catch {
      /* Kein gueltiger Selektor - dann gibt es auch nichts anzuspringen. */
    }
    if (ziel) ziel.scrollIntoView();

    return () => {
      if ("scrollRestoration" in history) history.scrollRestoration = vorher;
    };
  }, []);

  return null;
}
