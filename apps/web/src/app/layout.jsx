import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "../context/LanguageContext";

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
          <LanguageProvider>{children}</LanguageProvider>
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

        /* Sticker-style shadow with colored rim */
        .sticker-shadow {
          box-shadow: 0 3px 0 -1px rgba(240, 197, 169, 0.9),
                      0 8px 14px -8px rgba(0, 0, 0, 0.12);
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hand-drawn-animation,
          .fade-up.in-view,
          .float-slow,
          .float-med,
          .spin-slow,
          .animate-heartbeat,
          .animate-wiggle {
            animation: none !important;
          }
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
