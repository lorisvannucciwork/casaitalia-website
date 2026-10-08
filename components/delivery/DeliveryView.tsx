'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, Footer } from '@/components/layout';
import type { Category, MenuItem } from '@/types/menu';
import type { DeliveryCartItem, DeliveryCustomerDetails } from '@/types/delivery';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslatedMenuItem } from '@/utils/menuTranslations';
import { CategoryNav } from '@/components/menu/CategoryNav';
import { DeliveryDishCard } from './DeliveryDishCard';
import { DeliveryDrawer } from './DeliveryDrawer';
import {
  Bike,
  Sparkles,
  UtensilsCrossed,
  Filter,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

interface DeliveryViewProps {
  initialCategories: Category[];
  initialCategory?: string;
  initialItems: MenuItem[];
}

const STORAGE_KEY_CART = 'casaItaliaDeliveryCart';
const STORAGE_KEY_CUSTOMER = 'casaItaliaDeliveryCustomer';

export const DeliveryView: React.FC<DeliveryViewProps> = ({
  initialCategories,
  initialCategory = 'antipasti',
  initialItems,
}) => {
  const { language, formatCurrency, t } = useLanguage();
  const isIt = language === 'it';

  const validCategories = useMemo(
    () => initialCategories.filter((c) => c.id.toLowerCase() !== 'all'),
    [initialCategories]
  );

  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategory || validCategories[0]?.id || 'antipasti'
  );

  // Synchronize category state with URL parameter on mount or when initialCategory updates
  useEffect(() => {
    const cleanInitial = (initialCategory || validCategories[0]?.id || 'antipasti').toLowerCase();
    setActiveCategory(cleanInitial);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.searchParams.get('category')?.toLowerCase() !== cleanInitial) {
        url.searchParams.set('category', cleanInitial);
        window.history.replaceState({ category: cleanInitial }, '', url.toString());
      }
    }
  }, [initialCategory, validCategories]);

  // Handle browser back/forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const catFromUrl = params.get('category');
        if (catFromUrl && catFromUrl.toLowerCase() !== activeCategory.toLowerCase()) {
          setActiveCategory(catFromUrl.toLowerCase());
        }
      } catch {}
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeCategory]);

  const handleSelectCategory = (targetCategoryId: string) => {
    const cleanTarget = targetCategoryId.toLowerCase();
    if (cleanTarget === activeCategory.toLowerCase()) return;

    setActiveCategory(cleanTarget);

    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('category', cleanTarget);
        window.history.pushState({ category: cleanTarget }, '', url.toString());
      } catch {}
    }
  };

  const currentCategoryObj = useMemo(() => {
    return (
      validCategories.find(
        (c) => c.id.toLowerCase() === activeCategory.toLowerCase()
      ) || validCategories[0]
    );
  }, [validCategories, activeCategory]);

  const currentCategoryTitle = useMemo(() => {
    if (!currentCategoryObj) return '';
    const key = `categories.${currentCategoryObj.id}`;
    const trans = t(key);
    if (trans && trans !== key) return trans;
    return isIt
      ? currentCategoryObj.italianTitle || currentCategoryObj.name
      : currentCategoryObj.name;
  }, [currentCategoryObj, t, isIt]);

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<DeliveryCartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_CART);
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  // Customer details state persisted in localStorage
  const [customerDetails, setCustomerDetails] = useState<DeliveryCustomerDetails>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_CUSTOMER);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            customerName: parsed.customerName || '',
            area: 'inside',
            destination: '',
            specificLocation: parsed.specificLocation || '',
            phone: parsed.phone || '',
            notes: parsed.notes || '',
          };
        }
      } catch {}
    }
    return {
      customerName: '',
      area: 'inside',
      destination: '',
      specificLocation: '',
      phone: '',
      notes: '',
    };
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilterBar, setShowFilterBar] = useState<boolean>(true);
  const [showOrderBar, setShowOrderBar] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Sync customer details to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOMER, JSON.stringify(customerDetails));
    } catch {}
  }, [customerDetails]);

  // Cart actions
  const handleAddToCart = (dish: MenuItem) => {
    setShowOrderBar(true);
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (dish: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((item) => item.dish.id !== dish.id);
      }
      return prev.map((item) =>
        item.dish.id === dish.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleDeleteFromCart = (dishId: string) => {
    setCart((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleUpdateItemNotes = (dishId: string, notes: string) => {
    setCart((prev) =>
      prev.map((item) => (item.dish.id === dishId ? { ...item, notes } : item))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateCustomerDetails = (details: Partial<DeliveryCustomerDetails>) => {
    setCustomerDetails((prev) => ({ ...prev, ...details }));
  };

  // Quantity lookup map for rapid card rendering
  const cartQuantityMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of cart) {
      map.set(item.dish.id, item.quantity);
    }
    return map;
  }, [cart]);

  const totalItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  }, [cart]);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    let items = initialItems.filter(
      (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
    );

    if (searchQuery.trim() !== '') {
      const query = searchQuery.trim().toLowerCase();
      items = items.filter((item) => {
        const translated = getTranslatedMenuItem(item, language);
        const nameMatch = translated.name.toLowerCase().includes(query);
        const itNameMatch = translated.italianName?.toLowerCase().includes(query);
        const descMatch = translated.description?.toLowerCase().includes(query);
        const tagMatch = item.tags?.some((t) => t.toLowerCase().includes(query));
        return nameMatch || itNameMatch || descMatch || tagMatch;
      });
    }

    return items;
  }, [initialItems, activeCategory, searchQuery, language]);

  return (
    <div className="min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased selection:bg-[#ba935a] selection:text-white">
      <Navbar />

      <main className="flex-1 relative pt-[64px]">
        <div className="absolute inset-0 z-0 bg-[url('/backgrounds/bg-1.webp')] bg-[length:100%_auto] bg-repeat-y opacity-80" />

        {/* Filter Controls: Search & Category Dropdown (Toggleable Hide/Show) */}
        <div
          className={`sticky top-[64px] z-40 bg-[#faf7f2] transition-[border-color,box-shadow] duration-300 ${
            showFilterBar ? 'border-b border-[#ba935a]/25 shadow-xs' : 'border-b-0'
          }`}
        >
          {/* Collapsible Content with Opening and Closing Animations */}
          <div
            id="delivery-filter-controls"
            className={`filter-accordion-wrapper ${showFilterBar ? 'open' : 'closed'}`}
          >
            <div className="filter-accordion-inner">
              <div className="filter-accordion-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center">
                <CategoryNav
                  activeCategory={activeCategory}
                  onSelectCategory={handleSelectCategory}
                  categories={validCategories}
                  includeAllOption={false}
                  basePath="/delivery"
                />
              </div>
            </div>
          </div>

          {/* Unique Toggle Tab (Attached to bottom border of filter bar when open, directly to navbar when closed) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-px pointer-events-auto z-40">
            <button
              type="button"
              onClick={() => setShowFilterBar(!showFilterBar)}
              aria-expanded={showFilterBar}
              aria-controls="delivery-filter-controls"
              aria-label={
                showFilterBar
                  ? (isIt ? 'Nascondi categorie' : 'Hide categories')
                  : (isIt ? 'Mostra categorie' : 'Show categories')
              }
              title={
                showFilterBar
                  ? (isIt ? 'Nascondi categorie' : 'Hide categories')
                  : (isIt ? 'Mostra categorie' : 'Show categories')
              }
              className="group flex items-center justify-center w-12 sm:w-14 h-4.5 sm:h-5 bg-[#faf7f2] text-[#ba935a] hover:text-[#8a6834] rounded-b-xl shadow-xs hover:shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
            >
              <ChevronUp
                className={`w-3.5 h-3.5 text-[#ba935a] group-hover:text-[#8a6834] transition-all duration-300 ease-in-out group-hover:scale-115 ${
                  showFilterBar ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Dishes Section */}
        <section id="delivery-section" className="relative z-10 pt-6 pb-16 min-h-[calc(100vh-140px)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Category Header */}
            <div className="border-b border-[#ba935a]/25 pb-4">
              <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-wide [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
                {currentCategoryTitle}
              </h1>
              <p className="text-xs sm:text-sm text-[#faf7f2]/90 font-medium pt-1">
                {filteredDishes.length} {filteredDishes.length === 1 ? t('delivery.dishAvailable') : t('delivery.dishesAvailable')}
              </p>
            </div>

            {/* Dishes Grid */}
            <div>
          {filteredDishes.length === 0 ? (
            <div className="py-20 text-center space-y-3 bg-white/60 border border-white p-8">
              <UtensilsCrossed className="w-10 h-10 text-[#ba935a]/60 mx-auto" />
              <h3 className="font-serif font-bold text-xl text-[#1a1816]">
                {isIt ? 'Nessun piatto trovato' : 'No dishes found'}
              </h3>
              <p className="text-xs text-[#6e675e] max-w-sm mx-auto">
                {isIt
                  ? 'Nessun piatto disponibile in questa categoria.'
                  : 'No dishes available in this category.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => (
                <DeliveryDishCard
                  key={dish.id}
                  item={dish}
                  quantityInCart={cartQuantityMap.get(dish.id) || 0}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  </main>

  <Footer />

      {/* Sticky Bottom Floating Bar (Appears when items are in cart) */}
      {cart.length > 0 && (
        <>
          {/* Main Delivery Order Tray */}
          <div
            className={`fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-[#faf7f2] border-t border-[#ba935a]/30 text-[#1a1816] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-in-out ${
              showOrderBar ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            {/* Attached Tab at Top Center to Hide */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full pointer-events-auto">
              <button
                type="button"
                onClick={() => setShowOrderBar(false)}
                aria-label={isIt ? 'Nascondi vassoio ordine' : 'Hide order tray'}
                title={isIt ? 'Nascondi vassoio ordine' : 'Hide order tray'}
                className="group flex items-center justify-center w-12 sm:w-14 h-4.5 sm:h-5 bg-[#faf7f2] text-[#ba935a] hover:text-[#8a6834] rounded-t-xl border-t border-x border-[#ba935a]/30 shadow-xs transition-all duration-300 cursor-pointer active:scale-95"
              >
                <ChevronDown className="w-3.5 h-3.5 text-[#ba935a] group-hover:text-[#8a6834] group-hover:translate-y-0.5 transition-all duration-300" />
              </button>
            </div>

            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-base sm:text-lg text-[#1a1816]">
                      {t('delivery.cartTitle')}:
                    </span>
                    <span className="font-serif font-bold text-lg sm:text-xl text-[#ba935a]">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#ba935a] to-[#a37f48] hover:from-[#c8a165] hover:to-[#ba935a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
              >
                <span>
                  {t('delivery.floatingCartBtn')} ({totalItemsCount})
                </span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Minimized Docked Tab at Bottom Center to Show */}
          {!showOrderBar && (
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
              <button
                type="button"
                onClick={() => setShowOrderBar(true)}
                aria-label={isIt ? 'Mostra vassoio ordine' : 'Show order tray'}
                title={isIt ? 'Mostra vassoio ordine' : 'Show order tray'}
                className="group flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-[#faf7f2] hover:bg-white text-[#1a1816] border-t border-x border-[#ba935a]/35 rounded-t-xl shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span className="font-serif font-bold text-xs sm:text-sm text-[#ba935a]">
                  {formatCurrency(subtotal)}
                </span>
                <span className="text-[11px] text-[#6e675e] font-bold">
                  ({totalItemsCount})
                </span>
                <ChevronUp className="w-3.5 h-3.5 text-[#ba935a] group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Slide-over Delivery Order Drawer */}
      <DeliveryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onDeleteFromCart={handleDeleteFromCart}
        onUpdateItemNotes={handleUpdateItemNotes}
        onClearCart={handleClearCart}
        customerDetails={customerDetails}
        onUpdateCustomerDetails={handleUpdateCustomerDetails}
      />
    </div>
  );
};
