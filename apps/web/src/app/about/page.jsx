
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';
import FloatingShapes from '../../components/FloatingShapes';
import MadeInBadge from '../../components/MadeInBadge';
import {
  Palette,
  Code2,
  Sparkles,
  Wrench,
  Handshake,
  Zap,
  Gem,
  Heart,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  const services = t('services.items');
  const steps = t('process.steps');
  const story = t('about.story');
  const values = t('about.values');
  const funFacts = t('about.funFacts');
  const stackMeta = t('about.stack');
  const icons = [Palette, Code2, Sparkles, Wrench];
  const valueIcons = [Handshake, Zap, Gem, Heart];
  const palette = ['#A8D5BA', '#F0C5A9', '#D4C5F9', '#BEE3DB'];

  return (
    <div className="min-h-screen bg-[#FEFEFE] relative">
      <FloatingShapes />
      <Header />

      {/* Заголовок страницы */}
      <section className="relative py-10 px-4 sm:py-14 sm:px-8 md:py-16 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative inline-block">
            <h1 className="font-caveat text-4xl sm:text-5xl md:text-7xl font-bold text-[#2A2A2A] mb-4">
              {t('about.title')}
            </h1>
            {/* Цветное рисованное подчеркивание */}
            <svg
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 sm:w-4/5 h-6"
              viewBox="0 0 300 24"
            >
              <path
                d="M5,12 Q75,18 150,12 Q225,6 295,15"
                stroke="url(#aboutGradient)"
                strokeWidth="4"
                fill="none"
                className="hand-drawn-animation"
              />
              <defs>
                <linearGradient
                  id="aboutGradient"
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
          <p className="font-kalam text-base sm:text-lg md:text-xl text-[#5A5A5A] mt-6 sm:mt-8 max-w-xl sm:max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-10 left-2 sm:top-20 sm:left-10 opacity-20 float-slow">
          <svg width="60" height="60" className="sm:w-80 sm:h-80" viewBox="0 0 80 80">
            <rect
              x="10"
              y="10"
              width="40"
              height="40"
              stroke="#A8D5BA"
              strokeWidth="2.5"
              fill="none"
              transform="rotate(25 40 40)"
              className="hand-drawn-animation"
            />
          </svg>
        </div>
      </section>

      {/* Основной контент: слева текст, справа фото с рамкой */}
      <section className="py-8 px-4 sm:py-12 sm:px-8 md:py-12 md:px-12">
        <Reveal className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-8 flex flex-col-reverse md:flex-row gap-8 items-center">
          {/* Текстовый блок слева */}
          <div className="flex-1 text-left">
            <h2 className="font-kalam text-xl sm:text-2xl text-[#2A2A2A] mb-4">{t('about.title')}</h2>
            <p className="text-base sm:text-lg text-[#5A5A5A] mb-6">
              {t('about.content')}
            </p>
            <ul className="list-disc list-inside text-[#5A5A5A] space-y-2">
              {Array.isArray(t('about.list'))
                ? t('about.list').map((item, idx) => <li key={idx}>{item}</li>)
                : null}
            </ul>
          </div>
          {/* Фото с SVG-рамкой справа */}
          <div className="flex-1 flex flex-col justify-center items-center relative min-w-[220px] max-w-[320px]">
            <div className="mb-3 self-center">
              <MadeInBadge rotate={3} size="sm" />
            </div>
            <div className="relative w-full h-full flex justify-center items-center">
              <img
                src="/uploads/about-photo.jpg"
                alt="about"
                className="w-56 h-56 object-cover rounded-xl z-10"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/about-placeholder.svg";
                }}
              />
              {/* SVG-рамка: волнистая линия */}
              <svg className="absolute top-0 left-0 w-56 h-56 pointer-events-none z-0" viewBox="0 0 224 224">
                <path
                  d="M12,30 Q40,10 70,30 Q100,50 130,30 Q160,10 190,30 Q210,50 210,110 Q210,170 190,194 Q160,214 130,194 Q100,174 70,194 Q40,214 12,194 Q4,170 12,110 Q4,50 12,30 Z"
                  stroke="#F0C5A9"
                  strokeWidth="4"
                  fill="none"
                  className="hand-drawn-animation"
                />
                <path
                  d="M24,44 Q50,24 80,44 Q110,64 140,44 Q170,24 200,44 Q218,64 218,110 Q218,156 200,180 Q170,200 140,180 Q110,160 80,180 Q50,200 24,180 Q16,156 24,110 Q16,64 24,44 Z"
                  stroke="#A8D5BA"
                  strokeWidth="2"
                  fill="none"
                  className="hand-drawn-animation"
                  style={{ animationDelay: '0.4s' }}
                />
              </svg>
            </div>
          </div>
        </Reveal>
      </section>

      {/* История */}
      {story && story.paragraphs && (
        <section className="py-12 px-4 sm:px-8 md:px-12">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center mb-8">
              <h2 className="font-caveat text-3xl md:text-4xl font-bold text-[#2A2A2A]">
                {story.title}
              </h2>
            </Reveal>
            <div className="space-y-5 font-kalam text-base sm:text-lg text-[#3A3A3A] leading-relaxed">
              {story.paragraphs.map((p, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ценности */}
      {values && Array.isArray(values.items) && (
        <section className="py-12 px-4 sm:px-8 md:px-12 bg-[#FCFAF7]/60">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-10">
              <h2 className="font-caveat text-3xl md:text-4xl font-bold text-[#2A2A2A]">
                {values.title}
              </h2>
              <p className="font-kalam text-[#5A5A5A] mt-2">{values.subtitle}</p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.items.map((v, idx) => {
                const Icon = valueIcons[idx % valueIcons.length];
                const color = palette[idx % palette.length];
                return (
                  <Reveal
                    key={idx}
                    delay={idx * 100}
                    className="bg-white/80 rounded-2xl p-5 border border-[#EADFD0] watercolor-hover"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${color}33`, color }}
                    >
                      <Icon size={20} />
                    </div>
                    <h3 className="font-caveat text-xl text-[#2A2A2A] mb-1">
                      {v.title}
                    </h3>
                    <p className="font-kalam text-sm text-[#5A5A5A]">
                      {v.description}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tech stack */}
      {stackMeta && (
        <section className="py-12 px-4 sm:px-8 md:px-12 bg-[#FCFAF7]/60">
          <div className="max-w-4xl mx-auto">
            <Reveal className="text-center mb-8">
              <h2 className="font-caveat text-3xl md:text-4xl font-bold text-[#2A2A2A]">
                {stackMeta.title}
              </h2>
              <p className="font-kalam text-[#5A5A5A] mt-2">
                {stackMeta.subtitle}
              </p>
            </Reveal>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'React', color: '#61DAFB' },
                { name: 'Next.js', color: '#2A2A2A' },
                { name: 'React Router', color: '#CA4245' },
                { name: 'Tailwind', color: '#38BDF8' },
                { name: 'Figma', color: '#F04E23' },
                { name: 'Node.js', color: '#8BC34A' },
                { name: 'Framer', color: '#0055FF' },
                { name: 'Vercel', color: '#2A2A2A' },
                { name: 'Resend', color: '#FF6B6B' },
                { name: 'TypeScript', color: '#3178C6' },
              ].map((tool, idx) => (
                <Reveal
                  key={tool.name}
                  delay={idx * 60}
                  className="bg-white px-4 py-2 rounded-xl border border-[#EADFD0] font-kalam text-sm text-[#2A2A2A] flex items-center gap-2 sticker-shadow watercolor-hover"
                  style={{
                    transform: `rotate(${(idx % 2 ? 1 : -1) * (idx % 3 + 1) * 0.4}deg)`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: tool.color }}
                  />
                  {tool.name}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fun facts */}
      {funFacts && Array.isArray(funFacts.items) && (
        <section className="py-12 px-4 sm:px-8 md:px-12">
          <div className="max-w-4xl mx-auto">
            <Reveal className="text-center mb-8">
              <h2 className="font-caveat text-3xl md:text-4xl font-bold text-[#2A2A2A]">
                {funFacts.title}
              </h2>
            </Reveal>
            <div className="flex flex-wrap justify-center gap-3">
              {funFacts.items.map((fact, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 60}
                  className="bg-white px-4 py-2 rounded-full border border-[#EADFD0] font-kalam text-sm sm:text-base text-[#3A3A3A] sticker-shadow"
                  style={{
                    transform: `rotate(${(idx % 2 ? 1 : -1) * (idx % 3 + 1) * 0.4}deg)`,
                  }}
                >
                  {fact}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Услуги */}
      <section className="py-12 px-4 sm:px-8 md:px-12 bg-[#FCFAF7]/60">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="font-caveat text-3xl md:text-4xl font-bold text-[#2A2A2A]">
              {t('services.title')}
            </h2>
            <p className="font-kalam text-[#5A5A5A] mt-2">{t('services.subtitle')}</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Array.isArray(services) ? services : []).map((s, idx) => {
              const Icon = icons[idx % icons.length];
              const color = palette[idx % palette.length];
              return (
                <Reveal
                  key={idx}
                  delay={idx * 120}
                  className="bg-white/70 rounded-2xl p-5 shadow-sm watercolor-hover"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${color}33`, color }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="font-caveat text-xl text-[#2A2A2A] mb-1">{s.title}</h3>
                  <p className="font-kalam text-sm text-[#5A5A5A]">{s.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Процесс */}
      <section className="py-12 px-4 sm:px-8 md:px-12">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="font-caveat text-3xl md:text-4xl font-bold text-[#2A2A2A]">
              {t('process.title')}
            </h2>
            <p className="font-kalam text-[#5A5A5A] mt-2">{t('process.subtitle')}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {(Array.isArray(steps) ? steps : []).map((s, idx) => (
              <Reveal
                key={idx}
                delay={idx * 120}
                className="p-5 rounded-2xl border border-[#EADFD0] bg-white/60"
              >
                <div className="font-caveat text-4xl text-[#A8D5BA] leading-none mb-1">
                  0{idx + 1}
                </div>
                <h3 className="font-caveat text-xl text-[#2A2A2A] mb-1">{s.title}</h3>
                <p className="font-kalam text-sm text-[#5A5A5A]">{s.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-8 md:px-12">
        <Reveal className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#E8F4F8] via-[#F0E8D6] to-[#F5E6F8] rounded-3xl p-8 md:p-12">
          <h2 className="font-caveat text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-3">
            {t('cta.title')}
          </h2>
          <p className="font-kalam text-[#5A5A5A] mb-6 max-w-xl mx-auto">
            {t('cta.description')}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#2A2A2A] text-white font-kalam px-6 py-3 rounded-full hover:bg-[#444] transition-colors watercolor-hover"
          >
            {t('cta.button')}
          </a>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
