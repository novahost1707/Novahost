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
          <h2>3. Speicherung auf Ihrem Gerät und Einwilligung</h2>
          <p>
            Wir speichern nur das Nötigste auf Ihrem Gerät. Technisch notwendig sind zwei Dinge:
          </p>
          <ul>
            <li>
              ein kurzlebiges Cookie nach dem Absenden eines Formulars, damit Ihnen die
              Bestätigungsseite angezeigt werden kann (Laufzeit 30 Minuten)
            </li>
            <li>
              Ihre Entscheidung aus der Einwilligungsabfrage, damit wir sie nicht bei jedem Besuch
              erneut stellen müssen; sie liegt im lokalen Speicher Ihres Browsers und wird nicht an
              uns übertragen
            </li>
          </ul>
          <p>
            Rechtsgrundlage hierfür ist § 25 Absatz 2 TDDDG, da beides für den von Ihnen
            gewünschten Dienst unbedingt erforderlich ist.
          </p>
          <p>
            Alles Weitere setzen wir nur mit Ihrer Einwilligung nach § 25 Absatz 1 TDDDG und
            Artikel 6 Absatz 1 Buchstabe a DSGVO. Sie treffen diese Entscheidung beim ersten Besuch
            und können sie jederzeit über den Link{" "}
            <strong>Cookie-Einstellungen</strong> in der Fußzeile ändern oder widerrufen. Der
            Widerruf wirkt für die Zukunft; die Rechtmäßigkeit der bis dahin erfolgten
            Verarbeitung bleibt unberührt.
          </p>
        </section>

        <section>
          <h2>4. Reichweitenmessung und Werbung</h2>
          <p>
            Diese Dienste laufen ausschließlich nach Ihrer Einwilligung. Erteilen Sie sie nicht,
            wird nichts davon geladen und es entstehen keine entsprechenden Daten.
          </p>
          <ul>
            <li>
              <strong>Statistik:</strong> anonyme Auswertung, welche Seiten aufgerufen werden,
              damit wir erkennen, welche Inhalte gesucht werden.
            </li>
            <li>
              <strong>Marketing:</strong> Messung, ob der Besuch über eine Anzeige zustande kam und
              zu einer Anfrage geführt hat. Eingesetzt wird dafür{" "}
              <span className="placeholder">[Name des Werbedienstes, z. B. Google Ads]</span>{" "}
              des Anbieters{" "}
              <span className="placeholder">[Anbieter und Anschrift]</span>. Dabei können Daten in
              die USA übermittelt werden.
            </li>
          </ul>
          <p className="legal__note">
            <strong>Hinweis für den Betreiber:</strong> Dieser Abschnitt beschreibt Dienste, die
            erst mit dem Start einer Werbekampagne tatsächlich eingebunden werden. Solange nichts
            davon aktiv ist, lässt sich die Einwilligungsabfrage über den Schalter{" "}
            <code>EINWILLIGUNG_NOETIG</code> in <code>lib/consent.ts</code> ausblenden. Sobald ein
            Dienst live geht, sind hier Name, Anbieter, Zweck, Speicherdauer und Rechtsgrundlage
            konkret zu benennen.
          </p>
        </section>

        <section>
          <h2>5. Schriftarten</h2>
          <p>
            Die verwendeten Schriftarten werden beim Erstellen der Seite mit ausgeliefert und vom
            Server dieser Website geladen. Beim Besuch der Seite wird deshalb keine Verbindung zu
            Google-Servern aufgebaut.
          </p>
        </section>

        <section>
          <h2>6. Kontakt- und Analyseformular</h2>
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
          <h2>7. Hosting</h2>
          <p>
            Diese Website wird bei{" "}
            <span className="placeholder">[Name und Anschrift des Hosting-Anbieters]</span>{" "}
            betrieben. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Artikel 28
            DSGVO.
          </p>
          <p>
            Sitzt der Anbieter ausserhalb der EU oder verarbeitet er dort Daten, stützt sich die
            Übermittlung auf{" "}
            <span className="placeholder">[Angemessenheitsbeschluss oder Standardvertragsklauseln]</span>.
            Eine Kopie der Garantien erhalten Sie auf Anfrage bei uns.
          </p>
          <p className="legal__note">
            <strong>Hinweis für den Betreiber:</strong> Den Auftragsverarbeitungsvertrag müssen Sie
            im Konto des Hosters aktiv abschliessen - er entsteht nicht automatisch. Dasselbe gilt
            für einen später angebundenen E-Mail- oder CRM-Dienst.
          </p>
        </section>

        <section>
          <h2>8. Ihre Rechte</h2>
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
          <h2>9. Änderungen</h2>
          <p>
            Wir passen diese Erklärung an, sobald sich die Funktionen der Website oder die
            rechtlichen Vorgaben ändern.
          </p>
        </section>
      </div>
    </div>
  );
}
