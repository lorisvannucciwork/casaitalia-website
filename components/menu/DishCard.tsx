'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem } from '@/data/menuData';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslatedMenuItem } from '@/utils/menuTranslations';
import styles from './DishCard.module.css';

/** Each ticket has its own slight tilt, always the same for a dish (also on the server). */
const TILTS = [-1.3, 0.9, -0.6, 1.4, -1, 0.7];

function ticketTilt(id: string) {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  return `${TILTS[sum % TILTS.length]}deg`;
}

interface DishCardProps {
  item: MenuItem;
}

export const DishCard: React.FC<DishCardProps> = ({ item }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const { language, formatCurrency } = useLanguage();

  const translatedItem = getTranslatedMenuItem(item, language);

  const dishImage = item.image && item.image.trim() !== '' ? encodeURI(item.image.trim()) : null;

  return (
    <div
      className={`group ${styles.card}`}
      style={{ '--tilt': ticketTilt(String(item.id || translatedItem.name)) } as React.CSSProperties}
    >

      <div className={styles.photo}>

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

                <div className="relative z-10 flex flex-col items-center opacity-70">
                  <span className="font-signature text-2xl text-[#ba935a]/90 tracking-wide animate-pulse">
                    Casa Italia
                  </span>
                </div>
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
            <div className="relative z-10 flex flex-col items-center">
              <span className="font-signature text-2xl text-[#ba935a]/80 group-hover:text-[#ba935a] transition-colors">
                Casa Italia
              </span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.ticket}>
        <span className={styles.pin} aria-hidden="true" />
        <div className={styles.paper}>
          <h3 className={styles.name}>{translatedItem.name}</h3>

          {language !== 'it' && translatedItem.italianName && (
            <p className={styles.italianName}>{translatedItem.italianName}</p>
          )}

          <p className={styles.description}>{translatedItem.description}</p>

          {item.tags && item.tags.length > 0 && (
            <div className={styles.tags}>
              {item.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className={styles.foot}>
            <span className={styles.price}>{formatCurrency(item.price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
