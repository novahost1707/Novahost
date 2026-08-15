import type {
  ContactFieldName,
  ContactFormErrors,
  ContactFormValues,
  ContactRole,
} from "@/types";

/** Regeln gelten im Browser und serverseitig identisch. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{6,}$/;

const REQUIRED_FIELDS: ContactFieldName[] = ["name", "role", "email", "message"];

/** Erlaubte Werte des Auswahlfelds "Anliegen". */
export const CONTACT_ROLES: ContactRole[] = [
  "hosting",
  "infrastruktur",
  "managed",
  "sonstiges",
];

/**
 * Beschriftung der Auswahl — an einer Stelle, damit Formular und
 * Benachrichtigungs-E-Mail garantiert dieselben Woerter benutzen.
 */
export const CONTACT_ROLE_LABELS: Record<ContactRole, string> = {
  hosting: "Hosting & Server",
  infrastruktur: "Cloud-Infrastruktur",
  managed: "Managed IT / Support",
  sonstiges: "Sonstiges",
};

/**
 * Maximale Laengen pro Feld. Gelten im Browser (maxLength am Feld) und
 * serverseitig in der API-Route — ein direkter POST umgeht das Formular.
 * 254 Zeichen bei E-Mail entspricht der maximalen Adresslaenge nach RFC 5321.
 */
export const FIELD_LIMITS: Record<ContactFieldName, number> = {
  name: 120,
  role: 32,
  email: 254,
  phone: 40,
  message: 5000,
};

/** Laenge des Honeypot-Felds, ab der ein Request gar nicht erst geprueft wird. */
const HONEYPOT_LIMIT = 200;

/** Leere Startwerte fuer das Kontaktformular. */
export const emptyContactForm: ContactFormValues = {
  name: "",
  role: "",
  email: "",
  phone: "",
  message: "",
  company_website: "",
};

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim()) && value.trim().length <= FIELD_LIMITS.email;
}

export function isValidPhone(value: string): boolean {
  return PHONE_PATTERN.test(value.trim());
}

function isValidRole(value: string): value is ContactRole {
  return (CONTACT_ROLES as string[]).includes(value);
}

/**
 * Prueft das Kontaktformular und gibt pro fehlerhaftem Feld `true` zurueck.
 * Telefon ist optional und wird nur geprueft, wenn etwas eingetragen wurde.
 *
 * Wird von beiden Seiten benutzt: im Browser fuer die Feldmarkierung und in
 * app/api/contact/route.ts als serverseitige Pruefung.
 */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  for (const field of REQUIRED_FIELDS) {
    if (!values[field].trim()) {
      errors[field] = true;
    }
  }

  for (const field of Object.keys(FIELD_LIMITS) as ContactFieldName[]) {
    if (values[field].trim().length > FIELD_LIMITS[field]) {
      errors[field] = true;
    }
  }

  if (!isValidEmail(values.email)) {
    errors.email = true;
  }

  if (values.role.trim() && !isValidRole(values.role.trim())) {
    errors.role = true;
  }

  if (values.phone.trim() && !isValidPhone(values.phone)) {
    errors.phone = true;
  }

  return errors;
}

/** Bots füllen versteckte Felder aus — solche Absendungen werden ignoriert. */
export function isHoneypotTriggered(values: ContactFormValues): boolean {
  return values.company_website.trim().length > 0;
}

/**
 * Liest ein Feld als getrimmten String. `null` signalisiert einen falschen Typ
 * (Zahl, Objekt, Array) — fehlende Felder gelten als leerer String und werden
 * anschliessend regulaer von validateContactForm() bemaengelt.
 */
function readString(source: Record<string, unknown>, key: string): string | null {
  const value = source[key];
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return null;
  return value.trim();
}

/**
 * Bringt einen ungeprueften JSON-Body in die Form von ContactFormValues.
 * Gibt `null` zurueck, wenn der Body kein Objekt ist, ein Feld kein String ist,
 * die Rolle kein bekannter Wert ist oder das Honeypot-Feld absurd lang
 * befuellt wurde.
 *
 * Werte werden getrimmt — Validierung und beide E-Mails arbeiten danach
 * ausschliesslich mit diesem normalisierten Objekt.
 */
export function parseContactPayload(input: unknown): ContactFormValues | null {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return null;
  }

  const source = input as Record<string, unknown>;

  const name = readString(source, "name");
  const role = readString(source, "role");
  const email = readString(source, "email");
  const phone = readString(source, "phone");
  const message = readString(source, "message");
  const honeypot = readString(source, "company_website");

  if (
    name === null ||
    role === null ||
    email === null ||
    phone === null ||
    message === null ||
    honeypot === null
  ) {
    return null;
  }

  if (role !== "" && !isValidRole(role)) return null;
  if (honeypot.length > HONEYPOT_LIMIT) return null;

  return { name, role, email, phone, message, company_website: honeypot };
}
