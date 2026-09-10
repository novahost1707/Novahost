"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Fehlerseite für alles unter (site).
 *
 * Ohne diese Datei zeigt Next bei einem unerwarteten Fehler seine eigene
 * Seite: weiße Fläche, englischer Text, kein Weg zurück. Wer dort landet,
 * ist weg. Hier steht stattdessen, was passiert ist, dass es nicht an ihm
 * lag, und wie er weiterkommt - inklusive Kontakt, damit ein Fehler nicht
 * die Anfrage kostet.
 *
 * Die Seite trägt Kopf und Fuß, weil sie innerhalb der Routengruppe liegt.
 */
export default function Fehler({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    /* In die Serverprotokolle, damit ein Fehler nicht unbemerkt bleibt. Die
       Kennung erscheint auch unten auf der Seite - wer anruft, kann sie
       nennen, und dann ist der Fall im Protokoll auffindbar. */
    console.error("[seite] Unerwarteter Fehler", error);
  }, [error]);

  return (
    <div className="nf shell">
      <p className="pixel accent">FEHLER</p>
      <p className="nf__code display" aria-hidden="true">!</p>
      <h1 className="display h2">Da ist etwas schiefgegangen.</h1>
      <p className="copy">
        Nicht Ihre Schuld - auf unserer Seite ist ein Fehler aufgetreten. Meist hilft es schon,
        die Seite neu zu laden. Bleibt es dabei, schreiben Sie uns kurz; wir kümmern uns darum.
      </p>
      <div className="btn-row">
        <button type="button" onClick={reset} className="btn btn--primary" data-cursor="NEU">
          <span className="btn__label">Erneut versuchen</span>
          <span className="btn__arrow" aria-hidden="true">&#8635;</span>
        </button>
        <Link href="/" className="btn btn--ghost">
          <span className="btn__label">Zur Startseite</span>
          <span className="btn__arrow" aria-hidden="true">&#8599;</span>
        </Link>
      </div>
      {error.digest ? (
        <p className="nf__kennung mono">Kennung: {error.digest}</p>
      ) : null}
    </div>
  );
}
