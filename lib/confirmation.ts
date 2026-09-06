/**
 * Gemeinsame Angaben für die Bestätigungsseite.
 *
 * Die Adresse bleibt bewusst immer gleich, damit sie sich in Analyse- oder
 * Werbewerkzeugen als festes Ziel hinterlegen lässt. Erreichbar ist die Seite
 * trotzdem nur nach einer tatsächlich abgeschickten Anfrage: die API setzt
 * dafür ein kurzlebiges Kennzeichen, das die Seite prüft.
 */

export const CONFIRMATION_PATH = "/anfrage-gesendet";

export const CONFIRMATION_COOKIE = "novahost_anfrage";

/** Wie lange die Bestätigungsseite nach dem Absenden erreichbar bleibt. */
export const CONFIRMATION_MAX_AGE = 60 * 30;
