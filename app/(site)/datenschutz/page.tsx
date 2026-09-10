import type { Metadata } from "next";

import { anbieter, anbieterAnschrift } from "@/lib/anbieter";
import { EINWILLIGUNG_NOETIG } from "@/lib/consent";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/datenschutz" },
};

/**
 * Beschreibt ausschließlich, was diese Website technisch tatsächlich tut:
 * Auslieferung der Seite, Kontakt- und Analyseformular, Google-Fonts werden
 * beim Build selbst gehostet, kein Tracking.
 *
 * Die Abschnitte 3 und 4 lesen denselben Schalter wie die Einwilligungs-
 * abfrage (EINWILLIGUNG_NOETIG in lib/consent.ts). Dadurch kann der Text
 * nicht beschreiben, was die Seite gar nicht tut - eine Erklärung, die eine
 * Abfrage schildert, die es nicht gibt, ist schlechter als keine.
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
          technischen Stand dieser Website. Offen sind noch die mit{" "}
          <span className="placeholder">[ ... ]</span> markierten Angaben: der vollständige
          Firmenname und die Anschrift von Hoster und E-Mail-Versand sowie die Grundlage der
          Datenübermittlung - beides steht in den Auftragsverarbeitungsverträgen der Anbieter.
          Wird die Seite um Analyse-, Marketing- oder Buchungsdienste erweitert, ist dieser Text
          entsprechend anzupassen. Die Vorlage ersetzt keine Rechtsberatung.
        </p>

        <section>
          <h2>1. Verantwortliche Stelle</h2>
          <p>
            {anbieter.marke}
            <br />
            Inhaber: {anbieter.name}
            <br />
            {anbieterAnschrift}, {anbieter.land}
            <br />
            Telefon: {anbieter.telefon}
            <br />
            E-Mail: <a href={`mailto:${anbieter.email}`}>{anbieter.email}</a>
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
              in den Demo-Seiten unter <code>/demo</code> Ihre Merkliste und Ihr Warenkorb, damit
              sie beim Blättern erhalten bleiben; beides liegt im lokalen Speicher Ihres Browsers
              und wird nicht an uns übertragen
            </li>
            {EINWILLIGUNG_NOETIG ? (
              <li>
                Ihre Entscheidung aus der Einwilligungsabfrage, damit wir sie nicht bei jedem
                Besuch erneut stellen müssen; sie liegt ebenfalls im lokalen Speicher Ihres
                Browsers und wird nicht an uns übertragen
              </li>
            ) : null}
          </ul>
          <p>
            Rechtsgrundlage hierfür ist § 25 Absatz 2 TDDDG, da all dies für den von Ihnen
            gewünschten Dienst unbedingt erforderlich ist.
          </p>
          {EINWILLIGUNG_NOETIG ? (
            <p>
              Alles Weitere setzen wir nur mit Ihrer Einwilligung nach § 25 Absatz 1 TDDDG und
              Artikel 6 Absatz 1 Buchstabe a DSGVO. Sie treffen diese Entscheidung beim ersten
              Besuch und können sie jederzeit über den Link{" "}
              <strong>Cookie-Einstellungen</strong> in der Fußzeile ändern oder widerrufen. Der
              Widerruf wirkt für die Zukunft; die Rechtmäßigkeit der bis dahin erfolgten
              Verarbeitung bleibt unberührt.
            </p>
          ) : (
            <p>
              Darüber hinaus wird nichts auf Ihrem Gerät gespeichert. Weil die Seite keinen
              einwilligungspflichtigen Dienst lädt, gibt es auch keine Einwilligungsabfrage. Sollte
              sich das ändern, holen wir Ihre Einwilligung nach § 25 Absatz 1 TDDDG und Artikel 6
              Absatz 1 Buchstabe a DSGVO ein, bevor ein solcher Dienst startet.
            </p>
          )}
        </section>

        <section>
          <h2>4. Reichweitenmessung und Werbung</h2>
          {EINWILLIGUNG_NOETIG ? (
            <p>
              Diese Dienste laufen ausschließlich nach Ihrer Einwilligung. Erteilen Sie sie nicht,
              wird nichts davon geladen und es entstehen keine entsprechenden Daten.
            </p>
          ) : (
            <p>
              <strong>Derzeit setzen wir keine solchen Dienste ein.</strong> Diese Website lädt
              weder ein Statistik- noch ein Werbewerkzeug; es findet keine Reichweitenmessung
              statt. Der folgende Abschnitt beschreibt, was gälte, sobald wir das ändern - dann
              fragen wir vorher Ihre Einwilligung ab.
            </p>
          )}
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
            erst mit dem Start einer Werbekampagne tatsächlich eingebunden werden. Der Schalter{" "}
            <code>EINWILLIGUNG_NOETIG</code> in <code>lib/consent.ts</code> steht deshalb auf{" "}
            <code>false</code>: keine Abfrage, weil es nichts abzufragen gibt. Sobald ein Dienst
            live geht, muss er zurück auf <code>true</code>, und hier sind Name, Anbieter, Zweck,
            Speicherdauer und Rechtsgrundlage konkret zu benennen. Die Abschnitte 3 und 4 stellen
            sich mit dem Schalter automatisch um.
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
              Empfänger: Resend als Dienst für den E-Mail-Versand (
              <span className="placeholder">[vollständiger Firmenname und Anschrift]</span>). Ein
              CRM-System ist nicht angebunden.
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
            Diese Website wird bei Vercel betrieben (
            <span className="placeholder">[vollständiger Firmenname und Anschrift]</span>). Mit dem
            Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Artikel 28 DSGVO.
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
            <a href={`mailto:${anbieter.email}`}>{anbieter.email}</a>.
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
