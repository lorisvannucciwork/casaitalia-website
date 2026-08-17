'use client';

import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem } from '../../data/menuData';
import { Navbar } from '../../components/Navbar';
import { CategoryNav } from '../../components/CategoryNav';
import { DishCard } from '../../components/DishCard';

import { OrderDraftDrawer, OrderItem } from '../../components/OrderDraftDrawer';
import { FloatingOrderBar } from '../../components/FloatingOrderBar';

import { Footer } from '../../components/Footer';
import { Utensils } from 'lucide-react';

import { useCart } from '../../hooks/useCart';

import { useLanguage } from '../../context/LanguageContext';

export default function MenuPage() {
  const { t } = useLanguage();
  // Navigation & Search States
  const [activeCategory, setActiveCategory] = useState<string>(MENU_CATEGORIES[0].id);
  const [activeDietaryFilter, setActiveDietaryFilter] = useState<string | null>(null);


  // Modals & Drawers States
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);

  // Table QR Detection
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tableParam = params.get('table');
      if (tableParam) {
        localStorage.setItem('casaItaliaTableNumber', `Table ${tableParam.padStart(2, '0')}`);
        localStorage.setItem('casaItaliaScannedViaQR', 'true');
      }
    }
  }, []);

  const {
    orderItems,
    handleUpdateQuantity,
    handleRemoveItem,
    handleAddItem,
    handleUpdateNote,
  } = useCart();

  // Filter menu items
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (activeDietaryFilter) {
        if (!item.tags.includes(activeDietaryFilter)) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, activeDietaryFilter]);

  // Quick Add Item handler
  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const cartId = `${item.id}-${Date.now()}`;
    const newItem: OrderItem = {
      cartId,
      item,
      quantity: 1,
      options: [],
      unitPrice: item.price,
    };
    handleAddItem(newItem);
  };

  const totalItemCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const currentCategoryObj = MENU_CATEGORIES.find((c) => c.id === activeCategory);
  const currentCategoryTitle = activeCategory === 'all'
    ? t('categories.all')
    : (currentCategoryObj ? t(`categories.${currentCategoryObj.id}`) : activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased selection:bg-[#ba935a] selection:text-white">
      {/* Top Navbar with Attached Category Navigation */}
      <Navbar

        orderCount={totalItemCount}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}

      />

      {/* Main Content Body */}
      <main className="flex-1 relative">
        <div className="absolute inset-0 z-0 bg-[url('/backgrounds/bg-1.webp')] bg-[length:100%_auto] bg-repeat-y opacity-80" />
        {/* Menu & Filters Section */}
        <section id="menu-section" className="relative z-10 pt-[90px] sm:pt-[110px] pb-8 sm:pb-12 min-h-screen">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-8">
            
            {/* Header Title for Current Category */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#ba935a]/25 pb-4 gap-4">
              <div>
                <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-wide [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
                  {currentCategoryTitle}
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                <CategoryNav 
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                />

              </div>
            </div>

            {/* Empty Search Result Fallback */}
            {filteredDishes.length === 0 ? (
              <div className="relative overflow-hidden bg-white/60 backdrop-blur-md p-12 text-center space-y-6 border-2 border-white/60 shadow-[0_8px_30px_rgba(186,147,90,0.1)] max-w-lg mx-auto rounded-none">
                <div className="absolute inset-0 bg-[url('/backgrounds/bg-2.webp')] bg-cover opacity-30 pointer-events-none" />
                <div className="absolute inset-0 bg-[#f2ebda]/60 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full border border-[#ba935a]/30 flex items-center justify-center bg-white shadow-sm mb-2">
                    <Utensils className="w-6 h-6 text-[#ba935a]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#1a1816] tracking-tight">
                    {t('cart.empty')}
                  </h3>
                  <p className="text-sm text-[#6e675e] max-w-sm mx-auto font-medium">
                    {t('cart.emptyDesc')}
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setActiveDietaryFilter(null);
                    }}
                    className="mt-4 px-8 py-3.5 bg-[#ba935a] text-white text-sm font-bold hover:bg-[#a37f48] shadow-casa-gold transition-all transform hover:-translate-y-0.5 tracking-wide uppercase"
                  >
                    {t('categories.all')}
                  </button>
                </div>
              </div>
            ) : (
              /* Dish Cards Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDishes.map((dish, index) => (
                  <DishCard
                    key={dish.id || `dish-${index}`}
                    item={dish}
                    onSelectDish={() => {}}
                    onQuickAdd={handleQuickAdd}
                  />
                ))}
              </div>
            )}

          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />




      <FloatingOrderBar
        items={orderItems}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
      />

      <OrderDraftDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        items={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onUpdateNote={handleUpdateNote}
      />
    </div>
  );
}
