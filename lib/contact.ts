import type { ContactFormValues } from "@/types";

/**
 * Uebergabepunkt des Kontaktformulars an das eigene Backend.
 *
 * Der Client spricht ausschliesslich mit /api/contact — niemals direkt mit
 * Resend. Der API-Key existiert nur serverseitig und taucht in diesem Modul
 * (und damit im Browser-Bundle) an keiner Stelle auf.
 */

/** Ergebnis eines erfolgreichen Absendens. */
export type ContactSubmitResult =
  /** Anfrage und Bestaetigungsmail sind raus. */
  | { status: "sent" }
  /** Anfrage ist angekommen, die Bestaetigung an den Besucher aber nicht. */
  | { status: "partial"; message: string };

/** Fehler mit einer Meldung, die direkt angezeigt werden darf. */
export class ContactSubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactSubmitError";
  }
}

const GENERIC_ERROR =
  "Deine Anfrage konnte nicht gesendet werden. Bitte versuche es später erneut oder schreib direkt an hello@novahost.dev.";

const NETWORK_ERROR =
  "Keine Verbindung zum Server. Bitte prüfe deine Internetverbindung und versuche es erneut.";

interface ApiResponseBody {
  status?: unknown;
  message?: unknown;
}

function readMessage(body: ApiResponseBody | null, fallback: string): string {
  return typeof body?.message === "string" && body.message.trim()
    ? body.message
    : fallback;
}

export async function submitContactForm(
  values: ContactFormValues,
): Promise<ContactSubmitResult> {
  let response: Response;

  try {
    response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  } catch {
    // fetch wirft nur bei Netzwerk-/Abbruchfehlern, nicht bei 4xx/5xx.
    throw new ContactSubmitError(NETWORK_ERROR);
  }

  // Antwort kann bei einem Infrastrukturfehler auch HTML sein.
  let body: ApiResponseBody | null = null;
  try {
    body = (await response.json()) as ApiResponseBody;
  } catch {
    body = null;
  }

  if (!response.ok) {
    throw new ContactSubmitError(readMessage(body, GENERIC_ERROR));
  }

  if (body?.status === "partial") {
    return { status: "partial", message: readMessage(body, GENERIC_ERROR) };
  }

  if (body?.status === "sent") {
    return { status: "sent" };
  }

  // Unerwartete Antwortform — lieber als Fehler behandeln als faelschlich
  // Erfolg melden.
  throw new ContactSubmitError(GENERIC_ERROR);
}
