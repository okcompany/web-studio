import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Default slides committed to the repo under public/slideshow/ — always
// present on a fresh clone so the site renders immediately even without the
// CMS configured.
const DEFAULT_SLIDES = [
    '/slideshow/slide-1.webp',
    '/slideshow/slide-2.webp',
    '/slideshow/slide-3.webp',
    '/slideshow/slide-4.webp',
    '/slideshow/slide-5.webp',
];

export default function HandDrawnSlideshow() {
    const [slides, setSlides] = useState(DEFAULT_SLIDES);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Load custom slides from the CMS; fall back silently to defaults on any
    // error so the hero always renders.
    useEffect(() => {
        let cancelled = false;
        fetch('/api/slideshow')
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                if (cancelled) return;
                if (
                    data &&
                    Array.isArray(data.items) &&
                    data.items.length > 0
                ) {
                    setSlides(data.items.map((it) => it.url));
                    setCurrentIndex(0);
                }
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative aspect-square w-full max-w-lg mx-auto">
            <svg
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                viewBox="0 0 400 400"
                preserveAspectRatio="none"
            >
                <rect
                    x="20"
                    y="20"
                    width="360"
                    height="360"
                    stroke="url(#frameGradient)"
                    strokeWidth="3"
                    fill="none"
                    transform="rotate(2 200 200)"
                    className="hand-drawn-animation"
                />
                <defs>
                    <linearGradient
                        id="frameGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="#D4C5F9" />
                        <stop offset="50%" stopColor="#A8D5BA" />
                        <stop offset="100%" stopColor="#F0C5A9" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="absolute inset-6 sm:inset-10 md:inset-12 z-10 overflow-hidden transform rotate-2">
                <AnimatePresence>
                    <motion.img
                        key={slides[currentIndex] + currentIndex}
                        src={slides[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.5, ease: 'easeInOut' }}
                        className="absolute inset-0 w-full h-full object-contain scale-125"
                        loading="lazy"
                    />
                </AnimatePresence>
            </div>

            <div className="absolute -bottom-8 -right-4 opacity-50 z-20">
                <span className="font-caveat text-sm text-[#A8D5BA] transform rotate-12 inline-block">
                    OK Design ✓
                </span>
            </div>
        </div>
    );
}
