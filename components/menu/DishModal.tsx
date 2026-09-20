'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import type { MenuItem } from '@/types/menu';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslatedMenuItem } from '@/utils/menuTranslations';
import { Clock, Flame } from 'lucide-react';

interface DishModalProps {
  dish: MenuItem | null;
  onClose: () => void;
}

const emptySubscribe = () => () => {};

export const DishModal: React.FC<DishModalProps> = ({ dish, onClose }) => {
  const isMounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false);
  const { language, formatCurrency } = useLanguage();
  const [prevDishId, setPrevDishId] = useState<string | null>(dish?.id || null);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (dish && dish.id !== prevDishId) {
    setPrevDishId(dish.id);
    setImgLoaded(false);
  }

  useEffect(() => {
    if (!dish) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dish, onClose]);

  useEffect(() => {
    if (dish) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [dish]);

  if (!dish) return null;

  const translatedItem = getTranslatedMenuItem(dish, language);
  const dishImage = dish.image && dish.image.trim() !== '' ? encodeURI(dish.image.trim()) : null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 animate-fade-in"
    >

      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer"
      />

      <div className="relative z-10 w-full max-w-lg bg-white border border-[#ba935a]/50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ba935a] z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ba935a] z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ba935a] z-20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ba935a] z-20 pointer-events-none" />

        <div className="relative w-full h-56 sm:h-64 bg-[#f5eedf] overflow-hidden shrink-0 flex items-center justify-center">
          {dish.badge && (
            <div className="absolute top-3 left-3 z-20 px-3 py-1 bg-[#ba935a] text-white text-xs font-bold uppercase tracking-wider shadow-md">
              {dish.badge}
            </div>
          )}

          {dishImage ? (
            <>
              {!imgLoaded && (
                <div className="absolute inset-0 z-0 bg-[#f7f2e8] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                  <span className="font-signature text-3xl text-[#ba935a]/80 animate-pulse">
                    Casa Italia
                  </span>
                </div>
              )}
              <Image
                src={dishImage}
                alt={translatedItem.name}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                onLoad={() => setImgLoaded(true)}
                className={`object-cover transition-all duration-500 ${
                  imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[url('/backgrounds/bg-2.webp')] bg-cover opacity-80">
              <div className="absolute inset-0 bg-[#f2ebda]/70" />
              <span className="relative z-10 font-signature text-3xl text-[#ba935a]">
                Casa Italia
              </span>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div>
            <h2
              id="dish-modal-title"
              className="font-serif font-bold text-2xl sm:text-3xl text-[#1a1816] leading-tight"
            >
              {translatedItem.name}
            </h2>
            {language !== 'it' && translatedItem.italianName && (
              <p className="text-sm text-[#ba935a] font-serif italic mt-0.5">
                {translatedItem.italianName}
              </p>
            )}
          </div>

          <p className="text-sm sm:text-base text-[#6e675e] leading-relaxed font-medium">
            {translatedItem.description}
          </p>

          {(dish.preparationTime || dish.calories) && (
            <div className="flex items-center gap-4 py-2 border-y border-[#ba935a]/15 text-xs text-[#8c6c39] font-semibold">
              {dish.preparationTime && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#ba935a]" />
                  <span>{dish.preparationTime}</span>
                </div>
              )}
              {dish.calories && (
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#ba935a]" />
                  <span>{dish.calories} kcal</span>
                </div>
              )}
            </div>
          )}

          {dish.tags && dish.tags.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider text-[#ba935a] font-bold block">
                {language === 'it' ? 'Caratteristiche' : 'Highlights'}
              </span>
              <div className="flex flex-wrap gap-2">
                {dish.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-[#faf7f2] border border-[#ba935a]/30 text-xs font-semibold text-[#8c6c39] uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {dish.pronunciation && (
            <div className="p-3 bg-[#faf7f2] border-l-2 border-[#ba935a] text-xs space-y-0.5">
              <span className="text-[10px] uppercase tracking-wider text-[#ba935a] font-bold block">
                {language === 'it' ? 'Pronuncia' : 'Pronunciation'}
              </span>
              <p className="italic text-[#1a1816] font-serif text-sm">
                &ldquo;{dish.pronunciation}&rdquo;
              </p>
            </div>
          )}

          <div className="pt-3 border-t border-[#ba935a]/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#6e675e] block">
                {language === 'it' ? 'Prezzo' : 'Price'}
              </span>
              <span className="font-serif font-bold text-2xl sm:text-3xl text-[#1a1816]">
                {formatCurrency(dish.price)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gradient-to-r from-[#ba935a] to-[#a37f48] hover:from-[#c8a165] hover:to-[#ba935a] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              {language === 'it' ? 'Chiudi' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMounted && typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};
