"use client";

import { Link } from "react-router";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import MadeInBadge from "./MadeInBadge";
import Tooltip from "./Tooltip";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 py-12 px-6 md:px-12 border-t border-[#EADFD0]">
      {/* Small "available" sticker at the top-right of the footer */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-end">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF7EE] border border-[#A8D5BA] font-kalam text-xs text-[#2F5D43] sticker-shadow"
          style={{ transform: "rotate(1deg)" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6BC28F] opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6BC28F]"></span>
          </span>
          {t("badges.available")}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="font-caveat text-2xl font-bold text-[#2A2A2A] mb-2">
            {t("footer.tagline")}
          </div>
          <p className="font-kalam text-sm text-[#5A5A5A] max-w-xs">
            {t("home.description")}
          </p>
        </div>

        <div>
          <div className="font-caveat text-xl text-[#2A2A2A] mb-3">
            {t("footer.quickLinks")}
          </div>
          <ul className="space-y-2 font-kalam text-[#5A5A5A]">
            <li><Link to="/" className="hover:text-[#2A2A2A] transition-colors">{t("nav.home")}</Link></li>
            <li><Link to="/portfolio" className="hover:text-[#2A2A2A] transition-colors">{t("nav.portfolio")}</Link></li>
            <li><Link to="/news" className="hover:text-[#2A2A2A] transition-colors">{t("nav.news")}</Link></li>
            <li><Link to="/about" className="hover:text-[#2A2A2A] transition-colors">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-[#2A2A2A] transition-colors">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-caveat text-xl text-[#2A2A2A] mb-3">
            {t("footer.contact")}
          </div>
          <ul className="space-y-2 font-kalam text-[#5A5A5A]">
            <li className="flex items-center gap-2">
              <MessageCircle size={16} />
              <Link
                to="/contact"
                className="hover:text-[#2A2A2A] transition-colors"
              >
                @OKwebDesign_bot
              </Link>
            </li>
            <li>
              <Tooltip text={t("footer.tooltip") || "Say hi!"}>
                <Link
                  to="/contact"
                  data-heart-burst
                  className="inline-flex items-center gap-2 mt-1 px-3 py-1.5 rounded-full bg-[#F0C5A9] text-[#2A2A2A] text-sm font-kalam hover:bg-[#E8B894] transition-colors sticker-shadow heart-burst"
                >
                  {t("cta.button")}
                </Link>
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#F0E8D6] flex flex-col gap-5">
        <p className="font-kalam text-xs text-[#9A9A9A] text-center md:text-left max-w-4xl">
          {t("legal.portfolioNote")}
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-kalam text-xs text-[#9A9A9A] flex flex-wrap items-center gap-x-4 gap-y-2 justify-center md:justify-start">
            <span>© {year} Oleh Kalchenko. {t("footer.rights")}</span>
            <span className="hidden md:inline text-[#D8D0C2]">·</span>
            <Link to="/impressum" className="hover:text-[#2A2A2A] transition-colors underline decoration-dotted decoration-[#D4C5F9] underline-offset-4">
              {t("legal.impressumLink")}
            </Link>
            <span className="hidden md:inline text-[#D8D0C2]">·</span>
            <Link to="/datenschutz" className="hover:text-[#2A2A2A] transition-colors underline decoration-dotted decoration-[#A8D5BA] underline-offset-4">
              {t("legal.datenschutzLink")}
            </Link>
          </div>
          <MadeInBadge />
        </div>
      </div>
    </footer>
  );
}
