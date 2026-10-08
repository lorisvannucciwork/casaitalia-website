import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SITE_URL } from '@/config/site';
import { MENU_CATEGORIES } from '@/data/menuCategories';
import { getDynamicMenuCategories, getDynamicMenuItems } from '@/lib/menu';
import { DeliveryView } from '@/components/delivery';
import { MenuLoadingView } from '@/components/menu';
import { BreadcrumbJsonLd } from '@/components/layout';

interface DeliveryPageProps {
  searchParams?: Promise<{
    category?: string;
  }>;
}

export async function generateMetadata({ searchParams }: DeliveryPageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {};
  const requestedCategory =
    typeof resolvedParams.category === 'string'
      ? resolvedParams.category.trim().toLowerCase()
      : undefined;

  const matchedCategory = MENU_CATEGORIES.find(
    (c) => c.id.toLowerCase() === requestedCategory
  );

  const title = matchedCategory
    ? `${matchedCategory.italianTitle || matchedCategory.name} - Consegna a Domicilio`
    : 'Consegna a Domicilio & WhatsApp Order';

  const description = matchedCategory
    ? `Ordina ${matchedCategory.italianTitle || matchedCategory.name} (${matchedCategory.description}) a domicilio al Ristorante Casa Italia a Porto Ghalib Marina. Consegna espressa in resort, villa o yacht tramite WhatsApp.`
    : 'Order authentic Italian dishes, wood-fired pizza, fresh handmade pasta, steaks, and desserts for delivery in Port Ghalib Marina. Direct delivery to your resort room, villa, or marina yacht via WhatsApp concierge.';

  const canonicalPath = matchedCategory
    ? `/delivery?category=${matchedCategory.id}`
    : '/delivery';

  return {
    title,
    description,
    keywords: [
      matchedCategory ? `${matchedCategory.name} Delivery` : 'Casa Italia Delivery',
      'Casa Italia Delivery',
      'Porto Ghalib Food Delivery',
      'Italian Food Delivery Marsa Alam',
      'Pizza Delivery Port Ghalib',
      'Fresh Pasta Delivery Egypt',
      'WhatsApp Food Order Port Ghalib',
      'Casa Italia WhatsApp Order',
    ],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'it-IT': canonicalPath,
        'en-US': canonicalPath,
        'x-default': canonicalPath,
      },
    },
    openGraph: {
      title: `${title} | Casa Italia Porto Ghalib`,
      description,
      url: `${SITE_URL}${canonicalPath}`,
      images: [
        {
          url: '/logo/logo-01.webp',
          width: 1200,
          height: 630,
          alt: `Casa Italia Concierge Delivery - ${matchedCategory ? matchedCategory.name : 'Porto Ghalib'}`,
          type: 'image/webp',
        },
      ],
    },
  };
}

export const revalidate = 60;

export default async function DeliveryPage({ searchParams }: DeliveryPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const requestedCategory =
    typeof resolvedParams.category === 'string'
      ? resolvedParams.category.trim().toLowerCase()
      : undefined;

  const [categories, items] = await Promise.all([
    getDynamicMenuCategories(),
    getDynamicMenuItems(),
  ]);

  const validCategories = categories.filter((c) => c.id.toLowerCase() !== 'all');
  const defaultCategory = validCategories[0]?.id || 'antipasti';

  if (!requestedCategory) {
    redirect(`/delivery?category=${defaultCategory}`);
  }

  const matchedCategory = validCategories.find(
    (c) => c.id.toLowerCase() === requestedCategory
  );

  if (!matchedCategory) {
    redirect(`/delivery?category=${defaultCategory}`);
  }

  const activeCategory = matchedCategory.id;

  return (
    <Suspense fallback={<MenuLoadingView />}>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Delivery', url: `${SITE_URL}/delivery?category=${activeCategory}` },
        ]}
      />
      <DeliveryView
        key={activeCategory}
        initialCategories={validCategories}
        initialCategory={activeCategory}
        initialItems={items}
      />
    </Suspense>
  );
}
