# Nova Host

Website einer Agentur für Webdesign und Website-Betreuung. Kantige Flächen,
ein Akzentblau und viel Weißraum — in hellem und dunklem Modus, mit einer
durchgehenden Werkzeug-Ästhetik aus Monospace, Terminals und Code-Fenstern.

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

## Das Angebot

Die Seite bildet ein zweistufiges Modell ab, und der Aufbau folgt dieser Logik:

1. **Website-Paket** — einmaliger Kauf (Start · Business · Individuell).
2. **Betreuungs-Abo** — ab dem Launch verpflichtend, ab 49,99 €/Monat
   (Basis · Plus · Pro · Individuell).

Jedes Abo enthält ein **festes Änderungskontingent** (30 Min · 2 h · 5 h pro
Monat). Darüber hinaus wird **je angefangene halbe Stunde** abgerechnet
(39 € · 35 € · 29 €). Nicht genutzte Zeit verfällt am Monatsende.

Diese Grenze ist der Kern des Modells und deshalb auf den Karten prominent
sichtbar — nicht im Kleingedruckten. Alles davon steht in `lib/content.ts`
(`websitePackages`, `carePlans`) und lässt sich dort ändern, ohne eine
Komponente anzufassen.

> **Preise vor dem Livegang bestätigen.** Vorgegeben war nur, dass die
> Betreuung bei 49,99 € beginnt. Die Beträge der Website-Pakete, die höheren
> Abostufen und die Stundensätze sind begründete Vorschläge und stehen als
> solche in `lib/content.ts` markiert.

---

## Aufbau

```
app/
  layout.tsx            Fonts, Metadata, Theme-Init-Skript, Navbar/Footer
  page.tsx              One-Pager + JSON-LD (beide Teile des Angebots)
  globals.css           Design-Tokens (hell/dunkel), Komponenten, Keyframes
  not-found.tsx         404 als Terminal-Ausgabe
  impressum/            Rechtsseiten (Inhalt aus lib/content.ts)
  datenschutz/
  api/contact/route.ts  Route Handler des Kontaktformulars
  icon.svg              Favicon

components/
  ui/                   Primitive: Container, Section, Eyebrow, SectionHead,
                        LogoMark, LogoLink, Icon, StatusDot, MonoTag
  sections/             Hero, Services, Process, Performance, Pricing,
                        Craft, Care, About, Contact
  Navbar · Footer · ScrollReveal · HeroBackdrop · HeroDashboard
  TiltCard · Counter · Terminal · CodeSnippet · Particles
  ThemeToggle · CookieConsent · ConsentSettingsButton
  ContactForm · LegalPage · CurrentYear

lib/
  content.ts            Sämtliche redaktionellen Inhalte
  theme.ts              Heller/dunkler Modus, Init-Skript
  consent.ts            Einwilligung: Zustand, Speicherung, Events
  utils.ts              cn(), escapeHtml(), formatPrice()
  validation.ts         Formularregeln — Client und Server teilen sie sich
  contact.ts            Übergabe des Formulars an /api/contact
  rate-limit.ts         Spam-Bremse pro IP
  email/                Resend-Anbindung: config, send, templates
  use-in-view · use-count-up · use-terminal · use-tilt
  use-pointer-glow · use-motion-preference

types/index.ts          Zentrale Typen
tests/                  node:test — Validierung, Rate-Limit, E-Mails,
                        API-Route, Einwilligung, Theme
```

**Inhalt und Darstellung sind getrennt.** Texte, Preise, Ablaufschritte und
Terminal-Skripte stehen ausschließlich in `lib/content.ts`; die Komponenten
lesen sie nur. Ein weiterer Tarif oder ein zusätzlicher Ablaufschritt ist eine
Ergänzung in dieser Datei.

---

## Designsystem

Alle Werte liegen als Tokens in `app/globals.css`. Farben, Schriften und die
Bewegungskurve entstehen in `@theme` und sind dadurch gleichzeitig als
Tailwind-Utilities verfügbar (`text-nh-ink`, `border-nh-line`, `font-display`).

Die Farbtokens sind **nach ihrer Rolle benannt, nicht nach ihrer Farbe** — im
dunklen Modus bekommen dieselben Namen andere Werte:

