'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'it' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  t: (key: string) => string;
  formatNumber: (val: string | number) => string;
  formatCurrency: (amount: number) => string;
}

const translations: Record<Language, Record<string, string>> = {
  it: {
    // Navigation
    'nav.home': 'Inizio',
    'nav.menu': 'Menu',
    'nav.medal': 'Medaglia & Social',
    'nav.page': 'Pagina',
    'nav.of': 'di',
    'nav.prev': 'Prec',
    'nav.next': 'Succ',
    'nav.nextPage': 'Pagina Successiva',
    'table.seatedGuest': 'Ospite al Tavolo',
    'table.activeTable': 'Tavolo Attivo',
    'table.clear': 'Rimuovi',

    // 404 Page
    'notFound.subtitle': 'Pagina Non Trovata',
    'notFound.quote': '“Anche le migliori ricette a volte si perdono.”',
    'notFound.desc': 'La pagina che stai cercando potrebbe essere stata spostata o non è al momento disponibile. Ti accompagniamo al nostro menu.',

    // Hero
    'hero.title1': 'La Vera Passione per la',
    'hero.title2': 'Cucina Italiana',
    'hero.subtitle': 'Benvenuti a Casa Italia—la casa della pasta fresca, della cucina dal vivo e della dolce vita in riva al mare.',
    'hero.exploreMenu': 'Esplora il Menu',

    // Our Story
    'story.title': 'La Nostra',
    'story.subtitle': 'Storia',
    'story.p1': 'Ogni storia nasce da un\'emozione; la nostra è iniziata con un sogno lontano da casa. Noi Loris e Veronica, con il prezioso supporto di Andrea, volevamo portare un vero pezzo d\'Italia in Egitto. Non solo il cibo, ma l\'anima del nostro Paese. Quella che doveva essere una piccola idea è diventata Casa Italia: un angolo autentico affacciato sul mare di Port Ghalib, nato dalla passione e dal desiderio di far sentire ogni ospite come a casa propria.',
    'story.p2': 'Ogni singolo dettaglio — dai tavoli in stile toscano agli ulivi, dal profumo del vero espresso mattutino davanti alla marina fino all\'autentica pizza italiana — è stato scelto con cura per farvi respirare l\'Italia in ogni momento. Casa Italia non è mai stata pensata solo come un ristorante, ma come emozione, celebrazione e famiglia. E questo... è solo l\'inizio della nostra storia.',
    'story.quote': '"From our family to yours, buon appetito."',
    'story.discoverMenu': 'Scopri il Nostro Menu',

    // Categories
    'categories.all': 'Tutti i Piatti',
    'categories.antipasti': 'Antipasti',
    'categories.primi': 'Primi Piatti',
    'categories.pasta_fresca': 'Pasta Fresca',
    'categories.secondi_carne': 'Secondi Carne',
    'categories.secondi_pesce': 'Secondi Pesce',
    'categories.contorni': 'Contorni',
    'categories.burger': 'Burgers',
    'categories.insalate': 'Insalate',
    'categories.pizze_rosse': 'Pizze Rosse',
    'categories.pizze_bianche': 'Pizze Bianche',
    'categories.dolci': 'Dolci',
    'categories.caffetteria': 'Caffetteria',
    'categories.bibite': 'Bibite',
    'categories.vini': 'Vini',
    'categories.birre': 'Birre',
    'categories.cocktails': 'Cocktails',
    'categories.colazione': 'Colazione',
    'categories.select': 'Categorie Menu',

    // Dish Card
    'dish.viewDetails': 'Dettagli',

    // Medal & Social Hub
    'medal.badge': 'Medaglia Ufficiale & Social Hub',
    'medal.heroTitle1': 'Benvenuti a Casa Italia',
    'medal.heroTitle2': 'Il Tuo Passaporto per l\'Eccellenza',
    'medal.heroSubtitle': 'Connettiti con il nostro ristorante autentico a Porto Ghalib. Seguici sui social media, scopri la nostra posizione sulla marina e condividi la tua esperienza su TripAdvisor.',
    'medal.shareHub': 'Condividi Hub',
    'medal.saveContact': 'Salva Contatto',
    'medal.copied': 'Copiato!',
    'medal.socialsHeading': 'I Nostri Canali Social',
    'medal.socialsSubtitle': 'Unisciti alla nostra community culinaria e vivi la magia di Casa Italia ogni giorno.',
    'medal.followOn': 'Seguici su',
    'medal.tripadvisorHeading': 'Esperienza & Recensioni TripAdvisor',
    'medal.tripadvisorSubtitle': 'Scopri cosa dicono i nostri ospiti e condividi il tuo ricordo a Casa Italia.',
    'medal.tripadvisorRating': 'Valutazione Eccellente 5.0',
    'medal.tripadvisorBadge': 'Scelta dei Viaggiatori a Port Ghalib',
    'medal.tripadvisorCta': 'Lascia una Recensione su TripAdvisor',
    'medal.tripadvisorExplore': 'Visualizza Tutte le Recensioni',
    'medal.mapsHeading': 'Posizione & Come Raggiungerci',
    'medal.mapsSubtitle': 'Affacciati sulla meravigliosa marina di Porto Ghalib per un\'indimenticabile esperienza fronte mare.',
    'medal.openInMaps': 'Apri in Google Maps',
    'medal.getDirections': 'Ottieni Indicazioni Stradali',
    'medal.conciergeTitle': 'Prenotazioni & Concierge Diretto',
    'medal.conciergeSubtitle': 'Siamo sempre a tua disposizione per riservare il tuo tavolo speciale o informazioni.',
    'medal.whatsappCta': 'Chatta su WhatsApp',
    'medal.phoneCta': 'Chiama il Ristorante',
    'medal.viewMenuCta': 'Esplora il Menu Digitale',

    // Footer & Legal
    'footer.location': 'Posizione',
    'footer.openMaps': 'Apri in Google Maps',
    'footer.address': 'Marina, Porto Ghalib, Governatorato del Mar Rosso, Egitto',
    'footer.privacy': 'Informativa sulla Privacy',
    'footer.terms': 'Termini & Condizioni',
    'footer.cookies': 'Politica sui Cookie',
    'footer.cookiePreferences': 'Gestione Cookie',
    'footer.installApp': 'Installa App',
    'footer.rights': 'Tutti i diritti riservati.',

    // Cookie Banner
    'cookie.title': 'Informativa sui Cookie & Privacy',
    'cookie.description': 'Utilizziamo cookie essenziali per garantire il corretto funzionamento del nostro menu digitale e della selezione del tavolo, nonché statistiche anonime per migliorare la tua esperienza gastronomica a Casa Italia.',
    'cookie.acceptAll': 'Accetta Tutti',
    'cookie.essentialOnly': 'Solo Necessari',
    'cookie.manage': 'Preferenze',
    'cookie.policy': 'Leggi la Cookie Policy',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.medal': 'Medal & Social',
    'nav.page': 'Page',
    'nav.of': 'of',
    'nav.prev': 'Prev',
    'nav.next': 'Next',
    'nav.nextPage': 'Next Page',
    'table.seatedGuest': 'Seated Guest',
    'table.activeTable': 'Active Table',
    'table.clear': 'Clear',

    // 404 Page
    'notFound.subtitle': 'Page Not Found',
    'notFound.quote': '“Even the best recipes sometimes get lost.”',
    'notFound.desc': 'The page you are looking for might have been moved or is temporarily unavailable. Let us guide you back to our menu.',

    // Hero
    'hero.title1': 'True Passion for',
    'hero.title2': 'Italian Cuisine',
    'hero.subtitle': 'Welcome to Casa Italia—the home of fresh pasta, live cooking, and la dolce vita by the sea.',
    'hero.exploreMenu': 'Explore Full Menu',

    // Our Story
    'story.title': 'Our',
    'story.subtitle': 'Story',
    'story.p1': 'Every story begins with an emotion; ours started with a dream far from home. We, Loris and Veronica, with the precious support of Andrea, wanted to bring a real piece of Italy to Egypt. Not just the food, but the soul of our country. What was meant to be a small idea became Casa Italia: an authentic corner overlooking the sea of Port Ghalib, born from passion and the desire to make every guest feel at home.',
    'story.p2': 'Every single detail — from Tuscan-style tables to olive trees, from the scent of real morning espresso facing the marina to authentic Italian pizza — was chosen with care to let you breathe Italy in every moment. Casa Italia was never meant to be just a restaurant, but emotion, celebration, and family. And this... is only the beginning of our story.',
    'story.quote': '"From our family to yours, buon appetito."',
    'story.discoverMenu': 'Discover Our Menu',

    // Categories
    'categories.all': 'All Dishes',
    'categories.antipasti': 'Starters & Appetizers',
    'categories.primi': 'First Courses & Pasta',
    'categories.pasta_fresca': 'Fresh Pasta',
    'categories.secondi_carne': 'Gourmet Meat Specialties',
    'categories.secondi_pesce': 'Fresh Seafood & Fish',
    'categories.contorni': 'Side Dishes & Vegetables',
    'categories.burger': 'Handcrafted Burgers',
    'categories.insalate': 'Fresh Seasonal Salads',
    'categories.pizze_rosse': 'Classic Red Pizzas',
    'categories.pizze_bianche': 'Gourmet White Pizzas',
    'categories.dolci': 'Artisanal Desserts',
    'categories.caffetteria': 'Italian Coffee & Espresso',
    'categories.bibite': 'Soft Drinks & Juices',
    'categories.vini': 'Fine DOCG Wines',
    'categories.birre': 'Craft & Premium Beers',
    'categories.cocktails': 'Signature Cocktails',
    'categories.colazione': 'Italian Breakfast',
    'categories.select': 'Menu Categories',

    // Dish Card
    'dish.viewDetails': 'Details',

    // Medal & Social Hub
    'medal.badge': 'Official Medal & Social Hub',
    'medal.heroTitle1': 'Welcome to Casa Italia',
    'medal.heroTitle2': 'Your Passport to Excellence',
    'medal.heroSubtitle': 'Connect with our authentic Italian dining destination in Porto Ghalib. Follow our official social channels, explore our waterfront location, and share your experience on TripAdvisor.',
    'medal.shareHub': 'Share Hub',
    'medal.saveContact': 'Save Contact',
    'medal.copied': 'Copied!',
    'medal.socialsHeading': 'Our Official Social Media',
    'medal.socialsSubtitle': 'Join our culinary community and experience the charm of Casa Italia every day.',
    'medal.followOn': 'Follow on',
    'medal.tripadvisorHeading': 'TripAdvisor Experience & Reviews',
    'medal.tripadvisorSubtitle': 'See what our distinguished travelers say and share your own Casa Italia memory.',
    'medal.tripadvisorRating': '5.0 Excellent Traveler Rating',
    'medal.tripadvisorBadge': 'Top Choice in Port Ghalib Marina',
    'medal.tripadvisorCta': 'Write a Review on TripAdvisor',
    'medal.tripadvisorExplore': 'Explore TripAdvisor Reviews',
    'medal.mapsHeading': 'Location & Marina Directions',
    'medal.mapsSubtitle': 'Directly on the scenic waterfront promenade of Port Ghalib Marina.',
    'medal.openInMaps': 'Open in Google Maps',
    'medal.getDirections': 'Get Turn-by-Turn Directions',
    'medal.conciergeTitle': 'Direct Concierge & Reservations',
    'medal.conciergeSubtitle': 'We are always at your service for table reservations, special celebrations, and inquiries.',
    'medal.whatsappCta': 'Message on WhatsApp',
    'medal.phoneCta': 'Call Restaurant',
    'medal.viewMenuCta': 'Explore Digital Menu',

    // Footer & Legal
    'footer.location': 'Location',
    'footer.openMaps': 'Open in Google Maps',
    'footer.address': 'Marina, Porto Ghalib, Red Sea Governorate, Egypt',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.cookies': 'Cookie Policy',
    'footer.cookiePreferences': 'Cookie Settings',
    'footer.installApp': 'Install App',
    'footer.rights': 'All rights reserved.',

    // Cookie Banner
    'cookie.title': 'Cookie & Privacy Choices',
    'cookie.description': 'We use essential cookies to power our digital table service, menu navigation, and anonymous analytics to continually refine your dining experience at Casa Italia.',
    'cookie.acceptAll': 'Accept All',
    'cookie.essentialOnly': 'Essential Only',
    'cookie.manage': 'Preferences',
    'cookie.policy': 'Read Cookie Policy',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('it');
  const [currency, setCurrencyState] = useState<string>('€');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('casaItaliaLanguage') as Language;
      if (savedLang && ['it', 'en'].includes(savedLang)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLanguageState(savedLang);
      }

      const savedCurr = localStorage.getItem('casaItaliaCurrency');
      if (savedCurr) {
        setCurrencyState(savedCurr);
      }

      // Fetch dynamic settings in background
      fetch('/api/settings/public')
        .then((res) => res.json() as Promise<{ settings?: { currency?: string } }>)
        .then((data) => {
          if (data?.settings?.currency) {
            setCurrencyState(data.settings.currency);
            localStorage.setItem('casaItaliaCurrency', data.settings.currency);
          }
        })
        .catch(() => {});
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('casaItaliaLanguage', lang);
    }
  };

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
    if (typeof window !== 'undefined') {
      localStorage.setItem('casaItaliaCurrency', curr);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const formatNumber = (val: string | number): string => {
    return String(val);
  };

  const formatCurrency = (amount: number): string => {
    const num = typeof amount === 'number' ? amount : parseFloat(String(amount) || '0');
    const formatted = num.toFixed(2);
    if (currency === 'EGP' || currency === 'LE') {
      return `${formatted} EGP`;
    }
    return `${currency}${formatted}`;
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['it']?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        t,
        formatNumber,
        formatCurrency,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
