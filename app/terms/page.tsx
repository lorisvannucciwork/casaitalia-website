import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/config/site';
import { TermsView } from '@/components/legal';
import { BreadcrumbJsonLd } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Termini e Condizioni di Servizio',
  description:
    'Termini e condizioni generali per i servizi di ristorazione, prenotazioni e utilizzo del sito web di Casa Italia Ristorante a Porto Ghalib. Incluse policy di cancellazione e regole di utilizzo.',
  keywords: [
    'Casa Italia terms conditions',
    'terms of service Porto Ghalib restaurant',
    'termini condizioni ristorante',
    'restaurant terms of use',
    'Casa Italia booking terms',
  ],
  alternates: {
    canonical: '/terms',
    languages: {
      'it-IT': '/terms',
      'en-US': '/terms',
      'x-default': '/terms',
    },
  },
  openGraph: {
    title: 'Termini e Condizioni | Casa Italia Ristorante',
    description:
      'Termini e condizioni di servizio di Casa Italia Ristorante a Porto Ghalib.',
    url: `${SITE_URL}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Terms & Conditions', url: `${SITE_URL}/terms` },
        ]}
      />
      <TermsView />
    </>
  );
}
