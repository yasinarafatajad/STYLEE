import React from 'react';
import { CATEGORIES } from '../data';

interface FeaturedCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
}

export default function FeaturedCategories({ onSelectCategory }: FeaturedCategoriesProps) {
  // Find the categories by their IDs for specific grid mapping
  const menCat = CATEGORIES.find(c => c.id === "Men") || CATEGORIES[0];
  const womenCat = CATEGORIES.find(c => c.id === "Women") || CATEGORIES[1];
  const gearCat = CATEGORIES.find(c => c.id === "Accessories") || CATEGORIES[2];
  const kicksCat = CATEGORIES.find(c => c.id === "Footwear") || CATEGORIES[3];

  return (
    <section
      id="collections"
      className="py-24 bg-[#0A0A0A] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="mb-16">
          <span className="text-xs font-mono tracking-[0.25em] text-[#D90429] uppercase block mb-3">
            CURATED EDITIONS
          </span>
          <h2 className="text-4xl md:text-6xl font-light font-serif tracking-tight text-[#F5F1E8]">
            Shop by <span className="font-extrabold font-sans italic text-[#D90429]">Category</span>
          </h2>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          
          {/* Left Column: TALL MEN box */}
          <div
            id={`cat-card-${menCat.id}`}
            onClick={() => onSelectCategory(menCat.id)}
            className="group relative h-[300px] sm:h-[420px] md:h-[600px] bg-[#121212] border border-white/5 overflow-hidden cursor-pointer"
          >
            {/* Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={menCat.image}
                alt={menCat.name}
                className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-750 ease-out group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
            </div>

            {/* Labels */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
              <h3 className="text-3xl sm:text-4xl md:text-6xl font-sans font-black tracking-tighter text-white uppercase leading-none">
                MEN
              </h3>
              <span className="text-[9px] md:text-[10px] font-mono tracking-[0.3em] text-[#D90429] uppercase mt-2 block font-bold">
                EXPLORE
              </span>
            </div>

            {/* Red top-right dot */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 w-1.5 h-1.5 bg-[#D90429] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Right Column: Split Vertically (WOMEN on top, GEAR/KICKS on bottom split) */}
          <div className="flex flex-col gap-4 lg:gap-6 h-full justify-between">
            
            {/* Top Wide: WOMEN box */}
            <div
              id={`cat-card-${womenCat.id}`}
              onClick={() => onSelectCategory(womenCat.id)}
              className="group relative h-[142px] sm:h-[200px] md:h-[288px] bg-[#121212] border border-white/5 overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={womenCat.image}
                  alt={womenCat.name}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-750 ease-out group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              </div>

              {/* Labels */}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-black tracking-tighter text-white uppercase leading-none">
                  WOMEN
                </h3>
              </div>

              {/* Red top-right dot */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 w-1.5 h-1.5 bg-[#D90429] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Bottom Row: Split GEAR and KICKS */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6 h-[142px] sm:h-[200px] md:h-[288px]">
              
              {/* Bottom-Left: GEAR */}
              <div
                id={`cat-card-${gearCat.id}`}
                onClick={() => onSelectCategory(gearCat.id)}
                className="group relative h-full bg-[#121212] border border-white/5 overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={gearCat.image}
                    alt={gearCat.name}
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-750 ease-out group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>

                {/* Labels */}
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10">
                  <h3 className="text-base md:text-2xl font-sans font-black tracking-tight text-white uppercase leading-none">
                    GEAR
                  </h3>
                </div>

                {/* Red top-right dot */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-[#D90429] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Bottom-Right: KICKS */}
              <div
                id={`cat-card-${kicksCat.id}`}
                onClick={() => onSelectCategory(kicksCat.id)}
                className="group relative h-full bg-[#121212] border border-white/5 overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={kicksCat.image}
                    alt={kicksCat.name}
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-750 ease-out group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>

                {/* Labels */}
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10">
                  <h3 className="text-base md:text-2xl font-sans font-black tracking-tight text-white uppercase leading-none">
                    KICKS
                  </h3>
                </div>

                {/* Red top-right dot */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-[#D90429] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
