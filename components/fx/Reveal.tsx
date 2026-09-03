"use client";

import { useInView } from "@/lib/hooks/useInView";
import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
};

/**
 * Scroll-Reveal über opacity/transform (GPU-freundlich, kein Layout-Shift:
 * das Element belegt seinen Platz von Anfang an). Bei reduzierter Bewegung
 * schaltet die CSS-Regel den Effekt ab.
 */
export function Reveal({ children, as: Tag = "div", delay = 0, className }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={className ? `reveal ${className}` : "reveal"}
      data-visible={inView}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
