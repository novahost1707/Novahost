import type { MotivArt } from "@/lib/demo-bilder";

/**
 * Ersatzmotive für die Bildplätze der Demo-Seiten.
 *
 * Kein Platzhalter im üblichen Sinn: Jedes Motiv ist eine gezeichnete
 * Komposition zum jeweiligen Gegenstand und nimmt die Farben der Seite auf
 * (--m-1 bis --m-4, im Stylesheet der Seite gesetzt). Eine Seite wirkt damit
 * auch ohne Fotomaterial fertig - und sobald ein Foto unter public/ liegt,
 * tritt das Motiv dahinter zurück.
 *
 * Zwei Sorten: Szenen füllen den Rahmen und dürfen beschnitten werden
 * ("slice"), einzelne Gegenstände bleiben ganz sichtbar ("meet") und stehen
 * frei auf dem Grund - wie im Studio fotografiert.
 */

type Zeichnung = { box: string; passung: "slice" | "meet"; inhalt: React.ReactNode };

export function Motiv({ art, variante = 0 }: { art: MotivArt; variante?: number }) {
  const { box, passung, inhalt } = zeichne(art, variante);

  /* Dasselbe Motiv kann mehrfach auf einer Seite stehen. Damit es dort nicht
     wie kopiert wirkt, wird es je nach Variante gespiegelt und leicht
     verschoben - erkennbar verwandt, aber nicht identisch. */
  const [, , breite, hoehe] = box.split(" ").map(Number) as [number, number, number, number];
  const gespiegelt = variante % 2 === 1;
  const zoom = passung === "slice" ? 1 + (variante % 3) * 0.07 : 1;
  const transform = [
    gespiegelt ? `translate(${breite} 0) scale(-1 1)` : "",
    zoom !== 1 ? `translate(${((1 - zoom) * breite) / 2} ${((1 - zoom) * hoehe) / 2}) scale(${zoom})` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      className="motiv"
      viewBox={box}
      preserveAspectRatio={passung === "slice" ? "xMidYMid slice" : "xMidYMid meet"}
      role="presentation"
      aria-hidden="true"
    >
      {passung === "slice" && <rect width={breite} height={hoehe} fill="var(--m-1)" />}
      <g transform={transform || undefined}>{inhalt}</g>
    </svg>
  );
}

/* Schatten unter einem freigestellten Gegenstand - lässt ihn stehen statt schweben. */
function Schatten({ cx, cy, rx }: { cx: number; cy: number; rx: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.11} fill="var(--m-4)" opacity="0.16" />;
}

