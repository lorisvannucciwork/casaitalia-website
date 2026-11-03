import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/config/site';
import { orderHours } from '@/lib/online';
import { getPizza } from '@/lib/pizzaWall';
import { BreadcrumbJsonLd } from '@/components/layout';
import PizzaBuilder from '@/components/pizza/PizzaBuilder';

export const metadata: Metadata = {
  title: 'Crea la tua Pizza | Create Your Own Pizza',
  description:
    'Build your own wood-fired pizza at Casa Italia, Porto Ghalib Marina: pick your toppings, we bake it and deliver it to your hotel, villa or yacht.',
  keywords: [
    'Create your own pizza Port Ghalib',
    'Pizza delivery Porto Ghalib',
    'Crea la tua pizza',
    'Casa Italia pizza',
    'Wood-fired pizza Marsa Alam',
  ],
  alternates: {
    canonical: '/create-your-pizza',
    languages: {
      'it-IT': '/create-your-pizza',
      'en-US': '/create-your-pizza',
      'x-default': '/create-your-pizza',
    },
  },
  openGraph: {
    title: 'Create Your Own Pizza | Casa Italia Porto Ghalib',
    description: 'Pick your toppings: we bake it in the wood-fired oven and bring it to you.',
    url: `${SITE_URL}/create-your-pizza`,
    images: [
      {
        url: '/logo/logo-01.webp',
        width: 1200,
        height: 630,
        alt: 'Casa Italia - Create Your Own Pizza',
        type: 'image/webp',
      },
    ],
  },
};

/**
 * With ?pizza=<id>, the box is already open on that pizza of the wall, ready to order.
 * With ?table=<number> (a QR code on the table), the order is already set for that table.
 */
export default async function CreateYourPizzaPage({ searchParams }: { searchParams: Promise<{ pizza?: string; table?: string }> }) {
  const { pizza, table } = await searchParams;
  const preset = pizza ? await getPizza(pizza).catch(() => null) : null;
  const tableNumber = typeof table === 'string' && /^[\p{L}\p{N}][\p{L}\p{N} -]{0,7}$/u.test(table) ? table : '';
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Create Your Own Pizza', url: `${SITE_URL}/create-your-pizza` },
        ]}
      />
      <PizzaBuilder key={preset?.id || 'new'} hours={orderHours()} preset={preset} table={tableNumber} />
    </>
  );
}
