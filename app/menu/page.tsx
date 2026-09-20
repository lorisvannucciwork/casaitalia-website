import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SITE_URL } from '@/config/site';
import { MENU_CATEGORIES } from '@/data/menuCategories';
import { getDynamicMenuCategories, getDynamicMenuItems } from '@/lib/menu';
import { MenuView, MenuLoadingView } from '@/components/menu';
import { MenuJsonLd, BreadcrumbJsonLd } from '@/components/layout';

interface MenuPageProps {
  searchParams?: Promise<{
    category?: string;
  }>;
}

export async function generateMetadata({ searchParams }: MenuPageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {};
  const requestedCategory =
    typeof resolvedParams.category === 'string'
      ? resolvedParams.category.trim().toLowerCase()
      : undefined;

  const matchedCategory = MENU_CATEGORIES.find(
    (c) => c.id.toLowerCase() === requestedCategory
  );

  const title = matchedCategory
    ? `${matchedCategory.italianTitle || matchedCategory.name}`
    : 'Menu Digitale & Carta dei Vini';

  const description = matchedCategory
    ? `Scopri ${matchedCategory.italianTitle || matchedCategory.name} (${matchedCategory.description}) al Ristorante Casa Italia a Porto Ghalib Marina. Ingredienti italiani freschi e ricette della tradizione.`
    : 'Browse the complete digital menu of Casa Italia in Porto Ghalib Marina. Fresh handmade pastas, wood-fired Neapolitan pizzas, Angus charcoal steaks, Red Sea seafood, Italian DOCG wines, and homemade desserts.';

  const canonicalPath = matchedCategory
    ? `/menu?category=${matchedCategory.id}`
    : '/menu';

  return {
    title,
    description,
    keywords: [
      matchedCategory ? matchedCategory.name : 'Casa Italia Menu',
      'Casa Italia Menu',
      'Porto Ghalib Italian Food',
      'Wood Fired Pizza Marsa Alam',
      'Fresh Pasta Egypt',
      'Red Sea Dining',
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
          alt: `Casa Italia Digital Menu - ${matchedCategory ? matchedCategory.name : 'Porto Ghalib'}`,
          type: 'image/webp',
        },
      ],
    },
  };
}

export const revalidate = 60; 

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const requestedCategory =
    typeof resolvedParams.category === 'string'
      ? resolvedParams.category.trim().toLowerCase()
      : undefined;

  const categories = await getDynamicMenuCategories();
  const validCategories = categories.filter((c) => c.id.toLowerCase() !== 'all');
  const defaultCategory = validCategories[0]?.id || 'antipasti';

  if (!requestedCategory) {
    redirect(`/menu?category=${defaultCategory}`);
  }

  const matchedCategory = validCategories.find(
    (c) => c.id.toLowerCase() === requestedCategory
  );

  if (!matchedCategory) {
    redirect(`/menu?category=${defaultCategory}`);
  }

  const activeCategory = matchedCategory.id;

  const items = await getDynamicMenuItems(activeCategory);

  return (
    <Suspense fallback={<MenuLoadingView />}>
      <MenuJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Menu', url: `${SITE_URL}/menu?category=${activeCategory}` },
        ]}
      />
      <MenuView
        key={activeCategory}
        initialCategories={validCategories}
        initialCategory={activeCategory}
        initialItems={items}
      />
    </Suspense>
  );
}
