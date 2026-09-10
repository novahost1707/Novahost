/**
 * Gesetzlich vorgeschriebene Anbieterangaben (§ 5 DDG, Art. 13 DSGVO,
 * § 312d BGB i. V. m. Art. 246a EGBGB).
 *
 * Bewusst fest im Code und nicht aus ENV: Impressum, Datenschutz und
 * Widerrufsbelehrung müssen immer vollständig sein. Eine vergessene oder
 * geleerte Umgebungsvariable wäre hier ein Rechtsmangel, kein Schönheitsfehler
 * - anders als bei den optionalen Kontaktangaben im Seitenfuß (lib/site.ts).
 *
 * Eine Änderung hier wirkt auf alle drei Rechtstexte gleichzeitig.
 */
export const anbieter = {
  /** Voller Vor- und Nachname; ohne Handelsregistereintrag zwingend. */
  name: "Tim Luca Schott",
  /** Geschäftsbezeichnung, unter der die Seite auftritt. */
  marke: "Novahost",
  strasse: "Dr.-Heinrich-Jasper-Str. 20",
  /** PLZ und Ort in einer Zeile, deutsche Schreibweise ohne Komma. */
  ort: "37581 Bad Gandersheim",
  land: "Deutschland",
  /** Internationale Schreibweise, damit der tel:-Link auch mobil funktioniert. */
  telefon: "+49 155 66091667",
  email: "officenovahost@gmail.com",
} as const;

/** Anschrift in einer Zeile, für Fließtext in den Rechtstexten. */
export const anbieterAnschrift = `${anbieter.strasse}, ${anbieter.ort}`;

/** Name samt Geschäftsbezeichnung, wie im Impressum ausgewiesen. */
export const anbieterName = `${anbieter.marke} - Inhaber: ${anbieter.name}`;

/** Ziel für tel:-Links: nur Plus und Ziffern. */
export const telefonHref = anbieter.telefon.replace(/[^+\d]/g, "");
