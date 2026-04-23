"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useInView — triggers when a DOM element enters the viewport.
 *
 * Usage:
 *   const { ref, inView } = useInView({ threshold: 0.15, once: true });
 *   return <div ref={ref} className={inView ? "animate-in" : "opacity-0"} />;
 *
 * `once: true` (default) stops observing after the first intersection.
 */
export function useInView({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}

export default useInView;
