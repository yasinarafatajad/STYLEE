import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS } from '../data';

export default function CommunityReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);

  // Auto Scroll logic
  useEffect(() => {
    if (!isAutoScrollActive) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoScrollActive]);

  const handlePrev = () => {
    setIsAutoScrollActive(false);
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setIsAutoScrollActive(false);
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  // Helper to calculate wrapped positions for adjacent visible items
  const getWrappedOffset = (index: number) => {
    let diff = index - activeIndex;
    const count = REVIEWS.length;
    if (diff < -count / 2) diff += count;
    if (diff > count / 2) diff -= count;
    return diff;
  };

  return (
    <section
      id="reviews"
      className="py-24 bg-[#0A0A0A] border-t border-white/5 overflow-hidden relative"
      onMouseEnter={() => setIsAutoScrollActive(false)}
      onMouseLeave={() => setIsAutoScrollActive(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono tracking-[0.25em] text-[#D90429] uppercase block mb-3">
            LUXURY EXPERIENCES
          </span>
          <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight text-[#F5F1E8]">
            Community <span className="font-extrabold font-sans italic text-[#D90429]">Love</span>
          </h2>
        </div>

        {/* Carousel Custom Controls */}
        <div id="review-controls" className="flex items-center gap-2">
          <button
            id="review-prev-btn"
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-[#F5F1E8] hover:border-[#D90429] hover:bg-zinc-950 transition-all duration-300"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            id="review-next-btn"
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-[#D90429] border border-[#D90429] flex items-center justify-center text-white hover:bg-[#8B0000] transition-all duration-300"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Luxury Perspective Carousel Outer Area */}
      <div className="relative h-[560px] md:h-[620px] w-full flex items-center justify-center overflow-visible">
        <div className="absolute w-full max-w-sm md:max-w-md h-full flex items-center justify-center">
          {REVIEWS.map((review, index) => {
            const offset = getWrappedOffset(index);
            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible) return null;

            return (
              <motion.div
                key={review.id}
                id={`review-card-${review.id}`}
                style={{
                  zIndex: isActive ? 10 : 5,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
                animate={{
                  x: offset * 320, // offset translation
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : 0.45,
                  rotateY: offset * -15, // dynamic depth angle
                }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 18,
                }}
                className="absolute w-[300px] md:w-[380px] aspect-[3/4] bg-[#121212] overflow-hidden rounded-none border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-default"
              >
                {/* 3:4 Base Review Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
