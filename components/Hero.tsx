'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Utensils } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly set DOM properties to satisfy desktop browser autoplay policy
    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;

    const playVideo = () => {
      if (!video) return;
      video.muted = true;
      video.volume = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was blocked on desktop; retry on any user gesture
          const handleGesture = () => {
            if (videoRef.current) {
              videoRef.current.defaultMuted = true;
              videoRef.current.muted = true;
              videoRef.current.volume = 0;
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', handleGesture);
            window.removeEventListener('scroll', handleGesture);
            window.removeEventListener('touchstart', handleGesture);
            window.removeEventListener('keydown', handleGesture);
          };

          window.addEventListener('click', handleGesture, { once: true, passive: true });
          window.addEventListener('scroll', handleGesture, { once: true, passive: true });
          window.addEventListener('touchstart', handleGesture, { once: true, passive: true });
          window.addEventListener('keydown', handleGesture, { once: true, passive: true });
        });
      }
    };

    // Immediate attempt
    playVideo();

    // Event hooks when metadata or frames become available
    video.addEventListener('loadedmetadata', playVideo, { once: true });
    video.addEventListener('loadeddata', playVideo, { once: true });
    video.addEventListener('canplay', playVideo, { once: true });
  }, []);

  return (
    <section className="relative min-h-screen h-[100dvh] flex flex-col items-center justify-center pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden bg-[#1a1816]">
      {/* Background Video with Dark Luxury Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full object-cover scale-105 sm:scale-[2.15] brightness-[0.92] opacity-80 sm:opacity-90 transition-transform duration-700"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Soft Vignette and Luxury Cream-Gold Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1816] via-[#1a1816]/40 to-[#1a1816]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(186,147,90,0.12)_0%,_transparent_70%)]" />
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
