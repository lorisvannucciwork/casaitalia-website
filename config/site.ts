
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_WEBSITE_URL ||
  'https://casaitaliarestaurants.com'
).replace(/\/$/, '');

export const CDN_URL = (
  process.env.NEXT_PUBLIC_CDN_URL ||
  'https://cdn.casaitaliarestaurants.com'
).replace(/\/$/, '');

export const SITE_CONFIG = {
  name: 'Casa Italia Ristorante',
  shortName: 'Casa Italia',
  legalName: 'Casa Italia Ristorante S.A.E.',
  domain: 'casaitaliarestaurants.com',
  url: SITE_URL,
  cdnUrl: CDN_URL,
  description:
    'Experience authentic Italian dining at Casa Italia in Porto Ghalib Marina, Red Sea. Fresh artisanal pasta, wood-fired Neapolitan pizza, Tuscan charcoal steaks, seafood, and fine Italian wine pairings. Open daily 12 PM – 11:30 PM.',
  address: {
    street: 'Marina Promenade',
    city: 'Porto Ghalib',
    region: 'Red Sea Governorate',
    postalCode: '84721',
    country: 'Egypt',
    full: 'Marina Promenade, Porto Ghalib, Red Sea Governorate, 84721, Egypt',
  },
  geo: {
    latitude: 25.3548,
    longitude: 34.6367,
  },
  contact: {
    phone: '+201508300656',
    phoneFormatted: '+20 150 830 0656',
    email: 'info@casaitaliarestaurants.com',
    whatsappUrl:
      'https://wa.me/201508300656?text=Hello%20Casa%20Italia%20team,%20I%20would%20like%20to%20reserve%20a%20table.',
  },
  hours: {
    openingTime: '12:00',
    closingTime: '23:30',
    display: '12:00 PM – 11:30 PM',
    days: 'Monday – Sunday (7 days a week)',
  },
  socials: {
    instagram: 'https://www.instagram.com/casaitalia.portghalib/',
    tiktok: 'https://www.tiktok.com/@casaitalia.eg',
    facebook: 'https://www.facebook.com/casaitaliarestaurant/',
    tripadvisor:
      'https://www.tripadvisor.com/Restaurant_Review-g311425-d33991658-Reviews-Casa_Italia_Port_Ghalib-Marsa_Alam_Red_Sea_and_Sinai.html',
    googleMaps: 'https://maps.app.goo.gl/F4FC3zM7Pki94YYC6',
    googleMapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.0!2d34.6367!3d25.3548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x144e05b550000001%3A0x6b8c8d8c8d8c8d8c!2sCasa%20Italia!5e0!3m2!1sen!2seg!4v1',
  },
} as const;
