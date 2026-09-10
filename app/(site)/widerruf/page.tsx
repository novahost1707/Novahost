import type { Metadata } from "next";

import { anbieter, anbieterAnschrift } from "@/lib/anbieter";

export const metadata: Metadata = {
  title: "Widerrufsrecht",
  description: "Widerrufsbelehrung für Verbraucher.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/widerruf" },
};

/**
 * Widerrufsbelehrung für Verbraucher (Fernabsatz, § 355 BGB).
 *
 * Der Text folgt dem gesetzlichen Muster aus Anlage 1 zu Artikel 246a § 1
 * Absatz 2 EGBGB. Die markierten Felder müssen vor der Veröffentlichung
 * ausgefüllt werden - erfundene Angaben stünden hier besonders schlecht.
 *
 * Gilt nur gegenüber Verbrauchern. Bei Aufträgen von Unternehmen greift kein
 * Widerrufsrecht; dort schadet die Seite aber auch nicht.
 */
export default function WiderrufPage() {
  return (
    <div className="legal shell">
      <header className="legal__head">
        <p className="pixel accent">RECHTLICHES</p>
        <h1 className="legal__title display">Widerrufsrecht</h1>
      </header>

      <div className="legal__body">
        <p className="legal__note">
          <strong>Hinweis für den Betreiber:</strong> Diese Belehrung gilt gegenüber
          Verbrauchern, also Privatpersonen. Wenn eine Dienstleistung auf ausdrücklichen Wunsch
          vor Ablauf der Frist beginnen soll, muss das gesondert und nachweisbar vereinbart
          werden - siehe den letzten Abschnitt. Die Vorlage ersetzt keine Rechtsberatung.
        </p>

        <section>
          <h2>Für wen diese Belehrung gilt</h2>
          <p>
            Ein Widerrufsrecht steht Verbrauchern zu. Verbraucher ist jede natürliche Person, die
            ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen
            noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können. Bei
            Aufträgen von Unternehmen, Selbständigen und Gewerbetreibenden besteht kein
            gesetzliches Widerrufsrecht.
          </p>
        </section>

        <section>
          <h2>Widerrufsbelehrung</h2>
          <h3>Widerrufsrecht</h3>
          <p>
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
            widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
          </p>
          <p>
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ({anbieter.name},{" "}
            {anbieterAnschrift}, {anbieter.telefon}, {anbieter.email}) mittels einer eindeutigen
            Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren
            Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte
            Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
          </p>
          <p>
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung
            des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
          </p>

          <h3>Folgen des Widerrufs</h3>
          <p>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
            erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten,
            die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns
            angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens
            binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren
            Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir
            dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben,
            es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall
            werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
          </p>
          <p>
            Haben Sie verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll,
            so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem
            Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses
            Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum
            Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
          </p>
        </section>

        <section>
          <h2>Vorzeitiges Erlöschen des Widerrufsrechts</h2>
          <p>
            Das Widerrufsrecht erlischt bei einem Vertrag über die Erbringung von
            Dienstleistungen, wenn wir die Dienstleistung vollständig erbracht haben und mit der
            Ausführung erst begonnen haben, nachdem Sie dazu Ihre ausdrückliche Zustimmung gegeben
            und gleichzeitig Ihre Kenntnis davon bestätigt haben, dass Sie Ihr Widerrufsrecht bei
            vollständiger Vertragserfüllung durch uns verlieren.
          </p>
          <p className="legal__note">
            <strong>Hinweis für den Betreiber:</strong> Wenn ein Projekt für eine Privatperson
            innerhalb der vierzehn Tage starten soll, holen Sie diese ausdrückliche Zustimmung
            schriftlich ein - etwa als Ankreuzfeld in der Auftragsbestätigung. Ohne diesen
            Nachweis läuft die Frist weiter.
          </p>
        </section>

        <section>
          <h2>Muster-Widerrufsformular</h2>
          <p>
            Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden
            Sie es zurück.
          </p>
          <ul>
            <li>
              An {anbieter.name}, {anbieterAnschrift}, {anbieter.email}:
            </li>
            <li>
              Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den
              Kauf der folgenden Waren (*) / die Erbringung der folgenden Dienstleistung (*)
            </li>
            <li>Bestellt am (*) / erhalten am (*)</li>
            <li>Name des/der Verbraucher(s)</li>
            <li>Anschrift des/der Verbraucher(s)</li>
            <li>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</li>
            <li>Datum</li>
          </ul>
          <p>(*) Unzutreffendes streichen.</p>
        </section>
      </div>
    </div>
  );
}
