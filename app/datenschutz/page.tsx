import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/datenschutz" },
};

/**
 * Beschreibt ausschließlich, was diese Website technisch tatsächlich tut:
 * Auslieferung der Seite, Kontakt- und Analyseformular, Google-Fonts werden
 * beim Build selbst gehostet, kein Tracking, keine Cookies. Wird die Seite um
 * Analytics oder externe Dienste erweitert, muss dieser Text ergänzt werden.
 */
export default function DatenschutzPage() {
  return (
    <div className="legal shell">
      <header className="legal__head">
        <p className="pixel accent">RECHTLICHES</p>
        <h1 className="legal__title display">Datenschutz</h1>
      </header>

      <div className="legal__body">
        <p className="legal__note">
          <strong>Hinweis für den Betreiber:</strong> Diese Erklärung beschreibt den aktuellen
          technischen Stand dieser Website. Die mit{" "}
          <span className="placeholder">[ ... ]</span> markierten Angaben sind zu ergänzen. Wird
          die Seite um Analyse-, Marketing- oder Buchungsdienste erweitert, ist dieser Text
          entsprechend anzupassen. Die Vorlage ersetzt keine Rechtsberatung.
        </p>

        <section>
          <h2>1. Verantwortliche Stelle</h2>
          <p>
            <span className="placeholder">[Firmenname / Inhaber]</span>,{" "}
            <span className="placeholder">[Anschrift]</span>,{" "}
            <span className="placeholder">[E-Mail-Adresse]</span>
          </p>
        </section>

        <section>
          <h2>2. Aufruf dieser Website</h2>
          <p>
            Beim Aufruf überträgt Ihr Browser technisch notwendige Daten an den Server, auf dem
            diese Website liegt. Dazu gehören in der Regel IP-Adresse, Datum und Uhrzeit des
            Zugriffs, aufgerufene Adresse, übertragene Datenmenge sowie Browser- und
            Betriebssystemangaben. Diese Daten sind für die Auslieferung der Seite und die
            Sicherheit des Betriebs erforderlich.
          </p>
          <p>
            Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe f DSGVO (berechtigtes Interesse am
            technisch fehlerfreien und sicheren Betrieb).
          </p>
        </section>

        <section>
          <h2>3. Cookies und Tracking</h2>
          <p>
            Diese Website setzt keine Cookies zu Analyse- oder Marketingzwecken und bindet kein
            Tracking ein. Es findet keine Profilbildung statt. Sollten künftig
            einwilligungspflichtige Dienste eingesetzt werden, wird zuvor eine Einwilligung
            eingeholt.
          </p>
        </section>

        <section>
          <h2>4. Schriftarten</h2>
          <p>
            Die verwendeten Schriftarten werden beim Erstellen der Seite mit ausgeliefert und vom
            Server dieser Website geladen. Beim Besuch der Seite wird deshalb keine Verbindung zu
            Google-Servern aufgebaut.
          </p>
        </section>

        <section>
          <h2>5. Kontakt- und Analyseformular</h2>
          <p>
            Wenn Sie uns über ein Formular kontaktieren, verarbeiten wir die von Ihnen gemachten
            Angaben, um Ihre Anfrage zu bearbeiten. Pflichtangaben sind auf das Nötigste begrenzt;
            alle weiteren Felder sind freiwillig.
          </p>
          <ul>
            <li>Zweck: Bearbeitung und Beantwortung Ihrer Anfrage</li>
            <li>
              Rechtsgrundlage: Artikel 6 Absatz 1 Buchstabe b DSGVO (vorvertragliche Maßnahmen)
              beziehungsweise Buchstabe a DSGVO (Einwilligung)
            </li>
            <li>
              Speicherdauer: bis zur abschließenden Bearbeitung, danach im Rahmen gesetzlicher
              Aufbewahrungsfristen
            </li>
            <li>
              Empfänger: <span className="placeholder">[eingesetzter E-Mail- oder CRM-Dienst]</span>
            </li>
          </ul>
          <p>
            Zum Schutz vor automatisierten Einträgen enthält das Formular ein unsichtbares
            Zusatzfeld und eine Begrenzung der Sendehäufigkeit je IP-Adresse. Die IP-Adresse wird
            dabei ausschließlich flüchtig zur Missbrauchsabwehr verwendet.
          </p>
        </section>

        <section>
          <h2>6. Hosting</h2>
          <p>
            Diese Website wird bei{" "}
            <span className="placeholder">[Name und Anschrift des Hosting-Anbieters]</span>{" "}
            betrieben. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Artikel 28
            DSGVO.
          </p>
        </section>

        <section>
          <h2>7. Ihre Rechte</h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
            Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung. Eine
            erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.
            Außerdem steht Ihnen ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu.
          </p>
          <p>
            Für alle Anliegen erreichen Sie uns unter{" "}
            <span className="placeholder">[E-Mail-Adresse]</span>.
          </p>
        </section>

        <section>
          <h2>8. Änderungen</h2>
          <p>
            Wir passen diese Erklärung an, sobald sich die Funktionen der Website oder die
            rechtlichen Vorgaben ändern.
          </p>
        </section>
      </div>
    </div>
  );
}
