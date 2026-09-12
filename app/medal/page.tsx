'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  Share2, 
  Download, 
  Check, 
  ExternalLink, 
  Utensils, 
  Award, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  Star
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Vector Brand Icons
const TripAdvisorIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001 5.385c2.32 0 4.205 1.884 4.205 4.205 0 2.32-1.885 4.205-4.205 4.205s-4.205-1.885-4.205-4.205c0-2.321 1.885-4.205 4.205-4.205zm-6.72 1.472a5.89 5.89 0 0 0-2.38 4.673c0 3.257 2.64 5.897 5.897 5.897 1.848 0 3.498-.853 4.57-2.187.355.334.743.626 1.16.868-.696 1.053-1.892 1.745-3.25 1.745-2.164 0-3.92-1.756-3.92-3.92 0-.256.026-.505.074-.746-.226-.062-.46-.098-.703-.098-1.5 0-2.716 1.216-2.716 2.716 0 .524.15 1.013.409 1.428C2.593 15.65 1.5 13.754 1.5 11.53c0-3.35 1.572-6.335 4.015-8.253a.856.856 0 0 1-.234 3.58zm13.438 0a.856.856 0 0 1-.233-3.58c2.443 1.918 4.014 4.903 4.014 8.253 0 2.224-1.093 4.12-2.948 5.712.259-.415.41-.904.41-1.428 0-1.5-1.216-2.716-2.717-2.716-.242 0-.476.036-.702.098.048.241.074.49.074.746 0 2.164-1.756 3.92-3.92 3.92-1.358 0-2.554-.692-3.25-1.745.417-.242.805-.534 1.16-.868 1.072 1.334 2.722 2.187 4.57 2.187 3.257 0 5.897-2.64 5.897-5.897a5.89 5.89 0 0 0-2.38-4.673zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-3.203 11.026a3.436 3.436 0 1 1 0-6.872 3.436 3.436 0 0 1 0 6.872zm6.406 0a3.436 3.436 0 1 1 0-6.872 3.436 3.436 0 0 1 0 6.872z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
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

const LaurelLeft = () => (
  <svg className="w-5 h-8 text-[#ba935a] opacity-80" viewBox="0 0 24 36" fill="currentColor">
    <path d="M18 4C14 8 10 14 10 20C10 26 13 31 18 34C15 32 8 26 8 20C8 13 14 6 18 4Z" />
    <path d="M14 6C10 9 6 13 6 17C6 19 8 21 11 20C8 19 8 16 9 13C10 10 13 8 14 6Z" opacity="0.8" />
  </svg>
);

