# Novahost

Website der Agentur **Novahost** — „Websites, die aus Besuchern Kunden machen."

Eine Sales-Website für Handwerksbetriebe, lokale Dienstleister und KMU:
transparente Preise, klarer Conversion-Funnel, laufende Betreuung.

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Eigenes CSS-Design-System (Custom Properties), keine UI-Bibliothek |
| Schriften | Inter, Inter Tight, Silkscreen — via `next/font`, selbst gehostet |
| Tests | Vitest |
| Laufzeit-Abhängigkeiten | keine außer Next/React |

Alle Effekte (Pixel-Feld, Cursor, Reveals, Timeline, Easter Egg) sind selbst
geschrieben. Kein Animations-Framework, kein Icon-Paket, keine Bilddateien.

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Produktionsbuild
npm run typecheck  # TypeScript ohne Emit
npm test           # Vitest
```

## Konfiguration

`.env.example` nach `.env.local` kopieren und ausfüllen:

| Variable | Zweck |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Basis-URL für Canonicals, Sitemap, Open Graph |
| `NEXT_PUBLIC_CONTACT_EMAIL` / `_PHONE` | werden im Footer ausgegeben, solange gesetzt |
| `LEAD_WEBHOOK_URL` | Anfragen an CRM/Automatisierung posten |
| `RESEND_API_KEY`, `LEAD_MAIL_FROM`, `LEAD_MAIL_TO` | Anfragen per E-Mail zustellen |

Ohne Zustellkanal wird eine Anfrage serverseitig protokolliert — die Seite
funktioniert also auch, bevor ein Postfach angebunden ist.

## Design-System

Das gesamte visuelle System steht in `styles/tokens.css`: Farben, Type Scale,
Spacing (8pt), Grid, Radien, Motion-Timings, Easing, Z-Index-Ebenen.
Änderungen dort wirken auf die ganze Seite.

**Gestaltungsprinzip:** Pixel × Editorial × Technology × Business.

- **Farbe** — anthrazitgraue Oberflächen, ein einziger Farbakzent
  (gedämpftes Moosgrün `--moss-*`). Alle Textfarben liegen über 4.5:1
  Kontrast zum Grund.
- **Typografie** — rund 80 % moderne Sans (Inter / Inter Tight),
  rund 20 % Pixelschrift (Silkscreen) für Labels, Nummern, Statusanzeigen
  und Microcopy. Die Pixelschrift trägt nie Fließtext.
- **Form** — scharfe Kanten, Haarlinien, Eck-Ticks statt abgerundeter Cards.
- **Textur** — feines Punktraster plus statisches Grain (`.texture`),
  bewusst erst auf den zweiten Blick sichtbar.
- **Motion** — jede Bewegung hat eine Aufgabe: Reveals ordnen, die
  Prozesslinie zeigt die Position im Ablauf, das Pixel-Feld reagiert auf den
  Zeiger. Bei `prefers-reduced-motion` wird alles abgeschaltet.

## Aufbau

```
app/
  layout.tsx          Metadaten, Schriften, JSON-LD, globale Rahmen
  page.tsx            Reihenfolge der Sections = Conversion-Funnel
  api/lead/route.ts   Anfragen: Validierung, Rate-Limit, Zustellung
  impressum/          Rechtsseiten mit markierten Platzhaltern
  datenschutz/
  robots.ts sitemap.ts
components/
  layout/             Header (inkl. Vollbild-Menü), Footer
  sections/           Eine Datei je Section
  fx/                 PixelField, Cursor, Reveal, Magnetic
  ui/                 Cta, SectionLabel, Wordmark
  easteregg/          Verstecktes Spiel
lib/
  content.ts          Sämtliche Texte
  pricing.ts          Preise und Leistungsumfänge
  site.ts             Navigation, Marke, ENV-abhängige Kontaktdaten
  validation.ts       Formularregeln (Client und Server gemeinsam)
  rate-limit.ts
styles/               Design-System und Section-Stylesheets
```

**Content ist vom Layout getrennt.** Texte, Preise und Leistungen ändert man
in `lib/`, ohne Komponenten anzufassen.

### Erweiterung um Landingpages

Die Struktur ist auf Branchenseiten wie `/webdesign-elektriker` ausgelegt
(siehe `plannedLandingPages` in `lib/site.ts`). Eine neue Seite braucht ein
Verzeichnis unter `app/`, eigene Metadaten und einen Eintrag in
`app/sitemap.ts`. Sections lassen sich einzeln wiederverwenden.

## Inhaltliche Regeln

Diese Seite behauptet nichts, was nicht belegbar ist:

- Die Projekte unter „Selected Work" sind **eigene Konzepte** und als
  `DEMO PROJECT` gekennzeichnet. Keine erfundenen Kundennamen, keine
  erfundenen Kundenlogos, keine erfundenen Ergebniszahlen.
- Keine Erfolgsgarantien, keine erfundenen Bewertungen, keine Aussage wie
  „100 % DSGVO-konform".
- Impressum und Datenschutz enthalten sichtbar markierte Platzhalter
  (`[ ... ]`), die vor dem Livegang durch echte Angaben ersetzt werden
  müssen. Beide Seiten sind Vorlagen und ersetzen keine Rechtsberatung.

## Datenschutz und Sicherheit

- Keine Cookies, kein Tracking, keine externen Requests zur Laufzeit
  (Schriften werden beim Build mitgeliefert).
- Formulare: serverseitige Validierung, Honeypot-Feld, Rate-Limit pro IP,
  Einwilligungs-Checkbox, nur die nötigen Felder als Pflicht.
- Sicherheits-Header in `next.config.ts`.
- Der Rate-Limiter arbeitet im Arbeitsspeicher. Bei mehreren Instanzen sollte
  er gegen einen geteilten Speicher (z. B. Redis) getauscht werden; die
  Signatur in `lib/rate-limit.ts` bleibt dabei gleich.

## Barrierefreiheit

Semantisches HTML, Skip-Link, sichtbare Fokuszustände, ausreichende Kontraste,
bedienbare Accordions und Formulare per Tastatur, `prefers-reduced-motion`
wird respektiert, der eigene Cursor ist auf Touch-Geräten deaktiviert.
Ohne JavaScript bleibt kein Inhalt unsichtbar.

## Easter Egg

Ein Pixel-Runner ist versteckt. Drei Wege hinein: dreimal auf die Wortmarke
klicken, den kleinen Pixelwürfel in der Fußzeile treffen, oder `dino` tippen.
`ESC` schließt, `R` startet neu.
