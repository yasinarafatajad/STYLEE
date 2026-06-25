export default function CollectionBanner() {
  return (
    <section
      id="collection-banner"
      className="relative w-full h-[400px] bg-[#0A0A0A] overflow-hidden flex items-center justify-center border-t border-b border-white/5"
    >
      {/* Background Campaign Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85"
          alt="Stylee Streetwear Campaign 2026"
          className="w-full h-full object-cover object-center brightness-[0.35] grayscale md:object-[center_35%]"
          referrerPolicy="no-referrer"
        />
        {/* Subtle radial overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
      </div>

      {/* Campaign Branding Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl flex flex-col items-center">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#D90429] uppercase mb-4 block font-semibold">
          CAMPAIGN IN FOCUS: CHAPTER III
        </span>
        <h2 className="text-4xl md:text-6xl font-light font-serif tracking-tight text-[#F5F1E8] mb-5 leading-tight">
          The <span className="font-extrabold font-sans italic text-[#D90429]">Essentials</span> Collection
        </h2>
        <div className="h-[1px] w-20 bg-white/20 mb-6" />
        <p className="text-[11px] md:text-xs text-[#CFCFCF] font-mono tracking-widest max-w-lg leading-relaxed uppercase">
          RAW HEAVYWEIGHT FABRICATIONS AND OVERSIZED PROPORTIONS CONVERGE IN BLACKOUT ARCHIVES. INSPIRING MOVEMENT AND LUXURIOUS STABILITY.
        </p>
      </div>
    </section>
  );
}
