import React from 'react';
import type { Metadata } from 'next';
import { HomeView } from '@/components/home';

/**
 * Home page metadata — only overrides what differs from the root layout.
 * All shared metadata (keywords, openGraph defaults, alternates, icons, etc.)
 * is inherited from app/layout.tsx via Next.js metadata merging.
 */
export const metadata: Metadata = {
  title: 'Casa Italia | Authentic Italian Restaurant & Wood-Fired Pizza in Porto Ghalib',
  description:
    'Welcome to Casa Italia in Porto Ghalib Marina, Red Sea. Enjoy authentic handmade pasta, wood-fired Neapolitan pizza, Angus charcoal steaks, fresh seafood, and fine Italian wines. Family-owned Italian restaurant open daily 12 PM – 11:30 PM.',
};

export default function Home() {
  return <HomeView />;
}

