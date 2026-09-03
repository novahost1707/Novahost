import { beforeEach, describe, expect, it } from "vitest";
import { clientKey, rateLimit, resetRateLimit } from "@/lib/rate-limit";

describe("rateLimit", () => {
  beforeEach(() => resetRateLimit());

  it("laesst Anfragen bis zum Limit durch", () => {
    for (let i = 0; i < 3; i += 1) {
      expect(rateLimit("ip", 3, 1000).ok).toBe(true);
    }
    expect(rateLimit("ip", 3, 1000).ok).toBe(false);
  });

  it("nennt eine Wartezeit, wenn das Limit erreicht ist", () => {
    rateLimit("ip", 1, 60_000, 0);
    const blocked = rateLimit("ip", 1, 60_000, 0);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBe(60);
  });

  it("oeffnet nach Ablauf des Zeitfensters wieder", () => {
    rateLimit("ip", 1, 1000, 0);
    expect(rateLimit("ip", 1, 1000, 500).ok).toBe(false);
    expect(rateLimit("ip", 1, 1000, 1500).ok).toBe(true);
  });

  it("zaehlt je Schluessel getrennt", () => {
    rateLimit("a", 1, 1000);
    expect(rateLimit("b", 1, 1000).ok).toBe(true);
  });
});

describe("clientKey", () => {
  it("nimmt die erste IP aus x-forwarded-for", () => {
    expect(clientKey(new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" }))).toBe("1.2.3.4");
  });

  it("faellt auf x-real-ip und dann auf unknown zurueck", () => {
    expect(clientKey(new Headers({ "x-real-ip": "9.9.9.9" }))).toBe("9.9.9.9");
    expect(clientKey(new Headers())).toBe("unknown");
  });
});
