/**
 * HTML- und Text-Vorlagen der beiden Kontakt-E-Mails.
 *
 * Bewusst reine Funktionen ohne Netzwerk- oder Env-Zugriff: was hier
 * herauskommt, ist exakt das Objekt, das an Resend uebergeben wird. Dadurch
 * lassen sich Absender, Empfaenger und replyTo im Test pruefen (tests/).
 *
 * Jeder Nutzertext laeuft durch escapeHtml() — ohne Ausnahme.
 */
import { escapeHtml } from "@/lib/utils";
import { CONTACT_ROLE_LABELS } from "@/lib/validation";
import type { ContactFormValues } from "@/types";
import { FROM_ADDRESS, SITE_URL, STATUS_URL } from "./config";

/** Genau die Felder, die an resend.emails.send() uebergeben werden. */
export interface ContactEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

/* -------------------------------- Design -------------------------------- */
/* Farben und Typografie aus app/globals.css — E-Mails koennen keine
   CSS-Variablen und keine Webfonts nutzen, daher hier als feste Werte mit
   systemnahen Fallbacks. Die Mail ist wie die Seite hell gehalten. */

const COLOR = {
  white: "#ffffff",
  canvas: "#f6f9ff",
  panel: "#eef4ff",
  ink: "#08111f",
  body: "#46557a",
  mute: "#6d7d9e",
  blue: "#1a5cff",
  cyan: "#00c2e0",
  line: "rgba(11,39,96,0.10)",
} as const;

const FONT_DISPLAY = "'Sora','Helvetica Neue',Helvetica,Arial,sans-serif";
const FONT_BODY = "'Inter','Helvetica Neue',Helvetica,Arial,sans-serif";
const FONT_MONO = "'JetBrains Mono',Menlo,Consolas,monospace";

/* -------------------------------- Helfer -------------------------------- */

/**
 * Entfernt Zeilenumbrueche aus Betreff und Adressen. Resend nimmt zwar JSON
 * entgegen, aber ein Betreff mit Umbruch ist in keinem Fall gewollt.
 */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Kuerzt einen Wert fuer den Betreff, damit er nicht abgeschnitten wirkt. */
function truncate(value: string, max: number): string {
  const clean = singleLine(value);
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

function roleLabel(role: ContactFormValues["role"]): string {
  return role ? CONTACT_ROLE_LABELS[role] : "Keine Angabe";
}

/** Escaped Text mit erhaltenen Absaetzen — fuer die Nachricht des Besuchers. */
function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(date);
}

/* ------------------------------- Bausteine ------------------------------- */

/** Aeusserer Rahmen beider E-Mails: Hintergrund, Karte, Eyebrow, Headline. */
function shell(options: {
  title: string;
  preheader: string;
  eyebrow: string;
  heading: string;
  content: string;
}): string {
  const { title, preheader, eyebrow, heading, content } = options;

  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${COLOR.canvas};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLOR.canvas};">
<tr>
<td align="center" style="padding:32px 16px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="width:100%;max-width:560px;background:${COLOR.white};border:1px solid ${COLOR.line};border-radius:22px;">
<tr>
<td style="height:4px;background:linear-gradient(90deg,${COLOR.blue},${COLOR.cyan});border-radius:22px 22px 0 0;font-size:0;line-height:0;">&nbsp;</td>
</tr>
<tr>
<td style="padding:32px 34px 0 34px;">
<div style="font-family:${FONT_MONO};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLOR.blue};font-weight:700;">${escapeHtml(eyebrow)}</div>
<h1 style="margin:14px 0 0 0;font-family:${FONT_DISPLAY};font-size:26px;font-weight:800;line-height:1.12;letter-spacing:-0.02em;color:${COLOR.ink};">${escapeHtml(heading)}</h1>
</td>
</tr>
<tr>
<td style="padding:22px 34px 34px 34px;font-family:${FONT_BODY};font-size:15px;line-height:1.7;color:${COLOR.body};">
${content}
</td>
</tr>
</table>
<div style="max-width:560px;margin:18px auto 0;font-family:${FONT_MONO};font-size:11px;letter-spacing:0.08em;color:${COLOR.mute};">
Nova Host · hello@novahost.dev
</div>
</td>
</tr>
</table>
</body>
</html>`;
}

/** Eine Zeile der Anfrage-Uebersicht: Mono-Label ueber dem Wert. */
function detailRow(label: string, valueHtml: string): string {
  return `<tr>
