"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Minimaler eigener Cursor: Punkt, der bei interaktiven Elementen zu einem
 * Label wird (VIEW / OPEN / EXPLORE). Aktiviert sich ausschließlich auf
 * Geräten mit feinem Zeiger und deaktiviert sich bei reduzierter Bewegung -
 * Touch-Bedienung bleibt vollständig unberührt.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setEnabled(fine.matches && !reduced.matches);
    decide();
    fine.addEventListener("change", decide);
    reduced.addEventListener("change", decide);
    return () => {
      fine.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("has-cursor");

    const onMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      const hit = (event.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setLabel(hit instanceof HTMLElement ? (hit.dataset.cursor ?? "") : "");
    };

    const render = () => {
      // Leichtes Nachziehen: trägt zur Wertigkeit bei, ohne Präzision zu kosten.
      current.current.x += (target.current.x - current.current.x) * 0.22;
      current.current.y += (target.current.y - current.current.y) * 0.22;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      frame.current = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame.current = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={cursorRef} className="cursor" data-mode={label ? "label" : "dot"} aria-hidden="true">
      <span className="cursor__dot" />
      <span className="cursor__label">{label}</span>
    </div>
  );
}
