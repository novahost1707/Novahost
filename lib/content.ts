import type {
  FooterColumn,
  LegalLink,
  LegalPageContent,
  Link,
  MetricItem,
  NavLink,
  PricingPlan,
  Region,
  SecurityItem,
  ServiceItem,
  TerminalLine,
} from "@/types";

/**
 * Alle redaktionellen Inhalte der Website an einer Stelle.
 * Aenderungen am Text passieren nur hier — die Komponenten bleiben unberuehrt.
 */

export const siteMeta = {
  name: "Nova Host",
  title: "Nova Host — Infrastructure, built for what's next.",
  description:
    "Nova Host betreibt Hosting, VPS, Dedicated Server und Cloud-Infrastruktur in europäischen Rechenzentren. 99,99 % Uptime, 12 ms Latenz, 24/7 Monitoring.",
  /** Erscheint als Mono-Zeile unter dem Logo im Footer. */
  claim: "Infrastructure, built for what's next.",
  email: "hello@novahost.dev",
  phone: "+49 30 5555 0170",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", hash: "#hero" },
  { label: "Services", hash: "#services" },
  { label: "Infrastructure", hash: "#infrastructure" },
  { label: "Pricing", hash: "#pricing" },
  { label: "About", hash: "#about" },
  { label: "Contact", hash: "#contact" },
];

/* ----------------------------------- Hero -------------------------------- */

export const hero = {
  eyebrow: "Cloud · Hosting · Managed Infrastructure",
  headlineTop: "Infrastructure,",
  headlineAccent: "built for what's next.",
  text: "Nova Host betreibt Hosting, virtuelle und dedizierte Server sowie Cloud-Infrastruktur in europäischen Rechenzentren — mit NVMe-Speicher, eigenem Backbone und einem Team, das nachts erreichbar ist.",
  primaryCta: { label: "Server entdecken", hash: "#pricing" },
  secondaryCta: { label: "Kontakt aufnehmen", hash: "#contact" },
} as const;

/**
 * Die Kennzahlen im Hero-Dashboard.
 *
 * `fill` steuert den kleinen Balken unter dem Wert (0–1) und ist rein
 * visuell — er zeigt die Auslastung relativ zum jeweiligen Zielwert.
 */
export const dashboardStats = [
  { label: "Uptime", value: "99.99", unit: "%", fill: 0.99 },
  { label: "Latency", value: "12", unit: "ms", fill: 0.86 },
  { label: "Nodes", value: "104", unit: "", fill: 0.72 },
  { label: "Regions", value: "9", unit: "", fill: 0.6 },
] as const;

/** Zeilen der Live-Statusliste im Hero-Dashboard. */
export const dashboardServices = [
  { name: "edge-fra-01", region: "Frankfurt", status: "operational" },
  { name: "core-ams-04", region: "Amsterdam", status: "operational" },
  { name: "db-par-02", region: "Paris", status: "operational" },
  { name: "cdn-nyc-07", region: "New York", status: "degraded" },
] as const;

/** Das kurze Terminal im Hero. */
export const heroTerminal: TerminalLine[] = [
  { kind: "prompt", text: "nova-host status" },
  { kind: "log", text: "> all systems operational" },
  { kind: "log", text: "> latency: 12ms" },
  { kind: "log", text: "> uptime: 99.99%" },
];

/** Laufband unter dem Hero — technische Stichworte statt Kundenlogos. */
export const marqueeItems: string[] = [
  "NVMe SSD",
  "AMD EPYC",
  "IPv6 ready",
  "DDoS Protection",
  "ISO 27001",
  "DSGVO-konform",
  "Anycast DNS",
  "100 Gbit/s Backbone",
  "Terraform Provider",
  "REST & GraphQL API",
  "Green Energy",
  "S3-kompatibel",
];

/* --------------------------------- Services ------------------------------ */

