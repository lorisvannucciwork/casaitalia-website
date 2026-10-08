'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { MenuItem } from '@/types/menu';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslatedMenuItem } from '@/utils/menuTranslations';
import { Plus, Minus } from 'lucide-react';

interface DeliveryDishCardProps {
  item: MenuItem;
  quantityInCart: number;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
}

export const DeliveryDishCard: React.FC<DeliveryDishCardProps> = ({
  item,
  quantityInCart,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const { language, formatCurrency, t } = useLanguage();

  const translatedItem = getTranslatedMenuItem(item, language);
  const dishImage = item.image && item.image.trim() !== '' ? encodeURI(item.image.trim()) : null;

  return (
    <div
      className={`group relative backdrop-blur-2xl p-2.5 sm:p-3 overflow-hidden border transition-all duration-500 flex flex-col transform hover:-translate-y-1.5 h-full shadow-lg hover:shadow-2xl hover:shadow-[#ba935a]/20 ${
        quantityInCart > 0
          ? 'border-[#ba935a] ring-1 ring-[#ba935a]/50 bg-gradient-to-b from-[#faf7f2] to-white/95'
          : 'bg-white/70 border-white/60 hover:border-[#ba935a]/40'
      }`}
    >
      {/* Top Image Container */}
      <div className="relative w-full h-52 sm:h-60 bg-[#f5eedf] overflow-hidden shadow-inner shrink-0 flex items-center justify-center group/img">
        {item.badge && (
          <div className="absolute top-2 left-2 z-20 px-2.5 py-1 bg-[#ba935a] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
            {item.badge}
          </div>
        )}

        {dishImage && !hasImageError ? (
          <>
            {!isImageLoaded && (
              <div className="absolute inset-0 z-0 bg-[#f7f2e8] flex flex-col items-center justify-center overflow-hidden select-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                <span className="font-signature text-2xl text-[#ba935a]/90 tracking-wide animate-pulse">
                  Casa Italia
                </span>
              </div>
            )}

            <Image
              src={dishImage}
              alt={translatedItem.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setHasImageError(true)}
              className={`object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out ${
                isImageLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-xs pointer-events-none'
              }`}
            />
            {isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-50 group-hover:opacity-40 transition-opacity duration-500" />
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[url('/backgrounds/bg-2.webp')] bg-cover opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-[#f2ebda]/70" />
            <span className="relative z-10 font-signature text-2xl text-[#ba935a]/80 group-hover:text-[#ba935a] transition-colors">
              Casa Italia
            </span>
          </div>
        )}
      </div>

      {/* Dish Information */}
      <div className="px-2 sm:px-3 pt-4 pb-2 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1a1816] group-hover:text-[#ba935a] transition-colors leading-tight line-clamp-2">
              {translatedItem.name}
            </h3>
            {language !== 'it' && translatedItem.italianName && (
              <p className="text-xs text-[#ba935a] font-serif italic font-medium pt-0.5">
                {translatedItem.italianName}
              </p>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#6e675e] line-clamp-2 leading-relaxed pt-1 font-medium">
            {translatedItem.description}
          </p>

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-[#faf7f2] border border-[#ba935a]/25 text-[10px] font-semibold text-[#8c6c39] tracking-wider uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Cart Action Bar */}
        <div className="pt-4 mt-4 border-t border-[#ba935a]/15 flex items-center justify-between gap-2">
          <span className="font-serif font-bold text-xl sm:text-2xl text-[#1a1816] leading-none">
            {formatCurrency(item.price)}
          </span>

          {/* Add / Quantity Control */}
          {quantityInCart === 0 ? (
            <button
              type="button"
              onClick={() => onAddToCart(item)}
              aria-label={`Add ${translatedItem.name} to delivery order`}
              title={language === 'it' ? 'Aggiungi all\'ordine' : 'Add to order'}
              className="w-8 h-8 sm:w-8.5 sm:h-8.5 bg-gradient-to-r from-[#ba935a] to-[#a37f48] hover:from-[#c8a165] hover:to-[#ba935a] text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <div className="flex items-center bg-[#faf7f2] border border-[#ba935a] shadow-xs">
              <button
                type="button"
                onClick={() => onRemoveFromCart(item)}
                aria-label={`Decrease ${translatedItem.name} quantity`}
                className="w-8 h-8 flex items-center justify-center text-[#1a1816] hover:bg-[#ba935a] hover:text-white transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-bold text-xs text-[#1a1816] select-none">
                {quantityInCart}
              </span>
              <button
                type="button"
                onClick={() => onAddToCart(item)}
                aria-label={`Increase ${translatedItem.name} quantity`}
                className="w-8 h-8 flex items-center justify-center text-[#1a1816] hover:bg-[#ba935a] hover:text-white transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
