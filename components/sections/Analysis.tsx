"use client";

import { useState } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { analysis } from "@/lib/content";
import { validateLead, type FieldErrors } from "@/lib/validation";

/**
 * Lead-Magnet: bewusst nur drei Felder. Jede zusätzliche Eingabe kostet
 * Abschlüsse - alles Weitere klären wir im Gespräch.
 */
export function Analysis() {
  const [values, setValues] = useState({ website: "", name: "", email: "", consent: false, fax: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = { ...values, type: "analyse" as const };
    const found = validateLead(payload);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setState("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setMessage(data.message ?? "Bitte prüfen Sie Ihre Angaben.");
        setState("error");
        return;
      }
      setState("done");
    } catch {
      setMessage("Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.");
      setState("error");
    }
  };

  return (
    <section className="section analysis" id="analyse" aria-labelledby="analysis-title">
      <div className="shell analysis__inner">
        <div className="analysis__left">
          <Reveal>
            <SectionLabel>{analysis.label}</SectionLabel>
          </Reveal>
          <Reveal>
            <h2 className="display analysis__title" id="analysis-title">
              {analysis.headline[0]}
              <br />
              <span className="accent">{analysis.headline[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lead analysis__sub">{analysis.sub}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="copy">{analysis.body}</p>
          </Reveal>
          <Reveal delay={160}>
            <ul className="analysis__checks">
              {analysis.checks.map((check, index) => (
                <li key={check} className="analysis__check">
                  <span className="analysis__check-num pixel">{String(index + 1).padStart(2, "0")}</span>
                  {check}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={100} className="analysis__right">
          <div className="panel">
            <p className="panel__label pixel">
              <span className="chip__dot" aria-hidden="true" /> ANALYSE ANFORDERN
            </p>

            {state === "done" ? (
              <div className="panel__done" role="status">
                <p className="display h3">Angekommen.</p>
                <p className="copy">
                  Wir sehen uns Ihre Website an und melden uns innerhalb von zwei Werktagen mit
                  einer konkreten Einschätzung.
                </p>
              </div>
            ) : (
              <form className="form" onSubmit={submit} noValidate>
                <div className="field">
                  <label className="field__label pixel" htmlFor="an-website">IHRE WEBSITE</label>
                  <input
                    id="an-website"
                    className="input"
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    placeholder="ihre-website.de"
                    value={values.website}
                    aria-invalid={Boolean(errors.website)}
                    aria-describedby={errors.website ? "an-website-error" : undefined}
                    onChange={(event) => setValues({ ...values, website: event.target.value })}
                  />
                  {errors.website && <p className="error" id="an-website-error">{errors.website}</p>}
                </div>

                <div className="field">
                  <label className="field__label pixel" htmlFor="an-name">NAME</label>
                  <input
                    id="an-name"
                    className="input"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "an-name-error" : undefined}
                    onChange={(event) => setValues({ ...values, name: event.target.value })}
                  />
                  {errors.name && <p className="error" id="an-name-error">{errors.name}</p>}
                </div>

                <div className="field">
                  <label className="field__label pixel" htmlFor="an-email">E-MAIL</label>
                  <input
                    id="an-email"
                    className="input"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "an-email-error" : undefined}
                    onChange={(event) => setValues({ ...values, email: event.target.value })}
                  />
                  {errors.email && <p className="error" id="an-email-error">{errors.email}</p>}
                </div>

                <label className="consent">
                  <input
                    type="checkbox"
                    checked={values.consent}
                    onChange={(event) => setValues({ ...values, consent: event.target.checked })}
                  />
                  <span>
                    Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage
                    verarbeitet werden. Details in der <a href="/datenschutz" className="tlink">Datenschutzerklärung</a>.
                  </span>
                </label>
                {errors.consent && <p className="error">{errors.consent}</p>}

                {/* Honeypot - für Menschen unsichtbar, nicht fokussierbar */}
                <div className="hp" aria-hidden="true">
                  <label htmlFor="an-fax">Fax</label>
                  <input
                    id="an-fax"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.fax}
                    onChange={(event) => setValues({ ...values, fax: event.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn--primary btn--block btn--lg" disabled={state === "sending"}>
                  <span className="btn__label">
                    {state === "sending" ? "WIRD GESENDET ..." : analysis.cta}
                  </span>
                  <span className="btn__arrow" aria-hidden="true">&#8599;</span>
                </button>

                {state === "error" && message && <p className="error" role="alert">{message}</p>}
                <p className="field__hint">{analysis.note}</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
