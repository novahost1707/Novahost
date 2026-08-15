"use client";

import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Perspektivische Neigung einer Karte, die dem Zeiger folgt.
 *
 * Der Hook schreibt nur CSS-Variablen (`--rx`, `--ry`, `--lift`) auf das
 * Element; die Transform steckt in der Klasse `.tilt` in globals.css. Solange
 * der Zeiger nicht ueber der Karte ist, liegt sie flach.
 *
 * Bewusst kleine Amplitude: zwei bis drei Grad reichen, damit eine Karte
 * "reagiert". Alles darueber wirkt wie ein Spielzeug und macht Text unruhig.
 *
 * Auf Touch-Geraeten und bei reduzierter Bewegung bleibt der Hook untaetig.
 */

/** Maximale Neigung in Grad. */
const MAX_TILT_DEG = 3.2;
/** Wie weit die Karte beim Hover angehoben wird. */
const LIFT_PX = 6;

export function useTilt<T extends HTMLElement>() {
  const frame = useRef<number | null>(null);
  const enabled = useRef(true);

  useEffect(() => {
    enabled.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const onPointerMove = useCallback((event: ReactPointerEvent<T>) => {
    if (!enabled.current || frame.current !== null) return;

    const element = event.currentTarget;
    const { clientX, clientY } = event;

    frame.current = requestAnimationFrame(() => {
      frame.current = null;

      const bounds = element.getBoundingClientRect();
      // Anteile von -0.5 bis 0.5, gemessen ab der Kartenmitte.
      const px = (clientX - bounds.left) / bounds.width - 0.5;
      const py = (clientY - bounds.top) / bounds.height - 0.5;

      // Y-Neigung folgt der horizontalen Bewegung, X der vertikalen —
      // und zwar gegenlaeufig, sonst kippt die Karte "falsch herum".
      element.style.setProperty("--ry", `${px * MAX_TILT_DEG * 2}deg`);
      element.style.setProperty("--rx", `${-py * MAX_TILT_DEG * 2}deg`);
      element.style.setProperty("--lift", `${-LIFT_PX}px`);
      element.dataset.active = "true";
    });
  }, []);

  const onPointerLeave = useCallback((event: ReactPointerEvent<T>) => {
    const element = event.currentTarget;

    // Zurueck in die Ruhelage — das langsame Zurueckfedern uebernimmt die
    // Transition aus globals.css, sobald data-active wieder weg ist.
    delete element.dataset.active;
    element.style.setProperty("--rx", "0deg");
    element.style.setProperty("--ry", "0deg");
    element.style.setProperty("--lift", "0px");
  }, []);

  return { onPointerMove, onPointerLeave };
}
