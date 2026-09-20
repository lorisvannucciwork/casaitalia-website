'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SITE_CONFIG } from '@/config/site';
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  TripAdvisorIcon,
} from '@/components/ui/icons';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer aria-label="Site footer" className="bg-[#faf7f2] border-t border-[#ba935a]/30 pt-16 pb-12 text-[#1a1816] relative overflow-hidden flex flex-col items-center text-center">

      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ba935a]/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10 w-full flex flex-col items-center">

        <div className="flex flex-col items-center text-center space-y-4">
          <Link href="/" aria-label="Casa Italia Ristorante - Home" className="inline-block transition-transform hover:scale-105">
            <div className="relative h-16 w-48 sm:h-20 sm:w-60">
              <Image
                src="/logo/logo-01.svg"
                alt="Casa Italia Ristorante - Authentic Italian Restaurant in Porto Ghalib"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        <nav aria-label="Social media links" className="w-full flex items-center justify-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#ba935a]/30 to-[#ba935a]/30"></div>
          <div className="flex items-center gap-3" role="list">
            <a
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              title="Follow Casa Italia on Instagram"
              aria-label="Follow Casa Italia on Instagram"
              className="w-10 h-10 bg-transparent border border-[#ba935a]/40 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={SITE_CONFIG.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              title="Follow Casa Italia on TikTok"
              aria-label="Follow Casa Italia on TikTok"
              className="w-10 h-10 bg-transparent border border-[#ba935a]/40 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
            <a
              href={SITE_CONFIG.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              title="Follow Casa Italia on Facebook"
              aria-label="Follow Casa Italia on Facebook"
              className="w-10 h-10 bg-transparent border border-[#ba935a]/40 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href={SITE_CONFIG.socials.tripadvisor}
              target="_blank"
              rel="noopener noreferrer"
              title="Read Casa Italia reviews on TripAdvisor"
              aria-label="Read Casa Italia reviews on TripAdvisor"
              className="w-10 h-10 bg-transparent border border-[#ba935a]/40 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm"
            >
              <TripAdvisorIcon className="w-4 h-4" />
            </a>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#ba935a]/30 to-[#ba935a]/30"></div>
        </nav>

        <address className="w-full flex flex-col items-center justify-center gap-6 pt-2 not-italic">
          <div className="flex flex-col items-center text-center space-y-3">
            <h4 className="font-serif font-bold text-lg text-[#ba935a] uppercase tracking-widest">
              {t('footer.location')}
            </h4>
            <div className="flex flex-col items-center gap-1">
              <a 
                href={SITE_CONFIG.socials.googleMaps} 
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
              href={SITE_CONFIG.socials.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#ba935a] font-semibold underline hover:text-[#a37f48] transition-colors mt-2"
            >
              {t('footer.openMaps')}
            </a>
          </div>
        </address>

        <nav aria-label="Legal links" className="w-full pt-8 mt-2 border-t border-[#ba935a]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c8479]">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/medal" className="hover:text-[#ba935a] transition-colors underline-offset-4 hover:underline">
              {t('nav.medal')}
            </Link>
            <Link href="/privacy" className="hover:text-[#ba935a] transition-colors underline-offset-4 hover:underline">
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="hover:text-[#ba935a] transition-colors underline-offset-4 hover:underline">
              {t('footer.terms')}
            </Link>
            <Link href="/cookies" className="hover:text-[#ba935a] transition-colors underline-offset-4 hover:underline">
              {t('footer.cookies')}
            </Link>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && window.openCookiePreferences) {
                  window.openCookiePreferences();
                }
              }}
              className="hover:text-[#ba935a] transition-colors underline-offset-4 hover:underline cursor-pointer bg-transparent border-none p-0 text-xs text-[#8c8479]"
            >
              {t('footer.cookiePreferences')}
            </button>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && window.openPwaInstallPrompt) {
                  window.openPwaInstallPrompt();
                }
              }}
              className="hover:text-[#ba935a] transition-colors underline-offset-4 hover:underline cursor-pointer bg-transparent border-none p-0 text-xs text-[#8c8479]"
            >
              {t('footer.installApp')}
            </button>
          </div>

          <p className="text-[11px] text-center sm:text-right">
            © {new Date().getFullYear()} Casa Italia Ristorante • Porto Ghalib. {t('footer.rights')}
          </p>
        </nav>

      </div>
    </footer>
  );
};
