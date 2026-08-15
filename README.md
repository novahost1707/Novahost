# Nova Host

Website eines Hosting- und Infrastruktur-Anbieters. Hell, blau, viel Weißraum,
Glassmorphism — und durchgehend eine Developer-Ästhetik aus Monospace-Labels,
Terminals und Systemkennzahlen.

Gebaut mit **Next.js 16 (App Router)**, **React 19**, **TypeScript** (strict) und
**Tailwind CSS 4**. Ohne Animations-, Icon- oder UI-Bibliothek: alle Bewegungen
laufen über CSS und eine Handvoll eigener Hooks.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Produktionsbuild
npm run typecheck  # tsc --noEmit
npm test           # node --test über tests/
```

---

## Aufbau

```
app/
  layout.tsx            Fonts, Metadata, Navbar/Footer, Skip-Link
  page.tsx              One-Pager + JSON-LD
  globals.css           Design-Tokens, Komponenten-Klassen, Keyframes
  not-found.tsx         404 als Terminal-Ausgabe
  impressum/            Rechtsseiten (Inhalt aus lib/content.ts)
  datenschutz/
  api/contact/route.ts  Route Handler des Kontaktformulars
  icon.svg              Favicon

components/
  ui/                   Primitive: Container, Section, Eyebrow, SectionHead,
                        LogoMark, LogoLink, Icon, StatusDot, MonoTag
  sections/             Hero, Services, Infrastructure, Performance, Pricing,
                        Developers, Security, About, Contact
  Navbar · Footer · ScrollReveal · HeroBackdrop · HeroDashboard
  TiltCard · Counter · Terminal · CodeSnippet · NetworkMap · Particles
  ContactForm · LegalPage · CurrentYear

lib/
  content.ts            Sämtliche redaktionellen Inhalte
  utils.ts              cn(), escapeHtml(), formatPrice()
  validation.ts         Formularregeln — Client und Server teilen sie sich
  contact.ts            Übergabe des Formulars an /api/contact
  rate-limit.ts         Spam-Bremse pro IP
  email/                Resend-Anbindung: config, send, templates
  use-in-view · use-count-up · use-terminal · use-tilt
  use-pointer-glow · use-motion-preference

types/index.ts          Zentrale Typen
tests/                  node:test — Validierung, Rate-Limit, E-Mails, API-Route
```

**Inhalt und Darstellung sind getrennt.** Texte, Preise, Standorte, Kennzahlen
und Terminal-Skripte stehen ausschließlich in `lib/content.ts`; die Komponenten
lesen sie nur. Eine neue Region oder ein weiterer Tarif ist eine Ergänzung in
dieser Datei — an den Komponenten ändert sich dafür nichts.

---

## Designsystem

Alle Werte liegen als Tokens in `app/globals.css`. Farben, Schriften und die
Bewegungskurve entstehen in `@theme` und sind dadurch gleichzeitig als
Tailwind-Utilities verfügbar (`text-nh-ink`, `border-nh-line`, `font-display`).

| Rolle | Token |
| --- | --- |
| Flächen | `--color-nh-white`, `--color-nh-canvas`, `--color-nh-panel` |
| Text | `--color-nh-ink`, `--color-nh-body`, `--color-nh-mute` |
| Akzent | `--color-nh-blue` `#1a5cff`, `--color-nh-cyan` `#00c2e0` |
| Glas | `--glass-bg`, `--glass-border`, `--glass-blur`, `--glass-shadow` |
| Licht | `--glow-soft`, `--glow-strong`, `--gradient-accent` |
| Bewegung | `--ease-nh`, `--dur-hover`, `--dur-slow` |

Typografie: **Sora** für Headlines (800), **Inter** für Fließtext,
**JetBrains Mono** für Labels, Kennzahlen, Terminal und Code. Der Kontrast
zwischen sehr fetter Display-Schrift und kleinen Mono-Labels trägt den
technischen Charakter.

Wiederverwendbare Klassen: `.glass`, `.glass-edge` (Lichtkante am Rahmen),
`.glow-hover`, `.pointer-glow`, `.sheen`, `.tilt`, `.terminal`, `.meter`,
`.tech-grid`, `.eyebrow`, `.btn` / `.btn-ghost`.

> **Cascade Layers:** Die Komponenten-Klassen stehen bewusst in
> `@layer components`. Ungeschichtetes CSS würde jede Tailwind-Utility am selben
> Element schlagen — `.glass` hätte dann z. B. ein `absolute` überschrieben.
> Innerhalb des Layers gilt die erwartete Reihenfolge: Utility schlägt
> Komponente. Nur die `prefers-reduced-motion`- und Fokus-Regeln stehen
> außerhalb, damit sie alles überstimmen.

---

## Animationen

Alles läuft über `transform`, `opacity` und `filter` — also GPU-beschleunigt und
ohne Layout-Neuberechnung. Wo JavaScript beteiligt ist, schreibt es
ausschließlich CSS-Variablen, höchstens einmal pro Frame:

