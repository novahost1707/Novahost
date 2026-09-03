"use client";

import { useState } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  budgetOptions,
  serviceOptions,
  timeframeOptions,
  validateLead,
  type FieldErrors,
  type LeadPayload,
} from "@/lib/validation";

const steps = [
  { num: "STEP 01", title: "Was können wir für Sie tun?" },
  { num: "STEP 02", title: "Erzählen Sie uns von Ihrem Unternehmen." },
  { num: "STEP 03", title: "Budget und Zeitraum." },
  { num: "STEP 04", title: "Kontakt." },
];

const empty: LeadPayload = {
  type: "projekt",
  company: "",
  website: "",
  branch: "",
  goal: "",
  services: [],
  budget: "",
  timeframe: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
  fax: "",
};

/** Felder, die auf dem jeweiligen Schritt geprüft werden. */
const stepFields: Array<Array<keyof LeadPayload>> = [
  ["services"],
  ["company", "website"],
  ["budget", "timeframe"],
  ["name", "email", "phone", "consent"],
];

/**
 * Vierstufiges Anfrageformular. Wenige Felder pro Schritt erhöhen die
 * Abschlussquote gegenüber einem langen Formular - und die Angaben, die wir
 * bekommen, qualifizieren die Anfrage bereits vor dem Gespräch.
 */
