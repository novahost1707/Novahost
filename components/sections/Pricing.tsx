"use client";

import { useState } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { careTiers, priceRules, projectTiers, vatNote, type Tier } from "@/lib/pricing";

/**
 * Preise stehen offen auf der Seite - kein "Preis auf Anfrage".
 * Darstellung als große horizontale Zeilen statt SaaS-Karten-Raster.
 * Ab Tablet sind alle Leistungen sichtbar; auf schmalen Screens lassen sie
 * sich aufklappen, damit die Preise selbst scanbar bleiben.
 */
function PriceRow({ tier, open, onToggle }: { tier: Tier; open: boolean; onToggle: () => void }) {
  const panelId = `tier-${tier.id}-features`;

  return (
    <article className="price" data-featured={Boolean(tier.featured)} data-open={open}>
      <div className="price__head">
        <div className="price__ident">
          {tier.badge && <span className="price__badge pixel">{tier.badge}</span>}
          <h3 className="price__name display">{tier.name}</h3>
          <p className="price__audience mono">{tier.audience}</p>
        </div>

        <div className="price__amount">
          <span className="price__value display">{tier.price}</span>
          {tier.priceNote && <span className="price__note pixel">{tier.priceNote}</span>}
        </div>

        <div className="price__aside">
          <p className="price__positioning">{tier.positioning}</p>
          <a href="#kontakt" className="btn btn--sm price__cta" data-cursor="LOS">
            <span className="btn__label">{tier.cta}</span>
            <span className="btn__arrow" aria-hidden="true">&#8599;</span>
          </a>
        </div>

        <button
          type="button"
          className="price__toggle pixel"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          {open ? "LEISTUNGEN AUSBLENDEN" : "LEISTUNGEN ANZEIGEN"}
          <span className="price__toggle-glyph" aria-hidden="true" />
        </button>
      </div>

      <div className="price__features" id={panelId}>
        {/* Der innere Wrapper traegt das Clipping, das Padding sitzt erst
            darunter - sonst bleibt bei grid-template-rows: 0fr die
            Innenabstandshoehe stehen. */}
        <div className="price__features-inner">
          <ul className="price__features-list">
            {tier.features.map((feature) => (
              <li key={feature} className="price__feature">
                <span className="price__feature-mark" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function TierGroup({ tiers }: { tiers: Tier[] }) {
  const [open, setOpen] = useState<string | null>(tiers.find((t) => t.featured)?.id ?? null);

  return (
    <div className="price__group">
      {tiers.map((tier, index) => (
        <Reveal key={tier.id} delay={index * 60}>
          <PriceRow
            tier={tier}
            open={open === tier.id}
            onToggle={() => setOpen((current) => (current === tier.id ? null : tier.id))}
          />
        </Reveal>
      ))}
    </div>
  );
}

export function Pricing() {
  return (
    <section className="section pricing" id="preise" aria-labelledby="pricing-title">
      <div className="shell">
        <Reveal>
          <SectionLabel>07 / PREISE</SectionLabel>
        </Reveal>

        <div className="pricing__head">
          <Reveal>
            <h2 className="display h2" id="pricing-title">WEBSITE PROJEKTE.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="copy">
              Drei klare Angebote, alle Preise offen ausgewiesen. Sie wissen vor dem ersten
              Gespräch, woran Sie sind.
            </p>
          </Reveal>
        </div>

        <TierGroup tiers={projectTiers} />

        <Reveal>
          <p className="pricing__vat mono">{vatNote}</p>
        </Reveal>
      </div>

      <div className="shell care" id="betreuung">
        <Reveal>
          <SectionLabel>09 / BETREUUNG</SectionLabel>
        </Reveal>

        <div className="pricing__head">
          <Reveal>
            <h2 className="display h2">NACH DEM LAUNCH IST NICHT SCHLUSS.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="copy">
              Nach dem Website-Launch kümmern wir uns dauerhaft um Technik, Sicherheit, Inhalte
              und Optimierung.
            </p>
          </Reveal>
        </div>

        <TierGroup tiers={careTiers} />

        <Reveal>
          <div className="rules">
            <p className="rules__intro copy">
              Die laufende Betreuung sorgt dafür, dass Ihre Website technisch aktuell bleibt und
              sich mit Ihrem Unternehmen weiterentwickelt. Damit das planbar bleibt, gelten diese
              Regeln:
            </p>
            <dl className="rules__list">
              {priceRules.map((rule) => (
                <div className="rules__row" key={rule.k}>
                  <dt className="pixel">{rule.k}</dt>
                  <dd>{rule.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