function zeichne(art: MotivArt, variante: number): Zeichnung {
  const S = "400 300";
  const P = "0 0 300 400";

  switch (art) {
    /* ===== Café ============================================== */
    case "kaffee-tasse":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <circle cx="200" cy="158" r="118" fill="var(--m-2)" />
            <circle cx="200" cy="158" r="88" fill="var(--m-3)" />
            <circle cx="200" cy="158" r="70" fill="var(--m-4)" />
            <ellipse cx="176" cy="132" rx="20" ry="13" fill="var(--m-3)" opacity="0.55" />
            <path d="M182 44c14-16 2-30 2-30M204 44c14-16 2-30 2-30M226 44c14-16 2-30 2-30"
              stroke="var(--m-2)" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.7" />
          </>
        ),
      };

    case "kaffee-bohnen":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            {[
              [96, 96, -22], [200, 74, 14], [300, 108, -8],
              [130, 190, 8], [246, 196, -18], [340, 214, 20], [58, 232, 10],
            ].map(([x, y, r], i) => {
              const px = x! + ((variante * 37 + i * 13) % 46) - 23;
              const py = y! + ((variante * 23 + i * 29) % 38) - 19;
              const pr = r! + variante * 26;
              return (
                <g key={i} transform={`translate(${px} ${py}) rotate(${pr})`}>
                  <ellipse rx="38" ry="27" fill={i % 2 ? "var(--m-3)" : "var(--m-2)"} />
                  <path d="M0 -25C10 -12 10 12 0 25" stroke="var(--m-1)" strokeWidth="4" fill="none" opacity="0.8" />
                </g>
              );
            })}
          </>
        ),
      };

    case "kaffee-raum":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <rect y="196" width="400" height="104" fill="var(--m-2)" />
            <rect x="34" y="150" width="130" height="46" fill="var(--m-3)" />
            <rect x="200" y="120" width="166" height="76" fill="var(--m-3)" opacity="0.7" />
            <circle cx="98" cy="120" r="26" fill="var(--m-4)" />
            <rect x="222" y="52" width="8" height="52" fill="var(--m-4)" />
            <rect x="290" y="52" width="8" height="52" fill="var(--m-4)" />
            <path d="M204 52h124" stroke="var(--m-4)" strokeWidth="8" />
            <rect x="252" y="150" width="62" height="46" fill="var(--m-4)" opacity="0.6" />
          </>
        ),
      };

    case "kaffee-handwerk":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <path d="M120 60h160l-30 130h-100z" fill="var(--m-2)" />
            <path d="M136 78h128l-22 96h-84z" fill="var(--m-3)" />
            <rect x="176" y="190" width="48" height="34" fill="var(--m-2)" />
            <rect x="128" y="224" width="144" height="20" rx="6" fill="var(--m-4)" />
            <circle cx="200" cy="126" r="26" fill="var(--m-4)" opacity="0.55" />
            <path d="M60 96v148M340 96v148" stroke="var(--m-3)" strokeWidth="6" opacity="0.5" />
          </>
        ),
      };

    /* ===== Mode: Szenen ====================================== */
    case "mode-strasse":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <rect x="16" y="40" width="86" height="260" fill="var(--m-2)" />
            <rect x="118" y="86" width="70" height="214" fill="var(--m-3)" />
            <rect x="204" y="18" width="94" height="282" fill="var(--m-2)" opacity="0.8" />
            <rect x="314" y="104" width="70" height="196" fill="var(--m-3)" opacity="0.75" />
            {[0, 1, 2, 3, 4, 5].map((r) =>
              [0, 1, 2].map((c) => (
                <rect key={`${r}${c}`} x={32 + c * 24} y={62 + r * 38} width="12" height="20" fill="var(--m-4)" opacity="0.45" />
              )),
            )}
            {[0, 1, 2, 3, 4, 5, 6].map((r) => (
              <rect key={r} x={220} y={38 + r * 38} width="62" height="16" fill="var(--m-4)" opacity="0.3" />
            ))}
          </>
        ),
      };

    case "mode-stoff":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <path d="M0 300V80c50-34 90 26 134-6s76 18 130-14 86 8 136-22v262z" fill="var(--m-2)" />
            <path d="M0 300V152c54-28 92 20 140-8s78 14 128-12 82 4 132-18v186z" fill="var(--m-3)" />
            <path d="M0 300v-72c58-22 96 16 146-6s80 10 128-10 76 2 126-14v102z" fill="var(--m-4)" />
          </>
        ),
      };

    /* ===== Mode: Kleidungsstücke, freigestellt ================ */
    case "mode-hoodie":
      return {
        box: P,
        passung: "meet",
        inhalt: (
          <>
            <Schatten cx={150} cy={368} rx={92} />
            <path d="M110 92c0-24 18-38 40-38s40 14 40 38l34 12c26 9 40 23 44 46l10 56-44 12-6-28v154H112V190l-6 28-44-12 10-56c4-23 18-37 44-46z" fill="var(--m-2)" />
            <path d="M110 92c14 22 26 32 40 32s26-10 40-32c-8 30-22 44-40 44s-32-14-40-44z" fill="var(--m-3)" />
            <rect x="112" y="252" width="76" height="10" rx="5" fill="var(--m-3)" />
            <path d="M132 96v34M168 96v34" stroke="var(--m-4)" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
            <rect x="94" y="330" width="112" height="12" fill="var(--m-3)" opacity="0.7" />
          </>
        ),
      };

    case "mode-shirt":
      return {
        box: P,
        passung: "meet",
        inhalt: (
          <>
            <Schatten cx={150} cy={352} rx={88} />
            <path d="M118 74h64l60 26c20 9 30 20 32 38l6 42-46 12-6-26v130H116V166l-6 26-46-12 6-42c2-18 12-29 32-38z" fill="var(--m-2)" />
            <path d="M118 74c8 18 18 26 32 26s24-8 32-26c-2 24-14 36-32 36s-30-12-32-36z" fill="var(--m-3)" />
            <path d="M116 296h68" stroke="var(--m-3)" strokeWidth="7" opacity="0.8" />
          </>
        ),
      };

    case "mode-hemd":
      return {
        box: P,
        passung: "meet",
        inhalt: (
          <>
            <Schatten cx={150} cy={360} rx={86} />
            <path d="M116 76h68l56 24c19 8 28 19 30 36l6 46-42 10-6-24v148H122V168l-6 24-42-10 6-46c2-17 11-28 30-36z" fill="var(--m-2)" />
            {/* Stehkragen mit kurzen Ecken statt tiefem Ausschnitt */}
            <path d="M116 76h68v18l-16 16-18-12-18 12-16-16z" fill="var(--m-3)" />
            <path d="M116 76l18 34 16-12-16-22zM184 76l-18 34-16-12 16-22z" fill="var(--m-3)" opacity="0.75" />
            <path d="M150 106v210" stroke="var(--m-3)" strokeWidth="5" opacity="0.85" />
            {[140, 178, 216, 254, 292].map((y) => (
              <circle key={y} cx="150" cy={y} r="4.5" fill="var(--m-4)" />
            ))}
            <rect x="188" y="150" width="34" height="42" rx="3" fill="var(--m-3)" opacity="0.6" />
          </>
        ),
      };

    case "mode-strick":
      return {
        box: P,
        passung: "meet",
        inhalt: (
          <>
            <Schatten cx={150} cy={358} rx={90} />
            <path d="M112 82h76l58 26c20 9 30 22 32 40l6 48-44 12-6-28v144H116V180l-6 28-44-12 6-48c2-18 12-31 32-40z" fill="var(--m-2)" />
            <path d="M112 82c10 20 22 28 38 28s28-8 38-28c-4 26-16 38-38 38s-34-12-38-38z" fill="var(--m-3)" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path key={i} d={`M118 ${140 + i * 26}q32 14 64 0`} stroke="var(--m-3)" strokeWidth="4" fill="none" opacity="0.65" />
            ))}
            <rect x="116" y="308" width="68" height="14" rx="7" fill="var(--m-3)" opacity="0.8" />
          </>
        ),
      };

    case "mode-mantel":
      return {
        box: P,
        passung: "meet",
        inhalt: (
          <>
            <Schatten cx={150} cy={392} rx={94} />
            <path d="M112 48h76l50 22c19 8 28 21 30 40l8 76-40 8-6-34v226H110V160l-6 34-40-8 8-76c2-19 11-32 30-40z" fill="var(--m-2)" />
            {/* Breites, fallendes Revers - das auffaelligste Merkmal des Mantels */}
            <path d="M112 48l38 78 38-78 16 8-30 40 16 14-40 62-40-62 16-14-30-40z" fill="var(--m-3)" />
            <path d="M150 126v260" stroke="var(--m-3)" strokeWidth="4" opacity="0.6" />
            {/* Guertel */}
            <rect x="62" y="232" width="176" height="16" fill="var(--m-3)" />
            <rect x="138" y="228" width="26" height="24" rx="3" fill="var(--m-4)" />
          </>
        ),
      };

    case "mode-hose":
      return {
        box: P,
        passung: "meet",
        inhalt: (
          <>
            <Schatten cx={150} cy={382} rx={82} />
            <path d="M86 58h128v34l-14 280h-44l-6-166-6 166H98L86 92z" fill="var(--m-2)" />
            <rect x="86" y="58" width="128" height="24" fill="var(--m-3)" />
            <path d="M150 82v154" stroke="var(--m-3)" strokeWidth="4" opacity="0.6" />
            <rect x="86" y="150" width="34" height="52" rx="4" fill="var(--m-3)" opacity="0.85" />
            <rect x="180" y="150" width="34" height="52" rx="4" fill="var(--m-3)" opacity="0.85" />
            <rect x="96" y="352" width="34" height="10" rx="5" fill="var(--m-4)" opacity="0.7" />
            <rect x="170" y="352" width="34" height="10" rx="5" fill="var(--m-4)" opacity="0.7" />
          </>
        ),
      };

    case "mode-tasche":
      return {
        box: P,
        passung: "meet",
        inhalt: (
          <>
            <Schatten cx={150} cy={344} rx={84} />
            <path d="M104 128c0-40 20-62 46-62s46 22 46 62" stroke="var(--m-3)" strokeWidth="14" fill="none" strokeLinecap="round" />
            <rect x="62" y="132" width="176" height="196" rx="10" fill="var(--m-2)" />
            <rect x="62" y="132" width="176" height="46" rx="10" fill="var(--m-3)" />
            <rect x="132" y="168" width="36" height="22" rx="4" fill="var(--m-4)" />
            <path d="M62 268h176" stroke="var(--m-3)" strokeWidth="4" opacity="0.55" />
          </>
        ),
      };

    case "mode-cap":
      return {
        box: P,
        passung: "meet",
        inhalt: (
          <>
            <Schatten cx={150} cy={286} rx={86} />
            <path d="M64 236c0-66 38-108 88-108s84 42 84 108z" fill="var(--m-2)" />
            <path d="M64 236c46 22 126 22 172 0 26 4 44 16 52 34H36c6-18 22-30 28-34z" fill="var(--m-3)" />
            <path d="M150 128v104" stroke="var(--m-3)" strokeWidth="4" opacity="0.6" />
            <path d="M104 148q46 30 92 0" stroke="var(--m-4)" strokeWidth="4" fill="none" opacity="0.5" />
            <circle cx="150" cy="130" r="8" fill="var(--m-4)" />
          </>
        ),
      };

    /* ===== Handwerk ========================================== */
    /* Werkbank mit Schraubzwingen, Werkzeugwand dahinter. */
    case "handwerk-werkbank":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            {/* Werkzeugwand */}
            <rect x="34" y="22" width="332" height="126" fill="var(--m-2)" opacity="0.45" />
            {[62, 104, 146].map((x, i) => (
              <g key={i}>
                <rect x={x} y="40" width="9" height="62" rx="3" fill="var(--m-4)" opacity="0.7" />
                <rect x={x - 8} y="96" width="25" height="14" rx="3" fill="var(--m-4)" opacity="0.7" />
              </g>
            ))}
            {[210, 246, 282].map((x, i) => (
              <rect key={i} x={x} y="44" width="22" height={54 + i * 14} rx="4" fill="var(--m-3)" opacity="0.75" />
            ))}
            <path d="M318 46l30 26-30 26z" fill="var(--m-4)" opacity="0.6" />
            {/* Hobelbank */}
            <rect x="18" y="170" width="364" height="26" fill="var(--m-3)" />
            <rect x="18" y="196" width="364" height="10" fill="var(--m-4)" opacity="0.55" />
            <rect x="46" y="206" width="22" height="94" fill="var(--m-3)" />
            <rect x="332" y="206" width="22" height="94" fill="var(--m-3)" />
            {/* Zwingen */}
            <rect x="110" y="152" width="12" height="52" fill="var(--m-4)" />
            <rect x="94" y="152" width="44" height="10" fill="var(--m-4)" />
            <rect x="240" y="152" width="12" height="52" fill="var(--m-4)" />
            <rect x="224" y="152" width="44" height="10" fill="var(--m-4)" />
            {/* Werkstueck */}
            <rect x="86" y="146" width="180" height="26" fill="var(--m-2)" />
          </>
        ),
      };

    /* Einbauschrank: Rasterfronten mit Griffleisten. */
    case "handwerk-schrank":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <rect x="26" y="20" width="348" height="260" fill="var(--m-2)" />
            {[0, 1, 2, 3].map((c) =>
              [0, 1, 2].map((r) => (
                <g key={`${c}${r}`}>
                  <rect x={36 + c * 85} y={30 + r * 84} width="75" height="74" fill="var(--m-3)" />
                  <rect x={44 + c * 85} y={94 + r * 84} width="42" height="4" rx="2" fill="var(--m-4)" opacity="0.85" />
                </g>
              )),
            )}
            {/* Offenes Fach mit Buechern */}
            <rect x="206" y="114" width="75" height="74" fill="var(--m-1)" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={212 + i * 14} y={126 + (i % 2) * 6} width="10" height={56 - (i % 2) * 6} fill="var(--m-4)" opacity={0.45 + (i % 3) * 0.15} />
            ))}
            <rect x="26" y="280" width="348" height="20" fill="var(--m-4)" opacity="0.45" />
          </>
        ),
      };

    /* Kuechenzeile: Unterschraenke, Arbeitsplatte, offenes Bord. */
    case "handwerk-kueche":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <rect y="196" width="400" height="104" fill="var(--m-2)" opacity="0.5" />
            {/* Unterschraenke */}
            <rect x="22" y="176" width="356" height="106" fill="var(--m-3)" />
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={30 + i * 89} y={184} width="81" height="90" fill="var(--m-2)" />
                <rect x={44 + i * 89} y={196} width="52" height="4" rx="2" fill="var(--m-4)" opacity="0.8" />
              </g>
            ))}
            {/* Arbeitsplatte */}
            <rect x="14" y="162" width="372" height="16" fill="var(--m-4)" />
            {/* Wandbord mit Geschirr */}
            <rect x="60" y="92" width="280" height="10" fill="var(--m-3)" />
            {[86, 120, 154].map((x, i) => (
              <circle key={i} cx={x} cy="78" r="13" fill="var(--m-4)" opacity="0.7" />
            ))}
            {[210, 236, 262, 288].map((x, i) => (
              <rect key={i} x={x} y="60" width="15" height="32" rx="4" fill="var(--m-4)" opacity="0.55" />
            ))}
            {/* Armatur */}
            <path d="M196 162v-46c0-12 10-20 22-20h18" stroke="var(--m-4)" strokeWidth="7" fill="none" strokeLinecap="round" />
          </>
        ),
      };

    /* Regalwand mit Buechern - Ladenbau. */
    case "handwerk-regal":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <rect x="16" y="16" width="368" height="268" fill="var(--m-2)" opacity="0.4" />
            {[0, 1, 2, 3].map((r) => (
              <g key={r}>
                <rect x="20" y={30 + r * 66} width="360" height="9" fill="var(--m-3)" />
                {Array.from({ length: 13 }, (_, i) => {
                  const h = 34 + ((i * 7 + r * 11) % 18);
                  return (
                    <rect
                      key={i}
                      x={28 + i * 27}
                      y={39 + r * 66 + (52 - h)}
                      width={9 + ((i + r) % 3) * 4}
                      height={h}
                      fill="var(--m-4)"
                      opacity={0.35 + ((i + r) % 4) * 0.16}
                    />
                  );
                })}
              </g>
            ))}
            <rect x="20" y="294" width="360" height="9" fill="var(--m-3)" />
            <rect x="16" y="16" width="10" height="278" fill="var(--m-3)" />
            <rect x="374" y="16" width="10" height="278" fill="var(--m-3)" />
          </>
        ),
      };

    /* Freitragende Treppe mit Stahlgelaender. */
    case "handwerk-treppe":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <rect y="270" width="400" height="30" fill="var(--m-2)" opacity="0.5" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <g key={i}>
                <rect x={40 + i * 44} y={252 - i * 34} width="72" height="15" rx="2" fill="var(--m-3)" />
                <rect x={40 + i * 44} y={267 - i * 34} width="72" height="7" fill="var(--m-4)" opacity="0.4" />
              </g>
            ))}
            <path d="M52 262L360 24" stroke="var(--m-4)" strokeWidth="5" opacity="0.75" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect key={i} x={70 + i * 44} y={190 - i * 34} width="4" height={64} fill="var(--m-4)" opacity="0.55" />
            ))}
          </>
        ),
      };

    case "handwerk-holz":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect key={i} y={i * 50} width="400" height="46" fill={i % 2 ? "var(--m-2)" : "var(--m-3)"} />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path
                key={`m${i}`}
                d={`M0 ${i * 50 + 24}c60-14 96 14 150 2s112-18 250-6`}
                stroke="var(--m-4)"
                strokeWidth="3"
                fill="none"
                opacity="0.45"
              />
            ))}
          </>
        ),
      };

    /* Portraet - die Variante entscheidet ueber Frisur und Statur, damit
       vier Personen auch als vier Personen erkennbar sind. */
    case "handwerk-portraet": {
      const breite = [104, 96, 116, 92][variante % 4]!;
      const kopf = [58, 54, 62, 52][variante % 4]!;
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <rect width="400" height="300" fill="var(--m-2)" />
            <circle cx="200" cy="300" r="150" fill="var(--m-3)" opacity="0.35" />
            {/* Schultern */}
            <path d={`M${200 - breite} 300c0-58 ${breite * 0.42} -92 ${breite} -92s${breite} 34 ${breite} 92z`} fill="var(--m-3)" />
            {/* Kopf */}
            <circle cx="200" cy={158 - kopf * 0.5} r={kopf} fill="var(--m-3)" />
            {/* Frisur je Variante */}
            {variante % 4 === 0 && (
              <path d={`M${200 - kopf} ${150 - kopf * 0.5}a${kopf} ${kopf} 0 0 1 ${kopf * 2} 0z`} fill="var(--m-4)" opacity="0.5" />
            )}
            {variante % 4 === 1 && (
              <path d={`M${200 - kopf - 6} ${164 - kopf * 0.5}c0-${kopf * 1.5} ${kopf * 2.4} -${kopf * 1.5} ${kopf * 2.4} 0 0 ${kopf * 0.5} -6 ${kopf * 0.7} -10 ${kopf * 0.7} 4-${kopf * 0.6} -2-${kopf} -${kopf * 1.2} -${kopf}s-${kopf * 1.2} ${kopf * 0.4} -${kopf * 1.2} ${kopf}c-4 0-10-${kopf * 0.2} -10-${kopf * 0.7}z`} fill="var(--m-4)" opacity="0.5" />
            )}
            {variante % 4 === 2 && (
              <>
                <path d={`M${200 - kopf - 4} ${142 - kopf * 0.5}h${kopf * 2 + 8}v-12a${kopf} ${kopf} 0 0 0 -${kopf * 2 + 8} 0z`} fill="var(--m-4)" opacity="0.55" />
                <rect x={200 - kopf - 12} y={132 - kopf * 0.5} width={kopf * 2 + 24} height="10" rx="5" fill="var(--m-4)" opacity="0.55" />
              </>
            )}
            {variante % 4 === 3 && (
              <path d={`M${200 - kopf} ${156 - kopf * 0.5}a${kopf} ${kopf} 0 0 1 ${kopf * 2} 0c0-${kopf * 0.9} -${kopf * 0.6} -${kopf * 0.9} -${kopf} -${kopf * 0.9}s-${kopf} 0-${kopf} ${kopf * 0.9}z`} fill="var(--m-4)" opacity="0.5" />
            )}
            <path d={`M${200 - breite * 0.4} 300v-52h${breite * 0.8}v52z`} fill="var(--m-4)" opacity="0.35" />
          </>
        ),
      };
    }

    /* ===== Freizeitpark ====================================== */
    case "park-landschaft":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <circle cx="316" cy="66" r="38" fill="var(--m-4)" opacity="0.8" />
            <path d="M0 214l84-104 66 78 52-58 92 106 106-72v136H0z" fill="var(--m-2)" />
            <path d="M0 258l96-62 74 44 78-52 152 78v34H0z" fill="var(--m-3)" />
            {[40, 110, 250, 330].map((x, i) => (
              <g key={i}>
                <path d={`M${x} 268l-22-46h44z`} fill="var(--m-4)" opacity="0.6" />
                <path d={`M${x} 244l-16-34h32z`} fill="var(--m-4)" opacity="0.7" />
              </g>
            ))}
          </>
        ),
      };

    case "park-bahn":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            {/* Holzgeruest */}
            {[52, 112, 172, 232, 292, 352].map((x, i) => {
              const hoehe = [212, 170, 236, 196, 148, 176][i]!;
              return (
                <g key={i} opacity="0.55">
                  <rect x={x - 3} y={300 - hoehe} width="6" height={hoehe} fill="var(--m-3)" />
                  <rect x={x + 27} y={300 - hoehe * 0.82} width="6" height={hoehe * 0.82} fill="var(--m-3)" />
                  {Array.from({ length: Math.max(2, Math.round(hoehe / 42)) }, (_, k) => (
                    <path
                      key={k}
                      d={`M${x} ${296 - k * 42}l30 -24`}
                      stroke="var(--m-3)"
                      strokeWidth="3"
                      opacity="0.7"
                    />
                  ))}
                </g>
              );
            })}
            {/* Streckenprofil: Lifthill, erster Abwurf, zwei Huegel */}
            <path
              d="M-10 268L96 62c6-12 22-12 28 0l58 122c8 16 30 16 38 0l30-58c8-16 30-16 38 0l58 120"
              stroke="var(--m-3)"
              strokeWidth="13"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M-10 282L96 76c6-12 22-12 28 0l58 122c8 16 30 16 38 0l30-58c8-16 30-16 38 0l58 120"
              stroke="var(--m-2)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Zug mit drei Wagen kurz vor dem Scheitel */}
            <g transform="rotate(-58 118 96)">
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${88 + i * 34} 82)`}>
                  <rect width="30" height="17" rx="6" fill="var(--m-4)" />
                  <circle cx="8" cy="20" r="4.5" fill="var(--m-3)" />
                  <circle cx="22" cy="20" r="4.5" fill="var(--m-3)" />
                  <circle cx="10" cy="4" r="4" fill="var(--m-3)" opacity="0.8" />
                  <circle cx="21" cy="4" r="4" fill="var(--m-3)" opacity="0.8" />
                </g>
              ))}
            </g>
            {/* Baumkronen im Vordergrund - der Park im Wald */}
            {[18, 82, 150, 224, 300, 372].map((x, i) => {
              const h = [96, 128, 88, 138, 104, 120][i]!;
              return (
                <g key={i}>
                  <rect x={x - 5} y={300 - h * 0.32} width="10" height={h * 0.32} fill="var(--m-3)" />
                  <path d={`M${x} ${300 - h}l${h * 0.42} ${h * 0.7}h-${h * 0.84}z`} fill="var(--m-2)" />
                  <path d={`M${x} ${300 - h * 1.24}l${h * 0.32} ${h * 0.56}h-${h * 0.64}z`} fill="var(--m-2)" />
                </g>
              );
            })}
          </>
        ),
      };

    /* Mischwald mit Weg - das Alleinstellungsmerkmal des Parks. */
    case "park-wald":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <rect width="400" height="300" fill="var(--m-1)" />
            {[
              [46, 300, 62], [116, 292, 78], [196, 300, 54], [268, 288, 84], [352, 300, 66],
            ].map(([x, boden, h], i) => (
              <g key={i} opacity={0.55 + (i % 3) * 0.18}>
                <rect x={x! - 5} y={boden! - h! * 0.3} width="10" height={h! * 0.3} fill="var(--m-3)" />
                <path d={`M${x} ${boden! - h!}l${h! * 0.42} ${h! * 0.72}h-${h! * 0.84}z`} fill="var(--m-2)" />
                <path d={`M${x} ${boden! - h! * 1.26}l${h! * 0.32} ${h! * 0.56}h-${h! * 0.64}z`} fill="var(--m-2)" />
              </g>
            ))}
            {/* Waldweg */}
            <path d="M132 300c22-72 56-96 68-160 8-42 4-72-6-100h84c-10 34-14 66-6 108 12 62 42 84 62 152z" fill="var(--m-4)" opacity="0.32" />
            <circle cx="330" cy="52" r="30" fill="var(--m-4)" opacity="0.65" />
          </>
        ),
      };

    /* Karussell fuer den Familienbereich. */
    case "park-karussell":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <rect width="400" height="300" fill="var(--m-1)" />
            <rect y="256" width="400" height="44" fill="var(--m-2)" opacity="0.5" />
            <path d="M200 34l122 74H78z" fill="var(--m-4)" />
            <path d="M200 34l122 74H78z" fill="var(--m-3)" opacity="0.28" />
            {[100, 140, 180, 220, 260, 300].map((x, i) => (
              <rect key={i} x={x} y="108" width={i % 2 ? 8 : 8} height="98" fill="var(--m-3)" opacity="0.8" />
            ))}
            {[124, 204, 284].map((x, i) => (
              <g key={i}>
                <ellipse cx={x} cy="182" rx="26" ry="20" fill="var(--m-2)" />
                <rect x={x - 8} y="150" width="6" height="34" fill="var(--m-3)" />
              </g>
            ))}
            <ellipse cx="200" cy="212" rx="146" ry="18" fill="var(--m-3)" />
            <circle cx="200" cy="28" r="12" fill="var(--m-4)" />
          </>
        ),
      };

    /* Wildwasserbahn - Boot in der Rinne. */
    case "park-wasser":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <rect width="400" height="300" fill="var(--m-1)" />
            <path d="M0 300V196c62-6 92-88 152-88s70 78 130 78 78-36 118-46v160z" fill="var(--m-2)" />
            <path d="M0 300v-58c66-14 96 26 156 12s86-42 146-30 68 22 98 16v60z" fill="var(--m-3)" />
            {/* Boot */}
            <path d="M158 178h74l-12 30h-50z" fill="var(--m-4)" />
            <circle cx="176" cy="168" r="9" fill="var(--m-4)" />
            <circle cx="212" cy="168" r="9" fill="var(--m-4)" />
            {/* Gischt */}
            {[150, 176, 202, 228, 254].map((x, i) => (
              <circle key={i} cx={x} cy={214 + (i % 2) * 10} r={7 + (i % 3) * 3} fill="var(--m-1)" opacity="0.75" />
            ))}
          </>
        ),
      };

    /* Waldhotel: Haeuser zwischen Baeumen. */
    case "park-hotel":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <rect width="400" height="300" fill="var(--m-1)" />
            <rect y="252" width="400" height="48" fill="var(--m-2)" opacity="0.45" />
            {[
              [60, 176, 96], [214, 158, 116],
            ].map(([x, y, b], i) => (
              <g key={i}>
                <rect x={x} y={y} width={b} height={252 - y!} fill="var(--m-2)" />
                <path d={`M${x! - 12} ${y}l${b! / 2 + 12} -${b! * 0.42}L${x! + b! + 12} ${y}z`} fill="var(--m-3)" />
                {[0, 1].map((r) =>
                  [0, 1].map((c) => (
                    <rect key={`${r}${c}`} x={x! + 16 + c * (b! / 2)} y={y! + 20 + r * 42} width={b! / 4} height="26" fill="var(--m-4)" opacity="0.7" />
                  )),
                )}
              </g>
            ))}
            {[24, 176, 348].map((x, i) => (
              <g key={i} opacity="0.85">
                <rect x={x - 4} y="216" width="8" height="40" fill="var(--m-3)" />
                <path d={`M${x} 140l34 84h-68z`} fill="var(--m-3)" />
                <path d={`M${x} 108l26 62h-52z`} fill="var(--m-3)" />
              </g>
            ))}
          </>
        ),
      };

    /* Gastronomie: Tablett mit Schale, Becher und Brot. */
    case "park-essen":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <rect width="400" height="300" fill="var(--m-1)" />
            <rect x="42" y="86" width="316" height="150" rx="18" fill="var(--m-2)" />
            <ellipse cx="140" cy="160" rx="58" ry="42" fill="var(--m-3)" />
            <ellipse cx="140" cy="152" rx="44" ry="30" fill="var(--m-4)" opacity="0.7" />
            <path d="M232 122h56l-8 84h-40z" fill="var(--m-3)" />
            <path d="M240 138h40l-5 52h-30z" fill="var(--m-4)" opacity="0.6" />
            <rect x="296" y="150" width="48" height="56" rx="12" fill="var(--m-3)" />
            <path d="M300 158q24-16 40 0" stroke="var(--m-4)" strokeWidth="5" fill="none" opacity="0.7" />
            <rect x="60" y="216" width="280" height="10" rx="5" fill="var(--m-3)" opacity="0.6" />
          </>
        ),
      };

    case "park-welt":
      return {
        box: `0 0 ${S}`,
        passung: "slice",
        inhalt: (
          <>
            <path d="M0 300V166l70-52 74 44 66-58 88 62 102-40v178z" fill="var(--m-2)" />
            <path d="M126 300V178h58v122z" fill="var(--m-3)" />
            <path d="M155 178l-42-38h84z" fill="var(--m-4)" />
            <path d="M240 300v-92h74v92z" fill="var(--m-3)" opacity="0.85" />
            <path d="M277 208l-40-34h80z" fill="var(--m-4)" opacity="0.85" />
            <circle cx="66" cy="76" r="30" fill="var(--m-4)" opacity="0.7" />
            {[30, 210, 340].map((x, i) => (
              <path key={i} d={`M${x} 300l-24-58h48z`} fill="var(--m-4)" opacity="0.5" />
            ))}
          </>
        ),
      };
  }
}
