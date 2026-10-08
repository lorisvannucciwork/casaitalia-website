'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Bike,
  MessageCircle,
  MapPin,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';

export const DeliveryInfoBanner: React.FC = () => {
  const { t, language } = useLanguage();
  const isIt = language === 'it';

  return (
    <div className="space-y-6">
      {/* Notice Callout: Delivery fee discussed via WhatsApp */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#ba935a]/15 via-[#f2ebda] to-[#ba935a]/15 border border-[#ba935a]/40 p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ba935a] text-white flex items-center justify-center shrink-0 shadow-md">
              <Bike className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-serif font-bold text-base sm:text-lg text-[#1a1816]">
                  {t('delivery.feeNoticeTitle')}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#25D366]/15 text-[#1b7e3e] text-[10px] font-bold uppercase tracking-wider border border-[#25D366]/30">
                  <MessageCircle className="w-3 h-3 text-[#25D366]" />
                  <span>WhatsApp Concierge</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#524d46] leading-relaxed max-w-2xl">
                {t('delivery.feeNoticeDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-center justify-end border-t sm:border-t-0 border-[#ba935a]/20 pt-2 sm:pt-0 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 border border-[#ba935a]/30 text-xs font-semibold text-[#8c6c39] shadow-xs">
              <Clock className="w-3.5 h-3.5 text-[#ba935a]" />
              <span>{isIt ? '12:00 – 23:30 Tutti i Giorni' : '12:00 PM – 11:30 PM Daily'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Step Workflow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Step 1 */}
        <div className="bg-white/70 backdrop-blur-md border border-white/80 p-4 shadow-sm hover:border-[#ba935a]/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f5eedf] border border-[#ba935a]/30 text-[#ba935a] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              1
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1a1816]">
              {t('delivery.step1Title')}
            </h3>
          </div>
          <p className="text-xs text-[#6e675e] mt-2 leading-relaxed">
            {t('delivery.step1Desc')}
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white/70 backdrop-blur-md border border-white/80 p-4 shadow-sm hover:border-[#ba935a]/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              2
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1a1816]">
              {t('delivery.step2Title')}
            </h3>
          </div>
          <p className="text-xs text-[#6e675e] mt-2 leading-relaxed">
            {t('delivery.step2Desc')}
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white/70 backdrop-blur-md border border-white/80 p-4 shadow-sm hover:border-[#ba935a]/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f5eedf] border border-[#ba935a]/30 text-[#ba935a] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              3
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1a1816]">
              {t('delivery.step3Title')}
            </h3>
          </div>
          <p className="text-xs text-[#6e675e] mt-2 leading-relaxed">
            {t('delivery.step3Desc')}
          </p>
        </div>
      </div>
    </div>
  );
};
