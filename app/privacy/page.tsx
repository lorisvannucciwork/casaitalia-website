'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const isIt = language === 'it';

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
          <span className="text-[#ba935a]">{isIt ? 'Informativa Privacy' : 'Privacy Policy'}</span>
        </div>

        {/* Header Title Section */}
        <div className="border-b border-[#ba935a]/30 pb-8 mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1816] tracking-tight">
            {isIt ? 'Informativa sulla Privacy' : 'Privacy Policy'}
          </h1>
          <p className="mt-3 text-sm text-[#6e675e]">
            {isIt
              ? 'Ultimo aggiornamento: 12 Settembre 2026 • Casa Italia Ristorante, Porto Ghalib, Egitto'
              : 'Last Updated: September 12, 2026 • Casa Italia Ristorante, Porto Ghalib, Egypt'}
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-10 text-sm leading-relaxed text-[#4a453e]">
          {/* Section 1: Intro */}
          <section className="bg-white p-6 sm:p-8 border border-[#ba935a]/25 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1a1816] mb-3 flex items-center gap-2">
              <span className="text-[#ba935a]">01.</span>
              {isIt ? 'Titolare del Trattamento dei Dati' : 'Data Controller'}
            </h2>
            <p className="mb-4">
              {isIt ? (
                <>
                  La presente Informativa sulla Privacy descrive le modalità con cui <strong>Casa Italia Ristorante</strong> (&quot;noi&quot;, &quot;nostro&quot; o &quot;il Ristorante&quot;), situato nella Marina di Porto Ghalib, Governatorato del Mar Rosso, Egitto, raccoglie, utilizza, conserva e protegge le informazioni personali degli ospiti e dei visitatori del sito web e del menu digitale.
                </>
              ) : (
                <>
                  This Privacy Policy outlines how <strong>Casa Italia Ristorante</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;the Restaurant&quot;), situated at Porto Ghalib Marina, Red Sea Governorate, Egypt, collects, uses, retains, and protects personal information gathered through our website and digital dining platform.
                </>
              )}
            </p>
            <div className="bg-[#faf7f2] p-4 border-l-2 border-[#ba935a] text-xs text-[#6e675e] space-y-1">
              <p><strong>Casa Italia Ristorante</strong></p>
              <p>Marina Waterfront, Porto Ghalib, Marsa Alam, Red Sea, Egypt</p>
              <p>Email: <a href="mailto:info@casaitaliarestaurants.com" className="text-[#ba935a] underline">info@casaitaliarestaurants.com</a></p>
            </div>
          </section>

          {/* Section 2: Data Collected */}
          <section className="bg-white p-6 sm:p-8 border border-[#ba935a]/25 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1a1816] mb-3 flex items-center gap-2">
              <span className="text-[#ba935a]">02.</span>
              {isIt ? 'Dati Personali Raccolti' : 'Personal Data Collected'}
            </h2>
            <p className="mb-3">
              {isIt
                ? 'Raccogliamo unicamente i dati necessari per garantire un servizio gastronomico e di accoglienza d\'eccellenza:'
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
                <strong>{isIt ? 'Navigazione & Menu Digitale al Tavolo' : 'Digital Dining & QR Menu Interaction'}</strong>:{' '}
                {isIt
                  ? 'Identificativo del tavolo (quando viene scansionato il codice QR del tavolo), lingua di navigazione preferita e scelte del menu caricate.'
                  : 'Table identifier (when scanning table QR codes), preferred language token, and temporary menu session state.'}
              </li>
              <li>
                <strong>{isIt ? 'Dati Tecnici & Cookie' : 'Technical & Analytics Data'}</strong>:{' '}
                {isIt
                  ? 'Indirizzo IP anonimizzato, tipologia di dispositivo e browser, orari di visita, aggregati tramite la rete Cloudflare per garantire sicurezza e tempi di caricamento istantanei.'
                  : 'Anonymized IP telemetry, device/browser details, and aggregated traffic analytics powered by Cloudflare edge network for security and speed.'}
              </li>
            </ul>
          </section>

          {/* Section 3: Legal Basis & Purpose */}
          <section className="bg-white p-6 sm:p-8 border border-[#ba935a]/25 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1a1816] mb-3 flex items-center gap-2">
              <span className="text-[#ba935a]">03.</span>
              {isIt ? 'Finalità e Base Giuridica del Trattamento' : 'Purposes & Legal Grounds'}
            </h2>
            <p className="mb-3">
              {isIt ? 'I tuoi dati personali sono trattati in conformità all\'Art. 6 del GDPR per le seguenti finalità:' : 'Your personal data is processed under Article 6 of the GDPR for the following legitimate purposes:'}
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
          </section>

          {/* Section 4: Third Parties */}
          <section className="bg-white p-6 sm:p-8 border border-[#ba935a]/25 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1a1816] mb-3 flex items-center gap-2">
              <span className="text-[#ba935a]">04.</span>
              {isIt ? 'Servizi di Terze Parti' : 'Third-Party Services'}
            </h2>
            <p className="mb-3">
              {isIt
                ? 'Non vendiamo né cediamo mai i tuoi dati personali a soggetti terzi per scopi di marketing. I dati possono essere trattati tramite infrastrutture autorizzate:'
                : 'We never sell or monetize your personal data. Limited technical data may be processed via certified service providers:'}
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#6e675e]">
              <li><strong>Cloudflare Workers &amp; Edge</strong>: Hosting ad alte prestazioni, crittografia SSL/TLS e protezione DDoS.</li>
              <li><strong>Google Maps</strong>: Fornitura di mappe interattive e calcolo del percorso per raggiungere il ristorante a Porto Ghalib.</li>
              <li><strong>TripAdvisor</strong>: Collegamento al portale ufficiale delle recensioni verificate.</li>
              <li><strong>WhatsApp (Meta)</strong>: Canale diretto di messaggistica istantanea per l&apos;assistenza clienti e prenotazioni veloci.</li>
            </ul>
          </section>

          {/* Section 5: Your Rights */}
          <section className="bg-white p-6 sm:p-8 border border-[#ba935a]/25 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1a1816] mb-3 flex items-center gap-2">
              <span className="text-[#ba935a]">05.</span>
              {isIt ? 'I Tuoi Diritti (GDPR)' : 'Your Rights Under GDPR'}
            </h2>
            <p className="mb-3">
              {isIt
                ? 'Hai il pieno diritto di richiedere l\'accesso ai tuoi dati, la loro rettifica, la cancellazione (diritto all\'oblio), la limitazione del trattamento o la revoca del consenso in qualsiasi momento.'
                : 'You are entitled to request access to your personal data, rectification, complete erasure, restriction of processing, or withdrawal of consent at any time.'}
            </p>
            <p className="text-xs text-[#6e675e]">
              {isIt
                ? 'Per esercitare i tuoi diritti, puoi contattare la nostra direzione all\'indirizzo: '
                : 'To exercise any of these rights, please reach our management team at: '}
              <a href="mailto:info@casaitaliarestaurants.com" className="text-[#ba935a] font-bold underline">
                info@casaitaliarestaurants.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
