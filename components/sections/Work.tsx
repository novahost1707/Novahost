"use client";

import { useState } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { work } from "@/lib/content";

/**
 * Projekte. Solange keine echten Kundenreferenzen live sind, stehen hier
 * ausschließlich eigene Konzepte - sichtbar als DEMO PROJECT markiert.
 * Keine erfundenen Kundennamen, keine erfundenen Ergebniszahlen.
 *
 * Die Vorschauen sind generative Pixel-Kompositionen (reines CSS), damit die
 * Section ohne große Bilddateien auskommt.
 */
export function Work() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="section section--sunken work" id="projekte" aria-labelledby="work-title">
      <div className="shell">
        <Reveal>
          <SectionLabel>{work.label}</SectionLabel>
        </Reveal>

        <div className="work__head">
          <Reveal>
            <h2 className="display h2" id="work-title">{work.headline}</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="copy">{work.intro}</p>
          </Reveal>
        </div>

        <ul className="work__grid">
          {work.items.map((item, index) => (
            <Reveal as="li" key={item.num} delay={index * 70} className="work__cell">
              <article
                className="work__card ticks"
                data-active={active === index}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                data-cursor="VIEW"
                tabIndex={0}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
              >
                <div className="work__visual" style={{ "--hue": item.hue } as React.CSSProperties}>
                  <span className="work__grid" aria-hidden="true" />
                  {/* Abstrahierte Layoutskizze: zeigt die Struktur, behauptet
                      kein fertiges Kundenprojekt. */}
                  <span className="work__frame" aria-hidden="true">
                    <span className="work__nav" />
                    <span className="work__headline" />
                    <span className="work__headline work__headline--short" />
                    <span className="work__line" />
                    <span className="work__line work__line--short" />
                    <span className="work__cta" />
                  </span>
                  <span className="work__badge pixel">DEMO PROJECT</span>
                </div>
                <div className="work__meta">
                  <span className="work__num pixel">{item.num}</span>
                  <h3 className="work__title h3">{item.title}</h3>
                  <p className="work__branch mono">{item.branch}</p>
                  <p className="work__scope">{item.scope}</p>
                  <p className="work__year pixel">{item.year}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="work__disclaimer mono">{work.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  );
}
