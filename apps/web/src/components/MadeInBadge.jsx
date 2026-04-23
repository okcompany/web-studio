"use client";

import { useLanguage } from "../context/LanguageContext";

// Sticker-style "Made in Deutschland — with love" badge with a hand-drawn
// heart. Used in the footer (and anywhere a little charm is welcome).
export default function MadeInBadge({ className = "", rotate = -2, size = "md" }) {
  const { t } = useLanguage();
  const sizing =
    size === "sm"
      ? "px-3 py-1.5 text-xs"
      : size === "lg"
        ? "px-5 py-2.5 text-base"
        : "px-4 py-2 text-sm";
  return (
    <div
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#FFF6EC] border border-[#F0C5A9] shadow-sm font-kalam text-[#5A3E2B] ${sizing} ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 3px 0 -1px #F0C5A9, 0 6px 10px -6px rgba(0,0,0,0.1)",
      }}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M12 20.5 S3.5 14 3.5 8.8 A4.3 4.3 0 0 1 12 7.2 A4.3 4.3 0 0 1 20.5 8.8 C20.5 14 12 20.5 12 20.5 Z"
          fill="#E57373"
          stroke="#B0463D"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-heartbeat"
          style={{ transformOrigin: "center" }}
        />
      </svg>
      <span>{t("footer.madeIn")}</span>
    </div>
  );
}
