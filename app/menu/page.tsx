import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getDynamicMenuCategories, getDynamicMenuItems } from '@/lib/menu';
import { MenuView } from '@/components/menu';

export const metadata: Metadata = {
  title: 'Menu Digitale & Carta dei Vini',
  description:
    'Browse the authentic Italian dining menu of Casa Italia in Porto Ghalib Marina. Fresh handmade pastas, wood-fired Neapolitan pizzas, Angus charcoal steaks, fresh seafood, and Italian DOCG wines.',
  keywords: [
    'Casa Italia Menu',
    'Menu Casa Italia Porto Ghalib',
    'Italian Food Porto Ghalib',
    'Wood Fired Pizza Marsa Alam',
    'Fresh Pasta Egypt',
    'Porto Ghalib Seafood',
    'Gluten Free Pizza Egypt',
    'Carta dei Vini Casa Italia',
  ],
  alternates: {
    canonical: '/menu',
  },
  openGraph: {
    title: 'Menu Digitale & Carta dei Vini | Casa Italia Porto Ghalib',
    description:
      'Explore authentic Italian dining at Casa Italia in Porto Ghalib Marina: wood-fired pizza, handmade pasta, Angus steaks, and fine wines.',
    url: 'https://casaitaliarestaurants.com/menu',
    images: [
      {
        url: '/logo/logo-01.webp',
        width: 1200,
        height: 630,
        alt: 'Casa Italia Menu - Porto Ghalib Marina',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Menu Digitale & Carta dei Vini | Casa Italia Porto Ghalib',
    description:
      'Browse fresh homemade pasta, wood-fired pizza, Angus steaks & fine Italian wines at Casa Italia.',
    images: ['/logo/logo-01.webp'],
  },
};

export const revalidate = 60; // Incremental Static Regeneration / edge cache for 60 seconds

export default async function MenuPage() {
  const [categories, items] = await Promise.all([
    getDynamicMenuCategories(),
    getDynamicMenuItems(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#ededed] flex items-center justify-center">
          <div className="font-serif text-[#ba935a] text-lg animate-pulse">Casa Italia Menu...</div>
        </div>
      }
    >
      <MenuView initialCategories={categories} initialItems={items} />
    </Suspense>
  );
}
