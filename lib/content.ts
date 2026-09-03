import type {
  CareItem,
  CarePlan,
  ConsentCategoryInfo,
  FooterColumn,
  LegalLink,
  LegalPageContent,
  MetricItem,
  NavLink,
  ProcessStep,
  ServiceItem,
  TerminalLine,
  WebsitePackage,
} from "@/types";

/**
 * Alle redaktionellen Inhalte der Website an einer Stelle.
 * Aenderungen am Text passieren nur hier — die Komponenten bleiben unberuehrt.
 *
 * ACHTUNG PREISE: Die Betraege in `websitePackages` und in den Abos oberhalb
 * von 49,99 € sind Vorschlaege und muessen vor dem Livegang bestaetigt werden.
 * Fest vorgegeben war nur, dass die Betreuung bei 49,99 € beginnt und nach
 * oben geht.
 */

export const siteMeta = {
  name: "Nova Host",
  title: "Nova Host — Websites, die gebaut und betreut werden.",
  description:
    "Nova Host gestaltet, baut und betreut Websites. Einmalig das Website-Paket, danach ein festes Betreuungs-Abo ab 49,99 € im Monat — mit klarem Änderungskontingent statt endloser Nachforderungen.",
  /** Erscheint als Mono-Zeile unter dem Logo im Footer. */
  claim: "Websites, die gebaut und betreut werden.",
  email: "hello@novahost.dev",
  phone: "+49 30 5555 0170",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", hash: "#hero" },
  { label: "Leistungen", hash: "#services" },
  { label: "Ablauf", hash: "#process" },
  { label: "Preise", hash: "#pricing" },
  { label: "Über uns", hash: "#about" },
  { label: "Kontakt", hash: "#contact" },
];

/* ----------------------------------- Hero -------------------------------- */

export const hero = {
  eyebrow: "Webdesign · Umsetzung · Betreuung",
  headlineTop: "Eure Website,",
  headlineAccent: "gebaut und betreut.",
  text: "Nova Host gestaltet und baut eure Website — und kümmert sich danach weiter darum. Einmalig das Website-Paket, ab dem Launch ein festes Betreuungs-Abo mit klarem Änderungskontingent. Keine Baukästen, keine Überraschungen auf der Rechnung.",
  primaryCta: { label: "Preise ansehen", hash: "#pricing" },
  secondaryCta: { label: "Kontakt aufnehmen", hash: "#contact" },
} as const;

/**
 * Die Kennzahlen im Hero-Dashboard.
 *
 * `fill` steuert den kleinen Balken unter dem Wert (0–1) und ist rein
 * visuell — er zeigt den Wert relativ zu seinem Bestwert.
 */
export const dashboardStats = [
  { label: "Lighthouse", value: "98", unit: "/100", fill: 0.98 },
  { label: "Ladezeit", value: "1,2", unit: "s", fill: 0.88 },
  { label: "Änderungen", value: "3", unit: "/8", fill: 0.38 },
  { label: "Reaktion", value: "4", unit: "h", fill: 0.8 },
] as const;

/**
 * Zeilen der Projektliste im Hero-Dashboard.
 *
 * Bewusst ohne erfundene Kundennamen oder Domains — das waeren Referenzen,
 * die es nicht gibt. Stattdessen neutrale Projektbezeichnungen.
 */
export const dashboardProjects = [
  { name: "Handwerksbetrieb", stage: "live", done: true },
  { name: "Arztpraxis", stage: "live", done: true },
  { name: "Restaurant", stage: "im Design", done: false },
  { name: "Onlineshop", stage: "Relaunch", done: false },
] as const;

/** Das kurze Terminal im Hero. */
export const heroTerminal: TerminalLine[] = [
  { kind: "prompt", text: "nova status --kunde" },
  { kind: "log", text: "> website: live seit 148 tagen" },
  { kind: "log", text: "> abo: plus · 2h pro monat" },
  { kind: "log", text: "> verbraucht: 45min" },
];

