"use client";

// Collection of unique hand-drawn SVG icons with subtle CSS animations.
// Each icon is intended to be distinct from the others so sections on the
// home page don't share the same visual metaphor. All icons render inside
// a 100x100 viewBox and accept `color` (accent) and `size` (rendered px).

const WRAP_STYLE = { transformOrigin: "center" };

function Wrap({ size = 56, children, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ---------------- Why Me (3) ---------------- */

// 1. Pencil that draws a wavy guide line — individual approach.
export function IconPencilLine({ color = "#A8D5BA", size }) {
  return (
    <Wrap size={size}>
      {/* wavy line drawn progressively */}
      <path
        d="M8 72 Q30 55 50 68 T92 62"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        className="hand-drawn-animation"
      />
      {/* pencil body */}
      <g className="icon-pencil-move" style={WRAP_STYLE}>
        <rect
          x="14"
          y="28"
          width="52"
          height="12"
          rx="2"
          fill="#F7E5B8"
          stroke="#8A6A3A"
          strokeWidth="2"
          transform="rotate(-18 40 34)"
        />
        {/* tip */}
        <polygon
          points="64,28 78,34 64,40"
          fill="#3E2A16"
          transform="rotate(-18 40 34)"
        />
        {/* eraser cap */}
        <rect
          x="14"
          y="28"
          width="8"
          height="12"
          fill="#E8A0A0"
          stroke="#8A6A3A"
          strokeWidth="2"
          transform="rotate(-18 40 34)"
        />
      </g>
    </Wrap>
  );
}

// 2. Clock with fast-moving hands + chat bubble — fast response.
export function IconFastClock({ color = "#F0C5A9", size }) {
  return (
    <Wrap size={size}>
      <circle
        cx="40"
        cy="52"
        r="26"
        fill="#FFFDF5"
        stroke={color}
        strokeWidth="3"
      />
      {/* tick marks */}
      <g stroke="#8A6A3A" strokeWidth="2" strokeLinecap="round">
        <line x1="40" y1="30" x2="40" y2="34" />
        <line x1="62" y1="52" x2="58" y2="52" />
        <line x1="40" y1="74" x2="40" y2="70" />
        <line x1="18" y1="52" x2="22" y2="52" />
      </g>
      {/* minute hand — fast spinner */}
      <line
        x1="40"
        y1="52"
        x2="40"
        y2="34"
        stroke="#2A2A2A"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ transformOrigin: "40px 52px" }}
        className="icon-clock-fast"
      />
      {/* hour hand */}
      <line
        x1="40"
        y1="52"
        x2="52"
        y2="52"
        stroke="#2A2A2A"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ transformOrigin: "40px 52px" }}
        className="icon-clock-hour"
      />
      <circle cx="40" cy="52" r="2.2" fill="#2A2A2A" />
      {/* chat bubble popping up */}
      <g className="icon-clock-bubble">
        <path
          d="M68 20 h22 a4 4 0 0 1 4 4 v14 a4 4 0 0 1 -4 4 h-10 l-6 6 v-6 h-6 a4 4 0 0 1 -4 -4 v-14 a4 4 0 0 1 4 -4 z"
          fill={color}
          stroke="#8A6A3A"
          strokeWidth="1.6"
        />
        <circle cx="74" cy="31" r="1.5" fill="#2A2A2A" />
        <circle cx="80" cy="31" r="1.5" fill="#2A2A2A" />
        <circle cx="86" cy="31" r="1.5" fill="#2A2A2A" />
      </g>
    </Wrap>
  );
}

