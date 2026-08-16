"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { usePointerGlow } from "@/lib/use-pointer-glow";
import { ContactSubmitError, submitContactForm } from "@/lib/contact";
import {
  CONTACT_ROLE_LABELS,
  CONTACT_ROLES,
  FIELD_LIMITS,
  emptyContactForm,
  isHoneypotTriggered,
  validateContactForm,
} from "@/lib/validation";
import type {
  ContactFieldName,
  ContactFormErrors,
  ContactFormValues,
} from "@/types";

/** DOM-Reihenfolge der Felder — bestimmt, zu welchem Fehler gescrollt wird. */
const FIELD_ORDER: ContactFieldName[] = [
  "name",
  "role",
  "email",
  "phone",
  "message",
];

type FieldRefs = Partial<Record<ContactFieldName, HTMLDivElement | null>>;

const GENERIC_ERROR =
  "Deine Anfrage konnte nicht gesendet werden. Bitte versuche es später erneut.";

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  /** Nach erfolgreichem Versand gesetzt; Text nur bei Teilerfolg gefüllt. */
  const [sentNotice, setSentNotice] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fieldRefs = useRef<FieldRefs>({});
  const handlePointerMove = usePointerGlow();

  const setField =
    (field: keyof ContactFormValues) =>
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const { value } = event.target;
      setValues((previous) => ({ ...previous, [field]: value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Schutz gegen mehrfaches Absenden (Doppelklick, Enter-Wiederholung).
    if (isPending) return;

    // Honeypot: von Bots ausgefüllt — stillschweigend verwerfen.
    if (isHoneypotTriggered(values)) return;

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setSubmitError(null);
    setIsPending(true);

    try {
      const result = await submitContactForm(values);

      // Formular zurücksetzen — die Eingaben sind verschickt.
      setValues(emptyContactForm);
      setErrors({});
      setSentNotice(result.status === "partial" ? result.message : null);
      setIsSent(true);
    } catch (error) {
      setSubmitError(
        error instanceof ContactSubmitError ? error.message : GENERIC_ERROR,
      );
    } finally {
      setIsPending(false);
    }
  };

  if (isSent) {
    return <SuccessState notice={sentNotice} />;
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onPointerMove={handlePointerMove}
      className="pointer-glow glass glass-edge relative rounded-[24px] p-8 max-[560px]:p-6"
    >
      {/* Honeypot — für Menschen unsichtbar. */}
      <input
        className="absolute left-[-9999px] opacity-0"
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={values.company_website}
        onChange={setField("company_website")}
      />

      <div className="relative z-[2]">
        <div className="mb-6 flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-nh-mute uppercase">
          <Icon name="spark" className="h-3.5 w-3.5 text-nh-blue" />
          Anfrage senden
        </div>

        <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
          <Field
            name="name"
            label="Name"
            error={errors.name}
            errorMessage="Bitte gib deinen Namen ein."
            innerRef={(node) => {
              fieldRefs.current.name = node;
            }}
          >
            <input
              id="f-name"
              name="name"
              type="text"
              placeholder="Dein Name"
              maxLength={FIELD_LIMITS.name}
              autoComplete="name"
              value={values.name}
              onChange={setField("name")}
              aria-invalid={Boolean(errors.name)}
            />
          </Field>

          <Field
            name="role"
            label="Anliegen"
            error={errors.role}
            errorMessage="Bitte wähle eine Option."
            innerRef={(node) => {
              fieldRefs.current.role = node;
            }}
          >
            <select
              id="f-role"
              name="role"
              value={values.role}
              onChange={setField("role")}
              aria-invalid={Boolean(errors.role)}
            >
              <option value="">Bitte wählen</option>
              {CONTACT_ROLES.map((role) => (
                <option key={role} value={role}>
                  {CONTACT_ROLE_LABELS[role]}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
          <Field
            name="email"
            label="E-Mail"
            error={errors.email}
            errorMessage="Bitte gib eine gültige E-Mail-Adresse ein."
            innerRef={(node) => {
              fieldRefs.current.email = node;
            }}
          >
            <input
              id="f-email"
              name="email"
              type="email"
              placeholder="name@firma.de"
              maxLength={FIELD_LIMITS.email}
              autoComplete="email"
              value={values.email}
              onChange={setField("email")}
              aria-invalid={Boolean(errors.email)}
            />
          </Field>

          <Field
            name="phone"
            label="Telefon"
            error={errors.phone}
            errorMessage="Bitte gib eine gültige Telefonnummer ein."
            innerRef={(node) => {
              fieldRefs.current.phone = node;
            }}
          >
            <input
              id="f-phone"
              name="phone"
              type="tel"
              placeholder="+49 …"
              maxLength={FIELD_LIMITS.phone}
              autoComplete="tel"
              value={values.phone}
              onChange={setField("phone")}
              aria-invalid={Boolean(errors.phone)}
            />
          </Field>
        </div>

        <Field
          name="message"
          label="Nachricht"
          error={errors.message}
          errorMessage="Bitte beschreibe kurz dein Anliegen."
          innerRef={(node) => {
            fieldRefs.current.message = node;
          }}
        >
          <textarea
            id="f-message"
            name="message"
            placeholder="Beschreibt kurz eure aktuelle Umgebung und was ihr vorhabt …"
            maxLength={FIELD_LIMITS.message}
            value={values.message}
            onChange={setField("message")}
            aria-invalid={Boolean(errors.message)}
          />
        </Field>

        {submitError && (
          <div
            role="alert"
            className="mb-4 rounded-[12px] border border-nh-error/40 bg-[rgba(225,29,72,0.06)] px-4 py-3 font-mono text-[11.5px] leading-[1.6] text-nh-error"
          >
            {submitError}
          </div>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-4">
          <button
            className="btn disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending ? "Wird gesendet …" : "Anfrage senden"}
          </button>

          <span className="font-mono text-[11px] text-nh-mute-2">
            spam-geschützt · Antwort in Ø 14 Min.
          </span>
        </div>
      </div>
    </form>
  );
}

interface FieldProps {
  name: ContactFieldName;
  label: string;
  error?: boolean;
  errorMessage: string;
  innerRef: (node: HTMLDivElement | null) => void;
  children: ReactNode;
}

/** Feld-Wrapper: Label, Eingabe und Fehlermeldung (Styles in globals.css). */
function Field({
  name,
  label,
  error,
  errorMessage,
  innerRef,
  children,
}: FieldProps) {
  return (
    <div className={cn("field", error && "error")} ref={innerRef}>
      <label htmlFor={`f-${name}`}>{label}</label>
      {children}
      <div className="err-msg">{errorMessage}</div>
    </div>
  );
}

/**
 * Erfolgszustand, ersetzt das Formular nach dem Absenden.
 * `notice` ist nur gesetzt, wenn die Bestätigungsmail nicht zugestellt
 * werden konnte — die Anfrage selbst ist dann trotzdem angekommen.
 */
function SuccessState({ notice }: { notice: string | null }) {
  return (
    <div
      role="status"
      className="glass glass-edge rounded-[24px] px-6 py-14 text-center"
    >
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(140deg,var(--color-nh-blue),var(--color-nh-cyan))] text-white shadow-[0_14px_30px_-14px_color-mix(in_oklab,var(--color-nh-blue)_90%,transparent)]">
        <Icon name="check" strokeWidth={2.4} className="h-6 w-6" />
      </div>

      <h3 className="font-display text-[22px] font-extrabold text-nh-ink">
        Anfrage gesendet
      </h3>

      <p className="mx-auto mt-3 max-w-[360px] text-[14.5px] leading-[1.65] text-nh-body">
        Danke für deine Nachricht. Das Nova-Host-Team meldet sich in der Regel
        innerhalb weniger Minuten per E-Mail.
      </p>

      <p className="mt-6 font-mono text-[11px] tracking-[0.12em] text-nh-mute uppercase">
        ticket queued · priority normal
      </p>

      {notice && (
        <p className="mx-auto mt-4 max-w-[420px] font-mono text-[11.5px] leading-[1.6] text-nh-error">
          {notice}
        </p>
      )}
    </div>
  );
}
