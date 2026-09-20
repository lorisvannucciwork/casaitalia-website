import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/config/site';
import { CookiePolicyView } from '@/components/legal';
import { BreadcrumbJsonLd } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Politica sui Cookie',
  description:
    'Informativa dettagliata sull\'uso dei cookie tecnici ed analitici utilizzati sul sito web di Casa Italia Ristorante a Porto Ghalib. Gestione delle preferenze cookie e conformità GDPR.',
  keywords: [
    'Casa Italia cookie policy',
    'cookie policy Porto Ghalib restaurant',
    'politica cookie ristorante',
    'GDPR cookies restaurant',
    'gestione cookie Casa Italia',
  ],
  alternates: {
    canonical: '/cookies',
    languages: {
      'it-IT': '/cookies',
      'en-US': '/cookies',
      'x-default': '/cookies',
    },
  },
  openGraph: {
    title: 'Politica sui Cookie | Casa Italia Ristorante',
    description:
      'Informativa sui cookie utilizzati dal sito web di Casa Italia Ristorante a Porto Ghalib.',
    url: `${SITE_URL}/cookies`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Cookie Policy', url: `${SITE_URL}/cookies` },
        ]}
      />
      <CookiePolicyView />
    </>
  );
}
