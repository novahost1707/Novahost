import { firstName, formatReceivedAt, type Lead } from "@/lib/lead";
import { siteUrl, site } from "@/lib/site";
import {
  button,
  dataTable,
  esc,
  escMultiline,
  farbe,
  heading,
  label,
  link,
  paragraph,
  rule,
  shell,
  steps,
  subheading,
} from "@/lib/email/render";

export type Mail = { subject: string; html: string; text: string };

const TYP_NAME: Record<Lead["type"], string> = {
  analyse: "Website-Analyse",
  projekt: "Projektanfrage",
};

/* ============================================================
   1. Benachrichtigung an uns
   ============================================================ */

/**
 * Die Nachricht, die im eigenen Postfach landet.
 *
 * Der Betreff nennt Art und Namen, damit sich Anfragen im Posteingang ohne
 * Öffnen unterscheiden lassen. Antworten geht direkt an den Absender - dafür
 * setzt der Versand reply_to auf die Adresse aus dem Formular.
 */
export function internalNotification(lead: Lead): Mail {
  const istAnalyse = lead.type === "analyse";
  const zeilen = [
    { label: "Name", value: lead.name },
    { label: "E-Mail", value: link(`mailto:${lead.email}`, lead.email), raw: true },
    { label: "Telefon", value: lead.phone },
    { label: "Unternehmen", value: lead.company },
    { label: "Branche", value: lead.branch },
    { label: "Website", value: lead.website ? link(lead.website) : "", raw: true },
    { label: "Leistungen", value: lead.services.join(", ") },
    { label: "Budget", value: lead.budget },
    { label: "Zeitraum", value: lead.timeframe },
    { label: "Ziel", value: escMultiline(lead.goal), raw: true },
    { label: "Nachricht", value: escMultiline(lead.message), raw: true },
    { label: "Eingegangen", value: formatReceivedAt(lead.receivedAt) },
  ];

  const inhalt = [
    label(istAnalyse ? "NEUE WEBSITE-ANALYSE" : "NEUE PROJEKTANFRAGE"),
    heading(esc(lead.name)),
    paragraph(
      istAnalyse
        ? `hat eine kostenlose Website-Analyse angefordert. Die zu prüfende Seite steht unten.`
        : `hat das Formular für ein Erstgespräch ausgefüllt.`,
    ),
    rule(),
    dataTable(zeilen),
    rule(),
    button(`mailto:${lead.email}`, "Direkt antworten"),
  ].join("");

  return {
    subject: `${istAnalyse ? "Website-Analyse" : "Projektanfrage"}: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    html: shell({
      titel: `Neue ${TYP_NAME[lead.type]}`,
      vorschau: `${lead.name}${lead.company ? ` - ${lead.company}` : ""}${lead.website ? ` - ${lead.website}` : ""}`,
      inhalt,
      fusszeile: `Automatisch erzeugt vom Formular auf ${esc(siteUrl.replace(/^https?:\/\//, ""))}. Eine Antwort auf diese E-Mail geht direkt an ${esc(lead.email)}.`,
    }),
    text: notificationText(lead),
  };
}

function notificationText(lead: Lead): string {
  const zeilen: [string, string][] = [
    ["Art", TYP_NAME[lead.type]],
    ["Name", lead.name],
    ["E-Mail", lead.email],
    ["Telefon", lead.phone],
    ["Unternehmen", lead.company],
    ["Branche", lead.branch],
    ["Website", lead.website],
    ["Leistungen", lead.services.join(", ")],
    ["Budget", lead.budget],
    ["Zeitraum", lead.timeframe],
    ["Ziel", lead.goal],
    ["Nachricht", lead.message],
    ["Eingegangen", formatReceivedAt(lead.receivedAt)],
  ];
  return zeilen
    .filter(([, value]) => value !== "")
    .map(([schluessel, value]) => `${schluessel}: ${value}`)
    .join("\n");
}

/* ============================================================
   2. Bestätigung an den Absender
   ============================================================ */

const SCHRITTE_ANALYSE = [
  {
    num: "01",
    title: "Wir sehen uns Ihre Seite an",
    body: "Von Hand, nicht per automatisiertem Standard-Bericht. Wir prüfen Ladezeit, Darstellung auf dem Handy, Auffindbarkeit bei Google und die Frage, ob Besucher überhaupt zu einer Anfrage kommen.",
  },
  {
    num: "02",
    title: "Sie bekommen die Auswertung",
    body: "Innerhalb von zwei Werktagen per E-Mail: was gut läuft, was Anfragen kostet und was zuerst anzupacken wäre.",
  },
  {
    num: "03",
    title: "Gespräch, wenn Sie möchten",
    body: "Rund dreißig Minuten, kostenlos und ohne Verpflichtung. Sie können die Analyse auch einfach selbst umsetzen.",
  },
];

const SCHRITTE_PROJEKT = [
  {
    num: "01",
    title: "Wir prüfen Ihre Angaben",
    body: "Noch heute oder am nächsten Werktag. Wir schauen uns an, was Sie vorhaben, und überlegen, welcher Weg dahin am kürzesten ist.",
  },
  {
    num: "02",
    title: "Terminvorschlag per E-Mail",
    body: "Innerhalb von zwei Werktagen melden wir uns mit einer ersten Einschätzung und zwei, drei möglichen Terminen.",
  },
  {
    num: "03",
    title: "Erstgespräch",
    body: "Rund dreißig Minuten per Telefon oder Video. Danach wissen Sie, was Ihre Website braucht, was sie kostet und wie lange sie dauert.",
  },
];

/** Bestätigung für die kostenlose Website-Analyse. */
export function confirmationAnalyse(lead: Lead): Mail {
  const inhalt = [
    label("KOSTENLOSE WEBSITE-ANALYSE"),
    heading(`Ihre Analyse ist<br><span style="color:${farbe.akzent};">angefordert.</span>`),
    paragraph(
      `Hallo ${esc(firstName(lead))}, danke für Ihre Anfrage. Wir haben Ihre Website notiert und sehen sie uns in den nächsten Tagen persönlich an.`,
    ),
    lead.website
      ? dataTable([{ label: "Zu prüfende Seite", value: link(lead.website), raw: true }])
      : "",
    rule(),
    subheading("Wie es weitergeht"),
    steps(SCHRITTE_ANALYSE),
    rule(),
    paragraph(
      `Bis dahin: Alle Preise und Leistungen stehen offen auf der Website - ohne dass Sie dafür etwas anfragen müssten.`,
    ),
    button(siteUrl, "Zur Website"),
  ].join("");

  return {
    subject: "Ihre kostenlose Website-Analyse ist angefordert",
    html: shell({
      titel: "Website-Analyse angefordert",
      vorschau: "Wir sehen uns Ihre Seite an und melden uns innerhalb von zwei Werktagen.",
      inhalt,
      fusszeile: absenderFuss(lead, "die kostenlose Website-Analyse"),
    }),
    text: [
      "KOSTENLOSE WEBSITE-ANALYSE",
      "",
      `Hallo ${firstName(lead)},`,
      "",
      "danke für Ihre Anfrage. Wir haben Ihre Website notiert und sehen sie uns in den naechsten Tagen persönlich an.",
      lead.website ? `\nZu prüfende Seite: ${lead.website}` : "",
      "",
      "WIE ES WEITERGEHT",
      ...SCHRITTE_ANALYSE.map((s) => `${s.num} ${s.title}\n   ${s.body}`),
      "",
      siteUrl,
      "",
      textFuss(lead, "die kostenlose Website-Analyse"),
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

/** Bestätigung für die Anfrage nach einem Erstgespräch. */
export function confirmationProjekt(lead: Lead): Mail {
  const zusammenfassung = dataTable([
    { label: "Unternehmen", value: lead.company },
    { label: "Leistungen", value: lead.services.join(", ") },
    { label: "Budgetrahmen", value: lead.budget },
    { label: "Zeitraum", value: lead.timeframe },
  ]);

  const inhalt = [
    label("KOSTENLOSES ERSTGESPRÄCH"),
    heading(`Ihre Anfrage ist<br><span style="color:${farbe.akzent};">angekommen.</span>`),
    paragraph(
      `Hallo ${esc(firstName(lead))}, danke für Ihr Interesse. Wir sehen uns Ihre Angaben an und melden uns mit einem Terminvorschlag für ein kostenloses Erstgespräch.`,
    ),
    zusammenfassung,
    rule(),
    subheading("Wie es weitergeht"),
    steps(SCHRITTE_PROJEKT),
    rule(),
    paragraph(
      `Sie gehen mit dieser Anfrage keine Verpflichtung ein. Falls sich etwas geändert hat oder Ihnen noch etwas einfällt, antworten Sie einfach auf diese E-Mail.`,
    ),
    button(`${siteUrl}/#preise`, "Preise ansehen"),
  ].join("");

  return {
    subject: "Ihre Anfrage für ein kostenloses Erstgespräch",
    html: shell({
      titel: "Anfrage für ein Erstgespräch",
      vorschau: "Wir melden uns innerhalb von zwei Werktagen mit einem Terminvorschlag.",
      inhalt,
      fusszeile: absenderFuss(lead, "ein kostenloses Erstgespräch"),
    }),
    text: [
      "KOSTENLOSES ERSTGESPRÄCH",
      "",
      `Hallo ${firstName(lead)},`,
      "",
      "danke für Ihr Interesse. Wir sehen uns Ihre Angaben an und melden uns mit einem Terminvorschlag für ein kostenloses Erstgespräch.",
      "",
      lead.company ? `Unternehmen: ${lead.company}` : "",
      lead.services.length ? `Leistungen: ${lead.services.join(", ")}` : "",
      lead.budget ? `Budgetrahmen: ${lead.budget}` : "",
      lead.timeframe ? `Zeitraum: ${lead.timeframe}` : "",
      "",
      "WIE ES WEITERGEHT",
      ...SCHRITTE_PROJEKT.map((s) => `${s.num} ${s.title}\n   ${s.body}`),
      "",
      `Preise: ${siteUrl}/#preise`,
      "",
      textFuss(lead, "ein kostenloses Erstgespräch"),
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

export function confirmationFor(lead: Lead): Mail {
  return lead.type === "analyse" ? confirmationAnalyse(lead) : confirmationProjekt(lead);
}

/**
 * Fußzeile der Bestätigungen.
 *
 * Der Hinweis, warum die E-Mail ankommt, gehört dorthin: er verhindert, dass
 * die Nachricht als unerwünscht eingestuft wird, wenn jemand eine fremde
 * Adresse einträgt. Der Link zur Datenschutzerklärung erfüllt zugleich die
 * Informationspflicht aus Art. 13 DSGVO.
 */
function absenderFuss(lead: Lead, anlass: string): string {
  const kontakt = site.email
    ? ` Fragen? Schreiben Sie an ${link(`mailto:${site.email}`, site.email)}.`
    : "";
  return `Sie erhalten diese E-Mail, weil unter ${esc(siteUrl.replace(/^https?:\/\//, ""))} mit der Adresse ${esc(lead.email)} ${esc(anlass)} angefragt wurde. Es folgt keine Werbung.${kontakt} ${link(`${siteUrl}/datenschutz`, "Datenschutz")} &middot; ${link(`${siteUrl}/impressum`, "Impressum")}`;
}

function textFuss(lead: Lead, anlass: string): string {
  return [
    "--",
    `Sie erhalten diese E-Mail, weil unter ${siteUrl.replace(/^https?:\/\//, "")} mit der Adresse ${lead.email} ${anlass} angefragt wurde. Es folgt keine Werbung.`,
    `Datenschutz: ${siteUrl}/datenschutz`,
    `Impressum: ${siteUrl}/impressum`,
  ].join("\n");
}
