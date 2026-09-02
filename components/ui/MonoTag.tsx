import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MonoTagProps {
  children: ReactNode;
  className?: string;
}

/**
 * Kleines technisches Label in Monospace — fuer Specs, Kennwerte und
 * Statuszeilen. Die Mischung aus fetter Display-Schrift und diesen Labels
 * traegt den Developer-Charakter der Seite.
 */
export default function MonoTag({ children, className }: MonoTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-chip border border-nh-line bg-nh-surface/60 px-2 py-1 font-mono text-[11px] leading-none tracking-[0.02em] text-nh-mute",
        className,
      )}
    >
      {children}
    </span>
  );
}
