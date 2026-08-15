"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ParticlesProps {
  /** Anzahl der Lichtpunkte. Mehr als ~24 wirkt schnell wie Schneefall. */
  count?: number;
  className?: string;
}

interface Particle {
  px: string;
  py: string;
  size: string;
  dur: string;
  delay: string;
  drift: string;
}

/**
 * Dezente Lichtpunkte im Hintergrund.
 *
 * Die Punkte steigen sehr langsam auf und verblassen dabei — es soll wie
 * Staub im Licht aussehen, nicht wie ein Partikeleffekt. Die eigentliche
 * Animation macht CSS (`.particle` in globals.css); JavaScript verteilt nur
 * einmalig Position, Groesse und Dauer.
 *
 * Bewusst erst nach dem Mounten erzeugt: die Werte sind zufaellig und wuerden
 * auf Server und Client unterschiedlich ausfallen (Hydration-Fehler). Bis
 * dahin ist der Bereich schlicht leer — er ist rein dekorativ.
 */
export default function Particles({ count = 18, className }: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Ohne Bewegungswunsch gar nicht erst erzeugen — spart die Elemente
    // komplett, statt sie nur unsichtbar zu schalten.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setParticles(
      Array.from({ length: count }, () => ({
        px: `${Math.random() * 100}%`,
        py: `${Math.random() * 100}%`,
        size: `${2 + Math.random() * 3.5}px`,
        dur: `${9 + Math.random() * 11}s`,
        delay: `${-Math.random() * 14}s`,
        drift: `${-16 + Math.random() * 32}px`,
      })),
    );
  }, [count]);

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      {particles.map((particle, index) => (
        <span
          key={index}
          className="particle"
          style={
            {
              "--px": particle.px,
              "--py": particle.py,
              "--size": particle.size,
              "--dur": particle.dur,
              "--delay": particle.delay,
              "--drift": particle.drift,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
