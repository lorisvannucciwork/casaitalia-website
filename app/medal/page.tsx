import React from 'react';
import { Metadata } from 'next';
import { MedalView } from '@/components/medal';

export const metadata: Metadata = {
  title: 'Medaglia & Recensioni',
  description:
    'Connect with Casa Italia Ristorante in Porto Ghalib Marina. Leave a review on Google Maps or TripAdvisor, follow our official social channels, or contact our team.',
  alternates: {
    canonical: '/medal',
  },
  openGraph: {
    title: 'Medaglia & Recensioni | Casa Italia Porto Ghalib',
    description:
      'Leave a review on Google Maps or TripAdvisor and connect with Casa Italia in Porto Ghalib Marina.',
    url: 'https://casaitaliarestaurants.com/medal',
    images: [
      {
        url: '/logo/logo-01.webp',
        width: 1200,
        height: 630,
        alt: 'Casa Italia Reviews & Social Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medaglia & Recensioni | Casa Italia Porto Ghalib',
    description:
      'Connect with Casa Italia in Porto Ghalib Marina and share your dining experience.',
    images: ['/logo/logo-01.webp'],
  },
};

export default function MedalPage() {
  return <MedalView />;
}
