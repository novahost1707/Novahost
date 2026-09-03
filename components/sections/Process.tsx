"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { process as processContent } from "@/lib/content";

/**
 * Prozess als vertikale Timeline. Die Fortschrittslinie folgt der
 * Scroll-Position - eine Animation mit Funktion: sie zeigt, wo im Ablauf man
 * sich gerade befindet. Ohne Scroll-Listener-Rechnerei pro Frame: der Wert
 * wird nur bei Bedarf aktualisiert und als CSS-Variable gesetzt.
 */
export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.85;
      const value = (start - rect.top) / (rect.height + start - viewport * 0.35);
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="section process" id="prozess" aria-labelledby="process-title">
      <div className="shell">
        <Reveal>
          <SectionLabel>{processContent.label}</SectionLabel>
        </Reveal>

        <div className="process__head">
          <Reveal>
            <h2 className="display h2" id="process-title">{processContent.headline}</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="copy">{processContent.intro}</p>
          </Reveal>
        </div>

        <ol
          className="process__list"
          ref={listRef}
          style={{ "--progress": progress } as React.CSSProperties}
        >
          <span className="process__track" aria-hidden="true">
            <span className="process__track-fill" />
          </span>

          {processContent.steps.map((step, index) => {
            const reached = progress * processContent.steps.length >= index + 0.35;
            return (
              <li className="process__step" key={step.num} data-reached={reached}>
                <span className="process__marker" aria-hidden="true" />
                <span className="process__num pixel">{step.num}</span>
                <h3 className="process__title h3">{step.title}</h3>
                <p className="process__text copy">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
