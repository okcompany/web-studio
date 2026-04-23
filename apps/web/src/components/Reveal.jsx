"use client";

import useInView from "../utils/useInView";

/**
 * Reveal — a lightweight wrapper that toggles in-view / not-in-view on its
 * children when it scrolls into the viewport. CSS inside animates based on
 * these classes. See layout.jsx for the keyframes.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  once = true,
  threshold = 0.15,
}) {
  const { ref, inView } = useInView({ threshold, once });
  const style = delay ? { animationDelay: `${delay}ms` } : undefined;
  const classes = [
    className,
    inView ? "in-view" : "not-in-view",
    "fade-up",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} style={style}>
      {children}
    </Tag>
  );
}
