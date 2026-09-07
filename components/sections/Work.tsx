"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/fx/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { work } from "@/lib/content";
import { demos, type Demo } from "@/lib/demos";

/**
 * Projekte. Solange keine echten Kundenreferenzen live sind, stehen hier
 * ausschließlich eigene Konzepte - sichtbar als DEMO PROJECT markiert und
 * mit erfundenen Unternehmen. Keine erfundenen Ergebniszahlen.
 *
 * Jede Kachel führt auf die vollständige Demo-Seite unter /demo/... Die
 * Vorschau darauf ist keine beliebige Skizze, sondern nimmt Aufbau und
 * Farbwelt der jeweiligen Seite vorweg - reines CSS, damit die Startseite
 * ohne Bilddateien auskommt.
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
          {demos.map((demo, index) => (
            <Reveal as="li" key={demo.slug} delay={index * 70} className="work__cell">
              <Link
                href={`/demo/${demo.slug}`}
                className="work__card ticks"
                data-active={active === index}
                data-cursor="ANSEHEN"
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
              >
                <div
                  className="work__visual"
                  style={{
                    "--v-grund": demo.vorschau.grund,
                    "--v-flaeche": demo.vorschau.flaeche,
                    "--v-text": demo.vorschau.text,
                    "--v-akzent": demo.vorschau.akzent,
                  } as React.CSSProperties}
                >
                  <Vorschau demo={demo} />
                  <span className="work__badge pixel">DEMO PROJECT</span>
                </div>
                <div className="work__meta">
                  <span className="work__num pixel">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="work__title h3">{demo.betrieb}</h3>
                  <p className="work__branch mono">{demo.branche}</p>
                  <p className="work__scope">{demo.umfang}</p>
                  <p className="work__haltung">{demo.haltung}</p>
                  <span className="work__cta">
                    {work.cta}
                    <span className="work__cta-pfeil" aria-hidden="true">&#8594;</span>
                  </span>
                </div>
              </Link>
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

/**
 * Miniatur der jeweiligen Demo-Seite.
 *
 * Bewusst vier eigene Anordnungen statt einer Vorlage mit vier Farbwerten:
 * Der ganze Punkt dieser Sektion ist, dass die vier Auftritte verschieden
 * aufgebaut sind. Eine gemeinsame Skizze wuerde genau das verdecken.
 */
function Vorschau({ demo }: { demo: Demo }) {
  switch (demo.slug) {
    case "cafe":
      return (
        <span className="work__mini" data-niche="cafe" aria-hidden="true">
          <span className="work__mini-bar" />
          <span className="work__mini-reihe">
            <span className="work__mini-text">
              <i className="work__mini-h" />
              <i className="work__mini-h work__mini-h--kurz" />
              <i className="work__mini-z" />
              <i className="work__mini-knopf" />
            </span>
            <span className="work__mini-kreis" />
          </span>
          <span className="work__mini-karte">
            <i /><i /><i />
          </span>
        </span>
      );

    case "mode":
      return (
        <span className="work__mini" data-niche="mode" aria-hidden="true">
          <span className="work__mini-bar" />
          <span className="work__mini-buehne" />
          <span className="work__mini-raster">
            <i /><i /><i /><i />
          </span>
        </span>
      );

    case "handwerk":
      return (
        <span className="work__mini" data-niche="handwerk" aria-hidden="true">
          <span className="work__mini-signal" />
          <span className="work__mini-bar" />
          <span className="work__mini-text">
            <i className="work__mini-h" />
            <i className="work__mini-h work__mini-h--kurz" />
            <i className="work__mini-knopf" />
          </span>
          <span className="work__mini-spalten">
            <i /><i /><i />
          </span>
        </span>
      );

    default:
      return (
        <span className="work__mini" data-niche="freizeit" aria-hidden="true">
          <span className="work__mini-bar" />
          <span className="work__mini-buehne" />
          <span className="work__mini-band" />
          <span className="work__mini-raster">
            <i /><i /><i /><i />
          </span>
        </span>
      );
  }
}