/** Die drei Fakten unter den Hero-Buttons. */
export const heroTrust: string[] = [
  "Erstgespräch kostenlos",
  "Festpreis nach Konzept",
  "Betreuung ab 49,99 €/Monat",
];

/** Laufband unter dem Hero — woraus die Websites gebaut sind. */
export const marqueeItems: string[] = [
  "Responsive Design",
  "Core Web Vitals",
  "Barrierefreiheit",
  "SEO-Grundlagen",
  "DSGVO-konform",
  "Handgeschriebener Code",
  "CMS-Anbindung",
  "Figma-Entwürfe",
  "Kein Baukasten",
  "Fester Ansprechpartner",
  "Monatliche Updates",
  "Ladezeit unter 1,5s",
];

/* ------------------------------ Abschnittskoepfe -------------------------- */

/**
 * Eyebrow, Headline und Einleitung der Abschnitte.
 *
 * Standen vorher direkt in den Komponenten — dadurch ist beim Wechsel des
 * Angebots zweimal alter Hosting-Text stehen geblieben. Jetzt liegt auch
 * dieser Text an derselben Stelle wie alles andere.
 */
export const sectionHeads = {
  services: {
    eyebrow: "Leistungen",
    title: "Von der ersten Skizze bis zur laufenden Seite.",
    accent: "bis zur laufenden Seite",
    text: "Design, Umsetzung und Betreuung aus einer Hand — kein Weiterreichen zwischen Agentur, Freelancer und Hoster.",
  },
  process: {
    eyebrow: "Ablauf",
    title: "Von der ersten Frage bis zum Launch.",
    accent: "bis zum Launch",
    text: "Fünf Schritte, ein fester Ansprechpartner und ein Preis, der nach dem Erstgespräch steht. Ihr wisst jederzeit, woran wir gerade arbeiten.",
  },
  performance: {
    eyebrow: "Kennzahlen",
    title: "Woran ihr uns messen könnt.",
    accent: "messen",
    text: "Werte aus den Seiten, die wir gebaut haben und betreuen. Gemessen wird beim Launch und danach im laufenden Betrieb.",
  },
  care: {
    eyebrow: "Im Abo enthalten",
    title: "Was wir übernehmen, damit ihr es nicht müsst.",
    accent: "damit ihr es nicht müsst",
    text: "Eine Website ist mit dem Launch nicht fertig. Das Betreuungs-Abo hält sie aktuell, sicher und erreichbar — in jedem Tarif, vom kleinsten aufwärts.",
  },
} as const;

/* --------------------------------- Services ------------------------------ */

export const services: ServiceItem[] = [
  {
    num: "01",
    file: "webdesign.tsx",
    icon: "design",
    title: "Webdesign",
    text: "Entwurf in Figma, zugeschnitten auf eure Marke und eure Kundschaft. Ihr seht das Design, bevor eine Zeile Code entsteht.",
    specs: ["Figma", "2 Entwürfe", "Feedback-Runden", "Mobile first"],
    meta: "Teil des Website-Pakets",
  },
  {
    num: "02",
    file: "umsetzung.tsx",
    icon: "code",
    title: "Umsetzung",
    text: "Handgeschriebener Code statt Baukasten. Schnell, sauber strukturiert und auf jedem Gerät gleich gut zu bedienen.",
    specs: ["Responsive", "Schnell", "Barrierearm", "Sauberes HTML"],
    meta: "Teil des Website-Pakets",
  },
  {
    num: "03",
    file: "relaunch.tsx",
    icon: "relaunch",
    title: "Relaunch",
    text: "Bestehende Seite neu aufgebaut — Inhalte übernommen, Struktur aufgeräumt, Ladezeit und Auffindbarkeit deutlich verbessert.",
    specs: ["Inhaltsübernahme", "Weiterleitungen", "Struktur", "Tempo"],
    meta: "eigenes Paket",
  },
  {
    num: "04",
    file: "betreuung.ts",
    icon: "care",
    title: "Betreuung",
    text: "Nach dem Launch übernehmen wir: Änderungen, Updates, Backups und ein fester Ansprechpartner. Das ist das monatliche Abo.",
    specs: ["Änderungen", "Updates", "Backups", "Ansprechpartner"],
    meta: "ab 49,99 €/Monat",
  },
  {
    num: "05",
    file: "seo.ts",
    icon: "seo",
    title: "SEO & Tempo",
    text: "Damit Menschen euch finden und nicht vorher abspringen: saubere Struktur, sinnvolle Texte, kurze Ladezeiten.",
    specs: ["Core Web Vitals", "Metadaten", "Struktur", "Messbar"],
    meta: "im Abo enthalten",
  },
  {
    num: "06",
    file: "inhalte.md",
    icon: "content",
    title: "Inhalte",
    text: "Texte, Bilder und Struktur. Wir sortieren, was ihr habt, und formulieren um, wo es hakt — ihr müsst nicht texten können.",
    specs: ["Texte", "Bildauswahl", "Struktur", "Korrektur"],
    meta: "optional buchbar",
  },
];

