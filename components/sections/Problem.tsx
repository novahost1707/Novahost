"use client";

import { useState } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { problem } from "@/lib/content";

/**
 * Problem-Section als interaktive Zeilen statt Karten-Raster: die aktive
 * Zeile öffnet sich, die Nummer wächst mit. Auf Touch ist alles per Tap
 * bedienbar, ohne Hover-Abhängigkeit.
 */
export function Problem() {
  const [active, setActive] = useState(0);

  return (
    <section className="section problem" id="problem" aria-labelledby="problem-title">
      <div className="shell">
        <Reveal>
          <SectionLabel>{problem.label}</SectionLabel>
        </Reveal>

        <div className="problem__head">
          <Reveal>
            <h2 className="problem__title display h2" id="problem-title">
              {problem.headline[0]}
              <br />
              <span className="accent">{problem.headline[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="copy problem__intro">{problem.intro}</p>
          </Reveal>
        </div>

        <ul className="problem__list">
          {problem.items.map((item, index) => (
            <li key={item.num}>
              <button
                type="button"
                className="problem__row ticks"
                data-active={active === index}
                aria-expanded={active === index}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span className="problem__num pixel">{item.num}</span>
                <span className="problem__body">
                  <span className="problem__label h3">{item.title}</span>
                  <span className="problem__text">{item.body}</span>
                </span>
                <span className="problem__glyph" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