export const services: ServiceItem[] = [
  {
    num: "01",
    icon: "web",
    title: "Web Hosting",
    text: "High-performance Hosting für moderne Websites und Anwendungen — mit Deploy-Hooks, Staging und automatischem SSL.",
    specs: ["NVMe SSD", "HTTP/3", "Auto-SSL", "PHP · Node · Python"],
    meta: "ab 4,90 €/Monat",
  },
  {
    num: "02",
    icon: "vps",
    title: "VPS",
    text: "Flexible virtuelle Server mit voller Kontrolle. Root-Zugriff, freie Distributionswahl und Skalierung im laufenden Betrieb.",
    specs: ["KVM", "Root Access", "Snapshots", "vCPU 2–32"],
    meta: "ab 9,90 €/Monat",
  },
  {
    num: "03",
    icon: "dedicated",
    title: "Dedicated Servers",
    text: "Maximale Performance für anspruchsvolle Workloads. Dedizierte Hardware ohne geteilte Ressourcen, individuell konfiguriert.",
    specs: ["AMD EPYC", "ECC RAM", "RAID 10", "10 Gbit/s uplink"],
    meta: "ab 89 €/Monat",
  },
  {
    num: "04",
    icon: "cloud",
    title: "Cloud Infrastructure",
    text: "Skalierbare Infrastruktur für moderne Anwendungen — API-first, per Terraform beschreibbar, sekundengenau abgerechnet.",
    specs: ["Autoscaling", "Load Balancer", "Object Storage", "Private Network"],
    meta: "pay per second",
  },
  {
    num: "05",
    icon: "game",
    title: "Game Hosting",
    text: "Performance-orientierte Server für Gaming-Communities. Niedrige Latenz, sofortige Bereitstellung, volle Mod-Kontrolle.",
    specs: ["Low latency", "Instant setup", "Mod-Support", "DDoS Layer 7"],
    meta: "ab 6,90 €/Monat",
  },
  {
    num: "06",
    icon: "managed",
    title: "Managed IT",
    text: "Professionelle Infrastruktur und technischer Support. Wir übernehmen Betrieb, Updates und Monitoring — ihr baut das Produkt.",
    specs: ["24/7 Support", "Patch-Management", "SLA 99,99 %", "Onboarding"],
    meta: "individuell",
  },
];

/* ------------------------------- Infrastruktur --------------------------- */

/**
 * Die Standorte der Netzwerkkarte.
 *
 * x/y sind Prozentwerte im 100×100-Koordinatensystem der SVG. Sie bilden
 * keine geografisch exakte Karte ab, sondern eine bewusst abstrahierte
 * Anordnung — Europa dichter, Nordamerika links, Asien rechts.
 */
export const regions: Region[] = [
  { code: "fra", city: "Frankfurt", country: "Germany", latency: "4ms", x: 52, y: 38, primary: true },
  { code: "ams", city: "Amsterdam", country: "Netherlands", latency: "7ms", x: 44, y: 27, primary: true },
  { code: "par", city: "Paris", country: "France", latency: "9ms", x: 38, y: 47, primary: true },
  { code: "hel", city: "Helsinki", country: "Finland", latency: "16ms", x: 62, y: 16 },
  { code: "vie", city: "Vienna", country: "Austria", latency: "11ms", x: 63, y: 52 },
  { code: "nyc", city: "New York", country: "USA", latency: "78ms", x: 13, y: 33 },
  { code: "sfo", city: "San Francisco", country: "USA", latency: "142ms", x: 6, y: 58 },
  { code: "sgp", city: "Singapore", country: "Singapore", latency: "168ms", x: 88, y: 72 },
  { code: "syd", city: "Sydney", country: "Australia", latency: "241ms", x: 94, y: 88 },
];

/** Die Verbindungen zwischen den Standorten (Referenz ueber `Region.code`). */
export const networkLinks: Link[] = [
  { from: "fra", to: "ams" },
  { from: "fra", to: "par" },
  { from: "fra", to: "vie" },
  { from: "ams", to: "hel" },
  { from: "ams", to: "nyc" },
  { from: "nyc", to: "sfo" },
  { from: "fra", to: "sgp" },
  { from: "sgp", to: "syd" },
  { from: "par", to: "nyc" },
];

/** Kurze Fakten neben der Karte. */
export const infrastructureFacts = [
  { label: "Backbone", value: "100 Gbit/s", hint: "redundant angebunden" },
  { label: "Standorte", value: "9 Regionen", hint: "5 davon in der EU" },
  { label: "Strom", value: "100 % erneuerbar", hint: "seit 2021" },
  { label: "Peering", value: "DE-CIX · AMS-IX", hint: "direkte Übergabe" },
] as const;

/** Das Objekt-Snippet neben der Karte. */
export const infrastructureSnippet = `const novaHost = {
  uptime: "99.99%",
  latency: "12ms",
  regions: 9,
  infrastructure: "global"
};`;

/* -------------------------------- Performance ---------------------------- */

