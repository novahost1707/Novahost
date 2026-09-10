/**
 * Bildplätze der Demo-Seiten.
 *
 * Nur Typen - kein Dateisystemzugriff. Das Nachsehen, ob ein Foto vorliegt,
 * steckt in lib/demo-bilder.server.ts und läuft ausschließlich auf dem
 * Server; Komponenten im Browser bekommen das Ergebnis als Wert gereicht.
 */

export type Bildplatz = {
  /** Pfad unterhalb von public/, immer mit führendem Schrägstrich. */
  src: string;
  /** Was auf dem Foto zu sehen sein soll - zugleich der Alt-Text. */
  alt: string;
  /** Seitenverhältnis des Platzes. Fotos werden darauf zugeschnitten. */
  ratio: string;
  /** Welches Ersatzmotiv gezeichnet wird, solange kein Foto vorliegt. */
  motiv: MotivArt;
  /** Unterscheidet mehrfach verwendete Motive voneinander. */
  variante?: number;
  /**
   * Grundton des Ersatzmotivs. Ohne Angabe gilt die Farbwelt der Seite; mit
   * Angabe bekommt der einzelne Platz seinen eigenen Ton - so wirkt ein
   * Produktraster nicht wie achtmal dasselbe Bild.
   */
  ton?: string;
};

export type MotivArt =
  | "mode-stoff"
  | "mode-lookbook"
  | "mode-auslage"
  | "mode-hoodie"
  | "mode-shirt"
  | "mode-hemd"
  | "mode-strick"
  | "mode-mantel"
  | "mode-hose"
  | "mode-tasche"
  | "mode-cap"
  | "mode-jacke"
  | "mode-stepp"
  | "mode-muetze"
  | "mode-guertel"
  | "handwerk-werkbank"
  | "handwerk-schrank"
  | "handwerk-kueche"
  | "handwerk-regal"
  | "handwerk-treppe"
  | "handwerk-holz"
  | "handwerk-portraet"
  | "essen-teller"
  | "essen-raum"
  | "essen-koch"
  | "essen-wein"
  | "essen-detail";
