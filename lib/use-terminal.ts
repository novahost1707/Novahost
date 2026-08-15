"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-motion-preference";
import type { TerminalLine } from "@/types";

interface TerminalOptions {
  lines: TerminalLine[];
  /** Startet die Ausgabe erst, wenn das Terminal sichtbar ist. */
  start: boolean;
  /** Millisekunden pro getipptem Zeichen. */
  typeSpeed?: number;
  /** Pause zwischen zwei Ausgabezeilen. */
  lineDelay?: number;
}

export interface TerminalState {
  /** Die bereits vollstaendig ausgegebenen Zeilen. */
  done: TerminalLine[];
  /** Die Zeile, die gerade getippt wird — `null`, wenn keine laeuft. */
  typing: { line: TerminalLine; text: string } | null;
  /** true, sobald die letzte Zeile stand. */
  finished: boolean;
}

/**
 * Spielt eine Terminal-Ausgabe ab.
 *
 * Zwei Geschwindigkeiten, damit es sich echt anfuehlt: Eingaben (`kind:
 * "prompt"`) werden Zeichen fuer Zeichen getippt, Ausgaben erscheinen als
 * ganze Zeile nach einer kurzen Pause — genau so verhaelt sich ein echtes
 * Terminal.
 *
 * Umgesetzt mit einer Kette aus `setTimeout` statt einem Intervall: jede
 * Zeile plant die naechste, dadurch gibt es keinen Timer, der weiterlaeuft,
 * nachdem die Komponente verschwunden ist.
 *
 * Bei `prefers-reduced-motion` steht die vollstaendige Ausgabe sofort da.
 */
export function useTerminal({
  lines,
  start,
  typeSpeed = 42,
  lineDelay = 420,
}: TerminalOptions): TerminalState {
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<TerminalState>({
    done: [],
    typing: null,
    finished: false,
  });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!start) return;

    if (reduced) {
      setState({ done: lines, typing: null, finished: true });
      return;
    }

    let cancelled = false;

    const schedule = (fn: () => void, delay: number) => {
      timer.current = setTimeout(() => {
        if (!cancelled) fn();
      }, delay);
    };

    /** Gibt eine Ausgabezeile am Stueck aus und geht zur naechsten. */
    const emitLine = (index: number) => {
      const line = lines[index];
      if (!line) return;

      setState((previous) => ({
        done: [...previous.done, line],
        typing: null,
        finished: index === lines.length - 1,
      }));

      // Leerzeilen brauchen keine Lesezeit.
      const wait = line.kind === "blank" ? 90 : lineDelay;
      schedule(() => runLine(index + 1), wait);
    };

    /** Tippt eine Eingabezeile Zeichen fuer Zeichen. */
    const typeLine = (index: number, position: number) => {
      const line = lines[index];
      if (!line) return;

      if (position > line.text.length) {
        // Fertig getippt: Zeile festschreiben, kurz stehen lassen.
        setState((previous) => ({
          done: [...previous.done, line],
          typing: null,
          finished: index === lines.length - 1,
        }));
        schedule(() => runLine(index + 1), lineDelay);
        return;
      }

      setState((previous) => ({
        ...previous,
        typing: { line, text: line.text.slice(0, position) },
      }));

      schedule(() => typeLine(index, position + 1), typeSpeed);
    };

    const runLine = (index: number) => {
      if (index >= lines.length) return;

      if (lines[index]?.kind === "prompt") {
        typeLine(index, 0);
      } else {
        emitLine(index);
      }
    };

    // Kurz warten, bevor es losgeht — sonst tippt es, bevor das Fenster steht.
    schedule(() => runLine(0), 320);

    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
    };
  }, [start, lines, reduced, typeSpeed, lineDelay]);

  return state;
}
