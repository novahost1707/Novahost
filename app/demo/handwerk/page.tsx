import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Bild } from "@/components/demo/Bild";
import type { Bildplatz } from "@/lib/demo-bilder";
import "@/styles/demo-handwerk.css";

/**
 * Demo 3 - Tischlerei Brandhorst (erfundener Betrieb).
 *
 * Marke: Meisterbetrieb für Innenausbau und Möbel nach Maß, gegründet 1954,
 * dritte Generation. Spezialisiert auf Einbaumöbel im Altbau - nicht auf
 * "alles". Kunden sind Privatleute mit krummen Wänden, Architekturbüros und
 * kleine Ladenlokale.
 *
 * Haltung: präzise und bodenständig, nicht laut. Heller Werkstattgrund statt
 * dunklem Auftritt, Eiche als einziger Akzent, Haarlinien und Datenblätter
 * statt Werbekacheln - das Vokabular technischer Zeichnungen. Modern, aber
 * unmissverständlich Handwerk.
 */
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap", weight: ["600", "700"] });

export const metadata: Metadata = {
  title: "Tischlerei Brandhorst - Demo-Projekt",
  description: "Demo-Projekt von Novahost: Website für einen Tischlerei-Meisterbetrieb mit Referenzen und Anfragestrecke.",
};

export const viewport: Viewport = { themeColor: "#f3f0ea", colorScheme: "light" };

/* --- Bildplätze ---------------------------------------------------------- */
const BILD_HERO: Bildplatz = {
  src: "/demo/handwerk/hero.jpg",
  alt: "Blick in die Werkstatt: Gesellin an der Hobelbank, Späne auf dem Boden",
  ratio: "5 / 4",
  motiv: "handwerk-werkbank",
  variante: 0,
};

const BILD_LEISTUNG: Bildplatz[] = [
  { src: "/demo/handwerk/leistung-einbau.jpg", alt: "Einbauschrank in einer Altbau-Nische, Eiche geölt", ratio: "4 / 3", motiv: "handwerk-schrank", variante: 0, ton: "#8a6a3a" },
  { src: "/demo/handwerk/leistung-kueche.jpg", alt: "Küchenfront aus Massivholz mit Arbeitsplatte aus Stein", ratio: "4 / 3", motiv: "handwerk-kueche", variante: 0, ton: "#6a6f63" },
  { src: "/demo/handwerk/leistung-laden.jpg", alt: "Ladeneinrichtung mit Regalwand und Tresen", ratio: "4 / 3", motiv: "handwerk-regal", variante: 0, ton: "#7d5c34" },
];

const BILD_PROJEKT: Bildplatz[] = [
  { src: "/demo/handwerk/projekt-altbau.jpg", alt: "Wandfüllender Einbauschrank unter einer Dachschräge", ratio: "3 / 2", motiv: "handwerk-schrank", variante: 1, ton: "#9a7440" },
  { src: "/demo/handwerk/projekt-kueche.jpg", alt: "Küchenzeile aus Esche mit offenen Fächern", ratio: "3 / 2", motiv: "handwerk-kueche", variante: 1, ton: "#5f6659" },
  { src: "/demo/handwerk/projekt-buchladen.jpg", alt: "Regalwand aus Eiche in einer Buchhandlung", ratio: "3 / 2", motiv: "handwerk-regal", variante: 1, ton: "#8a6a3a" },
  { src: "/demo/handwerk/projekt-treppe.jpg", alt: "Freitragende Holztreppe mit Stahlgeländer", ratio: "3 / 2", motiv: "handwerk-treppe", variante: 0, ton: "#726d61" },
];

const BILD_TEAM: Bildplatz[] = [
  { src: "/demo/handwerk/team-brandhorst.jpg", alt: "Porträt von Tischlermeister Jonas Brandhorst", ratio: "4 / 5", motiv: "handwerk-portraet", variante: 0, ton: "#6b6a5e" },
  { src: "/demo/handwerk/team-arslan.jpg", alt: "Porträt von Meisterin Derya Arslan", ratio: "4 / 5", motiv: "handwerk-portraet", variante: 1, ton: "#7a6a58" },
  { src: "/demo/handwerk/team-voss.jpg", alt: "Porträt von Geselle Milan Voß", ratio: "4 / 5", motiv: "handwerk-portraet", variante: 2, ton: "#6f6656" },
  { src: "/demo/handwerk/team-kaminski.jpg", alt: "Porträt von Auszubildender Lea Kaminski", ratio: "4 / 5", motiv: "handwerk-portraet", variante: 3, ton: "#77705f" },
];

