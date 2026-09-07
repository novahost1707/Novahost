# Bilder für die Demo-Projekte

Die vier Demo-Seiten sind so gebaut, dass echte Fotos **ohne Codeänderung**
eingesetzt werden können. Es zählt allein, ob unter `public/` eine Datei mit
dem hier genannten Namen liegt.

- Liegt eine Datei da, wird sie über `next/image` ausgeliefert - automatisch in
  passender Größe und im modernen Format.
- Liegt keine da, zeichnet die Seite das hinterlegte Motiv in ihrer Farbwelt.
  Kein graues Kästchen, kein "Bild folgt".

Die Endung ist frei: `.jpg`, `.webp`, `.avif` und `.png` werden alle erkannt.
Entscheidend sind **Ordner und Dateiname**.

## Was zu beachten ist

- **Seitenverhältnis einhalten.** Es steht bei jedem Bild dabei. Wird es
  eingehalten, verschiebt sich beim Einsetzen kein Layout.
- **Breite:** mindestens die doppelte Anzeigebreite. Für Bilder über die
  ganze Breite also rund 2400 px, für Kacheln rund 1200 px.
- **Rechte klären.** Nur Fotos verwenden, für die eine Nutzungserlaubnis
  vorliegt - bei erkennbaren Personen auch deren Einwilligung.
- Die **Alt-Texte stehen schon im Code** und beschreiben, was auf dem Bild zu
  sehen sein soll. Weicht das Foto davon ab, den Alt-Text in der jeweiligen
  Seite mit anpassen.

---

## Morgentau Kaffeerösterei (`/demo/cafe`)

| Datei | Seitenverhältnis | Motiv |
|---|---|---|
| `cafe/hero.jpg` | 4/5 | Barista an der Siebträgermaschine, Blick über die Theke |
| `cafe/roestung-morgentau.jpg` | 1/1 | Helle Röstung Morgentau, Bohnen in der Schale |
| `cafe/roestung-sieben.jpg` | 1/1 | Hausmischung Nummer Sieben, Bohnen in der Schale |
| `cafe/roestung-nachtschicht.jpg` | 1/1 | Dunkle Röstung Nachtschicht, Bohnen in der Schale |
| `cafe/roester.jpg` | 3/4 | Trommelröster in der Rösterei während des Röstvorgangs |
| `cafe/raum-theke.jpg` | 16/11 | Blick in den Gastraum mit Theke am Morgen |
| `cafe/raum-hof.jpg` | 4/5 | Der begrünte Innenhof mit Sitzplätzen |
| `cafe/raum-tisch.jpg` | 4/5 | Gedeckter Tisch mit Frühstücksbrett und Cappuccino |
| `cafe/raum-fenster.jpg` | 16/11 | Fensterplatz mit Blick auf die Lindenstraße |

## NORDLICHT (`/demo/mode`)

| Datei | Seitenverhältnis | Motiv |
|---|---|---|
| `mode/hero.jpg` | 16/8 | Zwei Personen in Mänteln der Serie 04 vor einer Hafenkulisse |
| `mode/editorial.jpg` | 4/5 | Stoffbahnen in der Weberei, Detailaufnahme |
| `mode/kategorie-oberteile.jpg` | 3/4 | Model trägt einen weiten Hoodie vor einer Betonwand |
| `mode/kategorie-hosen.jpg` | 3/4 | Detailaufnahme einer weiten Cargohose im Gehen |
| `mode/kategorie-outerwear.jpg` | 3/4 | Wollmantel, offen getragen, Halbtotale |
| `mode/kategorie-accessoires.jpg` | 3/4 | Ledertasche und Cap auf einer Betonstufe |
| `mode/<produkt>-1.jpg` | 3/4 | … Vorderansicht |
| `mode/<produkt>-2.jpg` | 3/4 | … Rückansicht |
| `mode/<produkt>-3.jpg` | 3/4 | … Stoffdetail |

## Tischlerei Brandhorst (`/demo/handwerk`)

| Datei | Seitenverhältnis | Motiv |
|---|---|---|
| `handwerk/hero.jpg` | 5/4 | Blick in die Werkstatt: Gesellin an der Hobelbank, Späne auf dem Boden |
| `handwerk/leistung-einbau.jpg` | 4/3 | Einbauschrank in einer Altbau-Nische, Eiche geölt |
| `handwerk/leistung-kueche.jpg` | 4/3 | Küchenfront aus Massivholz mit Arbeitsplatte aus Stein |
| `handwerk/leistung-laden.jpg` | 4/3 | Ladeneinrichtung mit Regalwand und Tresen |
| `handwerk/projekt-altbau.jpg` | 3/2 | Wandfüllender Einbauschrank unter einer Dachschräge |
| `handwerk/projekt-kueche.jpg` | 3/2 | Küchenzeile aus Esche mit offenen Fächern |
| `handwerk/projekt-buchladen.jpg` | 3/2 | Regalwand aus Eiche in einer Buchhandlung |
| `handwerk/projekt-treppe.jpg` | 3/2 | Freitragende Holztreppe mit Stahlgeländer |
| `handwerk/team-brandhorst.jpg` | 4/5 | Porträt von Tischlermeister Jonas Brandhorst |
| `handwerk/team-arslan.jpg` | 4/5 | Porträt von Meisterin Derya Arslan |
| `handwerk/team-voss.jpg` | 4/5 | Porträt von Geselle Milan Voß |
| `handwerk/team-kaminski.jpg` | 4/5 | Porträt von Auszubildender Lea Kaminski |

## Freizeitpark Wolkenhain (`/demo/freizeitpark`)

| Datei | Seitenverhältnis | Motiv |
|---|---|---|
| `park/hero.jpg` | 16/8 | Blick über den Park: Holzachterbahn zwischen Baumwipfeln im Abendlicht |
| `park/welt-talstation.jpg` | 3/4 | Alpine Themenwelt Talstation mit Holzhäusern |
| `park/welt-hafen.jpg` | 3/4 | Hafenviertel mit Booten und Kais |
| `park/welt-forst.jpg` | 3/4 | Wilder Forst: Wege zwischen hohen Bäumen |
| `park/welt-wolke.jpg` | 3/4 | Kleine Wolke: Karussell im Kleinkindbereich |
| `park/attraktion-donnerhall.jpg` | 4/3 | Holzachterbahn Donnerhall in der ersten Abfahrt |
| `park/attraktion-nebelschlucht.jpg` | 4/3 | Wildwasserbahn Nebelschlucht am Wasserfall |
| `park/attraktion-eichhorn.jpg` | 4/3 | Familienachterbahn Eichhorn zwischen den Bäumen |
| `park/hotel.jpg` | 4/3 | Waldhotel Wolkenhain: Holzhäuser zwischen Bäumen am Abend |
| `park/essen-forsthaus.jpg` | 16/10 | Teller mit Eintopf im Forsthaus |
| `park/essen-kombuese.jpg` | 16/10 | Fischbrötchen an der Kombüse |
| `park/essen-eiche.jpg` | 16/10 | Eisstand unter der alten Eiche |

---

Für den Shop gilt zusätzlich: Jedes Produkt hat drei Plätze - `<produkt>-1`
(Vorderansicht), `-2` (Rückansicht) und `-3` (Stoffdetail). Die Kennung
`<produkt>` ist der Name aus der Adresszeile, also etwa
`hoodie-werft-1.jpg`. Die vollständige Liste steht in `lib/demo-mode.ts`.
