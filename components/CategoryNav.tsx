'use client';

import React, { useState } from 'react';
import { MENU_CATEGORIES } from '../data/menuData';
import { ChevronDown, ChevronLeft, ChevronRight, UtensilsCrossed } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  activeDietaryFilter?: string | null;
  onSelectDietaryFilter?: (filter: string | null) => void;
  isAttached?: boolean;
}

const ITEMS_PER_PAGE = 6;

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const { t, formatNumber } = useLanguage();

  const totalPages = Math.ceil(MENU_CATEGORIES.length / ITEMS_PER_PAGE);

  const handleToggle = () => {
    if (!isOpen) {
      const activeIndex = MENU_CATEGORIES.findIndex((c) => c.id === activeCategory);
      if (activeIndex >= 0) {
        setPage(Math.floor(activeIndex / ITEMS_PER_PAGE));
      }
    }
    setIsOpen((prev) => !prev);
  };

  const activeCategoryObj = MENU_CATEGORIES.find((c) => c.id === activeCategory);
  const activeCategoryName = activeCategoryObj
    ? t(`categories.${activeCategoryObj.id}`)
    : t('categories.select');

  const startIndex = page * ITEMS_PER_PAGE;
  const currentCategories = MENU_CATEGORIES.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="relative z-40 w-full sm:w-auto">
      <button
        onClick={handleToggle}
        className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2 font-medium bg-white text-[#1a1816] hover:bg-[#f7f2e8] border border-[#ba935a]/30 shadow-sm transition-colors text-sm"
      >
        <div className="flex items-center gap-2 text-[#ba935a]">
          <UtensilsCrossed className="w-4 h-4" />
          <span className="text-[#1a1816] font-bold">{activeCategoryName}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#ba935a] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 sm:left-auto sm:right-0 w-full sm:w-72 mt-2 bg-white border border-[#ba935a]/30 shadow-xl overflow-hidden animate-fade-in rounded-none">
          {/* Header Pagination Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#faf7f2] border-b border-[#ba935a]/20 text-xs font-semibold text-[#1a1816]">
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
                className="p-1 hover:bg-[#ba935a]/20 text-[#1a1816] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
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
                    className={`w-2 h-2 rounded-full transition-all ${
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
                className="p-1 hover:bg-[#ba935a]/20 text-[#1a1816] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Page Item List */}
          <div className="divide-y divide-gray-100">
            {currentCategories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const categoryTitle = t(`categories.${cat.id}`);
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${
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

          {/* Footer Navigation Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#faf7f2] border-t border-[#ba935a]/15 text-[11px] text-[#6e675e]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPage((p) => Math.max(0, p - 1));
              }}
              disabled={page === 0}
              className="hover:text-[#ba935a] font-bold disabled:opacity-30 disabled:hover:text-[#6e675e] transition-colors flex items-center gap-1"
            >
              <span className="inline-block">←</span>
              <span>{t('nav.prev')}</span>
            </button>
            <span className="font-semibold text-[#ba935a]">
              {formatNumber(startIndex + 1)} - {formatNumber(Math.min(startIndex + ITEMS_PER_PAGE, MENU_CATEGORIES.length))} {t('nav.of')} {formatNumber(MENU_CATEGORIES.length)}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPage((p) => Math.min(totalPages - 1, p + 1));
              }}
              disabled={page === totalPages - 1}
              className="hover:text-[#ba935a] font-bold disabled:opacity-30 disabled:hover:text-[#6e675e] transition-colors flex items-center gap-1"
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


