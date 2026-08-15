/** Kleine Helfer ohne externe Abhaengigkeiten. */

type ClassValue = string | false | null | undefined;

/**
 * Fasst Klassennamen zusammen und ignoriert falsy Werte.
 * Ersetzt clsx/classnames fuer den hier benoetigten Umfang.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Maskiert HTML-Sonderzeichen. Pflicht fuer jeden Nutzertext, der in eine
 * HTML-E-Mail eingesetzt wird — sonst koennte eine Eingabe wie
 * `<script>` oder `<a href=…>` die Mail veraendern (XSS / Phishing).
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Formatiert einen Eurobetrag in deutscher Schreibweise.
 * Ganze Betraege stehen ohne Nachkommastellen — "59 €" liest sich besser
 * als "59,00 €", waehrend "4,90 €" seine Null braucht.
 */
export function formatPrice(value: number): string {
  const hasFraction = !Number.isInteger(value);

  return value.toLocaleString("de-DE", {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  });
}
