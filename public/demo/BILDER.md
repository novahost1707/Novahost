# Bilder für die Demo-Projekte

Die Demo-Seiten sind so gebaut, dass echte Fotos **ohne Codeänderung**
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

## ARVO (`/demo/mode`)

Der Shop hat zwei Sorten Bilder: die Flächen der Seite selbst und je drei
Aufnahmen pro Artikel.

### Seitenbilder

| Datei | Seitenverhältnis | Motiv |
|---|---|---|
| `mode/hero.jpg` | 16/8 | Zwei Personen in Mänteln der Serie 04 vor einer Hafenkulisse |
| `mode/einstieg-damen.jpg` | 3/2 | Model in weiter Hose und Ripp-Shirt, Ganzkörperaufnahme |
| `mode/einstieg-herren.jpg` | 3/2 | Model in Bomberjacke und Cargohose, Ganzkörperaufnahme |
| `mode/editorial.jpg` | 4/5 | Stoffbahnen in der Weberei, Detailaufnahme |
| `mode/kategorie-shirts.jpg` | 4/5 | Model trägt ein weites Shirt vor einer Betonwand |
| `mode/kategorie-sweats.jpg` | 4/5 | Detailaufnahme eines schweren Hoodies |
| `mode/kategorie-hosen.jpg` | 4/5 | Weite Cargohose im Gehen |
| `mode/kategorie-jacken.jpg` | 4/5 | Wollmantel, offen getragen |
| `mode/kategorie-accessoires.jpg` | 4/5 | Ledertasche und Cap auf einer Betonstufe |

### Artikelbilder

Jeder Artikel hat drei Plätze, alle im Seitenverhältnis **4/5**:

- `mode/<artikel>-1.jpg` - Vorderansicht, getragen
- `mode/<artikel>-2.jpg` - Rückansicht, getragen
- `mode/<artikel>-3.jpg` - Stoffdetail aus der Nähe

Das erste Bild ist zugleich das Bild in Raster, Warenkorb und Favoriten - es
sollte für sich allein funktionieren.

| Artikel | Dateiname |
|---|---|
| T-Shirt Kern | `mode/tee-kern-1.jpg`, `-2`, `-3` |
| Longsleeve Nord | `mode/longsleeve-nord-1.jpg`, `-2`, `-3` |
| Leinenhemd Vika | `mode/hemd-vika-1.jpg`, `-2`, `-3` |
| Ripp-Shirt Linie | `mode/shirt-linie-1.jpg`, `-2`, `-3` |
| Hoodie Werft | `mode/hoodie-werft-1.jpg`, `-2`, `-3` |
| Zip-Hoodie Kai | `mode/hoodie-kai-1.jpg`, `-2`, `-3` |
| Sweater Kante | `mode/sweater-kante-1.jpg`, `-2`, `-3` |
| Strickpullover Dock | `mode/strick-dock-1.jpg`, `-2`, `-3` |
| Cargohose Kai | `mode/hose-kai-1.jpg`, `-2`, `-3` |
| Weite Hose Ebbe | `mode/hose-ebbe-1.jpg`, `-2`, `-3` |
| Jogger Deich | `mode/jogger-deich-1.jpg`, `-2`, `-3` |
| Wollmantel Fjord | `mode/mantel-fjord-1.jpg`, `-2`, `-3` |
| Bomber Halde | `mode/jacke-halde-1.jpg`, `-2`, `-3` |
| Steppjacke Möwe | `mode/jacke-moewe-1.jpg`, `-2`, `-3` |
| Tasche Skagen | `mode/tasche-skagen-1.jpg`, `-2`, `-3` |
| Cap Signal | `mode/cap-signal-1.jpg`, `-2`, `-3` |
| Mütze Ripp | `mode/muetze-ripp-1.jpg`, `-2`, `-3` |
| Gürtel Kante | `mode/guertel-kante-1.jpg`, `-2`, `-3` |

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

## Restaurant Amsel (`/demo/restaurant`)

Die Seite steht auf fast schwarzem Grund. Fotos wirken dort am besten, wenn sie
warm und eher dunkel belichtet sind - harte, kalte Aufnahmen brechen die Ruhe.

| Datei | Seitenverhältnis | Motiv |
|---|---|---|
| `restaurant/hero.jpg` | 16/9 | Der Gastraum am Abend, gedeckte Tische unter Messingleuchten |
| `restaurant/konzept.jpg` | 4/5 | Blick in die offene Küche während des Service |
| `restaurant/kuechenchef.jpg` | 4/5 | Porträt der Küchenchefin am Pass |
| `restaurant/gericht-saibling.jpg` | 1/1 | Saibling mit Gurke und Buttermilch, von oben |
| `restaurant/gericht-sellerie.jpg` | 1/1 | Sellerie in Salzteig mit Haselnuss, von oben |
| `restaurant/gericht-taube.jpg` | 1/1 | Taube mit Rote Bete und Wacholder, von oben |
| `restaurant/raum-saal.jpg` | 16/11 | Der Saal mit hohen Fenstern und alten Dielen |
| `restaurant/raum-bar.jpg` | 4/5 | Die Bar mit Weinregal aus Eiche |
| `restaurant/raum-detail.jpg` | 4/5 | Detail: Kräuter aus dem eigenen Garten |
| `restaurant/raum-tisch.jpg` | 16/11 | Gedeckter Tisch am Fenster zur blauen Stunde |

---

## Was passiert, wenn kein Foto da ist

Jeder Platz hat ein hinterlegtes Motiv - eine gezeichnete Fläche in den Farben
der jeweiligen Seite, kein Platzhalter. Die Seite ist damit vollständig
vorzeigbar. Sobald eine Datei im Ordner liegt, ersetzt das Foto die Zeichnung
beim nächsten Build, ohne dass am Code etwas geändert werden muss.
