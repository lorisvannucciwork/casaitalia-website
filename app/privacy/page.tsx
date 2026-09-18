import React from 'react';
import type { Metadata } from 'next';
import { PrivacyPolicyView } from '@/components/legal';

export const metadata: Metadata = {
  title: 'Informativa sulla Privacy',
  description:
    'Informativa sul trattamento dei dati personali e sulla privacy per gli ospiti e visitatori di Casa Italia Ristorante a Porto Ghalib.',
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />;
}
