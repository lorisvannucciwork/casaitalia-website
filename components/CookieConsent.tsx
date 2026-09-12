'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

declare global {
  interface Window {
    openCookiePreferences?: () => void;
  }
}

export const CookieConsent: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('casa_italia_cookie_consent');
    if (!saved) {
      // Short delay for smooth slide-in without blocking initial page paint
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Expose global opener so footer / policy links can trigger it
    window.openCookiePreferences = () => {
      setIsVisible(true);
    };
    return () => {
      delete window.openCookiePreferences;
    };
  }, []);

  const handleConsent = (choice: 'all' | 'necessary') => {
    try {
      localStorage.setItem('casa_italia_cookie_consent', choice);
      localStorage.setItem('casa_italia_cookie_consent_date', new Date().toISOString());
      window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: choice }));
    } catch {
      // Ignore localStorage errors in strict private browsing
    }
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Informativa Cookie & Preferenze"
      className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-lg w-auto animate-fadeIn"
    >
      <div className="bg-white/95 backdrop-blur-xl border border-[#ba935a]/50 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] text-left relative overflow-hidden">
        
        {/* Subtle Golden Corner Markers */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#ba935a]"></div>
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#ba935a]"></div>
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#ba935a]"></div>
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#ba935a]"></div>

        {/* Top bar with Icon and Close */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#ba935a]/15 border border-[#ba935a]/30 flex items-center justify-center text-[#ba935a] shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-serif font-bold text-[#1a1816] uppercase tracking-wider">
              {t('cookie.title')}
            </h3>
          </div>

          <button
            onClick={() => handleConsent('necessary')}
            aria-label="Chiudi informativa cookie"
            className="p-1 text-[#8c8479] hover:text-[#1a1816] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description Text */}
        <p className="text-xs text-[#6e675e] leading-relaxed mb-3.5">
          {t('cookie.description')}{' '}
          <Link
            href="/cookies"
            onClick={() => setIsVisible(false)}
            className="text-[#ba935a] underline hover:text-[#8a6a3b] font-medium"
          >
            {t('cookie.policy')}
          </Link>
          .
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-1 border-t border-[#ba935a]/20">
          <button
            onClick={() => handleConsent('necessary')}
            className="px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-[#1a1816] bg-white hover:bg-[#faf7f2] border border-[#ba935a]/40 transition-all cursor-pointer text-center"
          >
            {t('cookie.essentialOnly')}
          </button>

          <button
            onClick={() => handleConsent('all')}
            className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ba935a] to-[#a37f48] hover:from-[#c8a165] hover:to-[#ba935a] shadow-sm transition-all cursor-pointer text-center"
          >
            {t('cookie.acceptAll')}
          </button>
        </div>

      </div>
    </div>
  );
};