const LaurelRight = () => (
  <svg className="w-5 h-8 text-[#ba935a] opacity-80 scale-x-[-1]" viewBox="0 0 24 36" fill="currentColor">
    <path d="M18 4C14 8 10 14 10 20C10 26 13 31 18 34C15 32 8 26 8 20C8 13 14 6 18 4Z" />
    <path d="M14 6C10 9 6 13 6 17C6 19 8 21 11 20C8 19 8 16 9 13C10 10 13 8 14 6Z" opacity="0.8" />
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

  const handleDownloadVCard = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Casa Italia Port Ghalib
ORG:Casa Italia Ristorante & Enoteca Autentica
TITLE:Authentic Italian Dining & Bar
NOTE:Handmade Fresh Pasta & Waterfront Dining in Port Ghalib.
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
    <div className="min-h-screen relative flex flex-col items-center justify-start text-[#faf7f2] selection:bg-[#ba935a] selection:text-[#141210]">
      
      {/* ======================================================== */}
      {/* 1. LUXURY BACKGROUND IMAGE (/backgrounds/bg-2.webp) */}
      {/* ======================================================== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/backgrounds/bg-2.webp"
          alt="Casa Italia Background"
          fill
          priority
          className="object-cover object-center scale-105 filter brightness-[0.38] contrast-[1.05]"
        />
        {/* Soft dark vignette & warm golden ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141210]/85 via-[#141210]/65 to-[#141210]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(186,147,90,0.18)_0%,_transparent_70%)]" />
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN STREAMLINED LUXURY CARD CONTAINER */}
      {/* ======================================================== */}
      <main className="w-full max-w-lg mx-auto px-4 py-8 sm:py-12 relative z-10 flex flex-col items-center">
        
        {/* Glassmorphic Central Card */}
        <div className="w-full bg-[#181614]/85 backdrop-blur-xl border border-[#ba935a]/35 rounded-2xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.7)] flex flex-col items-center text-center relative overflow-hidden">
          
          {/* Subtle Golden Corner Embellishments */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ba935a]"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ba935a]"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ba935a]"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ba935a]"></div>

          {/* Logo */}
          <div className="relative h-14 w-48 mb-4 drop-shadow-md">
            <Image
              src="/logo/logo-01.svg"
              alt="Casa Italia Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Golden Medal Emblem */}
          <div className="relative my-2 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#7a5823] via-[#e8d5a7] to-[#ba935a] shadow-lg flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#241f19] to-[#12100e] border border-[#ba935a]/40 flex flex-col items-center justify-center relative p-1">
                <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
                  <LaurelLeft />
                  <LaurelRight />
                </div>
                <span className="font-serif font-black text-xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff2cc] to-[#ba935a] tracking-wider drop-shadow">
                  CI
                </span>
                <span className="text-[7px] font-bold text-[#ba935a] uppercase tracking-widest mt-0.5">
                  Porto Ghalib
                </span>
              </div>
            </div>
          </div>

          {/* Official Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ba935a]/15 border border-[#ba935a]/30 mt-2 mb-2">
            <Sparkles className="w-3 h-3 text-[#e5cf9f]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5cf9f]">
              {t('medal.badge')}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#faf7f2] tracking-wide mt-1 mb-1">
            Casa Italia Ristorante
          </h1>
          <p className="text-xs text-[#a89f91] mb-6 font-light">
            Marina, Porto Ghalib • Authentic Italian Dining &amp; Enoteca
          </p>

          {/* ======================================================== */}
          {/* 3. SIMPLIFIED ACTION BUTTONS & LINKS */}
          {/* ======================================================== */}
          <div className="w-full space-y-3">
            
            {/* TRIPADVISOR CARD BUTTON */}
            <a
              href="https://www.tripadvisor.com/Search?q=Casa+Italia+Porto+Ghalib"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-[#1f1d19]/90 hover:bg-[#25221d] border border-[#00aa6c]/50 hover:border-[#00aa6c] rounded-xl transition-all duration-300 group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#00aa6c] text-white flex items-center justify-center shadow-md shrink-0">
                  <TripAdvisorIcon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#00aa6c] transition-colors">
                      TripAdvisor Reviews
                    </span>
                    <span className="text-[10px] font-black text-[#00aa6c] bg-[#00aa6c]/15 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-[#00aa6c]" /> 5.0
                    </span>
                  </div>
                  <span className="text-[11px] text-[#a89f91] block">
                    Travelers&apos; Choice • Leave a Review
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#00aa6c] shrink-0 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </a>

            {/* GOOGLE MAPS LOCATION & EXPANDABLE TOGGLE */}
            <div className="w-full bg-[#1f1d19]/90 border border-[#ba935a]/40 rounded-xl overflow-hidden shadow-md transition-all">
              <div className="flex items-center justify-between p-3.5">
                <a
                  href="https://maps.app.goo.gl/HNufX8h9iE7dDJbR9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-left flex-1 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#ba935a] text-[#141210] flex items-center justify-center shadow-md shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#ba935a] transition-colors flex items-center gap-1">
                      Google Maps Location
                      <ExternalLink className="w-3 h-3 text-[#ba935a]" />
                    </span>
                    <span className="text-[11px] text-[#a89f91] block">
                      Marina, Porto Ghalib (Open in Maps)
                    </span>
                  </div>
                </a>

                {/* Map Toggle Preview Button */}
                <button
                  onClick={() => setShowMapEmbed(!showMapEmbed)}
                  className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#e5cf9f] bg-[#ba935a]/15 hover:bg-[#ba935a]/25 border border-[#ba935a]/30 rounded-md transition-all flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                >
                  <span>{showMapEmbed ? 'Hide' : 'Map'}</span>
                  {showMapEmbed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Collapsible Interactive Map Embed */}
              {showMapEmbed && (
                <div className="w-full h-56 bg-[#12100e] border-t border-[#ba935a]/30 relative animate-fadeIn">
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
              className="flex items-center justify-between p-3.5 bg-[#1f1d19]/90 hover:bg-[#25221d] border border-[#ba935a]/30 hover:border-[#f09433] rounded-xl transition-all duration-300 group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-md shrink-0">
                  <InstagramIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#e5cf9f] transition-colors block">
                    Instagram
                  </span>
                  <span className="text-[11px] text-[#a89f91] block font-mono">
                    @casaitalia.portghalib
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8c8479] group-hover:text-[#ba935a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* TIKTOK BUTTON */}
            <a
              href="https://www.tiktok.com/@casaitalia.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-[#1f1d19]/90 hover:bg-[#25221d] border border-[#ba935a]/30 hover:border-cyan-400/50 rounded-xl transition-all duration-300 group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-black border border-white/20 text-white flex items-center justify-center shadow-md shrink-0">
                  <TikTokIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#e5cf9f] transition-colors block">
                    TikTok
                  </span>
                  <span className="text-[11px] text-[#a89f91] block font-mono">
                    @casaitalia.eg
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8c8479] group-hover:text-[#ba935a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* FACEBOOK BUTTON */}
            <a
              href="https://www.facebook.com/casaitaliarestaurant/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-[#1f1d19]/90 hover:bg-[#25221d] border border-[#ba935a]/30 hover:border-[#1877f2]/50 rounded-xl transition-all duration-300 group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1877f2] text-white flex items-center justify-center shadow-md shrink-0">
                  <FacebookIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#e5cf9f] transition-colors block">
                    Facebook Community
                  </span>
                  <span className="text-[11px] text-[#a89f91] block">
                    casaitaliarestaurant
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8c8479] group-hover:text-[#ba935a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* WHATSAPP RESERVATIONS */}
            <a
              href="https://wa.me/201000000000?text=Hello%20Casa%20Italia!%20I%20would%20like%20to%20reserve%20a%20table."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-[#1f1d19]/90 hover:bg-[#25221d] border border-[#25d366]/40 hover:border-[#25d366] rounded-xl transition-all duration-300 group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#25d366] text-white flex items-center justify-center shadow-md shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#25d366] transition-colors block">
                    WhatsApp Concierge
                  </span>
                  <span className="text-[11px] text-[#a89f91] block">
                    Table Reservations &amp; Inquiries
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8c8479] group-hover:text-[#25d366] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* DIGITAL MENU CTA */}
            <Link
              href="/menu"
              className="flex items-center justify-between p-3.5 bg-gradient-to-r from-[#ba935a]/20 to-[#ba935a]/10 hover:from-[#ba935a]/30 hover:to-[#ba935a]/20 border border-[#ba935a] rounded-xl transition-all duration-300 group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#ba935a] text-[#141210] flex items-center justify-center shadow-md shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#e5cf9f] transition-colors block">
                    Explore Digital Menu
                  </span>
                  <span className="text-[11px] text-[#a89f91] block">
                    Fresh Pasta, Seafood &amp; DOCG Wine
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#ba935a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>

          </div>

          {/* ======================================================== */}
          {/* 4. UTILITY ACTIONS (SAVE VCARD & SHARE) */}
          {/* ======================================================== */}
          <div className="grid grid-cols-2 gap-3 w-full mt-6 pt-5 border-t border-[#ba935a]/20">
            <button
              onClick={handleDownloadVCard}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#ba935a] hover:bg-[#a37f48] text-[#141210] text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('medal.saveContact')}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#24201c] hover:bg-[#2d2823] text-[#faf7f2] border border-[#ba935a]/40 text-xs font-bold uppercase tracking-wider rounded-lg transition-all active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{t('medal.copied')}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#ba935a]" />
                  <span>{t('medal.shareHub')}</span>
                </>
              )}
            </button>
          </div>

          {/* Footer Copyright */}
          <div className="mt-6 text-[10px] text-[#8c8479] uppercase tracking-widest flex items-center justify-center gap-1.5">
            <span>&copy; {new Date().getFullYear()} Casa Italia</span>
            <span>•</span>
            <span>Porto Ghalib</span>
          </div>

        </div>

      </main>
    </div>
  );
}
