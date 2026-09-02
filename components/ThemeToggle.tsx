"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  THEME_EVENT,
  applyTheme,
  readStoredTheme,
  resolveTheme,
  storeTheme,
  themeActionLabel,
  toggleTheme,
} from "@/lib/theme";
import type { ThemeChoice } from "@/types";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Schaltet zwischen heller und dunkler Ansicht.
 *
 * Der Knopf richtet sich nach dem *dargestellten* Modus, nicht nach der
 * gespeicherten Wahl — sonst gaebe es einen Klick, der nichts sichtbar
 * veraendert (siehe toggleTheme() in lib/theme.ts). Jeder Druck kippt also
 * die Ansicht.
 *
 * "System" bleibt trotzdem erhalten: faellt das Ziel mit der Systemeinstellung
 * zusammen, wird wieder "system" gespeichert. Ein kleiner Punkt am Knopf zeigt,
 * dass die Seite gerade dem System folgt.
 *
 * Vor dem Mounten wird nichts Zustandsabhaengiges gezeichnet — der Server
 * kennt die Wahl nicht. Bis dahin steht ein Platzhalter gleicher Groesse,
 * damit die Navigationsleiste nicht springt.
 */
export default function ThemeToggle({ className }: ThemeToggleProps) {
  const [choice, setChoice] = useState<ThemeChoice>("system");
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChoice(readStoredTheme());
    setMounted(true);
  }, []);

  /*
   * Die Systemeinstellung wird mitgelesen und nicht nur einmal abgefragt:
   * solange "system" gilt, muss ein Wechsel im Betriebssystem auch das Symbol
   * am Knopf umstellen.
   */
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemPrefersDark(query.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setSystemPrefersDark(event.matches);

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Mehrere Schalter auf derselben Seite halten sich hierueber auf Stand.
  useEffect(() => {
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<ThemeChoice>).detail;
      if (detail) setChoice(detail);
    };

    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, []);

  const resolved = resolveTheme(choice, systemPrefersDark);

  const handleClick = useCallback(() => {
    const next = toggleTheme(resolved, systemPrefersDark);

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
  }, [resolved, systemPrefersDark]);

  const label = themeActionLabel(resolved);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={
        choice === "system" ? `${label} (folgt gerade dem System)` : label
      }
      data-theme-choice={choice}
      className={cn(
        "glow-hover panel relative flex h-10 w-10 flex-none items-center justify-center rounded-chip text-nh-body hover:text-nh-blue",
        className,
      )}
    >
      {mounted ? (
        <>
          <ThemeIcon dark={resolved === "dark"} />

          {/* Zeigt an, dass gerade die Systemeinstellung gilt. */}
          {choice === "system" ? (
            <span
              aria-hidden="true"
              className="absolute right-1.5 bottom-1.5 h-[3px] w-[3px] rounded-full bg-nh-blue"
            />
          ) : null}
        </>
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}

/**
 * Sonne oder Mond — was gerade gilt.
 *
 * Beide teilen Raster, Strichstaerke und runde Enden mit dem uebrigen
 * Icon-Set, damit der Schalter nicht wie ein Fremdkoerper wirkt.
 */
function ThemeIcon({ dark }: { dark: boolean }) {
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
      {dark ? (
        <path d="M20 13.6A8.2 8.2 0 0 1 10.4 4a8.2 8.2 0 1 0 9.6 9.6Z" />
      ) : (
        <>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.8v2.2M12 19v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.8 12H5M19 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
        </>
      )}
    </svg>
  );
}
