/**
 * Sämtliche Texte der Startseite.
 * Content ist bewusst von den Komponenten getrennt: Anpassungen an Copy,
 * Preisen oder Leistungen erfordern keine Änderung am Layout-Code.
 */

export const hero = {
  label: "01 / STUDIO",
  status: "VERFÜGBAR FÜR PROJEKTE",
  headline: ["WEBSITES,", "DIE AUS", "BESUCHERN", "KUNDEN MACHEN."],
  sub: "Wir entwickeln professionelle Websites für Unternehmen, die online nicht nur gut aussehen, sondern mehr qualifizierte Anfragen gewinnen wollen.",
  ctaPrimary: { label: "Kostenloses Erstgespräch", href: "#kontakt" },
  ctaSecondary: { label: "Website analysieren lassen", href: "#analyse" },
  meta: [
    { k: "EINSTIEG", v: "ab 1.490 EUR" },
    { k: "UMSETZUNG", v: "2-6 Wochen" },
    { k: "BETREUUNG", v: "ab 99 EUR/Mon." },
  ],
};

export const trustPoints = [
  "TRANSPARENTE PREISE",
  "PERSÖNLICHE BETREUUNG",
  "SCHNELLE KOMMUNIKATION",
  "SAUBERE TECHNISCHE UMSETZUNG",
  "RESPONSIVE AUF JEDEM GERÄT",
  "LAUFENDE OPTIMIERUNG",
  "KEINE UNNÖTIGE KOMPLEXITÄT",
];

export const problem = {
  label: "02 / PROBLEM",
  headline: ["SIE HABEN EINE WEBSITE.", "ABER BRINGT SIE AUCH ANFRAGEN?"],
  intro:
    "Die meisten Unternehmenswebsites scheitern nicht am Aussehen. Sie scheitern daran, dass Besucher nicht wissen, was sie tun sollen.",
  items: [
    {
      num: "01",
      title: "Veraltetes Design",
      body: "Der erste Eindruck entscheidet in Sekunden. Wirkt die Website von gestern, wirkt der Betrieb von gestern.",
    },
    {
      num: "02",
      title: "Schlechte mobile Darstellung",
      body: "Der Großteil der Besucher kommt vom Smartphone. Was dort hakt, ist verloren.",
    },
    {
      num: "03",
      title: "Keine klare Handlungsaufforderung",
      body: "Ohne sichtbaren nächsten Schritt passiert der nächste Schritt nicht.",
    },
    {
      num: "04",
      title: "Zu wenig Vertrauen",
      body: "Keine Gesichter, keine Referenzen, keine Klarheit. Interessenten springen ab, bevor sie fragen.",
    },
    {
      num: "05",
      title: "Kontaktaufnahme unnötig kompliziert",
      body: "Formulare mit fünfzehn Feldern, versteckte Telefonnummern, Umwege. Jede Hürde kostet Anfragen.",
    },
    {
      num: "06",
      title: "Besucher wissen nicht, was sie tun sollen",
      body: "Alles ist da, nichts ist geführt. Eine Website braucht eine Richtung, keine Sammlung.",
    },
  ],
};

export const solution = {
  label: "03 / LÖSUNG",
  headline: ["NICHT NUR EINE WEBSITE.", "EINE DIGITALE VERTRIEBSFLÄCHE."],
  body: "Wir verbinden Strategie, Design, Entwicklung und laufende Optimierung zu einer Website, die nicht nur professionell aussieht, sondern Besucher gezielt zur Anfrage führt.",
  chain: ["STRATEGIE", "DESIGN", "ENTWICKLUNG", "LAUNCH", "OPTIMIERUNG"],
  chainNote:
    "Fünf Schritte, ein durchgehender Weg - von der ersten Analyse bis zur laufenden Weiterentwicklung.",
};

