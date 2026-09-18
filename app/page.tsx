import React from 'react';
import type { Metadata } from 'next';
import { HomeView } from '@/components/home';

export const metadata: Metadata = {
  title: 'Casa Italia | Authentic Italian Restaurant & Wood-Fired Pizza in Porto Ghalib',
  description:
    'Welcome to Casa Italia in Porto Ghalib Marina, Red Sea. Enjoy authentic handmade pasta, wood-fired Neapolitan pizza, Angus charcoal steaks, fresh seafood, and fine Italian wines.',
  keywords: [
    'Casa Italia Porto Ghalib',
    'Italian restaurant Porto Ghalib',
    'Porto Ghalib restaurants',
    'Best Italian food Marsa Alam',
    'Wood fired pizza Porto Ghalib',
    'Fresh pasta Red Sea',
    'Porto Ghalib Marina dinner',
    'Cucina Italiana Port Ghalib',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Casa Italia | Authentic Italian Dining in Porto Ghalib Marina',
    description:
      'Artisanal handmade pasta, wood-fired Neapolitan pizza, Angus steaks, and fine Italian wines in the heart of Porto Ghalib Marina.',
    url: 'https://casaitaliarestaurants.com',
    images: [
      {
        url: '/logo/logo-01.webp',
        width: 1200,
        height: 630,
        alt: 'Casa Italia Ristorante - Porto Ghalib',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casa Italia | Authentic Italian Restaurant in Porto Ghalib',
    description:
      'Artisanal handmade pasta, wood-fired pizza & fine Italian dining at Porto Ghalib Marina, Red Sea.',
    images: ['/logo/logo-01.webp'],
  },
};

export default function Home() {
  return <HomeView />;
}
