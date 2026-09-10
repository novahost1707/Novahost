/**
 * Einwilligung für nicht notwendige Dienste (§ 25 TDDDG, Art. 6 DSGVO).
 *
 * Die Entscheidung liegt im localStorage, nicht in einem Cookie: sie muss
 * niemals an den Server gehen und taucht so in keiner Anfrage auf.
 */

export type ConsentKategorie = "statistik" | "marketing";

export type ConsentState = {
  statistik: boolean;
  marketing: boolean;
  /** Fassung der abgefragten Kategorien - siehe CONSENT_VERSION. */
  version: number;
  /** Zeitpunkt der Entscheidung, als Nachweis nach Art. 7 Abs. 1 DSGVO. */
  entschiedenAm: string;
};

/**
 * Hauptschalter. Solange kein einziger einwilligungspflichtiger Dienst
 * eingebunden ist, braucht die Seite auch keine Abfrage - ein Banner ohne
 * Anlass kostet nur Abschlüsse.
 *
 * Steht derzeit auf false: die Seite lädt weder Statistik- noch Werbedienste.
 * Technisch notwendig sind nur das kurzlebige Cookie nach dem Absenden eines
 * Formulars und, in den Demo-Seiten, der lokale Speicher für Merkliste und
 * Warenkorb - beides ohne Einwilligung zulässig nach § 25 Absatz 2 TDDDG.
 *
 * Sobald ein Werbe- oder Analysedienst eingebunden wird, muss der Wert
 * zurück auf true. Die Datenschutzerklärung liest denselben Schalter und
 * beschreibt dann automatisch wieder die Abfrage - so kann der Text nicht
 * beschreiben, was die Seite gar nicht tut.
 */
export const EINWILLIGUNG_NOETIG = false;

/**
 * Bei jeder Änderung an den Kategorien hochzählen. Ältere Entscheidungen
 * gelten dann als überholt und werden erneut abgefragt - eine Einwilligung
 * deckt nur ab, worüber auch informiert wurde.
 */
export const CONSENT_VERSION = 1;

export const CONSENT_KEY = "novahost:einwilligung";

/** Wird ausgelöst, sobald sich die Entscheidung ändert. */
export const CONSENT_EVENT = "novahost:einwilligung";

/** Wird ausgelöst, um die Abfrage erneut zu öffnen (Widerruf). */
export const CONSENT_OPEN_EVENT = "novahost:einwilligung-oeffnen";

export const ABGELEHNT: Omit<ConsentState, "entschiedenAm"> = {
  statistik: false,
  marketing: false,
  version: CONSENT_VERSION,
};

/**
 * Liest die gespeicherte Entscheidung. Gibt null zurück, wenn noch keine
 * vorliegt oder sie sich auf eine ältere Fassung der Kategorien bezieht.
 */
export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      statistik: parsed.statistik === true,
      marketing: parsed.marketing === true,
      version: CONSENT_VERSION,
      entschiedenAm: typeof parsed.entschiedenAm === "string" ? parsed.entschiedenAm : "",
    };
  } catch {
    // Privater Modus oder blockierter Speicher: dann gilt keine Einwilligung.
    return null;
  }
}

export function writeConsent(auswahl: Pick<ConsentState, "statistik" | "marketing">): ConsentState {
  const state: ConsentState = {
    ...auswahl,
    version: CONSENT_VERSION,
    entschiedenAm: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {
    // Lässt sich nichts speichern, gilt die Entscheidung nur für diesen Besuch.
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
  return state;
}

/**
 * Anlaufstelle für später eingebundene Dienste.
 *
 * Vor dem Laden eines Werbe- oder Analyse-Skripts hier prüfen und zusätzlich
 * auf CONSENT_EVENT hören, damit ein nachträgliches Ja sofort greift.
 * Für Google Ads gehört an dieser Stelle der Consent Mode: Voreinstellung
 * "denied", bei Einwilligung auf "granted" aktualisieren.
 */
export function darfLaden(kategorie: ConsentKategorie): boolean {
  if (!EINWILLIGUNG_NOETIG) return false;
  return readConsent()?.[kategorie] === true;
}
