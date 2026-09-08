"use client";

import { useId, useState } from "react";

/**
 * Reservierungsformular des Demo-Restaurants.
 *
 * Es ist absichtlich vollständig bedienbar: Personenzahl, Datum, Uhrzeit und
 * Menü lassen sich wirklich wählen, Pflichtfelder werden wirklich geprüft.
 * Nur der letzte Schritt fehlt - versendet wird nichts, und das steht auch
 * dort, wo es jemand liest, statt hinterher.
 *
 * Der Weg dahin ist der Punkt: Wer die Demo anschaut, soll sehen, wie sich
 * eine Reservierungsstrecke anfühlt, nicht ein ausgegrautes Bild davon.
 */

const ZEITEN = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
const MENUES = [
  "Kleines Menü, fünf Gänge",
  "Großes Menü, acht Gänge",
  "Entscheiden wir vor Ort",
];

/** Morgen - frühester sinnvoller Termin, gleichzeitig Vorgabe im Feld. */
function morgen(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function lesbaresDatum(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
}

export function Reservierung() {
  const id = useId();
  const [personen, setPersonen] = useState(2);
  const [datum, setDatum] = useState(morgen());
  const [zeit, setZeit] = useState("");
  const [menue, setMenue] = useState("");
  const [name, setName] = useState("");
  const [kontakt, setKontakt] = useState("");
  const [hinweis, setHinweis] = useState("");
  const [gesendet, setGesendet] = useState(false);

  const fehlt: string[] = [];
  if (!datum) fehlt.push("Datum");
  if (!zeit) fehlt.push("Uhrzeit");
  if (!name.trim()) fehlt.push("Name");
  if (!kontakt.trim()) fehlt.push("Telefon oder E-Mail");
  const vollstaendig = fehlt.length === 0;

  if (gesendet) {
    return (
      <div className="rt__formular rt__formular--fertig" role="status">
        <p className="rt__mini rt__strich">Demo-Anfrage</p>
        <h3>Das wäre Ihre Anfrage gewesen.</h3>
        <dl className="rt__quittung">
          <div>
            <dt>Personen</dt>
            <dd>{personen === 6 ? "6 oder mehr" : personen}</dd>
          </div>
          <div>
            <dt>Termin</dt>
            <dd>{lesbaresDatum(datum)}, {zeit} Uhr</dd>
          </div>
          <div>
            <dt>Menü</dt>
            <dd>{menue || "noch offen"}</dd>
          </div>
          <div>
            <dt>Auf den Namen</dt>
            <dd>{name}</dd>
          </div>
          <div>
            <dt>Rückmeldung an</dt>
            <dd>{kontakt}</dd>
          </div>
          {hinweis.trim() ? (
            <div>
              <dt>Hinweis</dt>
              <dd>{hinweis}</dd>
            </div>
          ) : null}
        </dl>
        <p className="demo__note">
          Diese Seite ist ein Gestaltungsbeispiel. Es wurde nichts versendet und kein Tisch
          reserviert. Bei einem echten Haus ginge genau das an die Reservierung - mit
          Bestätigung binnen zwei Stunden.
        </p>
        <button type="button" className="rt__btn rt__btn--creme" onClick={() => setGesendet(false)}>
          Zurück zum Formular
        </button>
      </div>
    );
  }

  return (
    <form
      className="rt__formular auf"
      aria-label="Reservierungsanfrage"
      onSubmit={(e) => {
        e.preventDefault();
        if (vollstaendig) setGesendet(true);
      }}
    >
      <h3>Tisch anfragen</h3>

      <div className="rt__felder">
        <fieldset className="rt__feld rt__feld--breit">
          <legend>Personen</legend>
          <div className="rt__personen">
            {[2, 3, 4, 5, 6].map((n) => (
              <label key={n}>
                <input
                  type="radio"
                  name={`${id}-personen`}
                  value={n}
                  checked={personen === n}
                  onChange={() => setPersonen(n)}
                />
                <span>{n === 6 ? "6+" : n}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="rt__feld">
          <label htmlFor={`${id}-datum`}>Datum</label>
          <input
            id={`${id}-datum`}
            type="date"
            required
            min={morgen()}
            value={datum}
            onChange={(e) => setDatum(e.target.value)}
          />
        </div>

        <div className="rt__feld">
          <label htmlFor={`${id}-zeit`}>Uhrzeit</label>
          <select
            id={`${id}-zeit`}
            required
            value={zeit}
            onChange={(e) => setZeit(e.target.value)}
          >
            <option value="">Bitte wählen</option>
            {ZEITEN.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
        </div>

        <div className="rt__feld rt__feld--breit">
          <label htmlFor={`${id}-menue`}>Menü</label>
          <select id={`${id}-menue`} value={menue} onChange={(e) => setMenue(e.target.value)}>
            <option value="">Bitte wählen</option>
            {MENUES.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="rt__feld">
          <label htmlFor={`${id}-name`}>Name</label>
          <input
            id={`${id}-name`}
            type="text"
            required
            autoComplete="name"
            placeholder="Vor- und Nachname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="rt__feld">
          <label htmlFor={`${id}-kontakt`}>Telefon oder E-Mail</label>
          <input
            id={`${id}-kontakt`}
            type="text"
            required
            placeholder="Für die Bestätigung"
            value={kontakt}
            onChange={(e) => setKontakt(e.target.value)}
          />
        </div>

        <div className="rt__feld rt__feld--breit">
          <label htmlFor={`${id}-hinweis`}>Unverträglichkeiten, Anlass</label>
          <textarea
            id={`${id}-hinweis`}
            placeholder="Damit wir uns darauf einstellen können"
            value={hinweis}
            onChange={(e) => setHinweis(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="rt__btn rt__btn--voll">
        Reservierung anfragen
      </button>

      {/* Statt den Knopf zu sperren: sagen, was noch fehlt. Ein toter Knopf
          erklaert nichts, diese Zeile schon. */}
      <p className="demo__note" aria-live="polite">
        {vollstaendig
          ? "Demo-Seite: Es wird nichts versendet und kein Tisch reserviert."
          : `Es fehlt noch: ${fehlt.join(", ")}.`}
      </p>
    </form>
  );
}
