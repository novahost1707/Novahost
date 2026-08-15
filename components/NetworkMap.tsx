"use client";

import { useInView } from "@/lib/use-in-view";
import { networkLinks, regions } from "@/lib/content";
import type { Region } from "@/types";

/**
 * Abstrahierte Netzwerkkarte: Standorte als Knoten, dazwischen animierte
 * Verbindungen.
 *
 * Bewusst keine Weltkarte — die Anordnung folgt grob der Geografie, ist aber
 * frei gesetzt (Koordinaten in lib/content.ts). Eine echte Karte wuerde einen
 * grossen Pfaddatensatz brauchen und optisch unruhig wirken.
 *
 * Die Animation laeuft in zwei Stufen: die Linien zeichnen sich einmal von
 * links nach rechts, danach laufen dauerhaft Lichtpakete darueber. Beides
 * startet erst, wenn die Karte im Bild ist — sonst waere es vorbei, bevor
 * jemand hinsieht.
 *
 * Barrierefreiheit: die Grafik ist dekorativ; dieselben Standorte stehen
 * daneben als echte Liste (siehe components/sections/Infrastructure.tsx).
 */

/**
 * Die Koordinaten in lib/content.ts sind Prozentwerte (0–100) in beide
 * Richtungen. Die Zeichenflaeche ist aber 16:10 — ohne Streckung waeren
 * Kreise Ellipsen. Deshalb wird die X-Achse hier auf die Breite des viewBox
 * gerechnet, statt das SVG zu verzerren.
 */
const VIEW_WIDTH = 160;
const VIEW_HEIGHT = 100;

function scaleX(x: number): number {
  return (x / 100) * VIEW_WIDTH;
}

/** Sucht einen Standort ueber seinen Code. */
function findRegion(code: string): Region | undefined {
  return regions.find((region) => region.code === code);
}

export default function NetworkMap() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={ref} className="relative aspect-[16/10] w-full">
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        aria-hidden="true"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="net-line-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1a5cff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#1a5cff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#00c2e0" stopOpacity="0.5" />
          </linearGradient>

          <radialGradient id="net-node-glow">
            <stop offset="0%" stopColor="#1a5cff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1a5cff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Verbindungen */}
        {inView
          ? networkLinks.map((link, index) => {
              const from = findRegion(link.from);
              const to = findRegion(link.to);
              if (!from || !to) return null;

              const x1 = scaleX(from.x);
              const x2 = scaleX(to.x);

              // Leicht gebogen statt schnurgerade: der Kontrollpunkt liegt
              // oberhalb der Mitte. Das laesst das Netz raeumlich wirken.
              const midX = (x1 + x2) / 2;
              const midY = (from.y + to.y) / 2;
              const curve = `M ${x1} ${from.y} Q ${midX} ${midY - 9} ${x2} ${to.y}`;

              // Naeherung der Pfadlaenge — genau genug fuer stroke-dasharray.
              const length = Math.hypot(x2 - x1, to.y - from.y) * 1.08 || 100;

              return (
                <g key={`${link.from}-${link.to}`}>
                  <path
                    d={curve}
                    className="net-line"
                    fill="none"
                    stroke="url(#net-line-gradient)"
                    strokeWidth="1.15"
                    vectorEffect="non-scaling-stroke"
                    style={
                      {
                        "--len": length,
                        "--delay": `${index * 0.12}s`,
                      } as React.CSSProperties
                    }
                  />

                  {/* Das Lichtpaket folgt exakt demselben Pfad. */}
                  <circle
                    r="1.15"
                    fill="#00c2e0"
                    className="net-pulse"
                    style={
                      {
                        offsetPath: `path("${curve}")`,
                        "--dur": `${3.4 + index * 0.42}s`,
                        "--delay": `${1.2 + index * 0.3}s`,
                      } as React.CSSProperties
                    }
                  />
                </g>
              );
            })
          : null}

        {/* Knoten */}
        {regions.map((region, index) => (
          <g key={region.code}>
            <circle
              cx={scaleX(region.x)}
              cy={region.y}
              r={region.primary ? 5.5 : 4}
              fill="url(#net-node-glow)"
            />

            {inView ? (
              <circle
                cx={scaleX(region.x)}
                cy={region.y}
                r={region.primary ? 1.8 : 1.4}
                fill="none"
                stroke={region.primary ? "#1a5cff" : "#00c2e0"}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                className="net-ring"
                style={{ "--delay": `${index * 0.28}s` } as React.CSSProperties}
              />
            ) : null}

            <circle
              cx={scaleX(region.x)}
              cy={region.y}
              r={region.primary ? 1.35 : 0.95}
              fill={region.primary ? "#1a5cff" : "#00c2e0"}
            />
          </g>
        ))}
      </svg>

      {/*
        Die Beschriftung der Kernstandorte liegt als HTML darueber statt als
        SVG-Text: dadurch bleibt sie in der Schrift der Seite, waechst nicht
        mit der Grafik mit und bleibt auf jedem Geraet gleich gross lesbar.
      */}
      {regions
        .filter((region) => region.primary)
        .map((region) => (
          <span
            key={region.code}
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
            className="pointer-events-none absolute -translate-y-[26px] translate-x-3 rounded-md border border-nh-line bg-white/80 px-2 py-1 font-mono text-[10.5px] whitespace-nowrap text-nh-ink backdrop-blur-sm max-[640px]:hidden"
          >
            {region.city} · {region.latency}
          </span>
        ))}
    </div>
  );
}
