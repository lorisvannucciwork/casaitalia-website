'use client';

import React from 'react';
import { Share2, Check, MapPin, ExternalLink, Utensils } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SocialBrandIcon } from './SocialBrandIcon';

export interface MedalActionButtonsProps {
  onOpenMap: () => void;
  onShare: () => void;
  copied: boolean;
}

export const MedalActionButtons: React.FC<MedalActionButtonsProps> = ({
  onOpenMap,
  onShare,
  copied,
}) => {
  const { language } = useLanguage();
  const isIt = language === 'it';

  return (
    <div className="w-full space-y-2.5 sm:space-y-3">
      {/* 1. Google Maps Review Card */}
      <a
        href="https://maps.app.goo.gl/r6f7FfWk1uX1qYdMA"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full group relative flex items-center justify-between p-3 sm:p-3.5 bg-white hover:bg-[#faf7f2] border-2 border-[#1a73e8]/40 hover:border-[#1a73e8] transition-all duration-300 shadow-xs hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1a73e8]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <SocialBrandIcon brand="google" className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="font-serif font-bold text-sm text-[#1a1816] group-hover:text-[#1a73e8] transition-colors leading-tight">
              Google Maps
            </div>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-[#8c8479] group-hover:text-[#1a73e8] transition-colors" />
      </a>

      {/* 2. TripAdvisor Review Card */}
      <a
        href="https://www.tripadvisor.com/Restaurant_Review-g311425-d2380582-Reviews-Casa_Italia-Port_Ghalib_Marsa_Alam_Red_Sea_and_Sinai.html"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full group relative flex items-center justify-between p-3 sm:p-3.5 bg-white hover:bg-[#faf7f2] border-2 border-[#00af87]/40 hover:border-[#00af87] transition-all duration-300 shadow-xs hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00af87]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform text-[#00af87]">
            <SocialBrandIcon brand="tripadvisor" className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="font-serif font-bold text-sm text-[#1a1816] group-hover:text-[#00af87] transition-colors leading-tight">
              TripAdvisor
            </div>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-[#8c8479] group-hover:text-[#00af87] transition-colors" />
      </a>

      {/* 3. Direct WhatsApp Contact */}
      <a
        href="https://wa.me/201508300656?text=Hello%20Casa%20Italia!%20I%20would%20like%20to%20reserve%20a%20table%20or%20make%20an%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="w-full group relative flex items-center justify-between p-3 sm:p-3.5 bg-white hover:bg-[#faf7f2] border-2 border-[#25D366]/40 hover:border-[#25D366] transition-all duration-300 shadow-xs hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform text-[#25D366]">
            <SocialBrandIcon brand="whatsapp" className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="font-serif font-bold text-sm text-[#1a1816] group-hover:text-[#25D366] transition-colors leading-tight">
              WhatsApp
            </div>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-[#8c8479] group-hover:text-[#25D366] transition-colors" />
      </a>

      {/* 4. Social Row (Instagram, TikTok, Facebook) */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        <a
          href="https://www.instagram.com/casaitaliaportghalib"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2.5 bg-[#faf7f2] hover:bg-[#e1306c]/10 border border-[#ba935a]/30 hover:border-[#e1306c] transition-all duration-200 group text-[#1a1816]"
        >
          <SocialBrandIcon brand="instagram" className="w-5 h-5 text-[#ba935a] group-hover:text-[#e1306c] transition-colors" />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1">Instagram</span>
        </a>

        <a
          href="https://www.tiktok.com/@casa.italia.porto"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2.5 bg-[#faf7f2] hover:bg-black/10 border border-[#ba935a]/30 hover:border-black transition-all duration-200 group text-[#1a1816]"
        >
          <SocialBrandIcon brand="tiktok" className="w-5 h-5 text-[#ba935a] group-hover:text-black transition-colors" />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1">TikTok</span>
        </a>

        <a
          href="https://www.facebook.com/casaitaliaportghalib"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2.5 bg-[#faf7f2] hover:bg-[#1877f2]/10 border border-[#ba935a]/30 hover:border-[#1877f2] transition-all duration-200 group text-[#1a1816]"
        >
          <SocialBrandIcon brand="facebook" className="w-5 h-5 text-[#ba935a] group-hover:text-[#1877f2] transition-colors" />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1">Facebook</span>
        </a>
      </div>

      {/* 5. Bottom Navigation & Utilities */}
      <div className="flex items-center gap-2 pt-2">
        <Link
          href="/menu"
          className="flex-1 flex items-center justify-center gap-1.5 p-2.5 bg-[#ba935a] hover:bg-[#a37f48] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>{isIt ? 'Menu Digitale' : 'View Menu'}</span>
        </Link>

        <button
          type="button"
          onClick={onOpenMap}
          className="p-2.5 bg-[#faf7f2] hover:bg-[#f4efe6] text-[#ba935a] border border-[#ba935a]/30 transition-colors cursor-pointer"
          title={isIt ? 'Visualizza Mappa' : 'View Map'}
        >
          <MapPin className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onShare}
          className="p-2.5 bg-[#faf7f2] hover:bg-[#f4efe6] text-[#ba935a] border border-[#ba935a]/30 transition-colors cursor-pointer"
          title={isIt ? 'Condividi Profilo' : 'Share Profile'}
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
