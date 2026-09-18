import React from 'react';

export function RestaurantJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Restaurant', 'ItalianRestaurant'],
        '@id': 'https://casaitaliarestaurants.com/#restaurant',
        name: 'Casa Italia',
        alternateName: [
          'Casa Italia Ristorante',
          'Casa Italia Port Ghalib',
          'Casa Italia Restaurant Marsa Alam',
        ],
        description:
          'Authentic Italian dining at Porto Ghalib Marina, Red Sea. Fresh homemade pasta, wood-fired Neapolitan pizza, Angus charcoal steaks, seafood, and fine Italian wine pairings.',
        url: 'https://casaitaliarestaurants.com',
        menu: 'https://casaitaliarestaurants.com/menu',
        hasMenu: 'https://casaitaliarestaurants.com/menu',
        telephone: '+201508300656',
        servesCuisine: [
          'Italian',
          'Neapolitan',
          'Mediterranean',
          'Pizza',
          'Pasta',
          'Seafood',
        ],
        priceRange: '$$',
        currenciesAccepted: 'EGP, EUR, USD, GBP',
        paymentAccepted: 'Cash, Credit Card',
        acceptsReservations: true,
        founder: [
          {
            '@type': 'Person',
            name: 'Loris',
          },
          {
            '@type': 'Person',
            name: 'Veronica',
          },
        ],
        image: [
          'https://casaitaliarestaurants.com/logo/logo-01.webp',
          'https://casaitaliarestaurants.com/backgrounds/bg-1.webp',
          'https://casaitaliarestaurants.com/backgrounds/bg-2.webp',
        ],
        logo: 'https://casaitaliarestaurants.com/logo/logo-01.webp',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Marina Promenade',
          addressLocality: 'Porto Ghalib',
          addressRegion: 'Red Sea Governorate',
          postalCode: '84721',
          addressCountry: 'EG',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 25.5348,
          longitude: 34.6367,
        },
        sameAs: [
          'https://maps.app.goo.gl/F4FC3zM7Pki94YYC6',
          'https://www.tripadvisor.com/Restaurant_Review-g311425-d33991658-Reviews-Casa_Italia_Port_Ghalib-Marsa_Alam_Red_Sea_and_Sinai.html',
          'https://www.instagram.com/casaitalia.portghalib/',
          'https://www.tiktok.com/@casaitalia.eg',
          'https://www.facebook.com/casaitaliarestaurant/',
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
            opens: '12:00',
            closes: '23:30',
          },
        ],
        potentialAction: {
          '@type': 'ReserveAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate:
              'https://wa.me/201508300656?text=Hello%20Casa%20Italia%20team,%20I%20would%20like%20to%20reserve%20a%20table.',
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
      },
      {
        '@type': 'WebSite',
        '@id': 'https://casaitaliarestaurants.com/#website',
        url: 'https://casaitaliarestaurants.com',
        name: 'Casa Italia Ristorante',
        description:
          'Official website and digital menu of Casa Italia Ristorante in Porto Ghalib Marina, Red Sea, Egypt.',
        publisher: {
          '@id': 'https://casaitaliarestaurants.com/#restaurant',
        },
        inLanguage: ['it', 'en'],
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
