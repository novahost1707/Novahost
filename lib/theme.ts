import type { ResolvedTheme, ThemeChoice } from "@/types";

/**
 * Heller und dunkler Modus.
 *
 * Wie bei der Einwilligung ist der obere Teil dieser Datei frei von
 * Browser-Zugriffen und damit ohne DOM testbar (tests/theme.test.ts).
 *
 * Gespeichert wird die *Wahl* ("light", "dark" oder "system") und nicht der
 * dargestellte Modus. Wer "system" stehen laesst, soll morgens hell und abends
 * dunkel bekommen — haetten wir das aufgeloeste Ergebnis gespeichert, waere
 * die Verbindung zur Systemeinstellung nach dem ersten Besuch gekappt.
 */

/** Schluessel im localStorage. */
export const THEME_STORAGE_KEY = "nova-host-theme";

/** Voreinstellung: der Einstellung des Betriebssystems folgen. */
export const DEFAULT_THEME: ThemeChoice = "system";

/** Reihenfolge beim Durchschalten per Klick. */
export const THEME_ORDER: readonly ThemeChoice[] = ["light", "dark", "system"];

/** Prueft, ob ein beliebiger Wert eine gueltige Wahl ist. */
export function isThemeChoice(value: unknown): value is ThemeChoice {
  return value === "light" || value === "dark" || value === "system";
}

/**
 * Liest eine gespeicherte Wahl. Alles Unbekannte faellt auf die
 * Voreinstellung zurueck — ein kaputter Eintrag darf die Seite nicht in einen
 * undefinierten Zustand bringen.
 */
export function parseTheme(raw: string | null | undefined): ThemeChoice {
  return isThemeChoice(raw) ? raw : DEFAULT_THEME;
}

/**
 * Loest "system" anhand der Systemeinstellung auf.
 * `systemPrefersDark` kommt aus der Media Query bzw. im Test als Argument.
 */
export function resolveTheme(
  choice: ThemeChoice,
  systemPrefersDark: boolean,
): ResolvedTheme {
  if (choice === "system") return systemPrefersDark ? "dark" : "light";
  return choice;
}

/**
 * Die naechste Wahl beim Klick auf den Schalter.
 *
 * Entscheidend ist der *dargestellte* Modus, nicht die gespeicherte Wahl. Ein
 * reiner Dreier-Zyklus (hell → dunkel → System) enthaelt naemlich immer einen
 * unsichtbaren Schritt: steht das System auf dunkel, sehen "dunkel" und
 * "System" identisch aus — der Klick wirkt dann wirkungslos und man muss ein
 * zweites Mal druecken.
 *
 * Deshalb wird hier immer auf das Gegenteil des gerade Sichtbaren geschaltet.
 * Faellt dieses Ziel mit der Systemeinstellung zusammen, wird "system"
 * gespeichert statt des festen Werts: das Ergebnis sieht gleich aus, aber die
 * Bindung an das System bleibt erhalten. Dadurch aendert jeder Klick sichtbar
 * etwas, und "System" bleibt trotzdem erreichbar.
 */
export function toggleTheme(
  resolved: ResolvedTheme,
  systemPrefersDark: boolean,
): ThemeChoice {
  const target: ResolvedTheme = resolved === "dark" ? "light" : "dark";
  const systemResolved: ResolvedTheme = systemPrefersDark ? "dark" : "light";

  return target === systemResolved ? "system" : target;
}

/** Beschriftung des aktuellen Zustands. */
export function themeLabel(choice: ThemeChoice): string {
  if (choice === "light") return "Helle Ansicht";
  if (choice === "dark") return "Dunkle Ansicht";
  return "Systemeinstellung";
}

/** Beschreibt, was ein Klick bewirkt — fuer aria-label und Tooltip. */
export function themeActionLabel(resolved: ResolvedTheme): string {
  return resolved === "dark"
    ? "Zur hellen Ansicht wechseln"
    : "Zur dunklen Ansicht wechseln";
}

/* -------------------------------------------------------------------------
   Anbindung an den Browser
------------------------------------------------------------------------- */

/** Event, mit dem sich mehrere Schalter auf derselben Seite abgleichen. */
export const THEME_EVENT = "nova-host:theme";

export function readStoredTheme(): ThemeChoice {
  if (typeof window === "undefined") return DEFAULT_THEME;

  try {
    return parseTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return DEFAULT_THEME;
  }
}

/**
 * Schreibt die Wahl ins `data-theme`-Attribut am <html> und merkt sie sich.
 *
 * Bei "system" wird das Attribut entfernt statt auf einen Wert gesetzt: dann
 * greift die `prefers-color-scheme`-Regel in globals.css, und der Modus folgt
 * dem System auch dann noch, wenn es sich waehrend des Besuchs aendert.
 */
export function applyTheme(choice: ThemeChoice): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  if (choice === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.dataset.theme = choice;
  }
}

export function storeTheme(choice: ThemeChoice): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Kein Speicher verfuegbar: die Wahl gilt fuer diesen Besuch trotzdem.
  }

  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: choice }));
}

/**
 * Das Skript, das vor dem ersten Bild laeuft.
 *
 * Es steht als Inline-Skript im <head> (siehe app/layout.tsx) und setzt
 * `data-theme`, bevor der Browser irgendetwas zeichnet. Ohne diesen Schritt
 * blitzt bei jedem Aufruf kurz die helle Seite auf, bevor React uebernimmt —
 * genau der Effekt, den ein Dunkelmodus verhindern soll.
 *
 * Bewusst winzig gehalten und in einem try/catch: faellt es aus, bleibt die
 * Seite hell und funktionsfaehig.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var c=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(c==="dark"||c==="light"){document.documentElement.setAttribute("data-theme",c);}}catch(e){}})();`;