| Rolle | Token | hell | dunkel |
| --- | --- | --- | --- |
| Seitengrund | `--color-nh-bg` | `#ffffff` | `#070b14` |
| Karten, Felder | `--color-nh-surface` | `#ffffff` | `#16223a` |
| Überschriften | `--color-nh-ink` | `#08111f` | `#f1f5ff` |
| Fließtext | `--color-nh-body` | `#46557a` | `#b3c1dc` |
| Akzent | `--color-nh-blue` | `#1a5cff` | `#5b8cff` |
| Akzent 2 | `--color-nh-cyan` | `#00c2e0` | `#2fd8f0` |
| Linien | `--color-nh-line` | blau, 10 % | hell, 14 % |

Blau und Cyan sind im dunklen Modus heller: ein Blau, das auf Weiß gut sitzt,
verschwindet auf dunklem Grund fast.

Typografie: **Sora** für Headlines (800), **Inter** für Fließtext,
**JetBrains Mono** für Labels, Kennzahlen, Terminal und Code.

Die Formsprache ist bewusst die eines Entwicklerwerkzeugs, nicht die einer
Consumer-App:

- **Kantige Radien** über drei Stufen (`--radius-chip` 6px, `--radius-card`
  8px, `--radius-panel` 10px) statt weicher 22px-Ecken.
- **`.panel`** ist die Grundfläche der meisten Karten: deckend, eine haarfeine
  Linie, kaum Schatten. `.glass` bleibt denen vorbehalten, die wirklich über
  dem Inhalt schweben — Hero-Karte, Kopfzeile, Einwilligungsbanner.
- **Eyebrows sind Code-Kommentare** (`// Leistungen`) statt Label mit
  Verlaufsstrich.
- **Buttons** sind rechteckig und in Monospace beschriftet.
- **Ein Akzent statt Verlauf**: hervorgehobene Wörter in Headlines stehen in
  einer Farbe. Ein Blau-Cyan-Verlauf quer durch die Überschrift liest sich als
  Marketing-Seite.
- **Fadenkreuz-Raster** im Hintergrund, angelehnt an eine
  Konstruktionszeichnung.
- **Zeilennummern** im Code-Fenster, `data-caret` setzt einen blinkenden
  Blockcursor hinter eine Headline.

Wiederverwendbare Klassen: `.panel`, `.panel-head`, `.glass`, `.glass-edge`,
`.glow-hover`, `.pointer-glow`, `.sheen`, `.tilt`, `.terminal`, `.meter`,
`.process-line`, `.tech-grid`, `.eyebrow`, `.btn` / `.btn-ghost`.

> **Cascade Layers:** Die Komponenten-Klassen stehen bewusst in
> `@layer components`. Ungeschichtetes CSS würde jede Tailwind-Utility am selben
> Element schlagen — `.glass` hätte dann z. B. ein `absolute` überschrieben.
> Innerhalb des Layers gilt die erwartete Reihenfolge: Utility schlägt
> Komponente. Nur die `prefers-reduced-motion`- und Fokus-Regeln stehen
> außerhalb, damit sie alles überstimmen.

### Heller und dunkler Modus

Ein Knopf in der Navigation, der zwischen hell und dunkel umschaltet.
Voreinstellung ist „System".

- Der Knopf richtet sich nach dem **dargestellten** Modus, nicht nach der
  gespeicherten Wahl. Ein reiner Dreier-Zyklus (hell → dunkel → System)
  enthält immer einen unsichtbaren Schritt: steht das System auf dunkel, sehen
  „dunkel" und „System" identisch aus — der Klick wirkt wirkungslos und man
  muss zweimal drücken. So kippt jeder Klick sichtbar die Ansicht.
- „System" bleibt trotzdem erreichbar: fällt das Ziel mit der
  Systemeinstellung zusammen, wird wieder `system` gespeichert. Ein kleiner
  Punkt am Knopf zeigt, dass die Seite gerade dem System folgt.
- Gespeichert wird die **Wahl**, nicht das Ergebnis. Wer „System" stehen lässt,
  bekommt morgens hell und abends dunkel.
- Bei „System" wird `data-theme` **entfernt** statt gesetzt — dann greift die
  `prefers-color-scheme`-Regel, auch bei einem Wechsel während des Besuchs.
- Ein winziges Inline-Skript im `<head>` (`THEME_INIT_SCRIPT`) setzt das
  Attribut **vor dem ersten Bild**. Ohne diesen Schritt blitzt bei jedem Aufruf
  kurz die helle Seite auf — genau der Effekt, den ein Dunkelmodus verhindern
  soll.
