import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, X, Heart, ShoppingBag, Eye } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ShopPageProps {
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
  initialCategory: string | null;
  onClearInitialCategory: () => void;
}

const ITEMS_PER_PAGE = 8;

export default function ShopPage({
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  initialCategory,
  onClearInitialCategory
}: ShopPageProps) {
  // --- Filter and Search States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [priceRange, setPriceRange] = useState<number>(15000); // max price filter
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<string>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync initialCategory state if passed from parent (e.g. Featured Categories click)
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
      setCurrentPage(1);
    }
  }, [initialCategory]);

  // Categories list from PRODUCTS
  const categoriesList = useMemo(() => {
    const cats = new Set<string>();
    PRODUCTS.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, []);

  // Find the highest product price dynamically
  const maxProductPrice = useMemo(() => {
    return Math.max(...PRODUCTS.map(p => p.price), 15000);
  }, []);

  // Filter & Sort Logic
  const processedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      );
    }

    // 2. Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // 3. Price Filter
    result = result.filter(p => p.price <= priceRange);

    // 4. Stock Filter (if isFlashSale, checking stockLeft, else normal stock)
    if (onlyInStock) {
      result = result.filter(p => {
        if (p.isFlashSale && p.stockLeft !== undefined) {
          return p.stockLeft > 0;
        }
        return true; // assume others are always in stock as standard products
      });
    }

    // 5. Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [searchQuery, selectedCategories, priceRange, onlyInStock, sortBy]);

  // Handle page resets when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, priceRange, onlyInStock, sortBy]);

  // Pagination bounds
  const totalItems = processedProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedProducts, currentPage]);

  const handleCategoryToggle = (category: string) => {
    if (initialCategory) {
      onClearInitialCategory();
    }
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange(maxProductPrice);
    setOnlyInStock(false);
    setSortBy('default');
    setCurrentPage(1);
    onClearInitialCategory();
  };

  return (
    <div className="py-32 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Editorial Title Block */}
        <div className="mb-16 pb-8 border-b border-white/5 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#D90429] uppercase block mb-3">
              ARCHIVAL SPECIFICATIONS
            </span>
            <h1 className="text-5xl md:text-7xl font-light font-serif tracking-tight text-[#F5F1E8]">
              The <span className="font-extrabold font-sans italic text-[#D90429]">Catalog</span>
            </h1>
            <p className="text-xs text-zinc-500 font-mono mt-3 uppercase tracking-wider">
              {totalItems} ARCHIVE RELEASES REGISTERED / SHOWING PAGE {currentPage} OF {totalPages}
            </p>
          </div>

          {/* Quick Clear Indicator if filters active */}
          {(searchQuery || selectedCategories.length > 0 || onlyInStock || sortBy !== 'default') && (
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-white/5 text-[#D90429] text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer self-start md:self-auto"
            >
              [ Reset Filters × ]
            </button>
          )}
        </div>

        {/* Search & Tool bar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Search bar spans 3 columns on lg */}
          <div className="lg:col-span-3 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="SEARCH THE BLACKOUT ARCHIVE (E.G. HOODIE, CARGO, TECH)"
              className="w-full bg-[#121212] border border-white/5 py-4 pl-12 pr-10 text-xs font-mono uppercase text-[#F5F1E8] placeholder-zinc-600 focus:border-[#D90429] outline-none transition-all"
            />
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort selection drop block */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full bg-[#121212] border border-white/5 py-4 px-4 text-xs font-mono uppercase text-[#F5F1E8] focus:border-[#D90429] outline-none appearance-none cursor-pointer"
            >
              <option value="default">SORT: CHRONOLOGICAL</option>
              <option value="price-asc">SORT: PRICE LOW TO HIGH</option>
              <option value="price-desc">SORT: PRICE HIGH TO LOW</option>
              <option value="name-asc">SORT: NAME A-Z</option>
              <option value="rating">SORT: MOST LOVED</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-500">
              <ArrowUpDown size={12} />
            </div>
          </div>
        </div>

        {/* Layout content split */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Column: Sidebar Filters (Hidden on Mobile, but custom styled overlay) */}
          <div className="hidden lg:flex flex-col gap-8 bg-[#121212]/30 border border-white/5 p-6">
            
            {/* Category Filter Group */}
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#D90429] uppercase font-bold block mb-4 pb-2 border-b border-white/5">
                CATEGORIES
              </span>
              <div className="flex flex-col gap-2.5">
                {categoriesList.map(category => {
                  const isChecked = selectedCategories.includes(category);
                  return (
                    <label
                      key={category}
                      className="flex items-center gap-3 text-xs font-mono uppercase text-zinc-400 hover:text-white cursor-pointer select-none transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCategoryToggle(category)}
                        className="sr-only"
                      />
                      <div className={`w-3.5 h-3.5 border flex items-center justify-center transition-all ${isChecked ? 'border-[#D90429] bg-[#D90429]' : 'border-zinc-700'}`}>
                        {isChecked && <div className="w-1 h-1 bg-white" />}
                      </div>
                      <span className={isChecked ? 'text-white font-medium' : ''}>{category}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Group */}
            <div>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                <span className="text-[11px] font-mono tracking-widest text-[#D90429] uppercase font-bold">
                  MAX PRICE
                </span>
                <span className="text-xs font-mono text-[#F5F1E8]">
                  ৳ {priceRange.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max={maxProductPrice}
                step="500"
                value={priceRange}
                onChange={e => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[#D90429]"
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-600 mt-2">
                <span>৳ 1,000</span>
                <span>৳ {maxProductPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Stock Filter Group */}
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#D90429] uppercase font-bold block mb-4 pb-2 border-b border-white/5">
                AVAILABILITY
              </span>
              <label className="flex items-center gap-3 text-xs font-mono uppercase text-zinc-400 hover:text-white cursor-pointer select-none transition-all">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={() => setOnlyInStock(prev => !prev)}
                  className="sr-only"
                />
                <div className={`w-3.5 h-3.5 border flex items-center justify-center transition-all ${onlyInStock ? 'border-[#D90429] bg-[#D90429]' : 'border-zinc-700'}`}>
                  {onlyInStock && <div className="w-1 h-1 bg-white" />}
                </div>
                <span className={onlyInStock ? 'text-white font-medium' : ''}>Hide Sold Out / Limited Runs</span>
              </label>
            </div>

          </div>

          {/* Mobile Filter toggle and drawer wrapper */}
          <div className="lg:hidden flex items-center justify-between py-3 px-4 bg-[#121212] border border-white/5 mb-4">
            <span className="text-xs font-mono tracking-wider text-zinc-400">FILTERS & ADJUSTMENTS</span>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#D90429] text-white text-[10px] font-mono uppercase font-bold"
            >
              <SlidersHorizontal size={12} />
              ADJUST
            </button>
          </div>

          {/* Mobile Filters Drawer Modal */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 flex justify-end">
              {/* Backdrop */}
              <div
                onClick={() => setShowMobileFilters(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              {/* Content Drawer */}
              <div className="relative w-full max-w-[320px] bg-[#0A0A0A] border-l border-white/5 h-full p-8 flex flex-col justify-between overflow-y-auto">
                <div className="flex flex-col gap-8">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-xs font-mono text-white tracking-[0.2em] uppercase font-bold">ADJUSTMENTS</span>
                    <button onClick={() => setShowMobileFilters(false)} className="text-zinc-500 hover:text-white">
                      <X size={18} />
                    </button>
                  </div>

                  {/* Categories */}
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#D90429] uppercase font-bold block mb-3">CATEGORIES</span>
                    <div className="flex flex-col gap-2.5">
                      {categoriesList.map(category => {
                        const isChecked = selectedCategories.includes(category);
                        return (
                          <label key={category} className="flex items-center gap-3 text-xs font-mono uppercase text-zinc-400 hover:text-white cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleCategoryToggle(category)}
                              className="sr-only"
                            />
                            <div className={`w-3.5 h-3.5 border flex items-center justify-center transition-all ${isChecked ? 'border-[#D90429] bg-[#D90429]' : 'border-zinc-700'}`}>
                              {isChecked && <div className="w-1 h-1 bg-white" />}
                            </div>
                            <span>{category}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-mono tracking-widest text-[#D90429] uppercase font-bold">MAX PRICE</span>
                      <span className="text-xs font-mono text-[#F5F1E8]">৳ {priceRange.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max={maxProductPrice}
                      step="500"
                      value={priceRange}
                      onChange={e => setPriceRange(Number(e.target.value))}
                      className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[#D90429]"
                    />
                  </div>

                  {/* Availability */}
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#D90429] uppercase font-bold block mb-3">AVAILABILITY</span>
                    <label className="flex items-center gap-3 text-xs font-mono uppercase text-zinc-400 hover:text-white cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={onlyInStock}
                        onChange={() => setOnlyInStock(prev => !prev)}
                        className="sr-only"
                      />
                      <div className={`w-3.5 h-3.5 border flex items-center justify-center transition-all ${onlyInStock ? 'border-[#D90429] bg-[#D90429]' : 'border-zinc-700'}`}>
                        {onlyInStock && <div className="w-1 h-1 bg-white" />}
                      </div>
                      <span>Hide Sold Out</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-8">
                  <button
                    onClick={() => {
                      handleResetFilters();
                      setShowMobileFilters(false);
                    }}
                    className="flex-1 py-3 bg-zinc-950 border border-white/5 text-xs font-mono tracking-wider text-center text-zinc-400 uppercase"
                  >
                    RESET
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 py-3 bg-[#D90429] text-white text-xs font-mono tracking-wider text-center uppercase font-bold"
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Area: Product Grid with Custom Pagination */}
          <div className="lg:col-span-3">
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                      onToggleWishlist={onToggleWishlist}
                      isWishlisted={wishlistIds.includes(product.id)}
                      onQuickView={onQuickView}
                    />
                  ))}
                </div>

                {/* Editorial Premium Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CFCFCF] hover:text-[#D90429] disabled:text-zinc-700 disabled:hover:text-zinc-700 transition-colors cursor-pointer select-none"
                    >
                      <ChevronLeft size={14} />
                      PREVIOUS
                    </button>

                    {/* Numeric Pages */}
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNumber = index + 1;
                        const isActive = currentPage === pageNumber;
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`w-8 h-8 flex items-center justify-center text-xs font-mono border transition-all ${
                              isActive
                                ? 'bg-[#D90429] border-[#D90429] text-white font-bold'
                                : 'bg-[#121212] border-white/5 text-zinc-400 hover:border-zinc-700 hover:text-white'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CFCFCF] hover:text-[#D90429] disabled:text-zinc-700 disabled:hover:text-zinc-700 transition-colors cursor-pointer select-none"
                    >
                      NEXT
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-24 border border-dashed border-white/5 bg-[#121212]/10 text-center flex flex-col items-center justify-center p-8">
                <SlidersHorizontal size={32} className="text-zinc-600 mb-4 animate-pulse" />
                <h3 className="text-lg font-sans font-medium text-white uppercase tracking-wider mb-2">
                  No Archive Items Match
                </h3>
                <p className="text-xs text-zinc-500 font-mono max-w-sm uppercase leading-relaxed mb-6">
                  Try adjusting your specifications, widening your price range, or resetting filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-[#D90429] hover:bg-[#8B0000] text-white text-xs font-mono tracking-widest uppercase font-bold transition-colors"
                >
                  RESET ARCHIVE FILTERS
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
