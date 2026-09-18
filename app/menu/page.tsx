import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getDynamicMenuCategories, getDynamicMenuItems } from '@/lib/menu';
import { MenuView } from '@/components/menu';
import { Navbar, Footer } from '@/components/layout';
import { MenuGridSkeleton, TopProgressBar } from '@/components/ui';

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
        <div className="min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased">
          <TopProgressBar />
          <Navbar />
          <main className="flex-1 relative">
            <div className="absolute inset-0 z-0 bg-[url('/backgrounds/bg-1.webp')] bg-[length:100%_auto] bg-repeat-y opacity-80" />
            <section id="menu-section" className="relative z-10 pt-[90px] sm:pt-[110px] pb-8 sm:pb-12 min-h-screen">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-6">
                <MenuGridSkeleton cardCount={6} />
              </div>
            </section>
          </main>
          <Footer />
        </div>
      }
    >
      <MenuView initialCategories={categories} initialItems={items} />
    </Suspense>
  );
}
