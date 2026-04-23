"use client";

import { Link } from "react-router";
import { Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 py-12 px-6 md:px-12 border-t border-[#EADFD0]">
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
            <li><a href="/" className="hover:text-[#2A2A2A] transition-colors">{t("nav.home")}</a></li>
            <li><a href="/portfolio" className="hover:text-[#2A2A2A] transition-colors">{t("nav.portfolio")}</a></li>
            <li><a href="/news" className="hover:text-[#2A2A2A] transition-colors">{t("nav.news")}</a></li>
            <li><a href="/about" className="hover:text-[#2A2A2A] transition-colors">{t("nav.about")}</a></li>
            <li><a href="/contact" className="hover:text-[#2A2A2A] transition-colors">{t("nav.contact")}</a></li>
          </ul>
        </div>

        <div>
          <div className="font-caveat text-xl text-[#2A2A2A] mb-3">
            {t("footer.contact")}
          </div>
          <ul className="space-y-2 font-kalam text-[#5A5A5A]">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <Link
                to="/contact"
                className="hover:text-[#2A2A2A] transition-colors"
              >
                kalchenko2022@gmail.com
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={16} />
              <Link
                to="/contact"
                className="hover:text-[#2A2A2A] transition-colors"
              >
                @OKwebDesign_bot
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#F0E8D6] font-kalam text-xs text-[#9A9A9A] text-center">
        © {year} Oleh Kalchenko. {t("footer.rights")}
      </div>
    </footer>
  );
}
