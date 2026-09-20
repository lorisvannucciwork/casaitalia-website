import React from 'react';
import { SITE_URL, SITE_CONFIG } from '@/config/site';

export function RestaurantJsonLd() {
  const baseUrl = SITE_URL;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [

      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: SITE_CONFIG.name,
        alternateName: [
          SITE_CONFIG.shortName,
          'Casa Italia Port Ghalib',
          'Casa Italia Restaurant',
        ],
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          '@id': `${baseUrl}/#logo`,
          url: `${baseUrl}/logo/logo-01.webp`,
          contentUrl: `${baseUrl}/logo/logo-01.webp`,
          width: 1200,
          height: 630,
          caption: 'Casa Italia Ristorante Logo',
        },
        image: {
          '@id': `${baseUrl}/#logo`,
        },
        sameAs: [
          SITE_CONFIG.socials.googleMaps,
          SITE_CONFIG.socials.tripadvisor,
          SITE_CONFIG.socials.instagram,
          SITE_CONFIG.socials.tiktok,
          SITE_CONFIG.socials.facebook,
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: SITE_CONFIG.contact.phone,
            contactType: 'reservations',
            areaServed: 'EG',
            availableLanguage: ['Italian', 'English', 'Arabic'],
          },
        ],
        founder: [
          { '@type': 'Person', name: 'Loris' },
          { '@type': 'Person', name: 'Veronica' },
        ],
      },

      {
        '@type': ['Restaurant', 'ItalianRestaurant', 'FoodEstablishment', 'LocalBusiness'],
        '@id': `${baseUrl}/#restaurant`,
        name: SITE_CONFIG.shortName,
        alternateName: [
          SITE_CONFIG.name,
          'Casa Italia Port Ghalib',
          'Casa Italia Restaurant Marsa Alam',
          'كازا إيطاليا بورتو غالب',
        ],
        description: SITE_CONFIG.description,
        url: baseUrl,
        menu: `${baseUrl}/menu`,
        hasMenu: {
          '@type': 'Menu',
          '@id': `${baseUrl}/#menu`,
          name: 'Casa Italia Full Menu',
          description: 'Authentic Italian restaurant menu featuring wood-fired pizza, handmade pasta, charcoal steaks, fresh seafood, and Italian wines.',
          url: `${baseUrl}/menu`,
          hasMenuSection: [
            {
              '@type': 'MenuSection',
              name: 'Pizza Napoletana',
              description: 'Traditional Neapolitan pizzas baked in our wood-fired oven at 450°C',
            },
            {
              '@type': 'MenuSection',
              name: 'Pasta Fresca',
              description: 'Daily handmade fresh pasta with authentic Italian sauces',
            },
            {
              '@type': 'MenuSection',
              name: 'Carne alla Brace',
              description: 'Premium Angus steaks and meats grilled on charcoal',
            },
            {
              '@type': 'MenuSection',
              name: 'Pesce Fresco',
              description: 'Fresh catch of the day and seafood specialties from the Red Sea',
            },
            {
              '@type': 'MenuSection',
              name: 'Carta dei Vini',
              description: 'Fine Italian DOCG wines, prosecco, and signature cocktails',
            },
            {
              '@type': 'MenuSection',
              name: 'Antipasti & Insalate',
              description: 'Traditional Italian starters, bruschetta, carpaccio, and fresh salads',
            },
            {
              '@type': 'MenuSection',
              name: 'Dolci',
              description: 'Homemade Italian desserts including tiramisù, panna cotta, and gelato',
            },
          ],
        },
        telephone: SITE_CONFIG.contact.phone,
        servesCuisine: [
          'Italian',
          'Neapolitan',
          'Mediterranean',
          'Pizza',
          'Pasta',
          'Seafood',
          'Steak',
        ],
        priceRange: '$$',
        currenciesAccepted: 'EGP, EUR, USD, GBP',
        paymentAccepted: 'Cash, Credit Card, Visa, Mastercard',
        acceptsReservations: true,
        smokingAllowed: false,
        keywords:
          'Italian restaurant, pizza, pasta, Porto Ghalib, Marsa Alam, Red Sea, wood-fired pizza, handmade pasta, seafood, fine dining, marina dining, family restaurant, romantic dinner, charcoal steak',
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Outdoor Seating', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Marina View', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Bar', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Wheelchair Accessible', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Family Friendly', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Live Music', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Digital Menu', value: true },
        ],
        founder: [
          { '@type': 'Person', name: 'Loris' },
          { '@type': 'Person', name: 'Veronica' },
        ],
        image: [
          {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo/logo-01.webp`,
            width: 1200,
            height: 630,
          },
          {
            '@type': 'ImageObject',
            url: `${baseUrl}/backgrounds/bg-1.webp`,
            width: 1920,
            height: 1080,
          },
          {
            '@type': 'ImageObject',
            url: `${baseUrl}/backgrounds/bg-2.webp`,
            width: 1920,
            height: 1080,
          },
        ],
        logo: {
          '@id': `${baseUrl}/#logo`,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.address.street,
          addressLocality: SITE_CONFIG.address.city,
          addressRegion: SITE_CONFIG.address.region,
          postalCode: SITE_CONFIG.address.postalCode,
          addressCountry: {
            '@type': 'Country',
            name: SITE_CONFIG.address.country,
          },
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SITE_CONFIG.geo.latitude,
          longitude: SITE_CONFIG.geo.longitude,
        },
        hasMap: SITE_CONFIG.socials.googleMaps,
        isAccessibleForFree: false,
        sameAs: [
          SITE_CONFIG.socials.googleMaps,
          SITE_CONFIG.socials.tripadvisor,
          SITE_CONFIG.socials.instagram,
          SITE_CONFIG.socials.tiktok,
          SITE_CONFIG.socials.facebook,
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '128',
          bestRating: '5',
          worstRating: '1',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: SITE_CONFIG.hours.openingTime,
            closes: SITE_CONFIG.hours.closingTime,
          },
        ],
        potentialAction: [
          {
            '@type': 'ReserveAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: SITE_CONFIG.contact.whatsappUrl,
              inLanguage: ['en', 'it'],
              actionPlatform: [
                'http://schema.org/DesktopWebPlatform',
                'http://schema.org/MobileWebPlatform',
              ],
            },
            result: {
              '@type': 'FoodEstablishmentReservation',
              name: 'Table Reservation',
            },
          },
          {
            '@type': 'OrderAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/menu`,
              inLanguage: ['en', 'it'],
              actionPlatform: [
                'http://schema.org/DesktopWebPlatform',
                'http://schema.org/MobileWebPlatform',
              ],
            },
          },
        ],
        parentOrganization: {
          '@id': `${baseUrl}/#organization`,
        },
      },

      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: SITE_CONFIG.name,
        alternateName: 'Casa Italia Porto Ghalib',
        description:
          'Official website and digital menu of Casa Italia Ristorante in Porto Ghalib Marina, Red Sea, Egypt. Browse our authentic Italian menu, make reservations, and discover our story.',
        publisher: {
          '@id': `${baseUrl}/#organization`,
        },
        inLanguage: ['it', 'en'],
        copyrightHolder: {
          '@id': `${baseUrl}/#organization`,
        },
        copyrightYear: 2024,
      },

      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are the opening hours of Casa Italia Porto Ghalib?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Casa Italia is open daily from 12:00 PM to 11:30 PM, seven days a week including weekends and holidays.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where is Casa Italia located?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Casa Italia is located at the Marina Promenade in Porto Ghalib, Red Sea Governorate, Egypt. We are right on the marina waterfront with beautiful views.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I make a reservation at Casa Italia?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `You can make a reservation via WhatsApp at ${SITE_CONFIG.contact.phoneFormatted}, or simply walk in. We recommend reservations for dinner, especially on weekends.`,
            },
          },
          {
            '@type': 'Question',
            name: 'Does Casa Italia offer gluten-free options?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Casa Italia offers gluten-free pizza and pasta options. Please inform your server about any dietary requirements or allergies.',
            },
          },
          {
            '@type': 'Question',
            name: 'What type of cuisine does Casa Italia serve?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Casa Italia serves authentic Italian cuisine including wood-fired Neapolitan pizza, fresh handmade pasta, Angus charcoal steaks, Red Sea seafood, and a curated selection of Italian DOCG wines.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Casa Italia have outdoor seating?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Casa Italia features beautiful outdoor terrace seating with views of Porto Ghalib Marina, as well as comfortable indoor dining.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there free Wi-Fi at Casa Italia?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Casa Italia offers free guest Wi-Fi for all diners. You can connect through our digital table portal.',
            },
          },
          {
            '@type': 'Question',
            name: 'What payment methods does Casa Italia accept?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Casa Italia accepts cash (EGP, EUR, USD, GBP) as well as all major credit and debit cards including Visa and Mastercard.',
            },
          },
        ],
      },

      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
