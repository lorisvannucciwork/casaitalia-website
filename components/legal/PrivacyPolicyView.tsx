'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LegalPageLayout } from './LegalPageLayout';
import { LegalSectionCard } from './LegalSectionCard';
import { LegalNoticeCard } from './LegalNoticeCard';

export interface PrivacyPolicyViewProps {
  className?: string;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = () => {
  const { language } = useLanguage();
  const isIt = language === 'it';

  const title = isIt ? 'Informativa sulla Privacy' : 'Privacy Policy';
  const lastUpdated = isIt
    ? 'Ultimo aggiornamento: 12 Settembre 2026 • Casa Italia Ristorante, Porto Ghalib, Egitto'
    : 'Last Updated: September 12, 2026 • Casa Italia Ristorante, Porto Ghalib, Egypt';

  return (
    <LegalPageLayout title={title} lastUpdated={lastUpdated}>

      <LegalSectionCard
        number="01"
        title={isIt ? 'Titolare del Trattamento dei Dati' : 'Data Controller'}
      >
        <p>
          {isIt ? (
            <>
              La presente Informativa sulla Privacy descrive le modalità con cui{' '}
              <strong>Casa Italia Ristorante</strong> (&quot;noi&quot;, &quot;nostro&quot; o &quot;il
              Ristorante&quot;), situato nella Marina di Porto Ghalib, Governatorato del Mar Rosso,
              Egitto, raccoglie, utilizza, conserva e protegge le informazioni personali degli ospiti
              e dei visitatori del sito web e del menu digitale.
            </>
          ) : (
            <>
              This Privacy Policy outlines how <strong>Casa Italia Ristorante</strong> (&quot;we&quot;,
              &quot;us&quot;, or &quot;the Restaurant&quot;), situated at Porto Ghalib Marina, Red
              Sea Governorate, Egypt, collects, uses, retains, and protects personal information
              gathered through our website and digital dining platform.
            </>
          )}
        </p>
        <LegalNoticeCard>
          <p>
            <strong>Casa Italia Ristorante</strong>
          </p>
          <p>Marina Waterfront, Porto Ghalib, Marsa Alam, Red Sea, Egypt</p>
          <p>
            Email:{' '}
            <a href="mailto:info@casaitaliarestaurants.com" className="text-[#ba935a] underline">
              info@casaitaliarestaurants.com
            </a>
          </p>
        </LegalNoticeCard>
      </LegalSectionCard>

      <LegalSectionCard
        number="02"
        title={isIt ? 'Dati Personali Raccolti' : 'Personal Data Collected'}
      >
        <p>
          {isIt
            ? 'Raccogliamo unicamente i dati necessari per garantire un servizio gastronomico e di accoglienza d’eccellenza:'
            : 'We collect only the data necessary to provide an authentic, high-standard hospitality experience:'}
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>{isIt ? 'Prenotazioni & Concierge' : 'Reservations & Concierge'}</strong>:{' '}
            {isIt
              ? 'Nome, cognome, numero di telefono (WhatsApp), data e orario desiderati, preferenze sul tavolo e segnalazioni di intolleranze o allergie alimentari.'
              : 'Name, contact telephone number (WhatsApp), requested dining time, table preferences, and dietary or allergen requirements.'}
          </li>
          <li>
            <strong>
              {isIt ? 'Navigazione & Menu Digitale al Tavolo' : 'Digital Dining & QR Menu Interaction'}
            </strong>
            :{' '}
            {isIt
              ? 'Identificativo del tavolo (quando viene scansionato il codice QR del tavolo), lingua di navigazione preferita e scelte del menu caricate.'
              : 'Table identifier (when scanning table QR codes), preferred language token, and temporary menu session state.'}
          </li>
          <li>
            <strong>
              {isIt ? 'Progressive Web App (PWA) & Memoria Locale' : 'Progressive Web App (PWA) & Local Cache'}
            </strong>
            :{' '}
            {isIt
              ? 'Archiviazione locale (Cache Storage e Local Storage) sul tuo dispositivo per garantire la consultazione offline del menu e ricordare lo stato dell’App, senza raccolta di dati personali traccianti.'
              : 'Local browser cache (Cache Storage & Local Storage) enabling offline culinary menu browsing and remembering app preferences with zero invasive tracking.'}
          </li>
          <li>
            <strong>{isIt ? 'Dati Tecnici & Cookie' : 'Technical & Analytics Data'}</strong>:{' '}
            {isIt
              ? 'Indirizzo IP anonimizzato, tipologia di dispositivo e browser, orari di visita, aggregati tramite la rete Cloudflare per garantire sicurezza e tempi di caricamento istantanei.'
              : 'Anonymized IP telemetry, device/browser details, and aggregated traffic analytics powered by Cloudflare edge network for security and speed.'}
          </li>
        </ul>
      </LegalSectionCard>

      <LegalSectionCard
        number="03"
        title={isIt ? 'Finalità e Base Giuridica del Trattamento' : 'Purposes & Legal Grounds'}
      >
        <p>
          {isIt
            ? 'I tuoi dati personali sono trattati in conformità all’Art. 6 del GDPR per le seguenti finalità:'
            : 'Your personal data is processed under Article 6 of the GDPR for the following legitimate purposes:'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-[#faf7f2] border border-[#ba935a]/20">
            <h4 className="font-bold text-[#1a1816] text-xs uppercase tracking-wider mb-1">
              {isIt ? 'Esecuzione del Servizio' : 'Service Delivery'}
            </h4>
            <p className="text-xs text-[#6e675e]">
              {isIt
                ? 'Gestire prenotazioni, conferme dei tavoli, accoglienza e personalizzazione gastronomica.'
                : 'Managing table bookings, confirmation notifications, hospitality, and culinary personalization.'}
            </p>
          </div>

          <div className="p-4 bg-[#faf7f2] border border-[#ba935a]/20">
            <h4 className="font-bold text-[#1a1816] text-xs uppercase tracking-wider mb-1">
              {isIt ? 'Salute & Sicurezza Alimentare' : 'Health & Food Safety'}
            </h4>
            <p className="text-xs text-[#6e675e]">
              {isIt
                ? 'Comunicare alla cucina allergeni, intolleranze o regimi alimentari speciali.'
                : 'Relaying severe allergens, celiac requests, or dietary constraints to our executive chef.'}
            </p>
          </div>

          <div className="p-4 bg-[#faf7f2] border border-[#ba935a]/20">
            <h4 className="font-bold text-[#1a1816] text-xs uppercase tracking-wider mb-1">
              {isIt ? 'Sicurezza Informatica' : 'Infrastructure Security'}
            </h4>
            <p className="text-xs text-[#6e675e]">
              {isIt
                ? 'Protezione contro frodi, attacchi DDoS e abusi sulla nostra piattaforma digitale.'
                : 'Preventing bot attacks, DDoS interference, and securing our digital ordering network.'}
            </p>
          </div>

          <div className="p-4 bg-[#faf7f2] border border-[#ba935a]/20">
            <h4 className="font-bold text-[#1a1816] text-xs uppercase tracking-wider mb-1">
              {isIt ? 'Consenso Esplicito' : 'Explicit Consent'}
            </h4>
            <p className="text-xs text-[#6e675e]">
              {isIt
                ? 'Gestione delle preferenze dei cookie non essenziali e interazioni esterne (es. mappe, recensioni).'
                : 'Managing cookie consent preferences and third-party embeds (interactive maps, reviews).'}
            </p>
          </div>
        </div>
      </LegalSectionCard>

      <LegalSectionCard
        number="04"
        title={isIt ? 'Servizi di Terze Parti' : 'Third-Party Services'}
      >
        <p>
          {isIt
            ? 'Non vendiamo né cediamo mai i tuoi dati personali a soggetti terzi per scopi di marketing. I dati possono essere trattati tramite infrastrutture autorizzate:'
            : 'We never sell or monetize your personal data. Limited technical data may be processed via certified service providers:'}
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#6e675e]">
          <li>
            <strong>Cloudflare Workers, D1 &amp; Edge</strong>: Hosting ad alte prestazioni, crittografia SSL/TLS, database D1 distribuito e protezione DDoS globale.
          </li>
          <li>
            <strong>Cloudflare Web Analytics</strong>: Statistiche di navigazione anonime e aggregate senza l&apos;uso di cookie traccianti e senza profilazione personale.
          </li>
          <li>
            <strong>Upstash Redis</strong>: Analisi in transito degli indirizzi IP per rate-limiting e mitigazione automatica di abusi o sovraccarichi delle API.
          </li>
          <li>
            <strong>Google Maps</strong>: Fornitura di mappe interattive e calcolo del percorso per raggiungere il ristorante a Porto Ghalib.
          </li>
          <li>
            <strong>TripAdvisor</strong>: Collegamento al portale ufficiale delle recensioni verificate.
          </li>
          <li>
            <strong>WhatsApp (Meta)</strong>: Canale diretto di messaggistica istantanea per l’assistenza clienti e prenotazioni veloci.
          </li>
        </ul>
      </LegalSectionCard>

      <LegalSectionCard
        number="05"
        title={isIt ? 'I Tuoi Diritti (GDPR)' : 'Your Rights Under GDPR'}
      >
        <p>
          {isIt
            ? 'Hai il pieno diritto di richiedere l’accesso ai tuoi dati, la loro rettifica, la cancellazione (diritto all’oblio), la limitazione del trattamento o la revoca del consenso in qualsiasi momento.'
            : 'You are entitled to request access to your personal data, rectification, complete erasure, restriction of processing, or withdrawal of consent at any time.'}
        </p>
        <p className="text-xs text-[#6e675e]">
          {isIt
            ? 'Per esercitare i tuoi diritti, puoi contattare la nostra direzione all’indirizzo: '
            : 'To exercise any of these rights, please reach our management team at: '}
          <a
            href="mailto:info@casaitaliarestaurants.com"
            className="text-[#ba935a] font-bold underline"
          >
            info@casaitaliarestaurants.com
          </a>
        </p>
      </LegalSectionCard>
    </LegalPageLayout>
  );
};
