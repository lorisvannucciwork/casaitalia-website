import React from 'react';
import { Metadata } from 'next';
import { SITE_URL } from '@/config/site';
import { MedalView } from '@/components/medal';
import { BreadcrumbJsonLd } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Medaglia & Recensioni | Reviews & Social',
  description:
    'Connect with Casa Italia Ristorante in Porto Ghalib Marina. Leave a review on Google Maps or TripAdvisor, follow us on Instagram, TikTok & Facebook, or contact our team via WhatsApp.',
  keywords: [
    'Casa Italia reviews',
    'Casa Italia Porto Ghalib reviews',
    'Casa Italia TripAdvisor',
    'Casa Italia Google Maps',
    'Italian restaurant reviews Porto Ghalib',
    'Casa Italia Instagram',
    'Casa Italia TikTok',
    'Casa Italia Facebook',
    'Porto Ghalib restaurant reviews',
    'Marsa Alam restaurant rating',
    'best rated restaurant Porto Ghalib',
    'Casa Italia contact WhatsApp',
  ],
  alternates: {
    canonical: '/medal',
    languages: {
      'it-IT': '/medal',
      'en-US': '/medal',
      'x-default': '/medal',
    },
  },
  openGraph: {
    title: 'Medaglia & Recensioni | Casa Italia Porto Ghalib',
    description:
      'Leave a review on Google Maps or TripAdvisor and connect with Casa Italia in Porto Ghalib Marina. Follow us on Instagram, TikTok & Facebook.',
    url: `${SITE_URL}/medal`,
    images: [
      {
        url: '/logo/logo-01.webp',
        width: 1200,
        height: 630,
        alt: 'Casa Italia Reviews & Social Hub - Porto Ghalib',
        type: 'image/webp',
      },
    ],
  },
};

export default function MedalPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Reviews & Social', url: `${SITE_URL}/medal` },
        ]}
      />
      <MedalView />
    </>
  );
}
