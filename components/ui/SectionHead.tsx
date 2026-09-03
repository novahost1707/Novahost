import { cn } from "@/lib/utils";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionMarker from "@/components/ui/SectionMarker";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  /** Wird im Titel farbig hervorgehoben, falls es darin vorkommt. */
  accent?: string;
  text?: string;
  className?: string;
  /** Zentriert Kopf und Text — fuer Abschnitte ueber die volle Breite. */
  centered?: boolean;
  /** Laufende Nummer des Abschnitts, z. B. "02". */
  index?: string;

}

/**
 * Abschnitts-Kopf: Eyebrow, grosse Headline, optionaler Fliesstext.
 *
 * `accent` hebt einen Teil der Headline im Blauverlauf hervor. Der Titel wird
 * dafuer genau einmal am Fundort geteilt — steht das Wort nicht drin, bleibt
 * die Headline unveraendert.
 */
export default function SectionHead({
  eyebrow,
  title,
  accent,
  text,
  className,
  centered,
  index,
}: SectionHeadProps) {
  const at = accent ? title.indexOf(accent) : -1;

  return (
    <div
      className={cn(
        "reveal mb-[60px] max-[760px]:mb-11",
        centered ? "mx-auto max-w-[760px] text-center" : "max-w-[680px]",
        className,
      )}
    >
      {/* Die Marke traegt die Benennung; ein zusaetzliches Eyebrow wuerde
          direkt darunter dasselbe Wort wiederholen. */}
      {index ? (
        <SectionMarker index={index} label={eyebrow} className="text-left" />
      ) : (
        <Eyebrow>{eyebrow}</Eyebrow>
      )}

      <h2 className="mt-3.5 text-[clamp(30px,4.4vw,52px)]">
        {at === -1 || !accent ? (
          title
        ) : (
          <>
            {title.slice(0, at)}
            <span className="text-accent">{accent}</span>
            {title.slice(at + accent.length)}
          </>
        )}
      </h2>

      {text ? (
        <p
          className={cn(
            "mt-5 text-[16.5px] leading-[1.7] text-nh-body",
            centered && "mx-auto",
          )}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
