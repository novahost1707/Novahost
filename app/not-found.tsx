import Link from "next/link";

export default function NotFound() {
  return (
    <div className="nf shell">
      <p className="pixel accent">FEHLER / 404</p>
      <p className="nf__code display" aria-hidden="true">404</p>
      <h1 className="display h2">Diese Seite gibt es nicht.</h1>
      <p className="copy">
        Der Link ist entweder veraltet oder enthält einen Tippfehler. Zurück zur Startseite - dort
        finden Sie alles Wichtige.
      </p>
      <div className="btn-row">
        <Link href="/" className="btn btn--primary" data-cursor="LOS">
          <span className="btn__label">Zur Startseite</span>
          <span className="btn__arrow" aria-hidden="true">&#8599;</span>
        </Link>
        <Link href="/#kontakt" className="btn btn--ghost">
          <span className="btn__label">Kontakt aufnehmen</span>
          <span className="btn__arrow" aria-hidden="true">&#8599;</span>
        </Link>
      </div>
    </div>
  );
}
