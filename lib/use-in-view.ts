"use client";

import { useEffect, useRef, useState } from "react";

interface InViewOptions {
  /** Anteil des Elements, der sichtbar sein muss (0–1). */
  threshold?: number;
  /** Vorlauf, damit die Animation kurz vor dem Eintreten startet. */
  rootMargin?: string;
}

/**
 * Meldet einmalig, sobald ein Element in den sichtbaren Bereich kommt.
 *
 * Bewusst ohne Rueckweg: was einmal animiert wurde, bleibt animiert. Ein
 * Zaehler, der beim Zurueckscrollen erneut hochlaeuft, wirkt wie ein Fehler,
 * nicht wie ein Effekt.
 *
 * Ohne IntersectionObserver (sehr alte Browser) gilt der Inhalt sofort als
 * sichtbar — lieber ohne Animation als unsichtbar.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.3,
  rootMargin = "0px 0px -10% 0px",
}: InViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [inView, threshold, rootMargin]);

  return { ref, inView };
}
