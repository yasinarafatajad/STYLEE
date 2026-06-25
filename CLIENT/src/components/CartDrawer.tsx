import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, change: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('BDT', '৳');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 10000 ? 0 : 150; // free delivery over 10,000 BDT
  const total = subtotal + shipping;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert("Please fill in all details for your premium delivery.");
      return;
    }

    const orderDetails = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
      customer: {
        name,
        phone,
        address
      },
      items: cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        total: item.product.price * item.quantity
      })),
      pricing: {
        subtotal,
        shipping,
        total
      },
      status: "Processing"
    };

    console.log("=== STYLEE NEW ACQUISITION PLACE ORDER ===");
    console.log(JSON.stringify(orderDetails, null, 2));

    setCheckoutStep('success');
  };

  const handleOrderReset = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0A0A0A] border-l border-[rgba(255,255,255,0.08)] flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} className="text-[#D90429]" />
                <h2 className="text-sm font-mono tracking-widest uppercase text-[#F5F1E8]">YOUR CART</h2>
                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-[rgba(255,255,255,0.06)] px-2 py-0.5">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                id="close-cart-drawer"
                onClick={onClose}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-950 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow overflow-y-auto p-6">
              {checkoutStep === 'cart' && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <ShoppingBag size={48} className="text-zinc-700 stroke-[1.2] mb-4" />
                      <p className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-2">CART IS EMPTY</p>
                      <p className="text-xs text-zinc-600 font-sans max-w-[240px]">
                        Start exploring our luxury streetwear collections.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {cartItems.map((item) => (
                        <div
                          key={`${item.product.id}-${item.selectedSize}`}
                          id={`cart-item-${item.product.id}`}
                          className="flex gap-4 p-3 bg-[#121212] border border-[rgba(255,255,255,0.05)]"
                        >
                          {/* Image */}
                          <div className="h-20 w-16 flex-shrink-0 bg-black overflow-hidden border border-[rgba(255,255,255,0.06)]">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-full w-full object-cover object-center"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <h3 className="text-xs font-sans font-medium uppercase tracking-wide text-[#F5F1E8] line-clamp-1">
                                {item.product.name}
                              </h3>
                              <span className="text-[10px] font-mono text-[#D90429] mt-0.5 block">
                                SIZE: {item.selectedSize}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              {/* Quantity controls */}
                              <div className="flex items-center border border-[rgba(255,255,255,0.08)] bg-black/40">
                                <button
                                  id={`dec-qty-${item.product.id}`}
                                  onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                                  className="px-2 py-1 text-zinc-400 hover:text-white transition-colors"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="px-2 text-xs font-mono text-[#F5F1E8]">
                                  {item.quantity}
                                </span>
                                <button
                                  id={`inc-qty-${item.product.id}`}
                                  onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                                  className="px-2 py-1 text-zinc-400 hover:text-white transition-colors"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>

                              {/* Price and trash */}
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-mono font-semibold text-[#F5F1E8]">
                                  {formatPrice(item.product.price * item.quantity)}
                                </span>
                                <button
                                  id={`del-item-${item.product.id}`}
                                  onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                                  className="text-zinc-600 hover:text-[#D90429] transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'checkout' && (
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="flex flex-col gap-5">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#D90429] border-b border-[rgba(255,255,255,0.06)] pb-2 mb-2">
                    DELIVERY INFORMATION
                  </h3>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-zinc-500">FULL NAME</label>
                    <input
                      id="checkout-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Yasin Arafat Azad"
                      className="w-full bg-[#121212] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-xs text-[#F5F1E8] font-mono focus:border-[#D90429] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-zinc-500">CONTACT NUMBER</label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +880 17XXXXXXXX"
                      className="w-full bg-[#121212] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-xs text-[#F5F1E8] font-mono focus:border-[#D90429] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-zinc-500">DELIVERY ADDRESS (DHAKA / OUTSIDE DHAKA)</label>
                    <textarea
                      id="checkout-address"
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. House 42, Road 12, Banani, Dhaka"
                      className="w-full bg-[#121212] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-xs text-[#F5F1E8] font-mono focus:border-[#D90429] outline-none resize-none"
                    />
                  </div>

                  {/* Payment Method Info */}
                  <div className="p-4 bg-zinc-950 border border-[rgba(255,255,255,0.04)] flex gap-3 items-start mt-2">
                    <CreditCard size={18} className="text-[#D90429] mt-0.5" />
                    <div>
                      <span className="text-xs font-mono text-[#F5F1E8] block uppercase">CASH ON DELIVERY / BKASH</span>
                      <span className="text-[10px] font-sans text-zinc-500 leading-relaxed block mt-1">
                        Secure checkout inside Dhaka and all other cities in Bangladesh. Pay upon safe hand-over of your luxury streetwear garments.
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-checkout"
                    type="submit"
                    className="w-full py-4 bg-[#D90429] text-white text-xs font-mono tracking-widest hover:bg-[#8B0000] transition-colors mt-4 flex items-center justify-center gap-2"
                  >
                    CONFIRM PURCHASE
                  </button>
                  <button
                    id="back-to-cart"
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full py-2 bg-transparent text-zinc-500 hover:text-[#F5F1E8] text-xs font-mono tracking-widest transition-colors text-center"
                  >
                    RETURN TO CART
                  </button>
                </form>
              )}

              {checkoutStep === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle size={56} className="text-[#D90429] mb-4" />
                  </motion.div>
                  <h3 className="text-base font-sans font-bold tracking-wide text-[#F5F1E8] uppercase mb-2">
                    ORDER SUCCESSFULLY PLACED
                  </h3>
                  <p className="text-xs font-mono text-[#D90429] mb-4 uppercase">
                    Order ID: #ST-{(Math.floor(Math.random() * 90000) + 10000)}
                  </p>
                  <p className="text-xs text-zinc-400 font-sans max-w-xs leading-relaxed mb-8">
                    Thank you for shopping at **STYLEE**, **{name}**. We have sent a confirmation details log to your email **yasinarafatazad082@gmail.com**. Your package will arrive at **{address}** shortly.
                  </p>
                  <button
                    id="success-continue-shopping"
                    onClick={handleOrderReset}
                    className="px-8 py-3.5 bg-[#F5F1E8] text-black text-xs font-mono tracking-widest hover:bg-white transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary (Sticky when items exist in step 1/2) */}
            {cartItems.length > 0 && checkoutStep !== 'success' && (
              <div className="p-6 bg-[#121212] border-t border-[rgba(255,255,255,0.08)]">
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <span>SUBTOTAL</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <span>SHIPPING</span>
                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  <div className="h-px bg-[rgba(255,255,255,0.06)] my-1" />
                  <div className="flex justify-between text-sm font-mono text-[#F5F1E8] font-bold">
                    <span>TOTAL</span>
                    <span className="text-[#D90429]">{formatPrice(total)}</span>
                  </div>
                </div>

                {checkoutStep === 'cart' && (
                  <button
                    id="checkout-trigger"
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full py-4 bg-[#D90429] text-white text-xs font-mono tracking-widest hover:bg-[#8B0000] transition-colors flex items-center justify-center gap-2"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
