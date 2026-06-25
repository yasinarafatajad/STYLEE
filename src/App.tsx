import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCategories from './components/FeaturedCategories';
import FlashSale from './components/FlashSale';
import CollectionBanner from './components/CollectionBanner';
import TrendingProducts from './components/TrendingProducts';
import BestSellers from './components/BestSellers';
import AboutAndQuality from './components/AboutAndQuality';
import CommunityReviews from './components/CommunityReviews';
import CommunityGallery from './components/CommunityGallery';
import Footer from './components/Footer';

import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import QuickViewModal from './components/QuickViewModal';
import ProductCard from './components/ProductCard';
import ShopPage from './components/ShopPage';
import UserDashboard from './components/UserDashboard';
import AuthPage from './components/AuthPage';

import { PRODUCTS } from './data';
import { Product, CartItem, UserProfile } from './types';

export default function App() {
  // Global States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'dashboard' | 'login' | 'signup'>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('stylee_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string | null>(null);
  
  const [toast, setToast] = useState<{ message: string } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('stylee_user');
    setCurrentUser(null);
    setCurrentView('home');
    triggerToast("SECURE SESSION TERMINATED");
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
    triggerToast(`VIP SESSION INITIATED: ${user.firstName.toUpperCase()}`);
  };

  const handleUpdateProfile = (profile: UserProfile) => {
    setCurrentUser(profile);
    localStorage.setItem('stylee_user', JSON.stringify(profile));
    triggerToast("PROFILE SPECIFICATIONS UPDATED");
  };

  // Trigger scroll-to-top button appearance
  useEffect(() => {
    const handleScrollVisibility = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  // Custom Toast helper
  const triggerToast = (message: string) => {
    setToast({ message });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Add to Cart handler
  const handleAddToCart = (product: Product, size: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { product, quantity: 1, selectedSize: size }];
      }
    });

    triggerToast(`ADDED TO BAG: ${product.name} [SIZE ${size}]`);
  };

  // Update Cart quantities
  const handleUpdateCartQuantity = (productId: string, size: string, change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const nextQty = item.quantity + change;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  // Remove Cart item
  const handleRemoveCartItem = (productId: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
    triggerToast("ITEM REMOVED FROM BAG");
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Toggle Wishlist handler
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        triggerToast("REMOVED FROM WISHLIST");
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        triggerToast(`WISHLISTED: ${product.name}`);
        return [...prevWishlist, product];
      }
    });
  };

  // Quick View handler
  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  // Add to Cart directly from Wishlist
  const handleAddToCartFromWishlist = (product: Product) => {
    // Default to size 'M' for fast action, but notify them they can edit inside the cart drawer
    handleAddToCart(product, 'M');
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  // Scroll to layout sections elegantly
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'shop-page') {
      setCurrentView('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'dashboard') {
      if (!currentUser) {
        setCurrentView('login');
        triggerToast("SECURE PORTAL: PLEASE AUTHENTICATE");
      } else {
        setCurrentView('dashboard');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const yOffset = -75; // Account for sticky header
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -75; // Account for sticky header
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    setShopCategoryFilter(categoryId);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products for the New Arrivals / Main Shop catalog
  const getFilteredProducts = () => {
    // Base catalog under New Arrivals
    const newItems = PRODUCTS.filter((p) => p.isNew);
    if (!selectedCategoryFilter) {
      return newItems;
    }
    // Filter by selected category (Men/Women/Accessories/Footwear/Lifestyle)
    return PRODUCTS.filter((p) => p.category === selectedCategoryFilter);
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="bg-[#0A0A0A] text-[#F5F1E8] min-h-screen font-sans overflow-x-hidden selection:bg-[#D90429] selection:text-white">
      {/* 1. Sticky Header */}
      <Header
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onScrollToSection={handleScrollToSection}
        currentUser={currentUser}
        onNavigateToAuth={(mode) => setCurrentView(mode)}
        onLogout={handleLogout}
      />

      {currentView === 'home' ? (
        <>
          {/* 2. Hero Carousel Section */}
          <Hero />

          {/* 3. New Arrivals / Shop Grid Section */}
          <section id="new-arrivals" className="py-24 bg-[#0A0A0A] border-t border-[rgba(255,255,255,0.06)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="text-xs font-mono tracking-[0.25em] text-[#D90429] uppercase block mb-3">
                    {selectedCategoryFilter ? `${selectedCategoryFilter.toUpperCase()}'S ARCHIVES` : "LATEST CAPSULE"}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-[#F5F1E8] uppercase">
                    {selectedCategoryFilter ? `${selectedCategoryFilter}'s Collection` : "New Arrivals"}
                  </h2>
                </div>

                {/* Clear filter button indicator */}
                {selectedCategoryFilter && (
                  <button
                    id="clear-filter-top-btn"
                    onClick={() => setSelectedCategoryFilter(null)}
                    className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-[rgba(255,255,255,0.08)] text-[#D90429] text-xs font-mono tracking-widest uppercase transition-all duration-300"
                  >
                    [ Clear Category Filter × ]
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.some((w) => w.id === product.id)}
                    onQuickView={handleQuickView}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* 4. Featured Categories Block */}
          <FeaturedCategories onSelectCategory={handleSelectCategory} />

          {/* 5. Flash Sale / Urgent Timer Section */}
          <FlashSale
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist.map((w) => w.id)}
            onQuickView={handleQuickView}
          />

          {/* 6. Featured Collection Banner */}
          <CollectionBanner />

          {/* 7. Trending Products Section */}
          <TrendingProducts
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist.map((w) => w.id)}
            onQuickView={handleQuickView}
          />

          {/* 8. Best Sellers Showcase */}
          <BestSellers
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist.map((w) => w.id)}
            onQuickView={handleQuickView}
          />

          {/* 9. Brand Story / Why Choose Us */}
          <AboutAndQuality />

          {/* 10. Customer Reviews Section ("Community Love" carousel) */}
          <CommunityReviews />

          {/* 11. Instagram Style Gallery */}
          <CommunityGallery />
        </>
      ) : currentView === 'shop' ? (
        <ShopPage
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlist.map((w) => w.id)}
          onQuickView={handleQuickView}
          initialCategory={shopCategoryFilter}
          onClearInitialCategory={() => setShopCategoryFilter(null)}
        />
      ) : currentView === 'login' || currentView === 'signup' ? (
        <AuthPage
          initialMode={currentView}
          onAuthSuccess={handleAuthSuccess}
          onNavigateHome={() => setCurrentView('home')}
          onNavigateToMode={(mode) => setCurrentView(mode)}
        />
      ) : (
        <UserDashboard
          wishlistCount={wishlist.length}
          onScrollToSection={handleScrollToSection}
          onAddToCart={handleAddToCart}
          currentUser={currentUser}
          onLogout={handleLogout}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {/* 12. Footer */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* DRAWERS & MODALS (Portals) */}

      {/* Shopping Cart Side Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Side Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCartFromWishlist={handleAddToCartFromWishlist}
      />

      {/* Fullscreen Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onQuickView={handleQuickView}
      />

      {/* Product Detail Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlist.some((w) => w.id === quickViewProduct.id)}
          />
        )}
      </AnimatePresence>

      {/* FLOATING UTILITIES */}

      {/* Scroll to Top Arrow Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="scroll-to-top-btn"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            onClick={() => handleScrollToSection('home')}
            className="fixed bottom-6 right-6 z-30 p-3.5 rounded-full bg-[#D90429] hover:bg-[#8B0000] text-white transition-colors cursor-pointer select-none"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Global Luxury Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            id="luxury-toast"
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10, x: 10 }}
            className="fixed top-24 right-4 md:right-12 z-50 p-4 bg-zinc-950 border border-[rgba(255,255,255,0.08)] border-l-4 border-l-[#D90429] max-w-sm flex items-center gap-3.5 select-none"
          >
            <div className="h-2 w-2 rounded-full bg-[#D90429] animate-ping" />
            <p className="text-xs font-mono tracking-widest text-[#F5F1E8] uppercase font-bold">
              {toast.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