// 3. Two hands shaking with a tiny flower growing — honest / fair.
export function IconHandshake({ color = "#D4C5F9", size }) {
  return (
    <Wrap size={size}>
      {/* left sleeve */}
      <path
        d="M6 60 L30 48 L36 56 L18 68 Z"
        fill={color}
        stroke="#5A3E7A"
        strokeWidth="2"
      />
      {/* right sleeve */}
      <path
        d="M94 60 L70 48 L64 56 L82 68 Z"
        fill="#A8D5BA"
        stroke="#2E6E4E"
        strokeWidth="2"
      />
      {/* hand clasp body */}
      <path
        d="M30 52 Q40 44 50 48 Q60 52 70 52 L72 62 Q60 66 50 62 Q40 60 30 62 Z"
        fill="#F7E5B8"
        stroke="#8A6A3A"
        strokeWidth="2"
        className="icon-hands-shake"
        style={WRAP_STYLE}
      />
      {/* flower stem + bloom */}
      <g className="icon-hands-flower" style={{ transformOrigin: "50px 48px" }}>
        <path
          d="M50 46 L50 30"
          stroke="#2E6E4E"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="50" cy="26" r="6" fill="#E8A0A0" />
        <circle cx="44" cy="30" r="4" fill="#F7C8C8" />
        <circle cx="56" cy="30" r="4" fill="#F7C8C8" />
        <circle cx="50" cy="24" r="2" fill="#FFDE6E" />
      </g>
    </Wrap>
  );
}

/* ---------------- Services (4) ---------------- */

// 1. Browser window with content blocks drawing in — web design.
export function IconBrowserWindow({ color = "#A8D5BA", size }) {
  return (
    <Wrap size={size}>
      <rect
        x="10"
        y="18"
        width="80"
        height="62"
        rx="6"
        fill="#FFFDF5"
        stroke="#8A6A3A"
        strokeWidth="2.5"
      />
      {/* chrome */}
      <line
        x1="10"
        y1="30"
        x2="90"
        y2="30"
        stroke="#8A6A3A"
        strokeWidth="2"
      />
      <circle cx="16" cy="24" r="1.8" fill="#E8A0A0" />
      <circle cx="22" cy="24" r="1.8" fill="#F7C880" />
      <circle cx="28" cy="24" r="1.8" fill="#A8D5BA" />
      {/* content bars — drawn in sequence */}
      <rect
        x="18"
        y="38"
        width="54"
        height="6"
        rx="2"
        fill={color}
        className="icon-browser-bar"
        style={{ animationDelay: "0.1s" }}
      />
      <rect
        x="18"
        y="50"
        width="40"
        height="6"
        rx="2"
        fill="#F0C5A9"
        className="icon-browser-bar"
        style={{ animationDelay: "0.35s" }}
      />
      <rect
        x="18"
        y="62"
        width="48"
        height="6"
        rx="2"
        fill="#D4C5F9"
        className="icon-browser-bar"
        style={{ animationDelay: "0.6s" }}
      />
    </Wrap>
  );
}

// 2. Code brackets with blinking caret — web development.
export function IconCodeBrackets({ color = "#F0C5A9", size }) {
  return (
    <Wrap size={size}>
      {/* paper sheet */}
      <rect
        x="14"
        y="14"
        width="72"
        height="72"
        rx="6"
        fill="#FFFDF5"
        stroke="#8A6A3A"
        strokeWidth="2.5"
      />
      {/* left bracket */}
      <path
        d="M34 34 L24 50 L34 66"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="hand-drawn-animation"
      />
      {/* right bracket */}
      <path
        d="M66 34 L76 50 L66 66"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="hand-drawn-animation"
      />
      {/* slash */}
      <line
        x1="54"
        y1="34"
        x2="46"
        y2="66"
        stroke="#8A6A3A"
        strokeWidth="3"
        strokeLinecap="round"
        className="hand-drawn-animation"
      />
      {/* blinking caret */}
      <rect
        x="48"
        y="70"
        width="8"
        height="2.5"
        rx="1"
        fill="#2A2A2A"
        className="icon-caret"
      />
    </Wrap>
  );
}

