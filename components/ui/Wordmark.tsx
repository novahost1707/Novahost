/**
 * Markenzeichen: ein Pixel-N (5x5-Raster) vor der Wortmarke.
 * Das Raster ist dasselbe 4px-Modul, auf dem das gesamte Design aufsetzt.
 */
export function PixelMark({ size = 22 }: { size?: number }) {
  const cells: Array<[number, number]> = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 5 5"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
    >
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
      ))}
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={className ? `wordmark ${className}` : "wordmark"}>
      <span className="wordmark__mark">
        <PixelMark />
      </span>
      <span className="wordmark__text">NOVAHOST</span>
    </span>
  );
}
