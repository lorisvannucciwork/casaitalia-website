'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '../context/LanguageContext';
import { ChevronDown, Check } from 'lucide-react';

import { FlagIT, FlagEN } from './FlagIcons';

interface LanguageOption {
  code: Language;
  label: string;
  nativeName: string;
  FlagComponent: React.FC<{ className?: string }>;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'it', label: 'IT', nativeName: 'Italiano', FlagComponent: FlagIT },
  { code: 'en', label: 'EN', nativeName: 'English', FlagComponent: FlagEN },
];

export const LanguageSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const CurrentFlag = currentLang.FlagComponent;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
        className={`h-10 flex items-center gap-2 px-2.5 sm:px-3 bg-white/80 hover:bg-white text-[#1a1816] border border-[#ba935a]/40 shadow-sm transition-all text-xs sm:text-sm font-bold group ${
          isOpen ? 'ring-1 ring-[#ba935a]' : ''
        }`}
      >
        <CurrentFlag className="w-5 h-3.5" />
        <span className="uppercase tracking-wider">{currentLang.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#ba935a] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 mt-1.5 w-44 bg-[#faf7f2] border border-[#ba935a]/40 shadow-xl overflow-hidden animate-fade-in ${
          compact ? 'left-0' : 'right-0'
        }`}>
          <div className="py-1">
            {LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              const FlagComp = lang.FlagComponent;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-medium transition-colors text-left ${
                    isSelected
                      ? 'bg-[#ba935a] text-white font-bold'
                      : 'text-[#1a1816] hover:bg-[#f2ebda]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagComp className="w-5 h-3.5" />
                    <span>{lang.nativeName}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
