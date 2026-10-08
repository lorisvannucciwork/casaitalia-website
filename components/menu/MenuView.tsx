'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { MenuItem, Category, MENU_ITEMS as FALLBACK_ITEMS } from '@/data/menuData';
import { Navbar, Footer } from '@/components/layout';
import { TopProgressBar, DishCardSkeleton } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslatedMenuItem } from '@/utils/menuTranslations';
import { ChevronUp } from 'lucide-react';
import {
  MenuHeader,
  MenuEmptyState,
  MenuGrid,
  CategoryNav,
} from './';

export interface MenuViewProps {
  initialCategories: Category[];
  initialCategory?: string;
  initialItems: MenuItem[];
  className?: string;
}

function preloadCategoryImages(items: MenuItem[]): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  const imageUrls = items
    .slice(0, 4)
    .map((item) => (item.image ? item.image.trim() : ''))
    .filter((src) => src.length > 0);

  if (imageUrls.length === 0) return Promise.resolve();

  return new Promise((resolve) => {
    let completed = 0;
    const total = imageUrls.length;

    const timeoutId = setTimeout(() => {
      resolve();
    }, 600);

    const checkComplete = () => {
      completed++;
      if (completed >= total) {
        clearTimeout(timeoutId);
        resolve();
      }
    };

    imageUrls.forEach((src) => {
      const img = new Image();
      img.src = encodeURI(src);
      if (img.complete) {
        checkComplete();
      } else {
        img.onload = checkComplete;
        img.onerror = checkComplete; 
      }
    });
  });
}

