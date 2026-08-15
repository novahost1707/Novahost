/**
 * Konfiguration des E-Mail-Versands.
 *
 * Diese Datei wird ausschliesslich serverseitig importiert
 * (app/api/contact/route.ts). Der API-Key wird nur hier gelesen und niemals
 * exportiert, geloggt oder an den Client zurueckgegeben.
 */

/**
 * Absender beider E-Mails. Die Domain novahost.dev muss in Resend verifiziert
 * sein, sonst lehnt die API den Versand ab.
 */
export const FROM_ADDRESS = "Nova Host <hello@novahost.dev>";

/** Empfaenger der Kontaktanfrage, wenn CONTACT_EMAIL_TO nicht gesetzt ist. */
export const DEFAULT_CONTACT_RECIPIENT = "hello@novahost.dev";

export const SITE_URL = "https://www.novahost.dev/";

export const STATUS_URL = "https://status.novahost.dev/";

/** Adresse, an die Kontaktanfragen zugestellt werden. */
export function getContactRecipient(): string {
  const configured = process.env.CONTACT_EMAIL_TO?.trim();
  return configured ? configured : DEFAULT_CONTACT_RECIPIENT;
}

/**
 * Liest den Resend-Key. Gibt `null` zurueck, wenn er fehlt — die Route
 * antwortet dann mit einem allgemeinen Fehler, ohne den Grund preiszugeben.
 */
export function getResendApiKey(): string | null {
  const key = process.env.RESEND_API_KEY?.trim();
  return key ? key : null;
}
