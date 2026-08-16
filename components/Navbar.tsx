"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import LogoLink from "@/components/ui/LogoLink";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Fixierter Header.
 *
 * Die Startseite ist ein One-Pager, die Navigation arbeitet daher mit
 * Anchor-Links. Auf der Startseite bleiben es reine `#hash`-Links (natives
 * Smooth Scrolling), auf Unterseiten wird `/#hash` verlinkt, damit die Links
 * dort weiterhin funktionieren.
 *
 * Drei Dinge passieren beim Scrollen, alle ueber einen einzigen Handler:
 * 1. Ab etwas Scroll legt sich Glas unter den Header (`data-scrolled`).
 * 2. Eine feine Linie am unteren Rand zeigt den Lesefortschritt (`--progress`).
 * 3. Der Abschnitt, in dem man gerade ist, wird im Menue markiert.
 *
 * Alles wird pro Frame hoechstens einmal gemessen — sonst laeuft die Logik bei
 * jedem Scroll-Tick und liest unnoetig oft Layout.
 */

/** Ab dieser Scrollhoehe gilt der Header als "gescrollt". */
const SCROLL_THRESHOLD_PX = 20;

/**
 * Ein Abschnitt gilt als aktiv, sobald seine Oberkante diese Linie im
 * Viewport passiert hat — etwa ein Drittel unter dem Header.
 */
const ACTIVE_LINE_RATIO = 0.34;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame: number | null = null;

    const read = () => {
      frame = null;

      const scrollY = window.scrollY;
      setIsScrolled(scrollY > SCROLL_THRESHOLD_PX);

      /* --- Lesefortschritt --- */
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(scrollY / scrollable, 1) : 0;
      progressRef.current?.style.setProperty("--progress", String(progress));

      /* --- Aktiver Abschnitt --- */
      if (!isHome) return;

      const line = window.innerHeight * ACTIVE_LINE_RATIO;
      let current = "";

      for (const link of navLinks) {
        const section = document.querySelector(link.hash);
        if (section && section.getBoundingClientRect().top <= line) {
          current = link.hash;
        }
      }

      setActiveHash(current);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [isHome]);

  // Das Menue schliesst sich beim Seitenwechsel und bei Escape.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <header
      data-scrolled={isScrolled}
      className="header-backdrop fixed top-0 right-0 left-0 z-[90] py-[18px]"
    >
      <Container>
        <nav aria-label="Hauptnavigation" className="flex items-center justify-between gap-6">
          <LogoLink uid="header" />

          {/* Die Abschnittslinks — ab 980px sichtbar. */}
          <div className="flex gap-7 text-[13.5px] max-[980px]:hidden">
            {navLinks.map((link) => {
              const isActive = isHome && activeHash === link.hash;

              return (
                <Link
                  key={link.hash}
                  href={hrefFor(link.hash)}
                  data-active={isActive}
                  aria-current={isActive ? "true" : undefined}
                  className="nav-link"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={hrefFor("#contact")}
              className="text-[13.5px] font-medium text-nh-body transition-colors duration-[var(--dur-hover)] hover:text-nh-ink max-[560px]:hidden"
            >
              Erstgespräch
            </Link>

            <Link href={hrefFor("#pricing")} className="btn btn-sm max-[420px]:hidden">
              Angebot holen
            </Link>

            <ThemeToggle />

            {/* Burger — nur unterhalb der Breite, ab der die Links passen. */}
            <button
              type="button"
              data-open={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              className="burger glass ml-1 hidden h-10 w-10 flex-col items-center justify-center gap-[4px] rounded-xl max-[980px]:flex"
            >
              <span className="burger-line" />
              <span className="burger-line" />
              <span className="burger-line" />
            </button>
          </div>
        </nav>

      </Container>

      {/*
        Mobiles Menue.

        Bewusst absolut unter dem Header und nicht in dessen Fluss: ein nur mit
        `visibility` verstecktes Panel wuerde weiterhin Hoehe beanspruchen —
        der Header waere dann dauerhaft mehrere hundert Pixel hoch und wuerde
        mit seinem Backdrop-Blur den halben Bildschirm ueberziehen.
      */}
      <div
        id="mobile-nav"
        data-open={isMenuOpen}
        className={cn(
          "nav-panel absolute inset-x-0 top-full hidden px-6 pt-3 max-[980px]:block",
          !isMenuOpen && "pointer-events-none",
        )}
      >
        {/*
          Deutlich deckender als die uebrigen Glasflaechen: hier liegt Text auf
          Text, und ein durchscheinender Hero macht die Links unlesbar.
        */}
        <div className="glass glass-edge overflow-hidden rounded-[18px] bg-nh-surface/[0.97]">
          <div className="flex flex-col p-2">
            {navLinks.map((link) => (
              <Link
                key={link.hash}
                href={hrefFor(link.hash)}
                onClick={() => setIsMenuOpen(false)}
                tabIndex={isMenuOpen ? undefined : -1}
                className="rounded-xl px-4 py-3 text-[15px] font-medium text-nh-body transition-colors duration-[var(--dur-hover)] hover:bg-nh-surface/70 hover:text-nh-blue"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={hrefFor("#pricing")}
              onClick={() => setIsMenuOpen(false)}
              tabIndex={isMenuOpen ? undefined : -1}
              className="btn mt-2 hidden max-[420px]:inline-flex"
            >
              Angebot holen
            </Link>
          </div>
        </div>
      </div>

      <span ref={progressRef} aria-hidden="true" className="header-progress" />
    </header>
  );
}
