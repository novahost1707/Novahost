import type { Metadata } from "next";

import { anbieter, anbieterAnschrift, telefonHref } from "@/lib/anbieter";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung nach § 5 DDG.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/impressum" },
};

/**
 * Alle Angaben stammen aus lib/anbieter.ts, damit Impressum, Datenschutz und
 * Widerrufsbelehrung nicht auseinanderlaufen können. Ohne
 * Handelsregistereintrag genügt der volle Vor- und Nachname; Registerangaben
 * und Umsatzsteuer-Identnummer entfallen, die Steuernummer gehört nicht ins
 * Impressum.
 */
export default function ImpressumPage() {
  return (
    <div className="legal shell">
      <header className="legal__head">
        <p className="pixel accent">RECHTLICHES</p>
        <h1 className="legal__title display">Impressum</h1>
      </header>

      <div className="legal__body">
        <section>
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            {anbieter.marke}
            <br />
            Inhaber: {anbieter.name}
            <br />
            {anbieter.strasse}
            <br />
            {anbieter.ort}
            <br />
            {anbieter.land}
          </p>
        </section>

        <section>
          <h2>Kleinunternehmer</h2>
          <p>
            Gemäß § 19 Umsatzsteuergesetz wird keine Umsatzsteuer berechnet und in Rechnungen
            nicht ausgewiesen.
          </p>
        </section>

        <section>
          <h2>Kontakt</h2>
          <p>
            Telefon: <a href={`tel:${telefonHref}`}>{anbieter.telefon}</a>
            <br />
            E-Mail: <a href={`mailto:${anbieter.email}`}>{anbieter.email}</a>
          </p>
        </section>

        <section>
          <h2>Verantwortlich für den Inhalt</h2>
          <p>
            {anbieter.name}, {anbieterAnschrift}
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
