import type { ConsentState, CookieCategory } from "@/types";

/**
 * Einwilligung in die Speicherung im Browser.
 *
 * Der obere Teil dieser Datei ist bewusst frei von Browser-Zugriffen: reine
 * Funktionen, die sich in tests/consent.test.ts ohne DOM pruefen lassen. Erst
 * darunter kommt die Anbindung an localStorage.
 *
 * Rechtlicher Rahmen (§ 25 TDDDG, Art. 6 Abs. 1 lit. a DSGVO): alles ausser
 * "necessary" darf erst nach aktiver Zustimmung laufen. Deshalb ist die
 * Voreinstellung Ablehnung, nicht Zustimmung — und deshalb gilt eine fehlende
 * oder unlesbare Entscheidung als "noch nicht gefragt", nicht als Ja.
 */

/** Schluessel im localStorage. */
export const CONSENT_STORAGE_KEY = "nova-host-consent";

/**
 * Version der Einwilligung. Kommt eine Kategorie hinzu oder aendert sich ihr
 * Zweck, wird diese Zahl erhoeht — gespeicherte Entscheidungen aelterer
 * Versionen gelten dann nicht mehr und die Abfrage erscheint erneut.
 */
export const CONSENT_VERSION = 1;

/** Kategorien, ueber die entschieden werden kann. */
export const OPTIONAL_CATEGORIES = ["statistics", "marketing"] as const;

/** Alle Kategorien, "necessary" eingeschlossen. */
export const ALL_CATEGORIES: readonly CookieCategory[] = [
  "necessary",
  ...OPTIONAL_CATEGORIES,
];

/**
 * Erzeugt eine Entscheidung.
 *
 * "necessary" ist immer true: ohne diese Speicherung liesse sich die
 * Entscheidung selbst nicht merken. Unbekannte oder fehlende Angaben gelten
 * als Ablehnung.
 */
export function createConsent(
  choices: Partial<Record<CookieCategory, boolean>> = {},
  now: Date = new Date(),
): ConsentState {
  return {
    version: CONSENT_VERSION,
    decidedAt: now.toISOString(),
    categories: {
      necessary: true,
      statistics: choices.statistics === true,
      marketing: choices.marketing === true,
    },
  };
}

/** Zustimmung zu allem. */
export function acceptAllConsent(now: Date = new Date()): ConsentState {
  return createConsent({ statistics: true, marketing: true }, now);
}

/** Nur das Noetigste — die Voreinstellung. */
export function rejectAllConsent(now: Date = new Date()): ConsentState {
  return createConsent({}, now);
}

/**
 * Liest eine gespeicherte Entscheidung.
 *
 * Gibt `null` zurueck, sobald irgendetwas nicht stimmt: kein Wert, kaputtes
 * JSON, falsche Form oder eine aeltere Version. Der Aufrufer fragt dann
 * erneut — im Zweifel lieber einmal zu viel gefragt als ungefragt gespeichert.
 */
export function parseConsent(raw: string | null | undefined): ConsentState | null {
  if (!raw) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return null;
  }

  const value = parsed as Record<string, unknown>;

  if (value.version !== CONSENT_VERSION) return null;
  if (typeof value.decidedAt !== "string" || !value.decidedAt) return null;

  const categories = value.categories;
  if (
    typeof categories !== "object" ||
    categories === null ||
    Array.isArray(categories)
  ) {
    return null;
  }

  const source = categories as Record<string, unknown>;

  // Jede Kategorie muss ausdruecklich als Boolean vorliegen. Ein fehlender
  // Eintrag koennte sonst stillschweigend als Zustimmung durchgehen.
  for (const category of ALL_CATEGORIES) {
    if (typeof source[category] !== "boolean") return null;
  }

  return {
    version: CONSENT_VERSION,
    decidedAt: value.decidedAt,
    categories: {
      // Notwendiges bleibt gesetzt, auch wenn im Speicher etwas anderes stand.
      necessary: true,
      statistics: source.statistics === true,
      marketing: source.marketing === true,
    },
  };
}

export function serializeConsent(state: ConsentState): string {
  return JSON.stringify(state);
}

/**
 * Darf eine Kategorie laufen? Ohne Entscheidung lautet die Antwort immer nein
 * — ausser bei "necessary".
 */
export function isAllowed(
  state: ConsentState | null,
  category: CookieCategory,
): boolean {
  if (category === "necessary") return true;
  return state?.categories[category] === true;
}

/* -------------------------------------------------------------------------
   Anbindung an den Browser
   Alles ab hier fasst localStorage an und laeuft nur im Client.
------------------------------------------------------------------------- */

/**
 * Name des Events, mit dem sich Komponenten ueber eine geaenderte oder neu
 * angeforderte Entscheidung verstaendigen. Dadurch kann der Footer die
 * Abfrage wieder oeffnen, ohne dass beide Komponenten einen gemeinsamen
 * State-Container brauchen.
 */
export const CONSENT_EVENT = "nova-host:consent";

/**
 * Liest die gespeicherte Entscheidung.
 *
 * localStorage kann werfen — etwa wenn Cookies und Websitedaten im Browser
 * komplett gesperrt sind. Das ist kein Fehlerfall, sondern schlicht "keine
 * Entscheidung gespeichert".
 */
export function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;

  try {
    return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

/** Speichert eine Entscheidung und benachrichtigt die Seite. */
export function storeConsent(state: ConsentState): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, serializeConsent(state));
  } catch {
    // Kein Speicher verfuegbar: die Entscheidung gilt fuer diesen Besuch
    // trotzdem, sie ueberlebt nur das Schliessen des Tabs nicht.
  }

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

/**
 * Name des Events, mit dem sich die Einstellungen erneut oeffnen lassen —
 * etwa ueber den Link im Footer.
 */
export const CONSENT_OPEN_EVENT = "nova-host:consent-open";

/** Oeffnet die Einstellungen, ohne die bisherige Entscheidung zu veraendern. */
export function openConsentSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/** Loescht die Entscheidung — die Abfrage erscheint danach wieder. */
export function clearStoredConsent(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Nichts zu tun.
  }

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}
