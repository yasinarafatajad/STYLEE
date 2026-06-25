import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_SLIDES } from '../data';

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => {
      clearInterval(slideInterval);
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Touch Swipe Support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      // Swiped Left
      handleNext();
    } else if (diff < -50) {
      // Swiped Right
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Mouse Drag Support
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const dragEndX = e.clientX;
    const diff = dragStartX.current - dragEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    dragStartX.current = null;
  };

  return (
    <section
      id="home"
      className="relative w-full h-[70vh] md:h-[80vh] bg-[#0A0A0A] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Slides Container */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent via-transparent via-transparent to-black/35 z-10" />
            
            {/* Editorial Captions */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 lg:px-24 z-25 pointer-events-none select-none">
               {/* <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-[#F5F1E8] mb-4 font-mono font-medium"
              >
                {currentIndex === 0 ? "Winter Campaign 2026" : currentIndex === 1 ? "Premium Monochrome" : currentIndex === 2 ? "Raw Utility Drop" : "Earthtone Distressed"}
              </motion.p> */}
              
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl sm:text-7xl lg:text-9xl font-light font-serif leading-none tracking-tighter italic text-[#F5F1E8]"
              >
                {currentIndex === 0 ? (
                  <>
                    Fearless <br />
                    <span className="font-black not-italic font-display uppercase tracking-tight text-[#D90429]">Elegance.</span>
                  </>
                ) : currentIndex === 1 ? (
                  <>
                    Silent <br />
                    <span className="font-black not-italic font-display uppercase tracking-tight text-[#F5F1E8]">Symmetry.</span>
                  </>
                ) : currentIndex === 2 ? (
                  <>
                    Tough <br />
                    <span className="font-black not-italic font-display uppercase tracking-tight text-[#D90429]">Texture.</span>
                  </>
                ) : (
                  <>
                    Worn <br />
                    <span className="font-black not-italic font-display uppercase tracking-tight text-[#F5F1E8]">Structure.</span>
                  </>
                )}
              </motion.h2>
            </div>

            <img
              src={HERO_SLIDES[currentIndex].image}
              alt={HERO_SLIDES[currentIndex].alt}
              className="w-full h-full object-cover object-center pointer-events-none md:object-[center_35%]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Pagination Indicator */}
      <div className="absolute bottom-10 left-8 md:left-16 z-30 flex items-center gap-6">
        <div className="flex gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              id={`hero-dot-${index}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`h-[2px] transition-all duration-300 ${
                index === currentIndex ? 'w-12 bg-[#D90429]' : 'w-6 bg-white/20 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <span className="text-[10px] font-mono tracking-[0.2em] text-white/50 select-none">
          0{currentIndex + 1} / 04
        </span>
      </div>

    </section>
  );
}