// 3. Paint palette + brush dropping color spots — branding / UI.
export function IconPalette({ color = "#D4C5F9", size }) {
  return (
    <Wrap size={size}>
      {/* palette */}
      <path
        d="M20 60 Q20 26 52 22 Q86 18 86 52 Q86 72 64 70 Q56 69 58 62 Q60 55 52 56 Q34 58 32 70 Q28 82 20 60 Z"
        fill="#FFFDF5"
        stroke="#8A6A3A"
        strokeWidth="2.5"
      />
      <circle cx="36" cy="36" r="5" fill="#E8A0A0" />
      <circle cx="56" cy="32" r="5" fill="#A8D5BA" />
      <circle cx="74" cy="42" r="5" fill={color} />
      <circle cx="70" cy="58" r="4" fill="#F0C5A9" />
      {/* paintbrush */}
      <g className="icon-palette-brush" style={{ transformOrigin: "70px 30px" }}>
        <rect
          x="70"
          y="10"
          width="6"
          height="18"
          fill="#8A6A3A"
          transform="rotate(28 73 18)"
        />
        <rect
          x="70"
          y="28"
          width="6"
          height="8"
          fill="#B0463D"
          transform="rotate(28 73 32)"
        />
      </g>
      {/* paint drop */}
      <circle
        cx="30"
        cy="80"
        r="4"
        fill={color}
        className="icon-paint-drop"
      />
    </Wrap>
  );
}

// 4. Wrench rotating around a bolt — support / maintenance.
export function IconWrenchBolt({ color = "#BEE3DB", size }) {
  return (
    <Wrap size={size}>
      {/* bolt */}
      <polygon
        points="50,22 70,34 70,58 50,70 30,58 30,34"
        fill="#F7E5B8"
        stroke="#8A6A3A"
        strokeWidth="2.5"
      />
      <circle cx="50" cy="46" r="6" fill="#FFFDF5" stroke="#8A6A3A" strokeWidth="2" />
      {/* wrench */}
      <g className="icon-wrench-spin" style={{ transformOrigin: "50px 46px" }}>
        <path
          d="M12 82 L34 60 L40 66 L18 88 Z"
          fill={color}
          stroke="#2E6E4E"
          strokeWidth="2"
        />
        <circle cx="36" cy="58" r="7" fill="none" stroke="#2E6E4E" strokeWidth="3" />
        <path
          d="M36 51 L30 45"
          stroke="#2E6E4E"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </Wrap>
  );
}

/* ---------------- Process (4) ---------------- */

// 1. Magnifying glass scanning a dotted paper — brief / discovery.
export function IconMagnifier({ color = "#A8D5BA", size }) {
  return (
    <Wrap size={size}>
      <rect
        x="14"
        y="20"
        width="64"
        height="70"
        rx="4"
        fill="#FFFDF5"
        stroke="#8A6A3A"
        strokeWidth="2.5"
      />
      <line x1="26" y1="34" x2="66" y2="34" stroke="#E4D3B2" strokeWidth="2" />
      <line x1="26" y1="46" x2="66" y2="46" stroke="#E4D3B2" strokeWidth="2" />
      <line x1="26" y1="58" x2="56" y2="58" stroke="#E4D3B2" strokeWidth="2" />
      <line x1="26" y1="70" x2="62" y2="70" stroke="#E4D3B2" strokeWidth="2" />
      <g className="icon-magnifier-scan">
        <circle cx="56" cy="46" r="14" fill="#FFFFFF66" stroke={color} strokeWidth="3" />
        <line
          x1="66"
          y1="56"
          x2="80"
          y2="72"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </Wrap>
  );
}

// 2. Drafting compass drawing a circle — concept / design.
export function IconCompass({ color = "#F0C5A9", size }) {
  return (
    <Wrap size={size}>
      {/* drawn circle */}
      <circle
        cx="50"
        cy="62"
        r="22"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="4 4"
        className="icon-compass-draw"
      />
      {/* compass body */}
      <g className="icon-compass-spin" style={{ transformOrigin: "50px 26px" }}>
        <circle cx="50" cy="26" r="4" fill="#8A6A3A" />
        <line
          x1="50"
          y1="26"
          x2="34"
          y2="70"
          stroke="#8A6A3A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="26"
          x2="66"
          y2="70"
          stroke="#8A6A3A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <polygon points="32,68 36,72 34,76" fill="#2A2A2A" />
        <polygon points="68,68 64,72 66,76" fill="#2A2A2A" />
      </g>
    </Wrap>
  );
}

