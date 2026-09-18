import React from 'react';
import { Metadata } from 'next';
import { TablePortalView } from '@/components/table';

export const metadata: Metadata = {
  title: 'Table Guest Portal',
  description:
    'Welcome to Casa Italia Ristorante at Porto Ghalib Marina. Access our digital menu, guest Wi-Fi, and waiter assistance directly from your table.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function TablePage() {
  return <TablePortalView />;
}