export const metrics: MetricItem[] = [
  {
    value: 99.99,
    decimals: 2,
    suffix: "%",
    label: "Uptime",
    hint: "gemessen über die letzten 12 Monate",
  },
  {
    value: 12,
    suffix: "ms",
    label: "Average Latency",
    hint: "innerhalb der EU-Regionen",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Monitoring",
    hint: "Bereitschaft mit echtem Menschen",
  },
  {
    value: 100,
    suffix: "+",
    label: "Global Nodes",
    hint: "über 9 Regionen verteilt",
  },
];

/* ---------------------------------- Pricing ------------------------------ */

export const pricingPlans: PricingPlan[] = [
  {
    slug: "starter",
    name: "Starter",
    tagline: "Für kleine Projekte und erste Deployments.",
    price: 4.9,
    spec: "1 vCPU · 2 GB RAM · 40 GB NVMe",
    features: [
      "1 TB Traffic inklusive",
      "Kostenloses SSL-Zertifikat",
      "Tägliches Backup, 7 Tage",
      "Deploy per Git-Push",
      "Community-Support",
    ],
    cta: "Starter wählen",
  },
  {
    slug: "pro",
    name: "Pro",
    tagline: "Für wachsende Anwendungen mit echtem Traffic.",
    price: 19.9,
    spec: "4 vCPU · 8 GB RAM · 160 GB NVMe",
    features: [
      "Unbegrenzter Traffic",
      "Staging-Umgebung inklusive",
      "Stündliches Backup, 30 Tage",
      "DDoS Protection Layer 7",
      "Priority-Support in 30 Min.",
      "API- und Terraform-Zugriff",
    ],
    cta: "Pro wählen",
    featured: true,
  },
  {
    slug: "business",
    name: "Business",
    tagline: "Für professionelle Workloads im Dauerbetrieb.",
    price: 59,
    spec: "8 vCPU · 32 GB RAM · 480 GB NVMe",
    features: [
      "Alles aus Pro",
      "Dedizierte Ressourcen",
      "Load Balancer inklusive",
      "Private Networking",
      "SLA 99,99 % vertraglich",
      "Technischer Ansprechpartner",
    ],
    cta: "Business wählen",
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    tagline: "Individuelle Infrastruktur nach Maß.",
    price: null,
    spec: "Dedizierte Hardware · eigenes Netzsegment",
    features: [
      "Alles aus Business",
      "Eigene Hardware-Konfiguration",
      "Compliance-Dokumentation",
      "Onboarding und Migration",
      "24/7 Bereitschaft mit Rufnummer",
    ],
    cta: "Angebot anfragen",
  },
];

/* -------------------------------- Developers ----------------------------- */

/** Das grosse Terminal in der Developer-Section. */
export const deployTerminal: TerminalLine[] = [
  { kind: "prompt", text: "nova deploy production" },
  { kind: "blank", text: "" },
  { kind: "log", text: "Connecting to infrastructure..." },
  { kind: "success", text: "Server online" },
  { kind: "success", text: "Database connected" },
  { kind: "success", text: "SSL enabled" },
  { kind: "success", text: "Deployment successful" },
  { kind: "blank", text: "" },
  { kind: "log", text: "Deployment completed in 12.4s" },
];

export const developerFeatures = [
  {
    title: "CLI & API first",
    text: "Alles, was im Interface geht, geht auch über die CLI, die REST-API und den Terraform-Provider.",
    code: "npm i -g @novahost/cli",
  },
  {
    title: "Git-basierte Deploys",
    text: "Push auf main, Nova baut und rollt aus. Preview-Umgebungen entstehen automatisch pro Branch.",
    code: "git push nova main",
  },
  {
    title: "Logs in Echtzeit",
    text: "Strukturierte Logs und Metriken direkt im Terminal — ohne Umweg über ein Dashboard.",
    code: "nova logs --follow",
  },
];

/* --------------------------------- Security ------------------------------ */

