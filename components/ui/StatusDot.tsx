import { cn } from "@/lib/utils";

interface StatusDotProps {
  /** Farbe des Punkts. "ok" ist der Standard (gruen). */
  tone?: "ok" | "blue" | "cyan" | "warn";
  className?: string;
}

/**
 * Der pulsierende Statuspunkt.
 *
 * Bewusst rein dekorativ: die eigentliche Aussage steht immer als Text
 * daneben. Ein Punkt allein waere fuer Screenreader und fuer Menschen mit
 * Farbsehschwaeche keine Information.
 */
export default function StatusDot({ tone = "ok", className }: StatusDotProps) {
  return (
    <span
      aria-hidden="true"
      data-tone={tone === "ok" ? undefined : tone}
      className={cn("status-dot", className)}
    />
  );
}
