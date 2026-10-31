import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/config/site';
import { ReservationView } from '@/components/reservations';
import { BreadcrumbJsonLd } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Prenota un Tavolo | Book a Table',
  description:
    'Book your table at Casa Italia in Porto Ghalib Marina online: choose the day, the time and indoor or outdoor seating. Instant confirmation.',
  keywords: [
    'Casa Italia reservation',
    'Book a table Porto Ghalib',
    'Prenota tavolo Casa Italia',
    'Italian restaurant booking Port Ghalib',
    'Marsa Alam restaurant reservation',
  ],
  alternates: {
    canonical: '/reservations',
    languages: {
      'it-IT': '/reservations',
      'en-US': '/reservations',
      'x-default': '/reservations',
    },
  },
  openGraph: {
    title: 'Book a Table | Casa Italia Porto Ghalib',
    description: 'Reserve your table at Casa Italia, on the waterfront of Porto Ghalib Marina.',
    url: `${SITE_URL}/reservations`,
    images: [
      {
        url: '/logo/logo-01.webp',
        width: 1200,
        height: 630,
        alt: 'Casa Italia - Book a Table',
        type: 'image/webp',
      },
    ],
  },
};

export default function ReservationsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Book a Table', url: `${SITE_URL}/reservations` },
        ]}
      />
      <ReservationView />
    </>
  );
}
