import Link from "next/link";
import Container from "@/components/ui/Container";
import LogoLink from "@/components/ui/LogoLink";
import CurrentYear from "@/components/CurrentYear";
import ConsentSettingsButton from "@/components/ConsentSettingsButton";
import StatusDot from "@/components/ui/StatusDot";
import {
  footerColumns,
  footerSnippet,
  legalLinks,
  siteMeta,
  socialLinks,
} from "@/lib/content";

/**
 * Der Footer.
 *
 * Aufbau in drei Baendern: Markenspalte mit Statusabfrage, danach die
 * Linkspalten, unten die Rechtszeile. Das kleine Terminal greift den
 * Developer-Charakter der Seite ein letztes Mal auf — statisch, weil hier
 * niemand mehr auf eine Animation wartet.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-nh-line bg-nh-canvas pt-16 pb-10">
      <div aria-hidden="true" className="tech-grid tech-grid-fade" />

      <Container className="relative z-[1]">
        <div className="grid grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))] gap-10 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
          {/* Markenspalte */}
          <div>
            <LogoLink uid="footer" />

            <p className="mt-5 max-w-[280px] text-[14px] leading-[1.7] text-nh-mute">
              {siteMeta.claim} Hosting, Server und Cloud-Infrastruktur aus
              europäischen Rechenzentren.
            </p>

            {/* Statusabfrage als Code-Zeile */}
            <div className="mt-6 overflow-x-auto rounded-[12px] border border-nh-line bg-white/70 px-3.5 py-3">
              <pre className="font-mono text-[11px] leading-[1.7] whitespace-pre text-nh-mute">
                {footerSnippet}
              </pre>
            </div>

            <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-nh-ok">
              <StatusDot />
              all systems operational
            </div>
          </div>

          {/* Linkspalten */}
          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="font-mono text-[11px] tracking-[0.16em] text-nh-ink uppercase">
                {column.heading}
              </h2>

              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    <Link href={link.href} className="footer-link text-[14px]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="section-rule mt-14 mb-7" />

        <div className="flex flex-wrap items-center justify-between gap-5">
          <span className="font-mono text-[12px] text-nh-mute-2">
            © <CurrentYear /> {siteMeta.name}. Alle Rechte vorbehalten.
          </span>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-wrap gap-[22px] text-[12.5px]">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}

              {/* Der Widerruf steht gleichwertig neben den Pflichtseiten. */}
              <ConsentSettingsButton className="text-[12.5px]" />
            </div>

            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteMeta.name} auf ${social.title}`}
                  className="glow-hover glass flex h-9 w-9 items-center justify-center rounded-[11px] font-mono text-[11px] text-nh-mute hover:-translate-y-0.5 hover:text-nh-blue"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
