'use client';

import React from 'react';
import { Utensils } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';

export interface MenuEmptyStateProps {
  onResetCategory: () => void;
}

export const MenuEmptyState: React.FC<MenuEmptyStateProps> = ({ onResetCategory }) => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-white/75 backdrop-blur-md p-12 text-center space-y-6 border-2 border-white/60 shadow-[0_8px_30px_rgba(186,147,90,0.1)] max-w-lg mx-auto">
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
        <Button
          onClick={onResetCategory}
          variant="primary"
          size="md"
          className="mt-4"
        >
          {t('categories.all')}
        </Button>
      </div>
    </div>
  );
};
