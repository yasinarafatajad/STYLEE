import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import ProductCard from './ProductCard';

interface BestSellersProps {
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
}

export default function BestSellers({
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView
}: BestSellersProps) {
  const railRef = useRef<HTMLDivElement>(null);
  
  // Filter 8 best-seller products from our catalog
  const bestSellerProducts = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!railRef.current) return;
    const scrollAmount = 300;
    railRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="best-sellers"
      className="py-24 bg-[#0A0A0A] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Title and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/5">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#D90429] uppercase block mb-3">
              PREMIUM FAVORITES
            </span>
            <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight text-[#F5F1E8]">
              Best <span className="font-extrabold font-sans italic text-[#D90429]">Sellers</span>
            </h2>
          </div>

          {/* Simple scroll arrows */}
          <div id="bestseller-scroll-controls" className="flex items-center gap-2">
            <button
              id="bestseller-prev-btn"
              onClick={() => handleScroll('left')}
              className="p-3 bg-[#121212] hover:bg-zinc-900 border border-white/5 text-[#F5F1E8] transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              id="bestseller-next-btn"
              onClick={() => handleScroll('right')}
              className="p-3 bg-[#121212] hover:bg-zinc-900 border border-white/5 text-[#F5F1E8] transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Rail */}
        <div
          ref={railRef}
          id="bestsellers-rail"
          className="flex gap-6 overflow-x-auto scroll-smooth pr-12 pb-4 select-none scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestSellerProducts.map((product) => (
            <div
              key={product.id}
              className="w-[280px] md:w-[320px] flex-shrink-0 flex flex-col"
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
