'use client';

import React from 'react';
import { Settings } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LegalPageLayout } from './LegalPageLayout';
import { LegalSectionCard } from './LegalSectionCard';
import { CookieTable } from './CookieTable';

export interface CookiePolicyViewProps {
  className?: string;
}

export const CookiePolicyView: React.FC<CookiePolicyViewProps> = () => {
  const { language } = useLanguage();
  const isIt = language === 'it';

  const handleOpenPreferences = () => {
    if (typeof window !== 'undefined' && window.openCookiePreferences) {
      window.openCookiePreferences();
    }
  };

  const title = isIt ? 'Informativa sui Cookie' : 'Cookie Policy';
  const lastUpdated = isIt
    ? 'Come utilizziamo i cookie e come gestire le tue preferenze • Casa Italia'
    : 'How we use cookies and how to manage your privacy choices • Casa Italia';

  const headerAction = (
    <button
      type="button"
      onClick={handleOpenPreferences}
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#ba935a] to-[#a37f48] hover:from-[#c8a165] hover:to-[#ba935a] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer shrink-0"
    >
      <Settings className="w-3.5 h-3.5" />
      <span>{isIt ? 'Modifica Preferenze' : 'Cookie Settings'}</span>
    </button>
  );

  return (
    <LegalPageLayout title={title} lastUpdated={lastUpdated} headerAction={headerAction}>
      {/* Section 1: What are cookies */}
      <LegalSectionCard
        number="01"
        title={isIt ? 'Cosa sono i Cookie?' : 'What are Cookies?'}
      >
        <p>
          {isIt ? (
            <>
              I cookie sono piccoli file di testo che i siti web visitati inviano al tuo dispositivo
              (computer, smartphone o tablet), dove vengono memorizzati per essere ritrasmessi agli
              stessi siti alla visita successiva. Consentono al sito di ricordare le tue azioni e
              preferenze (come la lingua scelta, la visualizzazione del tavolo o il consenso
              privacy) in modo da non doverle reinserire quando torni a navigare.
            </>
          ) : (
            <>
              Cookies are compact data files transmitted to your browser by websites you visit. They
              allow our digital dining system to remember your preferences (such as selected
              language, assigned table session, and privacy consent state) across your visit without
              needing to repeatedly prompt you.
            </>
          )}
        </p>
      </LegalSectionCard>

      {/* Section 2: Table of Cookies */}
      <LegalSectionCard
        number="02"
        title={isIt ? 'Tipologie di Cookie Utilizzati' : 'Types of Cookies We Use'}
      >
        <div className="space-y-6">
          {/* Essential */}
          <div className="border-l-2 border-[#ba935a] pl-4">
            <h4 className="font-bold text-[#1a1816] text-sm mb-1">
              {isIt
                ? 'Cookie Strettamente Necessari (Essenziali)'
                : 'Strictly Necessary (Essential Cookies)'}
            </h4>
            <p className="text-xs text-[#6e675e] mb-3">
              {isIt
                ? 'Indispensabili per il corretto funzionamento del sito, della lingua e della consultazione del menu al tavolo. Non possono essere disattivati.'
                : 'Mandatory for core site functions, language state, and table ordering sessions. These cannot be switched off.'}
            </p>

            <CookieTable />
          </div>

          {/* Functional & External */}
          <div className="border-l-2 border-[#4285F4] pl-4">
            <h4 className="font-bold text-[#1a1816] text-sm mb-1">
              {isIt
                ? 'Funzionali & Integrazioni Terze (Mappe & Recensioni)'
                : 'Functional & Third-Party Embeds'}
            </h4>
            <p className="text-xs text-[#6e675e] mb-2">
              {isIt
                ? 'Attivati solo su richiesta dell’utente quando si visualizza l’anteprima della mappa interattiva di Google Maps o si naviga verso i portali ufficiali di TripAdvisor e WhatsApp.'
                : 'Activated when exploring Google Maps interactive previews or navigating to official TripAdvisor and WhatsApp concierge links.'}
            </p>
          </div>
        </div>
      </LegalSectionCard>

      {/* Section 3: How to manage */}
      <LegalSectionCard
        number="03"
        title={isIt ? 'Come Modificare o Disabilitare i Cookie' : 'Managing & Disabling Cookies'}
      >
        <p className="mb-4">
          {isIt
            ? 'Puoi modificare le tue preferenze in qualsiasi momento cliccando sul pulsante sottostante o gestendo le impostazioni del tuo browser:'
            : 'You can update your cookie preferences at any time via the button below or via your browser settings:'}
        </p>

        <button
          type="button"
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
          <li>
            <strong>Google Chrome</strong>: Impostazioni &gt; Privacy e sicurezza &gt; Cookie e altri dati dei siti.
          </li>
          <li>
            <strong>Apple Safari</strong>: Preferenze &gt; Privacy &gt; Blocca tutti i cookie.
          </li>
          <li>
            <strong>Mozilla Firefox</strong>: Opzioni &gt; Privacy e sicurezza &gt; Cookie e dati dei siti web.
          </li>
          <li>
            <strong>Microsoft Edge</strong>: Impostazioni &gt; Cookie e autorizzazioni del sito.
          </li>
        </ul>
      </LegalSectionCard>
    </LegalPageLayout>
  );
};
