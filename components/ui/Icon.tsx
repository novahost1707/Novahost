import type { SecurityIconName, ServiceIconName } from "@/types";

/**
 * Das Icon-Set der Seite — bewusst selbst gezeichnet statt als Paket.
 *
 * Alle Symbole teilen dieselbe Konstruktion: 24×24-Raster, 1.6px Strichstaerke,
 * runde Enden, keine Fuellungen. Dadurch wirken sie als Familie, obwohl sie
 * ganz unterschiedliche Dinge zeigen. Farbe kommt immer von `currentColor`.
 */

export type IconName = ServiceIconName | SecurityIconName | "check" | "arrow" | "spark";

const PATHS: Record<IconName, React.ReactNode> = {
  /* --- Services --- */

  // Browserfenster mit Adresszeile.
  web: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18" />
      <path d="M6.4 6.75h.01M9 6.75h.01" />
      <path d="M7.5 13h5.5M7.5 16h9" />
    </>
  ),

  // Gestapelte virtuelle Instanzen.
  vps: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M6.6 7h.01M6.6 17h.01" />
      <path d="M10 7h5M10 17h5" />
    </>
  ),

  // Server-Rack mit Statusleuchte.
  dedicated: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M4 9h16M4 15h16" />
      <path d="M7.5 6h.01M7.5 12h.01M7.5 18h.01" />
      <path d="M11 6h5.5M11 12h5.5M11 18h5.5" />
    </>
  ),

  // Wolke mit aufsteigendem Pfeil.
  cloud: (
    <>
      <path d="M7.2 18.5A4.2 4.2 0 0 1 7 10.1a5.4 5.4 0 0 1 10.3 1.2 3.6 3.6 0 0 1-.6 7.2H7.2Z" />
      <path d="M12 15.6V9.8M9.9 11.9 12 9.8l2.1 2.1" />
    </>
  ),

  // Gamepad.
  game: (
    <>
      <path d="M8 8h8a5 5 0 0 1 4.9 4l.7 4a2.6 2.6 0 0 1-4.7 2L15.6 16H8.4l-1.3 2a2.6 2.6 0 0 1-4.7-2l.7-4A5 5 0 0 1 8 8Z" />
      <path d="M7 11v2.4M5.8 12.2h2.4" />
      <path d="M15.6 11.6h.01M17.6 13.2h.01" />
    </>
  ),

  // Zahnrad als Sinnbild fuer betreuten Betrieb.
  managed: (
    <>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M12 2.8v2.4M12 18.8v2.4M4.5 12H2.1M21.9 12h-2.4M6.7 6.7 5 5M19 19l-1.7-1.7M6.7 17.3 5 19M19 5l-1.7 1.7" />
    </>
  ),

  /* --- Security --- */

  shield: (
    <>
      <path d="M12 3 5 6v5.6c0 4 2.9 7.6 7 9.4 4.1-1.8 7-5.4 7-9.4V6l-7-3Z" />
      <path d="m9.2 12 2 2 3.6-3.8" />
    </>
  ),

  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
      <path d="M12 14.4v2.3" />
    </>
  ),

  // Mauerwerk mit Durchlass.
  firewall: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9.5h18M3 14.5h18" />
      <path d="M9 4.5v5M15 9.5v5M9 14.5v5" />
    </>
  ),

  // Datenbank-Zylinder mit Pfeil zurueck.
  backup: (
    <>
      <path d="M12 3.6c3.9 0 7 1.1 7 2.4s-3.1 2.4-7 2.4-7-1.1-7-2.4S8.1 3.6 12 3.6Z" />
      <path d="M5 6v11.8c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4V6" />
      <path d="M5 12c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4" />
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

  // Siegel / Zertifikat.
  compliance: (
    <>
      <circle cx="12" cy="9.6" r="5.4" />
      <path d="m9.8 9.6 1.6 1.6 3-3.2" />
      <path d="m8.6 14.4-1.2 6 4.6-2.3 4.6 2.3-1.2-6" />
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
