'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Share2, 
  Download, 
  Check, 
  ExternalLink, 
  Utensils, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight
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
      {/* 2. MAIN BRIGHT LUXURY CARD CONTAINER */}
      {/* ======================================================== */}
      <main className="w-full max-w-lg mx-auto px-4 py-8 sm:py-12 relative z-10 flex flex-col items-center">
        
        {/* Luminous Glassmorphic Central Card */}
        <div className="w-full bg-white/95 backdrop-blur-xl border border-[#ba935a]/35 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col items-center text-center relative overflow-hidden">
          
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
          {/* 3. SIMPLIFIED BRIGHT ACTION BUTTONS & LINKS */}
          {/* ======================================================== */}
          <div className="w-full space-y-3">
            
            {/* TRIPADVISOR CARD BUTTON */}
            <a
              href="https://www.tripadvisor.com/Search?q=Casa+Italia+Porto+Ghalib"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-white hover:bg-[#f2faf5] border border-[#00aa6c]/40 hover:border-[#00aa6c] rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00aa6c] text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  <TripAdvisorIcon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-[#1a1816] group-hover:text-[#00aa6c] transition-colors block">
                    TripAdvisor Reviews
                  </span>
                  <span className="text-xs text-[#6e675e] block mt-0.5">
                    Travelers&apos; Choice • Leave a Review
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#00aa6c] shrink-0 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </a>

            {/* GOOGLE MAPS LOCATION & EXPANDABLE TOGGLE */}
            <div className="w-full bg-white border border-[#ba935a]/35 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between p-3.5">
                <a
                  href="https://maps.app.goo.gl/HNufX8h9iE7dDJbR9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-left flex-1 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#ba935a] text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#1a1816] group-hover:text-[#ba935a] transition-colors flex items-center gap-1">
                      Google Maps Location
                      <ExternalLink className="w-3.5 h-3.5 text-[#ba935a]" />
                    </span>
                    <span className="text-xs text-[#6e675e] block mt-0.5">
                      Marina, Porto Ghalib (Open in Maps)
                    </span>
                  </div>
                </a>

                {/* Map Toggle Preview Button */}
                <button
                  onClick={() => setShowMapEmbed(!showMapEmbed)}
                  className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#ba935a] bg-[#ba935a]/10 hover:bg-[#ba935a]/20 border border-[#ba935a]/30 rounded-lg transition-all flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                >
                  <span>{showMapEmbed ? 'Hide' : 'Map'}</span>
                  {showMapEmbed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Collapsible Interactive Map Embed */}
              {showMapEmbed && (
                <div className="w-full h-56 bg-[#f5f1eb] border-t border-[#ba935a]/30 relative animate-fadeIn">
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
              className="flex items-center justify-between p-3.5 bg-white hover:bg-[#fdfaf5] border border-[#ba935a]/25 hover:border-[#f09433] rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  <InstagramIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-[#1a1816] group-hover:text-[#ba935a] transition-colors block">
                    Instagram
                  </span>
                  <span className="text-xs text-[#6e675e] block font-mono mt-0.5">
                    @casaitalia.portghalib
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#ba935a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* TIKTOK BUTTON */}
            <a
              href="https://www.tiktok.com/@casaitalia.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-white hover:bg-[#fdfaf5] border border-[#ba935a]/25 hover:border-[#1a1816] rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1a1816] text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  <TikTokIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-[#1a1816] group-hover:text-[#ba935a] transition-colors block">
                    TikTok
                  </span>
                  <span className="text-xs text-[#6e675e] block font-mono mt-0.5">
                    @casaitalia.eg
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#ba935a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* FACEBOOK BUTTON */}
            <a
              href="https://www.facebook.com/casaitaliarestaurant/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-white hover:bg-[#fdfaf5] border border-[#ba935a]/25 hover:border-[#1877f2] rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1877f2] text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  <FacebookIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-[#1a1816] group-hover:text-[#1877f2] transition-colors block">
                    Facebook Community
                  </span>
                  <span className="text-xs text-[#6e675e] block mt-0.5">
                    casaitaliarestaurant
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#ba935a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* WHATSAPP RESERVATIONS */}
            <a
              href="https://wa.me/201000000000?text=Hello%20Casa%20Italia!%20I%20would%20like%20to%20reserve%20a%20table."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-white hover:bg-[#f3fbf6] border border-[#25d366]/40 hover:border-[#25d366] rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25d366] text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-[#1a1816] group-hover:text-[#25d366] transition-colors block">
                    WhatsApp Concierge
                  </span>
                  <span className="text-xs text-[#6e675e] block mt-0.5">
                    Table Reservations &amp; Inquiries
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#25d366] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* DIGITAL MENU CTA */}
            <Link
              href="/menu"
              className="flex items-center justify-between p-3.5 bg-gradient-to-r from-[#ba935a] to-[#a37f48] hover:from-[#c8a165] hover:to-[#ba935a] text-white rounded-2xl transition-all duration-300 group shadow-md hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  <Utensils className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-white block">
                    Explore Digital Menu
                  </span>
                  <span className="text-xs text-white/85 block mt-0.5">
                    Fresh Pasta, Seafood &amp; DOCG Wine
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>

          </div>

          {/* ======================================================== */}
          {/* 4. UTILITY ACTIONS (SAVE VCARD & SHARE) */}
          {/* ======================================================== */}
          <div className="grid grid-cols-2 gap-3 w-full mt-6 pt-5 border-t border-[#ba935a]/25">
            <button
              onClick={handleDownloadVCard}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#ba935a] hover:bg-[#a37f48] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('medal.saveContact')}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#faf7f2] hover:bg-[#f0e7d8] text-[#1a1816] border border-[#ba935a]/35 text-xs font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">{t('medal.copied')}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#ba935a]" />
                  <span>{t('medal.shareHub')}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}
