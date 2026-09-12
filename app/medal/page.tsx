'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Check, 
  Utensils, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Official Vector Brand Icons
const GoogleMapsIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 92.3 132.3" fill="none">
    <path fill="#1a73e8" d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z" />
    <path fill="#ea4335" d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3-21.8-18.3z" />
    <path fill="#4285f4" d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3" />
    <path fill="#fbbc04" d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3" />
    <path fill="#34a853" d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2" />
  </svg>
);

const TripAdvisorIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z" />
  </svg>
);

const WhatsAppIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="0" ry="0" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.78 1.25-.06 2.4-1 2.6-2.24.11-.53.11-1.07.11-1.61V.02h.01z" />
  </svg>
);

const FacebookIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function MedalPage() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showMapEmbed, setShowMapEmbed] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://casaitaliarestaurants.com/medal';
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Casa Italia | Medal & Social Hub',
          text: 'Connect with Casa Italia Ristorante & Enoteca in Porto Ghalib.',
          url: url,
        });
      } catch {
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start text-[#1a1816] selection:bg-[#ba935a] selection:text-white">
      
      {/* ======================================================== */}
      {/* 1. RESTAURANT BACKGROUND IMAGE (/backgrounds/bg-2.webp) */}
      {/* ======================================================== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/backgrounds/bg-2.webp"
          alt="Casa Italia Background"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Soft elegant vignette to preserve full photo visibility */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN BRIGHT LUXURY CARD CONTAINER (SHARP EDGES) */}
      {/* ======================================================== */}
      <main className="w-full max-w-lg mx-auto px-4 py-8 sm:py-12 relative z-10 flex flex-col items-center">
        
        {/* Luminous Glassmorphic Central Card with Sharp Corners */}
        <div className="w-full bg-white/95 backdrop-blur-xl border border-[#ba935a]/40 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col items-center text-center relative overflow-hidden">
          
          {/* Subtle Golden Corner Embellishments */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ba935a]"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ba935a]"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ba935a]"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ba935a]"></div>

          {/* Logo */}
          <div className="relative h-16 w-52 sm:h-20 sm:w-60 mb-6 drop-shadow-sm">
            <Image
              src="/logo/logo-01.svg"
              alt="Casa Italia Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* ======================================================== */}
          {/* 3. SIMPLIFIED SHARP-EDGED ACTION BUTTONS & LINKS */}
          {/* ======================================================== */}
          <div className="w-full space-y-3">
            
            {/* TRIPADVISOR CARD BUTTON */}
            <a
              href="https://www.tripadvisor.com/Restaurant_Review-g311425-d33991658-Reviews-Casa_Italia_Port_Ghalib-Marsa_Alam_Red_Sea_and_Sinai.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-white hover:bg-[#f2faf5] border border-[#00aa6c]/40 hover:border-[#00aa6c] transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00aa6c] text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  <TripAdvisorIcon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-[#1a1816] group-hover:text-[#00aa6c] transition-colors block">
                  TripAdvisor Reviews
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#00aa6c] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* GOOGLE MAPS LOCATION & EXPANDABLE TOGGLE */}
            <div className="w-full bg-white border border-[#4285F4]/35 hover:border-[#4285F4] overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between p-3.5">
                <a
                  href="https://maps.app.goo.gl/HNufX8h9iE7dDJbR9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-left flex-1 group"
                >
                  <div className="w-10 h-10 bg-white border border-[#4285F4]/20 flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform p-1.5">
                    <GoogleMapsIcon className="w-5 h-6" />
                  </div>
                  <span className="text-sm font-bold text-[#1a1816] group-hover:text-[#1a73e8] transition-colors block">
                    Google Maps Location
                  </span>
                </a>

                {/* Map Toggle Preview Button */}
                <button
                  onClick={() => setShowMapEmbed(!showMapEmbed)}
                  className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1a73e8] bg-[#1a73e8]/10 hover:bg-[#1a73e8]/20 border border-[#1a73e8]/30 transition-all flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                >
                  <span>{showMapEmbed ? 'Hide' : 'Map'}</span>
                  {showMapEmbed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Collapsible Interactive Map Embed */}
              {showMapEmbed && (
                <div className="w-full h-56 bg-[#f5f1eb] border-t border-[#4285F4]/30 relative animate-fadeIn">
                  <iframe
                    title="Casa Italia Porto Ghalib Map"
                    src="https://maps.google.com/maps?q=25.5340348,34.6360475&hl=en&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>

            {/* INSTAGRAM BUTTON */}
            <a
              href="https://www.instagram.com/casaitalia.portghalib/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-white hover:bg-[#fdfaf5] border border-[#ba935a]/25 hover:border-[#f09433] transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  <InstagramIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-bold text-[#1a1816] group-hover:text-[#ba935a] transition-colors block">
                  Instagram
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#ba935a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* TIKTOK BUTTON */}
            <a
              href="https://www.tiktok.com/@casaitalia.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-white hover:bg-[#fdfaf5] border border-[#ba935a]/25 hover:border-[#1a1816] transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1a1816] text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  <TikTokIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-bold text-[#1a1816] group-hover:text-[#ba935a] transition-colors block">
                  TikTok
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#ba935a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* FACEBOOK BUTTON */}
            <a
              href="https://www.facebook.com/casaitaliarestaurant/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-white hover:bg-[#fdfaf5] border border-[#ba935a]/25 hover:border-[#1877f2] transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1877f2] text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  <FacebookIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-bold text-[#1a1816] group-hover:text-[#1877f2] transition-colors block">
                  Facebook
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#ba935a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* WHATSAPP RESERVATIONS */}
            <a
              href="https://wa.me/201000000000?text=Hello%20Casa%20Italia!%20I%20would%20like%20to%20reserve%20a%20table."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-white hover:bg-[#f3fbf6] border border-[#25d366]/40 hover:border-[#25d366] transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#25d366] text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-bold text-[#1a1816] group-hover:text-[#25d366] transition-colors block">
                  WhatsApp Reservations
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#25d366] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* DIGITAL MENU CTA */}
            <Link
              href="/menu"
              className="flex items-center justify-between p-3.5 bg-gradient-to-r from-[#ba935a] to-[#a37f48] hover:from-[#c8a165] hover:to-[#ba935a] text-white transition-all duration-300 group shadow-md hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  <Utensils className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-white block">
                  Explore Digital Menu
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>

          </div>

          {/* ======================================================== */}
          {/* 4. UTILITY ACTION (SHARE HUB) */}
          {/* ======================================================== */}
          <div className="w-full mt-6 pt-5 border-t border-[#ba935a]/25">
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-[#faf7f2] text-[#1a1816] border border-[#ba935a]/40 text-xs font-bold uppercase tracking-widest transition-all active:scale-[0.99] cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">{t('medal.copied')}</span>
                </>
              ) : (
                <span>{t('medal.shareHub')}</span>
              )}
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}
