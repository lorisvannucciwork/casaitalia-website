'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Utensils, Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SITE_CONFIG } from '@/config/site';
import { LanguageSelector } from './LanguageSelector';
import {
  LuxuryVillaIcon,
  TripAdvisorIcon,
  InstagramIcon,
  TikTokIcon,
  FacebookIcon,
} from '@/components/ui/icons';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#faf7f2] py-2 sm:py-2 shadow-casa border-b border-[#ba935a]/30'
          : 'bg-[#faf7f2] py-3 sm:py-3 border-b border-[#ba935a]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 relative">

        <div className="flex items-center">
          <Link href="/" className="flex items-center group transition-transform hover:scale-105">
            <div className="relative h-8 sm:h-10 w-32 sm:w-40">
              <Image
                src="/logo/logo-01.svg"
                alt="Casa Italia Ristorante - Authentic Italian Restaurant in Porto Ghalib Marina"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <nav aria-label="Main navigation" className="flex items-center gap-6 text-sm font-bold text-[#1a1816]">
            <Link
              href="/"
              className={`transition-colors py-1 flex items-center gap-1.5 ${
                pathname === '/' ? 'text-[#ba935a]' : 'hover:text-[#ba935a]'
              }`}
            >
              <LuxuryVillaIcon className="w-4 h-4" />
              <span>{t('nav.home')}</span>
            </Link>
            <Link
              href="/menu"
              className={`transition-colors py-1 flex items-center gap-1.5 ${
                pathname === '/menu' ? 'text-[#ba935a]' : 'hover:text-[#ba935a]'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>{t('nav.menu')}</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">

          <LanguageSelector />

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            className="lg:hidden w-10 h-10 bg-[#ba935a] text-white hover:bg-[#a37f48] border border-[#ba935a] shadow-sm transition-all duration-300 group flex items-center justify-center shrink-0 cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 transition-transform duration-300 rotate-90 text-white" />
            ) : (
              <Menu className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 text-white" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-menu"
        className={`lg:hidden grid transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-[#faf7f2] border-b border-[#ba935a]/30 shadow-lg px-6 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-2 text-sm font-bold py-2 border-b border-[#ba935a]/10 transition-colors ${
                pathname === '/' ? 'text-[#ba935a]' : 'text-[#1a1816] hover:text-[#ba935a]'
              }`}
            >
              <LuxuryVillaIcon className="w-4 h-4" />
              <span>{t('nav.home')}</span>
            </Link>
            <Link
              href="/menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-2 text-sm font-bold py-2 transition-colors ${
                pathname === '/menu' ? 'text-[#ba935a]' : 'text-[#1a1816] hover:text-[#ba935a]'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>{t('nav.menu')}</span>
            </Link>

            <div className="flex items-center justify-center gap-4 pt-4 mt-2 border-t border-[#ba935a]/20">
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-white border border-[#ba935a]/30 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 bg-white border border-[#ba935a]/30 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-white border border-[#ba935a]/30 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TripAdvisor"
                title="TripAdvisor"
                className="w-9 h-9 bg-white border border-[#ba935a]/30 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm"
              >
                <TripAdvisorIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
