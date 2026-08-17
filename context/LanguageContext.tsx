'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'it' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatNumber: (val: string | number) => string;
  formatCurrency: (amount: number) => string;
}

const translations: Record<Language, Record<string, string>> = {
  it: {
    // Navigation
    'nav.home': 'Inizio',
    'nav.menu': 'Menu',
    'nav.cart': 'Il Tuo Ordine',
    'nav.page': 'Pagina',
    'nav.of': 'di',
    'nav.prev': 'Prec',
    'nav.next': 'Succ',
    'nav.nextPage': 'Pagina Successiva',

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
    'dish.quickAdd': 'Aggiungi',
    'dish.added': 'Aggiunto!',
    'dish.viewDetails': 'Dettagli',

    // Order Drawer
    'cart.title': 'Il Tuo Ordine',
    'cart.empty': 'Il tuo ordine è vuoto',
    'cart.emptyDesc': 'Sfoglia il menu e aggiungi i tuoi piatti preferiti!',
    'cart.table': 'Tavolo',
    'cart.selectTable': 'Seleziona Tavolo',
    'cart.guests': 'Ospiti',
    'cart.subtotal': 'Subtotale',
    'cart.cover': 'Coperto (per persona)',
    'cart.serviceCharge': 'Servizio (12%)',
    'cart.total': 'Totale',
    'cart.sendOrder': 'Invia Ordine al Cameriere',
    'cart.callWaiter': 'Chiama Cameriere',
    'cart.requestBill': 'Richiedi Conto',
    'cart.clear': 'Svuota Ordine',
    'cart.notes': 'Note per la cucina...',
    'cart.orderSent': 'Ordine Inviato!',
    'cart.orderTransmitted': 'Il tuo ordine è stato trasmesso direttamente alla cucina.',
    'cart.showOrder': 'Mostra Ordine',
    'cart.item': 'articolo',
    'cart.items': 'articoli',
    'cart.estimatedTime': 'Tempo di preparazione stimato: 15–20 Min',

    // Table Modal
    'table.selectTitle': 'Seleziona il Tuo Tavolo',
    'table.selectDesc': 'Conferma il numero del tuo tavolo per ricevere assistenza immediata dal personale.',
    'table.confirm': 'Conferma Tavolo',
    'waiter.askedCheck': 'Conto richiesto per',
    'waiter.called': 'Cameriere chiamato per',

    // Footer
    'footer.tagline': '"La vera calore della cucina toscana, pasta fresca e rinomati vini italiani sulla tua tavola."',
    'footer.location': 'Posizione',
    'footer.openMaps': 'Apri in Google Maps',
    'footer.address': 'Marina, Porto Ghalib, Governatorato del Mar Rosso, Egitto',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.cart': 'Your Order',
    'nav.page': 'Page',
    'nav.of': 'of',
    'nav.prev': 'Prev',
    'nav.next': 'Next',
    'nav.nextPage': 'Next Page',

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
    'story.p2': 'Every single detail — from Tuscan-style tables to olive trees, from the scent of real morning espresso facing the marina to authentic Italian pizza — was chosen with care to let you breathe Italy in every moment. Casa Italia shock was never meant to be just a restaurant, but emotion, celebration, and family. And this... is only the beginning of our story.',
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
    'dish.quickAdd': 'Add',
    'dish.added': 'Added!',
    'dish.viewDetails': 'Details',

    // Order Drawer
    'cart.title': 'Your Order Draft',
    'cart.empty': 'Your order is empty',
    'cart.emptyDesc': 'Explore our menu and add your favorite Italian dishes!',
    'cart.table': 'Table',
    'cart.selectTable': 'Select Table',
    'cart.guests': 'Guests',
    'cart.subtotal': 'Subtotal',
    'cart.cover': 'Cover Charge (per guest)',
    'cart.serviceCharge': 'Service Charge (12%)',
    'cart.total': 'Total',
    'cart.sendOrder': 'Send Order to Waiter',
    'cart.callWaiter': 'Call Waiter',
    'cart.requestBill': 'Request Bill',
    'cart.clear': 'Clear Order',
    'cart.notes': 'Notes for the kitchen...',
    'cart.orderSent': 'Order Sent!',
    'cart.orderTransmitted': 'Your order has been transmitted directly to the kitchen.',
    'cart.showOrder': 'Show Order',
    'cart.item': 'item',
    'cart.items': 'items',
    'cart.estimatedTime': 'Estimated Preparation Time: 15–20 Mins',

    // Table Modal
    'table.selectTitle': 'Select Your Table',
    'table.selectDesc': 'Please confirm your table number so our floor staff can assist you immediately.',
    'table.confirm': 'Confirm Table',
    'waiter.askedCheck': 'Bill requested for',
    'waiter.called': 'Waiter called for',

    // Footer
    'footer.tagline': '"Bringing the true warmth of Tuscan dining, hand-rolled pastas, and iconic DOCG Italian wines to your table."',
    'footer.location': 'Location',
    'footer.openMaps': 'Open in Google Maps',
    'footer.address': 'Marina, Porto Ghalib, Red Sea Governorate, Egypt',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('it');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('casaItaliaLanguage') as Language;
      if (savedLang && ['it', 'en'].includes(savedLang)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLanguageState(savedLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('casaItaliaLanguage', lang);
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
    const formatted = amount.toFixed(2);
    return `€${formatted}`;
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['it']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatNumber, formatCurrency }}>
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
