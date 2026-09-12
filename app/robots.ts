import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://casaitaliarestaurants.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/card/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
