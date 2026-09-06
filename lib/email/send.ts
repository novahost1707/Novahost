import type { Lead } from "@/lib/lead";
import type { Mail } from "@/lib/email/templates";

/**
 * Versand über Resend, per REST statt SDK: ein fetch-Aufruf, keine weitere
 * Abhängigkeit im Bundle.
 *
 * Jedes der beiden Formulare hat einen eigenen Schlüssel und einen eigenen
 * Absender. Das kostet nichts und bringt zwei Dinge: im Resend-Protokoll ist
 * auf einen Blick zu sehen, welches Formular gelaufen ist, und ein
 * kompromittierter Schlüssel lässt sich einzeln zurückziehen, ohne dass das
 * andere Formular stehen bleibt.
 *
 * Fehlt die getrennte Angabe, greifen die gemeinsamen Variablen - so läuft die
 * Seite auch mit einem einzigen Schlüssel.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type MailKonfiguration = {
  apiKey: string;
  from: string;
  to: string;
};

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

/** Schlüssel und Absender für das jeweilige Formular. */
export function mailConfig(type: Lead["type"]): MailKonfiguration | null {
  const suffix = type === "analyse" ? "ANALYSE" : "PROJEKT";
  const apiKey = env(`RESEND_API_KEY_${suffix}`) || env("RESEND_API_KEY");
  const from = env(`LEAD_MAIL_FROM_${suffix}`) || env("LEAD_MAIL_FROM");
  const to = env("LEAD_MAIL_TO");
  if (!apiKey || !from || !to) return null;
  return { apiKey, from, to };
}

type SendeAuftrag = {
  config: MailKonfiguration;
  to: string;
  mail: Mail;
  replyTo?: string;
};

export async function sendMail({ config, to, mail, replyTo }: SendeAuftrag): Promise<void> {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [to],
      subject: mail.subject,
      html: mail.html,
      // Reine Textfassung mitschicken: sie erhoeht die Zustellrate und ist
      // die einzige Fassung, die manche Programme ueberhaupt anzeigen.
      text: mail.text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend antwortete mit ${response.status}${detail ? `: ${detail.slice(0, 300)}` : ""}`);
  }
}
