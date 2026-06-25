import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ArrowRight, CornerDownLeft } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickView: (product: Product) => void;
}

export default function SearchModal({ isOpen, onClose, onQuickView }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    );
    setResults(filtered);
  }, [query]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('BDT', '৳');
  };

  const handleResultClick = (product: Product) => {
    onQuickView(product);
    onClose();
  };

  const trendingSearches = ['Hoodie', 'Cargo', 'Sweatpants', 'Sneakers', 'Accessories'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md flex flex-col p-6 md:p-12"
        >
          {/* Close Header */}
          <div className="flex justify-between items-center w-full max-w-5xl mx-auto mb-10 md:mb-16">
            <span className="text-[10px] font-mono tracking-widest text-[#D90429] uppercase">STYLEE SEARCH LAB</span>
            <button
              id="close-search-modal"
              onClick={onClose}
              className="p-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-zinc-950 text-zinc-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Box */}
          <div className="w-full max-w-3xl mx-auto flex flex-col flex-grow">
            <div className="relative border-b border-[rgba(255,255,255,0.12)] pb-4 flex items-center gap-4 focus-within:border-[#D90429] transition-colors duration-300">
              <Search size={28} className="text-zinc-500" />
              <input
                ref={inputRef}
                id="search-input-field"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="WHAT GARMENT ARE YOU LOOKING FOR?"
                className="w-full bg-transparent text-xl md:text-3xl text-[#F5F1E8] placeholder-zinc-700 outline-none font-sans font-bold tracking-wide uppercase"
              />
            </div>

            {/* Content Switch: Results vs. Quick recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 md:mt-12 flex-grow overflow-hidden">
              {results.length === 0 ? (
                <>
                  {/* Left block: Suggestions */}
                  <div className="md:col-span-1">
                    <h3 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-4">TRENDING SEARCHES</h3>
                    <div className="flex flex-wrap md:flex-col gap-2.5">
                      {trendingSearches.map((term) => (
                        <button
                          key={term}
                          id={`trending-search-${term.toLowerCase()}`}
                          onClick={() => setQuery(term)}
                          className="px-4 py-2 text-xs font-mono uppercase bg-[#121212] border border-[rgba(255,255,255,0.06)] text-zinc-300 hover:text-white hover:border-[#D90429] transition-colors text-left"
                        >
                          # {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Middle-Right block: Editorial message */}
                  <div className="md:col-span-2 p-8 bg-[#121212] border border-[rgba(255,255,255,0.05)] flex flex-col justify-center text-center md:text-left">
                    <span className="text-[#D90429] text-xs font-mono tracking-widest uppercase mb-2">STYLEE CAMPAIGN 2026</span>
                    <h4 className="text-lg font-sans font-semibold text-[#F5F1E8] mb-4 uppercase">REDISCOVERING THE STREETS OF DHAKA</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans max-w-md">
                      A raw premium aesthetic coupled with structural weights. Heavy drops, boxy frames, organic acid washes, and bold accents designed for premium high-contrast styles.
                    </p>
                  </div>
                </>
              ) : (
                /* Search Results list */
                <div className="md:col-span-3 flex flex-col flex-grow overflow-y-auto max-h-[60vh] pr-2 gap-4">
                  <h3 className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                    RESULTS FOUND ({results.length})
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((product) => (
                      <div
                        key={product.id}
                        id={`search-res-${product.id}`}
                        onClick={() => handleResultClick(product)}
                        className="p-3 bg-[#121212] border border-[rgba(255,255,255,0.05)] hover:border-[#D90429] transition-colors cursor-pointer flex gap-4 items-center group"
                      >
                        {/* Image */}
                        <div className="h-16 w-12 bg-black flex-shrink-0 overflow-hidden border border-[rgba(255,255,255,0.08)]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Title & category */}
                        <div className="flex-grow">
                          <span className="text-[9px] font-mono tracking-widest text-[#D90429] uppercase">
                            {product.category}
                          </span>
                          <h4 className="text-xs font-sans font-semibold text-[#F5F1E8] group-hover:text-white transition-colors uppercase line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="text-xs font-mono text-zinc-400 block mt-1">
                            {formatPrice(product.price)}
                          </span>
                        </div>

                        <div className="p-1 opacity-0 group-hover:opacity-100 text-[#D90429] transition-opacity">
                          <CornerDownLeft size={14} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
