import { cn } from "@/lib/utils";
import Eyebrow from "@/components/ui/Eyebrow";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  /** Wird im Titel farbig hervorgehoben, falls es darin vorkommt. */
  accent?: string;
  text?: string;
  className?: string;
  /** Zentriert Kopf und Text — fuer Abschnitte ueber die volle Breite. */
  centered?: boolean;
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
}: SectionHeadProps) {
  const at = accent ? title.indexOf(accent) : -1;

  return (
    <div
      className={cn(
        "reveal mb-[60px] max-w-[680px] max-[760px]:mb-11",
        centered && "mx-auto text-center",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>

      <h2 className="mt-[18px] text-[clamp(30px,4.4vw,52px)]">
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
