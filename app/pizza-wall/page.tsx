import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/config/site';
import { listPizzas, type WallPizza } from '@/lib/pizzaWall';
import { BreadcrumbJsonLd } from '@/components/layout';
import PizzaWall, { type WallSort } from '@/components/pizza/PizzaWall';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'La Bacheca dei Pizzaioli | The Pizza Wall',
  description:
    'Pizzas invented by the guests of Casa Italia in Porto Ghalib Marina. Rate your favourites and order any of them, baked in our wood-fired oven.',
  keywords: ['Casa Italia pizza wall', 'Custom pizza Port Ghalib', 'Bacheca pizze Casa Italia', 'Create your own pizza Marsa Alam'],
  alternates: {
    canonical: '/pizza-wall',
    languages: {
      'it-IT': '/pizza-wall',
      'en-US': '/pizza-wall',
      'x-default': '/pizza-wall',
    },
  },
  openGraph: {
    title: 'The Pizza Wall | Casa Italia Porto Ghalib',
    description: 'Pizzas invented by our guests: rate them, order them, or invent your own.',
    url: `${SITE_URL}/pizza-wall`,
    images: [{ url: '/pizza-builder/base-baked.webp', width: 1100, height: 1088, alt: 'A pizza from the Casa Italia wood-fired oven', type: 'image/webp' }],
  },
};

export default async function PizzaWallPage({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
  const { sort } = await searchParams;
  let pizzas: WallPizza[] = [];
  try {
    pizzas = await listPizzas();
  } catch (error) {
    console.error('Pizza wall could not be loaded:', error);
  }
  const initialSort: WallSort = sort === 'new' || sort === 'popular' ? sort : 'top';
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'The Pizza Wall', url: `${SITE_URL}/pizza-wall` },
        ]}
      />
      <PizzaWall initialPizzas={pizzas} initialSort={initialSort} />
    </>
  );
}