/* ---------------------------------- Ablauf ------------------------------- */

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Erstgespräch",
    text: "Was macht ihr, wer soll euch finden, was stört euch an der jetzigen Lösung. Danach wisst ihr, was es kostet — verbindlich.",
    duration: "30–60 Minuten",
  },
  {
    num: "02",
    title: "Konzept & Design",
    text: "Wir bauen die Struktur und entwerfen die Seite in Figma. Ihr seht zwei Entwürfe und entscheidet, in welche Richtung es geht.",
    duration: "1–2 Wochen",
  },
  {
    num: "03",
    title: "Umsetzung",
    text: "Das Design wird zur echten Website — handgeschrieben, schnell und auf jedem Gerät geprüft. Inhalte pflegen wir mit ein.",
    duration: "2–4 Wochen",
  },
  {
    num: "04",
    title: "Launch",
    text: "Wir gehen gemeinsam durch, richten Domain und Weiterleitungen ein und schalten live. Ihr bekommt eine kurze Einweisung.",
    duration: "1 Tag",
  },
  {
    num: "05",
    title: "Betreuung",
    text: "Ab hier läuft das Abo: Änderungen, Updates, Backups und ein Ansprechpartner, der euer Projekt kennt.",
    duration: "monatlich",
  },
];

/** Kurze Fakten neben dem Ablauf. */
export const processFacts = [
  { label: "Bis zum Launch", value: "4–6 Wochen", hint: "im Regelfall" },
  { label: "Ansprechpartner", value: "Immer derselbe", hint: "kein Ticketsystem" },
  { label: "Entwürfe", value: "2 Richtungen", hint: "inklusive Korrekturen" },
  { label: "Danach", value: "Abo ab 49,99 €", hint: "Teil des Pakets" },
] as const;

/** Das Code-Snippet neben dem Ablauf. */
export const processSnippet = `const projekt = {
  design: "Figma",
  umsetzung: "handgeschrieben",
  launch: "4-6 Wochen",
  danach: "Betreuung im Abo"
};`;

/* -------------------------------- Kennzahlen ----------------------------- */

export const metrics: MetricItem[] = [
  {
    value: 98,
    suffix: "/100",
    label: "Lighthouse",
    hint: "Durchschnitt unserer Seiten beim Launch",
  },
  {
    value: 1.2,
    decimals: 1,
    suffix: "s",
    label: "Ladezeit",
    hint: "bis die Seite bedienbar ist",
  },
  {
    value: 40,
    suffix: "+",
    label: "Websites",
    hint: "gebaut und laufend betreut",
  },
  {
    value: 24,
    suffix: "h",
    label: "Reaktionszeit",
    hint: "im Schnitt, werktags deutlich schneller",
  },
];

/* ---------------------------------- Preise ------------------------------- */

