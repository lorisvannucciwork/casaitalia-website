'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Utensils,
  Star,
  Clock,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { WifiCard } from './WifiCard';

export interface TablePortalCardProps {
  wifiSsid: string;
  wifiPass: string;
  wifiCopied: boolean;
  onCopyWifi: () => void;
}

export const TablePortalCard: React.FC<TablePortalCardProps> = ({
  wifiSsid,
  wifiPass,
  wifiCopied,
  onCopyWifi,
}) => {
  const { language } = useLanguage();
  const isIt = language === 'it';

  const menuHref = '/menu';
  const whatsappAssistantHref = `https://wa.me/201508300656?text=${encodeURIComponent(
    isIt
      ? 'Salve Casa Italia! Sono seduto al ristorante e desidero assistenza al tavolo.'
      : 'Hello Casa Italia! I am currently seated at the restaurant and would like some assistance.'
  )}`;

  return (
    <div className="space-y-4">

      <div className="text-center space-y-2 pt-2 pb-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#262320] border border-[#ba935a]/60 text-xs font-bold uppercase tracking-widest text-[#ba935a] shadow-lg">
          <ShieldCheck className="w-4 h-4 text-[#ba935a]" />
          <span>
            {isIt ? 'Ospite al Tavolo • Casa Italia' : 'Seated Guest • Casa Italia'}
          </span>
        </div>

        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#faf7f2] tracking-wide pt-1">
          {isIt ? 'Benvenuti a Casa Italia' : 'Welcome to Casa Italia'}
        </h1>
        <p className="text-xs text-[#a8a095] max-w-xs mx-auto leading-relaxed">
          {isIt
            ? 'Porto Ghalib Marina • Seleziona un’opzione per iniziare la tua esperienza'
            : 'Porto Ghalib Marina • Select an option below to begin your dining experience'}
        </p>
      </div>

      <Link
        href={menuHref}
        className="group block relative bg-gradient-to-br from-[#2a241e] via-[#211d19] to-[#1a1714] border-2 border-[#ba935a] p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-[#dfba82] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
      >
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

            <p className="text-xs text-[#a8a095] leading-relaxed">
              {isIt
                ? 'Pasta fresca, pizze nel forno a legna, bistecche e dessert artigianali.'
                : 'Handmade fresh pastas, wood-fired pizzas, gourmet steaks, seafood & homemade desserts.'}
            </p>

            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#ba935a] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              <span>{isIt ? 'Apri il Menu Digitale' : 'Open Digital Menu'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#ba935a]/15 border border-[#ba935a]/40 flex items-center justify-center shrink-0 text-[#ba935a] group-hover:scale-110 transition-transform">
            <Utensils className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
        </div>
      </Link>

      <WifiCard
        ssid={wifiSsid}
        pass={wifiPass}
        copied={wifiCopied}
        onCopy={onCopyWifi}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        <Link
          href="/medal"
          className="group block bg-[#1e1b18] hover:bg-[#262320] border border-[#ba935a]/30 hover:border-[#ba935a] p-4 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ba935a]/10 text-[#ba935a] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-serif font-bold text-sm text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                {isIt ? 'Recensioni & Social' : 'Reviews & Social'}
              </h3>
              <p className="text-[11px] text-[#8c8479] truncate">
                {isIt ? 'Google Maps & TripAdvisor' : 'Share your dining feedback'}
              </p>
            </div>
          </div>
        </Link>

        <a
          href={whatsappAssistantHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-[#1e1b18] hover:bg-[#262320] border border-[#25D366]/30 hover:border-[#25D366] p-4 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-serif font-bold text-sm text-[#faf7f2] group-hover:text-[#25D366] transition-colors">
                {isIt ? 'Assistenza al Tavolo' : 'Waiter Assistance'}
              </h3>
              <p className="text-[11px] text-[#8c8479] truncate">
                {isIt ? 'Invia messaggio WhatsApp' : 'Message staff directly'}
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="bg-[#141210] border border-[#ba935a]/20 p-3.5 text-[11px] text-[#8c8479] flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#ba935a] shrink-0" />
          <span>Daily 12:00 PM – 12:00 AM</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#ba935a] shrink-0" />
          <span>Porto Ghalib Marina, Red Sea</span>
        </div>
      </div>
    </div>
  );
};
