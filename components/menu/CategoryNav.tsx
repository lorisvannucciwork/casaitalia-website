'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MENU_CATEGORIES, Category } from '@/data/menuData';
import { ChevronDown, ChevronLeft, ChevronRight, UtensilsCrossed } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  categories?: Category[];
  activeDietaryFilter?: string | null;
  onSelectDietaryFilter?: (filter: string | null) => void;
  isAttached?: boolean;
}

const ITEMS_PER_PAGE = 6;

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  categories = MENU_CATEGORIES,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const { t, formatNumber, language } = useLanguage();
  const navRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent | PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [isOpen]);

  // Filter out any "all" category so only specific categories are displayed
  const displayCategories: Category[] = useMemo(() => {
    return categories.filter((c) => c.id.toLowerCase() !== 'all');
  }, [categories]);

  const totalPages = Math.max(1, Math.ceil(displayCategories.length / ITEMS_PER_PAGE));

  const getCategoryTitle = (cat: Category) => {
    const key = `categories.${cat.id}`;
    const trans = t(key);
    if (trans && trans !== key) return trans;
    return language === 'it' ? (cat.italianTitle || cat.name) : cat.name;
  };

  const handleToggle = () => {
    if (!isOpen) {
      const activeIndex = displayCategories.findIndex(
        (c) => c.id.toLowerCase() === activeCategory.toLowerCase()
      );
      if (activeIndex >= 0) {
        setPage(Math.floor(activeIndex / ITEMS_PER_PAGE));
      }
    }
    setIsOpen((prev) => !prev);
  };

  const activeCategoryObj = displayCategories.find(
    (c) => c.id.toLowerCase() === activeCategory.toLowerCase()
  );
  const activeCategoryName = activeCategoryObj
    ? getCategoryTitle(activeCategoryObj)
    : (displayCategories[0] ? getCategoryTitle(displayCategories[0]) : t('categories.select'));

  const startIndex = page * ITEMS_PER_PAGE;

  // Touch swipe handlers for mobile sliding
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 40 && page > 0) {
      setPage((p) => p - 1);
    } else if (deltaX < -40 && page < totalPages - 1) {
      setPage((p) => p + 1);
    }
    touchStartX.current = null;
  };

  return (
    <div ref={navRef} className="relative z-40 w-full sm:w-auto">
      {/* Category Dropdown Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-2.5 font-medium bg-white/90 backdrop-blur-md text-[#1a1816] hover:bg-white border border-[#ba935a]/40 shadow-sm hover:border-[#ba935a] transition-all text-sm cursor-pointer"
      >
        <div className="flex items-center gap-2.5 text-[#ba935a]">
          <UtensilsCrossed className="w-4 h-4" />
          <span className="text-[#1a1816] font-bold tracking-wide">{activeCategoryName}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#ba935a] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Paginated / Sliding Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 sm:left-auto sm:right-0 w-full sm:w-80 mt-2 bg-white border border-[#ba935a]/30 shadow-xl overflow-hidden animate-fade-in rounded-none z-50"
        >
          {/* Header Pagination Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#faf7f2] border-b border-[#ba935a]/20 text-xs font-semibold text-[#1a1816]">
            <span className="text-[#6e675e]">
              {t('nav.page')} {formatNumber(page + 1)} / {formatNumber(totalPages)}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPage((p) => Math.max(0, p - 1));
                }}
                disabled={page === 0}
                className="p-1 hover:bg-[#ba935a]/20 text-[#1a1816] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Dots */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPage(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      idx === page ? 'bg-[#ba935a] scale-125' : 'bg-[#ba935a]/30 hover:bg-[#ba935a]/60'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPage((p) => Math.min(totalPages - 1, p + 1));
                }}
                disabled={page === totalPages - 1}
                className="p-1 hover:bg-[#ba935a]/20 text-[#1a1816] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Smooth Sliding Pages Container */}
          <div
            className="overflow-hidden relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIdx) => {
                const pageCategories = displayCategories.slice(
                  pageIdx * ITEMS_PER_PAGE,
                  pageIdx * ITEMS_PER_PAGE + ITEMS_PER_PAGE
                );
                return (
                  <div key={pageIdx} className="w-full shrink-0 divide-y divide-gray-100">
                    {pageCategories.map((cat) => {
                      const isSelected = activeCategory.toLowerCase() === cat.id.toLowerCase();
                      const categoryTitle = getCategoryTitle(cat);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            onSelectCategory(cat.id);
                            setIsOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[#ba935a] text-white font-bold'
                              : 'text-[#1a1816] hover:bg-[#f7f2e8]'
                          }`}
                        >
                          <span>{categoryTitle}</span>
                          {isSelected && <span className="text-xs text-white/90">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Navigation Bar */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#faf7f2] border-t border-[#ba935a]/15 text-[11px] text-[#6e675e]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPage((p) => Math.max(0, p - 1));
              }}
              disabled={page === 0}
              className="hover:text-[#ba935a] font-bold disabled:opacity-30 disabled:hover:text-[#6e675e] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="inline-block">←</span>
              <span>{t('nav.prev')}</span>
            </button>
            <span className="font-semibold text-[#ba935a]">
              {formatNumber(startIndex + 1)} -{' '}
              {formatNumber(Math.min(startIndex + ITEMS_PER_PAGE, displayCategories.length))}{' '}
              {t('nav.of')} {formatNumber(displayCategories.length)}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPage((p) => Math.min(totalPages - 1, p + 1));
              }}
              disabled={page === totalPages - 1}
              className="hover:text-[#ba935a] font-bold disabled:opacity-30 disabled:hover:text-[#6e675e] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{t('nav.next')}</span>
              <span className="inline-block">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
