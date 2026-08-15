/**
 * Tests der Einwilligungs-Logik.
 *
 * Geprüft wird ausschließlich der reine Teil von lib/consent.ts — er kommt
 * ohne Browser aus. Der Kern jeder Prüfung ist derselbe: Zustimmung darf nie
 * aus Versehen entstehen. Fehlt etwas, ist etwas kaputt oder veraltet, muss
 * das Ergebnis „nicht zugestimmt“ lauten.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ALL_CATEGORIES,
  CONSENT_VERSION,
  acceptAllConsent,
  createConsent,
  isAllowed,
  parseConsent,
  rejectAllConsent,
  serializeConsent,
} from "@/lib/consent";

const FIXED_DATE = new Date("2026-05-04T10:15:00Z");

describe("createConsent", () => {
  it("setzt Notwendiges immer auf true", () => {
    assert.equal(createConsent({}, FIXED_DATE).categories.necessary, true);
  });

  it("lehnt alles Optionale ab, was nicht ausdrücklich zugestimmt wurde", () => {
    const state = createConsent({ statistics: true }, FIXED_DATE);

    assert.equal(state.categories.statistics, true);
    assert.equal(state.categories.marketing, false);
  });

  it("wertet nur echtes true als Zustimmung", () => {
    // Ein truthy Wert aus einer fremden Quelle darf nicht durchrutschen.
    const state = createConsent(
      { statistics: "ja" as unknown as boolean },
      FIXED_DATE,
    );

    assert.equal(state.categories.statistics, false);
  });

  it("hält Version und Zeitpunkt fest", () => {
    const state = createConsent({}, FIXED_DATE);

    assert.equal(state.version, CONSENT_VERSION);
    assert.equal(state.decidedAt, "2026-05-04T10:15:00.000Z");
  });
});

describe("acceptAllConsent / rejectAllConsent", () => {
  it("akzeptiert sämtliche Kategorien", () => {
    const state = acceptAllConsent(FIXED_DATE);

    for (const category of ALL_CATEGORIES) {
      assert.equal(state.categories[category], true, `fehlt: ${category}`);
    }
  });

  it("lehnt alles Optionale ab, behält aber Notwendiges", () => {
    const state = rejectAllConsent(FIXED_DATE);

    assert.equal(state.categories.necessary, true);
    assert.equal(state.categories.statistics, false);
    assert.equal(state.categories.marketing, false);
  });
});

describe("parseConsent", () => {
  it("liest eine selbst geschriebene Entscheidung zurück", () => {
    const state = createConsent({ marketing: true }, FIXED_DATE);

    assert.deepEqual(parseConsent(serializeConsent(state)), state);
  });

  it("gibt null zurück, wenn nichts gespeichert ist", () => {
    for (const input of [null, undefined, ""]) {
      assert.equal(parseConsent(input), null);
    }
  });

  it("gibt null zurück bei kaputtem JSON", () => {
    assert.equal(parseConsent("{ kaputt"), null);
  });

  it("gibt null zurück, wenn der Wert kein Objekt ist", () => {
    for (const input of ["null", '"ja"', "42", "[]", "true"]) {
      assert.equal(parseConsent(input), null, `sollte null sein: ${input}`);
    }
  });

  it("verwirft eine ältere Fassung der Abfrage", () => {
    const outdated = JSON.stringify({
      ...createConsent({ statistics: true }, FIXED_DATE),
      version: CONSENT_VERSION - 1,
    });

    assert.equal(parseConsent(outdated), null);
  });

  it("verwirft fehlende oder falsch getippte Kategorien", () => {
    const missing = JSON.stringify({
      version: CONSENT_VERSION,
      decidedAt: FIXED_DATE.toISOString(),
      categories: { necessary: true, statistics: true },
    });

    const wrongType = JSON.stringify({
      version: CONSENT_VERSION,
      decidedAt: FIXED_DATE.toISOString(),
      categories: { necessary: true, statistics: "ja", marketing: false },
    });

    assert.equal(parseConsent(missing), null);
    assert.equal(parseConsent(wrongType), null);
  });

  it("verwirft einen fehlenden Zeitpunkt", () => {
    const withoutDate = JSON.stringify({
      version: CONSENT_VERSION,
      decidedAt: "",
      categories: { necessary: true, statistics: false, marketing: false },
    });

    assert.equal(parseConsent(withoutDate), null);
  });

  it("stellt Notwendiges wieder her, falls es manipuliert wurde", () => {
    const tampered = JSON.stringify({
      version: CONSENT_VERSION,
      decidedAt: FIXED_DATE.toISOString(),
      categories: { necessary: false, statistics: false, marketing: false },
    });

    assert.equal(parseConsent(tampered)?.categories.necessary, true);
  });
});

describe("isAllowed", () => {
  it("erlaubt Notwendiges auch ohne Entscheidung", () => {
    assert.equal(isAllowed(null, "necessary"), true);
  });

  it("verweigert alles Optionale ohne Entscheidung", () => {
    assert.equal(isAllowed(null, "statistics"), false);
    assert.equal(isAllowed(null, "marketing"), false);
  });

  it("folgt der getroffenen Entscheidung", () => {
    const state = createConsent({ statistics: true }, FIXED_DATE);

    assert.equal(isAllowed(state, "statistics"), true);
    assert.equal(isAllowed(state, "marketing"), false);
  });
});
