import { useState, useEffect } from 'react';
import { Search, Heart, User, ShoppingBag, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onScrollToSection: (sectionId: string) => void;
  currentUser: UserProfile | null;
  onNavigateToAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
}

export default function Header({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onScrollToSection,
  currentUser,
  onNavigateToAuth,
  onLogout
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isAccountOpen, setIsAccountOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', targetId: 'home' },
    { name: 'Shop', targetId: 'shop-page' },
    { name: 'New Arrivals', targetId: 'new-arrivals' },
    { name: 'Collections', targetId: 'collections' },
    { name: 'About', targetId: 'about' }
  ];

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 h-[70px] lg:h-[80px]'
            : 'bg-transparent border-none h-[70px] lg:h-[80px]'
        } flex items-center justify-between px-4 sm:px-8 lg:px-12`}
      >
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Icon */}
          <button
            id="mobile-menu-toggle"
            className="lg:hidden text-[#F5F1E8] hover:text-[#D90429] transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
          
          <span
            id="brand-logo"
            onClick={() => onScrollToSection('home')}
            className="text-xl sm:text-2xl font-black tracking-[0.25em] text-[#F5F1E8] hover:text-[#D90429] cursor-pointer select-none transition-colors duration-300 leading-none"
          >
            S T Y L E E
          </span>
        </div>

        {/* Center: Nav Items */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.name}
              id={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
              onClick={() => onScrollToSection(item.targetId)}
              className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#CFCFCF] hover:text-[#D90429] relative py-2 transition-colors duration-200 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D90429] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right: Icons (Search, Wishlist, Account, Cart) */}
        <div id="header-actions" className="flex items-center gap-4 sm:gap-6 relative">
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            className="p-1.5 text-[#CFCFCF] hover:text-[#D90429] transition-colors duration-200"
          >
            <Search size={18} />
          </button>

          <button
            id="header-wishlist-btn"
            onClick={onOpenWishlist}
            className="p-1.5 text-[#CFCFCF] hover:text-[#D90429] relative transition-colors duration-200 hidden lg:block"
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D90429] text-white text-[8px] font-mono rounded-full h-3.5 w-3.5 flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          <div className="relative hidden lg:block">
            <button
              id="header-account-btn"
              className={`p-1.5 transition-colors duration-200 ${currentUser ? 'text-[#D90429]' : 'text-[#CFCFCF] hover:text-[#D90429]'}`}
              onClick={() => setIsAccountOpen(!isAccountOpen)}
            >
              <User size={18} />
            </button>
            <AnimatePresence>
              {isAccountOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-64 bg-[#0A0A0A] border border-white/10 p-5 shadow-2xl z-50 text-left"
                >
                  {currentUser ? (
                    <>
                      <p className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-1">MEMBER PROFILE</p>
                      <p className="text-xs font-mono text-[#F5F1E8] truncate mb-3 font-semibold">{currentUser.email}</p>
                      <div className="border-t border-white/5 pt-3">
                        <p className="text-[10px] uppercase text-[#D90429] tracking-widest font-bold font-mono">STATUS: VIP MEMBER</p>
                        <p className="text-[9px] text-[#CFCFCF] font-serif italic mt-1 mb-3">Exclusive editorial curation active.</p>
                        <button
                          onClick={() => {
                            setIsAccountOpen(false);
                            onScrollToSection('dashboard');
                          }}
                          className="w-full bg-[#D90429] hover:bg-[#8B0000] text-white py-2.5 text-center text-[10px] font-mono uppercase font-bold tracking-widest transition-colors cursor-pointer mb-2"
                        >
                          View Dashboard Panel
                        </button>
                        <button
                          onClick={() => {
                            setIsAccountOpen(false);
                            onLogout();
                          }}
                          className="w-full bg-zinc-950/40 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5 py-2 text-center text-[10px] font-mono uppercase font-bold tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2"
                        >
                          <LogOut size={10} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-1.5">AUTHENTICATION GATEWAY</p>
                      <p className="text-[10px] text-zinc-400 font-sans leading-normal mb-4">
                        Access exclusive capsule drops, custom trackings, & priority delivery logistics.
                      </p>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setIsAccountOpen(false);
                            onNavigateToAuth('login');
                          }}
                          className="w-full bg-[#D90429] hover:bg-[#8B0000] text-white py-2.5 text-center text-[10px] font-mono uppercase font-bold tracking-widest transition-all cursor-pointer"
                        >
                          Member Sign In
                        </button>
                        <button
                          onClick={() => {
                            setIsAccountOpen(false);
                            onNavigateToAuth('signup');
                          }}
                          className="w-full bg-zinc-950 hover:bg-zinc-900 text-zinc-300 py-2 text-center text-[10px] font-mono uppercase font-bold tracking-widest transition-all cursor-pointer border border-white/5"
                        >
                          Enroll Account
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="p-1.5 text-[#CFCFCF] hover:text-[#D90429] relative transition-colors duration-200"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D90429] text-white text-[8px] font-mono rounded-full h-3.5 w-3.5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Content panel */}
            <motion.div
              id="mobile-nav-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-full max-w-[300px] bg-[#0A0A0A] border-r border-[rgba(255,255,255,0.08)] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-10">
                  <span className="text-xl font-black tracking-widest text-[#F5F1E8]">STYLEE</span>
                  <button
                    id="close-mobile-menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#CFCFCF] hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      id={`mob-nav-${item.name.toLowerCase().replace(' ', '-')}`}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onScrollToSection(item.targetId);
                      }}
                      className="text-left text-sm font-mono tracking-widest uppercase text-[#CFCFCF] hover:text-[#D90429] transition-colors py-1 border-b border-[rgba(255,255,255,0.04)]"
                    >
                      {item.name}
                    </button>
                  ))}

                  {/* Mobile Wishlist Link */}
                  <button
                    id="mobile-wishlist-btn"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenWishlist();
                    }}
                    className="flex items-center gap-3 text-left text-sm font-mono tracking-widest uppercase text-[#CFCFCF] hover:text-[#D90429] transition-colors py-1 border-b border-[rgba(255,255,255,0.04)] cursor-pointer"
                  >
                    <Heart size={16} />
                    <span>Wishlist ({wishlistCount})</span>
                  </button>

                  {/* Mobile Profile Block */}
                  {currentUser ? (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onScrollToSection('dashboard');
                        }}
                        className="flex flex-col text-left py-2 border-b border-[rgba(255,255,255,0.04)] w-full cursor-pointer hover:bg-zinc-900/40"
                      >
                        <div className="flex items-center gap-3 text-[#CFCFCF] text-sm font-mono tracking-widest uppercase mb-1">
                          <User size={16} />
                          <span>User Dashboard</span>
                        </div>
                        <div className="pl-7 font-mono">
                          <p className="text-[10px] text-[#F5F1E8] truncate font-semibold">{currentUser.email}</p>
                          <p className="text-[8px] uppercase text-[#D90429] tracking-widest font-bold block mt-1">STATUS: VIP LEVEL II (TAP TO OPEN)</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onLogout();
                        }}
                        className="flex items-center gap-3 text-left text-sm font-mono tracking-widest uppercase text-zinc-500 hover:text-[#D90429] transition-colors py-2"
                      >
                        <LogOut size={16} />
                        <span>Logout secure session</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 pt-3 border-t border-white/5">
                      <p className="text-[9px] font-mono uppercase tracking-widest text-white/40">AUTHENTICATION GATEWAY</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            onNavigateToAuth('login');
                          }}
                          className="bg-[#D90429] hover:bg-[#8B0000] text-white py-2 text-center text-[10px] font-mono uppercase font-bold tracking-widest transition-all cursor-pointer"
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            onNavigateToAuth('signup');
                          }}
                          className="bg-zinc-900 hover:bg-zinc-850 text-zinc-300 py-2 text-center text-[10px] font-mono uppercase font-bold tracking-widest transition-all cursor-pointer border border-white/5"
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  )}
                </nav>
              </div>

              {/* Account / Support Info */}
              <div className="border-t border-[rgba(255,255,255,0.08)] pt-6">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Authenticated Registry Session</span>
                <span className="text-xs font-mono text-[#F5F1E8] truncate block">SECURE CONNECTION ACTIVE</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
