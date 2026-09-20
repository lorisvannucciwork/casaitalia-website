export type Language = 'it' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  t: (key: string) => string;
  formatNumber: (val: string | number) => string;
  formatCurrency: (amount: number) => string;
}

export type TranslationDictionary = Record<string, string>;
export type TranslationsByLocale = Record<Language, TranslationDictionary>;
