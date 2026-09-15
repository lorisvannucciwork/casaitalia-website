'use client';

import React from 'react';
import { Wifi, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface WifiCardProps {
  ssid: string;
  pass: string;
  copied: boolean;
  onCopy: () => void;
}

export const WifiCard: React.FC<WifiCardProps> = ({
  ssid,
  pass,
  copied,
  onCopy,
}) => {
  const { language } = useLanguage();
  const isIt = language === 'it';

  return (
    <div className="bg-[#1e1b18] border border-[#ba935a]/40 p-4 sm:p-5 relative shadow-md">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-[#ba935a]">
          <Wifi className="w-5 h-5" />
          <h3 className="font-serif font-bold text-sm sm:text-base text-[#faf7f2]">
            {isIt ? 'Wi-Fi Ospiti Gratuito' : 'Complimentary Guest Wi-Fi'}
          </h3>
        </div>
        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5">
          {isIt ? 'Connesso' : 'High Speed'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="bg-[#141210] p-2.5 border border-[#ba935a]/20">
          <span className="text-[10px] text-[#8c8479] uppercase block mb-0.5">
            Network (SSID)
          </span>
          <span className="font-bold text-[#faf7f2] select-all font-mono">
            {ssid}
          </span>
        </div>

        <div className="bg-[#141210] p-2.5 border border-[#ba935a]/20 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] text-[#8c8479] uppercase block mb-0.5">
              Password
            </span>
            <span className="font-bold text-[#ba935a] select-all font-mono truncate block">
              {pass}
            </span>
          </div>
          <button
            type="button"
            onClick={onCopy}
            className="p-1.5 bg-[#262320] hover:bg-[#ba935a] text-[#ba935a] hover:text-[#1a1816] transition-colors border border-[#ba935a]/30 shrink-0 cursor-pointer"
            title="Copy Password"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {copied && (
        <div className="mt-2 text-[10px] text-emerald-400 text-center font-bold">
          ✓ {isIt ? 'Password copiata negli appunti!' : 'Password copied to clipboard!'}
        </div>
      )}
    </div>
  );
};
