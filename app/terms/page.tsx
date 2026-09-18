import React from 'react';
import type { Metadata } from 'next';
import { TermsView } from '@/components/legal';

export const metadata: Metadata = {
  title: 'Termini e Condizioni di Servizio',
  description:
    'Termini e condizioni generali per i servizi di ristorazione, prenotazioni e utilizzo del sito web di Casa Italia a Porto Ghalib.',
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditionsPage() {
  return <TermsView />;
}
