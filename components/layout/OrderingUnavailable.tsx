'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from '@/context/LanguageContext';

const TEXT = {
  en: {
    title: {
      delivery: 'Delivery is currently unavailable',
      pizza: 'Create your own pizza is currently unavailable',
    },
    body: 'Online ordering is paused for now: delivery, creating your own pizza and ordering from the Pizza Wall. We will be back soon. You are always welcome at the restaurant.',
    menu: 'See the menu',
    book: 'Book a table',
  },
  it: {
    title: {
      delivery: 'La consegna non è al momento disponibile',
      pizza: 'Crea la tua pizza non è al momento disponibile',
    },
    body: "Gli ordini online sono sospesi per ora: consegna, crea la tua pizza e ordini dalla Bacheca delle pizze. Torneremo presto. Vi aspettiamo sempre al ristorante.",
    menu: 'Vedi il menù',
    book: 'Prenota un tavolo',
  },
};

/** Shown instead of the order pages while ONLINE_ORDERING_AVAILABLE (config/ordering.ts) is false. */
export function OrderingUnavailable({ kind }: { kind: 'delivery' | 'pizza' }) {
  const { language } = useLanguage();
  const t = language === 'it' ? TEXT.it : TEXT.en;
  return (
    <div className="min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased">
      <Navbar />
      <main className="flex-1 relative pt-[64px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[url('/backgrounds/bg-1.webp')] bg-[length:100%_auto] bg-repeat-y opacity-80" />
        <section className="relative z-10 w-full max-w-xl mx-4 my-16 bg-[#faf7f2] border border-[#ba935a]/30 shadow-lg px-6 py-10 sm:px-10 text-center">
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#1a1816]">{t.title[kind]}</h1>
          <p className="mt-4 text-sm sm:text-base text-[#6e675e] leading-relaxed">{t.body}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/menu"
              className="px-6 py-3 bg-gradient-to-r from-[#ba935a] to-[#a37f48] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md"
            >
              {t.menu}
            </Link>
            <Link
              href="/reservations"
              className="px-6 py-3 border border-[#ba935a] text-[#8a6834] text-xs sm:text-sm font-bold uppercase tracking-wider"
            >
              {t.book}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
