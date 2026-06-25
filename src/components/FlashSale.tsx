import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, Clock } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import ProductCard from './ProductCard';

interface FlashSaleProps {
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
}

export default function FlashSale({
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView
}: FlashSaleProps) {
  // Let's configure a dynamic count down timer (8 hours, 42 mins initial)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer to keep the preview beautiful
          return { hours: 8, minutes: 42, seconds: 15 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = PRODUCTS.filter((p) => p.isFlashSale);

  const formatUnit = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <section
      id="flash-sale"
      className="py-24 bg-[#0A0A0A] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Block with Countdown */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 pb-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 bg-[#D90429] rounded-full" />
            <div>
              <span className="text-xs font-mono tracking-widest text-[#D90429] uppercase block mb-1">
                LIMITED RUNS
              </span>
              <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight text-[#F5F1E8]">
                Flash <span className="font-extrabold font-sans italic text-[#D90429]">Sale</span>
              </h2>
            </div>
          </div>

          {/* Luxury Timer layout */}
          <div id="countdown-timer" className="flex items-center gap-4 bg-[#121212] border border-white/5 py-3 px-6 select-none">
            <div className="flex items-center gap-2 text-zinc-400">
              <Clock size={14} />
              <span className="text-[10px] font-mono tracking-widest uppercase mr-1">ENDS IN:</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-lg md:text-xl font-mono font-medium text-[#F5F1E8] leading-none">
                  {formatUnit(timeLeft.hours)}
                </span>
                <span className="text-[8px] font-mono text-zinc-500 uppercase mt-1">HRS</span>
              </div>
              <span className="text-lg font-mono text-[#D90429] font-medium leading-none -translate-y-1">:</span>
              <div className="flex flex-col items-center">
                <span className="text-lg md:text-xl font-mono font-medium text-[#F5F1E8] leading-none">
                  {formatUnit(timeLeft.minutes)}
                </span>
                <span className="text-[8px] font-mono text-zinc-500 uppercase mt-1">MIN</span>
              </div>
              <span className="text-lg font-mono text-[#D90429] font-medium leading-none -translate-y-1">:</span>
              <div className="flex flex-col items-center">
                <span className="text-lg md:text-xl font-mono font-medium text-[#D90429] leading-none">
                  {formatUnit(timeLeft.seconds)}
                </span>
                <span className="text-[8px] font-mono text-zinc-500 uppercase mt-1">SEC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards and Stock Progress Bars */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {flashProducts.map((product) => {
            const stockLeft = product.stockLeft || 10;
            const totalStock = product.totalStock || 40;
            const percentage = (stockLeft / totalStock) * 100;

            return (
              <div key={product.id} className="flex flex-col gap-4">
                {/* Embedded Product Card */}
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onQuickView={onQuickView}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
