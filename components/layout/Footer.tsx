"use client";

import Link from "next/link";
import { footer } from "@/lib/content";
import { legalNav, site } from "@/lib/site";
import { PixelMark } from "@/components/ui/Wordmark";

/**
 * Footer mit der großen Wortmarke als Abbinder. Der Pixel-Würfel rechts in
 * der Statuszeile ist der zweite Weg ins versteckte Spiel.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="footer__logo" aria-label={`${site.name} Startseite`}>
              <PixelMark size={26} />
            </Link>
            <p className="footer__claim pixel">{footer.claim}</p>
            <p className="copy footer__pitch">{site.tagline}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer-Navigation">
            {footer.columns.map((column) => (
              <div className="footer__col" key={column.title}>
                <p className="pixel footer__col-title">{column.title}</p>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="tlink footer__link">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="footer__col">
              <p className="pixel footer__col-title">KONTAKT</p>
              <ul>
                {site.email && (
                  <li>
                    <a href={`mailto:${site.email}`} className="tlink footer__link">{site.email}</a>
                  </li>
                )}
                {site.phone && (
                  <li>
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="tlink footer__link">{site.phone}</a>
                  </li>
                )}
                <li>
                  <a href="#kontakt" className="tlink footer__link">Kostenloses Erstgespräch</a>
                </li>
                <li>
                  <a href="#analyse" className="tlink footer__link">Website analysieren</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <p className="footer__wordmark display" aria-hidden="true">{site.wordmark}</p>

        <div className="footer__bottom">
          <p className="mono">&copy; {year} {site.name}</p>
          <ul className="footer__legal">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="tlink mono">{item.label}</Link>
              </li>
            ))}
          </ul>
          <p className="pixel footer__status">
            <span className="chip__dot" aria-hidden="true" />
            SYSTEM ONLINE / {site.build}
            <button
              type="button"
              className="footer__egg"
              aria-label="Verstecktes Spiel starten"
              onClick={() => window.dispatchEvent(new CustomEvent("novahost:easteregg"))}
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
