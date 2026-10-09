"use client";

import { useEffect, useRef } from "react";

const FPS = 24;
const pad = (n: number) => String(n).padStart(2, "0");

/** A running HH:MM:SS:FF counter, written straight to the DOM to avoid re-rendering. */
export function Timecode({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const frames = Math.floor(((now - start) / 1000) * FPS);
      const seconds = Math.floor(frames / FPS);
      if (ref.current) {
        ref.current.textContent = `${pad(Math.floor(seconds / 3600))}:${pad(
          Math.floor(seconds / 60) % 60,
        )}:${pad(seconds % 60)}:${pad(frames % FPS)}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      00:00:00:00
    </span>
  );
}
