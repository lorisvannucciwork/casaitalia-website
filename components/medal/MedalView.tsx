'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout';
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
    <div className={`h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased selection:bg-[#ba935a] selection:text-white relative ${className}`}>

      <Navbar />

      <main className="flex-1 w-full h-full max-h-full overflow-hidden relative flex flex-col items-center justify-center pt-[70px] sm:pt-[80px] pb-3 px-3 sm:px-4">

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

        <div className="w-full max-w-md mx-auto my-auto relative z-10 py-1 flex flex-col items-center justify-center max-h-[calc(100dvh-85px)]">
          <MedalSocialCard
            onOpenMap={() => setShowMapEmbed(true)}
            onShare={handleShare}
            copied={copied}
          />
        </div>
      </main>

      <MedalMapModal
        isOpen={showMapEmbed}
        onClose={() => setShowMapEmbed(false)}
      />
    </div>
  );
};
