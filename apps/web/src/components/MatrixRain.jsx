"use client";

import { useEffect, useRef } from "react";

/**
 * MatrixRain — digital-rain canvas backdrop inspired by The Matrix.
 * Renders columns of falling katakana + digit glyphs. The rendered
 * canvas is masked with a radial gradient so the edges fade to full
 * transparency (no hard borders, looks like a soft cloud).
 *
 * Respects prefers-reduced-motion (renders a single static frame).
 *
 * Usage:
 *   <div className="relative">
 *     <MatrixRain />
 *     <h1>Title</h1>
 *   </div>
 */
export default function MatrixRain({
  color = "#2dbf6e",
  background = "rgba(255,255,255,0.12)",
  density = 1,
  speed = 1,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    const glyphs =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
    const FONT_SIZE = 16;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.max(1, Math.ceil((width / FONT_SIZE) * density));
      drops = new Array(columns)
        .fill(0)
        .map(() => Math.floor(Math.random() * (height / FONT_SIZE)));
    }

    function drawFrame() {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px "Courier New", monospace`;
      ctx.fillStyle = color;
      for (let i = 0; i < columns; i++) {
        const text = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = (i * width) / columns;
        const y = drops[i] * FONT_SIZE;
        ctx.fillText(text, x, y);
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 1;
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduceMotion) {
      ctx.clearRect(0, 0, width, height);
      drawFrame();
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = 0;
    const frameMs = 80 / speed;
    function loop(ts) {
      if (ts - last > frameMs) {
        drawFrame();
        last = ts;
      }
      raf = requestAnimationFrame(loop);
    }
    ctx.clearRect(0, 0, width, height);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color, background, density, speed]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
      style={{
        WebkitMaskImage:
          "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 85%)",
        maskImage:
          "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 85%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
