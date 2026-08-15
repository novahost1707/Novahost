"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoMark from "@/components/ui/LogoMark";
import { cn } from "@/lib/utils";
import { siteMeta } from "@/lib/content";

interface LogoLinkProps {
  uid: string;
  className?: string;
}

/**
 * Das Logo als Navigationselement.
 *
 * Auf der Startseite scrollt ein Klick sanft nach oben — ohne Reload. Auf
 * Unterseiten wie /impressum bleibt es ein normaler Link zur Startseite.
 *
 * Es bleibt in beiden Faellen ein echtes `<a>` mit href: dadurch funktionieren
 * Tastatur, Mittelklick und "in neuem Tab oeffnen" wie erwartet.
 */
export default function LogoLink({ uid, className }: LogoLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;

    // Modifiziertes Klicken (neuer Tab, neues Fenster) nicht abfangen.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }

    event.preventDefault();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      aria-label={
        isHome ? "Zum Seitenanfang" : `${siteMeta.name} — zur Startseite`
      }
      className={cn("logo-link", className)}
    >
      <LogoMark uid={uid} />
    </Link>
  );
}
