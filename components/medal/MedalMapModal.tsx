'use client';

import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface MedalMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedalMapModal: React.FC<MedalMapModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const isIt = language === 'it';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border-2 border-[#ba935a] w-full max-w-lg shadow-2xl p-4 sm:p-6 relative flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ba935a]/30">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1a1816]">
              {isIt ? 'Posizione Casa Italia' : 'Casa Italia Location'}
            </h3>
            <p className="text-xs text-[#6e675e]">
              Porto Ghalib Marina, Red Sea, Egypt
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#1a1816] hover:text-[#ba935a] hover:bg-[#faf7f2] transition-colors cursor-pointer"
            aria-label="Close Map"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full aspect-[4/3] sm:aspect-video bg-[#faf7f2] border border-[#ba935a]/30 overflow-hidden relative">
          <iframe
            title="Casa Italia Restaurant Google Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.227448208889!2d34.48202977626914!3d25.53488737749539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x144e594459d80d29%3A0xc07a8baee5ca8e3f!2sCasa%20Italia!5e0!3m2!1sen!2seg!4v1709472000000!5m2!1sen!2seg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        <div className="pt-4 mt-2 flex items-center justify-between gap-3">
          <a
            href="https://maps.app.goo.gl/F4FC3zM7Pki94YYC6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ba935a] hover:underline uppercase tracking-wider"
          >
            <span>{isIt ? 'Apri nell’app Google Maps' : 'Open in Google Maps App'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#ba935a] hover:bg-[#a37f48] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {isIt ? 'Chiudi' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