export const pricing = {
  eyebrow: "Preise",
  title: "Erst die Website, dann die Betreuung.",
  accent: "dann die Betreuung",
  text: "Beides gehört zusammen: Ihr kauft einmalig euer Website-Paket und schließt dazu ein Betreuungs-Abo ab. Das Abo ist fester Bestandteil des Pakets — dafür bleibt eure Seite aktuell, sicher und in Betrieb.",
  stepOne: {
    label: "Schritt 1",
    title: "Website-Paket",
    note: "einmalig",
    text: "Design, Umsetzung und Launch. Der Preis steht nach dem Erstgespräch fest.",
  },
  stepTwo: {
    label: "Schritt 2",
    title: "Betreuung",
    note: "monatlich, ab Launch",
    text: "Verpflichtend ab dem Launch. Jedes Abo enthält ein festes Änderungskontingent.",
  },
  /** Erklaert die Kontingent-Logik unter den Abos. */
  overageTitle: "Und wenn das Kontingent aufgebraucht ist?",
  overageText:
    "Dann wird nichts abgelehnt und nichts heimlich berechnet. Wir melden uns mit einer Schätzung, bevor wir weiterarbeiten, und rechnen darüber hinaus je angefangene halbe Stunde ab. Nicht genutzte Zeit verfällt am Monatsende und wird nicht übertragen.",
  footnote:
    "Alle Preise zzgl. USt. · Mindestlaufzeit des Abos 12 Monate, danach monatlich kündbar · Änderungskontingent gilt pro Kalendermonat",
} as const;

/**
 * Die Website-Pakete — der einmalige Kauf am Anfang.
 * Die Betraege sind Vorschlaege und noch zu bestaetigen.
 */
export const websitePackages: WebsitePackage[] = [
  {
    slug: "start",
    name: "Start",
    tagline: "Eine Seite, die alles Wichtige sagt.",
    price: 1490,
    note: "einmalig",
    features: [
      "Onepager mit bis zu 6 Abschnitten",
      "Design in Figma, 2 Entwürfe",
      "Kontaktformular",
      "Für Handy, Tablet und Desktop",
      "Einrichtung und Launch",
    ],
    cta: "Start anfragen",
  },
  {
    slug: "business",
    name: "Business",
    tagline: "Mehrere Seiten, selbst pflegbar.",
    price: 2990,
    note: "einmalig",
    features: [
      "Bis zu 8 Unterseiten",
      "Design in Figma, 2 Entwürfe",
      "Redaktionssystem für eigene Änderungen",
      "Blog oder Neuigkeiten",
      "SEO-Grundeinrichtung",
      "Einweisung für euer Team",
    ],
    cta: "Business anfragen",
    featured: true,
  },
  {
    slug: "individuell",
    name: "Individuell",
    tagline: "Shop, Buchung oder etwas ganz Eigenes.",
    price: null,
    note: "nach Aufwand",
    features: [
      "Beliebig viele Seiten",
      "Onlineshop oder Buchungsstrecke",
      "Anbindung eurer bestehenden Systeme",
      "Mehrsprachigkeit",
      "Festpreis nach Konzeptphase",
    ],
    cta: "Angebot anfragen",
  },
];

/**
 * Die Betreuungs-Abos.
 *
 * `included` ist die Grenze, die verhindert, dass Aenderungswuensche
 * unbegrenzt und kostenfrei laufen. Alles darueber wird nach `overageRate`
 * je angefangene halbe Stunde abgerechnet.
 */
