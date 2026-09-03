/** Preise und Leistungsumfänge - transparent, an einer Stelle gepflegt. */

export type Tier = {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  positioning: string;
  audience: string;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
};

export const projectTiers: Tier[] = [
  {
    id: "launch",
    name: "LAUNCH",
    price: "1.490 EUR",
    positioning: "Der professionelle Einstieg.",
    audience: "Für Selbstständige und kleinere Unternehmen.",
    features: [
      "One-Page-Website",
      "Individuelles professionelles Design",
      "Responsive Design",
      "Kontaktformular",
      "Klare Call-to-Actions",
      "SEO-Basis",
      "Technische Optimierung",
      "Integration von Impressum und Datenschutz",
      "Conversion-orientierte Struktur",
    ],
    cta: "Projekt besprechen",
  },
  {
    id: "business",
    name: "BUSINESS",
    price: "2.490 EUR",
    positioning: "Für Unternehmen, die mehr aus ihrer Website machen wollen.",
    audience: "Für etablierte Unternehmen und KMU.",
    badge: "BELIEBTESTE WAHL",
    featured: true,
    features: [
      "5-8 Seiten",
      "Individuelles Design",
      "Responsive Design",
      "Kontakt- und Lead-System",
      "Conversion-Optimierung",
      "SEO-Basis",
      "Blog / Beiträge",
      "Referenzen",
      "Leistungsseiten",
      "Klare Call-to-Actions",
      "Eine kleinere Zusatzfunktion",
    ],
    cta: "Projekt besprechen",
  },
  {
    id: "custom",
    name: "CUSTOM",
    price: "ab 4.900 EUR",
    positioning: "Individuelle Websites und Anwendungen.",
    audience: "Für individuelle Anforderungen.",
    features: [
      "Online-Shop",
      "Webanwendungen",
      "Kundenbereiche",
      "Komplexe Terminbuchung",
      "API-Integrationen",
      "CRM-Anbindungen",
      "Automatisierungen",
      "Individuelle Funktionen",
    ],
    cta: "Projekt besprechen",
  },
];

export const careTiers: Tier[] = [
  {
    id: "care",
    name: "CARE",
    price: "99 EUR",
    priceNote: "/ Monat",
    positioning: "Technik im Griff.",
    audience: "Für Websites, die einfach laufen sollen.",
    features: [
      "Technische Wartung",
      "Sicherheitsupdates",
      "Backups",
      "Monitoring",
      "Fehlerbehebung",
      "30 Minuten Änderungszeit / Monat",
      "E-Mail-Support",
    ],
    cta: "Betreuung anfragen",
  },
  {
    id: "growth",
    name: "GROWTH",
    price: "199 EUR",
    priceNote: "/ Monat",
    positioning: "Die Website entwickelt sich weiter.",
    audience: "Für Unternehmen, die regelmäßig optimieren wollen.",
    badge: "EMPFOHLEN",
    featured: true,
    features: [
      "Alles aus Care",
      "90 Minuten Änderungs- und Optimierungszeit",
      "Contentänderungen",
      "Kleinere neue Inhalte",
      "SEO-Optimierungen",
      "Performance-Optimierung",
      "Conversion-Optimierung",
      "Priorisierter Support",
      "Regelmäßige Optimierung",
    ],
    cta: "Betreuung anfragen",
  },
  {
    id: "pro",
    name: "PRO",
    price: "349 EUR",
    priceNote: "/ Monat",
    positioning: "Laufende Arbeit am Wachstum.",
    audience: "Für Unternehmen mit aktivem Online-Marketing.",
    features: [
      "Alles aus Growth",
      "150 Minuten Arbeitszeit",
      "Landingpages",
      "Fortgeschrittene SEO-Arbeiten",
      "Conversion-Optimierung",
      "Content-Unterstützung",
      "Höhere Priorität",
      "Regelmäßige Strategie- und Optimierungsgespräche",
    ],
    cta: "Betreuung anfragen",
  },
];

export const priceRules = [
  {
    k: "ZEITKONTINGENT",
    v: "Nicht verbrauchte Arbeitszeit wird nicht in den Folgemonat übertragen.",
  },
  {
    k: "NEUE FUNKTIONEN",
    v: "Größere neue Funktionen werden separat kalkuliert und vorher abgestimmt.",
  },
  { k: "ZUSATZARBEIT", v: "119 EUR / Stunde" },
  { k: "KOMPLEXE ENTWICKLUNG", v: "149 EUR / Stunde oder individuelles Projektangebot" },
  { k: "LAUFZEIT", v: "Empfohlene Mindestlaufzeit 6 Monate, danach monatlich kündbar." },
];

export const vatNote = "Alle Preise verstehen sich netto, zzgl. gesetzlicher MwSt. Angebot richtet sich an Unternehmen, Selbstständige und Gewerbetreibende.";
