"use client";

import { useState } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/lib/content";

/**
 * Leistungen als horizontale Zeilen: beim Hover fährt der Hintergrund ein,
 * die Nummer wächst und ein Pixel-Preview zeigt das Kürzel der Disziplin.
 * Bewusst kein Card-Grid - Zeilen lesen sich schneller und wirken ruhiger.
 */
export function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="section services" id="leistungen" aria-labelledby="services-title">
      <div className="shell">
        <Reveal>
          <SectionLabel>{services.label}</SectionLabel>
        </Reveal>

        <div className="services__head">
          <Reveal>
            <h2 className="display h2" id="services-title">{services.headline}</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="copy">{services.intro}</p>
          </Reveal>
        </div>
      </div>

      <ul className="services__list" onMouseLeave={() => setActive(null)}>
        {services.items.map((item, index) => (
          <li key={item.num}>
            <div
              className="services__row"
              data-active={active === index}
              data-dim={active !== null && active !== index}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              data-cursor={item.en}
            >
              <div className="services__row-inner shell">
                <span className="services__num pixel">{item.num}</span>
                <h3 className="services__title display">{item.title}</h3>
                <p className="services__text">{item.body}</p>
                <ul className="services__tags">
                  {item.tags.map((tag) => (
                    <li key={tag} className="mono services__tag">{tag}</li>
                  ))}
                </ul>
                <span className="services__preview pixel" aria-hidden="true">{item.en}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
