"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePointerGlow } from "@/lib/use-pointer-glow";
import { useTilt } from "@/lib/use-tilt";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Ohne Maus-Lichtschein — z. B. bei sehr kleinen Karten. */
  noGlow?: boolean;
}

/**
 * Glaskarte, die auf den Zeiger reagiert.
 *
 * Zwei Effekte greifen ineinander: die Karte neigt sich minimal in Richtung
 * des Zeigers (lib/use-tilt.ts) und ein weicher Lichtschein folgt ihm auf der
 * Oberflaeche (lib/use-pointer-glow.ts). Beide schreiben nur CSS-Variablen und
 * laufen ueber `transform` — es gibt kein Layout-Neuberechnen pro Frame.
 *
 * Auf Touch-Geraeten und bei reduzierter Bewegung bleibt die Karte ruhig; die
 * Rahmen- und Schattenwechsel beim Hover bleiben erhalten.
 */
export default function TiltCard({ children, className, noGlow }: TiltCardProps) {
  const { onPointerMove: onTilt, onPointerLeave } = useTilt<HTMLDivElement>();
  const onGlow = usePointerGlow();

  return (
    <div
      onPointerMove={(event) => {
        onTilt(event);
        if (!noGlow) onGlow(event);
      }}
      onPointerLeave={onPointerLeave}
      className={cn(
        "tilt glass glass-edge glow-hover group relative overflow-hidden rounded-[22px]",
        !noGlow && "pointer-glow",
        className,
      )}
    >
      {children}
    </div>
  );
}
