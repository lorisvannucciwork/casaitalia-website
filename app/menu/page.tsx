import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getDynamicMenuCategories, getDynamicMenuItems } from '@/lib/menu';
import { MenuView } from '@/components/menu';

export const metadata: Metadata = {
  title: 'Menu Digitale | Casa Italia Porto Ghalib',
  description:
    'Explore the authentic Italian dining menu of Casa Italia in Porto Ghalib Marina. Fresh pastas, wood-fired pizzas, gourmet steaks, seafood, and homemade desserts.',
  keywords: [
    'Casa Italia Menu',
    'Porto Ghalib Italian Restaurant',
    'Fresh Pasta Red Sea',
    'Wood Fired Pizza Egypt',
    'Port Ghalib Marina Dining',
  ],
  alternates: {
    canonical: '/menu',
  },
  openGraph: {
    title: 'Casa Italia | Menu Digitale',
    description: 'Explore the fresh authentic Italian menu at Casa Italia in Porto Ghalib Marina.',
    url: 'https://casaitaliarestaurants.com/menu',
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