<td style="padding:14px 0;border-bottom:1px solid ${COLOR.line};">
<div style="font-family:${FONT_MONO};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${COLOR.mute};">${escapeHtml(label)}</div>
<div style="margin-top:6px;font-family:${FONT_BODY};font-size:15px;font-weight:600;color:${COLOR.ink};word-break:break-word;">${valueHtml}</div>
</td>
</tr>`;
}

/** Pill-Button im Stil von .btn / .btn-ghost aus globals.css. */
function button(href: string, label: string, variant: "primary" | "ghost"): string {
  const style =
    variant === "primary"
      ? `background:${COLOR.blue};color:#ffffff;border:1px solid ${COLOR.blue};`
      : `background:${COLOR.white};color:${COLOR.ink};border:1px solid ${COLOR.line};`;

  return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener" style="display:inline-block;padding:13px 24px;border-radius:999px;font-family:${FONT_BODY};font-size:14px;font-weight:700;text-decoration:none;${style}">${escapeHtml(label)}</a>`;
}

/* ------------------------ E-Mail 1 — an Nova Host ------------------------ */

/**
 * Kontaktanfrage an den Betreiber.
 *
 * `replyTo` ist die Adresse des Absenders: "Antworten" im Mailprogramm geht
 * damit direkt an ihn, obwohl der Absender hello@novahost.dev ist.
 */
