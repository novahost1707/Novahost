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
 * `icon` ist ein Schluessel, den components/ui/ServiceIcon.tsx in ein
 * gezeichnetes SVG uebersetzt — bewusst kein Icon-Paket als Abhaengigkeit.
 */
export type ServiceIconName =
  | "web"
  | "vps"
  | "dedicated"
  | "cloud"
  | "game"
  | "managed";

export interface ServiceItem {
  /** Zweistellige Nummer, z. B. "01" — erscheint als Mono-Label. */
  num: string;
  icon: ServiceIconName;
  title: string;
  text: string;
  /**
   * Technische Mikrodetails auf der Karte, z. B. "NVMe SSD" oder "AMD EPYC".
   * Drei bis vier Eintraege, sonst wird die Karte unruhig.
   */
  specs: string[];
  /** Mono-Zeile am Kartenfuss, z. B. "ab 4,90 €/Monat". */
  meta: string;
}

/* ------------------------------- Infrastruktur --------------------------- */

/**
 * Ein Standort in der Netzwerkvisualisierung.
 *
 * `x`/`y` sind Prozentwerte im Koordinatensystem der SVG-Karte (0–100).
 * `primary` markiert die Kernstandorte, die staerker leuchten.
 */
export interface Region {
  code: string;
  city: string;
  country: string;
  /** Latenz-Angabe als fertiger Text, z. B. "8ms". */
  latency: string;
  x: number;
  y: number;
  primary?: boolean;
}

/** Eine Verbindung zwischen zwei Standorten (Referenz ueber `Region.code`). */
export interface Link {
  from: string;
  to: string;
}

/* -------------------------------- Performance ---------------------------- */

export interface MetricItem {
  /** Zielwert des Zaehlers. */
  value: number;
  /** Nachkommastellen, z. B. 2 bei 99.99. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Eine Zeile Kontext unter dem Label. */
  hint: string;
}

/* ---------------------------------- Pricing ------------------------------ */

export interface PricingPlan {
  slug: string;
  name: string;
  /** Kurzer Satz, fuer wen der Tarif gedacht ist. */
  tagline: string;
  /** Preis als Zahl in Euro; `null` bedeutet "auf Anfrage". */
  price: number | null;
  /** Mono-Zeile mit der Hardware, z. B. "2 vCPU · 4 GB RAM · 80 GB NVMe". */
  spec: string;
  features: string[];
  cta: string;
  /** Genau ein Tarif ist hervorgehoben. */
  featured?: boolean;
}

/* --------------------------------- Security ------------------------------ */

export type SecurityIconName =
  | "shield"
  | "lock"
  | "firewall"
  | "backup"
  | "monitor"
  | "compliance";

export interface SecurityItem {
  icon: SecurityIconName;
  title: string;
  text: string;
  /** Statuszeile in Monospace, z. B. "mitigation: automatic". */
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

/* ------------------------------- Kontaktformular ------------------------- */

/** Worum es bei der Anfrage geht — steuert das Select im Formular. */
export type ContactRole = "hosting" | "infrastruktur" | "managed" | "sonstiges";

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
