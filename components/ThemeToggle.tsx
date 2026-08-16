"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  THEME_EVENT,
  applyTheme,
  nextTheme,
  readStoredTheme,
  storeTheme,
  themeLabel,
} from "@/lib/theme";
import type { ThemeChoice } from "@/types";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Schaltet zwischen heller Ansicht, dunkler Ansicht und Systemeinstellung.
 *
 * Bewusst ein Knopf zum Durchschalten statt eines Dropdowns: drei Zustaende
 * sind noch ueberschaubar, und in der Navigationsleiste ist Platz knapp. Das
 * jeweils aktive Symbol zeigt, was gerade gilt; `aria-label` und `title`
 * nennen es im Klartext.
 *
 * Vor dem Mounten wird nichts angezeigt, was von der gespeicherten Wahl
 * abhaengt — der Server kennt sie nicht. Bis dahin steht ein Platzhalter
 * gleicher Groesse, damit die Navigationsleiste nicht springt.
 */
export default function ThemeToggle({ className }: ThemeToggleProps) {
  const [choice, setChoice] = useState<ThemeChoice>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChoice(readStoredTheme());
    setMounted(true);
  }, []);

  // Mehrere Schalter auf derselben Seite (Navigation und mobiles Menue)
  // halten sich ueber dieses Event gegenseitig auf Stand.
  useEffect(() => {
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<ThemeChoice>).detail;
      if (detail) setChoice(detail);
    };

    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, []);

  const handleClick = useCallback(() => {
    const next = nextTheme(choice);

    /*
     * Waehrend des Wechsels laufen Farben kurz weich ineinander. Das Attribut
     * schaltet die Uebergangsregel in globals.css frei und verschwindet
     * danach wieder — sonst haette jede Hover-Transition auf der Seite
     * dauerhaft eine zusaetzliche Farbanimation.
     */
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduced) {
      root.dataset.themeSwitching = "true";
      window.setTimeout(() => {
        delete root.dataset.themeSwitching;
      }, 340);
    }

    setChoice(next);
    applyTheme(next);
    storeTheme(next);
  }, [choice]);

  const label = themeLabel(choice);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Ansicht umschalten — aktuell: ${label}`}
      title={label}
      className={cn(
        "glow-hover glass relative flex h-10 w-10 flex-none items-center justify-center rounded-xl text-nh-body hover:text-nh-blue",
        className,
      )}
    >
      {mounted ? <ThemeIcon choice={choice} /> : <span className="h-[18px] w-[18px]" />}
    </button>
  );
}

/**
 * Sonne, Mond oder Halbkreis — je nach Wahl.
 *
 * Alle drei teilen Raster, Strichstaerke und runde Enden mit dem uebrigen
 * Icon-Set, damit der Schalter nicht wie ein Fremdkoerper wirkt.
 */
function ThemeIcon({ choice }: { choice: ThemeChoice }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
    >
      {choice === "light" ? (
        <>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.8v2.2M12 19v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.8 12H5M19 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
        </>
      ) : null}

      {choice === "dark" ? (
        <path d="M20 13.6A8.2 8.2 0 0 1 10.4 4a8.2 8.2 0 1 0 9.6 9.6Z" />
      ) : null}

      {choice === "system" ? (
        <>
          <circle cx="12" cy="12" r="8.2" />
          {/* Die gefuellte Haelfte steht fuer "richtet sich nach dem System". */}
          <path d="M12 3.8a8.2 8.2 0 0 1 0 16.4Z" fill="currentColor" stroke="none" />
        </>
      ) : null}
    </svg>
  );
}
