'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, X, Share, PlusSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PwaManager: React.FC = () => {
  const { language } = useLanguage();
  const isIt = language === 'it';

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  // 1. Service Worker Registration
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerSw = async () => {
        try {
          const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
          
          // Check for service worker updates
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            }
          });
        } catch (err) {
          console.warn('[PWA] Service Worker registration failed:', err);
        }
      };

      if (document.readyState === 'complete') {
        registerSw();
      } else {
        window.addEventListener('load', registerSw);
        return () => window.removeEventListener('load', registerSw);
      }
    }
  }, []);

  // 2. Install Prompt Detection & Handling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if app is already installed in standalone mode
    const standaloneCheck =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (standaloneCheck) {
      setIsStandalone(true);
      return;
    }

    // Check if dismissed recently (within 7 days)
    const dismissedAt = localStorage.getItem('casa_italia_pwa_dismissed');
    if (dismissedAt) {
      const timeSince = Date.now() - parseInt(dismissedAt, 10);
      if (timeSince < 7 * 24 * 60 * 60 * 1000) {
        return;
      }
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIos(isIosDevice);

    const checkAndShowBanner = (delay = 2500) => {
      const hasCookieChoice = localStorage.getItem('casa_italia_cookie_consent');
      if (hasCookieChoice) {
        setTimeout(() => setShowBanner(true), delay);
      } else {
        const onConsent = () => {
          window.removeEventListener('cookieConsentChanged', onConsent);
          setTimeout(() => setShowBanner(true), 2500);
        };
        window.addEventListener('cookieConsentChanged', onConsent);
      }
    };

    if (isIosDevice) {
      checkAndShowBanner(3000);
      return;
    }

    // Android / Chrome / Edge beforeinstallprompt listener
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      checkAndShowBanner(2500);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // App installed event
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowBanner(false);
      setIsStandalone(true);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosModal(true);
      return;
    }

    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } catch {
      // ignore
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    try {
      localStorage.setItem('casa_italia_pwa_dismissed', Date.now().toString());
    } catch {
      // ignore
    }
  };

  if (isStandalone || !showBanner) return null;

  return (
    <>
      {/* Luxury Bottom Floating PWA Banner */}
      <aside
        aria-label="Install App Banner"
        className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-md z-40 bg-[#1a1816]/95 backdrop-blur-xl border border-[#ba935a]/50 p-3.5 sm:p-4 shadow-[0_10px_35px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-5 duration-500 rounded-none text-[#faf7f2]"
      >
        <div className="flex items-center gap-3.5">
          {/* App Icon */}
          <div className="relative w-12 h-12 shrink-0 border border-[#ba935a]/40 bg-[#141210] overflow-hidden shadow-inner">
            <Image
              src="/icons/android/launchericon-192x192.png"
              alt="Casa Italia App Icon"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Text Details */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm text-[#faf7f2] tracking-wide truncate">
                Casa Italia App
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#ba935a]/25 border border-[#ba935a]/50 text-[#ba935a]">
                PWA
              </span>
            </div>
            <p className="text-xs text-[#a8a095] line-clamp-1 mt-0.5">
              {isIt
                ? 'Menu offline, Wi-Fi e accesso rapido al tavolo'
                : 'Offline menu, guest Wi-Fi & instant dining hub'}
            </p>
          </div>

          {/* Dismiss Button */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close install prompt"
            className="p-1 text-[#a8a095] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Button */}
        <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-[#ba935a]/20">
          <button
            type="button"
            onClick={handleDismiss}
            className="px-3 py-1.5 text-xs text-[#a8a095] hover:text-white transition-colors cursor-pointer uppercase font-semibold tracking-wider"
          >
            {isIt ? 'Più tardi' : 'Later'}
          </button>

          <button
            type="button"
            onClick={handleInstallClick}
            className="px-4 py-1.5 bg-gradient-to-r from-[#ba935a] to-[#a37f48] hover:from-[#c8a165] hover:to-[#ba935a] text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isIt ? 'Installa' : 'Install'}</span>
          </button>
        </div>
      </aside>

      {/* iOS Safari Instruction Modal */}
      {showIosModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-300"
        >
          <div className="relative w-full max-w-sm bg-[#1a1816] border-2 border-[#ba935a] p-6 text-[#faf7f2] shadow-2xl space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ba935a]/30">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/icons/ios/180.png"
                  alt="Casa Italia"
                  width={32}
                  height={32}
                  className="rounded-xs border border-[#ba935a]/40"
                />
                <span className="font-serif font-bold text-base text-[#ba935a]">
                  {isIt ? 'Installa su iPhone' : 'Install on iPhone'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowIosModal(false)}
                className="p-1 text-[#a8a095] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step-by-step Visual Instructions */}
            <div className="space-y-4 text-xs sm:text-sm text-[#d4cbbe] leading-relaxed">
              <div className="flex items-start gap-3 p-3 bg-[#262320] border border-[#ba935a]/20">
                <div className="w-7 h-7 rounded-full bg-[#ba935a]/20 text-[#ba935a] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-white flex items-center gap-1.5">
                    <span>{isIt ? 'Tocca Condividi' : 'Tap Share'}</span>
                    <Share className="w-4 h-4 text-[#ba935a]" />
                  </p>
                  <p className="text-[#a8a095] text-xs">
                    {isIt
                      ? 'Tocca l’icona Condividi nella barra inferiore di Safari.'
                      : 'Tap the Share icon in the Safari navigation bar.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#262320] border border-[#ba935a]/20">
                <div className="w-7 h-7 rounded-full bg-[#ba935a]/20 text-[#ba935a] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-white flex items-center gap-1.5">
                    <span>{isIt ? 'Aggiungi a Home' : 'Add to Home Screen'}</span>
                    <PlusSquare className="w-4 h-4 text-[#ba935a]" />
                  </p>
                  <p className="text-[#a8a095] text-xs">
                    {isIt
                      ? 'Scorri e seleziona "Aggiungi alla schermata Home".'
                      : 'Scroll down and tap "Add to Home Screen".'}
                  </p>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              type="button"
              onClick={() => {
                setShowIosModal(false);
                handleDismiss();
              }}
              className="w-full py-2.5 bg-[#ba935a] hover:bg-[#a37f48] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
            >
              {isIt ? 'Ho capito' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
