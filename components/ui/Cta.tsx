import { Magnetic } from "@/components/fx/Magnetic";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "moss";
type Size = "md" | "lg" | "sm";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  block?: boolean;
  magnetic?: boolean;
  cursor?: string;
};

const variants: Record<Variant, string> = {
  primary: "btn--primary",
  ghost: "btn--ghost",
  moss: "btn--solid-moss",
};

const sizes: Record<Size, string> = { md: "", lg: "btn--lg", sm: "btn--sm" };

/** Einheitlicher CTA - ein System für die ganze Seite. */
export function Cta({
  href,
  children,
  variant = "ghost",
  size = "md",
  arrow = true,
  block = false,
  magnetic = false,
  cursor = "OPEN",
}: Props) {
  const link = (
    <a
      href={href}
      className={["btn", variants[variant], sizes[size], block ? "btn--block" : ""]
        .filter(Boolean)
        .join(" ")}
      data-cursor={cursor}
    >
      <span className="btn__label">{children}</span>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          &#8599;
        </span>
      )}
    </a>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
