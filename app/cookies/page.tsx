'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Cookie, Settings, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CookiePolicyPage() {
  const { language } = useLanguage();
  const isIt = language === 'it';

  const handleOpenPreferences = () => {
    if (typeof window !== 'undefined' && window.openCookiePreferences) {
      window.openCookiePreferences();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-[#1a1816]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#8c8479]">
          <Link href="/" className="hover:text-[#ba935a] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            {isIt ? 'Torna alla Home' : 'Back to Home'}
          </Link>
          <span>•</span>
          <span className="text-[#ba935a]">{isIt ? 'Politica sui Cookie' : 'Cookie Policy'}</span>
        </div>

        {/* Header Title Section */}
        <div className="border-b border-[#ba935a]/30 pb-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ba935a]/10 border border-[#ba935a]/30 text-[11px] font-bold uppercase tracking-widest text-[#ba935a] mb-4">
              <Cookie className="w-3.5 h-3.5" />
              <span>ePrivacy &amp; GDPR Compliant</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1816] tracking-tight">
              {isIt ? 'Informativa sui Cookie' : 'Cookie Policy'}
            </h1>
            <p className="mt-3 text-sm text-[#6e675e]">
              {isIt
                ? 'Come utilizziamo i cookie e come gestire le tue preferenze • Casa Italia'
                : 'How we use cookies and how to manage your privacy choices • Casa Italia'}
            </p>
          </div>

          {/* Quick Trigger Button to Re-open Preferences */}
          <button
            onClick={handleOpenPreferences}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#ba935a] to-[#a37f48] hover:from-[#c8a165] hover:to-[#ba935a] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer shrink-0"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{isIt ? 'Modifica Preferenze' : 'Cookie Settings'}</span>
          </button>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm leading-relaxed text-[#4a453e]">
          {/* Section 1: What are cookies */}
          <section className="bg-white p-6 sm:p-8 border border-[#ba935a]/25 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1a1816] mb-3 flex items-center gap-2">
              <span className="text-[#ba935a]">01.</span>
              {isIt ? 'Cosa sono i Cookie?' : 'What are Cookies?'}
            </h2>
            <p>
              {isIt ? (
                <>
                  I cookie sono piccoli file di testo che i siti web visitati inviano al tuo dispositivo (computer, smartphone o tablet), dove vengono memorizzati per essere ritrasmessi agli stessi siti alla visita successiva. Consentono al sito di ricordare le tue azioni e preferenze (come la lingua scelta, la visualizzazione del tavolo o il consenso privacy) in modo da non doverle reinserire quando torni a navigare.
                </>
              ) : (
                <>
                  Cookies are compact data files transmitted to your browser by websites you visit. They allow our digital dining system to remember your preferences (such as selected language, assigned table session, and privacy consent state) across your visit without needing to repeatedly prompt you.
                </>
              )}
            </p>
          </section>

          {/* Section 2: Table of Cookies */}
          <section className="bg-white p-6 sm:p-8 border border-[#ba935a]/25 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1a1816] mb-4 flex items-center gap-2">
              <span className="text-[#ba935a]">02.</span>
              {isIt ? 'Tipologie di Cookie Utilizzati' : 'Types of Cookies We Use'}
            </h2>

            <div className="space-y-6">
              {/* Essential */}
              <div className="border-l-2 border-[#ba935a] pl-4">
                <div className="flex items-center gap-2 font-bold text-[#1a1816] text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#ba935a]" />
                  <h4>{isIt ? 'Cookie Strettamente Necessari (Essenziali)' : 'Strictly Necessary (Essential Cookies)'}</h4>
                </div>
                <p className="text-xs text-[#6e675e] mb-3">
                  {isIt
                    ? 'Indispensabili per il corretto funzionamento del sito, della lingua e della consultazione del menu al tavolo. Non possono essere disattivati.'
                    : 'Mandatory for core site functions, language state, and table ordering sessions. These cannot be switched off.'}
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border border-[#ba935a]/20">
                    <thead className="bg-[#faf7f2] font-serif uppercase tracking-wider text-[#1a1816]">
                      <tr>
                        <th className="p-2.5 border-b border-[#ba935a]/20">{isIt ? 'Nome' : 'Name'}</th>
                        <th className="p-2.5 border-b border-[#ba935a]/20">{isIt ? 'Finalità' : 'Purpose'}</th>
                        <th className="p-2.5 border-b border-[#ba935a]/20">{isIt ? 'Durata' : 'Duration'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ba935a]/10">
                      <tr>
                        <td className="p-2.5 font-mono text-[#ba935a]">casaItaliaLanguage</td>
                        <td className="p-2.5">{isIt ? 'Memorizza la preferenza della lingua (Italiano / Inglese)' : 'Stores chosen language preference (IT/EN)'}</td>
                        <td className="p-2.5">1 Anno</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono text-[#ba935a]">casa_italia_cookie_consent</td>
                        <td className="p-2.5">{isIt ? 'Memorizza la scelta del consenso ai cookie' : 'Stores the cookie consent status'}</td>
                        <td className="p-2.5">6 Mesi</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono text-[#ba935a]">__cf_bm / cf_clearance</td>
                        <td className="p-2.5">{isIt ? 'Sicurezza anti-bot e mitigazione DDoS Cloudflare' : 'Cloudflare edge security & bot mitigation'}</td>
                        <td className="p-2.5">Sessione / 30 min</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Functional & External */}
              <div className="border-l-2 border-[#4285F4] pl-4">
                <div className="flex items-center gap-2 font-bold text-[#1a1816] text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#4285F4]" />
                  <h4>{isIt ? 'Funzionali & Integrazioni Terze (Mappe & Recensioni)' : 'Functional & Third-Party Embeds'}</h4>
                </div>
                <p className="text-xs text-[#6e675e] mb-2">
                  {isIt
                    ? 'Attivati solo su richiesta dell\'utente quando si visualizza l\'anteprima della mappa interattiva di Google Maps o si naviga verso i portali ufficiali di TripAdvisor e WhatsApp.'
                    : 'Activated when exploring Google Maps interactive previews or navigating to official TripAdvisor and WhatsApp concierge links.'}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: How to manage */}
          <section className="bg-white p-6 sm:p-8 border border-[#ba935a]/25 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1a1816] mb-3 flex items-center gap-2">
              <span className="text-[#ba935a]">03.</span>
              {isIt ? 'Come Modificare o Disabilitare i Cookie' : 'Managing & Disabling Cookies'}
            </h2>
            <p className="mb-4">
              {isIt
                ? 'Puoi modificare le tue preferenze in qualsiasi momento cliccando sul pulsante sottostante o gestendo le impostazioni del tuo browser:'
                : 'You can update your cookie preferences at any time via the button below or via your browser settings:'}
            </p>

            <button
              onClick={handleOpenPreferences}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#faf7f2] border border-[#ba935a]/50 text-xs font-bold uppercase tracking-wider text-[#ba935a] shadow-sm transition-all cursor-pointer mb-6"
            >
              <Settings className="w-4 h-4" />
              <span>{isIt ? 'Apri Gestione Preferenze Cookie' : 'Open Cookie Settings Banner'}</span>
            </button>

            <h4 className="font-bold text-xs uppercase tracking-wider text-[#1a1816] mb-2">
              {isIt ? 'Istruzioni per i Principali Browser:' : 'Browser-Specific Instructions:'}
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#6e675e]">
              <li><strong>Google Chrome</strong>: Impostazioni &gt; Privacy e sicurezza &gt; Cookie e altri dati dei siti.</li>
              <li><strong>Apple Safari</strong>: Preferenze &gt; Privacy &gt; Blocca tutti i cookie.</li>
              <li><strong>Mozilla Firefox</strong>: Opzioni &gt; Privacy e sicurezza &gt; Cookie e dati dei siti web.</li>
              <li><strong>Microsoft Edge</strong>: Impostazioni &gt; Cookie e autorizzazioni del sito.</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
