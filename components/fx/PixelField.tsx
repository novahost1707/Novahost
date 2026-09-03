"use client";

import { useEffect, useRef } from "react";

/**
 * Das visuelle Signatur-Element der Marke: ein Feld aus Pixeln, durch das eine
 * sehr langsame diagonale Welle läuft und das auf den Zeiger reagiert.
 *
 * Performance-Regeln, die hier gelten:
 * - eine einzige Canvas statt hunderter DOM-Knoten
 * - Device-Pixel-Ratio auf 2 begrenzt
 * - Zeichnen pausiert, sobald das Feld außerhalb des Viewports liegt
 * - auf groben Zeigern (Touch) gröbere Zellen und halbe Bildrate
 * - bei prefers-reduced-motion nur ein statisches Einzelbild
 */
export function PixelField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const cell = coarse ? 22 : 16;
    const gap = 1;
    const frameBudget = coarse ? 1000 / 30 : 1000 / 60;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let frame = 0;
    let last = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
      draw(performance.now());
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const t = time / 1000;
      const radius = 170;

      for (let row = 0; row < rows; row += 1) {
        const y = row * cell;
        for (let col = 0; col < cols; col += 1) {
          const x = col * cell;

          // Zwei ueberlagerte Wellen unterschiedlicher Frequenz: das Muster
          // wirkt organisch statt gestreift, kostet aber nur eine zweite
          // Sinus-Berechnung pro Zelle.
          const wave = Math.sin((col + row) * 0.26 - t * 0.5);
          const drift = Math.sin(col * 0.12 - row * 0.2 + t * 0.29);
          let alpha = 0.045 + Math.max(0, wave * 0.62 + drift * 0.48) * 0.12;
          let green = 0;

          if (pointer.active) {
            const dx = x + cell / 2 - pointer.x;
            const dy = y + cell / 2 - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < radius) {
              const falloff = 1 - distance / radius;
              const eased = falloff * falloff;
              alpha += eased * 0.62;
              green = eased;
            }
          }

          if (alpha <= 0.048) continue;

          // Zwei Töne: neutrales Grau im Feld, Moosgrün nahe am Zeiger
          context.fillStyle =
            green > 0.02
              ? `rgba(${Math.round(151 - green * 30)}, ${Math.round(163 + green * 12)}, ${Math.round(144 - green * 20)}, ${alpha})`
              : `rgba(210, 214, 205, ${alpha})`;
          context.fillRect(x, y, cell - gap, cell - gap);
        }
      }
    };

    const loop = (time: number) => {
      if (time - last >= frameBudget) {
        last = time;
        draw(time);
      }
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      if (reduced) draw(performance.now());
    };

    const onPointerLeave = () => {
      pointer.active = false;
      if (reduced) draw(performance.now());
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry?.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    observer.observe(canvas);
    resize();

    if (!coarse) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    }
    document.addEventListener("visibilitychange", () =>
      document.hidden ? stop() : start(),
    );

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="pixelfield" aria-hidden="true" />;
}
