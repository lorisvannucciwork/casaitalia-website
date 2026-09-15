'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { TablePortalCard } from './TablePortalCard';

export interface TablePortalViewProps {
  className?: string;
}

export const TablePortalView: React.FC<TablePortalViewProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  // Wi-Fi credentials & copy state
  const [wifiCopied, setWifiCopied] = useState(false);
  const [wifiSsid, setWifiSsid] = useState('CasaItalia_Guest');
  const [wifiPass, setWifiPass] = useState('casaitaliaportghalib');

  useEffect(() => {
    fetch('/api/settings/public')
      .then((res) => res.json() as Promise<{ settings?: { guestWifiSsid?: string; guestWifiPassword?: string } }>)
      .then((data) => {
        if (data?.settings?.guestWifiSsid) setWifiSsid(data.settings.guestWifiSsid);
        if (data?.settings?.guestWifiPassword) setWifiPass(data.settings.guestWifiPassword);
      })
      .catch(() => {});
  }, []);

  // Set QR session token and clean any obsolete table numbers
  useEffect(() => {
    try {
      localStorage.setItem('casaItaliaScannedViaQR', 'true');
      localStorage.removeItem('casaItaliaTableNumber');
      localStorage.removeItem('casaItaliaTableNumOnly');
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleCopyWifi = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(wifiPass);
        setWifiCopied(true);
        setTimeout(() => setWifiCopied(false), 3000);
        return;
      }
    } catch {
      // ignore
    }

    try {
      const el = document.createElement('textarea');
      el.value = wifiPass;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.focus();
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setWifiCopied(true);
      setTimeout(() => setWifiCopied(false), 3000);
    } catch {
      // failed
    }
  };

  return (
    <div className={`min-h-screen bg-[#141210] text-[#faf7f2] flex flex-col justify-between selection:bg-[#ba935a] selection:text-white relative overflow-x-hidden font-sans ${className}`}>
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ba935a]/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ba935a]/8 rounded-full blur-[140px]" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-lg mx-auto px-4 pt-6 pb-2 flex items-center justify-between">
        <BrandLogo size="sm" asLink priority />

        {/* Language Switcher Button */}
        <div className="flex items-center bg-[#262320] border border-[#ba935a]/40 p-0.5 shadow-sm">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-[#ba935a] text-[#1a1816] shadow-xs'
                : 'text-[#a8a095] hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage('it')}
            className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer ${
              language === 'it'
                ? 'bg-[#ba935a] text-[#1a1816] shadow-xs'
                : 'text-[#a8a095] hover:text-white'
            }`}
          >
            IT
          </button>
        </div>
      </header>

      {/* Main Hub Content */}
      <main className="relative z-10 w-full max-w-lg mx-auto px-4 py-4 space-y-4 flex-1">
        <TablePortalCard
          wifiSsid={wifiSsid}
          wifiPass={wifiPass}
          wifiCopied={wifiCopied}
          onCopyWifi={handleCopyWifi}
        />
      </main>

      {/* Bottom Subtle Signature */}
      <footer className="relative z-10 w-full max-w-lg mx-auto px-4 py-3 text-center text-[10px] text-[#8c8479]">
        <span>© Casa Italia Ristorante • Authentic Italian Dining</span>
      </footer>
    </div>
  );
};
