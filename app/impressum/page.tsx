import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung nach § 5 DDG.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/impressum" },
};

/**
 * Achtung: Diese Seite enthält bewusst Platzhalter. Es werden keine
 * Unternehmensdaten erfunden - die markierten Stellen müssen vor dem
 * Livegang durch die echten Angaben ersetzt werden.
 */
export default function ImpressumPage() {
  return (
    <div className="legal shell">
      <header className="legal__head">
        <p className="pixel accent">RECHTLICHES</p>
        <h1 className="legal__title display">Impressum</h1>
      </header>

      <div className="legal__body">
        <p className="legal__note">
          <strong>Hinweis für den Betreiber:</strong> Alle mit{" "}
          <span className="placeholder">[ ... ]</span> markierten Felder müssen vor der
          Veröffentlichung durch die echten Angaben ersetzt werden. Diese Vorlage ersetzt keine
          Rechtsberatung.
        </p>

        <section>
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            <span className="placeholder">[Firmenname / Inhaber]</span>
            <br />
            <span className="placeholder">[Straße und Hausnummer]</span>
            <br />
            <span className="placeholder">[PLZ und Ort]</span>
            <br />
            <span className="placeholder">[Land]</span>
          </p>
        </section>

        <section>
          <h2>Vertreten durch</h2>
          <p><span className="placeholder">[Name der vertretungsberechtigten Person]</span></p>
        </section>

        <section>
          <h2>Kontakt</h2>
          <p>
            Telefon: <span className="placeholder">[Telefonnummer]</span>
            <br />
            E-Mail: <span className="placeholder">[E-Mail-Adresse]</span>
          </p>
        </section>

        <section>
          <h2>Registereintrag</h2>
          <p>
            Registergericht: <span className="placeholder">[Registergericht]</span>
            <br />
            Registernummer: <span className="placeholder">[Registernummer]</span>
            <br />
            <span className="muted">
              Entfällt, sofern kein Eintrag ins Handels-, Vereins- oder Genossenschaftsregister
              besteht.
            </span>
          </p>
        </section>

        <section>
          <h2>Umsatzsteuer-Identifikationsnummer</h2>
          <p>
            Gemäß § 27 a Umsatzsteuergesetz:{" "}
            <span className="placeholder">[USt-IdNr.]</span>
          </p>
        </section>

        <section>
          <h2>Verantwortlich für den Inhalt</h2>
          <p>
            <span className="placeholder">[Name]</span>,{" "}
            <span className="placeholder">[Anschrift wie oben]</span>
          </p>
        </section>

        <section>
          <h2>Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
            <a href="https://ec.europa.eu/consumers/odr/" rel="noopener noreferrer" target="_blank">
              ec.europa.eu/consumers/odr
            </a>
            . Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section>
          <h2>Haftung für Inhalte und Links</h2>
          <p>
            Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen
            Gesetzen verantwortlich. Für die Inhalte externer Links sind ausschließlich deren
            Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße
            erkennbar. Bei Bekanntwerden von Rechtsverletzungen entfernen wir entsprechende Links
            umgehend.
          </p>
        </section>

        <section>
          <h2>Urheberrecht</h2>
          <p>
            Die durch die Betreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
            deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
          </p>
        </section>
      </div>
    </div>
  );
}
