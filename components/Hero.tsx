'use client';

import React from 'react';
import Link from 'next/link';
import { Utensils } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen h-[100dvh] flex flex-col items-center justify-center pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden bg-[#1a1816]">
      {/* Background Video with Blur and Dark Luxury Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter blur-[3px] brightness-[0.75] opacity-50 sm:opacity-60"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Soft Vignette and Luxury Cream-Gold Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1816] via-[#1a1816]/60 to-[#1a1816]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(186,147,90,0.15)_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center space-y-8 my-auto">
        
        {/* Main Headline */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#faf7f2] tracking-tight leading-[1.12] drop-shadow-md">
            {t('hero.title1')}{' '}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5ca9e] via-[#ba935a] to-[#e5ca9e]">
              {t('hero.title2')}
            </span>
          </h1>
          <div className="w-20 h-[2px] bg-[#ba935a] mx-auto opacity-80" />
          <p className="text-base sm:text-xl text-[#d4cbbe] max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Interactive Hero CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto pt-2">
          <Link
            href="/menu"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-[#ba935a] hover:bg-[#a37f48] transition-all duration-300 shadow-[0_4px_25px_rgba(186,147,90,0.4)] hover:shadow-[0_6px_30px_rgba(186,147,90,0.6)] transform hover:-translate-y-0.5 uppercase tracking-wider"
          >
            <Utensils className="w-4 h-4" />
            <span>{t('hero.exploreMenu')}</span>
          </Link>
        </div>

      </div>

    </section>
  );
};
