import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "../context/LanguageContext";
import ScrollProgress from "../components/ScrollProgress";
import HeartBurst from "../components/HeartBurst";
import StickyNote from "../components/StickyNote";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FEFEFE] text-[#2A2A2A] font-kalam">
      {/* Global paper texture background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23666666' fill-opacity='0.03'%3E%3Cpath d='m40 40c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm0-32c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm-32 0c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10">
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <ScrollProgress />
            <HeartBurst />
            <StickyNote />
            {children}
          </LanguageProvider>
        </QueryClientProvider>
      </div>

      <style>{`
        .font-kalam { font-family: 'Kalam', cursive; }
        .font-caveat { font-family: 'Caveat', cursive; }

        /* Hand-drawn stroke animation — uses an absolute dash length that is
           larger than any path/rect perimeter used in this project (~1500).
           Together with the browser's built-in stroke-dashoffset interpolation
           this produces a smooth "drawing" effect for every shape. */
        @keyframes draw {
          from { stroke-dashoffset: 3000; }
          to { stroke-dashoffset: 0; }
        }

        .hand-drawn-animation {
          stroke-dasharray: 3000;
          stroke-dashoffset: 3000;
          animation: draw 1.4s ease-out forwards;
        }

        /* Scope animation start to viewport: parent needs a .not-in-view / .in-view
           class. Elements without a scoping wrapper fall back to the default
           on-mount behavior defined above. */
        .not-in-view .hand-drawn-animation {
          animation: none;
          stroke-dashoffset: 3000;
        }
        .in-view .hand-drawn-animation {
          animation: draw 1.4s ease-out forwards;
        }

        /* Soft fade-up for content blocks */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { opacity: 0; }
        .fade-up.in-view { animation: fadeUp 0.8s ease-out forwards; }

        /* Floating SVG decorations */
        @keyframes float-y {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(4deg); }
        }
        .float-slow { animation: float-y 6s ease-in-out infinite; transform-origin: center; }
        .float-med { animation: float-y 4.5s ease-in-out infinite; transform-origin: center; }

        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow { animation: slow-spin 30s linear infinite; transform-origin: center; }

        /* Watercolor hover — single, consistent scale with a soft colour overlay */
        .watercolor-hover {
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), filter 0.4s ease;
          will-change: transform;
        }

        .watercolor-hover:hover {
          transform: scale(1.04);
          filter: saturate(1.05);
        }

        /* Heart pulse for the Made-in-Deutschland badge */
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          20% { transform: scale(1.12); }
          40% { transform: scale(1); }
          60% { transform: scale(1.06); }
        }
        .animate-heartbeat { animation: heartbeat 2.6s ease-in-out infinite; transform-origin: 12px 12px; }

        /* Gentle wiggle for stickers and charm elements */
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-wiggle { animation: wiggle 4s ease-in-out infinite; transform-origin: center; }

        /* ---------------- Hand-drawn icon animations ---------------- */
        /* Pencil gently nods as the line underneath is drawn. */
        @keyframes pencil-nod {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(-4deg) translateY(-1px); }
        }
        .icon-pencil-move { animation: pencil-nod 2.4s ease-in-out infinite; transform-origin: 40px 34px; }

        /* Clock hands — minute hand spins quickly, hour crawls, speech bubble pops. */
        @keyframes clock-fast { to { transform: rotate(360deg); } }
        .icon-clock-fast { animation: clock-fast 3.5s linear infinite; }
        .icon-clock-hour { animation: clock-fast 18s linear infinite; }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.6); }
          60% { opacity: 1; transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .icon-clock-bubble { animation: pop-in 1.6s ease-out 0.6s both; transform-origin: 80px 32px; }

        /* Handshake — gentle vertical pulse; flower grows up. */
        @keyframes shake-pulse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(1.5px); }
        }
        .icon-hands-shake { animation: shake-pulse 1.6s ease-in-out infinite; }
        @keyframes flower-grow {
          0% { transform: scale(0.2) translateY(14px); opacity: 0; }
          60% { opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .icon-hands-flower { animation: flower-grow 2.2s ease-out 0.3s both; }

        /* Browser content bars draw in from left. */
        @keyframes bar-slide {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .icon-browser-bar {
          transform-origin: left center;
          animation: bar-slide 0.7s cubic-bezier(.4,1.3,.5,1) forwards;
          transform: scaleX(0);
        }

        /* Code caret blink. */
        @keyframes caret-blink { 0%, 55% { opacity: 1; } 56%, 100% { opacity: 0; } }
        .icon-caret { animation: caret-blink 1s steps(1) infinite; }

        /* Paint brush dabs, drop falls. */
        @keyframes brush-dab {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(8deg); }
        }
        .icon-palette-brush { animation: brush-dab 2.4s ease-in-out infinite; }
        @keyframes drop-fall {
          0% { transform: translateY(-18px); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(0); opacity: 0.8; }
        }
        .icon-paint-drop { animation: drop-fall 2.6s ease-in 0.5s infinite; }

        /* Wrench rotates around bolt. */
        @keyframes wrench-spin {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(14deg); }
          100% { transform: rotate(0deg); }
        }
        .icon-wrench-spin { animation: wrench-spin 1.8s ease-in-out infinite; }

        /* Magnifier lens scans back and forth. */
        @keyframes magnifier-scan {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-18px, 6px); }
        }
        .icon-magnifier-scan { animation: magnifier-scan 3s ease-in-out infinite; }

        /* Compass body rotates drawing the circle. */
        @keyframes compass-spin { to { transform: rotate(360deg); } }
        .icon-compass-spin { animation: compass-spin 5s linear infinite; }
        @keyframes compass-draw {
          from { stroke-dashoffset: 160; }
          to { stroke-dashoffset: 0; }
        }
        .icon-compass-draw { stroke-dasharray: 160; animation: compass-draw 5s linear infinite; }

        /* Hammer swings, nail sinks. */
        @keyframes hammer-swing {
          0%, 30%, 100% { transform: rotate(-30deg); }
          45%, 55% { transform: rotate(10deg); }
        }
        .icon-hammer-swing { animation: hammer-swing 1.4s ease-in-out infinite; }
        @keyframes nail-sink {
          0%, 40% { transform: translateY(0); }
          50%, 100% { transform: translateY(3px); }
        }
        .icon-nail-sink { animation: nail-sink 1.4s ease-in-out infinite; }

        /* Rocket lifts off in a loop with flame flicker. */
        @keyframes rocket-lift {
          0% { transform: translateY(0); }
          60% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .icon-rocket-lift { animation: rocket-lift 2.6s ease-in-out infinite; }
        @keyframes flame-flicker {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.25); }
        }
        .icon-rocket-flame { animation: flame-flicker 0.4s ease-in-out infinite; }
        @keyframes smoke-puff {
          0%, 100% { opacity: 0.7; transform: translateY(0); }
          50% { opacity: 0.35; transform: translateY(3px); }
        }
        .icon-rocket-smoke { animation: smoke-puff 2.6s ease-in-out infinite; }

        /* ---------------- "How we work" gentleman walker ---------------- */
        .gentleman-track {
          position: absolute;
          left: 0;
          right: 0;
          top: -44px;
          height: 72px;
          z-index: 5;
        }
        .gentleman-walk {
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          animation: gentleman-stroll 14s linear infinite;
        }
        @keyframes gentleman-stroll {
          0%   { left: 0; }
          45%  { left: calc(100% - 60px); }
          50%  { left: calc(100% - 60px); transform: scaleX(-1); }
          95%  { left: 0; transform: scaleX(-1); }
          100% { left: 0; transform: scaleX(1); }
        }
        @keyframes gentleman-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .gentleman-walk svg { animation: gentleman-bob 0.6s ease-in-out infinite; }

        @keyframes leg-front-step {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(12deg); }
        }
        @keyframes leg-back-step {
          0%, 100% { transform: rotate(12deg); }
          50% { transform: rotate(-12deg); }
        }
        .gentleman-leg { transform-origin: 30px 52px; }
        .gentleman-leg.leg-front { animation: leg-front-step 0.6s ease-in-out infinite; }
        .gentleman-leg.leg-back  { animation: leg-back-step  0.6s ease-in-out infinite; }

        @keyframes cane-tap {
          0%, 40%, 100% { transform: translateY(0); }
          50% { transform: translateY(2px); }
        }
        .gentleman-cane { animation: cane-tap 0.6s ease-in-out infinite; transform-origin: 48px 46px; }

        /* Process cards — emphasised when the gentleman passes over each
           quarter of the stroll animation. Card #1 lights up ~0-10%,
           card #2 ~12-22%, card #3 ~24-34%, card #4 ~36-46%. We only
           animate the inner highlight layer (see .process-card::before
           below) so we don't fight Reveal's fade-up opacity animation. */
        .process-card { position: relative; }
        .process-card:nth-child(1) { animation: hl-card1 14s linear infinite; }
        .process-card:nth-child(2) { animation: hl-card2 14s linear infinite; }
        .process-card:nth-child(3) { animation: hl-card3 14s linear infinite; }
        .process-card:nth-child(4) { animation: hl-card4 14s linear infinite; }
        @keyframes hl-card1 {
          0%, 10%, 50%, 100% {
            box-shadow: 0 0 0 0 transparent;
            filter: saturate(0.85);
          }
          3%, 7% {
            box-shadow: 0 0 0 3px var(--accent, #A8D5BA);
            filter: saturate(1.2);
          }
        }
        @keyframes hl-card2 {
          0%, 12%, 26%, 50%, 100% {
            box-shadow: 0 0 0 0 transparent;
            filter: saturate(0.85);
          }
          15%, 22% {
            box-shadow: 0 0 0 3px var(--accent, #F0C5A9);
            filter: saturate(1.2);
          }
        }
        @keyframes hl-card3 {
          0%, 24%, 38%, 50%, 100% {
            box-shadow: 0 0 0 0 transparent;
            filter: saturate(0.85);
          }
          27%, 34% {
            box-shadow: 0 0 0 3px var(--accent, #D4C5F9);
            filter: saturate(1.2);
          }
        }
        @keyframes hl-card4 {
          0%, 36%, 50%, 100% {
            box-shadow: 0 0 0 0 transparent;
            filter: saturate(0.85);
          }
          39%, 46% {
            box-shadow: 0 0 0 3px var(--accent, #BEE3DB);
            filter: saturate(1.2);
          }
        }

        /* Sticker-style shadow with colored rim */
        .sticker-shadow {
          box-shadow: 0 3px 0 -1px rgba(240, 197, 169, 0.9),
                      0 8px 14px -8px rgba(0, 0, 0, 0.12);
        }

        /* Heart-burst particles (HeartBurst.jsx) */
        @keyframes heart-burst-rise {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0.9; }
          40% { transform: translate(calc(var(--dx) * 0.5), calc(var(--dy) * 0.5)) scale(1); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0.7); opacity: 0; }
        }
        .heart-burst-particle {
          animation: heart-burst-rise 1s ease-out forwards;
          transform-origin: center;
        }

        /* Hover tooltip (Tooltip.jsx) */
        .tooltip-wrap { position: relative; display: inline-flex; }
        .tooltip-bubble {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) rotate(-3deg) scale(0.9);
          background: #FFF9E6;
          border: 1.5px solid #F0C5A9;
          color: #5A3E2B;
          padding: 4px 10px;
          border-radius: 10px;
          font-family: 'Caveat', cursive;
          font-size: 16px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 160ms ease, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 3px 0 -1px #F0C5A9, 0 6px 10px -6px rgba(0,0,0,0.1);
          z-index: 40;
        }
        .tooltip-wrap:hover .tooltip-bubble,
        .tooltip-wrap:focus-within .tooltip-bubble {
          opacity: 1;
          transform: translateX(-50%) rotate(-3deg) scale(1);
        }
        .tooltip-bubble::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 6px solid transparent;
          border-top-color: #FFF9E6;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hand-drawn-animation,
          .fade-up.in-view,
          .float-slow,
          .float-med,
          .spin-slow,
          .animate-heartbeat,
          .animate-wiggle,
          .heart-burst-particle,
          .icon-pencil-move,
          .icon-clock-fast,
          .icon-clock-hour,
          .icon-clock-bubble,
          .icon-hands-shake,
          .icon-hands-flower,
          .icon-browser-bar,
          .icon-caret,
          .icon-palette-brush,
          .icon-paint-drop,
          .icon-wrench-spin,
          .icon-magnifier-scan,
          .icon-compass-spin,
          .icon-compass-draw,
          .icon-hammer-swing,
          .icon-nail-sink,
          .icon-rocket-lift,
          .icon-rocket-flame,
          .icon-rocket-smoke,
          .gentleman-walk,
          .gentleman-walk svg,
          .gentleman-leg,
          .gentleman-cane,
          .process-card {
            animation: none !important;
          }
          .process-card { filter: none; opacity: 1; }
          .icon-browser-bar { transform: scaleX(1); }
          .hand-drawn-animation { stroke-dashoffset: 0; }
          .fade-up { opacity: 1; }
        }

        /* Цветной скроллбар */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #A8D5BA, #F0C5A9, #D4C5F9);
          border-radius: 10px;
          border: 2px solid transparent;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #8BC4A0, #E8B599, #C4B5E9);
        }
      `}</style>
    </div>
  );
}