/* --- Inhalte ------------------------------------------------------------- */
const BELEGE = [
  { wert: "1954", text: "gegründet, seit 2016 in dritter Generation" },
  { wert: "22", text: "Meister, Gesellinnen und Auszubildende" },
  { wert: "±0,5 mm", text: "Toleranz bei Einbaumöbeln nach Aufmaß" },
  { wert: "5 Jahre", text: "Gewährleistung auf Konstruktion und Beschläge" },
];

const LEISTUNGEN = [
  {
    titel: "Einbaumöbel",
    text: "Schränke, Garderoben und Regale, die in schiefe Wände passen, weil wir sie danach bauen - nicht davor.",
    punkte: ["Aufmaß mit Laser und Schablone", "Massivholz, Furnier oder lackiert", "Einbau an einem Tag"],
    bild: 0,
  },
  {
    titel: "Küchen",
    text: "Vom Korpus bis zur Arbeitsplatte. Wir planen mit Ihnen, fertigen im eigenen Haus und montieren selbst.",
    punkte: ["Fronten aus Massivholz oder Linoleum", "Arbeitsplatten in Stein, Holz oder Edelstahl", "Anschluss in Abstimmung mit Ihrem Installateur"],
    bild: 1,
  },
  {
    titel: "Ladenbau",
    text: "Tresen, Regalwände und Umkleiden für kleine Geschäfte. Bei laufendem Betrieb, meist über Nacht montiert.",
    punkte: ["Entwurf zusammen mit Ihrem Architekturbüro", "Brandschutzgerechte Ausführung", "Montage außerhalb der Öffnungszeiten"],
    bild: 2,
  },
];

const PROJEKTE = [
  {
    titel: "Einbauschrank unter der Dachschräge",
    text: "Sieben Meter Schrankwand in einem Altbau von 1904. Kein Winkel im Raum war rechtwinklig, keine Fuge ist es geworden.",
    daten: [["Ort", "Musterstadt-Nord"], ["Jahr", "2025"], ["Material", "Eiche, geölt"], ["Umfang", "7 lfm Schrankwand"], ["Dauer", "6 Wochen"]],
    bild: 0,
  },
  {
    titel: "Küche für eine Familie zu fünft",
    text: "Vier Meter Zeile plus Insel, Fronten aus Esche mit Linoleum. Die Insel hat Rollen - sie wandert zum Backen ans Fenster.",
    daten: [["Ort", "Kleinbach"], ["Jahr", "2025"], ["Material", "Esche, Linoleum"], ["Umfang", "4 m Zeile plus Insel"], ["Dauer", "9 Wochen"]],
    bild: 1,
  },
  {
    titel: "Regalwand für eine Buchhandlung",
    text: "42 laufende Meter Regal, in vier Nächten montiert. Der Laden hat keinen Tag geschlossen.",
    daten: [["Ort", "Musterstadt-Mitte"], ["Jahr", "2024"], ["Material", "Eiche massiv"], ["Umfang", "42 lfm Regal"], ["Dauer", "11 Wochen"]],
    bild: 2,
  },
  {
    titel: "Freitragende Treppe",
    text: "Stufen aus Eiche, Wangen aus Stahl vom Schlosser nebenan. Statik geprüft, Geländer nach DIN 18065.",
    daten: [["Ort", "Musterstadt-Süd"], ["Jahr", "2024"], ["Material", "Eiche, Stahl"], ["Umfang", "16 Stufen, freitragend"], ["Dauer", "7 Wochen"]],
    bild: 3,
  },
];

const ABLAUF = [
  { nr: "01", titel: "Aufmaß", text: "Wir kommen vorbei und messen selbst. Kostenlos, auch wenn daraus nichts wird." },
  { nr: "02", titel: "Entwurf", text: "Zeichnung, Materialmuster und ein Festpreis. Bis hierhin zahlen Sie nichts." },
  { nr: "03", titel: "Fertigung", text: "In unserer Werkstatt an der Sägewerkstraße. Kein Zukauf, keine Subunternehmer." },
  { nr: "04", titel: "Montage", text: "Zwei Leute, ein bis drei Tage. Wir nehmen die Verpackung wieder mit." },
  { nr: "05", titel: "Abnahme", text: "Gemeinsam durchgehen, nachjustieren, Pflegeanleitung übergeben." },
];

