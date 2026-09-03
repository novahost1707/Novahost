import { cn } from "@/lib/utils";

interface SectionMarkerProps {
  /** Laufende Nummer des Abschnitts, z. B. "02". */
  index: string;
  /** Benennung des Abschnitts, z. B. "Leistungen". */
  label: string;
  className?: string;
}

/**
 * Die Marke oberhalb eines Abschnitts — Nummer, Benennung, Trennlinie und
 * Position in der Gesamtzahl.
 *
 * Liest sich wie die Kapitelmarke in einer Spezifikation und gibt der Seite
 * eine durchgehende Ordnung: man sieht an jeder Stelle, im wievielten von acht
 * Abschnitten man gerade ist. Bewusst sehr leise gesetzt, damit die Headline
 * darunter die Aufmerksamkeit behaelt.
 *
 * Sie ersetzt das frueher separate Eyebrow — beide haetten sonst direkt
 * untereinander dasselbe Wort gesagt.
 */
export default function SectionMarker({
  index,
  label,
  className,
}: SectionMarkerProps) {
  return (
    <div
      className={cn(
        "mb-5 flex items-center gap-3 font-mono text-[11.5px] text-nh-mute",
        className,
      )}
    >
      <span className="font-semibold text-nh-blue">{index}</span>
      <span className="tracking-[0.04em]">{label}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-nh-line" />
      <span aria-hidden="true" className="text-nh-mute-2">
        {index} / 08
      </span>
    </div>
  );
}
