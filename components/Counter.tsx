"use client";

import { formatCountValue, useCountUp } from "@/lib/use-count-up";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Tausendertrennzeichen — bei Jahreszahlen auf false setzen. */
  grouping?: boolean;
  className?: string;
}

/**
 * Eine Zahl, die beim Erscheinen auf ihren Wert hochzaehlt.
 *
 * Wichtig fuer Screenreader: waehrend des Zaehlens aendert sich der Text
 * mehrmals pro Sekunde. Die laufende Zahl ist deshalb `aria-hidden`, und
 * daneben steht der Endwert einmal unsichtbar im DOM — vorgelesen wird also
 * "99,99 %", nicht jeder Zwischenschritt.
 */
export default function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  grouping = true,
  className,
}: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const display = useCountUp({ to: value, start: inView, decimals, grouping });

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {`${prefix}${formatCountValue(value, decimals, grouping)}${suffix}`}
      </span>
    </span>
  );
}
