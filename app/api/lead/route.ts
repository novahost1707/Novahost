import { NextResponse } from "next/server";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { clean, hasErrors, normalizeUrl, validateLead, type LeadPayload } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Nimmt Projekt- und Analyse-Anfragen entgegen.
 * Die Zustellung ist optional konfigurierbar (Webhook und/oder Resend). Ohne
 * Konfiguration wird die Anfrage serverseitig protokolliert, damit die Seite
 * auch vor dem Anbinden eines Postfachs funktioniert.
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

  const lead: Lead = {
    type: body.type === "analyse" ? "analyse" : "projekt",
    company: clean(body.company, 160),
    website: body.website ? (normalizeUrl(body.website) ?? "") : "",
    branch: clean(body.branch, 160),
    goal: clean(body.goal, 2000),
    services: Array.isArray(body.services)
      ? body.services.slice(0, 12).map((service) => clean(service, 80))
      : [],
    budget: clean(body.budget, 80),
    timeframe: clean(body.timeframe, 80),
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    message: clean(body.message, 4000),
    receivedAt: new Date().toISOString(),
  };

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

  return NextResponse.json({ ok: true });
}

type Lead = {
  type: string;
  company: string;
  website: string;
  branch: string;
  goal: string;
  services: string[];
  budget: string;
  timeframe: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  receivedAt: string;
};

async function deliver(lead: Lead): Promise<void> {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_MAIL_TO;
  const from = process.env.LEAD_MAIL_FROM;
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

  if (resendKey && to && from) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `Neue ${lead.type === "analyse" ? "Website-Analyse" : "Projektanfrage"} - ${lead.name}`,
        text: formatLead(lead),
      }),
    });
    if (!response.ok) throw new Error(`Resend antwortete mit ${response.status}`);
    delivered = true;
  }

  if (!delivered) {
    console.info("[lead] Kein Zustellkanal konfiguriert - Anfrage nur protokolliert:", lead);
  }
}

function formatLead(lead: Lead): string {
  return Object.entries(lead)
    .filter(([, value]) => (Array.isArray(value) ? value.length > 0 : value !== ""))
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
    .join("\n");
}
