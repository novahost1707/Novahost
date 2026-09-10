"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/fx/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { work } from "@/lib/content";
import { projekte, type Projekt } from "@/lib/projekte";

/**
 * Projekte.
 *
 * Zwei Sorten nebeneinander, und die Kachel sagt jeweils, welche: ein echtes
 * Projekt führt auf die veröffentlichte Seite und zeigt eine Aufnahme davon,
 * ein eigenes Konzept trägt sichtbar DEMO PROJECT und führt auf /demo/...
 * Die Trennung ist der Punkt - eine Demo als Referenz auszugeben wäre eine
 * Behauptung, die niemand nachprüfen kann.
 *
 * Die Vorschau der Demos ist keine beliebige Skizze, sondern nimmt Aufbau und
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
          {projekte.map((projekt, index) => {
            const extern = projekt.art === "kunde";
            /* Fremde Adressen oeffnen in einem eigenen Tab, eigene Seiten
               nicht - wer eine Demo anschaut, will danach zurueck. */
            const eigenschaften = extern
              ? { target: "_blank" as const, rel: "noopener noreferrer" }
              : {};
            return (
              <Reveal as="li" key={projekt.slug} delay={index * 70} className="work__cell">
                <Link
                  href={projekt.ziel}
                  {...eigenschaften}
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
                      "--v-grund": projekt.vorschau.grund,
                      "--v-flaeche": projekt.vorschau.flaeche,
                      "--v-text": projekt.vorschau.text,
                      "--v-akzent": projekt.vorschau.akzent,
                    } as React.CSSProperties}
                  >
                    {projekt.bild ? (
                      <Image
                        src={projekt.bild.src}
                        alt={projekt.bild.alt}
                        fill
                        sizes="(max-width: 760px) 100vw, 50vw"
                        className="work__foto"
                      />
                    ) : (
                      <Vorschau projekt={projekt} />
                    )}
                    <span className="work__badge pixel" data-art={projekt.art}>
                      {extern ? "KUNDENPROJEKT" : "DEMO PROJECT"}
                    </span>
                  </div>
                  <div className="work__meta">
                    <span className="work__num pixel">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="work__title h3">{projekt.betrieb}</h3>
                    <p className="work__branch mono">{projekt.branche}</p>
                    <p className="work__scope">{projekt.umfang}</p>
                    <p className="work__haltung">{projekt.haltung}</p>
                    <span className="work__cta">
                      {extern ? "Website ansehen" : work.cta}
                      <span className="work__cta-pfeil" aria-hidden="true">
                        {extern ? "\u2197" : "\u2192"}
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
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
 * Bewusst eine eigene Anordnung je Seite statt einer Vorlage mit anderen
 * Farbwerten: Der ganze Punkt dieser Sektion ist, dass die Auftritte
 * verschieden aufgebaut sind. Eine gemeinsame Skizze wuerde genau das
 * verdecken.
 */
function Vorschau({ projekt }: { projekt: Projekt }) {
  switch (projekt.slug) {
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

    case "restaurant":
      return (
        <span className="work__mini" data-niche="restaurant" aria-hidden="true">
          <span className="work__mini-buehne" />
          <span className="work__mini-mitte">
            <i className="work__mini-h" />
            <i className="work__mini-z" />
            <i className="work__mini-knopf" />
          </span>
        </span>
      );

    default:
      return null;
  }
}
