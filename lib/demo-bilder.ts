import fs from "node:fs";
import path from "node:path";

/**
 * Bildplätze der Demo-Seiten.
 *
 * Die Seiten sind so gebaut, dass echte Fotos später ohne Codeänderung
 * eingesetzt werden können: Es zählt allein, ob unter public/ eine Datei mit
 * dem hinterlegten Namen liegt. Ist sie da, wird sie ausgeliefert; ist sie es
 * nicht, zeichnet <Bild> ein gestaltetes Motiv in der Farbwelt der jeweiligen
 * Seite. Kein graues Kästchen, kein "Bild folgt".
 *
 * Geprüft wird beim Bauen, nicht bei jedem Aufruf - die Demo-Seiten werden
 * statisch vorgerendert. Wer ein Foto ergänzt, stößt damit denselben Bau an,
 * der es auch einbindet.
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
  | "kaffee-tasse"
  | "kaffee-bohnen"
  | "kaffee-raum"
  | "kaffee-handwerk"
  | "mode-stoff"
  | "mode-strasse"
  | "mode-hoodie"
  | "mode-shirt"
  | "mode-hemd"
  | "mode-strick"
  | "mode-mantel"
  | "mode-hose"
  | "mode-tasche"
  | "mode-cap"
  | "handwerk-werkbank"
  | "handwerk-schrank"
  | "handwerk-kueche"
  | "handwerk-regal"
  | "handwerk-treppe"
  | "handwerk-holz"
  | "handwerk-portraet"
  | "park-landschaft"
  | "park-bahn"
  | "park-welt"
  | "park-wald"
  | "park-karussell"
  | "park-wasser"
  | "park-hotel"
  | "park-essen";

const WURZEL = path.join(process.cwd(), "public");

/**
 * Liegt unter public/ eine Datei zu diesem Platz?
 *
 * Zusätzlich zum angegebenen Namen werden die üblichen Endungen geprüft, damit
 * es keine Rolle spielt, ob ein Foto als .jpg, .webp oder .avif abgelegt wird.
 */
export function findeBild(src: string): string | null {
  const ohneEndung = src.replace(/\.[a-z0-9]+$/i, "");
  for (const endung of [path.extname(src), ".avif", ".webp", ".jpg", ".jpeg", ".png"]) {
    if (!endung) continue;
    const kandidat = `${ohneEndung}${endung}`;
    try {
      if (fs.existsSync(path.join(WURZEL, kandidat))) return kandidat;
    } catch {
      // Kein Zugriff aufs Dateisystem (etwa im Edge-Umfeld): dann Ersatzmotiv.
      return null;
    }
  }
  return null;
}
