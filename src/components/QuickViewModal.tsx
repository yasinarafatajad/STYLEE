import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Star, ShoppingBag, Heart, Shield, CheckCircle } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState('M');

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
      id="quickview-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        id="quickview-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#121212] border border-[rgba(255,255,255,0.08)] overflow-hidden"
      >
        {/* Close Button */}
        <button
          id="close-quickview-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-[#CFCFCF] hover:text-white border border-[rgba(255,255,255,0.08)] transition-colors"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image */}
          <div className="relative aspect-[3/4] md:aspect-auto md:h-[550px] bg-[#0A0A0A]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-widest font-mono bg-[#F5F1E8] text-black font-semibold">
                NEW RELEASE
              </span>
            )}
          </div>

          {/* Right Column: Info */}
          <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[550px]">
            <div>
              {/* Category & Stars */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono tracking-widest text-[#D90429] uppercase">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-mono">
                  <div className="flex text-[#D90429]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'}
                      />
                    ))}
                  </div>
                  <span>({product.rating})</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-sans font-bold tracking-wide text-[#F5F1E8] uppercase mb-4">
                {product.name}
              </h2>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-mono font-bold text-[#F5F1E8]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-zinc-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-6">
                Crafted for the streets. This garment features premium heavyweight construction, customized typography detailing, and an optimized relaxed silhouette designed in partnership with international design agencies. Finished with high-density dyes.
              </p>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">SELECT SIZE</span>
                  <span className="text-xs font-mono text-zinc-500">True to size. Oversized fit.</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      id={`modal-size-${size}`}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-center text-xs font-mono transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-[#D90429] text-white border-[#D90429]'
                          : 'bg-zinc-900 text-[#F5F1E8] border border-[rgba(255,255,255,0.08)] hover:bg-zinc-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <div className="flex gap-3 mb-6">
                <button
                  id="modal-add-to-cart"
                  onClick={() => {
                    onAddToCart(product, selectedSize);
                    onClose();
                  }}
                  className="flex-grow py-4 bg-[#D90429] text-white text-xs font-mono tracking-widest hover:bg-[#8B0000] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} />
                  ADD TO BAG
                </button>

                <button
                  id="modal-toggle-wishlist"
                  onClick={() => onToggleWishlist(product)}
                  className={`px-4 bg-zinc-900 border border-[rgba(255,255,255,0.08)] text-[#CFCFCF] transition-colors flex items-center justify-center ${
                    isWishlisted
                      ? 'text-[#D90429] bg-[#D90429]/10 border-[#D90429]'
                      : 'hover:text-[#F5F1E8] hover:bg-zinc-800'
                  }`}
                >
                  <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Guarantee badges */}
              <div className="grid grid-cols-2 gap-4 border-t border-[rgba(255,255,255,0.08)] pt-4">
                <div className="flex items-center gap-2.5">
                  <Shield size={14} className="text-[#D90429]" />
                  <span className="text-[11px] font-mono text-zinc-400">100% Authentic Apparel</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={14} className="text-[#D90429]" />
                  <span className="text-[11px] font-mono text-zinc-400">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
