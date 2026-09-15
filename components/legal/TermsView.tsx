'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LegalPageLayout } from './LegalPageLayout';
import { LegalSectionCard } from './LegalSectionCard';
import { LegalNoticeCard } from './LegalNoticeCard';

export interface TermsViewProps {
  className?: string;
}

export const TermsView: React.FC<TermsViewProps> = () => {
  const { language } = useLanguage();
  const isIt = language === 'it';

  const title = isIt ? 'Termini & Condizioni del Servizio' : 'Terms & Conditions of Service';
  const lastUpdated = isIt
    ? 'Regolamento del ristorante, prenotazioni e utilizzo dei servizi digitali • Porto Ghalib, Egitto'
    : 'Restaurant dining policies, reservations, and digital services • Porto Ghalib, Egypt';

  return (
    <LegalPageLayout title={title} lastUpdated={lastUpdated}>
      {/* Section 1: General Scope */}
      <LegalSectionCard
        number="01"
        title={isIt ? 'Premessa & Ambito di Applicazione' : 'General Scope & Acceptance'}
      >
        <p>
          {isIt ? (
            <>
              L&apos;accesso e l&apos;utilizzo dei servizi offerti da{' '}
              <strong>Casa Italia Ristorante</strong>, sia in loco presso la nostra sede nella
              Marina di Porto Ghalib sia tramite la piattaforma digitale (sito web e menu digitale
              per tavoli), sono regolati dai presenti Termini &amp; Condizioni. Effettuando una
              prenotazione, consultando il menu digitale o accedendo ai nostri locali, l&apos;ospite
              accetta integralmente le presenti disposizioni.
            </>
          ) : (
            <>
              Access to and use of dining, reservation, and digital ordering platforms provided by{' '}
              <strong>Casa Italia Ristorante</strong> at Porto Ghalib Marina are governed by these
              Terms &amp; Conditions. By making a table reservation, viewing our digital menu, or
              dining with us, you agree to comply with and be bound by these policies.
            </>
          )}
        </p>
      </LegalSectionCard>

      {/* Section 2: Reservation & Seating Policies */}
      <LegalSectionCard
        number="02"
        title={isIt ? 'Politica di Prenotazione e Gestione Tavoli' : 'Reservation & Seating Policies'}
      >
        <p>
          {isIt
            ? 'Per offrire un servizio impeccabile e un’atmosfera autentica, applichiamo le seguenti regole per i tavoli:'
            : 'To ensure exceptional service standards and optimal waterfront seating, the following guidelines apply:'}
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>{isIt ? 'Tolleranza Oraria' : 'Grace Period'}</strong>:{' '}
            {isIt
              ? 'Le prenotazioni vengono mantenute per un massimo di 15 minuti dall’orario concordato. In caso di mancata comunicazione di ritardo, il tavolo potrà essere riassegnato ad altri ospiti.'
              : 'Table bookings are held for 15 minutes past the designated time. Beyond this window without prior notification, tables may be released to waiting guests.'}
          </li>
          <li>
            <strong>{isIt ? 'Preferenza Tavoli Waterfront' : 'Waterfront & Marina Seating'}</strong>:{' '}
            {isIt
              ? 'Faremo il possibile per accomodare le richieste di tavoli fronte marina, tuttavia l’assegnazione specifica dipende dalla disponibilità e dalle condizioni meteorologiche.'
              : 'We endeavor to honor specific marina-view requests, though final seating arrangements remain subject to operational availability and sea breezes.'}
          </li>
          <li>
            <strong>{isIt ? 'Gruppi Numerosi' : 'Large Parties & Private Events'}</strong>:{' '}
            {isIt
              ? 'Per gruppi superiori a 8 persone è gradita la prenotazione anticipata con conferma tramite WhatsApp o telefono.'
              : 'For dining parties exceeding 8 guests, advance coordination via direct WhatsApp or phone concierge is required.'}
          </li>
        </ul>
      </LegalSectionCard>

      {/* Section 3: Allergens & Dietary Requirements */}
      <LegalSectionCard
        number="03"
        title={isIt ? 'Allergeni & Intolleranze Alimentari' : 'Allergens & Dietary Requirements'}
      >
        <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          <span>{isIt ? 'Avvertenza Importante' : 'Critical Notice'}</span>
        </div>
        <p>
          {isIt ? (
            <>
              La nostra cucina prepara quotidianamente pasta fresca, frutti di mare del Mar Rosso,
              formaggi e prodotti artigianali italiani. Sebbene adottiamo rigorosi protocolli
              igienico-sanitari,{' '}
              <strong>non possiamo garantire la totale assenza di contaminazione crociata</strong> da
              glutine, crostacei, frutta a guscio o lattosio.
            </>
          ) : (
            <>
              Our kitchen handles fresh pasta flour, Red Sea seafood, dairy, and artisanal Italian
              specialties daily. While we enforce strict separation and culinary hygiene standards,{' '}
              <strong>we cannot guarantee an absolute allergen-free environment</strong> against
              cross-contact.
            </>
          )}
        </p>
        <LegalNoticeCard variant="amber">
          <strong>{isIt ? 'Obbligo dell’Ospite' : 'Guest Responsibility'}:</strong>{' '}
          {isIt
            ? 'È fatto espresso obbligo all’ospite di comunicare tempestivamente al personale di sala qualsiasi allergia grave prima dell’ordine.'
            : 'Guests are required to inform our floor staff of any severe allergies or medical dietary requirements prior to placing an order.'}
        </LegalNoticeCard>
      </LegalSectionCard>

      {/* Section 4: Menu Pricing & Availability */}
      <LegalSectionCard
        number="04"
        title={isIt ? 'Prezzi, Menu Digitale e Disponibilità' : 'Menu Pricing & Availability'}
      >
        <p>
          {isIt
            ? 'I prezzi indicati nel menu digitale sono espressi in valuta locale (EGP) o con riferimento Euro per comodità degli ospiti internazionali. Le imposte applicabili e il servizio sono specificati in conformità alla normativa egiziana.'
            : 'Prices displayed on the digital menu reflect local currency (EGP) with clear international conversions. Government taxes and service charges comply with local statutory regulations.'}
        </p>
        <p className="text-xs text-[#6e675e]">
          {isIt
            ? 'La disponibilità del pescato del giorno e di specifici tagli di carne o vini DOCG può variare in base alla freschezza del mercato e alle importazioni settimanali dall’Italia.'
            : 'Catch-of-the-day seafood and specialty Italian DOCG wine vintages remain subject to seasonal availability and direct imports.'}
        </p>
      </LegalSectionCard>

      {/* Section 5: Intellectual Property */}
      <LegalSectionCard
        number="05"
        title={isIt ? 'Proprietà Intellettuale & Legge Applicabile' : 'Intellectual Property & Jurisdiction'}
      >
        <p>
          {isIt
            ? 'Il marchio "Casa Italia", i loghi, la veste grafica, le fotografie del ristorante e i contenuti del menu sono di esclusiva proprietà del Ristorante e protetti dalle leggi sulla proprietà intellettuale.'
            : 'All trademarks, logos, visual identities, dish photography, and digital menu architectures are the exclusive intellectual property of Casa Italia.'}
        </p>
        <p className="text-xs text-[#6e675e]">
          {isIt
            ? 'I presenti termini sono regolati dalle leggi vigenti nel Governatorato del Mar Rosso, Repubblica Araba d’Egitto. Per qualsiasi controversia, le parti faranno riferimento agli organi competenti locali.'
            : 'These terms are governed by the applicable laws of the Red Sea Governorate, Arab Republic of Egypt.'}
        </p>
      </LegalSectionCard>
    </LegalPageLayout>
  );
};
