"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import StatusDot from "@/components/ui/StatusDot";
import { consent as texts, consentCategories } from "@/lib/content";
import {
  CONSENT_OPEN_EVENT,
  acceptAllConsent,
  createConsent,
  readStoredConsent,
  rejectAllConsent,
  storeConsent,
} from "@/lib/consent";
import { cn } from "@/lib/utils";
import type { CookieCategory } from "@/types";

/**
 * Die Einwilligungs-Abfrage.
 *
 * Drei Zustaende: nichts sichtbar, Banner, Einstellungen. Der Banner erscheint
 * nur, wenn noch keine gueltige Entscheidung gespeichert ist; die Einstellungen
 * lassen sich jederzeit ueber den Footer erneut oeffnen.
 *
 * Bewusste Entscheidungen:
 * - Gerendert wird erst nach dem Mounten. Auf dem Server gibt es keinen
 *   localStorage; ein serverseitig gerenderter Banner wuerde bei jedem
 *   Besucher kurz aufblitzen, auch bei denen, die laengst entschieden haben.
 * - Zustimmen und Ablehnen stehen als gleich grosse Schaltflaechen
 *   nebeneinander. Ein versteckter oder blasser "Ablehnen"-Knopf waere nach
 *   Auffassung der Datenschutzbehoerden keine freie Entscheidung.
 * - Es gibt kein Wegklicken: Escape und ein Klick daneben schliessen die
 *   Einstellungen, speichern aber nichts. Wer noch nicht entschieden hat,
 *   landet wieder beim Banner.
 * - Alle optionalen Schalter stehen anfangs auf aus.
 */

type View = "hidden" | "banner" | "settings";

/** Auswahl der abwaehlbaren Kategorien im Einstellungsdialog. */
type Choices = Record<Exclude<CookieCategory, "necessary">, boolean>;

const NO_CHOICES: Choices = { statistics: false, marketing: false };

