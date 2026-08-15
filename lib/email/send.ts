/**
 * Versand der beiden Kontakt-E-Mails ueber Resend.
 *
 * Nur serverseitig verwendbar (app/api/contact/route.ts). Der API-Key wird
 * hier gelesen und nirgendwo protokolliert oder zurueckgegeben.
 */
import { Resend } from "resend";
import type { ContactFormValues } from "@/types";
import { getContactRecipient, getResendApiKey } from "./config";
import { buildOwnerEmail, buildVisitorEmail, type ContactEmail } from "./templates";

export type ContactSendResult =
  /** Beide E-Mails wurden von Resend angenommen. */
  | { status: "sent" }
  /** Anfrage zugestellt, Bestaetigung an den Besucher schlug fehl. */
  | { status: "partial" }
  /** Die Anfrage selbst konnte nicht zugestellt werden. */
  | { status: "failed"; reason: "config" | "delivery" };

/**
 * Protokolliert einen Fehler ohne Nutzerdaten und ohne Secrets.
 * Auf Vercel landet das in den Function-Logs.
 */
function logFailure(label: string, error: unknown): void {
  const detail =
    error instanceof Error
      ? `${error.name}: ${error.message}`
      : typeof error === "object" && error !== null && "message" in error
        ? String((error as { message: unknown }).message)
        : "unbekannter Fehler";

  console.error(`[contact] ${label} — ${detail}`);
}

/**
 * Uebergibt eine vorbereitete E-Mail an Resend.
 * Das SDK wirft bei API-Fehlern nicht, sondern liefert `{ error }`; Netzwerk-
 * und Laufzeitfehler kommen dagegen als Exception.
 */
async function deliver(
  client: Resend,
  email: ContactEmail,
  label: string,
): Promise<boolean> {
  try {
    const { error } = await client.emails.send({
      from: email.from,
      to: email.to,
      subject: email.subject,
      html: email.html,
      text: email.text,
      ...(email.replyTo ? { replyTo: email.replyTo } : {}),
    });

    if (error) {
      logFailure(label, error);
      return false;
    }

    return true;
  } catch (error) {
    logFailure(label, error);
    return false;
  }
}

/**
 * Verschickt beide E-Mails.
 *
 * Reihenfolge ist bewusst: zuerst die Anfrage an den Betreiber. Scheitert
 * sie, wird keine Bestaetigung verschickt — der Besucher soll keine Zusage
 * bekommen fuer etwas, das nie angekommen ist.
 */
export async function sendContactEmails(
  values: ContactFormValues,
): Promise<ContactSendResult> {
  const apiKey = getResendApiKey();

  if (!apiKey) {
    // Kein Key hinterlegt: Konfigurationsfehler, kein Fehler des Besuchers.
    console.error("[contact] RESEND_API_KEY ist nicht gesetzt.");
    return { status: "failed", reason: "config" };
  }

  const client = new Resend(apiKey);

  const ownerDelivered = await deliver(
    client,
    buildOwnerEmail(values, getContactRecipient()),
    "Kontaktanfrage konnte nicht zugestellt werden",
  );

  if (!ownerDelivered) {
    return { status: "failed", reason: "delivery" };
  }

  const confirmationDelivered = await deliver(
    client,
    buildVisitorEmail(values),
    "Bestaetigung an den Besucher konnte nicht zugestellt werden",
  );

  return confirmationDelivered ? { status: "sent" } : { status: "partial" };
}
