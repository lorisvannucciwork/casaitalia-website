'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Award } from 'lucide-react';

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
    <path d="M12.001 5.385c2.32 0 4.205 1.884 4.205 4.205 0 2.32-1.885 4.205-4.205 4.205s-4.205-1.885-4.205-4.205c0-2.321 1.885-4.205 4.205-4.205zm-6.72 1.472a5.89 5.89 0 0 0-2.38 4.673c0 3.257 2.64 5.897 5.897 5.897 1.848 0 3.498-.853 4.57-2.187.355.334.743.626 1.16.868-.696 1.053-1.892 1.745-3.25 1.745-2.164 0-3.92-1.756-3.92-3.92 0-.256.026-.505.074-.746-.226-.062-.46-.098-.703-.098-1.5 0-2.716 1.216-2.716 2.716 0 .524.15 1.013.409 1.428C2.593 15.65 1.5 13.754 1.5 11.53c0-3.35 1.572-6.335 4.015-8.253a.856.856 0 0 1-.234 3.58zm13.438 0a.856.856 0 0 1-.233-3.58c2.443 1.918 4.014 4.903 4.014 8.253 0 2.224-1.093 4.12-2.948 5.712.259-.415.41-.904.41-1.428 0-1.5-1.216-2.716-2.717-2.716-.242 0-.476.036-.702.098.048.241.074.49.074.746 0 2.164-1.756 3.92-3.92 3.92-1.358 0-2.554-.692-3.25-1.745.417-.242.805-.534 1.16-.868 1.072 1.334 2.722 2.187 4.57 2.187 3.257 0 5.897-2.64 5.897-5.897a5.89 5.89 0 0 0-2.38-4.673zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-3.203 11.026a3.436 3.436 0 1 1 0-6.872 3.436 3.436 0 0 1 0 6.872zm6.406 0a3.436 3.436 0 1 1 0-6.872 3.436 3.436 0 0 1 0 6.872z" />
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
        
        {/* Brand Logo - Centered */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative h-20 w-64">
            <Image
              src="/logo/logo-01.svg"
              alt="Casa Italia Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Social Links & Review Portal */}
        <div className="flex items-center justify-center gap-4 w-full">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#ba935a]/30 to-[#ba935a]/30"></div>
          <div className="flex items-center gap-3 px-4">
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
              href="https://www.tripadvisor.com/Search?q=Casa+Italia+Porto+Ghalib"
              target="_blank"
              rel="noopener noreferrer"
              title="TripAdvisor"
              className="w-10 h-10 bg-transparent border border-[#ba935a]/40 flex items-center justify-center text-[#00aa6c] hover:bg-[#00aa6c] hover:text-white transition-colors shadow-sm"
            >
              <TripAdvisorIcon className="w-4 h-4" />
            </a>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#ba935a]/30 to-[#ba935a]/30"></div>
        </div>

        {/* Medal & Social Hub Quick Link */}
        <div>
          <Link
            href="/medal"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#ba935a]/50 text-xs font-bold uppercase tracking-widest text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-all shadow-sm"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{t('nav.medal')}</span>
          </Link>
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
