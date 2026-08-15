import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

const OPTIONS = { limit: 3, windowMs: 60_000 };

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimit();
  });

  it("lässt Anfragen bis zum Limit durch", () => {
    for (let attempt = 1; attempt <= OPTIONS.limit; attempt += 1) {
      assert.equal(
        checkRateLimit("1.2.3.4", OPTIONS, 0).allowed,
        true,
        `Versuch ${attempt} sollte erlaubt sein`,
      );
    }
  });

  it("blockt die Anfrage nach dem Limit", () => {
    for (let attempt = 0; attempt < OPTIONS.limit; attempt += 1) {
      checkRateLimit("1.2.3.4", OPTIONS, 0);
    }

    const blocked = checkRateLimit("1.2.3.4", OPTIONS, 0);

    assert.equal(blocked.allowed, false);
    assert.ok(blocked.retryAfterSeconds > 0);
  });

  it("zählt pro Schlüssel getrennt", () => {
    for (let attempt = 0; attempt <= OPTIONS.limit; attempt += 1) {
      checkRateLimit("1.2.3.4", OPTIONS, 0);
    }

    assert.equal(checkRateLimit("5.6.7.8", OPTIONS, 0).allowed, true);
  });

  it("gibt nach Ablauf des Fensters wieder frei", () => {
    for (let attempt = 0; attempt <= OPTIONS.limit; attempt += 1) {
      checkRateLimit("1.2.3.4", OPTIONS, 0);
    }

    assert.equal(checkRateLimit("1.2.3.4", OPTIONS, 0).allowed, false);
    assert.equal(
      checkRateLimit("1.2.3.4", OPTIONS, OPTIONS.windowMs + 1).allowed,
      true,
    );
  });
});
