'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Utensils, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../hooks/useCart';

export default function NotFound() {
  const { t } = useLanguage();
  const { orderItems } = useCart();
  const totalItemCount = orderItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased pt-[72px]">
      <Navbar orderCount={totalItemCount} onOpenOrderDrawer={() => {}} />

      <main className="flex-1 relative w-full flex items-center justify-center py-16 sm:py-24 bg-[url('/backgrounds/bg-1.webp')] bg-cover bg-center bg-fixed">
        {/* Soft warmth overlay */}
        <div className="absolute inset-0 bg-[#faf7f2]/85 z-0" />

        <div className="relative z-10 max-w-2xl mx-auto w-full px-4 sm:px-6 text-center">
          <div className="bg-white/80 backdrop-blur-md border-2 border-[#ba935a]/30 p-8 sm:p-12 shadow-[0_20px_50px_rgba(186,147,90,0.15)] space-y-6">
            
            {/* 404 Numbers & Translated Subtitle */}
            <div className="space-y-2">
              <span className="text-6xl sm:text-8xl font-serif font-black text-[#ba935a] tracking-tight block [text-shadow:0_4px_12px_rgba(186,147,90,0.2)]">
                404
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[#6e675e] block">
                {t('notFound.subtitle')}
              </span>
            </div>

            <div className="w-16 h-[2px] bg-[#ba935a]/40 mx-auto" />

            {/* Translated Quote & Explanation */}
            <div className="space-y-3 max-w-md mx-auto">
              <p className="font-serif italic text-lg sm:text-xl text-[#1a1816]">
                {t('notFound.quote')}
              </p>
              <p className="text-xs sm:text-sm text-[#6e675e] leading-relaxed">
                {t('notFound.desc')}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#ba935a] hover:bg-[#a37f48] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Home className="w-4 h-4" />
                <span>{t('nav.home')}</span>
              </Link>
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1a1816] hover:bg-[#ba935a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Utensils className="w-4 h-4" />
                <span>{t('nav.menu')}</span>
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
