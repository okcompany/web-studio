"use client";

import { useEffect, useState } from "react";

// Tiny hearts that float up from the cursor when a user clicks anywhere
// with data-heart-burst (or a button/link inside such a container).
// Global listener — drop this component once near the root.
const COLORS = ["#E57373", "#F0C5A9", "#D4C5F9", "#A8D5BA"];

export default function HeartBurst() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    function onClick(e) {
      const target = e.target.closest("[data-heart-burst], a.heart-burst, button.heart-burst");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const burst = Array.from({ length: 6 }).map((_, i) => ({
        id: Math.random().toString(36).slice(2),
        x: cx + (Math.random() - 0.5) * 24,
        y: cy,
        dx: (Math.random() - 0.5) * 80,
        dy: -60 - Math.random() * 60,
        color: COLORS[i % COLORS.length],
        size: 14 + Math.random() * 8,
      }));
      setHearts((h) => [...h, ...burst]);
      window.setTimeout(() => {
        setHearts((h) => h.filter((x) => !burst.find((b) => b.id === x.id)));
      }, 1100);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" aria-hidden="true">
      {hearts.map((h) => (
        <svg
          key={h.id}
          viewBox="0 0 24 24"
          width={h.size}
          height={h.size}
          className="heart-burst-particle"
          style={{
            position: "fixed",
            left: h.x - h.size / 2,
            top: h.y - h.size / 2,
            "--dx": `${h.dx}px`,
            "--dy": `${h.dy}px`,
          }}
        >
          <path
            d="M12 20.5 S3.5 14 3.5 8.8 A4.3 4.3 0 0 1 12 7.2 A4.3 4.3 0 0 1 20.5 8.8 C20.5 14 12 20.5 12 20.5 Z"
            fill={h.color}
            stroke="#B0463D"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}
