/**
 * Sehr einfacher Spam-Schutz: Zaehlung pro Schluessel (IP) in einem festen
 * Zeitfenster, im Arbeitsspeicher der Instanz.
 *
 * Bewusste Einschraenkung: Auf Vercel laeuft jede Serverless-Instanz mit
 * eigenem Speicher, und Instanzen werden recycelt. Das bremst einfache Fluten
 * zuverlaessig aus, ist aber kein verteiltes Limit. Dafuer braucht es keine
 * zusaetzliche Infrastruktur (Redis o. ae.). Zusammen mit dem Honeypot-Feld
 * im Formular reicht das fuer eine Kontaktseite dieser Groesse.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Verhindert, dass die Map bei vielen verschiedenen IPs unbegrenzt waechst. */
const MAX_TRACKED_KEYS = 5000;

export interface RateLimitOptions {
  /** Erlaubte Anfragen pro Fenster. */
  limit: number;
  /** Fensterlaenge in Millisekunden. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Sekunden bis zum Zuruecksetzen — fuer den Retry-After-Header. */
  retryAfterSeconds: number;
}

function prune(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function checkRateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions,
  now: number = Date.now(),
): RateLimitResult {
  if (buckets.size > MAX_TRACKED_KEYS) prune(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/** Nur fuer Tests: setzt den Zaehlerstand zurueck. */
export function resetRateLimit(): void {
  buckets.clear();
}
