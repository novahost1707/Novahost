/**
 * Route Handler des Kontaktformulars.
 *
 * Ablauf: Formular (Client) -> diese Route -> Resend -> zwei E-Mails.
 * Der Client spricht Resend nie direkt an; RESEND_API_KEY wird ausschliesslich
 * hier serverseitig gelesen und niemals in einer Antwort zurueckgegeben.
 */
import { NextResponse } from "next/server";
import { sendContactEmails } from "@/lib/email/send";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  isHoneypotTriggered,
  parseContactPayload,
  validateContactForm,
} from "@/lib/validation";

/** Resend laeuft im Node-Runtime, nicht am Edge. */
export const runtime = "nodejs";
/** Keine Zwischenspeicherung von Formularabsendungen. */
export const dynamic = "force-dynamic";

/** Obergrenze fuer den Rohbody — greift, bevor JSON geparst wird. */
const MAX_BODY_BYTES = 24 * 1024;

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

/** Antwort-Form fuer den Client. Enthaelt bewusst keine technischen Details. */
type ContactResponse =
  | { status: "sent" }
  | { status: "partial"; message: string }
  | { status: "error"; code: ContactErrorCode; message: string };

type ContactErrorCode =
  | "invalid_request"
  | "validation_error"
  | "rate_limited"
  | "send_failed";

function jsonResponse(
  body: ContactResponse,
  init?: { status?: number; headers?: Record<string, string> },
): NextResponse<ContactResponse> {
  return NextResponse.json(body, {
    status: init?.status ?? 200,
    headers: { "Cache-Control": "no-store", ...init?.headers },
  });
}

function errorResponse(
  code: ContactErrorCode,
  message: string,
  status: number,
  headers?: Record<string, string>,
): NextResponse<ContactResponse> {
  return jsonResponse({ status: "error", code, message }, { status, headers });
}

/**
 * Ermittelt den Absender fuer das Rate-Limit. Auf Vercel steht die echte
 * Client-IP in x-forwarded-for (erster Eintrag).
 */
function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request): Promise<NextResponse<ContactResponse>> {
  try {
    /* --- Spam-Schutz vor jeder weiteren Arbeit ---------------------------- */
    const limit = checkRateLimit(clientKey(request), RATE_LIMIT);
    if (!limit.allowed) {
      return errorResponse(
        "rate_limited",
        "Zu viele Anfragen in kurzer Zeit. Bitte versuche es später noch einmal.",
        429,
        { "Retry-After": String(limit.retryAfterSeconds) },
      );
    }

    /* --- Body lesen und begrenzen ---------------------------------------- */
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return errorResponse(
        "invalid_request",
        "Anfrage konnte nicht verarbeitet werden.",
        415,
      );
    }

    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
      return errorResponse(
        "validation_error",
        "Deine Nachricht ist zu lang. Bitte kürze sie etwas.",
        413,
      );
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(raw);
    } catch {
      return errorResponse(
        "invalid_request",
        "Anfrage konnte nicht verarbeitet werden.",
        400,
      );
    }

    /* --- Normalisieren und serverseitig validieren ------------------------ */
    const values = parseContactPayload(parsedJson);
    if (!values) {
      return errorResponse(
        "invalid_request",
        "Anfrage konnte nicht verarbeitet werden.",
        400,
      );
    }

    // Honeypot: von Bots ausgefuellt. Erfolg vortaeuschen, statt dem Bot zu
    // verraten, woran er gescheitert ist — es wird nichts versendet.
    if (isHoneypotTriggered(values)) {
      return jsonResponse({ status: "sent" });
    }

    const errors = validateContactForm(values);
    if (Object.keys(errors).length > 0) {
      return errorResponse(
        "validation_error",
        "Bitte prüfe deine Eingaben und versuche es erneut.",
        400,
      );
    }

    /* --- Versand --------------------------------------------------------- */
    const result = await sendContactEmails(values);

    if (result.status === "failed") {
      return errorResponse(
        "send_failed",
        "Deine Anfrage konnte gerade nicht gesendet werden. Bitte versuche es später erneut oder schreib direkt an hello@novahost.dev.",
        502,
      );
    }

    if (result.status === "partial") {
      // Die Anfrage ist angekommen, nur die Bestaetigungsmail nicht.
      // Kein voller Erfolg — der Besucher erfaehrt genau das.
      return jsonResponse({
        status: "partial",
        message:
          "Deine Anfrage ist angekommen. Die Bestätigungs-E-Mail konnte allerdings nicht zugestellt werden — bitte prüfe deine E-Mail-Adresse.",
      });
    }

    return jsonResponse({ status: "sent" });
  } catch (error) {
    // Letztes Netz: nichts von der Ursache nach aussen geben.
    console.error(
      `[contact] Unerwarteter Fehler — ${
        error instanceof Error ? `${error.name}: ${error.message}` : "unbekannt"
      }`,
    );

    return errorResponse(
      "send_failed",
      "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuche es später erneut.",
      500,
    );
  }
}

/** Alles ausser POST wird abgelehnt. */
function methodNotAllowed(): NextResponse<ContactResponse> {
  return errorResponse("invalid_request", "Methode nicht erlaubt.", 405, {
    Allow: "POST",
  });
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const HEAD = methodNotAllowed;
