'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Utensils,
  Wifi,
  Star,
  Sparkles,
  ArrowRight,
  Check,
  Copy,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TableLandingPortal() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();

  const rawParam = params?.table ? (Array.isArray(params.table) ? params.table[0] : params.table).trim().toLowerCase() : '';
  const isGeneral = rawParam === 'general' || rawParam === 'all' || rawParam === 'menu';
  const tableNum = isGeneral || !rawParam ? null : (parseInt(rawParam.replace(/\D/g, ''), 10) || 1);
  const tableFormatted = isGeneral
    ? 'General Guest Table'
    : tableNum
      ? (tableNum < 10 ? `Table 0${tableNum}` : `Table ${tableNum}`)
      : 'Table';

  // Wi-Fi Copy state
  const [wifiCopied, setWifiCopied] = useState(false);

  useEffect(() => {
    if (params?.table) {
      if (isGeneral) {
        localStorage.removeItem('casaItaliaTableNumber');
        localStorage.removeItem('casaItaliaTableNumOnly');
        localStorage.setItem('casaItaliaScannedViaQR', 'true');
      } else if (tableNum !== null) {
        const formatted = tableNum < 10 ? `Table 0${tableNum}` : `Table ${tableNum}`;
        localStorage.setItem('casaItaliaTableNumber', formatted);
        localStorage.setItem('casaItaliaTableNumOnly', String(tableNum));
        localStorage.setItem('casaItaliaScannedViaQR', 'true');
      }
    }
  }, [params?.table, isGeneral, tableNum]);

  const isIt = language === 'it';

  // Handle Copy Wi-Fi
  const handleCopyWifi = () => {
    navigator.clipboard.writeText('casaitaliaportghalib');
    setWifiCopied(true);
    setTimeout(() => setWifiCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#141210] text-[#faf7f2] flex flex-col justify-between selection:bg-[#ba935a] selection:text-white relative overflow-x-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ba935a]/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ba935a]/8 rounded-full blur-[140px]" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-lg mx-auto px-4 pt-6 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-7 w-24 sm:w-28">
            <Image
              src="/logo/logo-01.svg"
              alt="Casa Italia"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </div>

        {/* Language Switcher Button */}
        <div className="flex items-center bg-[#262320] border border-[#ba935a]/40 p-0.5 shadow-sm">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer ${language === 'en'
                ? 'bg-[#ba935a] text-[#1a1816] shadow-xs'
                : 'text-[#a8a095] hover:text-white'
              }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage('it')}
            className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer ${language === 'it'
                ? 'bg-[#ba935a] text-[#1a1816] shadow-xs'
                : 'text-[#a8a095] hover:text-white'
              }`}
          >
            IT
          </button>
        </div>
      </header>

      {/* Main Hub Content */}
      <main className="relative z-10 w-full max-w-lg mx-auto px-4 py-4 space-y-4 flex-1">

        {/* Table & Welcome Banner */}
        <div className="text-center space-y-2 pt-2 pb-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#262320] border border-[#ba935a]/60 text-xs font-bold uppercase tracking-widest text-[#ba935a] shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#ba935a]" />
            <span>{tableFormatted} • {isIt ? 'Ospite al Tavolo' : 'Seated Guest'}</span>
          </div>

          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#faf7f2] tracking-wide pt-1">
            {isIt ? 'Benvenuti a Casa Italia' : 'Welcome to Casa Italia'}
          </h1>
          <p className="text-xs text-[#a8a095] max-w-xs mx-auto leading-relaxed">
            {isIt
              ? 'Port Ghalib Marina • Seleziona un\'opzione per iniziare la tua esperienza'
              : 'Port Ghalib Marina • Select an option below to begin your dining experience'}
          </p>
        </div>

        {/* 1. PRIMARY FEATURE: Restaurant Menu */}
        <Link
          href={`/menu?table=${tableNum}`}
          className="group block relative bg-gradient-to-br from-[#2a241e] via-[#211d19] to-[#1a1714] border-2 border-[#ba935a] p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-[#dfba82] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        >
          {/* Subtle Background Shimmer / Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ba935a]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#ba935a]/20 transition-colors" />

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#ba935a] text-[#1a1816] text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{isIt ? 'Consigliato' : 'Featured'}</span>
              </div>

              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#faf7f2] group-hover:text-[#ba935a] transition-colors flex items-center gap-2">
                <span>{isIt ? 'Esplora il Menu' : 'Browse Restaurant Menu'}</span>
              </h2>

              <p className="text-xs text-[#c4b9a9] leading-relaxed pr-2">
                {isIt
                  ? 'Pasta fresca, pizze tradizionali, antipasti, secondi di carne e pesce, dolci e bevande.'
                  : 'Handmade fresh pastas, wood-fired pizzas, premium steaks, seafood, desserts & beverages.'}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ba935a] group-hover:text-[#dfba82]">
                <span>{isIt ? 'Apri il Menu' : 'Open Menu'}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#141210] border-2 border-[#ba935a] flex items-center justify-center text-[#ba935a] group-hover:scale-110 group-hover:bg-[#ba935a] group-hover:text-[#1a1816] transition-all shadow-lg shrink-0">
              <Utensils className="w-7 h-7" />
            </div>
          </div>
        </Link>

        {/* 2. SECONDARY ACTIONS GRID */}
        <div className="grid grid-cols-2 gap-3 pt-1">

          {/* Action A: Free Guest Wi-Fi */}
          <div
            onClick={handleCopyWifi}
            className="p-4 bg-[#1f1c19] hover:bg-[#282420] border border-[#ba935a]/40 hover:border-[#ba935a] transition-all text-left flex flex-col justify-between h-32 relative cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-full bg-[#2a2622] text-[#ba935a] flex items-center justify-center">
                <Wifi className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-[#ba935a] font-bold uppercase tracking-wider flex items-center gap-0.5">
                {wifiCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{wifiCopied ? 'Copied' : 'Copy'}</span>
              </span>
            </div>

            <div>
              <div className="font-serif font-bold text-sm text-[#faf7f2]">
                {isIt ? 'Wi-Fi Ospiti' : 'Guest Wi-Fi'}
              </div>
              <p className="text-[10px] text-[#a8a095] pt-0.5 font-mono">
                CasaItalia_Guest
              </p>
            </div>
          </div>

          {/* Action B: Reviews & Rating */}
          <a
            href="https://maps.google.com/?q=Casa+Italia+Port+Ghalib"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-[#1f1c19] hover:bg-[#282420] border border-[#ba935a]/40 hover:border-[#ba935a] transition-all text-left flex flex-col justify-between h-32 relative group"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-full bg-[#2a2622] text-[#ba935a] flex items-center justify-center">
                <Star className="w-4 h-4 fill-[#ba935a]" />
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#a8a095] group-hover:text-[#ba935a] transition-colors" />
            </div>

            <div>
              <div className="font-serif font-bold text-sm text-[#faf7f2]">
                {isIt ? 'Recensioni Google' : 'Google Reviews'}
              </div>
              <p className="text-[10px] text-[#a8a095] pt-0.5">
                {isIt ? 'Condividi la tua opinione' : 'Share your review with us'}
              </p>
            </div>
          </a>

        </div>

        {/* 3. Opening Hours Tile */}
        <div className="p-4 bg-[#1a1714] border border-[#ba935a]/25 text-center space-y-1">
          <div className="inline-flex items-center gap-1 text-[#ba935a] text-[10px] font-bold uppercase tracking-wider">
            <Clock className="w-3 h-3" />
            <span>{isIt ? 'Orari di Apertura' : 'Opening Hours'}</span>
          </div>
          <p className="text-xs text-[#faf7f2] font-semibold">
            {isIt ? 'Tutti i giorni dalle 09:00 alle 00:00' : 'Every Day: 09:00 AM – 12:00 AM'}
          </p>
          <p className="text-[10px] text-[#8c8479]">
            Port Ghalib Marina, Red Sea, Egypt
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-lg mx-auto px-4 py-4 text-center text-[10px] text-[#6e675e] border-t border-[#ba935a]/20">
        <p>© {new Date().getFullYear()} Casa Italia Ristorante. All rights reserved.</p>
      </footer>
    </div>
  );
}
