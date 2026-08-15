"use client";

import { useEffect, useState } from "react";

/**
 * Gibt das aktuelle Jahr aus (dynamisches Copyright wie in der HTML-Version).
 * Der Wert wird nach dem Mounten erneut gesetzt, damit statisch erzeugte
 * Seiten nach einem Jahreswechsel nicht veralten.
 */
export default function CurrentYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}