export const carePlans: CarePlan[] = [
  {
    slug: "basis",
    name: "Basis",
    tagline: "Für Seiten, an denen selten etwas geändert wird.",
    price: 49.99,
    included: "30 Minuten Änderungen pro Monat",
    response: "Antwort innerhalb von 48 Stunden",
    overageRate: 39,
    features: [
      "Updates und Sicherheitsprüfung",
      "Wöchentliches Backup",
      "SSL-Überwachung",
      "Erreichbarkeits-Monitoring",
    ],
    cta: "Basis wählen",
  },
  {
    slug: "plus",
    name: "Plus",
    tagline: "Für Seiten, an denen regelmäßig etwas passiert.",
    price: 99.99,
    included: "2 Stunden Änderungen pro Monat",
    response: "Antwort innerhalb von 24 Stunden",
    overageRate: 35,
    features: [
      "Alles aus Basis",
      "Tägliches Backup",
      "Inhaltspflege durch uns",
      "Quartalsbericht zu Tempo und Sichtbarkeit",
    ],
    cta: "Plus wählen",
    featured: true,
  },
  {
    slug: "pro",
    name: "Pro",
    tagline: "Für Seiten, die zum Tagesgeschäft gehören.",
    price: 199.99,
    included: "5 Stunden Änderungen pro Monat",
    response: "Antwort innerhalb von 8 Stunden",
    overageRate: 29,
    features: [
      "Alles aus Plus",
      "Neue Unterseiten im Kontingent",
      "Monatlicher Bericht und Abstimmung",
      "Vorrang bei Terminen",
    ],
    cta: "Pro wählen",
  },
  {
    slug: "individuell",
    name: "Individuell",
    tagline: "Eigener Umfang, eigene Absprachen.",
    price: null,
    included: "Kontingent nach Absprache",
    response: "Reaktionszeit nach Vereinbarung",
    overageRate: null,
    features: [
      "Alles aus Pro",
      "Feste Stundenkontingente",
      "Mehrere Websites in einem Vertrag",
      "Individuelle Vereinbarung",
    ],
    cta: "Angebot anfragen",
  },
];

/* -------------------------------- Handarbeit ----------------------------- */

/** Das grosse Terminal in der Handarbeits-Section. */
export const buildTerminal: TerminalLine[] = [
  { kind: "prompt", text: "nova build kundenprojekt" },
  { kind: "blank", text: "" },
  { kind: "log", text: "Prüfe Seiten ..." },
  { kind: "success", text: "Bilder optimiert" },
  { kind: "success", text: "Für Handy und Desktop geprüft" },
  { kind: "success", text: "Lighthouse 98 / 100" },
  { kind: "success", text: "Website veröffentlicht" },
  { kind: "blank", text: "" },
  { kind: "log", text: "Fertig in 12.4s" },
];

export const craftFeatures = [
  {
    title: "Kein Baukasten",
    text: "Wir schreiben den Code selbst. Dadurch lädt die Seite schneller und sieht nicht aus wie tausend andere.",
    code: "handgeschrieben",
  },
  {
    title: "Auf jedem Gerät geprüft",
    text: "Jede Seite wird auf Handy, Tablet und Desktop durchgesehen — nicht nur im Browserfenster am Schreibtisch.",
    code: "320px – 2560px",
  },
  {
    title: "Ihr bekommt alles",
    text: "Code, Design-Dateien und Zugänge gehören euch. Kein Anbieter, aus dem ihr nicht wieder herauskommt.",
    code: "keine Bindung",
  },
];

/* -------------------------------- Betreuung ------------------------------ */

export const careItems: CareItem[] = [
  {
    icon: "update",
    title: "Updates",
    text: "Wir halten die technische Grundlage eurer Website aktuell und prüfen nach jedem Update, ob alles läuft.",
    status: "turnus: monatlich",
  },
  {
    icon: "backup",
    title: "Backups",
    text: "Regelmäßige Sicherungen, getrennt von der laufenden Seite gespeichert. Im Ernstfall ist die Seite schnell wieder da.",
    status: "aufbewahrung: 30 tage",
  },
  {
    icon: "lock",
    title: "SSL & Sicherheit",
    text: "Wir behalten Zertifikate und bekannte Schwachstellen im Blick und melden uns, bevor etwas ausläuft.",
    status: "prüfung: laufend",
  },
  {
    icon: "monitor",
    title: "Erreichbarkeit",
    text: "Eure Seite wird regelmäßig geprüft. Fällt sie aus, erfahren wir es — und ihr hört es von uns, nicht von euren Kunden.",
    status: "intervall: 5 min",
  },
  {
    icon: "compliance",
    title: "DSGVO",
    text: "Impressum, Datenschutz und Einwilligung bleiben auf Stand. Bei Gesetzesänderungen melden wir uns von selbst.",
    status: "prüfung: jährlich",
  },
  {
    icon: "support",
    title: "Ansprechpartner",
    text: "Dieselbe Person, die eure Seite gebaut hat, kümmert sich auch danach. Kein Ticketsystem, keine Warteschleife.",
    status: "kanal: mail & telefon",
  },
];

