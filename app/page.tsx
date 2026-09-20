import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/config/site';
import { HomeView } from '@/components/home';

export const metadata: Metadata = {
  title: 'Casa Italia | Authentic Italian Restaurant & Wood-Fired Pizza in Porto Ghalib',
  description:
    'Welcome to Casa Italia in Porto Ghalib Marina, Red Sea. Enjoy authentic handmade pasta, wood-fired Neapolitan pizza, Angus charcoal steaks, fresh seafood, and fine Italian wines. Family-owned Italian restaurant open daily 12 PM – 11:30 PM.',
  keywords: [
    'Casa Italia Porto Ghalib',
    'Italian restaurant Porto Ghalib',
    'Porto Ghalib restaurants',
    'Best Italian food Marsa Alam',
    'Wood fired pizza Porto Ghalib',
    'Fresh pasta Red Sea',
    'Porto Ghalib Marina dinner',
    'Cucina Italiana Port Ghalib',
    'authentic Italian restaurant Egypt',
    'best pizza Red Sea',
    'romantic dinner Porto Ghalib Marina',
    'family restaurant Porto Ghalib',
    'Italian wine Red Sea',
    'charcoal steak Porto Ghalib',
    'seafood Porto Ghalib',
    'where to eat in Porto Ghalib',
    'waterfront restaurant Marsa Alam',
    'fine dining Red Sea Egypt',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'it-IT': '/',
      'en-US': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'Casa Italia | Authentic Italian Dining in Porto Ghalib Marina',
    description:
      'Artisanal handmade pasta, wood-fired Neapolitan pizza, Angus steaks, fresh Red Sea seafood, and fine Italian wines. Family-owned since 2023 at Porto Ghalib Marina.',
    url: SITE_URL,
    images: [
      {
        url: '/logo/logo-01.webp',
        width: 1200,
        height: 630,
        alt: 'Casa Italia Ristorante - Authentic Italian Restaurant at Porto Ghalib Marina',
        type: 'image/webp',
      },
    ],
  },
};

export default function Home() {
  return <HomeView />;
}
