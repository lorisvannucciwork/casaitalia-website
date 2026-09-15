'use client';

import React from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface TableStatusBannerProps {
  tableNumber: string;
  onClearTable: () => void;
}

export const TableStatusBanner: React.FC<TableStatusBannerProps> = ({
  tableNumber,
  onClearTable,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white/95 backdrop-blur-md border border-[#ba935a]/50 shadow-sm max-w-md">
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-[#ba935a]/15 text-[#ba935a] flex items-center justify-center">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
        <div className="text-xs">
          <span className="font-bold text-[#1a1816]">{tableNumber}</span>
          <span className="text-[#6e675e] mx-1.5">•</span>
          <span className="text-[#ba935a] font-semibold">{t('table.seatedGuest')}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onClearTable}
        aria-label="Clear active table"
        className="p-1 text-[#6e675e] hover:text-red-500 transition-colors cursor-pointer"
        title={t('table.clear')}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
