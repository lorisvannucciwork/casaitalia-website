'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem } from '../data/menuData';
import { useLanguage } from '../context/LanguageContext';
import { Plus, Check } from 'lucide-react';

import { getTranslatedMenuItem } from '../utils/menuTranslations';

interface DishCardProps {
  item: MenuItem;
  onSelectDish: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ item, onSelectDish, onQuickAdd }) => {
  const [addedAnim, setAddedAnim] = useState(false);
  const { language, formatCurrency } = useLanguage();

  const translatedItem = getTranslatedMenuItem(item, language);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    onQuickAdd(item, e);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 800);
  };

  const dishImage = item.image && item.image.trim() !== '' ? item.image : null;

  return (
    <div
      onClick={() => onSelectDish(item)}
      className="group relative bg-white/70 backdrop-blur-2xl p-2.5 sm:p-3 overflow-hidden border border-white/60 shadow-lg hover:shadow-2xl hover:shadow-[#ba935a]/20 hover:border-[#ba935a]/40 transition-all duration-500 flex flex-col cursor-pointer transform hover:-translate-y-2 h-full"
    >
      {/* Top Image Container or Fallback UI */}
      <div className="relative w-full h-52 sm:h-60 bg-[#f5eedf] overflow-hidden shadow-inner shrink-0 flex items-center justify-center">
        {dishImage ? (
          <>
            <Image
              src={dishImage}
              alt={translatedItem.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-50 group-hover:opacity-40 transition-opacity" />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[url('/backgrounds/bg-2.webp')] bg-cover opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-[#f2ebda]/70" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="font-signature text-2xl text-[#ba935a]/80 group-hover:text-[#ba935a] transition-colors">
                Casa Italia
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Body Information */}
      <div className="px-2 sm:px-3 pt-4 pb-2 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Header titles */}
          <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1a1816] group-hover:text-[#ba935a] transition-colors leading-tight line-clamp-2">
            {translatedItem.name}
          </h3>

          {language !== 'it' && translatedItem.italianName && (
            <p className="text-xs text-[#ba935a] font-serif italic font-medium">
              {translatedItem.italianName}
            </p>
          )}

          <p className="text-xs sm:text-sm text-[#6e675e] line-clamp-2 leading-relaxed pt-1 font-medium">
            {translatedItem.description}
          </p>
        </div>

        {/* Dietary Badges & Quick Action Row */}
        <div className="pt-4 mt-4 border-t border-[#ba935a]/15 flex items-end justify-between gap-2">
          
          {/* Price & Tags */}
          <div className="flex flex-col gap-1.5">
            <span className="font-serif font-bold text-xl sm:text-2xl text-[#1a1816] leading-none">
              {formatCurrency(item.price)}
            </span>

          </div>

          {/* Action Buttons */}
          <button
            onClick={handleQuickAddClick}
            className={`group/btn relative overflow-hidden flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12  font-bold transition-all duration-300 shadow-md shrink-0 ${
              addedAnim
                ? 'bg-emerald-500 text-white scale-110 shadow-emerald-500/30'
                : 'bg-[#ba935a] hover:bg-[#a37f48] text-white hover:shadow-xl hover:shadow-[#ba935a]/40 hover:-translate-y-1'
            }`}
          >
            {addedAnim ? (
              <Check className="w-5 h-5 animate-in zoom-in duration-300" />
            ) : (
              <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
