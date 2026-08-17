'use client';

import React, { useState, useEffect } from 'react';
import { ClipboardList, X } from 'lucide-react';
import { OrderItem } from './OrderDraftDrawer';
import { useLanguage } from '../context/LanguageContext';

interface FloatingOrderBarProps {
  items: OrderItem[];
  onOpenOrderDrawer: () => void;
}

export const FloatingOrderBar: React.FC<FloatingOrderBarProps> = ({
  items,
  onOpenOrderDrawer,
}) => {
  const { t, formatNumber, formatCurrency } = useLanguage();
  const [isHidden, setIsHidden] = useState(false);
  const prevItemsLength = React.useRef(items.length);

  // Auto re-show if new item added to cart
  useEffect(() => {
    if (items.length > prevItemsLength.current) {
      setIsHidden(false);
    }
    prevItemsLength.current = items.length;
  }, [items.length]);

  const totalItemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  if (totalItemCount === 0 || isHidden) {
    return null;
  }

  const subtotal = items.reduce((acc, curr) => acc + curr.unitPrice * curr.quantity, 0);
  const grandTotal = subtotal * 1.12; // Subtotal + 12% service charge

  const itemLabel = totalItemCount === 1 ? t('cart.item') : t('cart.items');

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg bg-[#f9f6f1]/95 backdrop-blur-md border-2 border-[#ba935a] p-3 sm:p-3.5 shadow-[0_8px_30px_rgba(186,147,90,0.2)] flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex flex-col text-start">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase text-[#6e675e] tracking-wider">
          {formatNumber(totalItemCount)} {itemLabel} • {t('cart.total')}
        </span>
        <span className="font-serif font-black text-lg sm:text-xl text-[#ba935a]">
          {formatCurrency(grandTotal)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenOrderDrawer}
          className="h-10 px-3.5 sm:px-4 bg-[#ba935a] hover:bg-[#a37f48] text-white border border-[#ba935a] font-serif text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <ClipboardList className="w-4 h-4" />
          <span>{t('cart.showOrder')}</span>
        </button>

        <button
          onClick={() => setIsHidden(true)}
          className="w-10 h-10 border border-[#ba935a]/40 bg-transparent hover:bg-red-50 text-[#6e675e] hover:text-red-500 flex items-center justify-center transition-all cursor-pointer shrink-0"
          aria-label="Hide order bar"
          title="Hide"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