export const services = {
  label: "04 / LEISTUNGEN",
  headline: "WAS WIR MACHEN.",
  intro: "Vier Disziplinen, die zusammengehören - und zwei, die nach dem Launch weiterlaufen.",
  items: [
    {
      num: "01",
      title: "Web Design",
      en: "DESIGN",
      body: "Individuelles Design, das zur Marke passt und Vertrauen schafft. Kein Template, kein Baukasten.",
      tags: ["Art Direction", "UI Design", "Design System"],
    },
    {
      num: "02",
      title: "Web Development",
      en: "BUILD",
      body: "Schnelle, responsive und technisch saubere Websites. Sauberer Code statt Plugin-Stapel.",
      tags: ["Next.js", "Responsive", "Core Web Vitals"],
    },
    {
      num: "03",
      title: "Conversion Optimization",
      en: "CONVERT",
      body: "Struktur und Nutzerführung, die Besucher zur Handlung führen. Jede Section hat eine Aufgabe.",
      tags: ["Funnel", "CTA-System", "Formulare"],
    },
    {
      num: "04",
      title: "SEO Basis",
      en: "FOUND",
      body: "Technische und strukturelle Grundlage für Suchmaschinen. Sauber ausgezeichnet, sauber verlinkt.",
      tags: ["Technik", "Struktur", "Meta & Schema"],
    },
    {
      num: "05",
      title: "Website Care",
      en: "CARE",
      body: "Wartung, Sicherheit, Backups und Fehlerbehebung. Sie müssen sich um nichts kümmern.",
      tags: ["Updates", "Backups", "Monitoring"],
    },
    {
      num: "06",
      title: "Continuous Growth",
      en: "GROW",
      body: "Laufende Optimierung von Content, Performance und Conversion. Die Website bleibt nicht stehen.",
      tags: ["Content", "Performance", "Tests"],
    },
  ],
};

export const work = {
  label: "05 / PROJEKTE",
  headline: "SELECTED WORK.",
  intro:
    "Wir zeigen hier eigene Demo-Projekte - gestaltete Konzepte, keine Kundenreferenzen. Sobald Kundenprojekte live sind, stehen sie an dieser Stelle.",
  disclaimer:
    "Alle gezeigten Arbeiten sind als DEMO PROJECT gekennzeichnete Eigenkonzepte. Keine echten Kundennamen, keine erfundenen Ergebniszahlen.",
  items: [
    {
      num: "01",
      title: "Elektrotechnik Konzept",
      branch: "Elektrobetrieb",
      scope: "One-Pager, Leistungsseiten, Anfragestrecke",
      year: "2026",
      hue: 96,
    },
    {
      num: "02",
      title: "Dachdecker Konzept",
      branch: "Dachdeckerei",
      scope: "Website, Projektgalerie, Kontaktsystem",
      year: "2026",
      hue: 78,
    },
    {
      num: "03",
      title: "SHK Konzept",
      branch: "Sanitär / Heizung / Klima",
      scope: "Website, Notdienst-Führung, Terminanfrage",
      year: "2026",
      hue: 108,
    },
    {
      num: "04",
      title: "Beratung Konzept",
      branch: "Beratungsunternehmen",
      scope: "Markenauftritt, Leistungsstruktur, Leadstrecke",
      year: "2026",
      hue: 64,
    },
  ],
};

export const process = {
  label: "06 / PROZESS",
  headline: "SO ENTSTEHT IHRE WEBSITE.",
  intro: "Sechs Schritte. Sie wissen jederzeit, woran wir gerade arbeiten.",
  steps: [
    { num: "01", title: "ANALYSE", body: "Wir verstehen Unternehmen, Zielgruppe und bestehende Website." },
    { num: "02", title: "STRATEGIE", body: "Wir entwickeln Struktur, Nutzerführung und Conversion-Ziele." },
    { num: "03", title: "DESIGN", body: "Wir entwickeln eine individuelle visuelle Identität." },
    { num: "04", title: "ENTWICKLUNG", body: "Wir bauen die Website technisch sauber und performant." },
    { num: "05", title: "LAUNCH", body: "Die Website geht live - inklusive Uebergabe und Einweisung." },
    { num: "06", title: "OPTIMIERUNG", body: "Nach dem Launch entwickeln wir sie weiter." },
  ],
};

export const analysis = {
  label: "08 / ANALYSE",
  headline: ["KOSTENLOSE", "WEBSITE-ANALYSE."],
  sub: "Wir zeigen Ihnen, wo Ihre Website Besucher verliert.",
  body: "Sie geben Ihre Website-Adresse ein, wir sehen sie uns persönlich an und melden uns mit einer konkreten Einschätzung - ohne automatisiertes Standard-PDF.",
  checks: [
    "Mobile Nutzerführung",
    "Ladezeit & Performance",
    "CTA-Struktur",
    "Technische Auffälligkeiten",
    "SEO-Basis",
    "Vertrauenssignale",
    "Kontaktmöglichkeiten",
  ],
  cta: "Website analysieren",
  note: "Kein Abo, keine Kosten, keine Verpflichtung. Wir melden uns innerhalb von zwei Werktagen.",
};

