'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, X, Share, PlusSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

declare global {
  interface Window {
    openPwaInstallPrompt?: () => void;
  }
}

export const PwaManager: React.FC = () => {
  const { language } = useLanguage();
  const isIt = language === 'it';

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  // 1. Expose global opener for Footer button
  useEffect(() => {
    window.openPwaInstallPrompt = () => {
      if (isIos) {
        setShowIosModal(true);
      } else {
        setShowBanner(true);
      }
    };
    return () => {
      delete window.openPwaInstallPrompt;
    };
  }, [isIos]);

  // 2. Service Worker Registration
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

          // Pre-warm media cache in background during idle time so dishes and images are available offline
          const primeOfflineMedia = async () => {
            if (typeof window === 'undefined' || !navigator.onLine) return;
            try {
              const res = await fetch('/api/menu');
              const data = (await res.json()) as { items?: { image?: string }[] };
              if (data?.items && Array.isArray(data.items)) {
                data.items.slice(0, 30).forEach((dish) => {
                  if (dish.image) {
                    const img = new window.Image();
                    img.src = dish.image;
                  }
                });
              }
            } catch {
              // Ignore background priming errors
            }
          };

          if ('requestIdleCallback' in window) {
            (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
              setTimeout(primeOfflineMedia, 2500);
            });
          } else {
            setTimeout(primeOfflineMedia, 3500);
          }
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

  // 3. Install Prompt Detection & Handling
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

    // Check if dismissed permanently ('never') or recently (within 7 days)
    const dismissedAt = localStorage.getItem('casa_italia_pwa_dismissed');
    if (dismissedAt) {
      if (dismissedAt === 'never') {
        return; // Permanently suppressed from auto-showing
      }
      const timeSince = Date.now() - parseInt(dismissedAt, 10);
      if (!isNaN(timeSince) && timeSince < 7 * 24 * 60 * 60 * 1000) {
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

  const handleLater = () => {
    setShowBanner(false);
    try {
      localStorage.setItem('casa_italia_pwa_dismissed', Date.now().toString());
    } catch {
      // ignore
    }
  };

  const handleNeverShowAgain = () => {
    setShowBanner(false);
    try {
      localStorage.setItem('casa_italia_pwa_dismissed', 'never');
    } catch {
      // ignore
    }
  };

  if (isStandalone || (!showBanner && !showIosModal)) return null;

  return (
    <>
      {/* Luxury Bottom Floating PWA Banner — Navbar-Matched Palette */}
      <aside
        aria-label="Install App Banner"
        className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-md z-40 bg-[#faf7f2]/95 backdrop-blur-xl border border-[#ba935a]/40 p-3.5 sm:p-4 shadow-[0_10px_35px_rgba(26,24,22,0.18)] animate-in slide-in-from-bottom-5 duration-500 rounded-none text-[#1a1816]"
      >
        <div className="flex items-center justify-between gap-3.5">
          <div className="flex items-center gap-3 min-w-0">
            {/* App Icon */}
            <div className="relative w-11 h-11 shrink-0 border border-[#ba935a]/40 bg-white overflow-hidden shadow-xs">
              <Image
                src="/icons/android/launchericon-192x192.png"
                alt="Casa Italia App Icon"
                width={44}
                height={44}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Title */}
            <div className="min-w-0">
              <span className="font-serif font-bold text-sm sm:text-base text-[#1a1816] tracking-wide truncate block">
                Casa Italia App
              </span>
            </div>
          </div>

          {/* Never show again button */}
          <button
            type="button"
            onClick={handleNeverShowAgain}
            aria-label={isIt ? 'Non mostrare più' : 'Never show again'}
            className="text-[11px] sm:text-xs text-[#8c8479] hover:text-[#ba935a] transition-colors cursor-pointer shrink-0 font-medium underline underline-offset-2 whitespace-nowrap"
          >
            {isIt ? 'Non mostrare più' : 'Never show again'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-[#ba935a]/20">
          <button
            type="button"
            onClick={handleLater}
            className="px-3 py-1.5 text-xs text-[#6e675e] hover:text-[#1a1816] transition-colors cursor-pointer uppercase font-semibold tracking-wider"
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
                handleLater();
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
