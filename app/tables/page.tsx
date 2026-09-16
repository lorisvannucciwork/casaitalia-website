import React from 'react';
import { Metadata } from 'next';
import { MedalView } from '@/components/medal';

export const metadata: Metadata = {
  title: 'Reviews & Social Hub | Casa Italia Ristorante',
  description: 'Connect with Casa Italia Ristorante in Porto Ghalib Marina. Leave a review on Google Maps or TripAdvisor, or contact us directly.',
};

export default function TablesPage() {
  return <MedalView />;
}