- Während des Wechsels laufen Farben kurz weich ineinander; die Regel hängt an
  einem Attribut, das nach 340 ms wieder verschwindet, damit nicht jede
  Hover-Transition dauerhaft mitgefärbt wird.

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
| Zeitleiste im Ablauf | `.process-line`, wächst mit dem Reveal |
| Lichtreflexion über Glas | `.sheen` |
| Partikel, Floating, Laufband | `.particle`, `.float`, `.marquee` |
| Header: Glas, Höhe, Lesefortschritt | `Navbar.tsx` → `data-scrolled`, `--progress` |

Dauerbewegungen starten erst, wenn ihr Element sichtbar ist — ein Terminal, das
im Verborgenen durchläuft, hätte niemand gesehen.

---

## Barrierefreiheit

- `prefers-reduced-motion: reduce` schaltet **alle** Bewegungen ab: Reveals,
  Parallax, Partikel, Laufband, Tilt, Maus-Glow und den Farbübergang beim
  Moduswechsel. Zahlen stehen sofort auf ihrem Endwert, das Terminal zeigt die
  vollständige Ausgabe, die Zeitleiste ist durchgezogen. Farb- und
  Rahmenwechsel beim Hover bleiben als Rückmeldung erhalten.
- Animierte Zahlen sind `aria-hidden`; der Endwert steht einmal für
  Screenreader daneben. Ebenso beim Terminal: die getippte Ausgabe ist
  ausgeblendet, der vollständige Text liegt als zusammenhängender Absatz vor.
- Statuspunkte sind dekorativ — die Aussage steht immer als Text daneben.
- Sichtbarer Fokusring, Skip-Link zum Inhalt, semantische Landmarks
  (`header`, `main`, `nav`, `footer`), `aria-expanded`/`aria-controls` am
  mobilen Menü, Schließen per Escape.
- Der Einwilligungsdialog ist modal mit Fokus-Falle und Fokus-Rückgabe; die
  Kategorie-Schalter sind echte Checkboxen, nur anders gezeichnet.

Responsive ab ~320px. Unter 760px werden Bewegungsdauern und Blur-Radien
reduziert.

---

## Einwilligung (Cookie-Abfrage)

Umgesetzt nach § 25 TDDDG und Art. 6 Abs. 1 lit. a DSGVO:

- Voreinstellung ist Ablehnung; kein Schalter steht vorausgewählt auf an.
- Zustimmen und Ablehnen sind gleich große, gleich prominente Schaltflächen.
- Escape und ein Klick neben den Dialog speichern nichts — wer noch nicht
  entschieden hat, landet wieder beim Banner.
- Eine fehlende, unlesbare oder veraltete Entscheidung gilt als „noch nicht
  gefragt“, nie als Zustimmung.
- Widerruf über „Cookie-Einstellungen“ im Footer jeder Seite.

Gespeichert wird im `localStorage` (`nova-host-consent`), nicht in einem
Cookie — vor der Einwilligung entsteht damit gar kein Cookie. Erhöht sich
`CONSENT_VERSION`, verlieren alte Entscheidungen ihre Gültigkeit und die
Abfrage erscheint erneut.

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
erfährt, dass seine Anfrage angekommen ist, die Bestätigung aber nicht
zugestellt werden konnte.

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

`npm test` deckt die Logik ab, die ohne Browser prüfbar ist:
Formularvalidierung, Payload-Parsing, Rate-Limit, beide E-Mail-Vorlagen
inklusive Escaping und Header-Injection, die API-Route, die Einwilligung und
den Moduswechsel. Der Versand wird über einen `fetch`-Stub abgefangen: es geht
zu keinem Zeitpunkt eine Anfrage ins Netz.

---

## Vor dem Livegang

- **Preise bestätigen** (siehe oben) — `websitePackages` und `carePlans` in
  `lib/content.ts`.
- **Impressum und Datenschutz** enthalten Platzhalter. Anschrift,
  Vertretungsberechtigte, Registerdaten und Umsatzsteuer-ID müssen durch die
  echten Angaben ersetzt werden.
- **AGB / Vertragsbedingungen**: Mindestlaufzeit, Kündigungsfrist und die
  Abrechnung je angefangener halber Stunde stehen auf der Seite und gehören
  vertraglich sauber hinterlegt.
- Kennzahlen (Lighthouse, Ladezeit, Anzahl betreuter Websites) sind
  Beispielwerte und sollten den tatsächlichen entsprechen.
- Social-Links im Footer zeigen auf die Startseiten der Netzwerke und brauchen
  die echten Profil-URLs.
