'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { MenuItem, Category } from '@/data/menuData';
import { Navbar, Footer } from '@/components/layout';
import { useLanguage } from '@/context/LanguageContext';
import {
  MenuHeader,
  MenuEmptyState,
  MenuGrid,
  DishModal,
} from './';

export interface MenuViewProps {
  initialCategories: Category[];
  initialItems: MenuItem[];
  className?: string;
}

export function MenuView({ initialCategories, initialItems, className = '' }: MenuViewProps) {
  const { t, language } = useLanguage();

  // Navigation & Menu State
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialItems);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // Clean any legacy table number tokens
  useEffect(() => {
    try {
      localStorage.removeItem('casaItaliaTableNumber');
      localStorage.removeItem('casaItaliaTableNumOnly');
    } catch {
      // ignore
    }
  }, []);

  // Fallback fetch only if SSR returned empty data
  useEffect(() => {
    if (initialItems.length > 0 && initialCategories.length > 0) return;

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
  }, [initialItems.length, initialCategories.length]);

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
    <div className={`min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased selection:bg-[#ba935a] selection:text-white ${className}`}>
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 relative">
        <div className="absolute inset-0 z-0 bg-[url('/backgrounds/bg-1.webp')] bg-[length:100%_auto] bg-repeat-y opacity-80" />

        {/* Menu & Filters Section */}
        <section id="menu-section" className="relative z-10 pt-[90px] sm:pt-[110px] pb-8 sm:pb-12 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-6">
            {/* Menu Header with Category Selector */}
            <MenuHeader
              categoryTitle={currentCategoryTitle}
              dishCount={filteredDishes.length}
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            {/* Menu Grid or Empty State */}
            {filteredDishes.length === 0 ? (
              <MenuEmptyState onResetCategory={() => setActiveCategory('all')} />
            ) : (
              <MenuGrid
                dishes={filteredDishes}
                onSelectDish={setSelectedDish}
              />
            )}

            {/* Luxury Dish Detail Modal */}
            <DishModal
              dish={selectedDish}
              onClose={() => setSelectedDish(null)}
            />
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

// Named alias for convenience
export const MenuClient = MenuView;
