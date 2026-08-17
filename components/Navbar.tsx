'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Utensils, Menu, X } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

const LuxuryVillaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <path d="M2 21H22" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 21V11" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 21V11" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 21V11" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 21V11" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 21V11" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 11L12 3L22 11H2Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

interface NavbarProps {
  orderCount: number;
  onOpenOrderDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  orderCount,
  onOpenOrderDrawer,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t, formatNumber } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#faf7f2] py-2 sm:py-2 shadow-casa border-b border-[#ba935a]/30'
          : 'bg-[#faf7f2] py-3 sm:py-3 border-b border-[#ba935a]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 relative">
        {/* Brand Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center group transition-transform hover:scale-105">
            <div className="relative h-8 sm:h-10 w-32 sm:w-40">
              <Image
                src="/logo/logo-01.svg"
                alt="Casa Italia"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>
        </div>

        {/* Absolute Centered Desktop Nav Links */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <nav className="flex items-center gap-6 text-sm font-bold text-[#1a1816]">
            <Link href="/" className={`transition-colors py-1 flex items-center gap-1.5 ${pathname === '/' ? 'text-[#ba935a]' : 'hover:text-[#ba935a]'}`}>
              <LuxuryVillaIcon className="w-4 h-4" />
              <span>{t('nav.home')}</span>
            </Link>
            <Link href="/menu" className={`transition-colors py-1 flex items-center gap-1.5 ${pathname === '/menu' ? 'text-[#ba935a]' : 'hover:text-[#ba935a]'}`}>
              <Utensils className="w-4 h-4" />
              <span>{t('nav.menu')}</span>
            </Link>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector Dropdown */}
          <LanguageSelector />

          {/* Order Draft Floating Basket Button */}
          <button
            onClick={onOpenOrderDrawer}
            aria-label={t('nav.cart')}
            className="relative flex items-center justify-center w-10 h-10 bg-[#ba935a] text-white hover:bg-[#a37f48] border border-[#ba935a] shadow-sm transition-all duration-300 group"
          >
            {/* Gourmet Cloche SVG Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 group-hover:scale-110 transition-transform text-white"
            >
              <circle cx="12" cy="6" r="1.5" fill="currentColor" />
              <path d="M4 16C4 11.5817 7.58172 8 12 8C16.4183 8 20 11.5817 20 16H4Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17H22" strokeWidth="2" strokeLinecap="round" />
              <path d="M5 20H19" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            </svg>
            {orderCount > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-[#d96b43] text-white text-[10px] font-bold rounded-full shadow-sm border border-white">
                {formatNumber(orderCount)}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden w-10 h-10 bg-[#ba935a] text-white hover:bg-[#a37f48] border border-[#ba935a] shadow-sm transition-all duration-300 group flex items-center justify-center shrink-0"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 transition-transform duration-300 rotate-90 text-white" />
            ) : (
              <Menu className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <div 
        className={`lg:hidden grid transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-[#faf7f2] border-b border-[#ba935a]/30 shadow-lg px-6 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-2 text-sm font-bold py-2 border-b border-[#ba935a]/10 transition-colors ${pathname === '/' ? 'text-[#ba935a]' : 'text-[#1a1816] hover:text-[#ba935a]'}`}
            >
              <LuxuryVillaIcon className="w-4 h-4" />
              <span>{t('nav.home')}</span>
            </Link>
            <Link
              href="/menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-2 text-sm font-bold py-2 transition-colors ${pathname === '/menu' ? 'text-[#ba935a]' : 'text-[#1a1816] hover:text-[#ba935a]'}`}
            >
              <Utensils className="w-4 h-4" />
              <span>{t('nav.menu')}</span>
            </Link>
            
            {/* Social Media Links */}
            <div className="flex items-center justify-center gap-6 pt-4 mt-2 border-t border-[#ba935a]/20">
              <Link href="https://www.instagram.com/casaitalia.portghalib/" target="_blank" className="w-9 h-9 bg-white border border-[#ba935a]/30 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Link>
              <Link href="https://www.facebook.com/casaitaliarestaurant/" target="_blank" className="w-9 h-9 bg-white border border-[#ba935a]/30 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Link>
              <Link href="https://www.tiktok.com/@casaitalia.eg" target="_blank" className="w-9 h-9 bg-white border border-[#ba935a]/30 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-white transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.002 6.002 0 0 0 4.917 4.917z"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>


    </header>
  );
};
