"use client";

import { useRef, type ReactNode } from "react";

/**
 * Magnetischer Wrapper für primäre CTAs. Bewegt nur das Element selbst,
 * nie den Text darin - die Klickfläche bleibt vorhersehbar.
 */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  const move = (event: React.PointerEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      className="magnetic"
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </span>
  );
}
