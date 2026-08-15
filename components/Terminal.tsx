"use client";

import { useInView } from "@/lib/use-in-view";
import { useTerminal } from "@/lib/use-terminal";
import { cn } from "@/lib/utils";
import type { TerminalLine } from "@/types";

interface TerminalProps {
  lines: TerminalLine[];
  /** Titel in der Fensterleiste, z. B. "nova-cli — production". */
  title: string;
  className?: string;
  /** Kompakte Variante fuer kleine Flaechen wie das Hero-Dashboard. */
  compact?: boolean;
}

/**
 * Animiertes Terminalfenster.
 *
 * Die Ausgabe startet erst, wenn das Fenster im Bild ist — sonst waere die
 * Animation vorbei, bevor jemand hinsieht. Eingaben werden getippt, Ausgaben
 * erscheinen zeilenweise (siehe lib/use-terminal.ts).
 *
 * Barrierefreiheit: die animierte Ausgabe ist `aria-hidden`, der vollstaendige
 * Text steht einmal als zusammenhaengender Block fuer Screenreader daneben.
 * Ein `aria-live`-Bereich, der Zeichen fuer Zeichen vorgelesen wird, waere
 * unbrauchbar.
 */
export default function Terminal({ lines, title, className, compact }: TerminalProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const { done, typing } = useTerminal({ lines, start: inView });

  return (
    <div
      ref={ref}
      className={cn(
        "terminal overflow-hidden rounded-[18px] shadow-[0_30px_70px_-40px_rgba(8,17,31,0.85)]",
        className,
      )}
    >
      {/* Fensterleiste */}
      <div className="terminal-bar flex items-center gap-3 px-4 py-3">
        <div className="flex gap-[6px]">
          <span className="terminal-dot bg-[#ff5f57]" />
          <span className="terminal-dot bg-[#febc2e]" />
          <span className="terminal-dot bg-[#28c840]" />
        </div>
        <span className="truncate font-mono text-[11px] tracking-[0.06em] text-[#7e93b8]">
          {title}
        </span>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "px-5 pb-5",
          compact ? "pt-3.5 text-[12px]" : "pt-4.5 min-h-[268px] max-[520px]:min-h-[240px]",
        )}
      >
        {done.map((line, index) => (
          <Line key={`${line.kind}-${index}-${line.text}`} line={line} />
        ))}

        {typing ? (
          <Line line={{ ...typing.line, text: typing.text }} caret animate={false} />
        ) : null}
      </div>

      {/* Derselbe Inhalt, einmal am Stueck — nur fuer Screenreader. */}
      <p className="sr-only">
        {`Terminal-Ausgabe ${title}: `}
        {lines
          .filter((line) => line.kind !== "blank")
          .map((line) => (line.kind === "prompt" ? `Befehl: ${line.text}.` : `${line.text}.`))
          .join(" ")}
      </p>
    </div>
  );
}

interface LineProps {
  line: TerminalLine;
  caret?: boolean;
  animate?: boolean;
}

/** Eine einzelne Zeile — das Praefix haengt an `kind`. */
function Line({ line, caret, animate = true }: LineProps) {
  if (line.kind === "blank") {
    return <div className="h-3.5" />;
  }

  return (
    <div className={cn("flex gap-2", animate && "terminal-line")}>
      {line.kind === "prompt" ? (
        <span className="flex-none text-[#00c2e0] select-none">$</span>
      ) : null}

      {line.kind === "success" ? (
        <span className="flex-none text-[#3ddc97] select-none">✓</span>
      ) : null}

      <span
        className={cn(
          "min-w-0 break-words",
          line.kind === "prompt" && "text-white",
          line.kind === "log" && "text-[#9fb6da]",
          line.kind === "success" && "text-[#cfe0ff]",
        )}
      >
        {line.text}
        {caret ? <i className="caret" /> : null}
      </span>
    </div>
  );
}
