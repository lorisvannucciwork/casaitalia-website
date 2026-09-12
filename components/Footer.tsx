'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.002 6.002 0 0 0 4.917 4.917z"></path>
  </svg>
);

const TripAdvisorIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z" />
  </svg>
);

import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#faf7f2] border-t border-[#ba935a]/30 pt-16 pb-12 text-[#1a1816] relative overflow-hidden flex flex-col items-center text-center">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ba935a]/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10 w-full flex flex-col items-center">
        
        {/* Top Section: Brand Identity */}
        <div className="flex flex-col items-center text-center space-y-4">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <div className="relative h-16 w-48 sm:h-20 sm:w-60">
              <Image
                src="/logo/logo-01.svg"
                alt="Casa Italia"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <p className="text-sm text-[#8c8479] max-w-sm tracking-wide">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Elegant Gold Divider with Social Icons */}
        <div className="w-full flex items-center justify-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#ba935a]/30 to-[#ba935a]/30"></div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/casaitalia.portghalib/"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="w-10 h-10 bg-transparent border border-[#ba935a]/40 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.tiktok.com/@casaitalia.eg"
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok"
              className="w-10 h-10 bg-transparent border border-[#ba935a]/40 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm"
            >
              <TiktokIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/casaitaliarestaurant/"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="w-10 h-10 bg-transparent border border-[#ba935a]/40 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.tripadvisor.com/Restaurant_Review-g311425-d33991658-Reviews-Casa_Italia_Port_Ghalib-Marsa_Alam_Red_Sea_and_Sinai.html"
              target="_blank"
              rel="noopener noreferrer"
              title="TripAdvisor"
              className="w-10 h-10 bg-transparent border border-[#ba935a]/40 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm"
            >
              <TripAdvisorIcon className="w-4 h-4" />
            </a>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#ba935a]/30 to-[#ba935a]/30"></div>
        </div>

        {/* Location Area - Centered */}
        <div className="w-full flex flex-col items-center justify-center gap-6 pt-2">
          <div className="flex flex-col items-center text-center space-y-3">
            <h4 className="font-serif font-bold text-lg text-[#ba935a] uppercase tracking-widest">
              {t('footer.location')}
            </h4>
            <div className="flex flex-col items-center gap-1">
              <a 
                href="https://maps.app.goo.gl/HNufX8h9iE7dDJbR9" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-semibold text-[#1a1816] hover:text-[#ba935a] transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#ba935a]" />
                Marina, Porto Ghalib
              </a>
              <span className="text-xs text-[#6e675e]">{t('footer.address')}</span>
            </div>
            
            <a
              href="https://maps.app.goo.gl/HNufX8h9iE7dDJbR9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#ba935a] font-semibold underline hover:text-[#a37f48] transition-colors mt-2"
            >
              {t('footer.openMaps')}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
