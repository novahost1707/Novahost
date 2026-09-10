"use client";

/**
 * Letzte Rettung: greift nur, wenn schon das Wurzel-Layout scheitert.
 *
 * Dann steht kein Kopf, kein Fuß und kein Stylesheet zur Verfügung - Next
 * ersetzt in diesem Fall das gesamte Dokument. Deshalb bringt diese Seite
 * ihr eigenes <html> mit und alle Farben und Abstände direkt am Element.
 * Sie soll nie erscheinen; wenn doch, ist eine lesbare deutsche Seite immer
 * noch besser als die englische Standardmeldung.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeContent: "center",
          gap: "18px",
          padding: "32px",
          background: "#060706",
          color: "#eef0ea",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700 }}>
          Da ist etwas schiefgegangen.
        </h1>
        <p style={{ margin: 0, maxWidth: "46ch", lineHeight: 1.6, color: "#a8b0a4" }}>
          Nicht Ihre Schuld - auf unserer Seite ist ein Fehler aufgetreten. Bitte laden Sie die
          Seite neu.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            justifySelf: "center",
            padding: "14px 28px",
            border: 0,
            background: "#eef0ea",
            color: "#060706",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Erneut versuchen
        </button>
        {error.digest ? (
          <p style={{ margin: 0, fontSize: "12px", color: "#6f776c" }}>Kennung: {error.digest}</p>
        ) : null}
      </body>
    </html>
  );
}
