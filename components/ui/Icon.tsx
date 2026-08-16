import type { CareIconName, ServiceIconName } from "@/types";

/**
 * Das Icon-Set der Seite — bewusst selbst gezeichnet statt als Paket.
 *
 * Alle Symbole teilen dieselbe Konstruktion: 24×24-Raster, 1.6px Strichstaerke,
 * runde Enden, keine Fuellungen. Dadurch wirken sie als Familie, obwohl sie
 * ganz unterschiedliche Dinge zeigen. Farbe kommt immer von `currentColor`.
 */

export type IconName = ServiceIconName | CareIconName | "check" | "arrow" | "spark";

const PATHS: Record<IconName, React.ReactNode> = {
  /* --- Leistungen --- */

  // Zeichenflaeche mit Stift.
  design: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 8.5h18" />
      <path d="M6 7h.01" />
      <path d="m14.6 12.2-4.2 4.2-2.4.6.6-2.4 4.2-4.2a1.3 1.3 0 0 1 1.8 1.8Z" />
    </>
  ),

  // Spitze Klammern mit Schraegstrich.
  code: (
    <>
      <path d="m8.4 8.6-4 3.4 4 3.4" />
      <path d="m15.6 8.6 4 3.4-4 3.4" />
      <path d="m13.4 5.6-2.8 12.8" />
    </>
  ),

  // Kreislauf mit Pfeilspitzen — neu aufbauen.
  relaunch: (
    <>
      <path d="M20 11.4a8 8 0 1 0-.7 4.6" />
      <path d="M20.2 5.6v5.8h-5.8" />
    </>
  ),

  // Schraubenschluessel — laufende Pflege.
  care: (
    <path d="M15.8 3.6a5 5 0 0 0-5.9 6.6L3.9 16.2a2.1 2.1 0 0 0 3 3l6-6a5 5 0 0 0 6.5-6l-3.1 3.1-2.7-.7-.7-2.7 2.9-3.4Z" />
  ),

  // Lupe mit Balken — Sichtbarkeit messen.
  seo: (
    <>
      <circle cx="10.6" cy="10.6" r="6.4" />
      <path d="m15.4 15.4 4.4 4.4" />
      <path d="M8.4 12.2v-1.8M10.8 12.2V8.6M13.2 12.2v-3" />
    </>
  ),

  // Dokument mit Textzeilen.
  content: (
    <>
      <path d="M14 3.2H7a2 2 0 0 0-2 2v13.6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.2L14 3.2Z" />
      <path d="M13.8 3.4v5h5" />
      <path d="M8.6 13h6.8M8.6 16.4h4.6" />
    </>
  ),

  /* --- Betreuung --- */

  // Kreislauf mit Haken — regelmaessige Updates.
  update: (
    <>
      <path d="M20 11.4a8 8 0 1 0-.7 4.6" />
      <path d="M20.2 5.6v5.8h-5.8" />
      <path d="m9.6 12 1.8 1.8 3.4-3.6" />
    </>
  ),

  // Datenbank-Zylinder.
  backup: (
    <>
      <path d="M12 3.6c3.9 0 7 1.1 7 2.4s-3.1 2.4-7 2.4-7-1.1-7-2.4S8.1 3.6 12 3.6Z" />
      <path d="M5 6v11.8c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4V6" />
      <path d="M5 12c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4" />
    </>
  ),

  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
      <path d="M12 14.4v2.3" />
    </>
  ),

  // Puls auf einem Monitor.
  monitor: (
    <>
      <rect x="2.8" y="4.5" width="18.4" height="12.5" rx="2.5" />
      <path d="M9 20.5h6M12 17v3.5" />
      <path d="M6.4 11h2.3l1.5-2.7 2 5 1.4-2.3h3" />
    </>
  ),

  // Siegel mit Haken.
  compliance: (
    <>
      <circle cx="12" cy="9.6" r="5.4" />
      <path d="m9.8 9.6 1.6 1.6 3-3.2" />
      <path d="m8.6 14.4-1.2 6 4.6-2.3 4.6 2.3-1.2-6" />
    </>
  ),

  // Sprechblase — erreichbarer Ansprechpartner.
  support: (
    <>
      <path d="M20.4 13.4a7.4 7.4 0 0 1-8 7.3L4 21.4l1.2-4.2a7.4 7.4 0 1 1 15.2-3.8Z" />
      <path d="M9 12.4h.01M12 12.4h.01M15 12.4h.01" />
    </>
  ),

  /* --- Allgemein --- */

  check: <path d="m5 12.6 4.4 4.4L19 7.4" />,

  arrow: (
    <>
      <path d="M4.5 12h14" />
      <path d="m13 6.5 5.5 5.5-5.5 5.5" />
    </>
  ),

  spark: (
    <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.4l-1.9-5.6L4.5 10.9 10.1 9 12 3.5Z" />
  ),
};

interface IconProps {
  name: IconName;
  className?: string;
  /** Strichstaerke — nur fuer Sonderfaelle, sonst bei 1.6 belassen. */
  strokeWidth?: number;
}

export default function Icon({ name, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
