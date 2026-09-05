import { ImageResponse } from "next/og";

/**
 * Icon für den iOS-Homescreen. Wird beim Build gerendert, damit keine
 * Bilddatei im Repo liegt - dieselbe Pixelmarke wie in der Wortmarke.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const CELLS: Array<[number, number]> = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 1], [2, 2], [3, 3],
  [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
];

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0b0a",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", width: 100, height: 100 }}>
          {Array.from({ length: 25 }, (_, i) => {
            const x = i % 5;
            const y = Math.floor(i / 5);
            const on = CELLS.some(([cx, cy]) => cx === x && cy === y);
            return <div key={i} style={{ width: 20, height: 20, background: on ? "#97a390" : "transparent" }} />;
          })}
        </div>
      </div>
    ),
    size,
  );
}
