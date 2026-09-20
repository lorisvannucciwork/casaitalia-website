import type { MenuItem, TranslatedMenuFields } from '@/types/menu';
import type { Language } from '@/types/i18n';
import { formatTitleCase, normalizeKey } from './text';
import { menuTranslationMap, italianDescriptionsMap } from '@/data/menuTranslationsMap';

export type { TranslatedMenuFields };
export { formatTitleCase };

function translateEnglishDescriptionToItalian(desc: string, italianName: string): string {
  if (!desc) return italianName;
  const clean = desc.trim();

  const italianMarkers = /\b(pomodoro|basilico|mozzarella|parmigiano|patate|olio|fresco|fresca|della|dello|degli|alle|agli|ripieni|ripiena|secondi|primi)\b/i;
  if (italianMarkers.test(clean)) {
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  const translated = clean
    .replace(/\bwith fresh\b/gi, 'con')
    .replace(/\bwith cream of\b/gi, 'con vellutata di')
    .replace(/\bwith homemade\b/gi, 'con')
    .replace(/\bserving with\b/gi, 'servito con')
    .replace(/\bcherry tomatoes\b/gi, 'pomodorini')
    .replace(/\bfresh tomato\b/gi, 'pomodoro fresco')
    .replace(/\bwood-fired pizza\b/gi, 'pizza cotta nel forno a legna')
    .replace(/\bfresh pasta\b/gi, 'pasta fresca')
    .trim();

  return translated.charAt(0).toUpperCase() + translated.slice(1);
}

export function getTranslatedMenuItem(item: MenuItem, lang: Language): TranslatedMenuFields {
  const formattedItalian = formatTitleCase(item.italianName || item.name);
  const formattedEnglish = formatTitleCase(item.name || item.italianName);

  const idKey = item.id;
  const slugKey = normalizeKey(item.id);
  const nameKey = normalizeKey(item.name);
  const italianNameKey = normalizeKey(item.italianName);

  const custom =
    menuTranslationMap[idKey]?.[lang] ||
    menuTranslationMap[slugKey]?.[lang] ||
    menuTranslationMap[nameKey]?.[lang] ||
    menuTranslationMap[italianNameKey]?.[lang];

  if (custom && custom.name && custom.description) {
    return {
      name: custom.name,
      description: custom.description,
      italianName: formattedItalian,
    };
  }

  if (lang === 'it') {
    const curatedItalian =
      italianDescriptionsMap[idKey] ||
      italianDescriptionsMap[slugKey] ||
      italianDescriptionsMap[nameKey] ||
      italianDescriptionsMap[italianNameKey];

    const itDescription = curatedItalian || translateEnglishDescriptionToItalian(item.description, formattedItalian);

    return {
      name: formattedItalian,
      description: itDescription,
      italianName: formattedItalian,
    };
  }

  return {
    name: formattedEnglish,
    description: item.description || formattedItalian,
    italianName: formattedItalian,
  };
}
