"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingShapes from "../../components/FloatingShapes";
import { useLanguage } from "../../context/LanguageContext";
import { DEFAULT_LEGAL } from "../../utils/defaultLegal";

// Impressum page — renders the Impressum text currently stored via the
// admin panel (/api/legal). Until the admin first saves the page, we fall
// back to a neutral portfolio-mode seed from DEFAULT_LEGAL.
export default function ImpressumPage() {
  const { t, currentLanguage } = useLanguage();
  const [legal, setLegal] = useState(DEFAULT_LEGAL);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/legal")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data || !data.impressum) return;
        setLegal(data);
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoaded(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const lang = ["de", "en", "ru"].includes(currentLanguage)
    ? currentLanguage
    : "en";
  const body = legal.impressum[lang] || legal.impressum.de || "";
  const updated =
    legal.updatedAt &&
    new Date(legal.updatedAt).toISOString().slice(0, 10);

  return (
    <div className="min-h-screen bg-[#FEFEFE] relative">
      <FloatingShapes />
      <Header />

      <section className="py-12 px-4 sm:px-8 md:px-12">
        <div className="max-w-3xl mx-auto bg-white/80 border border-[#EADFD0] rounded-2xl p-6 sm:p-10 shadow-sm">
          <h1 className="font-caveat text-4xl sm:text-5xl font-bold text-[#2A2A2A] mb-6">
            {t("legal.impressumTitle")}
          </h1>

          <div className="font-kalam text-[#3A3A3A] leading-relaxed text-base sm:text-lg whitespace-pre-line">
            {body}
          </div>

          <p className="mt-10 pt-6 border-t border-[#EADFD0] font-kalam text-xs text-[#9A9A9A]">
            {t("legal.lastUpdated")}: {updated || "—"}
            {!loaded ? "  ·  …" : ""}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
