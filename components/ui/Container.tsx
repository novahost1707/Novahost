import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Die Breitenbegrenzung der Seite: max. 1200px, 24px Innenabstand. */
export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-wrap px-6", className)}>{children}</div>
  );
}