const TEAM = [
  { name: "Jonas Brandhorst", rolle: "Tischlermeister, Betriebsleitung", seit: "im Betrieb seit 2009", bild: 0 },
  { name: "Derya Arslan", rolle: "Tischlermeisterin, Werkstattleitung", seit: "im Betrieb seit 2014", bild: 1 },
  { name: "Milan Voß", rolle: "Geselle, Montage", seit: "im Betrieb seit 2019", bild: 2 },
  { name: "Lea Kaminski", rolle: "Auszubildende, 2. Lehrjahr", seit: "im Betrieb seit 2024", bild: 3 },
];

const STIMMEN = [
  {
    text: "Die Schrankwand sitzt auf den Millimeter, obwohl in dem Altbau keine Wand gerade ist. Termine wurden eingehalten, die Werkstatt hat sauber gearbeitet und aufgeräumt.",
    name: "Familie Hoffmann",
    ort: "Einbauschrank, Musterstadt-Nord",
  },
  {
    text: "Wir haben mit drei Betrieben gesprochen. Brandhorst war nicht der günstigste, aber der einzige, der beim Aufmaß direkt gesagt hat, was so nicht funktioniert.",
    name: "Architekturbüro Reiners",
    ort: "Ladenbau, Musterstadt-Mitte",
  },
  {
    text: "Montage über Nacht, morgens war der Laden offen. Ein Regalbrett hing zwei Wochen später leicht durch - am nächsten Tag war jemand da und hat es getauscht.",
    name: "Buchhandlung am Markt",
    ort: "Regalwand, 42 laufende Meter",
  },
];

