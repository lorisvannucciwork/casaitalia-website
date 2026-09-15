'use client';

import React from 'react';
import { Category } from '@/data/menuData';
import { CategoryNav } from './CategoryNav';

export interface MenuHeaderProps {
  categoryTitle: string;
  dishCount: number;
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({
  categoryTitle,
  dishCount,
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#ba935a]/25 pb-4 gap-4">
      <div>
        <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-wide [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
          {categoryTitle}
        </h1>
        <p className="text-xs sm:text-sm text-[#faf7f2]/90 font-medium pt-1">
          {dishCount} {dishCount === 1 ? 'dish' : 'dishes'} available
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={onSelectCategory}
          categories={categories}
        />
      </div>
    </div>
  );
};
