import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Vorschaubild fuer geteilte Links (WhatsApp, LinkedIn, Slack, X).
 * Wird beim Build einmal gerendert - es liegt also keine Bilddatei im Repo
 * und die Seite laedt zur Laufzeit nichts nach.
 *
 * Die Gestaltung folgt der Seite: dunkler Grund, Pixelraster als Marke,
 * ein einziger Farbakzent in Moosgruen.
 */

export const alt = "Novahost - Websites, die aus Besuchern Kunden machen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0a0b0a";
const PAPER = "#eef0ea";
const FOG = "#9aa093";
const MOSS = "#97a390";
const LINE = "rgba(226, 228, 221, 0.12)";

/** Pixel-N (5x5-Raster), dieselbe Form wie die Wortmarke auf der Seite. */
const MARK_CELLS: Array<[number, number]> = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 1], [2, 2], [3, 3],
  [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
];

/**
 * Laedt eine Schrift von Google Fonts. Schlaegt das fehl, rendert das Bild mit
 * der Standardschrift weiter - ein fehlendes Vorschaubild waere schlimmer als
 * ein typografisch nicht ganz markengetreues.
 */
async function loadFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`,
      { headers: { "User-Agent": "Mozilla/5.0 Chrome/120" } },
    ).then((response) => (response.ok ? response.text() : ""));

    const url = css.match(/src:\s*url\((https:\/\/[^)]+)\)/)?.[1];
    if (!url) return null;

    const font = await fetch(url);
    return font.ok ? await font.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [bold, regular] = await Promise.all([
    loadFont("Inter Tight", 800),
    loadFont("Inter", 400),
  ]);

  const fonts = [
    bold && { name: "Display", data: bold, weight: 800 as const, style: "normal" as const },
    regular && { name: "Body", data: regular, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 800 | 400; style: "normal" }[];

  const display = bold ? "Display" : undefined;
  const body = regular ? "Body" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: "64px 72px",
          position: "relative",
        }}
      >
        {/* Pixelfeld als angedeutete Textur, oben rechts auslaufend */}
        {/* 12 Spalten a 40 px ergeben genau die 480 px Breite - nur dann
            laeuft das Muster als sauberer diagonaler Verlauf um. */}
        <div style={{ position: "absolute", top: 0, right: 0, display: "flex", flexWrap: "wrap", width: 480, height: 288, opacity: 0.38 }}>
          {Array.from({ length: 96 }, (_, i) => {
            const row = Math.floor(i / 12);
            const col = i % 12;
            const near = (row + col) % 5 === 0;
            return (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 36,
                  background: near ? "rgba(151, 163, 144, 0.16)" : "rgba(226, 228, 221, 0.03)",
                }}
              />
            );
          })}
        </div>

        {/* Kopfzeile: Pixelmarke und Wortmarke */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", flexWrap: "wrap", width: 40, height: 40 }}>
            {Array.from({ length: 25 }, (_, i) => {
              const x = i % 5;
              const y = Math.floor(i / 5);
              const on = MARK_CELLS.some(([cx, cy]) => cx === x && cy === y);
              return <div key={i} style={{ width: 8, height: 8, background: on ? MOSS : "transparent" }} />;
            })}
          </div>
          <div style={{ fontFamily: display, fontSize: 34, fontWeight: 800, color: PAPER, letterSpacing: 1 }}>
            {site.wordmark}
          </div>
        </div>

        {/* Kernbotschaft */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 8 }}>
          <div style={{ fontFamily: display, fontSize: 86, fontWeight: 800, color: PAPER, lineHeight: 1.02, letterSpacing: -3 }}>
            WEBSITES, DIE AUS
          </div>
          <div style={{ fontFamily: display, fontSize: 86, fontWeight: 800, color: MOSS, lineHeight: 1.02, letterSpacing: -3 }}>
            BESUCHERN KUNDEN MACHEN.
          </div>
        </div>

        {/* Fusszeile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 26,
          }}
        >
          <div style={{ fontFamily: body, fontSize: 26, color: FOG }}>
            Webdesign für Handwerk, Dienstleister und KMU
          </div>
          <div style={{ fontFamily: body, fontSize: 26, color: PAPER }}>ab 1.490 EUR</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
