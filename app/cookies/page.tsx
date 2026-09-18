import React from 'react';
import type { Metadata } from 'next';
import { CookiePolicyView } from '@/components/legal';

export const metadata: Metadata = {
  title: 'Politica sui Cookie',
  description:
    'Informativa dettagliata sull’uso dei cookie tecnici ed analitici utilizzati sul sito web di Casa Italia Ristorante a Porto Ghalib.',
  alternates: {
    canonical: '/cookies',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyPage() {
  return <CookiePolicyView />;
}
