/**
 * Einfacher In-Memory-Rate-Limiter (Fixed Window) für die Lead-Route.
 * Ausreichend für ein Single-Instance-Deployment. Bei mehreren Instanzen
 * gegen einen geteilten Speicher (z. B. Redis) tauschen - die Signatur
 * bleibt dabei gleich.
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();
const MAX_KEYS = 5000;

export type RateLimitResult = { ok: boolean; remaining: number; retryAfter: number };

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60 * 60 * 1000,
  now = Date.now(),
): RateLimitResult {
  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    if (buckets.size >= MAX_KEYS) sweep(now);
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true, remaining: limit - entry.count, retryAfter: 0 };
}

function sweep(now: number): void {
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key);
  }
  if (buckets.size >= MAX_KEYS) buckets.clear();
}

export function resetRateLimit(): void {
  buckets.clear();
}

/** Client-IP aus den üblichen Proxy-Headern - ausschließlich für Rate-Limiting. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
