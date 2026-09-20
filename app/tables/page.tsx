import React from 'react';
import { Metadata } from 'next';
import { SITE_URL } from '@/config/site';
import { TablePortalView } from '@/components/table';
import { BreadcrumbJsonLd } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Portale Ospiti al Tavolo | Digital Menu & Wi-Fi',
  description:
    'Welcome to your table at Casa Italia Porto Ghalib Marina. Access the digital menu, connect to free guest Wi-Fi, and enjoy an authentic Italian dining experience with table service.',
  keywords: [
    'Casa Italia Tables',
    'Casa Italia Servizio Tavolo',
    'Porto Ghalib Restaurant Table',
    'Casa Italia QR Menu',
    'Porto Ghalib Digital Table',
    'Guest WiFi Casa Italia',
    'digital table menu Porto Ghalib',
    'QR code menu Italian restaurant',
    'table service Porto Ghalib',
    'contactless menu Red Sea restaurant',
    'restaurant WiFi Porto Ghalib',
    'smart dining Porto Ghalib',
  ],
  alternates: {
    canonical: '/tables',
    languages: {
      'it-IT': '/tables',
      'en-US': '/tables',
      'x-default': '/tables',
    },
  },
  openGraph: {
    title: 'Portale Ospiti al Tavolo | Casa Italia Porto Ghalib',
    description:
      'Digital table service, menu, and guest Wi-Fi at Casa Italia in Porto Ghalib Marina. Scan the QR code for the full Italian dining experience.',
    url: `${SITE_URL}/tables`,
    images: [
      {
        url: '/logo/logo-01.webp',
        width: 1200,
        height: 630,
        alt: 'Casa Italia Digital Table Experience - Porto Ghalib Marina',
        type: 'image/webp',
      },
    ],
  },
};

export default function TablesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Table Portal', url: `${SITE_URL}/tables` },
        ]}
      />
      <TablePortalView />
    </>
  );
}
