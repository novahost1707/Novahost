"use client";

import { openConsentSettings } from "@/lib/consent";
import { cn } from "@/lib/utils";

interface ConsentSettingsButtonProps {
  className?: string;
}

/**
 * Oeffnet die Einwilligungs-Einstellungen erneut.
 *
 * Eine eigene kleine Client-Komponente, damit der Footer eine Server Component
 * bleiben kann — nur dieser eine Knopf braucht einen Klick-Handler.
 *
 * Der Widerruf muss genauso leicht erreichbar sein wie die Zustimmung. Deshalb
 * steht der Knopf im Footer jeder Seite, direkt neben Impressum und
 * Datenschutz, und sieht aus wie die Links daneben.
 */
export default function ConsentSettingsButton({
  className,
}: ConsentSettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className={cn("footer-link text-left", className)}
    >
      Cookie-Einstellungen
    </button>
  );
}
