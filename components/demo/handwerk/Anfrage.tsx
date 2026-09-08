"use client";

import { useId, useState } from "react";

/**
 * Anfragestrecke der Demo-Tischlerei.
 *
 * Wie beim Restaurant gilt: die Felder funktionieren wirklich, geprüft wird
 * wirklich, nur versendet wird nichts - und das steht im Formular, nicht im
 * Kleingedruckten. Ein durchgehend gesperrtes Formular zeigt nicht, wie sich
 * die Strecke anfühlt; genau darum geht es bei einer Demo aber.
 */

const ARTEN = [
  "Einbaumöbel",
  "Küche",
  "Ladenbau",
  "Reparatur oder Aufarbeitung",
  "Etwas anderes",
];

export function Anfrage() {
  const id = useId();
  const [name, setName] = useState("");
  const [telefon, setTelefon] = useState("");
  const [art, setArt] = useState("");
  const [text, setText] = useState("");
  const [gesendet, setGesendet] = useState(false);

  const fehlt: string[] = [];
  if (!name.trim()) fehlt.push("Name");
  if (!telefon.trim()) fehlt.push("Telefon");
  if (!art) fehlt.push("Worum es geht");
  const vollstaendig = fehlt.length === 0;

  if (gesendet) {
    return (
      <div className="hw__formular hw__formular--fertig" role="status">
        <div className="hw__formular-kopf">
          <h3 className="hw__display" style={{ fontSize: "1.3rem" }}>Das wäre Ihre Anfrage gewesen.</h3>
          <span className="hw__mono">Demo</span>
        </div>
        <dl className="hw__quittung">
          <div>
            <dt>Name</dt>
            <dd>{name}</dd>
          </div>
          <div>
            <dt>Telefon</dt>
            <dd>{telefon}</dd>
          </div>
          <div>
            <dt>Thema</dt>
            <dd>{art}</dd>
          </div>
          {text.trim() ? (
            <div>
              <dt>Beschreibung</dt>
              <dd>{text}</dd>
            </div>
          ) : null}
        </dl>
        <p className="demo__note">
          Diese Seite ist ein Gestaltungsbeispiel. Es wurde nichts versendet. Bei einem
          echten Betrieb ginge das in die Werkstatt - mit Antwort binnen eines Werktags.
        </p>
        <button type="button" className="hw__btn hw__btn--leer" onClick={() => setGesendet(false)}>
          Zurück zum Formular
        </button>
      </div>
    );
  }

  return (
    <form
      className="hw__formular auf"
      aria-label="Anfrage"
      onSubmit={(e) => {
        e.preventDefault();
        if (vollstaendig) setGesendet(true);
      }}
    >
      <div className="hw__formular-kopf">
        <h3 className="hw__display" style={{ fontSize: "1.3rem" }}>Aufmaß anfragen</h3>
        <span className="hw__mono">Antwort binnen 1 Werktag</span>
      </div>

      <div className="hw__feld hw__feld--paar">
        <div className="hw__feld">
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
        <div className="hw__feld">
          <label htmlFor={`${id}-tel`}>Telefon</label>
          <input
            id={`${id}-tel`}
            type="tel"
            required
            autoComplete="tel"
            placeholder="Für Rückfragen"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
          />
        </div>
      </div>

      <div className="hw__feld">
        <label htmlFor={`${id}-art`}>Worum geht es?</label>
        <select id={`${id}-art`} required value={art} onChange={(e) => setArt(e.target.value)}>
          <option value="">Bitte wählen</option>
          {ARTEN.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>

      <div className="hw__feld">
        <label htmlFor={`${id}-text`}>Beschreibung</label>
        <textarea
          id={`${id}-text`}
          placeholder="Raum, Maße, Wunschtermin - je mehr wir wissen, desto genauer die Antwort."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button type="submit" className="hw__btn" style={{ justifyContent: "center" }}>
        Anfrage senden
      </button>

      <p className="demo__note" aria-live="polite">
        {vollstaendig
          ? "Demo-Seite: Es wird nichts versendet."
          : `Es fehlt noch: ${fehlt.join(", ")}.`}
      </p>
    </form>
  );
}
