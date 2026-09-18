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
      it: 'Memorizza la preferenza della lingua scelta (Italiano / Inglese)',
      en: 'Stores chosen language preference (IT/EN) across visits',
    },
    duration: '1 Anno',
  },
  {
    name: 'casa_italia_cookie_consent',
    purpose: {
      it: 'Memorizza lo stato del consenso privacy e preferenze cookie',
      en: 'Stores guest cookie consent status and timestamp',
    },
    duration: '6 Mesi',
  },
  {
    name: 'casa_italia_pwa_dismissed',
    purpose: {
      it: 'Memorizza temporaneamente la chiusura del banner di installazione App',
      en: 'Remembers install prompt dismissal in Local Storage',
    },
    duration: '7 Giorni (Local Storage)',
  },
  {
    name: 'casa-italia-pwa-v1',
    purpose: {
      it: 'Cache Storage locale per la consultazione del menu offline',
      en: 'Cache Storage API storing offline dining menu and brand assets',
    },
    duration: 'Fino all’aggiornamento PWA',
  },
  {
    name: '__cf_bm / cf_clearance',
    purpose: {
      it: 'Sicurezza anti-bot e mitigazione attacchi DDoS Cloudflare',
      en: 'Cloudflare edge security, rate limiting & bot mitigation',
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
