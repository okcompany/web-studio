"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { languages } from "../utils/i18n";
import TypewriterText from "./TypewriterText";

// Ink-style wavy underline drawn beneath active / hovered nav links.
// The stroke is dashed + animated so it draws itself on hover/active.
function WavyUnderline({ color = "#F0C5A9", className = "" }) {
  return (
    <svg
      className={`absolute left-0 -bottom-1 w-full h-2 pointer-events-none ${className}`}
      viewBox="0 0 120 10"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2,6 Q20,1 40,6 T78,6 T118,6"
        stroke={color}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

const NAV_ACCENTS = ["#A8D5BA", "#F0C5A9", "#D4C5F9", "#BEE3DB", "#F7C880"];

function isActiveRoute(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.news"), href: "/news" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header className="relative py-6 px-4 sm:px-6 md:px-12">
      {/* Цветная рисованная граница заголовка */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M10,90 Q300,85 600,88 Q900,91 1190,87"
            stroke="url(#headerGradient)"
            strokeWidth="2"
            fill="none"
            className="hand-drawn-animation"
          />
          <defs>
            <linearGradient
              id="headerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#A8D5BA" />
              <stop offset="50%" stopColor="#F0C5A9" />
              <stop offset="100%" stopColor="#D4C5F9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Логотип */}
        <div className="flex items-center min-w-0">
          <a href="/" className="relative group watercolor-hover max-w-full">
            <div className="font-caveat text-lg sm:text-2xl md:text-3xl font-bold text-[#2A2A2A] relative z-10 whitespace-nowrap leading-tight">
              <TypewriterText text="Web Studio Oleh Kalchenko" delay={4000} />
            </div>
            {/* Цветная рисованная подчеркивание */}
            <svg
              className="absolute -bottom-1 left-0 w-full h-3 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              viewBox="0 0 200 12"
            >
              <path
                d="M2,8 Q50,4 100,7 Q150,10 198,6"
                stroke="#A8D5BA"
                strokeWidth="2.5"
                fill="none"
                className="hand-drawn-animation"
              />
            </svg>
            {/* Цветной фон при наведении */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E8F4F8] to-[#F0E8D6] opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10 rounded-lg transform scale-110"></div>
          </a>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-6 flex-shrink-0">
          {/* Переключатель языков */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="relative watercolor-hover p-2 flex items-center space-x-2"
            >
              <Globe size={20} className="text-[#5A5A5A]" />
              <span className="font-kalam text-sm font-semibold text-[#2A2A2A] uppercase">
                {currentLanguage}
              </span>
              {/* Цветная рисованная рамка вокруг кнопки */}
              <svg
                className="absolute inset-0 w-full h-full opacity-70"
                viewBox="0 0 80 40"
              >
                <rect
                  x="4"
                  y="4"
                  width="72"
                  height="32"
                  stroke="#F0C5A9"
                  strokeWidth="1.5"
                  fill="none"
                  rx="6"
                  transform="rotate(1 40 20)"
                />
              </svg>
            </button>

            {/* Выпадающее меню языков */}
            {isLangMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-[#FEFEFE] shadow-lg z-50">
                <div className="relative">
                  {/* Цветная рамка вокруг меню */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 128 120"
                    preserveAspectRatio="none"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="120"
                      height="112"
                      stroke="#D4C5F9"
                      strokeWidth="2"
                      fill="rgba(212, 197, 249, 0.05)"
                      rx="6"
                      transform="rotate(-1 64 60)"
                    />
                  </svg>

                  <div className="py-2">
                    {Object.entries(languages).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => {
                          changeLanguage(code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 font-kalam text-sm hover:bg-gradient-to-r hover:from-[#F0E8D6] hover:to-[#E8F4F8] transition-colors duration-300 ${
                          currentLanguage === code
                            ? "text-[#A8D5BA] font-semibold"
                            : "text-[#2A2A2A]"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item, index) => {
              const active = isActiveRoute(location.pathname, item.href);
              const accent = NAV_ACCENTS[index % NAV_ACCENTS.length];
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={`nav-link relative group font-kalam text-lg px-1 pb-1 transition-colors duration-300 ${
                    active
                      ? "text-[#2A2A2A] font-semibold"
                      : "text-[#5A5A5A] hover:text-[#2A2A2A]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {/* small hand-drawn dot marker that appears on active */}
                  <span
                    className={`absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      active ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                    style={{ backgroundColor: accent }}
                  />
                  <span className="relative z-10">{item.label}</span>
                  {/* wavy underline — visible when active or hovered */}
                  <span
                    className={`block absolute left-0 -bottom-1 w-full transition-all duration-300 ${
                      active
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                    }`}
                    aria-hidden="true"
                  >
                    <WavyUnderline color={accent} />
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Мобильная кнопка меню */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative watercolor-hover p-2"
          >
            <div className="relative z-10">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
            {/* Цветная рисованная рамка вокруг кнопки */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60"
              viewBox="0 0 40 40"
            >
              <rect
                x="4"
                y="4"
                width="32"
                height="32"
                stroke="#A8D5BA"
                strokeWidth="2"
                fill="none"
                rx="4"
                transform="rotate(1 20 20)"
              />
            </svg>
            {/* Цветной фон при наведении */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6D3] to-[#E8F4F8] opacity-0 hover:opacity-50 transition-opacity duration-500 rounded-lg"></div>
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FEFEFE] border-t border-[#E0E0E0] z-50">
          <div className="relative">
            {/* Цветная рисованная рамка вокруг мобильного меню */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <rect
                x="8"
                y="8"
                width="384"
                height="284"
                stroke="#F0C5A9"
                strokeWidth="2"
                fill="rgba(240, 197, 169, 0.05)"
                transform="rotate(-0.5 200 150)"
              />
            </svg>

            <nav className="flex flex-col py-6 px-6 space-y-2">
              {navItems.map((item, index) => {
                const active = isActiveRoute(location.pathname, item.href);
                const accent = NAV_ACCENTS[index % NAV_ACCENTS.length];
                return (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`relative font-kalam text-lg py-2 px-3 rounded-lg transition-colors duration-300 flex items-center gap-3 ${
                      active
                        ? "text-[#2A2A2A] font-semibold"
                        : "text-[#5A5A5A]"
                    }`}
                    style={
                      active ? { backgroundColor: `${accent}22` } : undefined
                    }
                  >
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${
                        active ? "opacity-100 scale-100" : "opacity-30 scale-75"
                      }`}
                      style={{ backgroundColor: accent }}
                    />
                    <span className="relative z-10 flex-1">{item.label}</span>
                    {active && <WavyUnderline color={accent} />}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