export function LeadForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<LeadPayload>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const set = <K extends keyof LeadPayload>(key: K, value: LeadPayload[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const toggleService = (service: string) => {
    const selected = values.services.includes(service)
      ? values.services.filter((item) => item !== service)
      : [...values.services, service];
    set("services", selected);
  };

  const validateStep = (index: number): boolean => {
    const all = validateLead(values);
    const relevant: FieldErrors = {};
    for (const field of stepFields[index] ?? []) {
      if (all[field]) relevant[field] = all[field];
    }
    setErrors(relevant);
    return Object.keys(relevant).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const back = () => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = validateLead(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      // Zum ersten Schritt springen, der noch einen Fehler enthält
      const failing = stepFields.findIndex((fields) => fields.some((field) => found[field]));
      if (failing >= 0) setStep(failing);
      return;
    }

    setState("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
    <section className="section section--sunken enquiry" id="kontakt" aria-labelledby="lead-title">
      <div className="shell enquiry__inner">
        <div className="enquiry__intro">
          <Reveal>
            <SectionLabel>12 / ANFRAGE</SectionLabel>
          </Reveal>
          <Reveal>
            <h2 className="display h2" id="lead-title">PROJEKT ANFRAGEN.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="copy">
              Vier kurze Schritte. Danach wissen wir genug für ein Gespräch, in dem es sofort um
              Ihr Vorhaben geht - nicht um Grundlagen.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ol className="enquiry__steps">
              {steps.map((item, index) => (
                <li key={item.num} className="enquiry__steps-item" data-state={index === step ? "current" : index < step ? "done" : "todo"}>
                  <span className="pixel">{item.num}</span>
                  <span className="enquiry__steps-title">{item.title}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={100} className="enquiry__panel-wrap">
          <div className="panel panel--lg">
            {state === "done" ? (
              <div className="panel__done" role="status">
                <p className="pixel accent">ANFRAGE EINGEGANGEN</p>
                <p className="display h3">Danke. Wir melden uns.</p>
                <p className="copy">
                  Sie hören innerhalb von zwei Werktagen von uns - mit einer ersten Einschätzung
                  und einem Terminvorschlag für das Erstgespräch.
                </p>
              </div>
            ) : (
              <form className="form" onSubmit={submit} noValidate>
                <div className="form__head">
                  <p className="pixel accent">{steps[step]!.num}</p>
                  <h3 className="form__title h3">{steps[step]!.title}</h3>
                  <div className="form__progress" aria-hidden="true">
                    {steps.map((item, index) => (
                      <span key={item.num} data-active={index <= step} />
                    ))}
                  </div>
                </div>

                {step === 0 && (
                  <div className="stack">
                    <p className="field__label pixel">WELCHE LEISTUNGEN INTERESSIEREN SIE?</p>
                    <div className="choice-grid">
                      {serviceOptions.map((service) => (
                        <button
                          type="button"
                          key={service}
                          className="choice"
                          aria-pressed={values.services.includes(service)}
                          onClick={() => toggleService(service)}
                        >
                          <span className="choice__box" aria-hidden="true" />
                          {service}
                        </button>
                      ))}
                    </div>
                    {errors.services && <p className="error">{errors.services}</p>}

                    <div className="field">
                      <label className="field__label pixel" htmlFor="lf-goal">
                        WAS MÖCHTEN SIE VERBESSERN? (OPTIONAL)
                      </label>
                      <textarea
                        id="lf-goal"
                        className="textarea"
                        value={values.goal}
                        placeholder="Zum Beispiel: zu wenige Anfragen, veraltete Seite, unklarer Auftritt."
                        onChange={(event) => set("goal", event.target.value)}
                      />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="stack">
                    <div className="field">
                      <label className="field__label pixel" htmlFor="lf-company">UNTERNEHMEN</label>
                      <input
                        id="lf-company"
                        className="input"
                        autoComplete="organization"
                        value={values.company}
                        aria-invalid={Boolean(errors.company)}
                        onChange={(event) => set("company", event.target.value)}
                      />
                      {errors.company && <p className="error">{errors.company}</p>}
                    </div>
                    <div className="field">
                      <label className="field__label pixel" htmlFor="lf-website">WEBSITE (OPTIONAL)</label>
                      <input
                        id="lf-website"
                        className="input"
                        inputMode="url"
                        autoComplete="url"
                        placeholder="ihre-website.de"
                        value={values.website}
                        aria-invalid={Boolean(errors.website)}
                        onChange={(event) => set("website", event.target.value)}
                      />
                      {errors.website && <p className="error">{errors.website}</p>}
                    </div>
                    <div className="field">
                      <label className="field__label pixel" htmlFor="lf-branch">BRANCHE (OPTIONAL)</label>
                      <input
                        id="lf-branch"
                        className="input"
                        placeholder="z. B. Elektrotechnik, Dachdeckerei, Beratung"
                        value={values.branch}
                        onChange={(event) => set("branch", event.target.value)}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="stack">
                    <p className="field__label pixel">BUDGET</p>
                    <div className="choice-grid">
                      {budgetOptions.map((option) => (
                        <button
                          type="button"
                          key={option}
                          className="choice"
                          aria-pressed={values.budget === option}
                          onClick={() => set("budget", option)}
                        >
                          <span className="choice__box" aria-hidden="true" />
                          {option}
                        </button>
                      ))}
                    </div>
                    {errors.budget && <p className="error">{errors.budget}</p>}

                    <p className="field__label pixel">ZEITRAUM</p>
                    <div className="choice-grid">
                      {timeframeOptions.map((option) => (
                        <button
                          type="button"
                          key={option}
                          className="choice"
                          aria-pressed={values.timeframe === option}
                          onClick={() => set("timeframe", option)}
                        >
                          <span className="choice__box" aria-hidden="true" />
                          {option}
                        </button>
                      ))}
                    </div>
                    {errors.timeframe && <p className="error">{errors.timeframe}</p>}
                    <p className="field__hint">
                      Der Budgetrahmen hilft uns, Ihnen gleich im Erstgespräch einen realistischen
                      Vorschlag zu machen. Alle Projektpreise stehen offen weiter oben auf dieser Seite.
                    </p>
                  </div>
                )}

                {step === 3 && (
                  <div className="stack">
                    <div className="field">
                      <label className="field__label pixel" htmlFor="lf-name">NAME</label>
                      <input
                        id="lf-name"
                        className="input"
                        autoComplete="name"
                        value={values.name}
                        aria-invalid={Boolean(errors.name)}
                        onChange={(event) => set("name", event.target.value)}
                      />
                      {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className="field">
                      <label className="field__label pixel" htmlFor="lf-email">E-MAIL</label>
                      <input
                        id="lf-email"
                        className="input"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        aria-invalid={Boolean(errors.email)}
                        onChange={(event) => set("email", event.target.value)}
                      />
                      {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="field">
                      <label className="field__label pixel" htmlFor="lf-phone">TELEFON (OPTIONAL)</label>
                      <input
                        id="lf-phone"
                        className="input"
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={(event) => set("phone", event.target.value)}
                      />
                      {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>
                    <div className="field">
                      <label className="field__label pixel" htmlFor="lf-message">NACHRICHT (OPTIONAL)</label>
                      <textarea
                        id="lf-message"
                        className="textarea"
                        value={values.message}
                        onChange={(event) => set("message", event.target.value)}
                      />
                    </div>

                    <label className="consent">
                      <input
                        type="checkbox"
                        checked={values.consent}
                        onChange={(event) => set("consent", event.target.checked)}
                      />
                      <span>
                        Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner
                        Anfrage verarbeitet werden. Details in der{" "}
                        <a href="/datenschutz" className="tlink">Datenschutzerklärung</a>.
                      </span>
                    </label>
                    {errors.consent && <p className="error">{errors.consent}</p>}
                  </div>
                )}

                <div className="hp" aria-hidden="true">
                  <label htmlFor="lf-fax">Fax</label>
                  <input
                    id="lf-fax"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.fax}
                    onChange={(event) => set("fax", event.target.value)}
                  />
                </div>

                <div className="form__actions">
                  {step > 0 && (
                    <button type="button" className="btn btn--ghost btn--sm" onClick={back}>
                      <span className="btn__label">Zurück</span>
                    </button>
                  )}
                  {step < steps.length - 1 ? (
                    <button type="button" className="btn btn--primary" onClick={next}>
                      <span className="btn__label">Weiter</span>
                      <span className="btn__arrow" aria-hidden="true">&#8594;</span>
                    </button>
                  ) : (
                    <button type="submit" className="btn btn--primary btn--lg" disabled={state === "sending"}>
                      <span className="btn__label">
                        {state === "sending" ? "WIRD GESENDET ..." : "Anfrage senden"}
                      </span>
                      <span className="btn__arrow" aria-hidden="true">&#8599;</span>
                    </button>
                  )}
                </div>

                {state === "error" && message && <p className="error" role="alert">{message}</p>}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
