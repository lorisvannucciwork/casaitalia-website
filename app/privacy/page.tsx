import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/config/site';
import { PrivacyPolicyView } from '@/components/legal';
import { BreadcrumbJsonLd } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Informativa sulla Privacy',
  description:
    'Informativa sul trattamento dei dati personali e sulla privacy per gli ospiti e visitatori di Casa Italia Ristorante a Porto Ghalib. Conforme al GDPR e alle normative egiziane sulla protezione dei dati.',
  keywords: [
    'Casa Italia privacy policy',
    'privacy policy Porto Ghalib restaurant',
    'data protection Casa Italia',
    'GDPR restaurant Italy',
    'informativa privacy ristorante',
  ],
  alternates: {
    canonical: '/privacy',
    languages: {
      'it-IT': '/privacy',
      'en-US': '/privacy',
      'x-default': '/privacy',
    },
  },
  openGraph: {
    title: 'Informativa sulla Privacy | Casa Italia Ristorante',
    description:
      'Privacy policy e trattamento dei dati personali di Casa Italia Ristorante a Porto Ghalib.',
    url: `${SITE_URL}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Privacy Policy', url: `${SITE_URL}/privacy` },
        ]}
      />
      <PrivacyPolicyView />
    </>
  );
}
