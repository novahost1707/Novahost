import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Legt ein feines technisches Raster hinter den Inhalt. */
  grid?: boolean;
}

/**
 * Standard-Abschnitt: 132px vertikaler Abstand, unter 760px 84px.
 *
 * Der Rhythmus der Seite haengt daran — jede Abweichung davon passiert
 * bewusst ueber `className`, nicht durch neue Werte hier.
 */
export default function Section({ id, children, className, grid }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-[132px] max-[760px]:py-[84px]",
        className,
      )}
    >
      {grid ? <div aria-hidden="true" className="tech-grid tech-grid-fade" /> : null}
      <div className="relative z-[1]">{children}</div>
    </section>
  );
}
