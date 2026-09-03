"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";

/**
 * Zurückhaltende Navigation: verdichtet sich beim Scrollen, blendet beim
 * Abwärtsscrollen aus und kommt beim Hochscrollen zurück - der CTA bleibt
 * dabei immer erreichbar. Mobil öffnet ein Vollbild-Menü mit großer Typo.
 */
export function Header() {
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const clicks = useRef<number[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCondensed(y > 24);
      setHidden(y > 560 && y > lastY.current && !open);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /** Dreifachklick auf die Wortmarke öffnet das versteckte Spiel. */
  const onMarkClick = (event: React.MouseEvent) => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 900), now];
    if (clicks.current.length >= 3) {
      clicks.current = [];
      // Der ausloesende Klick soll nicht zusaetzlich zur Startseite navigieren
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("novahost:easteregg"));
    }
  };

  return (
    <>
      <header className="header" data-condensed={condensed} data-hidden={hidden}>
        <div className="header__inner shell">
          <Link href="/" className="header__brand" aria-label={`${site.name} Startseite`} onClick={onMarkClick}>
            <Wordmark />
          </Link>

          <nav className="header__nav" aria-label="Hauptnavigation">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="header__link tlink">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <a href="#kontakt" className="btn btn--primary btn--sm header__cta" data-cursor="OPEN">
              <span className="btn__label">Projekt starten</span>
              <span className="btn__arrow" aria-hidden="true">&#8599;</span>
            </a>
            <button
              type="button"
              className="header__burger"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              onClick={() => setOpen((value) => !value)}
            >
              {/* Im offenen Zustand traegt das X die Aussage - der laengere
                  Text wuerde auf schmalen Screens mit dem Glyph kollidieren. */}
              {!open && <span className="pixel">MENÜ</span>}
              <span className="header__burger-glyph" data-open={open} aria-hidden="true">
                <i /><i /><i />
              </span>
            </button>
          </div>
        </div>
        <span className="header__rule" aria-hidden="true" />
      </header>

      <div className="menu" id="mobile-menu" data-open={open} hidden={!open}>
        <nav className="menu__nav shell" aria-label="Mobile Navigation">
          {nav.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="menu__link display"
              style={{ transitionDelay: `${60 + index * 45}ms` }}
              onClick={() => setOpen(false)}
            >
              <span className="menu__index pixel">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
          <div className="menu__foot">
            <a href="#kontakt" className="btn btn--primary btn--lg btn--block" onClick={() => setOpen(false)}>
              <span className="btn__label">Kostenloses Erstgespräch</span>
              <span className="btn__arrow" aria-hidden="true">&#8599;</span>
            </a>
            <a href="#analyse" className="btn btn--ghost btn--block" onClick={() => setOpen(false)}>
              <span className="btn__label">Website analysieren lassen</span>
              <span className="btn__arrow" aria-hidden="true">&#8599;</span>
            </a>
            <p className="pixel menu__status">
              <span className="chip__dot" aria-hidden="true" /> SYSTEM ONLINE / {site.build}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
