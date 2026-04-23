"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Small hand-written sticky note in the bottom-left corner with a friendly
// greeting. Shows up ~3 seconds after the first paint, can be dismissed
// and stays dismissed for the rest of the session (sessionStorage).
const MESSAGES = {
  de: [
    "Hi! Schön, dass du da bist!",
    "Kaffee, Design, und los geht’s!",
    "Viel Spaß beim Stöbern!",
  ],
  en: [
    "Hey there — thanks for dropping by!",
    "Grab a coffee and enjoy the scroll.",
    "Hope you find something you love.",
  ],
  ru: [
    "Привет! Рад, что заглянули.",
    "Чайку и приятного просмотра!",
    "Спасибо, что заглянули — вам рады.",
  ],
};

export default function StickyNote() {
  const { currentLanguage } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem("sticky-dismissed") === "1") return;
    } catch {}
    const lang = ["de", "en", "ru"].includes(currentLanguage)
      ? currentLanguage
      : "en";
    const pool = MESSAGES[lang];
    setText(pool[Math.floor(Math.random() * pool.length)]);
    const timer = window.setTimeout(() => setVisible(true), 3200);
    return () => window.clearTimeout(timer);
  }, [currentLanguage]);

  function handleClose() {
    setVisible(false);
    try {
      window.sessionStorage.setItem("sticky-dismissed", "1");
    } catch {}
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-40 max-w-[230px]"
      style={{
        transform: "rotate(-4deg)",
        animation: "fadeUp 0.6s ease-out both",
      }}
    >
      <div
        className="relative rounded-md p-4 pr-7 font-caveat text-lg text-[#5A3E2B] border border-[#EADFD0]"
        style={{
          background:
            "linear-gradient(180deg, #FFF3B8 0%, #FFEA98 100%)",
          boxShadow:
            "0 4px 0 -1px rgba(240, 197, 169, 0.9), 0 10px 16px -10px rgba(0,0,0,0.25)",
        }}
      >
        {/* Pretend piece of tape */}
        <div
          className="absolute left-1/2 -top-3 w-14 h-4 -translate-x-1/2"
          style={{
            background: "rgba(200, 190, 170, 0.45)",
            transform: "translateX(-50%) rotate(-8deg)",
            borderRadius: 2,
          }}
        />
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-1 right-1 p-1 text-[#8A6A3A] hover:text-[#5A3E2B]"
        >
          <X size={14} />
        </button>
        {text}
      </div>
    </div>
  );
}
