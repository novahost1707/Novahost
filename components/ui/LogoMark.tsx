import { cn } from "@/lib/utils";

interface LogoMarkProps {
  /**
   * Eindeutiges Kuerzel fuer die SVG-Verlaufs-IDs. Das Logo steht mehrfach
   * auf der Seite (Header, Footer); ohne unterschiedliche IDs waeren die
   * `id`-Attribute doppelt und damit ungueltiges HTML.
   */
  uid: string;
  className?: string;
  /** Ohne Wortmarke — z. B. als Favicon-artiges Zeichen. */
  markOnly?: boolean;
}

/**
 * Das Nova-Host-Zeichen: ein Knoten mit zwei Ebenen.
 *
 * Die Form ist ein "N", das gleichzeitig als Netzwerkpfad gelesen werden kann —
 * zwei Standorte (die Punkte oben rechts und unten links) mit einer Diagonale
 * dazwischen. Bewusst als reines SVG umgesetzt: es skaliert verlustfrei,
 * traegt den Blauverlauf der Seite und kostet keinen zusaetzlichen Request.
 */
export default function LogoMark({ uid, className, markOnly }: LogoMarkProps) {
  const gradientId = `nh-logo-gradient-${uid}`;
  const glowId = `nh-logo-glow-${uid}`;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        width="34"
        height="34"
        role="img"
        aria-label="Nova Host"
        className="logo-glow h-[34px] w-[34px] flex-none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b3bbf" />
            <stop offset="52%" stopColor="#1a5cff" />
            <stop offset="100%" stopColor="#00c2e0" />
          </linearGradient>

          {/* Licht auf der oberen Kante — laesst das Zeichen plastisch wirken. */}
          <linearGradient id={glowId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="40" height="40" rx="11" fill={`url(#${gradientId})`} />
        <rect width="40" height="40" rx="11" fill={`url(#${glowId})`} />

        {/* Das "N" als Pfad: linke Saeule, Diagonale, rechte Saeule. */}
        <path
          d="M13 28.5V11.5L27 28.5V11.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Die beiden Endknoten des Netzpfads. */}
        <circle cx="13" cy="11.5" r="2.6" fill="#ffffff" />
        <circle cx="27" cy="28.5" r="2.6" fill="#ffffff" />
      </svg>

      {markOnly ? null : (
        <span className="font-display text-[17px] leading-none font-extrabold tracking-[-0.02em] text-nh-ink">
          Nova<span className="text-nh-blue">Host</span>
        </span>
      )}
    </div>
  );
}
