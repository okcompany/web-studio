"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import FloatingShapes from "../components/FloatingShapes";
import HighlightedSlogan from "../components/HighlightedSlogan";
import PaperPlaneAnimation from "../components/PaperPlaneAnimation";
import BusAnimation from "../components/BusAnimation";
import HandDrawnSlideshow from "../components/HandDrawnSlideshow";
import MadeInBadge from "../components/MadeInBadge";
import {
  WhyMeSection,
  TechStackSection,
  TestimonialsSection,
  FaqSection,
} from "../components/HomeSections";
import {
  ArrowRight,
  Send,
  Palette,
  Code2,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FEFEFE] relative">
      <FloatingShapes />
      <Header />

      {/* Секция Hero */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden">
        {/* Цветные декоративные элементы */}
        <div className="absolute top-20 left-10 opacity-30">
          <svg width="120" height="80" viewBox="0 0 120 80">
            <path
              d="M10,40 Q30,10 60,40 Q90,70 110,40"
              stroke="#A8D5BA"
              strokeWidth="2.5"
              fill="none"
              className="hand-drawn-animation"
            />
          </svg>
        </div>

        <div className="absolute top-40 right-16 opacity-25">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#F0C5A9"
              strokeWidth="2"
              fill="none"
              transform="rotate(15 50 50)"
              className="hand-drawn-animation"
            />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Текстовый контент */}
            <div
              className={`space-y-8 transition-all duration-1000 order-2 lg:order-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {/* Лейбл студии */}
              <div className="relative">
                <span className="font-caveat text-xl md:text-2xl text-[#7A7A7A] transform -rotate-2 inline-block">
                  {t("home.studioLabel")}
                </span>
                {/* Цветная рисованная стрелка */}
                <svg
                  className="absolute -right-8 top-0 w-6 h-6 text-[#D4C5F9]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 17l9.2-9.2M17 17V7h-10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="rotate(10 12 12)"
                  />
                </svg>
              </div>

              {/* Основной заголовок */}
              <div className="relative">
                <HighlightedSlogan />
                {/* Цветное рисованное подчеркивание */}
                <svg
                  className="absolute -bottom-4 left-0 w-4/5 h-6"
                  viewBox="0 0 400 24"
                >
                  <path
                    d="M5,12 Q100,18 200,12 Q300,6 395,15"
                    stroke="url(#sloganGradient)"
                    strokeWidth="4"
                    fill="none"
                    className="hand-drawn-animation"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <defs>
                    <linearGradient
                      id="sloganGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#A8D5BA" />
                      <stop offset="100%" stopColor="#D4C5F9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Описание */}
              <p className="font-kalam text-lg md:text-xl text-[#5A5A5A] leading-relaxed max-w-lg">
                {t("home.description")}
              </p>

              {/* CTA кнопка */}
              <div className="relative pt-4">
                <Link
                  to="/contact"
                  data-heart-burst
                  className="relative group watercolor-hover inline-block heart-burst"
                >
                  {/* Цветная рисованная граница кнопки */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 200 60"
                    preserveAspectRatio="none"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="192"
                      height="52"
                      stroke="url(#buttonGradient)"
                      strokeWidth="2.5"
                      fill="none"
                      rx="6"
                      transform="rotate(-0.5 100 30)"
                    />
                    <defs>
                      <linearGradient
                        id="buttonGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#A8D5BA" />
                        <stop offset="50%" stopColor="#F0C5A9" />
                        <stop offset="100%" stopColor="#D4C5F9" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Цветной фон при наведении */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E8F4F8] via-[#F0E8D6] to-[#F5E6F8] opacity-0 group-hover:opacity-80 transition-opacity duration-600 rounded-lg transform rotate-1"></div>

                  <div className="relative z-10 flex items-center justify-center px-8 py-4 font-kalam text-lg font-semibold text-[#2A2A2A]">
                    <Send size={20} className="mr-3" />
                    {t("home.telegramButton")}
                    <ArrowRight
                      size={20}
                      className="ml-3 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </Link>
              </div>
            </div>

            {/* Визуальный элемент — слайдшоу фото в рисованной рамке */}
            <div
              className={`relative transition-all duration-1000 delay-300 order-1 lg:order-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="relative">
                <HandDrawnSlideshow />
                {/* Бейдж "Made in Deutschland" накладкой на верхний край слайдшоу */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <MadeInBadge rotate={-4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Старые декоративные эскизы — оставим спрятанными, чтобы не ломать grid, но не рендерим */}
      <div style={{ display: "none" }}>
        <div className="relative aspect-square max-w-lg mx-auto">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
            <rect x="20" y="20" width="360" height="360" stroke="#000" strokeWidth="3" fill="none" />
          </svg>
          <div className="absolute inset-8 flex items-center justify-center">
                  <div className="relative">
                    {/* Эскиз ноутбука/компьютера */}
                    <svg
                      width="280"
                      height="200"
                      viewBox="0 0 280 200"
                      className="opacity-85"
                    >
                      {/* База ноутбука */}
                      <rect
                        x="40"
                        y="140"
                        width="200"
                        height="40"
                        stroke="#4A4A4A"
                        strokeWidth="2.5"
                        fill="none"
                        transform="rotate(-1 140 160)"
                        className="hand-drawn-animation"
                        style={{ animationDelay: "1s" }}
                      />

                      {/* Экран ноутбука */}
                      <rect
                        x="60"
                        y="60"
                        width="160"
                        height="100"
                        stroke="#4A4A4A"
                        strokeWidth="2.5"
                        fill="none"
                        transform="rotate(1 140 110)"
                        className="hand-drawn-animation"
                        style={{ animationDelay: "1.2s" }}
                      />

                      {/* Контент экрана - wireframe сайта */}
                      <rect
                        x="80"
                        y="80"
                        width="120"
                        height="8"
                        stroke="#A8D5BA"
                        strokeWidth="1.5"
                        fill="none"
                        className="hand-drawn-animation"
                        style={{ animationDelay: "1.4s" }}
                      />
                      <rect
                        x="80"
                        y="100"
                        width="80"
                        height="6"
                        stroke="#F0C5A9"
                        strokeWidth="1.5"
                        fill="none"
                        className="hand-drawn-animation"
                        style={{ animationDelay: "1.6s" }}
                      />
                      <rect
                        x="80"
                        y="115"
                        width="100"
                        height="20"
                        stroke="#D4C5F9"
                        strokeWidth="1.5"
                        fill="none"
                        className="hand-drawn-animation"
                        style={{ animationDelay: "1.8s" }}
                      />
                    </svg>

                    {/* Плавающие элементы дизайна */}
                    <div className="absolute -top-4 -left-4 float-slow">
                      <svg width="40" height="40" viewBox="0 0 40 40">
                        <circle
                          cx="20"
                          cy="20"
                          r="15"
                          stroke="#A8D5BA"
                          strokeWidth="2.5"
                          fill="rgba(168, 213, 186, 0.15)"
                          className="hand-drawn-animation"
                          style={{ animationDelay: "2s" }}
                        />
                      </svg>
                    </div>

                    <div className="absolute -top-8 -right-8 float-med">
                      <svg width="30" height="30" viewBox="0 0 30 30">
                        <rect
                          x="5"
                          y="5"
                          width="20"
                          height="20"
                          stroke="#F0C5A9"
                          strokeWidth="2.5"
                          fill="rgba(240, 197, 169, 0.15)"
                          transform="rotate(45 15 15)"
                          className="hand-drawn-animation"
                          style={{ animationDelay: "2.2s" }}
                        />
                      </svg>
                    </div>

                    <div className="absolute -bottom-6 -right-6 float-slow">
                      <svg width="35" height="35" viewBox="0 0 35 35">
                        <polygon
                          points="17.5,5 25,25 10,20"
                          stroke="#D4C5F9"
                          strokeWidth="2.5"
                          fill="rgba(212, 197, 249, 0.15)"
                          className="hand-drawn-animation"
                          style={{ animationDelay: "2.4s" }}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
        </div>
      </div>

      {/* Анимация самолетика (telegram hint) */}
      <div className="hidden md:flex justify-center -mt-8 mb-8 pointer-events-none">
        <PaperPlaneAnimation />
      </div>

      {/* Индикатор прокрутки */}
      <div className="flex justify-center pb-12">
        <div className="relative">
          <svg width="30" height="50" viewBox="0 0 30 50">
            <rect
              x="10"
              y="10"
              width="10"
              height="30"
              stroke="#D4C5F9"
              strokeWidth="2"
              fill="none"
              rx="5"
            />
            <circle
              cx="15"
              cy="20"
              r="2"
              fill="#A8D5BA"
              className="animate-bounce"
            />
          </svg>
          <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 font-caveat text-sm text-[#A8D5BA]">
            {t("home.scrollHint")}
          </span>
        </div>
      </div>

      {/* Почему со мной */}
      <WhyMeSection />

      {/* Услуги */}
      <ServicesSection />

      {/* Процесс работы */}
      <ProcessSection />

      {/* Tech stack */}
      <TechStackSection />

      {/* Отзывы клиентов */}
      <TestimonialsSection />

      {/* FAQ */}
      <FaqSection />

      {/* CTA */}
      <CTASection />

      {/* News teaser с автобусом */}
      <NewsTeaserSection />

      <Footer />
    </div>
  );
}

function NewsTeaserSection() {
  const { t } = useLanguage();
  return (
    <section className="relative py-16 px-6 md:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <Reveal className="flex-shrink-0">
          <BusAnimation />
        </Reveal>
        <Reveal delay={120} className="flex-1 text-center md:text-left">
          <h3 className="font-caveat text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-3">
            {t("news.title")}
          </h3>
          <p className="font-kalam text-lg text-[#5A5A5A] mb-5 max-w-xl">
            {t("news.description")}
          </p>
          <Link
            to="/news"
            className="font-kalam text-[#2A2A2A] underline decoration-[#A8D5BA] decoration-2 underline-offset-4 hover:decoration-[#F0C5A9] transition-colors"
          >
            {t("nav.news")} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { t } = useLanguage();
  const items = t("services.items");
  const icons = [Palette, Code2, Sparkles, Wrench];
  const palette = ["#A8D5BA", "#F0C5A9", "#D4C5F9", "#BEE3DB"];

  return (
    <section className="py-16 px-6 md:px-12 bg-[#FCFAF7]/60">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="font-caveat text-4xl md:text-5xl font-bold text-[#2A2A2A]">
            {t("services.title")}
          </h2>
          <p className="font-kalam text-lg text-[#5A5A5A] mt-3">
            {t("services.subtitle")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(Array.isArray(items) ? items : []).map((service, idx) => {
            const Icon = icons[idx % icons.length];
            const color = palette[idx % palette.length];
            return (
              <Reveal
                key={idx}
                delay={idx * 120}
                className="relative bg-white/70 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow watercolor-hover"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${color}33`, color }}
                >
                  <Icon size={24} />
                </div>
                <h3 className="font-caveat text-2xl text-[#2A2A2A] mb-2">
                  {service.title}
                </h3>
                <p className="font-kalam text-[#5A5A5A] leading-relaxed">
                  {service.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const { t } = useLanguage();
  const steps = t("process.steps");
  return (
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="font-caveat text-4xl md:text-5xl font-bold text-[#2A2A2A]">
            {t("process.title")}
          </h2>
          <p className="font-kalam text-lg text-[#5A5A5A] mt-3">
            {t("process.subtitle")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Array.isArray(steps) ? steps : []).map((step, idx) => (
            <Reveal
              key={idx}
              delay={idx * 120}
              className="relative p-6 rounded-2xl border border-[#EADFD0] bg-white/60"
            >
              <div className="font-caveat text-5xl text-[#A8D5BA] leading-none mb-2">
                0{idx + 1}
              </div>
              <h3 className="font-caveat text-2xl text-[#2A2A2A] mb-1">
                {step.title}
              </h3>
              <p className="font-kalam text-[#5A5A5A]">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { t } = useLanguage();
  return (
    <section className="py-16 px-6 md:px-12">
      <Reveal className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#E8F4F8] via-[#F0E8D6] to-[#F5E6F8] rounded-3xl p-10 md:p-14">
        <h2 className="font-caveat text-4xl md:text-5xl font-bold text-[#2A2A2A] mb-4">
          {t("cta.title")}
        </h2>
        <p className="font-kalam text-lg text-[#5A5A5A] mb-8 max-w-xl mx-auto">
          {t("cta.description")}
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 bg-[#2A2A2A] text-white font-kalam text-lg px-8 py-3 rounded-full hover:bg-[#444] transition-colors watercolor-hover"
        >
          <Send size={18} />
          {t("cta.button")}
          <ArrowRight size={18} />
        </a>
      </Reveal>
    </section>
  );
}
