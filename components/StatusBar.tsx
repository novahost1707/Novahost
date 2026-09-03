"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/content";

/**
 * Statusleiste am unteren Rand — wie in einem Editor.
 *
 * Zeigt links das Projekt, rechts den Abschnitt, in dem man gerade ist, und
 * den Lesefortschritt. Sie ist der bestaendigste Teil der Werkzeug-Aesthetik:
 * eine schmale Leiste, die immer da ist, egal wo man sich befindet.
 *
 * Bewusst rein dekorativ (`aria-hidden`): jede Angabe darin steht anderswo
 * schon als richtiger Inhalt — die Abschnittsnamen in der Navigation, der
 * Fortschritt im Scrollbalken. Fuer Screenreader waere sie nur Laerm.
 *
 * Unter 900px ausgeblendet: dort ist der Platz zu knapp, und der
 * Einwilligungsbanner sitzt an derselben Stelle.
 */
export default function StatusBar() {
  const [section, setSection] = useState<string>("hero");
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const read = () => {
      frame.current = null;

      const scrollY = window.scrollY;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(scrollY / scrollable, 1) : 0);

      // Derselbe Schwellenwert wie in der Navigation: ein Abschnitt gilt als
      // aktiv, sobald seine Oberkante ein Drittel der Hoehe passiert hat.
      const line = window.innerHeight * 0.34;
      let current = "hero";

      for (const link of navLinks) {
        const element = document.querySelector(link.hash);
        if (element && element.getBoundingClientRect().top <= line) {
          current = link.hash.slice(1);
        }
      }

      setSection(current);
    };

    const onScroll = () => {
      if (frame.current === null) frame.current = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="statusbar fixed right-0 bottom-0 left-0 z-[70] flex h-[26px] items-center justify-between gap-6 px-4 text-[11px] max-[900px]:hidden"
    >
      <span className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-[6px] w-[6px] rounded-full bg-nh-ok" />
          nova-host/website
        </span>
        <span className="opacity-55">main</span>
      </span>

      <span className="flex items-center gap-5">
        <span className="opacity-55">TypeScript</span>
        <span>{section}</span>
        <span className="w-[46px] text-right tabular-nums opacity-55">
          {Math.round(progress * 100)} %
        </span>
      </span>
    </div>
  );
}