export const securityItems: SecurityItem[] = [
  {
    icon: "shield",
    title: "DDoS Protection",
    text: "Filterung auf Layer 3, 4 und 7 direkt am Netzrand — Angriffe erreichen euren Server gar nicht erst.",
    status: "mitigation: automatic",
  },
  {
    icon: "lock",
    title: "SSL / TLS",
    text: "Zertifikate werden automatisch ausgestellt und erneuert. TLS 1.3 ist überall Standard.",
    status: "tls: 1.3 · auto-renew",
  },
  {
    icon: "firewall",
    title: "Firewall",
    text: "Regelwerke pro Projekt, versionierbar und über die API steuerbar. Default-deny ab Werk.",
    status: "policy: default-deny",
  },
  {
    icon: "backup",
    title: "Automated Backups",
    text: "Stündliche Snapshots, getrennt vom Produktivsystem gespeichert und regelmäßig testweise zurückgespielt.",
    status: "retention: 30 days",
  },
  {
    icon: "monitor",
    title: "24/7 Monitoring",
    text: "Jeder Node meldet Zustand, Last und Latenz im Sekundentakt an ein System, das nachts jemanden weckt.",
    status: "interval: 1s",
  },
  {
    icon: "compliance",
    title: "Secure Infrastructure",
    text: "Rechenzentren nach ISO 27001, Zutritt biometrisch geregelt, Datenverarbeitung vollständig in der EU.",
    status: "iso 27001 · gdpr",
  },
];

/* ----------------------------------- About ------------------------------- */

export const about = {
  eyebrow: "About",
  title: "Betrieben von Leuten, die selbst deployen.",
  text: "Nova Host ist aus der Praxis entstanden: aus Nächten, in denen ein Deployment hing, und aus Support-Tickets, die drei Tage unbeantwortet blieben. Wir bauen die Infrastruktur, die wir selbst gebraucht hätten — schnell, nachvollziehbar und mit einem Team, das antwortet.",
  points: [
    {
      num: "01",
      title: "Eigene Hardware",
      text: "Wir mieten keine fremden Ressourcen weiter. Jede Maschine gehört uns, steht in einem Rechenzentrum, das wir betreten dürfen.",
    },
    {
      num: "02",
      title: "Antwort statt Ticketnummer",
      text: "Der Support wird von denselben Menschen gemacht, die die Plattform betreiben. Erste Antwort im Schnitt in 14 Minuten.",
    },
    {
      num: "03",
      title: "Keine versteckten Grenzen",
      text: "Preise, Limits und Wartungsfenster stehen öffentlich. Was im Tarif steht, gilt auch unter Last.",
    },
  ],
} as const;

/* ---------------------------------- Kontakt ------------------------------ */

export const contact = {
  eyebrow: "Contact",
  title: "Sprechen wir über eure Infrastruktur.",
  text: "Ob Migration, Neuaufbau oder eine zweite Meinung zur bestehenden Umgebung — schreibt uns kurz, worum es geht.",
  /** Kleine technische Kennzahlen neben dem Formular. */
  facts: [
    { label: "Antwortzeit", value: "Ø 14 Minuten" },
    { label: "Erreichbarkeit", value: "24/7, auch am Wochenende" },
    { label: "Onboarding", value: "Migration ohne Aufpreis" },
  ],
} as const;

/* ----------------------------------- Footer ------------------------------ */

export const footerColumns: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "Web Hosting", href: "#services" },
      { label: "VPS", href: "#services" },
      { label: "Dedicated Servers", href: "#services" },
      { label: "Cloud Infrastructure", href: "#services" },
      { label: "Game Hosting", href: "#services" },
      { label: "Managed IT", href: "#services" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Infrastructure", href: "#infrastructure" },
      { label: "Performance", href: "#performance" },
      { label: "Security", href: "#security" },
      { label: "Pricing", href: "#pricing" },
      { label: "For Developers", href: "#developers" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Dokumentation", href: "#developers" },
      { label: "API-Referenz", href: "#developers" },
      { label: "Status", href: "#performance" },
      { label: "Changelog", href: "#about" },
      { label: "Support", href: "#contact" },
    ],
  },
];

/** Social-Links im Footer. `label` ist das Kürzel im Button. */
export const socialLinks = [
  { label: "GH", href: "https://github.com", title: "GitHub" },
  { label: "IN", href: "https://www.linkedin.com", title: "LinkedIn" },
  { label: "X", href: "https://x.com", title: "X" },
] as const;

/** Das kleine Terminal-Element im Footer. */
export const footerSnippet = `$ curl -s https://status.novahost.dev
{ "status": "operational", "uptime": "99.99%" }`;

export const legalLinks: LegalLink[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
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
      paragraphs: [
        "E-Mail: hello@novahost.dev",
        "Telefon: +49 30 5555 0170",
      ],
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
      heading: "Hosting und Server-Logfiles",
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
      heading: "Cookies und Analyse",
      paragraphs: [
        "Diese Website setzt keine Cookies zu Analyse- oder Werbezwecken und bindet keine Tracking-Dienste ein.",
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