export default function CookieConsent() {
  const [view, setView] = useState<View>("hidden");
  const [choices, setChoices] = useState<Choices>(NO_CHOICES);
  /** Merkt sich, ob beim Oeffnen der Einstellungen schon entschieden war. */
  const hadDecision = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  /** Element, das vor dem Dialog den Fokus hatte. */
  const lastFocused = useRef<HTMLElement | null>(null);

  /* --- Startzustand: nur fragen, wenn noch nichts entschieden wurde ------- */
  useEffect(() => {
    const stored = readStoredConsent();
    hadDecision.current = stored !== null;

    if (stored) {
      setChoices({
        statistics: stored.categories.statistics,
        marketing: stored.categories.marketing,
      });
    } else {
      setView("banner");
    }
  }, []);

  /* --- Erneutes Oeffnen ueber den Footer ---------------------------------- */
  useEffect(() => {
    const onOpen = () => {
      const stored = readStoredConsent();
      hadDecision.current = stored !== null;

      setChoices(
        stored
          ? {
              statistics: stored.categories.statistics,
              marketing: stored.categories.marketing,
            }
          : NO_CHOICES,
      );
      setView("settings");
    };

    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  const decide = useCallback((next: Choices | "all" | "none") => {
    const state =
      next === "all"
        ? acceptAllConsent()
        : next === "none"
          ? rejectAllConsent()
          : createConsent(next);

    storeConsent(state);
    hadDecision.current = true;
    setChoices({
      statistics: state.categories.statistics,
      marketing: state.categories.marketing,
    });
    setView("hidden");
  }, []);

  /**
   * Schliesst die Einstellungen, ohne etwas zu speichern. Wer noch nicht
   * entschieden hat, sieht danach wieder den Banner — die Frage bleibt offen.
   */
  const dismissSettings = useCallback(() => {
    setView(hadDecision.current ? "hidden" : "banner");
  }, []);

  /* --- Fokus und Tastatur im Dialog --------------------------------------- */
  useEffect(() => {
    if (view !== "settings") return;

    lastFocused.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.focus();

    // Der Dialog ist modal — der Hintergrund darf nicht mitscrollen.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismissSettings();
        return;
      }

      if (event.key !== "Tab" || !dialog) return;

      // Fokus-Falle: Tab laeuft im Dialog im Kreis statt hinter ihn zu springen.
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lastFocused.current?.focus();
    };
  }, [view, dismissSettings]);

  /* --- Fokus auf den Banner, sobald er erscheint -------------------------- */
  useEffect(() => {
    if (view === "banner") bannerRef.current?.focus();
  }, [view]);

  if (view === "hidden") return null;

  if (view === "banner") {
    return (
      <div
        ref={bannerRef}
        tabIndex={-1}
        role="region"
        aria-label={texts.title}
        className="consent-banner glass glass-edge fixed right-4 bottom-4 left-4 min-[900px]:bottom-9 z-[120] mx-auto max-w-[860px] rounded-panel p-6 max-[560px]:p-5"
      >
        <div className="flex items-start gap-5 max-[760px]:flex-col max-[760px]:gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-nh-blue uppercase">
              <StatusDot tone="blue" />
              {texts.eyebrow}
            </div>

            <h2 className="mt-2.5 font-display text-[19px] leading-tight font-extrabold text-nh-ink">
              {texts.title}
            </h2>

            <p className="mt-2 text-[14px] leading-[1.65] text-nh-body">
              {texts.text}{" "}
              <Link
                href={texts.privacyHref}
                className="footer-link font-medium text-nh-blue"
              >
                {texts.privacyLabel}
              </Link>
            </p>
          </div>

          {/*
            Zustimmen und Ablehnen sind gleich gross und gleich prominent;
            "Einstellungen" steht als dritter, ruhigerer Weg daneben.
          */}
          <div className="flex flex-none flex-col gap-2.5 max-[760px]:w-full">
            <div className="flex gap-2.5 max-[560px]:flex-col">
              <button type="button" onClick={() => decide("all")} className="btn btn-sm">
                {texts.acceptAll}
              </button>

              <button
                type="button"
                onClick={() => decide("none")}
                className="btn btn-ghost btn-sm"
              >
                {texts.rejectAll}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setView("settings")}
              className="font-mono text-[11.5px] tracking-[0.06em] text-nh-mute underline-offset-4 transition-colors duration-[var(--dur-hover)] hover:text-nh-blue hover:underline"
            >
              {texts.openSettings}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      {/* Klick daneben schliesst — ohne zu speichern. */}
      <div
        aria-hidden="true"
        onClick={dismissSettings}
        className="consent-scrim absolute inset-0 bg-[rgba(8,17,31,0.34)] backdrop-blur-[3px]"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-title"
        aria-describedby="consent-text"
        tabIndex={-1}
        className="consent-dialog glass glass-edge relative max-h-[86vh] w-full max-w-[560px] overflow-y-auto rounded-panel p-7 max-[560px]:p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.16em] text-nh-blue uppercase">
              {texts.eyebrow}
            </div>

            <h2
              id="consent-title"
              className="mt-2.5 font-display text-[22px] leading-tight font-extrabold text-nh-ink"
            >
              {texts.settingsTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={dismissSettings}
            aria-label={texts.close}
            className="glow-hover flex h-9 w-9 flex-none items-center justify-center rounded-card border border-nh-line bg-nh-surface/70 text-nh-mute hover:text-nh-blue"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <p id="consent-text" className="mt-3 text-[14px] leading-[1.65] text-nh-body">
          {texts.settingsText}
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          {consentCategories.map((category) => {
            const locked = category.locked === true;
            const checked =
              locked || choices[category.id as keyof Choices] === true;

            return (
              <label
                key={category.id}
                className={cn(
                  "flex gap-4 rounded-card border border-nh-line bg-nh-surface/60 p-4 transition-colors duration-[var(--dur-hover)]",
                  locked
                    ? "cursor-default"
                    : "cursor-pointer hover:border-[color-mix(in_oklab,var(--color-nh-blue)_28%,transparent)]",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={locked}
                  onChange={(event) =>
                    setChoices((previous) => ({
                      ...previous,
                      [category.id]: event.target.checked,
                    }))
                  }
                  className="consent-switch mt-0.5 flex-none"
                />

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-[15px] font-extrabold text-nh-ink">
                      {category.title}
                    </span>

                    {locked ? (
                      <span className="rounded-chip border border-nh-line bg-nh-surface/70 px-1.5 py-0.5 font-mono text-[10px] text-nh-mute">
                        immer aktiv
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-1.5 text-[13.5px] leading-[1.6] text-nh-body">
                    {category.text}
                  </p>

                  <div className="mt-2 font-mono text-[10.5px] text-nh-mute-2">
                    {category.detail}
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        <div className="mt-7 flex flex-wrap gap-2.5">
          <button type="button" onClick={() => decide(choices)} className="btn btn-sm">
            {texts.save}
          </button>

          <button
            type="button"
            onClick={() => decide("all")}
            className="btn btn-ghost btn-sm"
          >
            {texts.acceptAll}
          </button>

          <button
            type="button"
            onClick={() => decide("none")}
            className="btn btn-ghost btn-sm"
          >
            {texts.rejectAll}
          </button>
        </div>

        <Link
          href={texts.privacyHref}
          onClick={dismissSettings}
          className="group mt-5 inline-flex items-center gap-2 font-mono text-[11.5px] tracking-[0.06em] text-nh-blue"
        >
          {texts.privacyLabel}
          <Icon
            name="arrow"
            className="h-3.5 w-3.5 transition-transform duration-[var(--dur-hover)] group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
