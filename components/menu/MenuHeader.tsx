'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export interface MenuHeaderProps {
  categoryTitle: string;
  dishCount: number;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({
  categoryTitle,
  dishCount,
}) => {
  const { language } = useLanguage();
  const isIt = language === 'it';
  const label =
    dishCount === 1
      ? isIt
        ? 'piatto disponibile'
        : 'dish available'
      : isIt
      ? 'piatti disponibili'
      : 'dishes available';

  return (
    <div className="border-b border-[#ba935a]/25 pb-4">
      <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-wide [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
        {categoryTitle}
      </h1>
      <p className="text-xs sm:text-sm text-[#faf7f2]/90 font-medium pt-1">
        {dishCount} {label}
      </p>
    </div>
  );
};
