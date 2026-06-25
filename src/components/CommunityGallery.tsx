import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import { INSTAGRAM_IMAGES } from '../data';

export default function CommunityGallery() {
  return (
    <section
      id="community-gallery"
      className="py-24 bg-[#0A0A0A] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Block */}
        <div className="mb-16 text-center">
          <span className="text-xs font-mono tracking-[0.25em] text-[#D90429] uppercase block mb-3">
            ON INSTAGRAM
          </span>
          <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight text-[#F5F1E8]">
            Styled by the <span className="font-extrabold font-sans italic text-[#D90429]">Community</span>
          </h2>
          <p className="text-xs text-zinc-500 font-mono mt-2 uppercase">
            TAG YOUR FIT WITH <span className="text-[#D90429]">#STYLEE_STUDIO</span> TO GET FEATURED
          </p>
        </div>

        {/* 6-Image Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_IMAGES.map((item, index) => (
            <div
              key={item.id}
              id={`ig-grid-${item.id}`}
              className="group relative overflow-hidden bg-[#121212] aspect-[3/4] border border-white/5 cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={`Community Outfit ${index + 1}`}
                className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-750 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Hover Dark Overlay instead of heavy red */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4" />

              {/* Hover Text Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                <Instagram size={20} className="text-[#D90429] mb-2" />
                <span className="text-xs font-mono tracking-wider font-semibold text-[#F5F1E8]">
                  {item.tag}
                </span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase mt-1">
                  VIEW OUTFIT
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
