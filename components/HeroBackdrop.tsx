"use client";

import { useEffect, useRef } from "react";
import Particles from "@/components/Particles";

/**
 * Die beweglichen Hintergrundebenen des Hero.
 *
 * Drei Ebenen, die sich unterschiedlich schnell bewegen — daraus entsteht der
 * Parallax-Eindruck:
 * 1. Das technische Raster wandert minimal mit Maus und Scroll.
 * 2. Zwei weiche Lichtflaechen bewegen sich staerker und gegenlaeufig.
 * 3. Ein Lichtschein folgt direkt dem Zeiger (`--gx`/`--gy`).
 *
 * Alles laeuft ueber `transform` bzw. CSS-Variablen und wird pro Frame nur
 * einmal geschrieben, damit kein Layout neu berechnet wird. Bei reduzierter
 * Bewegung bleibt der Hintergrund still, auf Touch-Geraeten entfaellt der
 * Maus-Anteil.
 */

/** Maximale Auslenkung in Pixeln bei voller Mausbewegung. */
const GRID_SHIFT = 14;
const ORB_SHIFT = 34;
/** Anteil des Scrollwegs, den die Ebenen mitgehen. */
const GRID_SCROLL = 0.06;
const ORB_SCROLL = 0.14;

export default function HeroBackdrop() {
  const gridRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const orbs = orbsRef.current;
    const glow = glowRef.current;
    if (!grid || !orbs || !glow) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Anteile von -0.5 bis 0.5, unabhaengig von der Fenstergroesse.
    let pointerX = 0;
    let pointerY = 0;
    /** Position des Zeigers im Hero, in Prozent — fuer den Lichtschein. */
    let glowX = 50;
    let glowY = 40;
    let scrollY = 0;
    let frame: number | null = null;

    const paint = () => {
      frame = null;

      grid.style.transform = `translate3d(${pointerX * GRID_SHIFT}px, ${
        pointerY * GRID_SHIFT + scrollY * GRID_SCROLL
      }px, 0)`;

      orbs.style.transform = `translate3d(${pointerX * -ORB_SHIFT}px, ${
        pointerY * -ORB_SHIFT + scrollY * ORB_SCROLL
      }px, 0)`;

      glow.style.setProperty("--gx", `${glowX}%`);
      glow.style.setProperty("--gy", `${glowY}%`);
    };

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(paint);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;

      // Der Lichtschein sitzt im Hero-Element, nicht im Fenster — daher
      // relativ zu dessen Kasten rechnen.
      const bounds = glow.getBoundingClientRect();
      glowX = ((event.clientX - bounds.left) / bounds.width) * 100;
      glowY = ((event.clientY - bounds.top) / bounds.height) * 100;

      glow.dataset.active = "true";
      schedule();
    };

    const onPointerLeave = () => {
      delete glow.dataset.active;
    };

    const onScroll = () => {
      // Nur solange der Hero ueberhaupt im Bild ist — danach bringt weiteres
      // Rechnen nichts Sichtbares mehr.
      scrollY = Math.min(window.scrollY, window.innerHeight);
      schedule();
    };

    if (canHover) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div ref={gridRef} className="absolute inset-[-3%] will-change-transform">
        <div className="tech-grid tech-grid-fade" />
      </div>

      {/* Zwei weiche Lichtflaechen, gegenlaeufig zum Raster. */}
      <div ref={orbsRef} className="absolute inset-0 will-change-transform">
        <div className="float absolute top-[6%] right-[8%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-nh-cyan)_22%,transparent),transparent_66%)] blur-[6px] max-[760px]:h-[240px] max-[760px]:w-[240px]" />
        <div
          className="float absolute bottom-[4%] left-[2%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-nh-blue)_18%,transparent),transparent_66%)] blur-[6px] max-[760px]:h-[260px] max-[760px]:w-[260px]"
          style={{ animationDelay: "-4.5s", animationDuration: "12s" }}
        />
      </div>

      <Particles count={16} />

      <div ref={glowRef} className="hero-cursor-glow" />
    </div>
  );
}
