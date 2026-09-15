'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export interface CookieItem {
  name: string;
  purpose: {
    it: string;
    en: string;
  };
  duration: string;
}

const DEFAULT_COOKIES: CookieItem[] = [
  {
    name: 'casaItaliaLanguage',
    purpose: {
      it: 'Memorizza la preferenza della lingua (Italiano / Inglese)',
      en: 'Stores chosen language preference (IT/EN)',
    },
    duration: '1 Anno',
  },
  {
    name: 'casa_italia_cookie_consent',
    purpose: {
      it: 'Memorizza la scelta del consenso ai cookie',
      en: 'Stores the cookie consent status',
    },
    duration: '6 Mesi',
  },
  {
    name: '__cf_bm / cf_clearance',
    purpose: {
      it: 'Sicurezza anti-bot e mitigazione DDoS Cloudflare',
      en: 'Cloudflare edge security & bot mitigation',
    },
    duration: 'Sessione / 30 min',
  },
];

export interface CookieTableProps {
  items?: CookieItem[];
  className?: string;
}

export const CookieTable: React.FC<CookieTableProps> = ({
  items = DEFAULT_COOKIES,
  className = '',
}) => {
  const { language } = useLanguage();
  const isIt = language === 'it';

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-xs text-left border border-[#ba935a]/20">
        <thead className="bg-[#faf7f2] font-serif uppercase tracking-wider text-[#1a1816]">
          <tr>
            <th className="p-2.5 border-b border-[#ba935a]/20">
              {isIt ? 'Nome' : 'Name'}
            </th>
            <th className="p-2.5 border-b border-[#ba935a]/20">
              {isIt ? 'Finalità' : 'Purpose'}
            </th>
            <th className="p-2.5 border-b border-[#ba935a]/20">
              {isIt ? 'Durata' : 'Duration'}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ba935a]/10">
          {items.map((cookie) => (
            <tr key={cookie.name}>
              <td className="p-2.5 font-mono text-[#ba935a]">{cookie.name}</td>
              <td className="p-2.5">
                {isIt ? cookie.purpose.it : cookie.purpose.en}
              </td>
              <td className="p-2.5">{cookie.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
