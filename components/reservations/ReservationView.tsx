'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarDays, Check, Clock, Minus, Phone, Plus, Users } from 'lucide-react';
import { Navbar, Footer } from '@/components/layout';
import { useLanguage } from '@/context/LanguageContext';
import { SITE_CONFIG } from '@/config/site';

interface Slot {
  time: string;
  available: boolean;
}

type Area = 'any' | 'indoor' | 'outdoor';

const MAX_GUESTS = 12;
const STORAGE_KEY_GUEST = 'casaItaliaBookingGuest';

function todayInCairo(): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Cairo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value || '01';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const inputClass = (invalid: boolean) =>
  `w-full text-sm p-3 bg-white border focus:border-[#ba935a] focus:ring-1 focus:ring-[#ba935a] focus:outline-none ${
    invalid ? 'border-[#8f1d1d]' : 'border-[#ba935a]/30'
  }`;

export const ReservationView: React.FC = () => {
  const { language, t } = useLanguage();
  const today = useMemo(() => todayInCairo(), []);

  const [date, setDate] = useState(today);
  const [guests, setGuests] = useState(2);
  const [area, setArea] = useState<Area>('any');
  const [pickedTime, setTime] = useState<string | null>(null);
  // Available times of the chosen day and party size (fetched; stale answers are ignored)
  const queryKey = `${date}|${guests}`;
  const [slotsAnswer, setSlotsAnswer] = useState<{ key: string; slots: Slot[] | null } | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const [guest, setGuest] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_GUEST);
        if (saved) {
          const parsed = JSON.parse(saved);
          return { name: parsed.name || '', phone: parsed.phone || '', email: parsed.email || '', notes: '' };
        }
      } catch {}
    }
    return { name: '', phone: '', email: '', notes: '' };
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  const [booked, setBooked] = useState<{ ref: string; date: string; time: string; guests: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const [day, party] = queryKey.split('|');
    fetch(`/api/reservations/availability?date=${day}&guests=${party}`, { cache: 'no-store' })
      .then(async (response) => {
        const data = (await response.json()) as { slots?: Slot[] };
        if (!cancelled) setSlotsAnswer({ key: queryKey, slots: response.ok && data.slots ? data.slots : null });
      })
      .catch(() => {
        if (!cancelled) setSlotsAnswer({ key: queryKey, slots: null });
      });
    return () => {
      cancelled = true;
    };
  }, [queryKey, reloadCount]);

  const loadSlots = useCallback(() => setReloadCount((c) => c + 1), []);
  const answered = slotsAnswer?.key === queryKey;
  const slots = answered ? slotsAnswer.slots : null;
  const slotsError = answered && slotsAnswer.slots === null;
  // A time chosen before the day or the party size changed only counts if it is still free
  const time = pickedTime && slots?.some((s) => s.time === pickedTime && s.available) ? pickedTime : null;

  const missing = {
    name: !guest.name.trim(),
    phone: guest.phone.replace(/[^0-9]/g, '').length < 7,
    time: !time,
  };

  const formattedDate = (value: string) =>
    new Date(`${value}T12:00:00Z`).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === 'sending') return;
    if (missing.name || missing.phone || missing.time) {
      setShowErrors(true);
      setError(missing.time ? t('reserve.chooseTime') : t('reserve.fillRequired'));
      return;
    }
    setStatus('sending');
    setError(null);
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: guest.name.trim(),
          phone: guest.phone.trim(),
          email: guest.email.trim(),
          notes: guest.notes.trim(),
          guests,
          date,
          time,
          area,
          language,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ref?: string;
        message?: string;
        error?: string;
      };
      if (!response.ok || !data.ref) {
        setStatus('idle');
        setError(data.message || t('reserve.failed'));
        if (data.error === 'full') loadSlots();
        return;
      }
      try {
        localStorage.setItem(STORAGE_KEY_GUEST, JSON.stringify({ name: guest.name, phone: guest.phone, email: guest.email }));
      } catch {}
      setBooked({ ref: data.ref, date, time: time!, guests });
      setStatus('done');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setStatus('idle');
      setError(t('reserve.failed'));
    }
  };

  const startOver = () => {
    setBooked(null);
    setStatus('idle');
    setTime(null);
    setGuest((g: typeof guest) => ({ ...g, notes: '' }));
    loadSlots();
  };

  const areaOptions: { value: Area; label: string }[] = [
    { value: 'any', label: t('reserve.areaAny') },
    { value: 'indoor', label: t('reserve.areaIndoor') },
    { value: 'outdoor', label: t('reserve.areaOutdoor') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased selection:bg-[#ba935a] selection:text-white">
      <Navbar />

      <main className="flex-1 relative pt-[64px]">
        <div className="absolute inset-0 z-0 bg-[url('/backgrounds/bg-1.webp')] bg-[length:100%_auto] bg-repeat-y opacity-80" />

        <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="text-center mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#faf7f2]/90">{t('reserve.kicker')}</p>
            <h1 className="mt-2 text-3xl sm:text-5xl font-serif font-black text-white tracking-wide [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
              {t('reserve.title')}
            </h1>
            <p className="mt-3 text-sm text-[#faf7f2]/90 max-w-xl mx-auto [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]">
              {t('reserve.subtitle')}
            </p>
          </div>

          {status === 'done' && booked ? (
            /* Booking confirmed */
            <div className="bg-[#faf7f2] border border-[#ba935a]/40 shadow-2xl p-6 sm:p-10 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#1b7e3e]/10 border border-[#1b7e3e]/30 text-[#1b7e3e] mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1a1816]">{t('reserve.confirmedTitle')}</h2>
              <div className="inline-block border-y border-[#ba935a]/40 py-4 px-6 space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ba935a]">{t('reserve.bookingNumber')}</p>
                <p className="font-serif font-bold text-3xl tracking-wider">{booked.ref}</p>
                <p className="text-sm text-[#1a1816] capitalize">{formattedDate(booked.date)}</p>
                <p className="text-sm text-[#1a1816]">
                  {booked.time} · {booked.guests} {booked.guests === 1 ? t('reserve.guest') : t('reserve.guests')}
                </p>
              </div>
              <p className="text-sm text-[#6e675e] max-w-md mx-auto">{t('reserve.confirmedDesc')}</p>
              <button
                type="button"
                onClick={startOver}
                className="px-5 py-2.5 bg-[#ba935a] hover:bg-[#a37f48] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                {t('reserve.another')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="bg-[#faf7f2] border border-[#ba935a]/40 shadow-2xl p-5 sm:p-8 space-y-7">
              {/* Date & party */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="booking-date" className="text-xs font-bold uppercase tracking-wider text-[#ba935a] flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" /> {t('reserve.date')}
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={date}
                    min={today}
                    max={addDays(today, 60)}
                    onChange={(e) => e.target.value && setDate(e.target.value)}
                    className={inputClass(false)}
                  />
                  <p className="text-xs text-[#6e675e] capitalize">{formattedDate(date)}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ba935a] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> {t('reserve.partySize')}
                  </span>
                  <div className="flex items-center bg-white border border-[#ba935a]/30 w-fit">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      aria-label={t('reserve.fewerGuests')}
                      className="w-11 h-11 flex items-center justify-center hover:bg-[#ba935a] hover:text-white transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-24 text-center font-serif font-bold text-lg" aria-live="polite">
                      {guests} {guests === 1 ? t('reserve.guest') : t('reserve.guests')}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                      aria-label={t('reserve.moreGuests')}
                      className="w-11 h-11 flex items-center justify-center hover:bg-[#ba935a] hover:text-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-[#6e675e]">
                    {t('reserve.bigGroups')}{' '}
                    <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-[#8c6c39] underline underline-offset-2">
                      {SITE_CONFIG.contact.phoneFormatted}
                    </a>
                  </p>
                </div>
              </div>

              {/* Seating preference */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ba935a] block">{t('reserve.area')}</span>
                <div className="grid grid-cols-3 gap-2">
                  {areaOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setArea(option.value)}
                      aria-pressed={area === option.value}
                      className={`p-3 border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        area === option.value
                          ? 'bg-[#ba935a] text-white border-[#ba935a] shadow-sm'
                          : 'bg-white text-[#1a1816] border-[#ba935a]/30 hover:border-[#ba935a]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ba935a] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {t('reserve.time')}
                </span>
                {slotsError ? (
                  <p className="text-sm text-[#8f1d1d]">
                    {t('reserve.slotsError')}{' '}
                    <button type="button" onClick={loadSlots} className="underline cursor-pointer">{t('reserve.retry')}</button>
                  </p>
                ) : !slots ? (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2" aria-busy="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-10 bg-[#ba935a]/10 animate-pulse" />
                    ))}
                  </div>
                ) : slots.every((s) => !s.available) ? (
                  <p className="text-sm text-[#6e675e]">{t('reserve.noSlots')}</p>
                ) : (
                  <div
                    className={`grid grid-cols-4 sm:grid-cols-6 gap-2 ${showErrors && missing.time ? 'outline outline-1 outline-[#8f1d1d] outline-offset-4' : ''}`}
                    role="radiogroup"
                    aria-label={t('reserve.time')}
                  >
                    {slots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        role="radio"
                        aria-checked={time === slot.time}
                        disabled={!slot.available}
                        onClick={() => setTime(slot.time)}
                        className={`h-10 border text-sm font-bold transition-all ${
                          time === slot.time
                            ? 'bg-[#1a1816] text-[#faf7f2] border-[#ba935a] shadow-sm'
                            : slot.available
                              ? 'bg-white text-[#1a1816] border-[#ba935a]/30 hover:border-[#ba935a] cursor-pointer'
                              : 'bg-[#f5eedf]/60 text-[#a8a095] border-transparent line-through cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Guest details */}
              <div className="space-y-4 pt-5 border-t border-[#ba935a]/25">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="booking-name" className="text-xs font-semibold text-[#1a1816] block">{t('reserve.name')} *</label>
                    <input
                      id="booking-name"
                      type="text"
                      autoComplete="name"
                      value={guest.name}
                      onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                      aria-invalid={showErrors && missing.name}
                      className={inputClass(showErrors && missing.name)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="booking-phone" className="text-xs font-semibold text-[#1a1816] block">{t('reserve.phone')} *</label>
                    <input
                      id="booking-phone"
                      type="tel"
                      autoComplete="tel"
                      value={guest.phone}
                      onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                      aria-invalid={showErrors && missing.phone}
                      className={inputClass(showErrors && missing.phone)}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="booking-email" className="text-xs font-semibold text-[#1a1816] block">{t('reserve.email')}</label>
                  <input
                    id="booking-email"
                    type="email"
                    autoComplete="email"
                    value={guest.email}
                    onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                    className={inputClass(false)}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="booking-notes" className="text-xs font-semibold text-[#1a1816] block">{t('reserve.notes')}</label>
                  <textarea
                    id="booking-notes"
                    rows={2}
                    value={guest.notes}
                    onChange={(e) => setGuest({ ...guest, notes: e.target.value })}
                    placeholder={t('reserve.notesPlaceholder')}
                    className={`${inputClass(false)} resize-none`}
                  />
                </div>
              </div>

              {error && (
                <p role="alert" className="text-sm text-[#8f1d1d] bg-[#8f1d1d]/5 border-l-2 border-[#8f1d1d] px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
                className="group relative w-full py-4 px-5 overflow-hidden bg-gradient-to-r from-[#171513] via-[#231f1a] to-[#171513] hover:from-[#231f1a] hover:via-[#2d2822] hover:to-[#231f1a] text-[#faf7f2] border border-[#ba935a] shadow-[0_4px_22px_rgba(26,24,22,0.35)] hover:shadow-[0_6px_28px_rgba(186,147,90,0.38)] flex items-center justify-center transition-all duration-300 active:scale-[0.99] cursor-pointer disabled:opacity-70 disabled:cursor-wait"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-[#ba935a]/20 to-transparent transition-transform ease-out pointer-events-none" />
                <span className="font-serif text-sm font-bold tracking-wider uppercase">
                  {status === 'sending'
                    ? t('reserve.sending')
                    : time
                      ? `${t('reserve.submit')} · ${time}`
                      : t('reserve.submit')}
                </span>
              </button>

              <p className="text-xs text-center text-[#6e675e] flex items-center justify-center gap-1.5">
                <Phone className="w-3 h-3" /> {t('reserve.questions')}{' '}
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-[#8c6c39] underline underline-offset-2">
                  {SITE_CONFIG.contact.phoneFormatted}
                </a>
              </p>
            </form>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};
