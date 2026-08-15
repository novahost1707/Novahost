"use client";

import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Laesst einen weichen Lichtschein der Maus folgen.
 *
 * Der Hook schreibt nur zwei CSS-Variablen (`--mx`, `--my`) auf das Element;
 * das Aussehen steckt komplett in der Klasse `.pointer-glow` in globals.css.
 * Ohne die Klasse passiert nichts Sichtbares.
 *
 * Zur Performance: die Position wird pro Frame hoechstens einmal geschrieben,
 * damit schnelle Mausbewegungen keine Kette von Layout-Messungen ausloesen.
 * Auf Geraeten ohne echten Hover (Touch) bleibt der Hook untaetig.
 */
export function usePointerGlow() {
  const frame = useRef<number | null>(null);
  const enabled = useRef(true);

  useEffect(() => {
    enabled.current =
      window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (!enabled.current || frame.current !== null) return;

    const element = event.currentTarget;
    const { clientX, clientY } = event;

    frame.current = requestAnimationFrame(() => {
      frame.current = null;

      const bounds = element.getBoundingClientRect();
      element.style.setProperty("--mx", `${clientX - bounds.left}px`);
      element.style.setProperty("--my", `${clientY - bounds.top}px`);
    });
  }, []);
}
