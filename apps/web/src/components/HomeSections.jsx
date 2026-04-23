"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";
import { Quote, ChevronDown } from "lucide-react";
import {
  IconPencilLine,
  IconFastClock,
  IconHandshake,
} from "./HandDrawnIcons";

// "Why work with me?" — three hand-drawn cards on a pale paper background.
export function WhyMeSection() {
  const { t } = useLanguage();
  const items = t("home.whyMe.items");
  const palette = ["#A8D5BA", "#F0C5A9", "#D4C5F9"];
  const illustrations = [IconPencilLine, IconFastClock, IconHandshake];
  return (
    <section className="py-16 px-6 md:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="font-caveat text-4xl md:text-5xl font-bold text-[#2A2A2A]">
            {t("home.whyMe.title")}
          </h2>
          <p className="font-kalam text-lg text-[#5A5A5A] mt-3">
            {t("home.whyMe.subtitle")}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Array.isArray(items) ? items : []).map((item, idx) => {
            const Illustration = illustrations[idx % illustrations.length];
            const color = palette[idx % palette.length];
            return (
              <Reveal
                key={idx}
                delay={idx * 140}
                className="relative bg-white/80 rounded-2xl p-6 border border-[#EADFD0] watercolor-hover"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${color}22` }}
                >
                  <Illustration size={64} color={color} />
                </div>
                <h3 className="font-caveat text-2xl text-[#2A2A2A] mb-2">
                  {item.title}
                </h3>
                <p className="font-kalam text-[#5A5A5A] leading-relaxed">
                  {item.description}
                </p>
                {/* Hand-drawn underline flourish */}
                <svg
                  className="absolute bottom-4 right-4 opacity-40"
                  width="44"
                  height="14"
                  viewBox="0 0 44 14"
                >
                  <path
                    d="M2 9 Q12 2 22 8 Q32 14 42 6"
                    stroke={color}
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Tech stack strip — small hand-drawn "polaroid" tiles for each tool.
export function TechStackSection() {
  const { t } = useLanguage();
  const tools = [
    { name: "React", color: "#61DAFB" },
    { name: "Next.js", color: "#2A2A2A" },
    { name: "Tailwind", color: "#38BDF8" },
    { name: "Figma", color: "#F04E23" },
    { name: "Node.js", color: "#8BC34A" },
    { name: "Framer", color: "#0055FF" },
    { name: "Vercel", color: "#2A2A2A" },
    { name: "Resend", color: "#FF6B6B" },
  ];
  return (
    <section className="py-16 px-6 md:px-12 bg-[#FCFAF7]/60">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-10">
          <h2 className="font-caveat text-4xl md:text-5xl font-bold text-[#2A2A2A]">
            {t("home.techStack.title")}
          </h2>
          <p className="font-kalam text-lg text-[#5A5A5A] mt-3">
            {t("home.techStack.subtitle")}
          </p>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-4">
          {tools.map((tool, idx) => (
            <Reveal
              key={tool.name}
              delay={idx * 80}
              className="bg-white px-5 py-3 rounded-xl border border-[#EADFD0] shadow-sm font-kalam text-[#2A2A2A] flex items-center gap-2 sticker-shadow watercolor-hover"
              style={{
                transform: `rotate(${(idx % 2 ? 1 : -1) * (idx % 3 + 1) * 0.6}deg)`,
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: tool.color }}
              />
              {tool.name}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pastel testimonial cards laid out like sticky notes.
export function TestimonialsSection() {
  const { t } = useLanguage();
  const items = t("home.testimonials.items");
  const bg = ["#FFF8E7", "#F0F7FF", "#FDF0F5"];
  const rot = [-1.5, 1, -0.5];
  return (
    <section className="py-16 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="font-caveat text-4xl md:text-5xl font-bold text-[#2A2A2A]">
            {t("home.testimonials.title")}
          </h2>
          <p className="font-kalam text-lg text-[#5A5A5A] mt-3">
            {t("home.testimonials.subtitle")}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {(Array.isArray(items) ? items : []).map((item, idx) => (
            <Reveal
              key={idx}
              delay={idx * 140}
              className="relative p-6 md:p-7 rounded-xl shadow-md watercolor-hover"
              style={{
                backgroundColor: bg[idx % bg.length],
                transform: `rotate(${rot[idx % rot.length]}deg)`,
              }}
            >
              <Quote
                size={36}
                className="text-[#D4C5F9] opacity-50 absolute -top-3 -left-2"
                strokeWidth={1.5}
              />
              <p className="font-kalam text-[#3A3A3A] text-lg leading-relaxed mb-5">
                “{item.quote}”
              </p>
              <div className="font-caveat text-xl text-[#2A2A2A]">
                {item.author}
              </div>
              <div className="font-kalam text-sm text-[#7A7A7A]">
                {item.role}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Lightweight accordion FAQ. Uses controlled state so content is visible on
// SSR (first item expanded by default) and interactive on the client.
export function FaqSection({ titleKey = "home.faq.title", subtitleKey = "home.faq.subtitle", itemsKey = "home.faq.items" }) {
  const { t } = useLanguage();
  const items = t(itemsKey);
  const [open, setOpen] = useState(0);
  return (
    <section className="py-16 px-6 md:px-12 bg-[#FCFAF7]/60">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-10">
          <h2 className="font-caveat text-4xl md:text-5xl font-bold text-[#2A2A2A]">
            {t(titleKey)}
          </h2>
          {subtitleKey && (
            <p className="font-kalam text-lg text-[#5A5A5A] mt-3">
              {t(subtitleKey)}
            </p>
          )}
        </Reveal>
        <div className="space-y-3">
          {(Array.isArray(items) ? items : []).map((item, idx) => {
            const isOpen = open === idx;
            return (
              <Reveal key={idx} delay={idx * 80}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : idx)}
                  className="w-full text-left bg-white border border-[#EADFD0] rounded-xl px-5 py-4 flex items-start gap-3 hover:border-[#F0C5A9] transition-colors"
                >
                  <ChevronDown
                    size={20}
                    className={`mt-1 flex-shrink-0 text-[#9A9A9A] transition-transform ${isOpen ? "rotate-180 text-[#F0C5A9]" : ""}`}
                  />
                  <div className="flex-1">
                    <div className="font-caveat text-xl text-[#2A2A2A] mb-1">
                      {item.q}
                    </div>
                    {isOpen && (
                      <div className="font-kalam text-[#5A5A5A] leading-relaxed mt-2">
                        {item.a}
                      </div>
                    )}
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
