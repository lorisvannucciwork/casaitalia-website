'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from '@/context/LanguageContext';
import { SITE_CONFIG } from '@/config/site';
import { DELIVERY_OPEN, DELIVERY_VIA_WHATSAPP, RESERVATIONS_OPEN } from '@/config/ordering';

type Kind = 'delivery' | 'pizza' | 'reservations';

const TEXT = {
  en: {
    title: {
      delivery: 'Delivery is currently unavailable',
      pizza: 'Create your own pizza is currently unavailable',
      reservations: 'Online booking is currently unavailable',
    },
    body: {
      delivery:
        'Online ordering is paused for now: delivery, creating your own pizza and ordering from the Pizza Wall. We will be back soon.',
      pizza: DELIVERY_VIA_WHATSAPP
        ? 'Creating your own pizza and ordering from the Pizza Wall are paused for now. You can still order delivery from our menu on WhatsApp.'
        : 'Online ordering is paused for now: delivery, creating your own pizza and ordering from the Pizza Wall. We will be back soon.',
      reservations: 'Booking a table online is paused for now. To book, please call us.',
    },
    menu: 'See the menu',
    book: 'Book a table',
    call: 'Call us',
    delivery: 'Order delivery',
  },
  it: {
    title: {
      delivery: 'La consegna non è al momento disponibile',
      pizza: 'Crea la tua pizza non è al momento disponibile',
      reservations: 'La prenotazione online non è al momento disponibile',
    },
    body: {
      delivery:
        'Gli ordini online sono sospesi per ora: consegna, crea la tua pizza e ordini dalla Bacheca delle pizze. Torneremo presto.',
      pizza: DELIVERY_VIA_WHATSAPP
        ? 'Crea la tua pizza e gli ordini dalla Bacheca delle pizze sono sospesi per ora. Puoi sempre ordinare a domicilio dal nostro menù su WhatsApp.'
        : 'Gli ordini online sono sospesi per ora: consegna, crea la tua pizza e ordini dalla Bacheca delle pizze. Torneremo presto.',
      reservations: 'La prenotazione online è sospesa per ora. Per prenotare, chiamaci.',
    },
    menu: 'Vedi il menù',
    book: 'Prenota un tavolo',
    call: 'Chiamaci',
    delivery: 'Ordina a domicilio',
  },
};

const primary =
  'px-6 py-3 bg-gradient-to-r from-[#ba935a] to-[#a37f48] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md';
const secondary = 'px-6 py-3 border border-[#ba935a] text-[#8a6834] text-xs sm:text-sm font-bold uppercase tracking-wider';

/** Shown instead of the order / booking pages while their switch in config/ordering.ts is false. */
export function OrderingUnavailable({ kind }: { kind: Kind }) {
  const { language } = useLanguage();
  const t = language === 'it' ? TEXT.it : TEXT.en;
  const phone = SITE_CONFIG.contact;
  return (
    <div className="min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased">
      <Navbar />
      <main className="flex-1 relative pt-[64px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[url('/backgrounds/bg-1.webp')] bg-[length:100%_auto] bg-repeat-y opacity-80" />
        <section className="relative z-10 w-full max-w-xl mx-4 my-16 bg-[#faf7f2] border border-[#ba935a]/30 shadow-lg px-6 py-10 sm:px-10 text-center">
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#1a1816]">{t.title[kind]}</h1>
          <p className="mt-4 text-sm sm:text-base text-[#6e675e] leading-relaxed">{t.body[kind]}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {kind === 'reservations' ? (
              <a href={`tel:${phone.phone}`} className={primary}>
                {t.call} · {phone.phoneFormatted}
              </a>
            ) : kind === 'pizza' && DELIVERY_OPEN ? (
              <Link href="/delivery" className={primary}>
                {t.delivery}
              </Link>
            ) : (
              <Link href="/menu" className={primary}>
                {t.menu}
              </Link>
            )}
            {kind === 'reservations' ? (
              <Link href="/menu" className={secondary}>
                {t.menu}
              </Link>
            ) : (
              RESERVATIONS_OPEN && (
                <Link href="/reservations" className={secondary}>
                  {t.book}
                </Link>
              )
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
