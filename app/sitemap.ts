import { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';
import { MENU_CATEGORIES } from '@/data/menuCategories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const lastContentUpdate = '2026-09-19T00:00:00.000Z';
  const lastMenuUpdate = '2026-09-19T00:00:00.000Z';
  const lastLegalUpdate = '2026-06-01T00:00:00.000Z';

  const categoryRoutes: MetadataRoute.Sitemap = MENU_CATEGORIES.filter(
    (cat) => cat.id.toLowerCase() !== 'all'
  ).map((cat) => ({
    url: `${baseUrl}/menu?category=${cat.id}`,
    lastModified: lastMenuUpdate,
    changeFrequency: 'daily',
    priority: 0.85,
    alternates: {
      languages: {
        'it-IT': `${baseUrl}/menu?category=${cat.id}`,
        'en-US': `${baseUrl}/menu?category=${cat.id}`,
        'x-default': `${baseUrl}/menu?category=${cat.id}`,
      },
    },
  }));

  return [

    {
      url: `${baseUrl}/`,
      lastModified: lastContentUpdate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          'it-IT': `${baseUrl}/`,
          'en-US': `${baseUrl}/`,
          'x-default': `${baseUrl}/`,
        },
      },
      images: [
        `${baseUrl}/logo/logo-01.webp`,
        `${baseUrl}/backgrounds/bg-1.webp`,
        `${baseUrl}/backgrounds/bg-2.webp`,
      ],
    },

    {
      url: `${baseUrl}/menu`,
      lastModified: lastMenuUpdate,
      changeFrequency: 'daily',
      priority: 0.95,
      alternates: {
        languages: {
          'it-IT': `${baseUrl}/menu`,
          'en-US': `${baseUrl}/menu`,
          'x-default': `${baseUrl}/menu`,
        },
      },
      images: [
        `${baseUrl}/logo/logo-01.webp`,
        `${baseUrl}/backgrounds/bg-2.webp`,
      ],
    },

    ...categoryRoutes,

    {
      url: `${baseUrl}/tables`,
      lastModified: lastContentUpdate,
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: {
        languages: {
          'it-IT': `${baseUrl}/tables`,
          'en-US': `${baseUrl}/tables`,
          'x-default': `${baseUrl}/tables`,
        },
      },
      images: [
        `${baseUrl}/logo/logo-01.webp`,
      ],
    },

    {
      url: `${baseUrl}/medal`,
      lastModified: lastContentUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          'it-IT': `${baseUrl}/medal`,
          'en-US': `${baseUrl}/medal`,
          'x-default': `${baseUrl}/medal`,
        },
      },
      images: [
        `${baseUrl}/logo/logo-01.webp`,
      ],
    },

    {
      url: `${baseUrl}/privacy`,
      lastModified: lastLegalUpdate,
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: {
          'it-IT': `${baseUrl}/privacy`,
          'en-US': `${baseUrl}/privacy`,
          'x-default': `${baseUrl}/privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastLegalUpdate,
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: {
          'it-IT': `${baseUrl}/terms`,
          'en-US': `${baseUrl}/terms`,
          'x-default': `${baseUrl}/terms`,
        },
      },
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: lastLegalUpdate,
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: {
          'it-IT': `${baseUrl}/cookies`,
          'en-US': `${baseUrl}/cookies`,
          'x-default': `${baseUrl}/cookies`,
        },
      },
    },
  ];
}
