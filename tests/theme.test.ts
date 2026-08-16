/**
 * Tests der Theme-Logik.
 *
 * Geprüft wird der reine Teil von lib/theme.ts — er kommt ohne DOM aus.
 * Wichtigster Punkt: eine kaputte oder fremde Eingabe darf die Seite nie in
 * einen undefinierten Zustand bringen, sondern muss auf „System“ zurückfallen.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DEFAULT_THEME,
  THEME_INIT_SCRIPT,
  THEME_ORDER,
  THEME_STORAGE_KEY,
  isThemeChoice,
  nextTheme,
  parseTheme,
  resolveTheme,
  themeLabel,
} from "@/lib/theme";
import type { ThemeChoice } from "@/types";

describe("parseTheme", () => {
  it("übernimmt gültige Werte unverändert", () => {
    for (const choice of ["light", "dark", "system"] as ThemeChoice[]) {
      assert.equal(parseTheme(choice), choice);
    }
  });

  it("fällt bei fehlendem Wert auf die Voreinstellung zurück", () => {
    for (const input of [null, undefined, ""]) {
      assert.equal(parseTheme(input), DEFAULT_THEME);
    }
  });

  it("fällt bei unbekanntem Wert auf die Voreinstellung zurück", () => {
    for (const input of ["hell", "DARK", "true", "{}"]) {
      assert.equal(parseTheme(input), DEFAULT_THEME, `sollte Standard sein: ${input}`);
    }
  });

  it("hat System als Voreinstellung", () => {
    assert.equal(DEFAULT_THEME, "system");
  });
});

describe("isThemeChoice", () => {
  it("erkennt gültige Werte", () => {
    assert.ok(isThemeChoice("light"));
    assert.ok(isThemeChoice("dark"));
    assert.ok(isThemeChoice("system"));
  });

  it("weist alles andere ab", () => {
    for (const input of [null, undefined, 42, {}, [], "auto", true]) {
      assert.equal(isThemeChoice(input), false, `sollte ungültig sein: ${String(input)}`);
    }
  });
});

describe("resolveTheme", () => {
  it("gibt eine ausdrückliche Wahl unverändert zurück", () => {
    // Die Systemeinstellung darf eine getroffene Wahl nicht überstimmen.
    assert.equal(resolveTheme("light", true), "light");
    assert.equal(resolveTheme("dark", false), "dark");
  });

  it("folgt bei „system“ der Systemeinstellung", () => {
    assert.equal(resolveTheme("system", true), "dark");
    assert.equal(resolveTheme("system", false), "light");
  });
});

describe("nextTheme", () => {
  it("schaltet im Kreis: hell → dunkel → System → hell", () => {
    assert.equal(nextTheme("light"), "dark");
    assert.equal(nextTheme("dark"), "system");
    assert.equal(nextTheme("system"), "light");
  });

  it("erreicht in einem vollen Durchlauf jeden Zustand genau einmal", () => {
    const seen = new Set<ThemeChoice>();
    let current: ThemeChoice = "light";

    for (let step = 0; step < THEME_ORDER.length; step += 1) {
      seen.add(current);
      current = nextTheme(current);
    }

    assert.equal(seen.size, THEME_ORDER.length);
    assert.equal(current, "light", "nach einem vollen Durchlauf wieder am Anfang");
  });
});

describe("themeLabel", () => {
  it("liefert für jede Wahl einen eigenen Text", () => {
    const labels = THEME_ORDER.map(themeLabel);

    assert.equal(new Set(labels).size, THEME_ORDER.length);
    for (const label of labels) {
      assert.ok(label.length > 0);
    }
  });
});

describe("THEME_INIT_SCRIPT", () => {
  it("nennt den Speicherschlüssel", () => {
    assert.ok(THEME_INIT_SCRIPT.includes(THEME_STORAGE_KEY));
  });

  it("setzt data-theme nur bei ausdrücklicher Wahl", () => {
    // Bei "system" darf kein Attribut gesetzt werden, sonst greift die
    // prefers-color-scheme-Regel nicht mehr.
    assert.ok(THEME_INIT_SCRIPT.includes('c==="dark"||c==="light"'));
    assert.ok(!THEME_INIT_SCRIPT.includes('"system"'));
  });

  it("ist gegen fehlenden Speicher abgesichert", () => {
    // Ohne try/catch wuerde eine geworfene Ausnahme das Rendern anhalten.
    assert.ok(THEME_INIT_SCRIPT.includes("try{"));
    assert.ok(THEME_INIT_SCRIPT.includes("catch"));
  });

  it("enthält kein schließendes Script-Tag", () => {
    // Sonst würde das Inline-Skript im HTML vorzeitig beendet.
    assert.ok(!THEME_INIT_SCRIPT.toLowerCase().includes("</script"));
  });
});
