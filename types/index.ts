/** Zentrale Typen der Nova-Host-Website. */

/* ---------------------------------- Navigation --------------------------- */

/** Ein Navigationspunkt. `hash` verweist auf einen Abschnitt der Startseite. */
export interface NavLink {
  label: string;
  hash: string;
}

/* ---------------------------------- Services ----------------------------- */

/**
 * Ein Angebot in der Services-Section.
 *
 * `icon` ist ein Schluessel, den components/ui/Icon.tsx in ein gezeichnetes
 * SVG uebersetzt — bewusst kein Icon-Paket als Abhaengigkeit.
 */
export type ServiceIconName =
  | "design"
  | "code"
  | "relaunch"
  | "care"
  | "seo"
  | "content";

export interface ServiceItem {
  /** Zweistellige Nummer, z. B. "01" — erscheint als Mono-Label. */
  num: string;
  /** Dateiname im Kartenreiter, z. B. "webdesign.tsx". */
  file: string;
  icon: ServiceIconName;
  title: string;
  text: string;
  /**
   * Kurze Stichworte auf der Karte, z. B. "Figma" oder "Responsive".
   * Drei bis vier Eintraege, sonst wird die Karte unruhig.
   */
  specs: string[];
  /** Mono-Zeile am Kartenfuss, z. B. "Teil des Website-Pakets". */
  meta: string;
}

/* ---------------------------------- Ablauf ------------------------------- */

/** Ein Schritt im Projektablauf. */
export interface ProcessStep {
  /** Zweistellige Nummer, z. B. "01". */
  num: string;
  title: string;
  text: string;
  /** Grobe Dauer als fertiger Text, z. B. "1–2 Tage". */
  duration: string;
}

/* -------------------------------- Kennzahlen ----------------------------- */

export interface MetricItem {
  /** Zielwert des Zaehlers. */
  value: number;
  /** Nachkommastellen, z. B. 1 bei 1,2. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Eine Zeile Kontext unter dem Label. */
  hint: string;
}

/* ---------------------------------- Preise ------------------------------- */

/**
 * Ein Website-Paket — die einmalige Leistung am Anfang.
 *
 * Ohne dieses Paket gibt es keine Zusammenarbeit: erst wird die Website
 * gebaut, danach laeuft sie im Abo weiter.
 */
export interface WebsitePackage {
  slug: string;
  name: string;
  /** Kurzer Satz, fuer wen das Paket gedacht ist. */
  tagline: string;
  /** Einmalpreis in Euro; `null` bedeutet "auf Anfrage". */
  price: number | null;
  /** Zusatz unter dem Preis, z. B. "einmalig, zzgl. USt." */
  note: string;
  features: string[];
  cta: string;
  /** Genau ein Paket ist hervorgehoben. */
  featured?: boolean;
}

/**
 * Ein Betreuungs-Abo — verpflichtend ab dem Launch.
 *
 * `included` begrenzt, wie viel Aenderungsarbeit im Monat enthalten ist.
 * Darueber hinaus wird nach `overageRate` je angefangene halbe Stunde
 * abgerechnet. Genau diese Grenze macht das Abo fuer beide Seiten
 * kalkulierbar.
 */
export interface CarePlan {
  slug: string;
  name: string;
  tagline: string;
  /** Monatspreis in Euro; `null` bedeutet "auf Anfrage". */
  price: number | null;
  /** Enthaltenes Aenderungskontingent, z. B. "30 Minuten pro Monat". */
  included: string;
  /** Zugesagte Reaktionszeit, z. B. "innerhalb von 48 Stunden". */
  response: string;
  /** Preis je angefangene halbe Stunde ueber dem Kontingent, in Euro. */
  overageRate: number | null;
  features: string[];
  cta: string;
  /** Genau ein Abo ist hervorgehoben. */
  featured?: boolean;
}

/* -------------------------------- Betreuung ------------------------------ */

export type CareIconName =
  | "update"
  | "backup"
  | "lock"
  | "monitor"
  | "compliance"
  | "support";

export interface CareItem {
  icon: CareIconName;
  title: string;
  text: string;
  /** Statuszeile in Monospace, z. B. "turnus: monatlich". */
  status: string;
}

/* --------------------------------- Terminal ------------------------------ */

/**
 * Eine Zeile im animierten Terminal.
 *
 * "prompt"  — Eingabe mit `$`, wird Zeichen fuer Zeichen getippt.
 * "log"     — normale Ausgabe.
 * "success" — Ausgabe mit gruenem Haken.
 * "blank"   — Leerzeile fuer Rhythmus.
 */
export type TerminalLineKind = "prompt" | "log" | "success" | "blank";

export interface TerminalLine {
  kind: TerminalLineKind;
  text: string;
}

/* ---------------------------------- Footer ------------------------------- */

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

/* --------------------------------- Consent ------------------------------- */

/**
 * Kategorien der Einwilligung.
 *
 * "necessary" umfasst allein die Speicherung der Entscheidung selbst und ist
 * nicht abwaehlbar. Alles andere laeuft erst nach ausdruecklicher Zustimmung.
 */
export type CookieCategory = "necessary" | "statistics" | "marketing";

/** Die gespeicherte Entscheidung eines Besuchers. */
export interface ConsentState {
  /** Fassung der Abfrage — siehe CONSENT_VERSION in lib/consent.ts. */
  version: number;
  /** Zeitpunkt der Entscheidung als ISO-String (Nachweis der Einwilligung). */
  decidedAt: string;
  categories: Record<CookieCategory, boolean>;
}

/** Eine Kategorie, wie sie in der Abfrage beschrieben wird. */
export interface ConsentCategoryInfo {
  id: CookieCategory;
  title: string;
  text: string;
  /** Technische Zeile in Monospace, z. B. der verwendete Speicherschluessel. */
  detail: string;
  /** Nicht abwaehlbar. */
  locked?: boolean;
}

/* ---------------------------------- Theme -------------------------------- */

/**
 * Farbmodus. "system" folgt der Einstellung des Betriebssystems und ist die
 * Voreinstellung — fuer die meisten Menschen ist sie die richtige.
 */
export type ThemeChoice = "light" | "dark" | "system";

/** Der tatsaechlich dargestellte Modus, nachdem "system" aufgeloest wurde. */
export type ResolvedTheme = "light" | "dark";

/* ------------------------------- Kontaktformular ------------------------- */

/** Worum es bei der Anfrage geht — steuert das Select im Formular. */
export type ContactRole = "website" | "relaunch" | "betreuung" | "sonstiges";

/** Alle Felder, die validiert werden koennen. */
export type ContactFieldName = "name" | "role" | "email" | "phone" | "message";

export interface ContactFormValues {
  name: string;
  role: ContactRole | "";
  email: string;
  phone: string;
  message: string;
  /** Honeypot — muss leer bleiben, wird von Bots ausgefuellt. */
  company_website: string;
}

/** Pro Feld true, wenn ein Validierungsfehler vorliegt. */
export type ContactFormErrors = Partial<Record<ContactFieldName, boolean>>;

/* -------------------------------- Rechtliches ---------------------------- */

/** Ein Link im Footer, der auf eine eigene Seite zeigt. */
export interface LegalLink {
  label: string;
  href: string;
}

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

/** Inhalt einer Rechtsseite (/impressum, /datenschutz). */
export interface LegalPageContent {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}
