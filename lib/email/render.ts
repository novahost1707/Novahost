/**
 * Bausteine für die E-Mails.
 *
 * E-Mail-Programme sind kein Browser: Outlook rendert mit Word, Gmail wirft
 * <style>-Blöcke und CSS-Variablen weg, Grid und Flexbox fallen aus. Deshalb
 * hier bewusst altmodisch: Tabellen für das Gerüst, alle Farben und Abstände
 * direkt am Element. Die Werte sind dieselben wie in styles/tokens.css, nur
 * ausgeschrieben - eine Änderung dort muss hier nachgezogen werden.
 */

export const farbe = {
  grund: "#0a0b0a",
  flaeche: "#0f110f",
  flaecheTief: "#060706",
  linie: "#262a24",
  linieStark: "#333830",
  text: "#e2e4dd",
  textGedaempft: "#b2b7aa",
  textLeise: "#7e8478",
  akzent: "#97a390",
  akzentTief: "#3f5039",
  invers: "#eef0ea",
} as const;

const SANS =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

/**
 * Ersatz für die Pixelschrift: eigene Schriften lassen sich in E-Mails nicht
 * zuverlässig laden. Versalien plus weite Sperrung in einer Festbreitenschrift
 * treffen die Anmutung der Seite am nächsten.
 */
const PIXEL = "'Courier New', Courier, monospace";

/** Escaping für alles, was aus dem Formular kommt. */
export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Zeilenumbrüche aus Freitextfeldern für HTML übernehmen. */
export function escMultiline(value: string): string {
  return esc(value).replace(/\r?\n/g, "<br>");
}

export function label(text: string): string {
  return `<p style="margin:0 0 20px;font-family:${PIXEL};font-size:11px;line-height:1;letter-spacing:0.18em;text-transform:uppercase;color:${farbe.akzent};">${esc(text)}</p>`;
}

export function heading(text: string): string {
  return `<h1 style="margin:0 0 20px;font-family:${SANS};font-size:30px;line-height:1.08;letter-spacing:-0.03em;font-weight:700;color:${farbe.text};">${text}</h1>`;
}

export function subheading(text: string): string {
  return `<h2 style="margin:0 0 12px;font-family:${SANS};font-size:16px;line-height:1.3;letter-spacing:-0.01em;font-weight:700;color:${farbe.text};">${esc(text)}</h2>`;
}

export function paragraph(html: string, farbwert: string = farbe.textGedaempft): string {
  return `<p style="margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:1.62;color:${farbwert};">${html}</p>`;
}

export function rule(): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;"><tr><td style="height:1px;line-height:1px;font-size:0;background-color:${farbe.linie};">&nbsp;</td></tr></table>`;
}

export function button(href: string, text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 8px;"><tr><td style="background-color:${farbe.akzent};border-radius:2px;"><a href="${esc(href)}" style="display:inline-block;padding:14px 26px;font-family:${SANS};font-size:14px;font-weight:700;letter-spacing:-0.01em;color:${farbe.flaecheTief};text-decoration:none;">${esc(text)}</a></td></tr></table>`;
}

/** Nummerierte Schritte - dieselbe Gliederung wie auf der Bestätigungsseite. */
export function steps(items: { num: string; title: string; body: string }[]): string {
  const zeilen = items
    .map(
      (item) => `<tr>
      <td width="46" valign="top" style="padding:0 0 22px;font-family:${PIXEL};font-size:12px;line-height:1.5;letter-spacing:0.14em;color:${farbe.akzent};">${esc(item.num)}</td>
      <td valign="top" style="padding:0 0 22px;">
        <p style="margin:0 0 4px;font-family:${SANS};font-size:15px;font-weight:700;line-height:1.4;color:${farbe.text};">${esc(item.title)}</p>
        <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.6;color:${farbe.textGedaempft};">${esc(item.body)}</p>
      </td>
    </tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${zeilen}</table>`;
}

/** Feld-Wert-Liste für die Benachrichtigung an uns. Leere Felder fallen weg. */
export function dataTable(rows: { label: string; value: string; raw?: boolean }[]): string {
  const gefuellt = rows.filter((row) => row.value !== "");
  const zeilen = gefuellt
    .map((row, index) => {
      // Die letzte Zeile bekommt keine Trennlinie: darunter folgt ohnehin
      // rule() oder der Rand der Karte, sonst stuenden zwei Linien uebereinander.
      const linie = index === gefuellt.length - 1 ? "none" : `1px solid ${farbe.linie}`;
      return `<tr>
      <td width="150" valign="top" style="padding:9px 16px 9px 0;border-bottom:${linie};font-family:${PIXEL};font-size:11px;line-height:1.5;letter-spacing:0.14em;text-transform:uppercase;color:${farbe.textLeise};">${esc(row.label)}</td>
      <td valign="top" style="padding:9px 0;border-bottom:${linie};font-family:${SANS};font-size:15px;line-height:1.55;color:${farbe.text};">${row.raw ? row.value : esc(row.value)}</td>
    </tr>`;
    })
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">${zeilen}</table>`;
}

export function link(href: string, text = href): string {
  return `<a href="${esc(href)}" style="color:${farbe.akzent};text-decoration:underline;">${esc(text)}</a>`;
}

/**
 * Rahmen um jede E-Mail: Wortmarke, Inhalt, Fußzeile.
 *
 * Der Vorschautext ist der Satz, den Gmail und Apple Mail neben dem Betreff
 * anzeigen. Ohne ihn füllen die Programme die Zeile mit den ersten Wörtern des
 * Rumpfes - meist der Wortmarke.
 */
export function shell(options: {
  titel: string;
  vorschau: string;
  inhalt: string;
  fusszeile: string;
}): string {
  const fuellzeichen = "&#8199;&#65279;".repeat(80);
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${esc(options.titel)}</title>
</head>
<body style="margin:0;padding:0;width:100%;background-color:${farbe.grund};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${esc(options.vorschau)}${fuellzeichen}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${farbe.grund};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:${farbe.flaeche};border:1px solid ${farbe.linie};border-radius:2px;">
        <tr>
          <td style="padding:26px 32px;border-bottom:1px solid ${farbe.linie};">
            <span style="font-family:${SANS};font-size:15px;font-weight:800;letter-spacing:0.02em;color:${farbe.text};">NOVAHOST</span>
            <span style="font-family:${PIXEL};font-size:11px;letter-spacing:0.18em;color:${farbe.textLeise};">&nbsp;&nbsp;/&nbsp;&nbsp;WEBDESIGN</span>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 32px 32px;">${options.inhalt}</td>
        </tr>
        <tr>
          <td style="padding:22px 32px;border-top:1px solid ${farbe.linie};background-color:${farbe.flaecheTief};">
            <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.6;color:${farbe.textLeise};">${options.fusszeile}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
