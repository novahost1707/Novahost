"use client";

import { useState } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faq } from "@/lib/content";

/**
 * FAQ als Accordion. Die Antwort wächst über grid-template-rows von 0fr auf
 * 1fr - das animiert weich, ohne feste Höhen und ohne Layout-Sprung.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="shell">
        <Reveal>
          <SectionLabel>{faq.label}</SectionLabel>
        </Reveal>

        <div className="faq__layout">
          <div className="faq__aside">
            <Reveal>
              <h2 className="display h2" id="faq-title">{faq.headline}</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="copy">
                Etwas nicht dabei? Fragen Sie einfach - im Erstgespräch beantworten wir alles
                Weitere.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <a href="#kontakt" className="btn btn--ghost" data-cursor="LOS">
                <span className="btn__label">Frage stellen</span>
                <span className="btn__arrow" aria-hidden="true">&#8599;</span>
              </a>
            </Reveal>
          </div>

          <ul className="faq__list">
            {faq.items.map((item, index) => {
              const isOpen = open === index;
              return (
                <li className="faq__item" key={item.q} data-open={isOpen}>
                  <h3>
                    <button
                      type="button"
                      className="faq__q"
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${index}`}
                      id={`faq-q-${index}`}
                      onClick={() => setOpen(isOpen ? null : index)}
                    >
                      <span className="faq__num pixel">{String(index + 1).padStart(2, "0")}</span>
                      <span className="faq__q-text">{item.q}</span>
                      <span className="faq__glyph" aria-hidden="true">
                        <i /><i />
                      </span>
                    </button>
                  </h3>
                  <div
                    className="faq__a"
                    id={`faq-a-${index}`}
                    role="region"
                    aria-labelledby={`faq-q-${index}`}
                  >
                    <div className="faq__a-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