export function MenuView({
  initialCategories,
  initialCategory = 'antipasti',
  initialItems,
  className = '',
}: MenuViewProps) {
  const { t, language } = useLanguage();

  const validCategories = useMemo(
    () => initialCategories.filter((c) => c.id.toLowerCase() !== 'all'),
    [initialCategories]
  );
  const categories = validCategories;

  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategory || validCategories[0]?.id || 'antipasti'
  );

  const clientCache = useRef<Map<string, MenuItem[]>>(new Map());

  const preloadedCategories = useRef<Set<string>>(new Set());

  const [currentDishes, setCurrentDishes] = useState<MenuItem[]>(initialItems);
  const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilterBar, setShowFilterBar] = useState<boolean>(true);

  const latestRequestedCategory = useRef<string>(activeCategory);

  useEffect(() => {
    const cleanInitial = (initialCategory || 'antipasti').toLowerCase();
    if (initialItems && initialItems.length > 0) {
      clientCache.current.set(cleanInitial, initialItems);
      preloadCategoryImages(initialItems).then(() => {
        preloadedCategories.current.add(cleanInitial);
      });
    }

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.searchParams.get('category')?.toLowerCase() !== cleanInitial) {
        url.searchParams.set('category', cleanInitial);
        window.history.replaceState({ category: cleanInitial }, '', url.toString());
      }
    }
  }, [initialCategory, initialItems]);

  useEffect(() => {
    try {
      localStorage.removeItem('casaItaliaTableNumber');
      localStorage.removeItem('casaItaliaTableNumOnly');
    } catch {

    }
  }, []);

  const handleSelectCategory = useCallback(
    async (targetCategoryId: string) => {
      const cleanTarget = targetCategoryId.toLowerCase();
      if (cleanTarget === activeCategory.toLowerCase() && !isLoadingCategory) {
        return;
      }

      latestRequestedCategory.current = cleanTarget;
      setActiveCategory(cleanTarget);
      setSearchQuery('');

      if (typeof window !== 'undefined') {
        try {
          const url = new URL(window.location.href);
          url.searchParams.set('category', cleanTarget);
          window.history.pushState({ category: cleanTarget }, '', url.toString());
        } catch {

        }
      }

      const cachedItems = clientCache.current.get(cleanTarget);
      const isAlreadyPreloaded = preloadedCategories.current.has(cleanTarget);

      if (cachedItems && isAlreadyPreloaded) {

        setCurrentDishes(cachedItems);
        setIsLoadingCategory(false);
        return;
      }

      setIsLoadingCategory(true);

      try {
        let itemsToPreload = cachedItems;

        if (!itemsToPreload || itemsToPreload.length === 0) {
          try {
            const response = await fetch(
              `/api/menu?category=${encodeURIComponent(cleanTarget)}`,
              {
                headers: { Accept: 'application/json' },
              }
            );
            if (response.ok) {
              const data = (await response.json()) as { items?: MenuItem[] };
              if (Array.isArray(data.items) && data.items.length > 0) {
                itemsToPreload = data.items;
              }
            }
          } catch {}
        }

        if (!itemsToPreload || itemsToPreload.length === 0) {
          itemsToPreload = FALLBACK_ITEMS.filter(
            (item) => item.category.toLowerCase() === cleanTarget
          );
        }

        clientCache.current.set(cleanTarget, itemsToPreload);

        await preloadCategoryImages(itemsToPreload);
        preloadedCategories.current.add(cleanTarget);

        if (latestRequestedCategory.current === cleanTarget) {
          setCurrentDishes(itemsToPreload);
          setIsLoadingCategory(false);
        }
      } catch (err) {
        console.error(`Error loading category "${cleanTarget}":`, err);
        if (latestRequestedCategory.current === cleanTarget) {
          const fallback = FALLBACK_ITEMS.filter(
            (item) => item.category.toLowerCase() === cleanTarget
          );
          setCurrentDishes(fallback.length > 0 ? fallback : (cachedItems || []));
          setIsLoadingCategory(false);
        }
      }
    },
    [activeCategory, isLoadingCategory]
  );

  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const catFromUrl = params.get('category');
        if (catFromUrl && catFromUrl.toLowerCase() !== activeCategory.toLowerCase()) {
          handleSelectCategory(catFromUrl.toLowerCase());
        }
      } catch {

      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeCategory, handleSelectCategory]);

  const currentCategoryObj = categories.find(
    (c) => c.id.toLowerCase() === activeCategory.toLowerCase()
  );

  const currentCategoryTitle = useMemo(() => {
    if (!currentCategoryObj) return activeCategory;
    const trans = t(`categories.${currentCategoryObj.id}`);
    if (trans && trans !== `categories.${currentCategoryObj.id}`) return trans;
    return language === 'it'
      ? currentCategoryObj.italianTitle || currentCategoryObj.name
      : currentCategoryObj.name;
  }, [activeCategory, currentCategoryObj, t, language]);

  const isIt = language === 'it';

  // Filtered dishes based on search query
  const filteredDishes = useMemo(() => {
    if (!searchQuery.trim()) {
      return currentDishes;
    }
    const query = searchQuery.trim().toLowerCase();
    return currentDishes.filter((item) => {
      const translated = getTranslatedMenuItem(item, language);
      const nameMatch = translated.name?.toLowerCase().includes(query);
      const itNameMatch = translated.italianName?.toLowerCase().includes(query);
      const descMatch = translated.description?.toLowerCase().includes(query);
      const tagMatch = item.tags?.some((t) => t.toLowerCase().includes(query));
      return nameMatch || itNameMatch || descMatch || tagMatch;
    });
  }, [currentDishes, searchQuery, language]);

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased selection:bg-[#ba935a] selection:text-white ${className}`}
    >
      <TopProgressBar active={isLoadingCategory} />

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
            id="menu-filter-controls"
            className={`filter-accordion-wrapper ${showFilterBar ? 'open' : 'closed'}`}
          >
            <div className="filter-accordion-inner">
              <div className="filter-accordion-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center">
                <CategoryNav
                  activeCategory={activeCategory}
                  onSelectCategory={handleSelectCategory}
                  categories={validCategories}
                  includeAllOption={false}
                  basePath="/menu"
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
              aria-controls="menu-filter-controls"
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
        <section
          id="menu-section"
          className="relative z-10 pt-6 pb-8 sm:pb-12 min-h-screen"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <MenuHeader
              categoryTitle={currentCategoryTitle}
              dishCount={isLoadingCategory ? 0 : filteredDishes.length}
            />

            {isLoadingCategory ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
                {Array.from({ length: 6 }).map((_, index) => (
                  <DishCardSkeleton key={`dish-skeleton-${index}`} />
                ))}
              </div>
            ) : filteredDishes.length === 0 ? (
              <MenuEmptyState
                onResetCategory={() =>
                  handleSelectCategory(categories[0]?.id || 'antipasti')
                }
              />
            ) : (
              <div className="animate-in fade-in duration-300">
                <MenuGrid
                  dishes={filteredDishes}
                />
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export const MenuClient = MenuView;
