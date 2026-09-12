'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FileText, AlertCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsAndConditionsPage() {
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
          <span className="text-[#ba935a]">{isIt ? 'Termini & Condizioni' : 'Terms & Conditions'}</span>
        </div>

        {/* Header Title Section */}
        <div className="border-b border-[#ba935a]/30 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ba935a]/10 border border-[#ba935a]/30 text-[11px] font-bold uppercase tracking-widest text-[#ba935a] mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Casa Italia Ristorante</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1816] tracking-tight">
            {isIt ? 'Termini & Condizioni del Servizio' : 'Terms & Conditions of Service'}
          </h1>
          <p className="mt-3 text-sm text-[#6e675e]">
            {isIt
              ? 'Regolamento del ristorante, prenotazioni e utilizzo dei servizi digitali • Porto Ghalib, Egitto'
              : 'Restaurant dining policies, reservations, and digital services • Porto Ghalib, Egypt'}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm leading-relaxed text-[#4a453e]">
          {/* Section 1: Scope */}
          <section className="bg-white p-6 sm:p-8 border border-[#ba935a]/25 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1a1816] mb-3 flex items-center gap-2">
              <span className="text-[#ba935a]">01.</span>
              {isIt ? 'Premessa & Ambito di Applicazione' : 'General Scope & Acceptance'}
            </h2>
            <p>
              {isIt ? (
                <>
                  L&apos;accesso e l&apos;utilizzo dei servizi offerti da <strong>Casa Italia Ristorante</strong>, sia in loco presso la nostra sede nella Marina di Porto Ghalib sia tramite la piattaforma digitale (sito web, menu digitale per tavoli e tag NFC), sono regolati dai presenti Termini &amp; Condizioni. Effettuando una prenotazione, consultando il menu digitale o accedendo ai nostri locali, l&apos;ospite accetta integralmente le presenti disposizioni.
                </>
              ) : (
                <>
                  Access to and use of dining, reservation, and digital ordering platforms provided by <strong>Casa Italia Ristorante</strong> at Porto Ghalib Marina are governed by these Terms &amp; Conditions. By making a table reservation, viewing our digital menu, or dining with us, you agree to comply with and be bound by these policies.
                </>
              )}
            </p>
          </section>

          {/* Section 2: Reservations */}
          <section className="bg-white p-6 sm:p-8 border border-[#ba935a]/25 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1a1816] mb-3 flex items-center gap-2">
              <span className="text-[#ba935a]">02.</span>
              {isIt ? 'Politica di Prenotazione e Gestione Tavoli' : 'Reservation & Seating Policies'}
            </h2>
            <div className="space-y-3">
              <p>
                {isIt
                  ? 'Per offrire un servizio impeccabile e un\'atmosfera autentica, applichiamo le seguenti regole per i tavoli:'
                  : 'To ensure exceptional service standards and optimal waterfront seating, the following guidelines apply:'}
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>{isIt ? 'Tolleranza Oraria' : 'Grace Period'}</strong>:{' '}
                  {isIt
                    ? 'Le prenotazioni vengono mantenute per un massimo di 15 minuti dall\'orario concordato. In caso di mancata comunicazione di ritardo, il tavolo potrà essere riassegnato ad altri ospiti.'
                    : 'Table bookings are held for 15 minutes past the designated time. Beyond this window without prior notification, tables may be released to waiting guests.'}
                </li>
                <li>
                  <strong>{isIt ? 'Preferenza Tavoli Waterfront' : 'Waterfront & Marina Seating'}</strong>:{' '}
                  {isIt
                    ? 'Faremo il possibile per accomodare le richieste di tavoli fronte marina, tuttavia l\'assegnazione specifica dipende dalla disponibilità e dalle condizioni meteorologiche.'
                    : 'We endeavor to honor specific marina-view requests, though final seating arrangements remain subject to operational availability and sea breezes.'}
                </li>
                <li>
                  <strong>{isIt ? 'Gruppi Numerosi' : 'Large Parties & Private Events'}</strong>:{' '}
                  {isIt
                    ? 'Per gruppi superiori a 8 persone è gradita la prenotazione anticipata con conferma tramite WhatsApp o telefono.'
                    : 'For dining parties exceeding 8 guests, advance coordination via direct WhatsApp or phone concierge is required.'}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Allergens Disclaimer */}
          <section className="bg-white p-6 sm:p-8 border border-[#ba935a]/40 shadow-sm relative">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>{isIt ? 'Avvertenza Importante' : 'Critical Notice'}</span>
            </div>
            <h2 className="font-serif text-xl font-bold text-[#1a1816] mb-3 flex items-center gap-2">
              <span className="text-[#ba935a]">03.</span>
              {isIt ? 'Allergeni & Intolleranze Alimentari' : 'Allergens & Dietary Requirements'}
            </h2>
            <p className="mb-3">
              {isIt ? (
                <>
                  La nostra cucina prepara quotidianamente pasta fresca, frutti di mare del Mar Rosso, formaggi e prodotti artigianali italiani. Sebbene adottiamo rigorosi protocolli igienico-sanitari, <strong>non possiamo garantire la totale assenza di contaminazione crociata</strong> da glutine, crostacei, frutta a guscio o lattosio.
                </>
              ) : (
                <>
                  Our kitchen handles fresh pasta flour, Red Sea seafood, dairy, and artisanal Italian specialties daily. While we enforce strict separation and culinary hygiene standards, <strong>we cannot guarantee an absolute allergen-free environment</strong> against cross-contact.
                </>
              )}
            </p>
            <div className="bg-[#faf7f2] p-4 border-l-2 border-amber-600 text-xs text-[#5c5449]">
              <strong>{isIt ? 'Obbligo dell\'Ospite' : 'Guest Responsibility'}:</strong>{' '}
              {isIt
                ? 'È fatto espresso obbligo all\'ospite di comunicare tempestivamente al personale di sala qualsiasi allergia grave prima dell\'ordine.'
                : 'Guests are required to inform our floor staff of any severe allergies or medical dietary requirements prior to placing an order.'}
            </div>
          </section>

          {/* Section 4: Menu & Pricing */}
          <section className="bg-white p-6 sm:p-8 border border-[#ba935a]/25 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1a1816] mb-3 flex items-center gap-2">
              <span className="text-[#ba935a]">04.</span>
              {isIt ? 'Prezzi, Menu Digitale e Disponibilità' : 'Menu Pricing & Availability'}
            </h2>
            <p className="mb-3">
              {isIt
                ? 'I prezzi indicati nel menu digitale sono espressi in valuta locale (EGP) o con riferimento Euro per comodità degli ospiti internazionali. Le imposte applicabili e il servizio sono specificati in conformità alla normativa egiziana.'
                : 'Prices displayed on the digital menu reflect local currency (EGP) with clear international conversions. Government taxes and service charges comply with local statutory regulations.'}
            </p>
            <p className="text-xs text-[#6e675e]">
              {isIt
                ? 'La disponibilità del pescato del giorno e di specifici tagli di carne o vini DOCG può variare in base alla freschezza del mercato e alle importazioni settimanali dall\'Italia.'
                : 'Catch-of-the-day seafood and specialty Italian DOCG wine vintages remain subject to seasonal availability and direct imports.'}
            </p>
          </section>

          {/* Section 5: Intellectual Property & Governing Law */}
          <section className="bg-white p-6 sm:p-8 border border-[#ba935a]/25 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1a1816] mb-3 flex items-center gap-2">
              <span className="text-[#ba935a]">05.</span>
              {isIt ? 'Proprietà Intellettuale & Legge Applicabile' : 'Intellectual Property & Jurisdiction'}
            </h2>
            <p className="mb-3">
              {isIt
                ? 'Il marchio "Casa Italia", i loghi, la veste grafica, le fotografie del ristorante e i contenuti del menu sono di esclusiva proprietà del Ristorante e protetti dalle leggi sulla proprietà intellettuale.'
                : 'All trademarks, logos, visual identities, dish photography, and digital menu architectures are the exclusive intellectual property of Casa Italia.'}
            </p>
            <p className="text-xs text-[#6e675e]">
              {isIt
                ? 'I presenti termini sono regolati dalle leggi vigenti nel Governatorato del Mar Rosso, Repubblica Araba d\'Egitto. Per qualsiasi controversia, le parti faranno riferimento agli organi competenti locali.'
                : 'These terms are governed by the applicable laws of the Red Sea Governorate, Arab Republic of Egypt.'}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
