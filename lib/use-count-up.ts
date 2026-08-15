"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-motion-preference";

interface CountUpOptions {
  /** Zielwert. */
  to: number;
  /** Startet die Animation erst, wenn der Wert true wird. */
  start: boolean;
  /** Dauer in Millisekunden. */
  duration?: number;
  /** Nachkommastellen der Ausgabe. */
  decimals?: number;
  /**
   * Tausendertrennzeichen. Fuer Mengen sinnvoll ("3.400"), fuer Jahreszahlen
   * falsch ("2.019") — deshalb abschaltbar.
   */
  grouping?: boolean;
}

/** Einheitliche Formatierung fuer laufenden Wert und Endwert. */
export function formatCountValue(
  value: number,
  decimals: number,
  grouping: boolean,
): string {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouping,
  });
}

/**
 * Zaehlt eine Zahl auf ihren Zielwert hoch, sobald `start` true wird.
 *
 * Die Kurve ist ein Ease-Out: schnell los, sanft aus. Ein linearer Zaehler
 * wirkt mechanisch, ein Ease-In-Out startet zu traege.
 *
 * Bei `prefers-reduced-motion` steht sofort der Endwert da — die Information
 * ist der Wert, nicht das Hochzaehlen.
 */
export function useCountUp({
  to,
  start,
  duration = 1800,
  decimals = 0,
  grouping = true,
}: CountUpOptions): string {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    if (reduced) {
      setValue(to);
      return;
    }

    const startedAt = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      // easeOutCubic
      const eased = 1 - (1 - progress) ** 3;

      setValue(to * eased);

      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      } else {
        frame.current = null;
        // Exakt den Zielwert setzen — die Kurve kommt ihm nur sehr nahe.
        setValue(to);
      }
    };

    frame.current = requestAnimationFrame(step);

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [start, to, duration, reduced]);

  // Deutsche Schreibweise: 99,99 statt 99.99.
  return formatCountValue(value, decimals, grouping);
}
