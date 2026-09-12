'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  Share2, 
  Download, 
  Check, 
  ExternalLink, 
  Navigation, 
  Utensils, 
  Phone, 
  Award, 
  Star, 
  MessageCircle,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Vector Brand Icons
const TripAdvisorIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    {/* TripAdvisor Owl Icon */}
    <path d="M12.001 5.385c2.32 0 4.205 1.884 4.205 4.205 0 2.32-1.885 4.205-4.205 4.205s-4.205-1.885-4.205-4.205c0-2.321 1.885-4.205 4.205-4.205zm-6.72 1.472a5.89 5.89 0 0 0-2.38 4.673c0 3.257 2.64 5.897 5.897 5.897 1.848 0 3.498-.853 4.57-2.187.355.334.743.626 1.16.868-.696 1.053-1.892 1.745-3.25 1.745-2.164 0-3.92-1.756-3.92-3.92 0-.256.026-.505.074-.746-.226-.062-.46-.098-.703-.098-1.5 0-2.716 1.216-2.716 2.716 0 .524.15 1.013.409 1.428C2.593 15.65 1.5 13.754 1.5 11.53c0-3.35 1.572-6.335 4.015-8.253a.856.856 0 0 1-.234 3.58zm13.438 0a.856.856 0 0 1-.233-3.58c2.443 1.918 4.014 4.903 4.014 8.253 0 2.224-1.093 4.12-2.948 5.712.259-.415.41-.904.41-1.428 0-1.5-1.216-2.716-2.717-2.716-.242 0-.476.036-.702.098.048.241.074.49.074.746 0 2.164-1.756 3.92-3.92 3.92-1.358 0-2.554-.692-3.25-1.745.417-.242.805-.534 1.16-.868 1.072 1.334 2.722 2.187 4.57 2.187 3.257 0 5.897-2.64 5.897-5.897a5.89 5.89 0 0 0-2.38-4.673zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-3.203 11.026a3.436 3.436 0 1 1 0-6.872 3.436 3.436 0 0 1 0 6.872zm6.406 0a3.436 3.436 0 1 1 0-6.872 3.436 3.436 0 0 1 0 6.872z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
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

const GoogleMapsIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const LaurelWreathLeft = () => (
  <svg className="w-8 h-12 text-[#ba935a] opacity-80" viewBox="0 0 24 36" fill="currentColor">
    <path d="M18 4C14 8 10 14 10 20C10 26 13 31 18 34C15 32 8 26 8 20C8 13 14 6 18 4Z" />
    <path d="M14 6C10 9 6 13 6 17C6 19 8 21 11 20C8 19 8 16 9 13C10 10 13 8 14 6Z" opacity="0.8" />
    <path d="M16 14C12 17 8 21 8 25C8 27 10 29 13 28C10 27 10 24 11 21C12 18 15 16 16 14Z" opacity="0.7" />
  </svg>
);

const LaurelWreathRight = () => (
  <svg className="w-8 h-12 text-[#ba935a] opacity-80 scale-x-[-1]" viewBox="0 0 24 36" fill="currentColor">
    <path d="M18 4C14 8 10 14 10 20C10 26 13 31 18 34C15 32 8 26 8 20C8 13 14 6 18 4Z" />
    <path d="M14 6C10 9 6 13 6 17C6 19 8 21 11 20C8 19 8 16 9 13C10 10 13 8 14 6Z" opacity="0.8" />
    <path d="M16 14C12 17 8 21 8 25C8 27 10 29 13 28C10 27 10 24 11 21C12 18 15 16 16 14Z" opacity="0.7" />
  </svg>
);

