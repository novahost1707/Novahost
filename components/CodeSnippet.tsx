import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CodeSnippetProps {
  /** Dateiname in der Fensterleiste. */
  title: string;
  code: string;
  className?: string;
}

/**
 * Ein Code-Fenster auf hellem Grund — das ruhige Gegenstueck zum dunklen
 * Terminal.
 *
 * Die Einfaerbung macht ein sehr kleiner eigener Tokenizer (siehe unten).
 * Eine Highlighting-Bibliothek waere fuer drei dekorative Snippets deutlich
 * zu viel Gewicht; sie wuerde mehr wiegen als der gesamte Rest der Seite.
 *
 * Wichtig: es wird nie HTML aus einem String erzeugt. Der Tokenizer baut
 * React-Knoten, dadurch kann Code-Inhalt kein Markup einschleusen.
 */
export default function CodeSnippet({ title, code, className }: CodeSnippetProps) {
  return (
    <div
      className={cn(
        "glass glass-edge overflow-hidden rounded-[18px]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-nh-line px-4 py-2.5">
        <div className="flex gap-[6px]">
          <span className="h-[7px] w-[7px] rounded-full bg-nh-line" />
          <span className="h-[7px] w-[7px] rounded-full bg-nh-line" />
          <span className="h-[7px] w-[7px] rounded-full bg-nh-line" />
        </div>

        <span className="font-mono text-[11px] text-nh-mute">{title}</span>
      </div>

      <pre className="code-window overflow-x-auto px-4 py-4">
        <code>
          {code.split("\n").map((line, index) => (
            <span key={index} className="block">
              {highlight(line)}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

/**
 * Erkennt Kommentare, Zeichenketten, Schluesselwoerter, Objektschluessel und
 * Zahlen. Bewusst grob: es geht um den optischen Eindruck von Code, nicht um
 * eine korrekte Grammatik.
 *
 * Die Gruppen der Reihe nach:
 * 1 Kommentar · 2 Zeichenkette · 3 Schluesselwort · 4 Objektschluessel · 5 Zahl
 */
const TOKEN_PATTERN =
  /(\/\/[^\n]*|#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(const|let|var|function|return|import|export|from|async|await|new|type|interface)\b|([A-Za-z_$][\w$]*)(?=\s*:)|\b(\d+(?:\.\d+)?)\b/g;

function highlight(line: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  // Der Regex ist global und wird mehrfach benutzt — lastIndex muss vor jeder
  // Zeile zurueckgesetzt werden, sonst faengt die naechste mitten drin an.
  TOKEN_PATTERN.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = TOKEN_PATTERN.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index));
    }

    const [text, comment, string, keyword, objectKey] = match;

    const className = comment
      ? "tok-com"
      : string
        ? "tok-str"
        : keyword
          ? "tok-key"
          : objectKey
            ? "tok-fn"
            : "tok-str";

    nodes.push(
      <span key={key++} className={className}>
        {text}
      </span>,
    );

    lastIndex = match.index + text.length;
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex));
  }

  return nodes;
}