export default function HandwerkDemo() {
  return (
    <div className={`demo hw ${archivo.variable}`}>
      {/* Kopfbereich auf Graphit: hebt die Tischlerei vom hellen Papier des
          Cafs ab und setzt die Werkstatt gleich in den ersten Blick. */}
      <div className="hw__oben">
        <div className="hw__topbar">
          <div className="demo__shell hw__topbar-inner">
            <span>Meisterbetrieb seit 1954 · Mitglied der Tischler-Innung</span>
            <span>Aufmaß und Kostenvoranschlag <b>kostenlos</b></span>
          </div>
        </div>

        <div className="demo__shell">
          <nav className="hw__nav">
            <a href="#" className="hw__marke">
              <span className="hw__zeichen" aria-hidden="true" />
              <span className="hw__marke-text">
                <strong>Brandhorst</strong>
                <span>Tischlerei &amp; Innenausbau</span>
              </span>
            </a>
            <div className="hw__navlinks">
              <a href="#leistungen">Leistungen</a>
              <a href="#projekte">Projekte</a>
              <a href="#ablauf">Ablauf</a>
              <a href="#team">Team</a>
              <a href="#anfrage">Anfrage</a>
            </div>
            <a href="#anfrage" className="hw__tel">
              <span aria-hidden="true">&#9742;</span> 0 12345 67890
            </a>
          </nav>

          <header className="hw__hero">
            <div>
              <p className="hw__marke-nr">Tischlerei seit 1954</p>
              <h1 className="hw__titel hw__display">
                Möbel, die in <span>krumme</span> Wände passen.
              </h1>
              <p>
                Wir bauen Einbaumöbel, Küchen und Ladeneinrichtungen nach Maß - im eigenen Haus,
                mit eigenen Leuten. Seit drei Generationen an derselben Adresse.
              </p>
              <div className="hw__aktionen">
                <a href="#anfrage" className="hw__btn">
                  Aufmaß vereinbaren <span aria-hidden="true">&#8594;</span>
                </a>
                <a href="#projekte" className="hw__btn hw__btn--leer">Projekte ansehen</a>
              </div>
            </div>
            <div className="hw__hero-bild">
              <Bild platz={BILD_HERO} sizes="(max-width: 940px) 100vw, 50vw" priority />
              <p className="hw__masse hw__mono"><span>Werkstatt Sägewerkstraße 3 · 640 m²</span></p>
            </div>
          </header>

          <dl className="hw__belege">
            {BELEGE.map((b) => (
              <div className="hw__beleg" key={b.wert}>
                <dt className="vh">{b.text}</dt>
                <dd>
                  <b>{b.wert}</b>
                  <span>{b.text}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="hw__section" id="leistungen">
        <div className="demo__shell">
          <div className="hw__kopf auf">
            <p className="hw__marke-nr">01 / Leistungen</p>
            <h2 className="hw__h2 hw__display">Drei Dinge, die wir richtig können.</h2>
            <p>
              Wir machen keine Fenster, keine Türen von der Stange und keine Terrassen. Dafür
              alles, was gemessen, gezeichnet und dann gebaut werden muss.
            </p>
          </div>

          <div className="hw__leistungen">
            {LEISTUNGEN.map((l) => (
              <article className="hw__leistung zoom auf" key={l.titel}>
                <Bild platz={BILD_LEISTUNG[l.bild]!} sizes="(max-width: 940px) 100vw, 33vw" />
                <div className="hw__leistung-text">
                  <h3>{l.titel}</h3>
                  <p>{l.text}</p>
                  <ul>
                    {l.punkte.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hw__section hw__section--weiss" id="projekte">
        <div className="demo__shell">
          <div className="hw__kopf hw__kopf--reihe auf">
            <div>
              <p className="hw__marke-nr">02 / Projekte</p>
              <h2 className="hw__h2 hw__display">Zuletzt gebaut.</h2>
              <p>Vier von 38 Aufträgen im vergangenen Jahr. Auf Wunsch zeigen wir Ihnen mehr.</p>
            </div>
            <a href="#anfrage" className="hw__btn hw__btn--leer">Referenzen anfragen</a>
          </div>

          <div className="hw__projekte">
            {PROJEKTE.map((p) => (
              <article className="hw__projekt zoom auf" key={p.titel}>
                <Bild platz={BILD_PROJEKT[p.bild]!} sizes="(max-width: 820px) 100vw, 50vw" />
                <div className="hw__projekt-text">
                  <p className="hw__mono">{p.daten[0]![1]} · {p.daten[1]![1]}</p>
                  <h3>{p.titel}</h3>
                  <p>{p.text}</p>
                  <dl className="hw__datenblatt">
                    {p.daten.slice(2).map(([k, v]) => (
                      <div key={k} style={{ display: "contents" }}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hw__section hw__section--dunkel" id="ablauf">
        <div className="demo__shell">
          <div className="hw__kopf auf">
            <p className="hw__marke-nr">03 / Ablauf</p>
            <h2 className="hw__h2 hw__display">Vom ersten Anruf bis zur Abnahme.</h2>
            <p>
              Sie wissen jederzeit, was als Nächstes passiert und was es kostet. Bis zum Entwurf
              ist alles kostenlos - erst mit Ihrer Unterschrift wird es verbindlich.
            </p>
          </div>
          <div className="hw__ablauf">
            {ABLAUF.map((s) => (
              <div className="hw__schritt" key={s.nr}>
                <b>{s.nr}</b>
                <h3>{s.titel}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hw__section" id="team">
        <div className="demo__shell">
          <div className="hw__kopf auf">
            <p className="hw__marke-nr">04 / Werkstatt</p>
            <h2 className="hw__h2 hw__display">Wer bei Ihnen vor der Tür steht.</h2>
            <p>
              22 Leute, davon vier Auszubildende. Wer Ihr Möbel baut, montiert es auch - deshalb
              wissen Sie am Ende, mit wem Sie es zu tun hatten.
            </p>
          </div>
          <div className="hw__team">
            {TEAM.map((t) => (
              <article className="hw__person zoom auf" key={t.name}>
                <Bild platz={BILD_TEAM[t.bild]!} sizes="(max-width: 940px) 50vw, 25vw" />
                <h3>{t.name}</h3>
                <p>{t.rolle}</p>
                <span className="hw__mono">{t.seit}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hw__section hw__section--weiss">
        <div className="demo__shell">
          <div className="hw__kopf auf">
            <p className="hw__marke-nr">05 / Stimmen</p>
            <h2 className="hw__h2 hw__display">Was Kundinnen und Kunden sagen.</h2>
          </div>
          <div className="hw__stimmen">
            {STIMMEN.map((s) => (
              <figure className="hw__stimme auf" key={s.name}>
                <span className="hw__sterne" aria-label="Fünf von fünf Sternen">★★★★★</span>
                <blockquote>{s.text}</blockquote>
                <figcaption>
                  <b>{s.name}</b>
                  {s.ort}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="demo__note" style={{ marginTop: "26px" }}>
            Demo-Seite: Die Stimmen gehören zum erfundenen Betrieb und stammen nicht von echten
            Kundinnen und Kunden.
          </p>
        </div>
      </section>

      <section className="hw__section" id="anfrage">
        <div className="demo__shell hw__anfrage">
          <div className="auf">
            <p className="hw__marke-nr">06 / Anfrage</p>
            <h2 className="hw__h2 hw__display">Sagen Sie uns, worum es geht.</h2>
            <p style={{ color: "var(--grau)", maxWidth: "42ch" }}>
              Wir melden uns am selben oder nächsten Werktag. Aufmaß vor Ort und
              Kostenvoranschlag sind kostenlos und unverbindlich.
            </p>
            <dl className="hw__kontaktliste">
              <div className="hw__kontaktzeile">
                <dt>Telefon</dt>
                <dd>0 12345 67890</dd>
              </div>
              <div className="hw__kontaktzeile">
                <dt>E-Mail</dt>
                <dd>werkstatt@brandhorst.example</dd>
              </div>
              <div className="hw__kontaktzeile">
                <dt>Werkstatt</dt>
                <dd>Sägewerkstraße 3, 12345 Musterstadt</dd>
              </div>
              <div className="hw__kontaktzeile">
                <dt>Bürozeiten</dt>
                <dd>Mo - Do 7:00 - 16:30 · Fr 7:00 - 13:00</dd>
              </div>
            </dl>
          </div>

          <div className="hw__formular auf">
            <div className="hw__formular-kopf">
              <h3 className="hw__display" style={{ fontSize: "1.3rem" }}>Aufmaß anfragen</h3>
              <span className="hw__mono">Antwort binnen 1 Werktag</span>
            </div>
            <div className="hw__feld hw__feld--paar">
              <div className="hw__feld">
                <label htmlFor="hw-name">Name</label>
                <input id="hw-name" type="text" placeholder="Vor- und Nachname" disabled />
              </div>
              <div className="hw__feld">
                <label htmlFor="hw-tel">Telefon</label>
                <input id="hw-tel" type="tel" placeholder="Für Rückfragen" disabled />
              </div>
            </div>
            <div className="hw__feld">
              <label htmlFor="hw-art">Worum geht es?</label>
              <select id="hw-art" disabled defaultValue="">
                <option value="">Bitte wählen</option>
                <option>Einbaumöbel</option>
                <option>Küche</option>
                <option>Ladenbau</option>
                <option>Reparatur oder Aufarbeitung</option>
                <option>Etwas anderes</option>
              </select>
            </div>
            <div className="hw__feld">
              <label htmlFor="hw-text">Beschreibung</label>
              <textarea id="hw-text" placeholder="Raum, Maße, Wunschtermin - je mehr wir wissen, desto genauer die Antwort." disabled />
            </div>
            <button type="button" className="hw__btn demo__fake" disabled style={{ justifyContent: "center" }}>
              Anfrage senden
            </button>
            <p className="demo__note">
              Attrappe: Dieses Formular gehört zu einer Demo-Seite und versendet nichts.
            </p>
          </div>
        </div>
      </section>

      <footer className="hw__fuss">
        <div className="demo__shell">
          <div className="hw__fuss-grid">
            <div>
              <span className="hw__marke">
                <span className="hw__zeichen" aria-hidden="true" />
                <span className="hw__marke-text">
                  <strong>Brandhorst</strong>
                  <span>Tischlerei &amp; Innenausbau</span>
                </span>
              </span>
              <p style={{ marginTop: "16px", maxWidth: "34ch", fontSize: "14.5px" }}>
                Meisterbetrieb in dritter Generation. Eigene Werkstatt, eigene Montage,
                kein Zukauf.
              </p>
            </div>
            <div>
              <h4>Leistungen</h4>
              <ul>
                <li><a href="#leistungen">Einbaumöbel</a></li>
                <li><a href="#leistungen">Küchen</a></li>
                <li><a href="#leistungen">Ladenbau</a></li>
                <li>Aufarbeitung</li>
              </ul>
            </div>
            <div>
              <h4>Betrieb</h4>
              <ul>
                <li><a href="#team">Team</a></li>
                <li><a href="#projekte">Projekte</a></li>
                <li><a href="#ablauf">Ablauf</a></li>
                <li>Ausbildung</li>
              </ul>
            </div>
            <div>
              <h4>Kontakt</h4>
              <ul>
                <li>Sägewerkstraße 3</li>
                <li>12345 Musterstadt</li>
                <li>0 12345 67890</li>
                <li>werkstatt@brandhorst.example</li>
              </ul>
            </div>
          </div>
          <div className="hw__fuss-schluss">
            <span>Demo-Projekt. Erfundener Betrieb, erfundene Adresse, Rufnummern und Stimmen.</span>
            <span>Gestaltet von Novahost</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
