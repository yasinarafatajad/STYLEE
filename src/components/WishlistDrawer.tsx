import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCartFromWishlist: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onAddToCartFromWishlist
}: WishlistDrawerProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('BDT', '৳');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="wishlist-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            id="wishlist-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0A0A0A] border-l border-[rgba(255,255,255,0.08)] flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Heart size={18} className="text-[#D90429] fill-[#D90429]" />
                <h2 className="text-sm font-mono tracking-widest uppercase text-[#F5F1E8]">YOUR WISHLIST</h2>
                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-[rgba(255,255,255,0.06)] px-2 py-0.5">
                  {wishlistItems.length}
                </span>
              </div>
              <button
                id="close-wishlist-drawer"
                onClick={onClose}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-950 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow overflow-y-auto p-6">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Heart size={48} className="text-zinc-700 stroke-[1.2] mb-4" />
                  <p className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-2">WISHLIST IS EMPTY</p>
                  <p className="text-xs text-zinc-600 font-sans max-w-[240px]">
                    Bookmark garments you love to keep an eye on stock.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {wishlistItems.map((product) => (
                    <div
                      key={product.id}
                      id={`wishlist-item-${product.id}`}
                      className="flex gap-4 p-3 bg-[#121212] border border-[rgba(255,255,255,0.05)]"
                    >
                      {/* Image */}
                      <div className="h-20 w-16 flex-shrink-0 bg-black overflow-hidden border border-[rgba(255,255,255,0.06)]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xs font-sans font-medium uppercase tracking-wide text-[#F5F1E8] line-clamp-1">
                              {product.name}
                            </h3>
                            <span className="text-[10px] font-mono text-[#D90429] mt-0.5 block">
                              {product.category}
                            </span>
                          </div>
                          <button
                            id={`del-wish-${product.id}`}
                            onClick={() => onRemoveFromWishlist(product)}
                            className="text-zinc-500 hover:text-[#D90429] transition-colors p-1"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-semibold text-[#F5F1E8]">
                            {formatPrice(product.price)}
                          </span>

                          <button
                            id={`wish-add-to-cart-${product.id}`}
                            onClick={() => {
                              onAddToCartFromWishlist(product);
                            }}
                            className="px-3 py-1.5 bg-[#D90429] hover:bg-[#8B0000] text-white text-[10px] font-mono tracking-widest transition-colors flex items-center gap-1"
                          >
                            <ShoppingBag size={10} />
                            ADD TO BAG
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Actions Footer */}
            {wishlistItems.length > 0 && (
              <div className="p-6 bg-[#121212] border-t border-[rgba(255,255,255,0.08)]">
                <p className="text-[10px] font-sans text-zinc-500 text-center leading-relaxed">
                  Wishlist items are saved temporarily inside your current fashion layout. Stock is highly limited.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
