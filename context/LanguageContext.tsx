'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, LanguageContextType } from '@/types/i18n';
import { getTranslation } from '@/config/translations';
import { fetchClientPublicSettings } from '@/lib/clientSettings';

export type { Language, LanguageContextType };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('casaItaliaLanguage') as Language;
      if (savedLang && ['it', 'en'].includes(savedLang)) {
        return savedLang;
      }
    }
    return 'it';
  });

  const [currency, setCurrencyState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedCurr = localStorage.getItem('casaItaliaCurrency');
      if (savedCurr) return savedCurr;
    }
    return '€';
  });

  useEffect(() => {
    fetchClientPublicSettings().then((settings) => {
      if (settings?.currency) {
        setCurrencyState(settings.currency);
        if (typeof window !== 'undefined') {
          localStorage.setItem('casaItaliaCurrency', settings.currency);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.setAttribute('translate', 'no');
      document.documentElement.classList.add('notranslate');
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('casaItaliaLanguage', lang);
    }
  };

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
    if (typeof window !== 'undefined') {
      localStorage.setItem('casaItaliaCurrency', curr);
    }
  };

  const formatNumber = (val: string | number): string => {
    return String(val);
  };

  const formatCurrency = (amount: number): string => {
    const num = typeof amount === 'number' ? amount : parseFloat(String(amount) || '0');
    const formatted = num.toFixed(2);
    if (currency === 'EGP' || currency === 'LE') {
      return `${formatted} EGP`;
    }
    return `${currency}${formatted}`;
  };

  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        t,
        formatNumber,
        formatCurrency,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