| Effekt | Umsetzung |
| --- | --- |
| Scroll-Reveal (nach oben, aus dem Blur) | `.reveal` / `.stagger` + `ScrollReveal.tsx` |
| Maus-Glow im Hero | `HeroBackdrop.tsx` → `--gx` / `--gy` |
| Parallax (Raster, Lichtflächen) | `HeroBackdrop.tsx`, gestaffelte Amplituden |
| Perspektivische Karten | `use-tilt.ts` → `--rx` / `--ry` / `--lift` |
| Licht folgt dem Zeiger auf Karten | `use-pointer-glow.ts` → `--mx` / `--my` |
| Hochzählende Zahlen | `use-count-up.ts`, Start via `use-in-view.ts` |
| Terminal mit Typing-Effekt | `use-terminal.ts`, Timeout-Kette |
| Netzwerklinien und Lichtpakete | `NetworkMap.tsx` + `offset-path` |
| Lichtreflexion über Glas | `.sheen` |
| Partikel, Floating, Laufband | `.particle`, `.float`, `.marquee` |
| Header: Glas, Höhe, Lesefortschritt | `Navbar.tsx` → `data-scrolled`, `--progress` |

Dauerbewegungen starten erst, wenn ihr Element sichtbar ist — ein Terminal, das
im Verborgenen durchläuft, hätte niemand gesehen.

---

## Barrierefreiheit

- `prefers-reduced-motion: reduce` schaltet **alle** Bewegungen ab: Reveals,
  Parallax, Partikel, Laufband, Tilt und Maus-Glow. Zahlen stehen sofort auf
  ihrem Endwert, das Terminal zeigt die vollständige Ausgabe. Farb- und
  Rahmenwechsel beim Hover bleiben als Rückmeldung erhalten.
- Animierte Zahlen sind `aria-hidden`; der Endwert steht einmal für
  Screenreader daneben. Ebenso beim Terminal: die getippte Ausgabe ist
  ausgeblendet, der vollständige Text liegt als zusammenhängender Absatz vor.
- Statuspunkte sind dekorativ — die Aussage steht immer als Text daneben.
- Sichtbarer Fokusring auf allen interaktiven Elementen, Skip-Link zum Inhalt,
  semantische Landmarks (`header`, `main`, `nav`, `footer`), `aria-expanded`
  und `aria-controls` am mobilen Menü, Schließen per Escape.
- Die Netzwerkkarte ist rein visuell; dieselben Standorte stehen daneben als
  Liste mit Latenzangabe.

Responsive ab ~320px: Breakpoints bei 1080 / 1000 / 980 / 900 / 760 / 620 / 560 /
520 / 420 px. Unter 760px werden Bewegungsdauern und Blur-Radien reduziert.

---

## Kontaktformular

```
ContactForm (Client)
  └─ POST /api/contact          Rate-Limit → Validierung → Honeypot
       └─ lib/email/send.ts     Resend
            ├─ Anfrage an Nova Host   (replyTo = Absender)
            └─ Bestätigung an den Absender
```

Der Browser spricht nie direkt mit Resend; `RESEND_API_KEY` wird ausschließlich
serverseitig gelesen und taucht in keiner Antwort auf. Geprüft wird auf beiden
Seiten mit denselben Regeln aus `lib/validation.ts`. Jeder Nutzertext läuft vor
dem Einsetzen in die HTML-Mail durch `escapeHtml()`.

Scheitert nur die Bestätigungsmail, meldet die Route `partial` — der Absender
erfährt, dass seine Anfrage angekommen ist, die Bestätigung aber nicht zugestellt
werden konnte.

### Umgebungsvariablen

`.env.example` nach `.env.local` kopieren:

| Variable | Pflicht | Bedeutung |
| --- | --- | --- |
| `RESEND_API_KEY` | ja | Key aus dem Resend-Dashboard |
| `CONTACT_EMAIL_TO` | nein | Empfänger der Anfragen (Standard: `hello@novahost.dev`) |
| `NEXT_PUBLIC_SITE_URL` | nein | Basis-URL für Metadata und Open Graph |

Die Absenderdomain muss in Resend verifiziert sein, sonst lehnt die API den
Versand ab.

---

## Tests

`npm test` deckt die serverseitigen Pfade ab — Formularvalidierung,
Payload-Parsing, Rate-Limit, beide E-Mail-Vorlagen inklusive Escaping und
Header-Injection sowie die Route selbst. Der Versand wird dabei über einen
`fetch`-Stub abgefangen: es geht zu keinem Zeitpunkt eine Anfrage ins Netz.

---

## Vor dem Livegang

- **Impressum und Datenschutz** in `lib/content.ts` enthalten Platzhalter.
  Anschrift, Vertretungsberechtigte, Registerdaten und Umsatzsteuer-ID müssen
  durch die echten Angaben ersetzt werden.
- Kennzahlen, Preise und Standorte sind redaktionelle Beispielwerte.
- Social-Links im Footer zeigen auf die Startseiten der Netzwerke und brauchen
  die echten Profil-URLs.
