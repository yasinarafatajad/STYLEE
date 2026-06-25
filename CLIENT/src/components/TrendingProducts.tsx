import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import ProductCard from './ProductCard';

interface TrendingProductsProps {
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
}

type TabType = 'Today' | 'This Week' | 'This Month';

export default function TrendingProducts({
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView
}: TrendingProductsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('Today');

  // Let's select different high-quality products for each tab to show dynamic variety
  const getTrendingProducts = (): Product[] => {
    switch (activeTab) {
      case 'Today':
        // Return 4 interesting items
        return PRODUCTS.filter((_, i) => i % 3 === 0).slice(0, 4);
      case 'This Week':
        // Return another 4 items
        return PRODUCTS.filter((_, i) => i % 2 === 0 && i > 1).slice(0, 4);
      case 'This Month':
        // Return another set
        return PRODUCTS.filter((p) => p.isTrending || p.isBestSeller).slice(0, 4);
      default:
        return PRODUCTS.slice(0, 4);
    }
  };

  const currentProducts = getTrendingProducts();
  const tabs: TabType[] = ['Today', 'This Week', 'This Month'];

  return (
    <section
      id="trending"
      className="py-24 bg-[#0A0A0A] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/5">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#D90429] uppercase block mb-3">
              WHAT'S HOT NOW
            </span>
            <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight text-[#F5F1E8]">
              Trending <span className="font-extrabold font-sans italic text-[#D90429]">Items</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div id="trending-tabs" className="flex items-center gap-1.5 bg-[#121212] border border-white/5 p-1.5 self-start md:self-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                id={`trend-tab-${tab.toLowerCase().replace(' ', '-')}`}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-[#D90429] text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {currentProducts.map((product) => (
              <motion.div
                key={`${activeTab}-${product.id}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onQuickView={onQuickView}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
