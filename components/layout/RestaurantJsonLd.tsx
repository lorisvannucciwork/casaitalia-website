import React from 'react';

export function RestaurantJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Casa Italia',
    alternateName: 'Casa Italia Ristorante',
    description:
      'Authentic Italian dining at Porto Ghalib Marina. Fresh homemade pasta, wood-fired Neapolitan pizza, steak, seafood, and fine wine pairings.',
    url: 'https://casaitaliarestaurants.com',
    menu: 'https://casaitaliarestaurants.com/menu',
    telephone: '+201508300656',
    servesCuisine: ['Italian', 'Neapolitan', 'Mediterranean'],
    priceRange: '$$',
    currenciesAccepted: 'EGP, EUR, USD',
    paymentAccepted: 'Cash, Credit Card',
    image: [
      'https://casaitaliarestaurants.com/logo/logo-01.webp',
      'https://casaitaliarestaurants.com/backgrounds/bg-1.webp',
      'https://casaitaliarestaurants.com/backgrounds/bg-2.webp',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Marina Promenade',
      addressLocality: 'Porto Ghalib',
      addressRegion: 'Red Sea Governorate',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.5348,
      longitude: 34.6367,
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
    hasMenu: 'https://casaitaliarestaurants.com/menu',
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://wa.me/201508300656?text=Hello%20Casa%20Italia%20team,%20I%20would%20like%20to%20reserve%20a%20table.',
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
