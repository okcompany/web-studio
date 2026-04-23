"use client";

import useInView from "../utils/useInView";

/**
 * Reveal — a lightweight wrapper that toggles in-view / not-in-view on its
 * children when it scrolls into the viewport. CSS inside animates based on
 * these classes. See layout.jsx for the keyframes.
 *
 * Supports an optional `style` prop that is merged with the internal
 * animationDelay style.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  once = true,
  threshold = 0.15,
  style: userStyle,
}) {
  const { ref, inView } = useInView({ threshold, once });
  const delayStyle = delay ? { animationDelay: `${delay}ms` } : null;
  const style = delayStyle || userStyle
    ? { ...(userStyle || {}), ...(delayStyle || {}) }
    : undefined;
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
