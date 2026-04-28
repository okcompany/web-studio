"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BusAnimation from "../../components/BusAnimation";
import FloatingShapes from "../../components/FloatingShapes";
import MadeInBadge from "../../components/MadeInBadge";
import { Calendar, Clock, ImageIcon, X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { getFirstCmsImage, renderCmsContent } from "../../utils/cmsContent";

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentLanguage, t } = useLanguage();

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNewsItems(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        if (typeof window !== 'undefined') {
          const localData = localStorage.getItem('admin_news');
          if (localData) {
            try {
              const parsed = JSON.parse(localData);
              setNewsItems(parsed);
            } catch (e) {
              setNewsItems([]);
            }
          } else {
            setNewsItems([]);
          }
        } else {
          setNewsItems([]);
        }
        setLoading(false);
      });
  }, []);

  const getLocalized = (value) => {
    if (typeof value === "string") return value;
    return value?.[currentLanguage] || value?.ru || value?.en || "";
  };

  const getNewsTitle = (news) => getLocalized(news.title) || "Untitled News";
  const getNewsContent = (news) => getLocalized(news.content);
  const getNewsImage = (news) => news.cover || getFirstCmsImage(getNewsContent(news))?.url;

  const openNewsModal = (news) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const closeNewsModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE] relative">
      <FloatingShapes />
      <Header />

      {/* Заголовок страницы */}
      <section className="relative py-16 px-6 md:px-12">
        <div className="hidden md:block absolute top-24 right-8 lg:right-14 z-10">
          <MadeInBadge rotate={-5} size="sm" />
        </div>
        <div className="md:hidden flex justify-center mb-4">
          <MadeInBadge rotate={-5} size="sm" />
        </div>
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative inline-block">
            <h1 className="font-caveat text-5xl md:text-7xl font-bold text-[#2A2A2A] mb-4">
              {t('news.title')}
            </h1>
            {/* Цветное рисованное подчеркивание */}
            <svg
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-6"
              viewBox="0 0 300 24"
            >
              <path
                d="M5,12 Q75,18 150,12 Q225,6 295,15"
                stroke="url(#newsGradient)"
                strokeWidth="4"
                fill="none"
                className="hand-drawn-animation"
              />
              <defs>
                <linearGradient
                  id="newsGradient"
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

          <p className="font-kalam text-lg md:text-xl text-[#5A5A5A] mt-8 max-w-2xl mx-auto">
            {t('news.description')}
          </p>

          {/* Анимированный автобус */}
          <div className="flex justify-center mt-6">
            <BusAnimation />
          </div>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-20 right-16 opacity-20">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r="25"
              stroke="#D4C5F9"
              strokeWidth="2.5"
              fill="none"
              className="hand-drawn-animation"
            />
          </svg>
        </div>
      </section>

      {/* Список новостей */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {newsItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative inline-block">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  className="mx-auto mb-6 opacity-40"
                >
                  <rect
                    x="20"
                    y="20"
                    width="80"
                    height="80"
                    stroke="#D4C5F9"
                    strokeWidth="2.5"
                    fill="none"
                    transform="rotate(15 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="25"
                    stroke="#A8D5BA"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
                <p className="font-kalam text-xl text-[#D4C5F9]">
                  No news items yet. Create some in the admin panel.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {newsItems.map((news, index) => {
                const content = getNewsContent(news);
                const image = getNewsImage(news);
                const previewHtml = renderCmsContent(content, { stripImages: true });

                return (
                  <article
                    key={news.folder_name || index}
                    className="relative group cursor-pointer watercolor-hover"
                    onClick={() => openNewsModal(news)}
                  >
                    <div className="relative h-full">
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 300 400"
                        preserveAspectRatio="none"
                      >
                        <rect
                          x="8"
                          y="8"
                          width="284"
                          height="384"
                          stroke={`url(#newsCardGradient${index})`}
                          strokeWidth="2.5"
                          fill="none"
                          rx="4"
                          transform={`rotate(${index % 2 === 0 ? "1" : "-1"} 150 200)`}
                          className="hand-drawn-animation"
                          style={{ animationDelay: `${index * 0.2}s` }}
                        />
                        <defs>
                          <linearGradient
                            id={`newsCardGradient${index}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor={
                                index % 3 === 0
                                  ? "#F0C5A9"
                                  : index % 3 === 1
                                    ? "#D4C5F9"
                                    : "#A8D5BA"
                              }
                            />
                            <stop
                              offset="100%"
                              stopColor={
                                index % 3 === 0
                                  ? "#A8D5BA"
                                  : index % 3 === 1
                                    ? "#F0C5A9"
                                    : "#D4C5F9"
                              }
                            />
                          </linearGradient>
                        </defs>
                      </svg>

                      <div className="absolute inset-2 bg-gradient-to-br from-[#F5E6D3] via-[#E8F4F8] to-[#F0E8D6] opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-lg"></div>

                      <div className="relative p-6 space-y-4 h-full flex flex-col">
                        <div className="aspect-[4/3] relative overflow-hidden rounded-xl bg-[#F8F5EF]">
                          {image ? (
                            <img
                              src={image}
                              alt={getNewsTitle(news)}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#F5F5F5] flex items-center justify-center">
                              <ImageIcon size={48} className="text-[#F0C5A9]" />
                            </div>
                          )}

                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            viewBox="0 0 200 150"
                            preserveAspectRatio="none"
                          >
                            <rect
                              x="4"
                              y="4"
                              width="192"
                              height="142"
                              stroke="#A8D5BA"
                              strokeWidth="0.5"
                              fill="none"
                              transform="rotate(-0.5 100 75)"
                            />
                          </svg>
                        </div>

                        <div className="relative">
                          <h2 className="font-caveat text-2xl font-bold text-[#2A2A2A] mb-2">
                            {getNewsTitle(news)}
                          </h2>
                          <svg
                            className="absolute -bottom-1 left-0 w-3/4 h-3 opacity-70"
                            viewBox="0 0 150 12"
                          >
                            <path
                              d="M2,6 Q40,9 75,6 Q110,3 148,6"
                              stroke="#D4C5F9"
                              strokeWidth="1"
                              fill="none"
                            />
                          </svg>
                        </div>

                        <div className="font-kalam text-base text-[#5A5A5A] leading-relaxed line-clamp-4 flex-1">
                          <div
                            className="cms-content"
                            dangerouslySetInnerHTML={{ __html: previewHtml }}
                          />
                        </div>

                        <div className="font-kalam text-sm text-[#A8D5BA]">
                          {t('news.readMore')}
                        </div>

                        <div className="flex items-center justify-between pt-2 text-[#5A5A5A]">
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-[#A8D5BA]" />
                            <span className="font-kalam text-sm">{news.date}</span>
                          </div>
                          <Clock
                            size={16}
                            className="text-[#F0C5A9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {isModalOpen && selectedNews && (
        <div
          className="fixed inset-0 bg-[#2A2A2A]/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeNewsModal}
        >
          <div
            className="bg-[#FEFEFE] max-w-4xl w-full max-h-[90vh] overflow-y-auto relative rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeNewsModal}
              className="sticky top-4 ml-auto mr-4 mt-4 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 text-[#A8D5BA] hover:text-[#2A2A2A] shadow-md transition-colors duration-300 z-20"
              aria-label="Close news"
            >
              <X size={24} />
            </button>

            <div className="relative px-6 pb-8 pt-2 lg:px-12 lg:pb-12">
              <svg
                className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <rect
                  x="4"
                  y="4"
                  width="92"
                  height="92"
                  stroke="url(#newsModalGradient)"
                  strokeWidth="1.5"
                  fill="none"
                  rx="4"
                  transform="rotate(-0.4 50 50)"
                />
                <defs>
                  <linearGradient
                    id="newsModalGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#F0C5A9" />
                    <stop offset="50%" stopColor="#A8D5BA" />
                    <stop offset="100%" stopColor="#D4C5F9" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="relative space-y-8">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="font-caveat text-4xl lg:text-5xl font-bold text-[#2A2A2A] mb-4">
                    {getNewsTitle(selectedNews)}
                  </h2>
                  <svg className="w-3/4 h-4 mx-auto opacity-70" viewBox="0 0 300 16">
                    <path
                      d="M5,8 Q75,12 150,8 Q225,4 295,8"
                      stroke="#D4C5F9"
                      strokeWidth="2.5"
                      fill="none"
                    />
                  </svg>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-[#5A5A5A]">
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} className="text-[#A8D5BA]" />
                    <span className="font-kalam text-lg">{selectedNews.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={18} className="text-[#F0C5A9]" />
                    <span className="font-kalam text-lg">{t('news.storyDetails')}</span>
                  </div>
                </div>

                {getNewsImage(selectedNews) && (
                  <div className="relative max-w-2xl mx-auto">
                    <div className="aspect-[16/9] relative overflow-hidden rounded-2xl bg-[#F8F5EF]">
                      <img
                        src={getNewsImage(selectedNews)}
                        alt={getNewsTitle(selectedNews)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className="max-w-3xl mx-auto">
                  <div
                    className="cms-content font-kalam text-lg lg:text-xl text-[#5A5A5A] leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: renderCmsContent(getNewsContent(selectedNews))
                    }}
                  />
                </div>

                <div className="text-center pt-4">
                  <svg width="100" height="12" viewBox="0 0 100 12" className="mx-auto opacity-60">
                    <path
                      d="M5,6 Q25,3 50,6 Q75,9 95,6"
                      stroke="#F0C5A9"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
