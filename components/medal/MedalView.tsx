'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Navbar, Footer } from '@/components/layout';
import { MedalSocialCard } from './MedalSocialCard';
import { MedalMapModal } from './MedalMapModal';

export interface MedalViewProps {
  className?: string;
}

export const MedalView: React.FC<MedalViewProps> = ({ className = '' }) => {
  const [copied, setCopied] = useState(false);
  const [showMapEmbed, setShowMapEmbed] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }
    } catch {
      // fallback to manual element selection
    }

    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.focus();
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // failed
    }
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://casaitaliarestaurants.com/medal';
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Casa Italia | Medal & Social Hub',
          text: 'Connect with Casa Italia Ristorante in Porto Ghalib.',
          url: url,
        });
      } catch {
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased selection:bg-[#ba935a] selection:text-white ${className}`}>
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 relative flex flex-col items-center justify-center pt-[90px] sm:pt-[110px] pb-12 sm:pb-16 px-4">
        {/* Background Restaurant Photo */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/backgrounds/bg-2.webp"
            alt="Casa Italia Background"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
        </div>

        {/* Main Social Card */}
        <div className="w-full max-w-md mx-auto relative z-10 py-2 sm:py-4">
          <MedalSocialCard
            onOpenMap={() => setShowMapEmbed(true)}
            onShare={handleShare}
            copied={copied}
          />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Map Modal */}
      <MedalMapModal
        isOpen={showMapEmbed}
        onClose={() => setShowMapEmbed(false)}
      />
    </div>
  );
};