/* ----------------------------------- About ------------------------------- */

export const about = {
  eyebrow: "Über uns",
  title: "Klein genug, um zurückzurufen.",
  text: "Nova Host baut Websites für kleine und mittlere Betriebe — Handwerk, Praxen, Gastronomie, Dienstleistung. Keine Agentur mit Zwischenebenen: Wer eure Seite baut, ist auch die Person, die ans Telefon geht. Das Abo gibt es, weil eine Website mit dem Launch nicht fertig ist, sondern anfängt.",
  points: [
    {
      num: "01",
      title: "Feste Grenzen statt Streit",
      text: "Jedes Abo hat ein klares Änderungskontingent. Ihr wisst vorher, was enthalten ist — und wir müssen nicht bei jeder Kleinigkeit über Aufwand diskutieren.",
    },
    {
      num: "02",
      title: "Wir sagen vorher Bescheid",
      text: "Reicht das Kontingent für einen Wunsch nicht, hört ihr das vorher mit einer Schätzung. Keine Rechnung, mit der ihr nicht gerechnet habt.",
    },
    {
      num: "03",
      title: "Kein Anbieter-Gefängnis",
      text: "Code, Design und Zugänge gehören euch. Wenn ihr gehen wollt, bekommt ihr alles mit — daran lassen wir uns messen.",
    },
  ],
} as const;

/* ---------------------------------- Kontakt ------------------------------ */

export const contact = {
  eyebrow: "Kontakt",
  title: "Erzählt uns von eurem Vorhaben.",
  text: "Neue Website, Relaunch oder nur eine Einschätzung zur bestehenden Seite — schreibt kurz, worum es geht. Das Erstgespräch kostet nichts.",
  /** Kleine Kennzahlen neben dem Formular. */
  facts: [
    { label: "Erstgespräch", value: "kostenlos" },
    { label: "Antwortzeit", value: "meist am selben Tag" },
    { label: "Angebot", value: "Festpreis, kein Stundenzettel" },
  ],
} as const;

/* ----------------------------------- Footer ------------------------------ */

export const footerColumns: FooterColumn[] = [
  {
    heading: "Leistungen",
    links: [
      { label: "Webdesign", href: "#services" },
      { label: "Umsetzung", href: "#services" },
      { label: "Relaunch", href: "#services" },
      { label: "Betreuung", href: "#services" },
      { label: "SEO & Tempo", href: "#services" },
      { label: "Inhalte", href: "#services" },
    ],
  },
  {
    heading: "Zusammenarbeit",
    links: [
      { label: "Ablauf", href: "#process" },
      { label: "Website-Pakete", href: "#pricing" },
      { label: "Betreuungs-Abos", href: "#pricing" },
      { label: "Was im Abo steckt", href: "#care" },
      { label: "Handarbeit", href: "#craft" },
    ],
  },
  {
    heading: "Kontakt",
    links: [
      { label: "Erstgespräch", href: "#contact" },
      { label: "Über uns", href: "#about" },
      { label: "Kennzahlen", href: "#performance" },
      { label: "E-Mail schreiben", href: "mailto:hello@novahost.dev", external: true },
    ],
  },
];

/** Social-Links im Footer. `label` ist das Kürzel im Button. */
export const socialLinks = [
  { label: "IN", href: "https://www.linkedin.com", title: "LinkedIn" },
  { label: "IG", href: "https://www.instagram.com", title: "Instagram" },
  { label: "GH", href: "https://github.com", title: "GitHub" },
] as const;

/** Das kleine Terminal-Element im Footer. */
export const footerSnippet = `$ nova abo --status
{ "abo": "plus", "rest": "1h 15min" }`;

