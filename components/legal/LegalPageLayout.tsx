'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { Navbar, Footer } from '@/components/layout';
import { useLanguage } from '@/context/LanguageContext';

export interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  lastUpdated,
  headerAction,
  children,
}) => {
  const { language } = useLanguage();
  const isIt = language === 'it';

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-[#1a1816]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 w-full">

        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#8c8479]">
          <Link
            href="/"
            className="hover:text-[#ba935a] transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isIt ? 'Torna alla Home' : 'Back to Home'}</span>
          </Link>
          <span>•</span>
          <span className="text-[#ba935a]">{title}</span>
        </div>

        <div className="border-b border-[#ba935a]/30 pb-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1816] tracking-tight">
              {title}
            </h1>
            <p className="mt-3 text-sm text-[#6e675e]">
              {lastUpdated}
            </p>
          </div>
          <div className="shrink-0 flex flex-wrap items-center gap-3">
            <a
              href="/Casa_Italia_Legal_Policies_EN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Casa_Italia_Legal_Policies_EN.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white hover:bg-[#f7f2e8] border border-[#ba935a]/50 text-[#1a1816] text-xs font-bold uppercase tracking-wider shadow-xs transition-colors"
              title={isIt ? 'Scarica Compendio Normativo Ufficiale (PDF)' : 'Download Official Legal Compendium (PDF)'}
            >
              <Download className="w-3.5 h-3.5 text-[#ba935a]" />
              <span>{isIt ? 'Scarica PDF' : 'Download PDF'}</span>
            </a>
            {headerAction}
          </div>
        </div>

        <div className="space-y-10">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};
