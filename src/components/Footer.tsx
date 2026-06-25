import { useState } from 'react';
import { Send, Instagram, Twitter, Facebook, Globe } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      id="main-footer"
      className="bg-[#0A0A0A] border-t border-white/5 py-16 px-4 sm:px-8 lg:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Column 1: Brand Info */}
        <div className="flex flex-col gap-5">
          <span
            onClick={() => onScrollToSection('home')}
            className="text-2xl font-serif font-light tracking-[0.25em] text-[#F5F1E8] cursor-pointer hover:text-white transition-colors"
          >
            STYLEE
          </span>
          <p className="text-xs text-zinc-500 font-sans leading-relaxed uppercase">
            ESTABLISHED IN 2026. THE FOREMOST PURVEYOR OF LUXURY URBAN STREETWEAR RAW TEXTURES IN BANGLADESH. HEAVY FABRICATIONS, COGNIZANT SHAPING.
          </p>
          <div className="flex items-center gap-4 text-zinc-400 mt-2">
            <a href="#instagram" className="hover:text-[#D90429] transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#twitter" className="hover:text-[#D90429] transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#facebook" className="hover:text-[#D90429] transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h4 className="text-xs font-mono tracking-widest text-[#D90429] uppercase mb-6 font-semibold">
            ARCHIVE MENU
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs font-mono uppercase text-zinc-400">
            <li>
              <button onClick={() => onScrollToSection('home')} className="hover:text-white transition-colors cursor-pointer">
                HOME
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('shop')} className="hover:text-white transition-colors cursor-pointer">
                SHOP ALL
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('new-arrivals')} className="hover:text-white transition-colors cursor-pointer">
                NEW ARRIVALS
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('collections')} className="hover:text-white transition-colors cursor-pointer">
                CATEGORIES
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">
                ABOUT ARCHIVE
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Customer Care */}
        <div>
          <h4 className="text-xs font-mono tracking-widest text-[#D90429] uppercase mb-6 font-semibold">
            CUSTOMER ASSISTANCE
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs font-mono uppercase text-zinc-400">
            <li>
              <a href="#shipping" className="hover:text-white transition-colors">SHIPPING & DISPATCH</a>
            </li>
            <li>
              <a href="#returns" className="hover:text-white transition-colors">RETURNS & EXCHANGES</a>
            </li>
            <li>
              <a href="#size-guide" className="hover:text-white transition-colors">SIZE SPECIFICATIONS</a>
            </li>
            <li>
              <a href="#care" className="hover:text-white transition-colors">GARMENT CARE LABELS</a>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-mono tracking-widest text-[#D90429] uppercase mb-2 font-semibold">
            STUDIO NEWSLETTER
          </h4>
          <p className="text-xs text-zinc-500 font-sans leading-relaxed uppercase">
            SUBSCRIBE FOR FIRST ACCESS TO LIMITED CAPSULE RELEASES AND CAMPAIGN STORIES.
          </p>
          <div className="relative mt-2">
            {!subscribed ? (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOUR EMAIL"
                  className="w-full bg-[#121212] border border-white/5 py-3 px-4 text-xs font-mono uppercase text-[#F5F1E8] placeholder-zinc-600 focus:border-[#D90429] outline-none"
                />
                <button
                  className="absolute right-1 top-1 bottom-1 px-3.5 bg-[#D90429] text-white hover:bg-[#8B0000] transition-colors cursor-pointer"
                  onClick={handleSubscribe}
                >
                  <Send size={12} />
                </button>
              </>
            ) : (
              <p className="text-xs font-mono text-[#D90429] uppercase font-bold animate-pulse">
                Registry Joined!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Legal / Credentials block */}
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
        <div>
          <span>© 2026 STYLEE CLOTHING CO. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex items-center gap-1">
          <Globe size={12} className="text-zinc-600" />
          <span>BANGLADESH EDITION | CURRENCY: BDT (৳)</span>
        </div>
      </div>
    </footer>
  );
}