export const legalLinks: LegalLink[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

/* --------------------------------- Consent ------------------------------- */

/**
 * Texte der Cookie-Abfrage.
 *
 * Bewusst nuechtern formuliert und ohne Druck: die Ablehnung steht gleichwertig
 * neben der Zustimmung, es gibt keine vorausgewaehlten Haken und kein
 * Wegklicken, das als Einwilligung gilt.
 */
export const consent = {
  eyebrow: "Datenschutz",
  title: "Ihr seid am Zug.",
  text: "Nova Host speichert nur, was für den Betrieb dieser Seite nötig ist. Statistik und Marketing laufen ausschließlich mit eurer Zustimmung — und ihr könnt sie jederzeit im Footer wieder zurücknehmen.",
  acceptAll: "Alle akzeptieren",
  rejectAll: "Nur notwendige",
  openSettings: "Einstellungen",
  save: "Auswahl speichern",
  back: "Zurück",
  close: "Abfrage schließen",
  settingsTitle: "Einstellungen",
  settingsText:
    "Wählt aus, was gespeichert werden darf. Notwendiges lässt sich nicht abwählen — ohne diesen Eintrag ließe sich eure Entscheidung nicht merken.",
  /** Link zur ausführlichen Erklärung. */
  privacyLabel: "Zur Datenschutzerklärung",
  privacyHref: "/datenschutz",
} as const;

export const consentCategories: ConsentCategoryInfo[] = [
  {
    id: "necessary",
    title: "Notwendig",
    text: "Speichert allein eure Entscheidung aus dieser Abfrage und die gewählte Ansicht (hell oder dunkel), damit beides beim nächsten Besuch erhalten bleibt. Keine Weitergabe, keine Auswertung.",
    detail: "localStorage · nova-host-consent · nova-host-theme",
    locked: true,
  },
  {
    id: "statistics",
    title: "Statistik",
    text: "Anonyme Reichweitenmessung: welche Seiten aufgerufen werden und wie schnell sie laden. Hilft uns, die Seite schneller zu machen.",
    detail: "aggregiert · keine Profilbildung",
  },
  {
    id: "marketing",
    title: "Marketing",
    text: "Misst, über welche Kampagne ihr zu uns gefunden habt. Ohne Zustimmung wird dafür nichts gespeichert und nichts geladen.",
    detail: "opt-in · standardmäßig aus",
  },
];

/* -------------------------------- Rechtstexte ---------------------------- */

/**
 * Platzhaltertexte. Vor dem Livegang muessen Anschrift, Vertretungsberechtigte,
 * Registerdaten und Umsatzsteuer-ID durch die echten Angaben ersetzt werden —
 * ein unvollstaendiges Impressum ist abmahnfaehig.
 */
export const impressum: LegalPageContent = {
  eyebrow: "Rechtliches",
  title: "Impressum",
  intro:
    "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) sowie § 18 Abs. 2 MStV.",
  sections: [
    {
      heading: "Diensteanbieter",
      paragraphs: [
        "Nova Host GmbH",
        "Musterstraße 1, 10115 Berlin, Deutschland",
        "Vertreten durch die Geschäftsführung.",
      ],
    },
    {
      heading: "Kontakt",
      paragraphs: ["E-Mail: hello@novahost.dev", "Telefon: +49 30 5555 0170"],
    },
    {
      heading: "Registereintrag",
      paragraphs: [
        "Eingetragen im Handelsregister des Amtsgerichts Berlin-Charlottenburg.",
        "Registernummer: HRB 000000",
        "Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE000000000",
      ],
    },
    {
      heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
      paragraphs: ["Die Geschäftsführung, Anschrift wie oben."],
    },
    {
      heading: "Haftung für Inhalte",
      paragraphs: [
        "Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
        "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen entfernen wir diese Inhalte umgehend.",
      ],
    },
    {
      heading: "Haftung für Links",
      paragraphs: [
        "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
      ],
    },
    {
      heading: "Urheberrecht",
      paragraphs: [
        "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung.",
      ],
    },
  ],
};

export const datenschutz: LegalPageContent = {
  eyebrow: "Rechtliches",
  title: "Datenschutz",
  intro:
    "Diese Erklärung beschreibt, welche personenbezogenen Daten beim Besuch dieser Website verarbeitet werden und wozu.",
  sections: [
    {
      heading: "Verantwortliche Stelle",
      paragraphs: [
        "Verantwortlich im Sinne der Datenschutz-Grundverordnung ist die Nova Host GmbH, Musterstraße 1, 10115 Berlin. Kontakt: hello@novahost.dev.",
      ],
    },
    {
      heading: "Server-Logfiles",
      paragraphs: [
        "Diese Website wird auf Servern in der Europäischen Union betrieben. Beim Aufruf werden automatisch Zugriffsdaten in Logfiles gespeichert: aufgerufene Adresse, Zeitpunkt, übertragene Datenmenge, Referrer, Browsertyp und die IP-Adresse in gekürzter Form.",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt im sicheren und stabilen Betrieb der Website. Die Logfiles werden nach spätestens 14 Tagen gelöscht.",
      ],
    },
    {
      heading: "Kontaktformular",
      paragraphs: [
        "Wenn Sie uns über das Formular schreiben, verarbeiten wir die von Ihnen angegebenen Daten — Name, Anliegen, E-Mail-Adresse und optional Ihre Telefonnummer — ausschließlich zur Bearbeitung Ihrer Anfrage.",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf einen Vertrag abzielt, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Der Versand erfolgt über den Dienstleister Resend, der als Auftragsverarbeiter für uns tätig ist. Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
      ],
    },
    {
      heading: "Schriftarten",
      paragraphs: [
        "Die verwendeten Schriftarten werden zusammen mit der Website von unseren eigenen Servern ausgeliefert. Beim Aufruf entsteht dadurch keine Verbindung zu Servern Dritter, insbesondere nicht zu Google Fonts.",
      ],
    },
    {
      heading: "Cookies und lokale Speicherung",
      paragraphs: [
        "Beim ersten Besuch fragen wir, was gespeichert werden darf. Ohne Ihre Zustimmung setzen wir keine Cookies zu Analyse- oder Werbezwecken und binden keine Tracking-Dienste ein.",
        "Gespeichert wird in jedem Fall Ihre Entscheidung selbst — im lokalen Speicher Ihres Browsers unter dem Schlüssel „nova-host-consent“, zusammen mit dem Zeitpunkt der Entscheidung. Ebenfalls lokal gespeichert wird unter „nova-host-theme“, ob Sie die helle oder die dunkle Darstellung gewählt haben. Beide Angaben verlassen Ihr Gerät nicht. Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG: ohne diese Einträge ließen sich Ihre Auswahl und Ihre Ansicht nicht merken.",
        "Ihre Einwilligung ist freiwillig und jederzeit mit Wirkung für die Zukunft widerruflich. Über „Cookie-Einstellungen“ im Fußbereich der Seite können Sie Ihre Auswahl jederzeit ändern oder vollständig zurücknehmen.",
      ],
    },
    {
      heading: "Ihre Rechte",
      paragraphs: [
        "Sie haben das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten sowie auf deren Berichtigung, Löschung oder Einschränkung der Verarbeitung. Ferner steht Ihnen ein Recht auf Datenübertragbarkeit und ein Widerspruchsrecht gegen Verarbeitungen auf Grundlage berechtigter Interessen zu.",
        "Zur Ausübung genügt eine formlose Nachricht an hello@novahost.dev. Unabhängig davon können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren.",
      ],
    },
    {
      heading: "Verschlüsselung",
      paragraphs: [
        "Diese Website wird ausschließlich über eine mit TLS verschlüsselte Verbindung ausgeliefert. Daten, die Sie über das Formular übermitteln, sind auf dem Transportweg gegen Mitlesen geschützt.",
      ],
    },
  ],
};
