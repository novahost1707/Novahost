"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Verstecktes Spiel. Erreichbar über drei Klicks auf die Wortmarke, den
 * Pixel-Würfel in der Fußzeile oder die Tastenfolge "dino".
 *
 * Es ist bewusst ein Easter Egg: nichts auf der Seite bewirbt es, es blockiert
 * keinen Conversion-Weg, und es lädt keine zusätzlichen Dateien - die Grafik
 * besteht aus gezeichneten Rechtecken.
 */

const UNIT = 4;
const GRAVITY = 0.62;
const JUMP = 11.2;
const GROUND_OFFSET = 44;
const KEY_SEQUENCE = "dino";

type Phase = "ready" | "running" | "over";

type Obstacle = { x: number; w: number; h: number; kind: 0 | 1 };

export function DinoGame() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("ready");
  const [best, setBest] = useState(0);
  const [score, setScore] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const phaseRef = useRef<Phase>("ready");
  const jumpRef = useRef<() => void>(() => {});
  const restartRef = useRef<() => void>(() => {});

  phaseRef.current = phase;

  /* --- Aktivierung ---------------------------------------------------- */
  useEffect(() => {
    const onEgg = () => setOpen(true);
    let typed = "";

    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      typed = (typed + event.key.toLowerCase()).slice(-KEY_SEQUENCE.length);
      if (typed === KEY_SEQUENCE) setOpen(true);
    };

    window.addEventListener("novahost:easteregg", onEgg);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("novahost:easteregg", onEgg);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    try {
      setBest(Number(window.localStorage.getItem("novahost:dino:best") ?? 0));
    } catch {
      setBest(0);
    }
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setPhase("ready");
    setScore(0);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* --- Spiel ---------------------------------------------------------- */
  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;

    let dinoY = 0;
    let velocity = 0;
    let obstacles: Obstacle[] = [];
    let speed = 6.4;
    let points = 0;
    let nextGap = 90;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = false;
    };

    const reset = () => {
      dinoY = 0;
      velocity = 0;
      obstacles = [];
      speed = 6.4;
      points = 0;
      nextGap = 90;
      frame = 0;
      setScore(0);
    };

    // Auf ganze Pixel runden: sonst rendern die Rechtecke mit Kantenglaettung
    // und die Pixelgrafik bekommt sichtbare Naehte.
    const groundY = () => Math.round(height - GROUND_OFFSET);

    /* Pixel-Dino: Rechteck-Raster, kein Bild, keine Fremdgrafik. */
    const drawDino = (x: number, y: number, running: boolean) => {
      const rows = [
        "......xxxxx.",
        "......xx.xx.",
        "......xxxxx.",
        "......xxxx..",
        "x.....xxxxx.",
        "x....xxxxxxx",
        "xx..xxxxxxx.",
        "xxxxxxxxxx..",
        ".xxxxxxxxx..",
        "..xxxxxxxx..",
        "...xxxxxx...",
        "...xxx.xx...",
        "...xx...x...",
        "...x....xx..",
      ];
      const step = running && Math.floor(frame / 6) % 2 === 0;
      context.fillStyle = "#97a390";
      rows.forEach((row, rowIndex) => {
        for (let colIndex = 0; colIndex < row.length; colIndex += 1) {
          if (row[colIndex] !== "x") continue;
          // Beinwechsel: die untersten beiden Reihen versetzt zeichnen
          const shift = step && rowIndex >= rows.length - 2 ? UNIT : 0;
          context.fillRect(
            Math.round(x) + colIndex * UNIT + shift,
            Math.round(y) + rowIndex * UNIT,
            UNIT,
            UNIT,
          );
        }
      });
    };

    const drawObstacle = (obstacle: Obstacle) => {
      context.fillStyle = "#5c6257";
      const y = groundY() - obstacle.h;
      const x = Math.round(obstacle.x);
      context.fillRect(x, y, obstacle.w, obstacle.h);
      // Pixel-Struktur: zwei helle Kerben, damit es nicht wie ein Balken wirkt
      context.fillStyle = "#0a0b0a";
      context.fillRect(x + UNIT, y + UNIT * 2, obstacle.w - UNIT * 2, UNIT);
      if (obstacle.kind === 1) {
        context.fillRect(x + UNIT, y + UNIT * 5, obstacle.w - UNIT * 2, UNIT);
      }
    };

    const drawGround = () => {
      const y = groundY();
      context.fillStyle = "#262a24";
      context.fillRect(0, y, width, 1);
      context.fillStyle = "#1c1f1b";
      for (let x = -(frame * speed) % (UNIT * 8); x < width; x += UNIT * 8) {
        context.fillRect(Math.round(x), y + UNIT * 2, UNIT * 3, UNIT);
      }
    };

    const dinoBox = () => ({
      x: 64 + UNIT,
      y: groundY() - 14 * UNIT - dinoY,
      w: 10 * UNIT,
      h: 14 * UNIT,
    });

    const hits = (obstacle: Obstacle) => {
      const dino = dinoBox();
      const oy = groundY() - obstacle.h;
      const pad = UNIT;
      return (
        dino.x + pad < obstacle.x + obstacle.w &&
        dino.x + dino.w - pad > obstacle.x &&
        dino.y + pad < oy + obstacle.h &&
        dino.y + dino.h > oy + pad
      );
    };

    const spawn = () => {
      const kind: 0 | 1 = Math.random() > 0.62 ? 1 : 0;
      obstacles.push({
        x: width + 20,
        w: kind === 1 ? UNIT * 6 : UNIT * 4,
        h: kind === 1 ? UNIT * 10 : UNIT * 7,
        kind,
      });
      nextGap = Math.max(52, 118 - speed * 5) + Math.random() * 70;
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      frame += 1;
      context.clearRect(0, 0, width, height);
      drawGround();

      const running = phaseRef.current === "running";

      if (running) {
        velocity -= GRAVITY;
        dinoY = Math.max(0, dinoY + velocity);
        if (dinoY === 0) velocity = 0;

        speed += 0.0016;
        points += 0.16;
        const rounded = Math.floor(points);
        if (rounded !== Math.floor(points - 0.16)) setScore(rounded);

        if (frame % Math.round(nextGap / (speed / 6.4)) === 0) spawn();

        obstacles.forEach((obstacle) => {
          obstacle.x -= speed;
        });
        obstacles = obstacles.filter((obstacle) => obstacle.x + obstacle.w > -40);

        if (obstacles.some(hits)) {
          setPhase("over");
          phaseRef.current = "over";
          const final = Math.floor(points);
          setBest((current) => {
            if (final <= current) return current;
            try {
              window.localStorage.setItem("novahost:dino:best", String(final));
            } catch {
              /* privater Modus o. ae. - Highscore dann nur für diese Sitzung */
            }
            return final;
          });
        }
      }

      obstacles.forEach(drawObstacle);
      drawDino(64, groundY() - 14 * UNIT - Math.round(dinoY), running && dinoY === 0);
    };

    const jump = () => {
      if (phaseRef.current === "ready") {
        reset();
        setPhase("running");
        phaseRef.current = "running";
        velocity = JUMP;
        return;
      }
      if (phaseRef.current === "running" && dinoY === 0) velocity = JUMP;
    };

    const restart = () => {
      reset();
      setPhase("running");
      phaseRef.current = "running";
    };

    jumpRef.current = jump;
    restartRef.current = restart;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key === " " || event.key === "ArrowUp" || event.key === "w") {
        event.preventDefault();
        if (phaseRef.current === "over") restart();
        else jump();
      }
      if (event.key.toLowerCase() === "r" && phaseRef.current === "over") restart();
    };

    const onPointer = () => {
      if (phaseRef.current === "over") restart();
      else jump();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    reset();
    raf = requestAnimationFrame(loop);
    window.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onPointer);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="dino" role="dialog" aria-modal="true" aria-label="Verstecktes Spiel">
      <div className="dino__frame">
        <header className="dino__bar">
          <p className="pixel">
            <span className="chip__dot" aria-hidden="true" /> NOVAHOST / RUNNER
          </p>
          <div className="dino__scores pixel">
            <span>SCORE {String(score).padStart(5, "0")}</span>
            <span className="muted">BEST {String(best).padStart(5, "0")}</span>
          </div>
          <button ref={closeRef} type="button" className="dino__close pixel" onClick={close}>
            SCHLIESSEN [ESC]
          </button>
        </header>

        <div className="dino__stage">
          <canvas ref={canvasRef} className="dino__canvas" />

          {phase !== "running" && (
            <div className="dino__overlay">
              {phase === "ready" ? (
                <>
                  <p className="dino__title display">DU HAST ES GEFUNDEN.</p>
                  <p className="pixel muted">TIPPEN ODER LEERTASTE ZUM STARTEN</p>
                </>
              ) : (
                <>
                  <p className="dino__title display">GAME OVER</p>
                  <p className="pixel">SCORE {String(score).padStart(5, "0")}</p>
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => restartRef.current()}>
                    <span className="btn__label">Nochmal [R]</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <footer className="dino__foot mono">
          Zurück zur Arbeit:{" "}
          <button type="button" className="tlink" onClick={close}>Seite weiterlesen</button>
        </footer>
      </div>
    </div>
  );
}