export default function MedalPage() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

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
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadVCard = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Casa Italia Port Ghalib
ORG:Casa Italia Ristorante & Enoteca Autentica
TITLE:Authentic Italian Restaurant & Bar
NOTE:Handmade Fresh Pasta, Live Italian Cooking & Waterfront Marina Dining in Port Ghalib.
ADR;TYPE=WORK:;;Marina Promenade;Porto Ghalib;Red Sea Governorate;;Egypt
TEL;TYPE=WORK,VOICE:+201000000000
URL:https://casaitaliarestaurants.com
X-SOCIALPROFILE;type=instagram:https://instagram.com/casaitalia.portghalib
X-SOCIALPROFILE;type=tiktok:https://tiktok.com/@casaitalia.eg
X-SOCIALPROFILE;type=facebook:https://facebook.com/casaitaliarestaurant
X-SOCIALPROFILE;type=tripadvisor:https://www.tripadvisor.com/Search?q=Casa+Italia+Porto+Ghalib
GEO:25.5340348;34.6360475
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'casa_italia_contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#141210] text-[#faf7f2] flex flex-col items-center justify-start relative overflow-x-hidden selection:bg-[#ba935a] selection:text-[#1a1816]">
      
      {/* Ambient Lighting & Glow Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-[#ba935a]/15 via-[#ba935a]/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#00aa6c]/5 blur-[120px] pointer-events-none" />
      <div className="fixed top-1/3 left-0 w-80 h-80 bg-[#dc2743]/5 blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 relative z-10 flex flex-col items-center">
        
        {/* ======================================================== */}
        {/* 1. HERO SECTION & 3D GOLDEN MEDAL SEAL */}
        {/* ======================================================== */}
        <section className="w-full flex flex-col items-center text-center mb-12 sm:mb-16">
          
          {/* Brand Logo */}
          <div className="relative h-16 w-56 sm:h-20 sm:w-64 mb-6 drop-shadow-md">
            <Image
              src="/logo/logo-01.svg"
              alt="Casa Italia Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Official Badge Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ba935a]/15 border border-[#ba935a]/40 backdrop-blur-sm mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e5cf9f] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#e5cf9f]">
              {t('medal.badge')}
            </span>
          </div>

          {/* 3D LUXURY GOLDEN MEDAL EMBLEM */}
          <div className="relative my-4 flex items-center justify-center">
            {/* Ambient Medal Glow */}
            <div className="absolute inset-0 w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#ba935a]/30 blur-2xl animate-pulse" />

            {/* Medal Crest Outer Ring */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-[3px] bg-gradient-to-tr from-[#7a5823] via-[#e8d5a7] to-[#ba935a] shadow-[0_10px_35px_rgba(186,147,90,0.35)] flex items-center justify-center">
              
              {/* Medal Middle Grooved Rim */}
              <div className="w-full h-full rounded-full p-2 bg-gradient-to-b from-[#2a241c] via-[#1a1714] to-[#12100e] border border-[#ba935a]/50 flex items-center justify-center relative overflow-hidden">
                
                {/* Shimmer Light Reflection */}
                <div className="absolute -top-10 -left-10 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none transform -rotate-45" />

                {/* Inner Beveled Medal Core */}
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#1e1b17] via-[#2d2822] to-[#1a1714] border-2 border-[#ba935a]/60 flex flex-col items-center justify-center p-3 relative shadow-inner">
                  
                  {/* Roman Laurel Wreaths framing the insignia */}
                  <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                    <LaurelWreathLeft />
                    <LaurelWreathRight />
                  </div>

                  {/* Italian Tricolore Ribbon Micro Accent */}
                  <div className="flex items-center gap-1 mb-1.5 opacity-90">
                    <span className="w-2.5 h-1 bg-[#009246] rounded-full"></span>
                    <span className="w-2.5 h-1 bg-[#ffffff] rounded-full"></span>
                    <span className="w-2.5 h-1 bg-[#ce2b37] rounded-full"></span>
                  </div>

                  {/* Gold Monogram Crest */}
                  <span className="font-serif font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff2cc] via-[#e5cf9f] to-[#ba935a] tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    CI
                  </span>

                  {/* Medal Inscription */}
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#ba935a] uppercase tracking-[0.25em] mt-1 drop-shadow">
                    Porto Ghalib
                  </span>
                  <span className="text-[8px] font-semibold text-[#a89f91] uppercase tracking-widest">
                    Eccellenza
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Heading and Subtitle */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#faf7f2] tracking-wide mt-6 mb-3">
            {t('medal.heroTitle1')}{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#ba935a] via-[#e5cf9f] to-[#ba935a]">
              {t('medal.heroTitle2')}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#c4bcaf] max-w-2xl mx-auto leading-relaxed mb-8 px-2 font-light">
            {t('medal.heroSubtitle')}
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
            <button
              onClick={handleDownloadVCard}
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#ba935a] to-[#a37f48] hover:from-[#c8a165] hover:to-[#ba935a] text-[#141210] font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer rounded-sm"
            >
              <Download className="w-4 h-4" />
              <span>{t('medal.saveContact')}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 bg-[#1e1b18] hover:bg-[#2a2622] text-[#faf7f2] border border-[#ba935a]/50 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer rounded-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">{t('medal.copied')}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#ba935a]" />
                  <span>{t('medal.shareHub')}</span>
                </>
              )}
            </button>

            <Link
              href="/menu"
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 bg-[#26221d]/80 hover:bg-[#342f28] text-[#e5cf9f] border border-[#ba935a]/30 font-bold text-xs uppercase tracking-wider transition-all rounded-sm"
            >
              <Utensils className="w-3.5 h-3.5 text-[#ba935a]" />
              <span>{t('medal.viewMenuCta')}</span>
            </Link>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. TRIPADVISOR SHOWCASE & REVIEW PORTAL */}
        {/* ======================================================== */}
        <section className="w-full mb-14">
          <div className="w-full bg-gradient-to-br from-[#1a1e1b] via-[#1a1816] to-[#161513] border-2 border-[#00aa6c]/50 p-6 sm:p-8 rounded-sm relative overflow-hidden shadow-2xl">
            
            {/* Top Green Ambient Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00aa6c]/10 blur-3xl pointer-events-none" />

            {/* Corner Decorative Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00aa6c]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00aa6c]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00aa6c]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00aa6c]"></div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
              
              {/* Left Column: Branding, Rating & Badge */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
                
                {/* TripAdvisor Header Bar */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#00aa6c] text-white flex items-center justify-center shadow-lg shadow-[#00aa6c]/30">
                    <TripAdvisorIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#00aa6c] uppercase tracking-[0.2em] block">
                      TripAdvisor Official
                    </span>
                    <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#faf7f2]">
                      Casa Italia Porto Ghalib
                    </h2>
                  </div>
                </div>

                {/* Rating Display */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                  {/* 5 TripAdvisor Green Circles */}
                  <div className="flex items-center gap-1.5 bg-[#00aa6c]/15 px-3 py-1.5 rounded-full border border-[#00aa6c]/40">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-3.5 h-3.5 rounded-full bg-[#00aa6c] flex items-center justify-center shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-black text-white ml-1">5.0</span>
                  </div>

                  <span className="text-xs font-semibold text-[#00aa6c] uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    {t('medal.tripadvisorBadge')}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#b5ada0] max-w-lg leading-relaxed pt-1">
                  {t('medal.tripadvisorSubtitle')}
                </p>

                {/* Review Highlight Chips */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                  <span className="text-[11px] px-2.5 py-1 bg-[#262320] border border-[#ba935a]/30 text-[#e5cf9f] rounded-full">
                    🍝 Authentic Handmade Pasta
                  </span>
                  <span className="text-[11px] px-2.5 py-1 bg-[#262320] border border-[#ba935a]/30 text-[#e5cf9f] rounded-full">
                    🍷 Fine Italian Wine Selection
                  </span>
                  <span className="text-[11px] px-2.5 py-1 bg-[#262320] border border-[#ba935a]/30 text-[#e5cf9f] rounded-full">
                    ⚓ Waterfront Marina Views
                  </span>
                </div>
              </div>

              {/* Right Column: CTA Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 w-full lg:w-auto shrink-0">
                <a
                  href="https://www.tripadvisor.com/Search?q=Casa+Italia+Porto+Ghalib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto lg:w-64 flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#00aa6c] hover:bg-[#008f5a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-[#00aa6c]/30 rounded-sm active:scale-95"
                >
                  <Star className="w-4 h-4 fill-white" />
                  <span>{t('medal.tripadvisorCta')}</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
                </a>

                <a
                  href="https://www.tripadvisor.com/Search?q=Casa+Italia+Porto+Ghalib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto lg:w-64 flex items-center justify-center gap-2 py-3 px-4 bg-[#23201d] hover:bg-[#2f2b26] text-[#faf7f2] border border-[#ba935a]/40 font-bold text-xs uppercase tracking-wider transition-all rounded-sm text-center"
                >
                  <TripAdvisorIcon className="w-4 h-4 text-[#00aa6c]" />
                  <span>{t('medal.tripadvisorExplore')}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. OFFICIAL SOCIAL MEDIA CHANNELS */}
        {/* ======================================================== */}
        <section className="w-full mb-14">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#ba935a]"></div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ba935a]">
                {t('medal.socialsHeading')}
              </span>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#ba935a]"></div>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf7f2]">
              Connect With Casa Italia
            </h2>
            <p className="text-xs sm:text-sm text-[#a89f91] max-w-lg mx-auto mt-2">
              {t('medal.socialsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            
            {/* INSTAGRAM CARD */}
            <a
              href="https://www.instagram.com/casaitalia.portghalib/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#1b1916] hover:bg-[#23201c] border border-[#ba935a]/30 hover:border-[#ba935a] p-6 rounded-sm transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-bl from-[#f09433]/20 via-[#dc2743]/15 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <InstagramIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-[#ba935a]/10 border border-[#ba935a]/30 text-[#ba935a] rounded-sm">
                    Official
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                  Instagram
                </h3>
                <p className="text-xs text-[#ba935a] font-mono mt-0.5 mb-3 font-semibold">
                  @casaitalia.portghalib
                </p>
                <p className="text-xs text-[#a89f91] leading-relaxed">
                  Fresh homemade pasta reels, daily catch updates, and sunset moments at Porto Ghalib Marina.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ba935a]/20 flex items-center justify-between text-xs font-bold text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                <span>{t('medal.followOn')} Instagram</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#ba935a]" />
              </div>
            </a>

            {/* TIKTOK CARD */}
            <a
              href="https://www.tiktok.com/@casaitalia.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#1b1916] hover:bg-[#23201c] border border-[#ba935a]/30 hover:border-[#ba935a] p-6 rounded-sm transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-bl from-cyan-500/15 via-pink-500/15 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/20 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <TikTokIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-[#ba935a]/10 border border-[#ba935a]/30 text-[#ba935a] rounded-sm">
                    Trending
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                  TikTok
                </h3>
                <p className="text-xs text-[#ba935a] font-mono mt-0.5 mb-3 font-semibold">
                  @casaitalia.eg
                </p>
                <p className="text-xs text-[#a89f91] leading-relaxed">
                  Live pasta making, chef kitchen secrets, flambé specials, and vibrant hospitality vibes.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ba935a]/20 flex items-center justify-between text-xs font-bold text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                <span>{t('medal.followOn')} TikTok</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#ba935a]" />
              </div>
            </a>

            {/* FACEBOOK CARD */}
            <a
              href="https://www.facebook.com/casaitaliarestaurant/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#1b1916] hover:bg-[#23201c] border border-[#ba935a]/30 hover:border-[#ba935a] p-6 rounded-sm transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#1877f2]/15 rounded-full blur-xl group-hover:scale-125 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1877f2] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <FacebookIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-[#ba935a]/10 border border-[#ba935a]/30 text-[#ba935a] rounded-sm">
                    Community
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                  Facebook
                </h3>
                <p className="text-xs text-[#ba935a] font-mono mt-0.5 mb-3 font-semibold">
                  @casaitaliarestaurant
                </p>
                <p className="text-xs text-[#a89f91] leading-relaxed">
                  Community events, guest photos, seasonal menus, and official announcements.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ba935a]/20 flex items-center justify-between text-xs font-bold text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                <span>{t('medal.followOn')} Facebook</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#ba935a]" />
              </div>
            </a>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. INTERACTIVE GOOGLE MAPS & MARINA DIRECTIONS */}
        {/* ======================================================== */}
        <section className="w-full mb-14">
          <div className="w-full bg-[#1b1916] border border-[#ba935a]/40 rounded-sm overflow-hidden shadow-2xl">
            
            {/* Maps Header Bar */}
            <div className="p-6 sm:p-8 border-b border-[#ba935a]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-1.5">
                  <MapPin className="w-4 h-4 text-[#ba935a]" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ba935a]">
                    {t('medal.mapsHeading')}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#faf7f2]">
                  Marina, Porto Ghalib
                </h3>
                <p className="text-xs text-[#a89f91] mt-1">
                  Red Sea Governorate, Egypt • Waterfront Dining Promenade
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://maps.app.goo.gl/HNufX8h9iE7dDJbR9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#ba935a] hover:bg-[#a37f48] text-[#141210] font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 rounded-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t('medal.openInMaps')}</span>
                </a>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=25.5340348,34.6360475"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#26221d] hover:bg-[#342f28] text-[#faf7f2] border border-[#ba935a]/40 font-bold text-xs uppercase tracking-wider transition-all rounded-sm"
                >
                  <Compass className="w-3.5 h-3.5 text-[#ba935a]" />
                  <span>{t('medal.getDirections')}</span>
                </a>
              </div>
            </div>

            {/* Embedded Interactive Google Map */}
            <div className="w-full h-80 sm:h-96 relative bg-[#12100e]">
              <iframe
                title="Casa Italia Port Ghalib Google Maps"
                src="https://maps.google.com/maps?q=25.5340348,34.6360475&hl=en&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              
              {/* Floating Coordinates Badge */}
              <div className="absolute bottom-3 left-3 bg-[#141210]/90 border border-[#ba935a]/40 backdrop-blur-md px-3 py-1.5 rounded-sm text-[10px] font-mono text-[#e5cf9f] shadow-lg hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>25°32&apos;02.5&quot;N 34°38&apos;09.8&quot;E</span>
              </div>
            </div>

            {/* Location Highlights Footer */}
            <div className="p-4 sm:p-6 bg-[#161412] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border-t border-[#ba935a]/20">
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-[#ba935a] uppercase tracking-wider mb-0.5">Atmosphere</span>
                <span className="text-xs text-[#faf7f2]">Marina Waterfront Dining</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-[#ba935a] uppercase tracking-wider mb-0.5">Access</span>
                <span className="text-xs text-[#faf7f2]">Main Promenade, Port Ghalib</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-[#ba935a] uppercase tracking-wider mb-0.5">Experience</span>
                <span className="text-xs text-[#faf7f2]">Outdoor Seating & Sunset Views</span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. DIRECT CONCIERGE & INSTANT RESERVATIONS */}
        {/* ======================================================== */}
        <section className="w-full">
          <div className="w-full bg-gradient-to-r from-[#1c1814] via-[#241f1a] to-[#1c1814] border-t-2 border-b-2 border-[#ba935a] p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
            
            <span className="text-[11px] font-bold text-[#ba935a] uppercase tracking-[0.25em] mb-2 block">
              {t('medal.conciergeTitle')}
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#faf7f2] mb-3">
              Reserve Your Table at Port Ghalib
            </h3>
            <p className="text-xs sm:text-sm text-[#b5ada0] max-w-xl mx-auto mb-6">
              {t('medal.conciergeSubtitle')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/201000000000?text=Hello%20Casa%20Italia!%20I%20would%20like%20to%20reserve%20a%20table."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-5 bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 rounded-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('medal.whatsappCta')}</span>
              </a>

              <Link
                href="/menu"
                className="flex items-center justify-center gap-2 py-3 px-5 bg-[#ba935a] hover:bg-[#a37f48] text-[#141210] font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 rounded-sm"
              >
                <Utensils className="w-4 h-4" />
                <span>{t('medal.viewMenuCta')}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Copyright Stamp */}
        <div className="mt-12 text-center text-[10px] text-[#6e675e] tracking-widest uppercase flex items-center justify-center gap-2">
          <span>&copy; {new Date().getFullYear()} Casa Italia Ristorante &amp; Enoteca</span>
          <span>•</span>
          <span>Porto Ghalib</span>
        </div>

      </main>
    </div>
  );
}