// 3. Hammer + nail — build / implementation.
export function IconHammerNail({ color = "#D4C5F9", size }) {
  return (
    <Wrap size={size}>
      {/* wood board */}
      <rect
        x="8"
        y="72"
        width="84"
        height="14"
        fill="#C79D68"
        stroke="#5A3E16"
        strokeWidth="2"
      />
      <line x1="22" y1="72" x2="22" y2="86" stroke="#5A3E16" strokeWidth="1.5" />
      <line x1="46" y1="72" x2="46" y2="86" stroke="#5A3E16" strokeWidth="1.5" />
      <line x1="72" y1="72" x2="72" y2="86" stroke="#5A3E16" strokeWidth="1.5" />
      {/* nail */}
      <g className="icon-nail-sink" style={{ transformOrigin: "58px 72px" }}>
        <rect x="56" y="58" width="4" height="16" fill="#8A8A8A" />
        <ellipse cx="58" cy="58" rx="7" ry="3" fill="#6A6A6A" />
      </g>
      {/* hammer */}
      <g className="icon-hammer-swing" style={{ transformOrigin: "58px 58px" }}>
        <rect
          x="18"
          y="30"
          width="36"
          height="10"
          rx="2"
          fill="#8A6A3A"
          stroke="#3E2A16"
          strokeWidth="2"
          transform="rotate(-12 36 35)"
        />
        <rect
          x="14"
          y="22"
          width="20"
          height="22"
          rx="3"
          fill={color}
          stroke="#3E2A16"
          strokeWidth="2"
          transform="rotate(-12 24 33)"
        />
      </g>
    </Wrap>
  );
}

// 4. Rocket lifting off with a trail — launch.
export function IconRocket({ color = "#E8A0A0", size }) {
  return (
    <Wrap size={size}>
      {/* launch pad */}
      <line x1="14" y1="86" x2="86" y2="86" stroke="#8A6A3A" strokeWidth="3" strokeLinecap="round" />
      {/* smoke puff */}
      <g className="icon-rocket-smoke">
        <circle cx="38" cy="80" r="6" fill="#E4D3B2" opacity="0.7" />
        <circle cx="50" cy="82" r="5" fill="#E4D3B2" opacity="0.6" />
        <circle cx="62" cy="80" r="6" fill="#E4D3B2" opacity="0.5" />
      </g>
      {/* rocket body */}
      <g className="icon-rocket-lift" style={{ transformOrigin: "50px 60px" }}>
        <path
          d="M50 18 Q60 30 60 56 L60 70 L40 70 L40 56 Q40 30 50 18 Z"
          fill={color}
          stroke="#8A6A3A"
          strokeWidth="2.5"
        />
        <circle cx="50" cy="40" r="5" fill="#FFFDF5" stroke="#8A6A3A" strokeWidth="2" />
        {/* fins */}
        <polygon points="40,62 28,74 40,72" fill="#F0C5A9" stroke="#8A6A3A" strokeWidth="2" />
        <polygon points="60,62 72,74 60,72" fill="#F0C5A9" stroke="#8A6A3A" strokeWidth="2" />
        {/* flame */}
        <path
          d="M44 70 Q50 82 56 70 Q54 78 50 80 Q46 78 44 70 Z"
          fill="#FFDE6E"
          stroke="#B0463D"
          strokeWidth="1.6"
          className="icon-rocket-flame"
          style={{ transformOrigin: "50px 72px" }}
        />
      </g>
    </Wrap>
  );
}
