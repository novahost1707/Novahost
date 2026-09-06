import { NextResponse } from "next/server";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { clean, hasErrors, validateLead, type LeadPayload } from "@/lib/validation";
import { CONFIRMATION_COOKIE, CONFIRMATION_MAX_AGE } from "@/lib/confirmation";
import { buildLead, type Lead } from "@/lib/lead";
import { confirmationFor, internalNotification } from "@/lib/email/templates";
import { mailConfig, sendMail } from "@/lib/email/send";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Nimmt Projekt- und Analyse-Anfragen entgegen.
 *
 * Zwei Nachrichten je Anfrage: die Benachrichtigung an uns und die
 * Bestätigung an den Absender. Beide Formulare nutzen dafür eigene
 * Resend-Schlüssel - siehe lib/email/send.ts.
 *
 * Ohne Konfiguration wird die Anfrage serverseitig protokolliert, damit die
 * Seite auch vor dem Anbinden eines Postfachs funktioniert.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`lead:${clientKey(request.headers)}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Partial<LeadPayload>;
  try {
    body = (await request.json()) as Partial<LeadPayload>;
  } catch {
    return NextResponse.json({ ok: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: von Menschen nie ausgefüllt. Erfolg melden, aber nichts zustellen.
  if (clean(body.fax)) return NextResponse.json({ ok: true });

  const errors = validateLead(body);
  if (hasErrors(errors)) {
    return NextResponse.json(
      { ok: false, errors, message: "Bitte prüfen Sie Ihre Angaben." },
      { status: 422 },
    );
  }

  const lead = buildLead(body);

  try {
    await deliver(lead);
  } catch (error) {
    console.error("[lead] Zustellung fehlgeschlagen", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Die Anfrage konnte gerade nicht zugestellt werden. Bitte versuchen Sie es erneut.",
      },
      { status: 502 },
    );
  }

  // Nachweis fuer die Bestaetigungsseite. Ohne dieses Kennzeichen leitet
  // /anfrage-gesendet zurueck zur Startseite - die Seite ist damit nur nach
  // einer tatsaechlich abgeschickten Anfrage erreichbar, obwohl ihre Adresse
  // immer gleich bleibt.
  const response = NextResponse.json({ ok: true });
  response.cookies.set(CONFIRMATION_COOKIE, lead.type, {
    maxAge: CONFIRMATION_MAX_AGE,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

async function deliver(lead: Lead): Promise<void> {
  const webhook = process.env.LEAD_WEBHOOK_URL?.trim();
  const config = mailConfig(lead.type);
  let delivered = false;

  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!response.ok) throw new Error(`Webhook antwortete mit ${response.status}`);
    delivered = true;
  }

  if (config) {
    // Die Benachrichtigung an uns ist die eigentliche Zustellung. Schlaegt sie
    // fehl, ist die Anfrage verloren - also nach oben durchreichen, damit der
    // Absender es erneut versuchen kann.
    await sendMail({
      config,
      to: config.to,
      mail: internalNotification(lead),
      replyTo: lead.email,
    });
    delivered = true;

    // Die Bestaetigung ist Beiwerk. Sie darf eine bereits angekommene Anfrage
    // nicht zu einem Fehler machen - sonst schickt derselbe Mensch sie ein
    // zweites Mal ab und wir haben sie doppelt.
    try {
      await sendMail({
        config,
        to: lead.email,
        mail: confirmationFor(lead),
        replyTo: config.to,
      });
    } catch (error) {
      console.error("[lead] Bestätigung an den Absender fehlgeschlagen", error);
    }
  }

  if (!delivered) {
    console.info("[lead] Kein Zustellkanal konfiguriert - Anfrage nur protokolliert:", lead);
  }
}
