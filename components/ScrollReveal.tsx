"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Aktiviert die Scroll-Reveal-Animationen.
 *
 * Zwei Varianten, beide über denselben IntersectionObserver:
 * - `.reveal` blendet ein einzelnes Element ein.
 * - `.stagger` beobachtet einen Container; dessen Kinder erscheinen
 *   nacheinander. Die Verzögerungen stehen in globals.css, damit hier keine
 *   Inline-Styles pro Element nötig sind.
 *
 * Rendert selbst nichts und liegt einmalig im Layout, damit die einzelnen
 * Abschnitte Server Components bleiben können.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.in), .stagger:not(.in)"),
    );
    if (items.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
