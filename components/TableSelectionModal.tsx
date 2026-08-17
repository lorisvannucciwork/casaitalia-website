'use client';

import React, { useState, useEffect } from 'react';
import { Utensils, X, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TableSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTable: (tableNum: number) => void;
}

export const TableSelectionModal: React.FC<TableSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectTable,
}) => {
  const [selectedTable, setSelectedTable] = useState<number | null>(7);
  const { t, formatNumber } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const tablesList = Array.from({ length: 20 }, (_, i) => i + 1);

  const handleConfirm = () => {
    if (selectedTable !== null) {
      onSelectTable(selectedTable);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#faf7f2] border-2 border-[#ba935a] shadow-2xl p-6 max-w-md w-full relative space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#6e675e] hover:text-[#1a1816] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full border border-[#ba935a]/40 bg-white flex items-center justify-center mx-auto text-[#ba935a]">
            <Utensils className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#1a1816]">{t('table.selectTitle')}</h3>
          <p className="text-xs text-[#6e675e]">
            {t('table.selectDesc')}
          </p>
        </div>

        {/* Table Selection Grid */}
        <div className="grid grid-cols-5 gap-2.5 max-h-48 overflow-y-auto p-2 border border-[#ba935a]/20 bg-white">
          {tablesList.map((num) => (
            <button
              key={num}
              onClick={() => setSelectedTable(num)}
              className={`p-3 text-sm font-serif font-bold transition-all border ${
                selectedTable === num
                  ? 'bg-[#ba935a] text-white border-[#ba935a] shadow-md scale-105'
                  : 'bg-[#faf7f2] text-[#1a1816] border-[#ba935a]/30 hover:border-[#ba935a]'
              }`}
            >
              {formatNumber(num < 10 ? `0${num}` : num)}
            </button>
          ))}
        </div>

        <button
          onClick={handleConfirm}
          className="w-full py-3.5 bg-[#ba935a] hover:bg-[#a37f48] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>{t('table.confirm')} {selectedTable !== null ? formatNumber(selectedTable) : ''}</span>
        </button>

      </div>
    </div>
  );
};
