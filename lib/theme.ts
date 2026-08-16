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

/** Die naechste Wahl beim Durchschalten: hell → dunkel → System → hell. */
export function nextTheme(current: ThemeChoice): ThemeChoice {
  const index = THEME_ORDER.indexOf(current);
  return THEME_ORDER[(index + 1) % THEME_ORDER.length] as ThemeChoice;
}

/** Beschriftung fuer Screenreader und Tooltip. */
export function themeLabel(choice: ThemeChoice): string {
  if (choice === "light") return "Helle Ansicht";
  if (choice === "dark") return "Dunkle Ansicht";
  return "Systemeinstellung";
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
