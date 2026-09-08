import fs from "node:fs";
import path from "node:path";

/**
 * Nachsehen, ob zu einem Bildplatz ein Foto vorliegt.
 *
 * Läuft nur auf dem Server und nur beim Bauen - die Demo-Seiten werden
 * statisch vorgerendert. Wer ein Foto ergänzt, stößt damit denselben Bau an,
 * der es auch einbindet: kein Codeeingriff nötig.
 *
 * Diese Datei darf nie aus einer Komponente mit "use client" heraus
 * importiert werden; node:fs gibt es im Browser nicht.
 */

const WURZEL = path.join(process.cwd(), "public");

/**
 * Zusätzlich zum angegebenen Namen werden die üblichen Endungen geprüft,
 * damit es keine Rolle spielt, ob ein Foto als .jpg, .webp oder .avif
 * abgelegt wird.
 */
export function findeBild(src: string): string | null {
  const ohneEndung = src.replace(/\.[a-z0-9]+$/i, "");
  for (const endung of [path.extname(src), ".avif", ".webp", ".jpg", ".jpeg", ".png"]) {
    if (!endung) continue;
    const kandidat = `${ohneEndung}${endung}`;
    try {
      if (fs.existsSync(path.join(WURZEL, kandidat))) return kandidat;
    } catch {
      return null;
    }
  }
  return null;
}

/** Auflösung für viele Plätze auf einmal - für die Weitergabe an den Browser. */
export function findeBilder(quellen: string[]): Record<string, string | null> {
  const karte: Record<string, string | null> = {};
  for (const src of quellen) karte[src] = findeBild(src);
  return karte;
}
