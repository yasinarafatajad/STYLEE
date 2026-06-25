import { useState } from 'react';
import { Shield, Truck, Lock, RotateCcw, Copy, Check, Tag } from 'lucide-react';

export default function AboutAndQuality() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const coupons = [
    {
      code: "BLACKOUT10",
      discount: "10% OFF",
      title: "Capsule-Wide Clearance",
      description: "Apply on any order from the Blackout archive. Minimal purchase ৳2,000.",
      tag: "STANDARD"
    },
    {
      code: "OVERSIZED20",
      discount: "20% OFF",
      title: "Heavyweight Special",
      description: "Only applicable to heavy-loop hoodies & distressed drop-shoulder gear.",
      tag: "VIP EXCLUSIVE"
    }
  ];

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const features = [
    {
      icon: <Shield className="text-[#D90429] stroke-[1.5]" size={28} />,
      title: "PREMIUM QUALITY",
      description: "Heavyweight fabrics (360-500 GSM), meticulous double-needle stitching, and custom-distressed treatments designed to withstand the streets."
    },
    {
      icon: <Truck className="text-[#D90429] stroke-[1.5]" size={28} />,
      title: "FAST DELIVERY",
      description: "Under 24-hour express delivery inside Dhaka and 2-3 business days nationwide. Every package arrives inside a custom black STYLEE container."
    },
    {
      icon: <Lock className="text-[#D90429] stroke-[1.5]" size={28} />,
      title: "SECURE PAYMENT",
      description: "Pay with Cash on Delivery or use secure BKash and credit transfers. Shop confidently with verified end-to-end encryption."
    },
    {
      icon: <RotateCcw className="text-[#D90429] stroke-[1.5]" size={28} />,
      title: "EASY RETURNS",
      description: "Not the perfect oversized fit? Return or exchange any unworn product within 7 days of arrival. No questions asked."
    }
  ];

  return (
    <div id="about" className="bg-[#0A0A0A] border-t border-white/5">
      {/* Brand Story / About Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Brand Story Title and Description */}
        <div>
          <span className="text-xs font-mono tracking-[0.25em] text-[#D90429] uppercase block mb-3">
            OUR ARCHIVE STORY
          </span>
          <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight text-[#F5F1E8] mb-6 leading-tight">
            Redefining Urban <span className="font-extrabold font-sans italic text-[#D90429]">Raw Aesthetics</span>
          </h2>
          <div className="h-[1px] w-12 bg-[#D90429] mb-8" />
          
          <div className="flex flex-col gap-5 text-[11px] text-[#CFCFCF] font-mono tracking-widest leading-relaxed uppercase">
            <p>
              Founded with a rebel spirit and a commitment to meticulous craftsmanship, **STYLEE** is a premium luxury streetwear brand inspired by raw industrial textures and high-contrast editorial lifestyles.
            </p>
            <p>
              Every garment is a testament to quality, built from bespoke heavy-loop cotton and refined under raw dyes to produce unparalleled vintage textures. Our mission is to combine the aesthetic structure of Fear Of God and Represent with the modern urban energy of Bangladesh.
            </p>
          </div>
        </div>

        {/* Right Column: Decorative Editorial Image Stack */}
        <div className="relative aspect-[4/3] bg-[#121212] border border-white/5 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80"
            alt="Stylee Streetwear Studio"
            className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Subtle branding seal */}
          <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/5 px-3 py-1.5 text-[8px] font-mono tracking-widest text-[#F5F1E8]">
            EST. 2026 / DHAKA
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 border-t border-white/5 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="mb-16 text-center lg:text-left">
            <span className="text-xs font-mono tracking-[0.25em] text-[#D90429] uppercase block mb-3">
              THE STYLEE COMMITMENT
            </span>
            <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight text-[#F5F1E8]">
              Why Choose <span className="font-extrabold font-sans italic text-[#D90429]">STYLEE</span>
            </h2>
          </div>

          {/* Feature Grid: Dark Glass Cards with Red Accents */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, index) => (
              <div
                key={index}
                id={`feature-card-${index}`}
                className="group relative p-8 bg-[#121212]/40 backdrop-blur-sm border border-white/5 transition-all duration-300 hover:border-[#D90429]/40 hover:bg-black/40 flex flex-col justify-between min-h-[250px]"
              >
                {/* Red top corner accent line */}
                <div className="absolute top-0 right-0 w-8 h-[2px] bg-transparent group-hover:bg-[#D90429] transition-colors duration-300" />
                <div className="absolute top-0 right-0 w-[2px] h-8 bg-transparent group-hover:bg-[#D90429] transition-colors duration-300" />

                <div className="mb-6">{feat.icon}</div>
                
                <div>
                  <h3 className="text-sm font-sans font-extrabold tracking-wider text-[#F5F1E8] uppercase mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* New Interactive Coupon Promotion Section */}
          <div className="mt-20 pt-16 border-t border-white/5">
            <div className="mb-12 text-center lg:text-left">
              <span className="text-xs font-mono tracking-[0.25em] text-[#D90429] uppercase block mb-3">
                LIMITED RELEASE PROMOTIONS
              </span>
              <h3 className="text-3xl md:text-4xl font-light font-serif tracking-tight text-[#F5F1E8]">
                Archive <span className="font-extrabold font-sans italic text-[#D90429]">Coupon Keys</span>
              </h3>
              <p className="text-xs text-zinc-500 font-mono mt-3 uppercase tracking-wider">
                DECRYPT DISCOUNTS & SECURE EXTRAORDINARY SAVINGS ON NEW DRIPS
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coupons.map((coupon) => {
                const isCopied = copiedCode === coupon.code;
                return (
                  <div
                    key={coupon.code}
                    className="relative flex flex-col sm:flex-row bg-[#111111] border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
                  >
                    {/* Left: Percent / Discount Display */}
                    <div className="sm:w-1/3 bg-[#D90429] p-6 flex flex-col items-center justify-center text-center relative border-b sm:border-b-0 sm:border-r border-dashed border-black/20">
                      {/* Ticket notches */}
                      <div className="hidden sm:block absolute -top-3 -right-3 w-6 h-6 bg-[#0C0C0C] rounded-full border border-white/5 z-10" />
                      <div className="hidden sm:block absolute -bottom-3 -right-3 w-6 h-6 bg-[#0C0C0C] rounded-full border border-white/5 z-10" />
                      
                      <Tag className="text-white/60 mb-2" size={24} />
                      <span className="text-3xl font-black font-sans tracking-tighter text-white leading-none">
                        {coupon.discount}
                      </span>
                      <span className="text-[9px] font-mono font-bold tracking-widest text-black uppercase mt-2 bg-white/30 px-2 py-0.5">
                        {coupon.tag}
                      </span>
                    </div>

                    {/* Right: Code details and interactive button */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-sans font-extrabold tracking-wider text-[#F5F1E8] uppercase mb-1">
                          {coupon.title}
                        </h4>
                        <p className="text-xs text-zinc-500 leading-relaxed font-sans mb-4">
                          {coupon.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Display Code box */}
                        <div className="flex-1 bg-black border border-white/5 px-4 py-3 flex items-center justify-between">
                          <span className="text-xs font-mono font-bold tracking-widest text-[#F5F1E8]">
                            {coupon.code}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-600">
                            VALID
                          </span>
                        </div>

                        {/* Interactive Copy Button */}
                        <button
                          onClick={() => copyToClipboard(coupon.code)}
                          className={`px-4 py-3 font-mono text-xs tracking-widest uppercase font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                            isCopied
                              ? "bg-green-600 text-white"
                              : "bg-zinc-900 hover:bg-zinc-800 text-[#D90429] border border-white/5"
                          }`}
                        >
                          {isCopied ? <Check size={14} /> : <Copy size={14} />}
                          <span>{isCopied ? "COPIED" : "COPY"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Tactile barcode element for aesthetic authenticity */}
                    <div className="absolute right-2 top-2 h-10 w-2.5 opacity-5 flex flex-col gap-[2px]">
                      <div className="h-full bg-white w-full" />
                      <div className="h-full bg-white w-1/2" />
                      <div className="h-full bg-white w-2/3" />
                      <div className="h-full bg-white w-full" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
