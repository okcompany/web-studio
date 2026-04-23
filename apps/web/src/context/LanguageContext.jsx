"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../utils/i18n";

const LanguageContext = createContext();

const COOKIE_NAME = "ok_lang";
const SUPPORTED = ["de", "ru", "en"];

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguage должен использоваться внутри LanguageProvider",
    );
  }
  return context;
};

const tFactory = (language) => (key) => {
  if (!key) return "";
  const keys = key.split(".");
  let value = translations[language] || translations["de"];

  for (const k of keys) {
    if (value === undefined || value === null) return key;
    value = value[k];
  }

  return value !== undefined ? value : key;
};

function readCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name, value, days = 365) {
  if (typeof document === "undefined") return;
  const maxAge = 60 * 60 * 24 * days;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function detectFromNavigator() {
  if (typeof navigator === "undefined") return null;
  const langs = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || "de"];
  for (const raw of langs) {
    const base = String(raw).toLowerCase().slice(0, 2);
    if (SUPPORTED.includes(base)) return base;
  }
  return null;
}

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("de");
  const [t, setT] = useState(() => tFactory("de"));

  useEffect(() => {
    setT(() => tFactory(currentLanguage));
  }, [currentLanguage]);

  // Load preferred language: cookie → localStorage → Accept-Language → default
  useEffect(() => {
    try {
      const fromCookie = readCookie(COOKIE_NAME);
      if (fromCookie && SUPPORTED.includes(fromCookie)) {
        setCurrentLanguage(fromCookie);
        return;
      }
      const fromStorage =
        typeof localStorage !== "undefined"
          ? localStorage.getItem("preferred-language")
          : null;
      if (fromStorage && SUPPORTED.includes(fromStorage)) {
        setCurrentLanguage(fromStorage);
        writeCookie(COOKIE_NAME, fromStorage);
        return;
      }
      const fromNavigator = detectFromNavigator();
      if (fromNavigator) {
        setCurrentLanguage(fromNavigator);
        writeCookie(COOKIE_NAME, fromNavigator);
      }
    } catch (_) {
      // ignore environment errors, keep default
    }
  }, []);

  const changeLanguage = (language) => {
    const next = SUPPORTED.includes(language) ? language : "de";
    setCurrentLanguage(next);
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("preferred-language", next);
      }
      writeCookie(COOKIE_NAME, next);
    } catch (_) {
      // ignore
    }
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