export const faq = {
  label: "10 / FAQ",
  headline: "HÄUFIGE FRAGEN.",
  items: [
    {
      q: "Wie lange dauert eine Website?",
      a: "Ein One-Pager (Launch) dauert in der Regel zwei bis drei Wochen, ein größeres Projekt (Business) vier bis sechs Wochen. Maßgeblich ist dabei meist nicht die Umsetzung, sondern wie schnell Inhalte wie Texte, Bilder und Freigaben vorliegen. Individuelle Projekte planen wir gemeinsam.",
    },
    {
      q: "Was kostet eine Website?",
      a: "Der Einstieg liegt bei 1.490 EUR für eine One-Page-Website, das häufigste Paket bei 2.490 EUR für 5-8 Seiten. Individuelle Projekte starten ab 4.900 EUR. Alle Preise stehen offen auf dieser Seite, zzgl. gesetzlicher MwSt.",
    },
    {
      q: "Was passiert nach dem Launch?",
      a: "Die Website gehört Ihnen und läuft weiter - auch ohne uns. Wenn Sie möchten, übernehmen wir Technik, Sicherheit, Änderungen und Optimierung im Rahmen einer monatlichen Betreuung ab 99 EUR.",
    },
    {
      q: "Was ist im monatlichen Abo enthalten?",
      a: "Je nach Paket: technische Wartung, Sicherheitsupdates, Backups, Monitoring und Fehlerbehebung, dazu ein festes Zeitkontingent für Änderungen und Optimierung - 30, 90 oder 150 Minuten pro Monat.",
    },
    {
      q: "Kann ich später Funktionen hinzufügen?",
      a: "Ja. Wir bauen modular, damit später Seiten, Landingpages, ein Blog, Terminbuchung oder ein Kundenbereich ergänzt werden können. Größere Funktionen kalkulieren wir separat und stimmen sie vorher mit Ihnen ab.",
    },
    {
      q: "Was passiert mit meiner Domain?",
      a: "Ihre Domain bleibt Ihre Domain. Wenn bereits eine existiert, übernehmen wir sie technisch. Falls noch keine vorhanden ist, richten wir sie gemeinsam mit Ihnen ein - registriert auf Ihren Namen.",
    },
    {
      q: "Kann ich die Betreuung kündigen?",
      a: "Ja. Wir empfehlen eine Mindestlaufzeit von sechs Monaten, weil sich Optimierung erst über Zeit auszahlt. Danach ist die Betreuung monatlich kündbar.",
    },
    {
      q: "Was kostet eine zusätzliche Funktion?",
      a: "Zusatzarbeit außerhalb des Kontingents rechnen wir mit 119 EUR/Stunde ab, komplexe Entwicklung mit 149 EUR/Stunde. Größere Vorhaben bekommen ein festes Projektangebot, bevor wir starten.",
    },
    {
      q: "Was ist der Unterschied zwischen Launch und Business?",
      a: "Launch ist eine fokussierte One-Page-Website für einen klaren Auftritt. Business umfasst 5-8 Seiten mit eigenen Leistungsseiten, Referenzen, Blog und einem ausgebauten Lead-System - sinnvoll, sobald Sie mehrere Leistungen erklären oder über Suchmaschinen gefunden werden wollen.",
    },
    {
      q: "Was passiert, wenn ich keine laufende Betreuung möchte?",
      a: "Dann bekommen Sie die fertige Website übergeben und betreiben sie selbst. Sie ist voll funktionsfähig und gehört Ihnen. Änderungen können Sie jederzeit einzeln beauftragen.",
    },
  ],
};

export const finalCta = {
  label: "11 / KONTAKT",
  headline: ["BEREIT FÜR EINE WEBSITE,", "DIE MEHR AUS IHREM", "TRAFFIC MACHT?"],
  sub: "Ein Gespräch, dreißig Minuten, keine Verpflichtung. Danach wissen Sie, was Ihre Website braucht - und was sie kostet.",
  primary: "Kostenloses Erstgespräch",
  secondary: "Website analysieren lassen",
};

export const footer = {
  claim: "BUILT FOR THE WEB. OPTIMIZED FOR PEOPLE.",
  columns: [
    { title: "STUDIO", links: [
      { label: "Leistungen", href: "#leistungen" },
      { label: "Projekte", href: "#projekte" },
      { label: "Prozess", href: "#prozess" },
    ]},
    { title: "ANGEBOT", links: [
      { label: "Website-Projekte", href: "#preise" },
      { label: "Laufende Betreuung", href: "#betreuung" },
      { label: "Website-Analyse", href: "#analyse" },
      { label: "FAQ", href: "#faq" },
    ]},
  ],
};
