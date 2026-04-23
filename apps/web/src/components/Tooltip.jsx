"use client";

// Tiny wrapper that shows a hand-written sticker above its child on hover.
// Styles live in layout.jsx (.tooltip-wrap / .tooltip-bubble).
//
// Usage:  <Tooltip text="Say hi!"><button>Contact</button></Tooltip>
export default function Tooltip({ text, children, className = "" }) {
  if (!text) return children;
  return (
    <span className={`tooltip-wrap ${className}`}>
      {children}
      <span className="tooltip-bubble" role="tooltip">
        {text}
      </span>
    </span>
  );
}
