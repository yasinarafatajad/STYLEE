import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key | string | number;
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView
}: ProductCardProps) {
  const [showSizes, setShowSizes] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('BDT', '৳');
  };

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div
      id={`product-${product.id}`}
      className="relative flex flex-col group bg-[#121212] border border-white/5 overflow-hidden h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0A0A0A]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-750 ease-out"
          style={{
            transform: isHovered ? 'scale(1.03)' : 'scale(1)'
          }}
          referrerPolicy="no-referrer"
        />

        {/* Brand/Luxury Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Action Buttons Top-Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md border border-[rgba(255,255,255,0.1)] transition-colors duration-300 ${
              isWishlisted
                ? 'bg-[#D90429] border-[#D90429] text-[#F5F1E8]'
                : 'bg-black/60 text-[#CFCFCF] hover:text-[#D90429] hover:bg-black/95'
            }`}
          >
            <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
          </button>

          <button
            id={`quickview-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-[#CFCFCF] hover:text-[#F5F1E8] hover:bg-black/95 transition-colors duration-300"
          >
            <Eye size={16} />
          </button>
        </div>

        {/* New/Discount Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="px-2.5 py-0.5 text-[10px] tracking-widest font-mono uppercase bg-[#F5F1E8] text-black font-semibold">
              NEW
            </span>
          )}
          {product.originalPrice && (
            <span className="px-2.5 py-0.5 text-[10px] tracking-widest font-mono uppercase bg-[#D90429] text-[#F5F1E8] font-semibold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Quick Add To Cart / Size Drawer Overlay */}
        <div className="absolute bottom-0 inset-x-0 w-full z-10">
          <AnimatePresence mode="wait">
            {!showSizes ? (
              <motion.button
                id={`add-to-cart-trigger-${product.id}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSizes(true);
                }}
                className="w-full py-4 px-4 bg-black/90 backdrop-blur-sm border-t border-[rgba(255,255,255,0.08)] text-[#F5F1E8] text-xs font-mono tracking-widest hover:bg-[#D90429] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={14} />
                QUICK ADD
              </motion.button>
            ) : (
              <motion.div
                id={`sizes-panel-${product.id}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full p-4 bg-black/95 backdrop-blur-md border-t border-[#D90429] flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">SELECT SIZE</span>
                  <button
                    id={`close-sizes-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSizes(false);
                    }}
                    className="text-[10px] font-mono text-zinc-500 hover:text-white uppercase"
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      id={`size-opt-${size}-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product, size);
                        setShowSizes(false);
                      }}
                      className="py-2 text-center text-xs font-mono text-[#F5F1E8] bg-zinc-900 border border-[rgba(255,255,255,0.08)] hover:bg-[#D90429] hover:border-[#D90429] transition-all duration-200"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow bg-[#121212]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono tracking-widest text-[#D90429] uppercase">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-sm font-sans font-medium tracking-wide text-[#F5F1E8] line-clamp-1 group-hover:text-white transition-colors duration-200 uppercase mb-2">
          {product.name}
        </h3>

        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-sm font-mono font-semibold text-[#F5F1E8]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs font-mono text-zinc-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
