"use client";

import { useEffect, useState } from "react";

// Thin hand-drawn pencil-line along the top of the viewport that fills as
// the visitor scrolls. Fixed position, pointer-events disabled, keeps
// animations friendly on mobile (only runs when window scrolls).
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrollable =
        (document.documentElement.scrollHeight || 0) - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const next = Math.min(1, Math.max(0, window.scrollY / scrollable));
      setProgress(next);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
      style={{ height: 4 }}
    >
      <div
        className="h-full rounded-r-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, #A8D5BA 0%, #BEE3DB 35%, #F0C5A9 70%, #D4C5F9 100%)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
        }}
      />
    </div>
  );
}