export function buildOwnerEmail(
  values: ContactFormValues,
  recipient: string,
  now: Date = new Date(),
): ContactEmail {
  const phone = values.phone.trim();
  // Die Adresse ist bereits validiert (kein Whitespace) und wird beim Einsetzen
  // zusaetzlich escaped — Anfuehrungszeichen koennen das Attribut nicht verlassen.
  const emailHref = `mailto:${values.email}`;

  const details = [
    detailRow("Name", escapeHtml(values.name)),
    detailRow("Anliegen", escapeHtml(roleLabel(values.role))),
    detailRow(
      "E-Mail",
      `<a href="${escapeHtml(emailHref)}" style="color:${COLOR.blue};text-decoration:none;">${escapeHtml(values.email)}</a>`,
    ),
    detailRow("Telefon", phone ? escapeHtml(phone) : "—"),
    detailRow("Eingegangen", escapeHtml(formatTimestamp(now))),
  ].join("\n");

  const content = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${details}
</table>

<div style="margin-top:26px;font-family:${FONT_MONO};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${COLOR.mute};">Nachricht</div>
<div style="margin-top:10px;padding:18px;background:${COLOR.panel};border:1px solid ${COLOR.line};border-left:3px solid ${COLOR.blue};border-radius:12px;font-family:${FONT_BODY};font-size:15px;line-height:1.7;color:${COLOR.ink};white-space:normal;word-break:break-word;">${escapeMultiline(values.message)}</div>

<p style="margin:24px 0 0 0;font-family:${FONT_BODY};font-size:13px;line-height:1.6;color:${COLOR.mute};">Diese E-Mail wurde vom Kontaktformular auf novahost.dev ausgelöst. Eine Antwort geht direkt an ${escapeHtml(values.email)}.</p>`;

  const text = [
    "Neue Kontaktanfrage über novahost.dev",
    "",
    `Name:        ${values.name}`,
    `Anliegen:    ${roleLabel(values.role)}`,
    `E-Mail:      ${values.email}`,
    `Telefon:     ${phone || "—"}`,
    `Eingegangen: ${formatTimestamp(now)}`,
    "",
    "Nachricht:",
    values.message,
    "",
    `Antworten geht direkt an ${values.email}.`,
  ].join("\n");

  return {
    from: FROM_ADDRESS,
    to: singleLine(recipient),
    replyTo: singleLine(values.email),
    subject: singleLine(
      `Neue Anfrage — ${truncate(values.name, 60)} (${roleLabel(values.role)})`,
    ),
    html: shell({
      title: "Neue Kontaktanfrage",
      preheader: `${truncate(values.name, 40)} · ${truncate(values.message, 90)}`,
      eyebrow: "Kontaktformular",
      heading: "Neue Anfrage",
      content,
    }),
    text,
  };
}

/* ---------------------- E-Mail 2 — an den Absender ----------------------- */

/**
 * Automatische Eingangsbestaetigung.
 *
 * Ohne `replyTo`: Antworten sollen an hello@novahost.dev gehen, nicht an eine
 * fremde Adresse aus dem Formular.
 */
export function buildVisitorEmail(values: ContactFormValues): ContactEmail {
  const content = `<p style="margin:0;font-family:${FONT_BODY};font-size:16px;line-height:1.7;color:${COLOR.ink};">Hallo ${escapeHtml(values.name)},</p>

<p style="margin:16px 0 0 0;font-family:${FONT_BODY};font-size:15px;line-height:1.7;color:${COLOR.body};">danke für deine Anfrage bei Nova Host.</p>

<p style="margin:14px 0 0 0;font-family:${FONT_BODY};font-size:15px;line-height:1.7;color:${COLOR.body};">Deine Nachricht liegt jetzt bei unserem Team. Wir antworten in der Regel innerhalb weniger Minuten, spätestens am nächsten Werktag.</p>

<div style="margin-top:24px;padding:16px 18px;background:${COLOR.canvas};border:1px solid ${COLOR.line};border-radius:12px;font-family:${FONT_MONO};font-size:12.5px;line-height:1.7;color:${COLOR.body};">
<span style="color:${COLOR.cyan};">$</span> nova-host status<br />
<span style="color:${COLOR.mute};">&gt; all systems operational</span><br />
<span style="color:${COLOR.mute};">&gt; uptime: 99.99% · latency: 12ms</span>
</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 6px 0;">
<tr>
<td style="padding:0 10px 10px 0;">${button(SITE_URL, "Zur Website", "primary")}</td>
<td style="padding:0 0 10px 0;">${button(STATUS_URL, "Systemstatus", "ghost")}</td>
</tr>
</table>

<p style="margin:22px 0 0 0;font-family:${FONT_BODY};font-size:15px;line-height:1.7;color:${COLOR.body};">Beste Grüße<br /><strong style="font-family:${FONT_DISPLAY};font-weight:800;color:${COLOR.ink};">Das Nova-Host-Team</strong></p>

<p style="margin:26px 0 0 0;padding-top:18px;border-top:1px solid ${COLOR.line};font-family:${FONT_BODY};font-size:12px;line-height:1.6;color:${COLOR.mute};">Diese Bestätigung wurde automatisch versendet. Du musst darauf nicht antworten.</p>`;

  const text = [
    `Hallo ${values.name},`,
    "",
    "danke für deine Anfrage bei Nova Host.",
    "",
    "Deine Nachricht liegt jetzt bei unserem Team. Wir antworten in der Regel innerhalb weniger Minuten, spätestens am nächsten Werktag.",
    "",
    "$ nova-host status",
    "> all systems operational",
    "> uptime: 99.99% · latency: 12ms",
    "",
    `Website: ${SITE_URL}`,
    `Status:  ${STATUS_URL}`,
    "",
    "Beste Grüße",
    "Das Nova-Host-Team",
    "",
    "Diese Bestätigung wurde automatisch versendet. Du musst darauf nicht antworten.",
  ].join("\n");

  return {
    from: FROM_ADDRESS,
    to: singleLine(values.email),
    subject: "Deine Anfrage bei Nova Host ist angekommen",
    html: shell({
      title: "Deine Anfrage ist angekommen",
      preheader:
        "Deine Anfrage ist angekommen — wir melden uns so schnell wie möglich.",
      eyebrow: "Anfrage eingegangen",
      heading: "Danke für deine Anfrage",
      content,
    }),
    text,
  };
}
