"use client";

import { Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingShapes from "../components/FloatingShapes";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";

const COPY = {
  de: {
    title: "Hoppla! Seite nicht gefunden",
    body: "Diese Seite haben wir nicht skizziert. Vielleicht schauen Sie zurück auf die Startseite — dort warten frische Projekte und ein freundlicher Kaffee.",
    back: "Zurück nach Hause",
    explore: "Portfolio ansehen",
  },
  en: {
    title: "Oops! Page not found",
    body: "We haven’t sketched this page yet. Let’s head back home — fresh projects and a friendly coffee are waiting.",
    back: "Back home",
    explore: "Browse portfolio",
  },
  ru: {
    title: "Упс! Страница потерялась",
    body: "Эту страницу мы ещё не нарисовали. Вернитесь, пожалуйста, на главную — там свежие проекты и приятное знакомство.",
    back: "Вернуться на главную",
    explore: "Посмотреть портфолио",
  },
};

export default function NotFoundPage() {
  return (
    <LanguageProvider>
      <NotFoundContent />
    </LanguageProvider>
  );
}

function NotFoundContent() {
  const { currentLanguage } = useLanguage();
  const lang = ["de", "en", "ru"].includes(currentLanguage)
    ? currentLanguage
    : "en";
  const copy = COPY[lang];

  return (
    <div className="min-h-screen bg-[#FEFEFE] relative overflow-hidden">
      <FloatingShapes />
      <Header />

      <section className="relative py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Hand-drawn "404" scene: a lost paper airplane circling a big crumpled page */}
          <div className="relative mx-auto mb-8 w-[320px] h-[220px] sm:w-[420px] sm:h-[280px]">
            <svg viewBox="0 0 420 280" className="w-full h-full">
              <defs>
                <linearGradient id="lostGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A8D5BA" />
                  <stop offset="50%" stopColor="#F0C5A9" />
                  <stop offset="100%" stopColor="#D4C5F9" />
                </linearGradient>
              </defs>

              {/* Giant 404 */}
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                fontFamily="Caveat, cursive"
                fontSize="180"
                fontWeight="700"
                fill="url(#lostGradient)"
                opacity="0.85"
              >
                404
              </text>

              {/* Dashed flight path */}
              <path
                d="M20,240 C 90,200 170,260 230,200 S 380,150 400,80"
                stroke="#D8D0C2"
                strokeWidth="2"
                strokeDasharray="4 6"
                fill="none"
              />

              {/* Little paper airplane at the end */}
              <g transform="translate(380 60) rotate(-18)" className="float-med">
                <path
                  d="M0,10 L36,0 L22,12 L36,24 Z"
                  fill="#FFF6EC"
                  stroke="#5A3E2B"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M22,12 L14,8 L22,16 Z"
                  fill="#F0C5A9"
                  stroke="#5A3E2B"
                  strokeWidth="1.2"
                />
              </g>

              {/* Tiny smiley cloud */}
              <g transform="translate(50 40)" className="float-slow">
                <ellipse cx="30" cy="20" rx="30" ry="14" fill="#F5F7F6" stroke="#C9C1B0" strokeWidth="1.5" />
                <circle cx="22" cy="18" r="2" fill="#2A2A2A" />
                <circle cx="38" cy="18" r="2" fill="#2A2A2A" />
                <path d="M22,24 Q30,30 38,24" stroke="#2A2A2A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </g>
            </svg>
          </div>

          <h1 className="font-caveat text-4xl sm:text-6xl font-bold text-[#2A2A2A] mb-4">
            {copy.title}
          </h1>
          <p className="font-kalam text-lg text-[#5A5A5A] max-w-xl mx-auto mb-10">
            {copy.body}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              data-heart-burst
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#A8D5BA] text-[#2A2A2A] font-kalam text-lg sticker-shadow hover:bg-[#9BC9AD] transition-colors"
              style={{ transform: "rotate(-2deg)" }}
            >
              {copy.back}
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFF6EC] border border-[#F0C5A9] text-[#5A3E2B] font-kalam text-lg sticker-shadow hover:bg-[#FBE8D3] transition-colors"
              style={{ transform: "rotate(2deg)" }}
            >
              {copy.explore}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
