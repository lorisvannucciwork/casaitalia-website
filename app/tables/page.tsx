import React from 'react';
import { Metadata } from 'next';
import { MedalView } from '@/components/medal';

export const metadata: Metadata = {
  title: 'Servizio Tavolo & Social Hub',
  description:
    'Benvenuti al vostro tavolo a Casa Italia Porto Ghalib Marina. Esplorate il menu digitale, collegatevi al Wi-Fi ospiti, chiamate il servizio e condividete la vostra recensione.',
  keywords: [
    'Casa Italia Tables',
    'Casa Italia Servizio Tavolo',
    'Porto Ghalib Restaurant Table',
    'Casa Italia QR Menu',
    'Porto Ghalib Digital Table',
  ],
  alternates: {
    canonical: '/tables',
  },
  openGraph: {
    title: 'Servizio Tavolo & Social Hub | Casa Italia Porto Ghalib',
    description:
      'Digital table service, menu, and guest experience at Casa Italia in Porto Ghalib Marina.',
    url: 'https://casaitaliarestaurants.com/tables',
    images: [
      {
        url: '/logo/logo-01.webp',
        width: 1200,
        height: 630,
        alt: 'Casa Italia Table Experience - Porto Ghalib',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servizio Tavolo & Social Hub | Casa Italia Porto Ghalib',
    description:
      'Digital dining menu, guest Wi-Fi, and table service at Casa Italia Porto Ghalib Marina.',
    images: ['/logo/logo-01.webp'],
  },
};

export default function TablesPage() {
  return <MedalView />;
}
