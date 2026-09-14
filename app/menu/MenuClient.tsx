'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MenuItem, Category } from '../../data/menuData';
import { Navbar } from '../../components/Navbar';
import { CategoryNav } from '../../components/CategoryNav';
import { DishCard } from '../../components/DishCard';
import { Footer } from '../../components/Footer';
import { Utensils, ShieldCheck, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MenuClientProps {
  initialCategories: Category[];
  initialItems: MenuItem[];
}

export function MenuClient({ initialCategories, initialItems }: MenuClientProps) {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();

  // Navigation & State
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialItems);
  const [activeTable, setActiveTable] = useState<string | null>(null);

  // Sync table from URL or localStorage
  useEffect(() => {
    const paramTable = searchParams?.get('table');
    if (paramTable && paramTable !== 'null') {
      const clean = paramTable.trim();
      const num = parseInt(clean.replace(/\D/g, ''), 10);
      const formatted = num ? (num < 10 ? `Table 0${num}` : `Table ${num}`) : clean;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTable(formatted);
      try {
        localStorage.setItem('casaItaliaTableNumber', formatted);
      } catch {
        // ignore storage errors
      }
    } else {
      try {
        const saved = localStorage.getItem('casaItaliaTableNumber');
        if (saved) {
          setActiveTable(saved);
        }
      } catch {
        // ignore
      }
    }
  }, [searchParams]);

  const handleClearTable = () => {
    setActiveTable(null);
    try {
      localStorage.removeItem('casaItaliaTableNumber');
      localStorage.removeItem('casaItaliaTableNumOnly');
    } catch {
      // ignore
    }
  };

  // Background refresh to keep client in sync with any live DB changes
  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json() as Promise<{ success?: boolean; items?: MenuItem[] }>)
      .then((data) => {
        if (data.success && Array.isArray(data.items) && data.items.length > 0) {
          setMenuItems(data.items);
        }
      })
      .catch(() => {});

    fetch('/api/menu/categories')
      .then((res) => res.json() as Promise<{ success?: boolean; categories?: Category[] }>)
      .then((data) => {
        if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories);
        }
      })
      .catch(() => {});
  }, []);

  // Filter menu items by selected category
  const filteredDishes = useMemo(() => {
    if (activeCategory === 'all') return menuItems;
    return menuItems.filter(
      (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [menuItems, activeCategory]);

  const currentCategoryObj = categories.find(
    (c) => c.id.toLowerCase() === activeCategory.toLowerCase()
  );

  const currentCategoryTitle = useMemo(() => {
    if (activeCategory === 'all') return t('categories.all');
    if (!currentCategoryObj) return activeCategory;
    const trans = t(`categories.${currentCategoryObj.id}`);
    if (trans && trans !== `categories.${currentCategoryObj.id}`) return trans;
    return language === 'it'
      ? currentCategoryObj.italianTitle || currentCategoryObj.name
      : currentCategoryObj.name;
  }, [activeCategory, currentCategoryObj, t, language]);

  return (
    <div className="min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased selection:bg-[#ba935a] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 relative">
        <div className="absolute inset-0 z-0 bg-[url('/backgrounds/bg-1.webp')] bg-[length:100%_auto] bg-repeat-y opacity-80" />
        
        {/* Menu & Filters Section */}
        <section id="menu-section" className="relative z-10 pt-[90px] sm:pt-[110px] pb-8 sm:pb-12 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-6">
            
            {/* Active Table Status Banner (when seated via QR) */}
            {activeTable && (
              <div className="flex items-center justify-between px-4 py-2 bg-white/95 backdrop-blur-md border border-[#ba935a]/50 shadow-sm max-w-md">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#ba935a]/15 text-[#ba935a] flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#1a1816]">{activeTable}</span>
                    <span className="text-[#6e675e] mx-1.5">•</span>
                    <span className="text-[#ba935a] font-semibold">{t('table.seatedGuest')}</span>
                  </div>
                </div>
                <button
                  onClick={handleClearTable}
                  aria-label="Clear active table"
                  className="p-1 text-[#6e675e] hover:text-red-500 transition-colors cursor-pointer"
                  title={t('table.clear')}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Header Title for Current Category */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#ba935a]/25 pb-4 gap-4">
              <div>
                <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-wide [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
                  {currentCategoryTitle}
                </h1>
                <p className="text-xs sm:text-sm text-[#faf7f2]/90 font-medium pt-1">
                  {filteredDishes.length} {filteredDishes.length === 1 ? 'dish' : 'dishes'} available
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                <CategoryNav
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  categories={categories}
                />
              </div>
            </div>

            {/* Empty Search Result Fallback */}
            {filteredDishes.length === 0 ? (
              <div className="relative overflow-hidden bg-white/75 backdrop-blur-md p-12 text-center space-y-6 border-2 border-white/60 shadow-[0_8px_30px_rgba(186,147,90,0.1)] max-w-lg mx-auto rounded-none">
                <div className="absolute inset-0 bg-[url('/backgrounds/bg-2.webp')] bg-cover opacity-30 pointer-events-none" />
                <div className="absolute inset-0 bg-[#f2ebda]/60 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full border border-[#ba935a]/30 flex items-center justify-center bg-white shadow-sm mb-2">
                    <Utensils className="w-6 h-6 text-[#ba935a]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#1a1816] tracking-tight">
                    {t('categories.all')}
                  </h3>
                  <p className="text-sm text-[#6e675e] max-w-sm mx-auto font-medium">
                    No dishes found in this category.
                  </p>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="mt-4 px-8 py-3.5 bg-[#ba935a] text-white text-sm font-bold hover:bg-[#a37f48] shadow-casa-gold transition-all transform hover:-translate-y-0.5 tracking-wide uppercase cursor-pointer"
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
                  />
                ))}
              </div>
            )}

          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
