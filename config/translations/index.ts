import type { Language, TranslationsByLocale } from '@/types/i18n';
import { itTranslations } from './it';
import { enTranslations } from './en';

export const translations: TranslationsByLocale = {
  it: itTranslations,
  en: enTranslations,
};

export function getTranslation(language: Language, key: string): string {
  return translations[language]?.[key] || translations['it']?.[key] || key;
}

export { itTranslations, enTranslations };
