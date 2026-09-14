'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MENU_CATEGORIES, Category } from '../data/menuData';
import { ChevronDown, UtensilsCrossed, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  categories?: Category[];
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  categories = MENU_CATEGORIES,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useLanguage();
  const navRef = useRef<HTMLDivElement>(null);

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

  const getCategoryTitle = (cat: Category) => {
    const key = `categories.${cat.id}`;
    const trans = t(key);
    if (trans && trans !== key) return trans;
    return language === 'it' ? (cat.italianTitle || cat.name) : cat.name;
  };

  const activeCategoryObj = categories.find((c) => c.id.toLowerCase() === activeCategory.toLowerCase());
  const activeCategoryName =
    activeCategory === 'all'
      ? t('categories.all')
      : (activeCategoryObj ? getCategoryTitle(activeCategoryObj) : t('categories.select'));

  return (
    <div ref={navRef} className="relative z-40 w-full sm:w-auto">
      {/* Category Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
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

      {/* Smooth Scrollable Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 sm:left-auto sm:right-0 w-full sm:w-80 mt-2 bg-white border border-[#ba935a]/40 shadow-2xl overflow-hidden animate-fade-in z-50 rounded-none"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#faf7f2] border-b border-[#ba935a]/20 text-xs font-bold text-[#6e675e] uppercase tracking-wider">
            <span>{t('categories.select')}</span>
            <span className="text-[10px] text-[#ba935a] bg-[#ba935a]/10 px-2 py-0.5 font-mono">
              {categories.length + 1}
            </span>
          </div>

          {/* Scrollable Category Options List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-[#ba935a]/10 overscroll-contain">
            {/* 1. All Dishes Option */}
            <button
              type="button"
              role="option"
              aria-selected={activeCategory === 'all'}
              onClick={() => {
                onSelectCategory('all');
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-all flex items-center justify-between cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#ba935a] text-white font-bold shadow-xs'
                  : 'text-[#1a1816] hover:bg-[#f7f2e8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className={`w-4 h-4 ${activeCategory === 'all' ? 'text-white' : 'text-[#ba935a]'}`} />
                <span>{t('categories.all')}</span>
              </div>
              {activeCategory === 'all' && <Check className="w-4 h-4 text-white shrink-0" />}
            </button>

            {/* 2. Specific Categories */}
            {categories.map((cat) => {
              const isSelected = activeCategory.toLowerCase() === cat.id.toLowerCase();
              const categoryTitle = getCategoryTitle(cat);

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#ba935a] text-white font-bold shadow-xs'
                      : 'text-[#1a1816] hover:bg-[#f7f2e8]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{categoryTitle}</span>
                    {cat.description && (
                      <span
                        className={`text-[11px] truncate max-w-[220px] ${
                          isSelected ? 'text-white/80' : 'text-[#8c8479]'
                        }`}
                      >
                        {cat.description}
                      </span>
                    )}
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
