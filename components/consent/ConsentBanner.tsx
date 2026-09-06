"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CONSENT_OPEN_EVENT,
  EINWILLIGUNG_NOETIG,
  readConsent,
  writeConsent,
  type ConsentState,
} from "@/lib/consent";

/**
 * Einwilligungsabfrage für nicht notwendige Dienste.
 *
 * Gestaltungsregeln, die hier bewusst eingehalten sind:
 * - Alle drei Schaltflächen sind gleich groß und gleich gestaltet. Ablehnen
 *   darf nicht unauffälliger sein als Zustimmen.
 * - Nichts ist vorangekreuzt; ohne aktive Entscheidung gilt Ablehnung.
 * - Die Entscheidung lässt sich über den Fußzeilen-Link jederzeit ändern.
 * - Der Banner blockiert die Seite nicht: er liegt unten und lässt sich
 *   überlesen, ohne dass etwas geladen würde.
 */

type Kategorie = {
  id: "notwendig" | "statistik" | "marketing";
  titel: string;
  text: string;
  fest?: boolean;
};

const KATEGORIEN: Kategorie[] = [
  {
    id: "notwendig",
    titel: "Notwendig",
    text: "Hält Ihre Auswahl fest und sorgt dafür, dass die Bestätigung nach dem Absenden eines Formulars erscheint. Ohne diese Daten funktioniert die Seite nicht.",
    fest: true,
  },
  {
    id: "statistik",
    titel: "Statistik",
    text: "Anonyme Auswertung, welche Seiten aufgerufen werden. Hilft uns zu erkennen, was Besucher suchen.",
  },
  {
    id: "marketing",
    titel: "Marketing",
    text: "Misst, ob eine Anzeige zu einer Anfrage geführt hat. Ohne diese Einwilligung schalten wir keine personenbezogene Werbemessung.",
  },
];

export function ConsentBanner() {
  const [offen, setOffen] = useState(false);
  const [details, setDetails] = useState(false);
  const [auswahl, setAuswahl] = useState({ statistik: false, marketing: false });
  const ersterKnopf = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!EINWILLIGUNG_NOETIG) return;
    // Erst nach dem Mounten entscheiden: der Server kennt den Speicher nicht,
    // sonst gaebe es einen Unterschied zwischen Server- und Client-Ausgabe.
    if (!readConsent()) setOffen(true);
  }, []);

  useEffect(() => {
    const oeffnen = () => {
      const bisher = readConsent();
      setAuswahl({ statistik: bisher?.statistik ?? false, marketing: bisher?.marketing ?? false });
      setDetails(true);
      setOffen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, oeffnen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, oeffnen);
  }, []);

  useEffect(() => {
    if (offen) ersterKnopf.current?.focus();
  }, [offen]);

  const entscheiden = useCallback((state: Pick<ConsentState, "statistik" | "marketing">) => {
    writeConsent(state);
    setOffen(false);
    setDetails(false);
  }, []);

  if (!EINWILLIGUNG_NOETIG || !offen) return null;

  return (
    <div
      className="consent"
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-titel"
      aria-describedby="consent-text"
    >
      <div className="consent__panel">
        <div className="consent__head">
          <p className="pixel consent__label">
            <span className="chip__dot" aria-hidden="true" />
            DATENSCHUTZ
          </p>
          <h2 className="consent__title display" id="consent-titel">
            Sie entscheiden, was geladen wird.
          </h2>
          <p className="consent__text" id="consent-text">
            Notwendige Daten speichern wir, damit die Seite funktioniert. Alles Weitere - etwa die
            Messung, ob eine Anzeige zu einer Anfrage geführt hat - nur mit Ihrer Einwilligung. Sie
            können Ihre Wahl jederzeit über den Link in der Fußzeile ändern. Mehr dazu in der{" "}
            <Link href="/datenschutz" className="tlink accent">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>

        {details && (
          <ul className="consent__list">
            {KATEGORIEN.map((k) => {
              const aktiv = k.fest ? true : auswahl[k.id as "statistik" | "marketing"];
              return (
                <li className="consent__item" key={k.id}>
                  <label className="consent__switch">
                    <input
                      type="checkbox"
                      checked={aktiv}
                      disabled={k.fest}
                      onChange={(event) =>
                        !k.fest &&
                        setAuswahl((a) => ({
                          ...a,
                          [k.id as "statistik" | "marketing"]: event.target.checked,
                        }))
                      }
                    />
                    <span className="consent__switch-box" aria-hidden="true" />
                    <span className="consent__item-titel">
                      {k.titel}
                      {k.fest && <span className="pixel consent__fest">IMMER AKTIV</span>}
                    </span>
                  </label>
                  <p className="consent__item-text">{k.text}</p>
                </li>
              );
            })}
          </ul>
        )}

        <div className="consent__actions">
          <button
            ref={ersterKnopf}
            type="button"
            className="btn consent__btn"
            onClick={() => entscheiden({ statistik: true, marketing: true })}
          >
            <span className="btn__label">Alle akzeptieren</span>
          </button>

          <button
            type="button"
            className="btn consent__btn"
            onClick={() =>
              details
                ? entscheiden(auswahl)
                : entscheiden({ statistik: false, marketing: false })
            }
          >
            <span className="btn__label">
              {details ? "Auswahl speichern" : "Nur Nötigste"}
            </span>
          </button>

          <button
            type="button"
            className="btn consent__btn"
            onClick={() => entscheiden({ statistik: false, marketing: false })}
          >
            <span className="btn__label">Ablehnen</span>
          </button>
        </div>

        {!details && (
          <button type="button" className="consent__more pixel" onClick={() => setDetails(true)}>
            EINZELN AUSWÄHLEN
          </button>
        )}
      </div>
    </div>
  );
}

/** Fußzeilen-Schalter, über den sich die Entscheidung widerrufen lässt. */
export function ConsentWiderrufLink({ className }: { className?: string }) {
  if (!EINWILLIGUNG_NOETIG) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT))}
    >
      Cookie-Einstellungen
    </button>
  );
}
