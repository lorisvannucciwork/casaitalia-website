export type CategoryId =
  | 'antipasti'
  | 'primi'
  | 'pasta_fresca'
  | 'secondi_carne'
  | 'secondi_pesce'
  | 'contorni'
  | 'burger'
  | 'insalate'
  | 'pizze_rosse'
  | 'pizze_bianche'
  | 'dolci'
  | 'caffetteria'
  | 'bibite'
  | 'vini'
  | 'birre'
  | 'cocktails'
  | 'colazione';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
  italianName: string;
  pronunciation?: string;
  tags: string[];
  badge?: string;
  calories?: number;
  preparationTime?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  italianTitle: string;
  description: string;
  iconName: string;
}

export const MENU_CATEGORIES: Category[] = [
  {
    id: 'antipasti',
    name: 'Antipasti',
    italianTitle: 'Antipasti della Casa',
    description: 'Starters & Appetizers',
    iconName: 'Salad',
  },
  {
    id: 'primi',
    name: 'Primi Piatti',
    italianTitle: 'Primi Piatti Classici',
    description: 'Traditional Italian Pasta & Risotto',
    iconName: 'UtensilsCrossed',
  },
  {
    id: 'pasta_fresca',
    name: 'Pasta Fresca',
    italianTitle: 'Pasta Fresca',
    description: 'Fresh Pasta & Lasagna',
    iconName: 'Utensils',
  },
  {
    id: 'secondi_carne',
    name: 'Secondi Carne',
    italianTitle: 'Secondi Piatti di Carne',
    description: 'Gourmet Meat Specialties & Steaks',
    iconName: 'Flame',
  },
  {
    id: 'secondi_pesce',
    name: 'Secondi Pesce',
    italianTitle: 'Secondi Piatti di Pesce',
    description: 'Fresh Mediterranean Seafood & Fish',
    iconName: 'Fish',
  },
  {
    id: 'contorni',
    name: 'Contorni',
    italianTitle: 'Contorni e Side Dishes',
    description: 'Fresh Sides & Vegetables',
    iconName: 'CookingPot',
  },
  {
    id: 'burger',
    name: 'Burgers',
    italianTitle: 'Burger Gourmet',
    description: 'Handcrafted 200g Beef & Vegan Burgers',
    iconName: 'Beef',
  },
  {
    id: 'insalate',
    name: 'Insalate',
    italianTitle: 'Insalate Fresche',
    description: 'Fresh Seasonal Salads',
    iconName: 'Leaf',
  },
  {
    id: 'pizze_rosse',
    name: 'Pizze Rosse',
    italianTitle: 'Pizze Tradizionali con Pomodoro',
    description: 'Wood-Fired Red Base Pizzas',
    iconName: 'Pizza',
  },
  {
    id: 'pizze_bianche',
    name: 'Pizze Bianche',
    italianTitle: 'Pizze Bianche Speciali',
    description: 'Gourmet White Base Pizzas',
    iconName: 'Pizza',
  },
  {
    id: 'dolci',
    name: 'Dolci',
    italianTitle: 'Dolci e Dessert',
    description: 'Artisanal Desserts & Tiramisù',
    iconName: 'Cake',
  },
  {
    id: 'caffetteria',
    name: 'Caffetteria',
    italianTitle: 'Caffetteria Italiana',
    description: 'Espresso, Cappuccino & Hot Drinks',
    iconName: 'Coffee',
  },
  {
    id: 'bibite',
    name: 'Bibite',
    italianTitle: 'Bibite & Refreshments',
    description: 'Cold Beverages, Waters & Juices',
    iconName: 'CupSoda',
  },
  {
    id: 'vini',
    name: 'Vini',
    italianTitle: 'Carta dei Vini',
    description: 'Curated Italian Wines',
    iconName: 'Wine',
  },
  {
    id: 'birre',
    name: 'Birre',
    italianTitle: 'Selezione di Birre',
    description: 'Draft & Bottled Beers',
    iconName: 'Beer',
  },
  {
    id: 'cocktails',
    name: 'Cocktails',
    italianTitle: 'Cocktails & Aperitivi',
    description: 'Signature Cocktails & Mocktails',
    iconName: 'GlassWater',
  },
  {
    id: 'colazione',
    name: 'Colazione',
    italianTitle: 'Colazione Italiana',
    description: 'Breakfast Croissants & Dishes',
    iconName: 'Croissant',
  },
];

export const ANTIPASTI: MenuItem[] = [
  {
    id: "tartare-di-tonno-all-arancia-1",
    italianName: "TARTARE DI TONNO ALL'ARANCIA",
    tags: [],
    name: "Tuna Tartare with Orange",
    description: "Tuna tartare with orange cream",
    price: 15,
    category: "antipasti",
    image: "/menu/TARTARE DI TONNO ALL ARANCIA.webp"
  },
  {
    id: "polpo-alla-piastra-su-vellutata-di-patate-olive-e-pomodorini-2",
    italianName: "POLPO ALLA PIASTRA SU VELLUTATA DI PATATE, OLIVE E POMODORINI",
    tags: [],
    name: "Grilled Octopus on Potato Cream",
    description: "Grilled octopus on a cream of potatoes, olives and cherry tomatoes",
    price: 17,
    category: "antipasti",
    image: "/menu/POLPO ALLA PIASTRA.webp"
  },
  {
    id: "tartare-di-salmone-al-mango-3",
    italianName: "TARTARE DI SALMONE AL MANGO",
    tags: [],
    name: "Salmon Tartare with Mango",
    description: "Salmon tartare with mango cream",
    price: 15,
    category: "antipasti",
    image: "/menu/TARTARE DI SALMONE AL MANGO.webp"
  },
  {
    id: "tris-di-crostini-con-pat-di-fegatini-pomodoro-e-basilico-pecorino-e-guanciale-4",
    italianName: "TRIS DI CROSTINI CON PATÉ DI FEGATINI, POMODORO E BASILICO, PECORINO E GUANCIALE",
    tags: [],
    name: "Tuscan Crostini Trio",
    description: "Trio of crostini with liver pâté, fresh tomato and basil, pecorino cheese and guanciale",
    price: 15,
    category: "antipasti",
    image: "/menu/TRIS DI CROSTINI.webp"
  },
  {
    id: "gran-tagliere-casa-italia-di-salumi-e-formaggi-5",
    italianName: "GRAN TAGLIERE 'CASA ITALIA' DI SALUMI E FORMAGGI",
    tags: [],
    name: "Casa Italia Grand Charcuterie Board",
    description: "Platter 'Casa Italia' with cold cuts and cheeses",
    price: 29,
    category: "antipasti",
    image: "/menu/GRAN TAGLIERE CASA ITALIA.webp"
  },
  {
    id: "parmigiana-di-melanzane-6",
    italianName: "PARMIGIANA DI MELANZANE",
    tags: [],
    name: "Eggplant Parmigiana",
    description: "Eggplant parmigiana",
    price: 11,
    category: "antipasti",
    image: "/menu/PARMIGIANA DI MELAZANE.webp"
  },
  {
    id: "carpaccio-di-manzo-servito-con-rucola-noci-scaglie-di-parmigiano-capperi-e-crema-di-parmigiano-7",
    italianName: "CARPACCIO DI MANZO SERVITO CON RUCOLA, NOCI, SCAGLIE DI PARMIGIANO, CAPPERI E CREMA DI PARMIGIANO",
    tags: [],
    name: "Gourmet Beef Carpaccio",
    description: "Beef carpaccio served with rocket, nuts, parmesan scales, capers and parmesan cream",
    price: 19,
    category: "antipasti",
    image: "/menu/CARPACCIO DI MANZO.webp"
  },
  {
    id: "vitello-tonnato-8",
    italianName: "VITELLO TONNATO",
    tags: [],
    name: "Classic Vitello Tonnato",
    description: "Veal with tuna sauce",
    price: 17,
    category: "antipasti",
    image: "/menu/VITELLO TONNATO.webp"
  },
  {
    id: "tartare-di-manzo-servita-con-tuorlo-d-uovo-e-crema-di-parmigiano-9",
    italianName: "TARTARE DI MANZO SERVITA CON TUORLO D'UOVO E CREMA DI PARMIGIANO",
    tags: [],
    name: "Beef Tartare with Egg Yolk & Parmesan",
    description: "Beef tartare served with raw egg yolk and parmesan cream",
    price: 17,
    category: "antipasti",
    image: "/menu/TARTARE DI MANZO.webp"
  }
];

export const PRIMI: MenuItem[] = [
  {
    id: "penne-pomodoro-basilico-e-stracciatella-10",
    italianName: "PENNE POMODORO, BASILICO E STRACCIATELLA",
    tags: [],
    name: "Penne Tomato & Stracciatella",
    description: "Penne with tomato, basil and stracciatella",
    price: 14,
    category: "primi",
    image: ""
  },
  {
    id: "rigatoni-alla-bolognese-11",
    italianName: "RIGATONI ALLA BOLOGNESE",
    tags: [],
    name: "Rigatoni Bolognese",
    description: "Rigatoni with bolognese ragù",
    price: 16,
    category: "primi",
    image: ""
  },
  {
    id: "spaghetti-alla-carbonara-12",
    italianName: "SPAGHETTI ALLA CARBONARA",
    tags: [],
    name: "Authentic Spaghetti Carbonara",
    description: "Spaghetti with eggs sauce and guanciale",
    price: 18,
    category: "primi",
    image: "/menu/SPAGHETTI ALLA CARBONARA.webp"
  },
  {
    id: "penne-al-salmone-13",
    italianName: "PENNE AL SALMONE",
    tags: [],
    name: "Penne with Salmon",
    description: "Penne with smoked salmon sauce",
    price: 20,
    category: "primi",
    image: "/menu/PENNE AL SALMONE.webp"
  },
  {
    id: "spaghetti-ai-frutti-di-mare-14",
    italianName: "SPAGHETTI AI FRUTTI DI MARE",
    tags: [],
    name: "Seafood Spaghetti",
    description: "Seafood spaghetti",
    price: 20,
    category: "primi",
    image: "/menu/SPAGHETTI AL FRUTTI DI MARE.webp"
  },
  {
    id: "risotto-ai-crostacei-e-burrata-15",
    italianName: "RISOTTO AI CROSTACEI E BURRATA",
    tags: [],
    name: "Shellfish & Burrata Risotto",
    description: "Risotto with shellfish and burrata",
    price: 20,
    category: "primi",
    image: "/menu/RISOTTO AL CROSTACEI E BURRATA.webp"
  },
  {
    id: "risotto-al-tartufo-16",
    italianName: "RISOTTO AL TARTUFO",
    tags: [],
    name: "Truffle Risotto",
    description: "Truffle risotto",
    price: 20,
    category: "primi",
    image: "/menu/RISOTTO AL TARUFO.webp"
  }
];

export const PASTA_FRESCA: MenuItem[] = [
  {
    id: "tortellini-panna-e-prosciutto-17",
    italianName: "TORTELLINI PANNA E PROSCIUTTO",
    tags: [],
    name: "Tortellini with Cream & Prosciutto",
    description: "Tortellini with cream and cooked ham",
    price: 20,
    category: "pasta_fresca",
    image: "/menu/110B2372.webp"
  },
  {
    id: "lasagna-al-rag-18",
    italianName: "LASAGNA AL RAGÙ",
    tags: [],
    name: "Beef Lasagna",
    description: "Lasagna with meat sauce",
    price: 28,
    category: "pasta_fresca",
    image: "/menu/LASAGNA AL RAGU.webp"
  },
  {
    id: "gnocchi-verdi-agli-spinaci-19",
    italianName: "GNOCCHI VERDI AGLI SPINACI",
    tags: [],
    name: "Spinach Gnocchi",
    description: "Green gnocchi with spinach sauce",
    price: 15,
    category: "pasta_fresca",
    image: "/menu/GNOCCHI VERDI AGLI SPINACI.webp"
  },
  {
    id: "gnocchi-al-rag-20",
    italianName: "GNOCCHI AL RAGÙ",
    tags: [],
    name: "Gnocchi with Meat Ragù",
    description: "Gnocchi with meat sauce",
    price: 16,
    category: "pasta_fresca",
    image: "/menu/GNOCCHI AL RAGU.webp"
  },
  {
    id: "ravioli-ripieni-ai-4-formaggi-serviti-con-salsa-al-gorgonzola-21",
    italianName: "RAVIOLI RIPIENI AI 4 FORMAGGI SERVITI CON SALSA AL GORGONZOLA",
    tags: [],
    name: "Four Cheese Ravioli with Gorgonzola Sauce",
    description: "Ravioli stuffed with four cheeses served with blue cheese sauce",
    price: 16,
    category: "pasta_fresca",
    image: "/menu/RAVIOLI RIPIENI AL 4 FORMAGGI.webp"
  },
  {
    id: "ravioli-ripieni-al-salmone-serviti-con-salsa-al-salmone-22",
    italianName: "RAVIOLI RIPIENI AL SALMONE SERVITI CON SALSA AL SALMONE",
    tags: [],
    name: "Salmon Ravioli with Salmon Sauce",
    description: "Ravioli stuffed with salmon served with salmon sauce",
    price: 18,
    category: "pasta_fresca",
    image: "/menu/RAVIOLI  RIPIENI AL SALMONE.webp"
  },
  {
    id: "ravioli-ripieni-al-tartufo-serviti-con-salsa-al-tartufo-23",
    italianName: "RAVIOLI RIPIENI AL TARTUFO SERVITI CON SALSA AL TARTUFO",
    tags: [],
    name: "Truffle Ravioli with Truffle Sauce",
    description: "Ravioli stuffed with truffle served with truffle sauce",
    price: 17,
    category: "pasta_fresca",
    image: "/menu/RAVIOLI RIPIENI AL TARTUFO.webp"
  },
  {
    id: "ravioli-ripieni-ricotta-e-spinaci-serviti-con-salsa-agli-spinaci-24",
    italianName: "RAVIOLI RIPIENI RICOTTA E SPINACI SERVITI CON SALSA AGLI SPINACI",
    tags: [],
    name: "Ricotta & Spinach Ravioli",
    description: "Ravioli stuffed with ricotta and spinach served with spinach sauce",
    price: 15,
    category: "pasta_fresca",
    image: "/menu/RAVIOLI RIPIENI AL TARTUFO (2).webp"
  }
];

export const SECONDI_CARNE: MenuItem[] = [
  {
    id: "filetto-di-manzo-al-pepe-o-ai-funghi-con-patate-al-forno-e-verdure-saltate-25",
    italianName: "FILETTO DI MANZO AL PEPE O AI FUNGHI CON PATATE AL FORNO E VERDURE SALTATE",
    tags: [],
    name: "Beef Tenderloin Steak",
    description: "Beef fillet with pepper sauce or mushrooms sauce served with baked potatoes and sautèed vegetables",
    price: 24,
    category: "secondi_carne",
    image: "/menu/FILETTO DI MANZO.webp"
  },
  {
    id: "bistecca-di-manzo-alla-piastra-con-verdure-e-patatine-fritte-26",
    italianName: "BISTECCA DI MANZO ALLA PIASTRA CON VERDURE E PATATINE FRITTE",
    tags: [],
    name: "Grilled Beef Steak with Vegetables & Fries",
    description: "Grilled beef steak with vegetables and french fries",
    price: 26,
    category: "secondi_carne",
    image: ""
  },
  {
    id: "filetto-di-cammello-al-pepe-con-patate-al-forno-e-verdure-saltate-27",
    italianName: "FILETTO DI CAMMELLO AL PEPE CON PATATE AL FORNO E VERDURE SALTATE",
    tags: [],
    name: "Camel Fillet with Pepper Sauce",
    description: "Camel fillet with pepper sauce served with baked potatoes and sautèed vegetables",
    price: 26,
    category: "secondi_carne",
    image: ""
  },
  {
    id: "pollo-al-limone-con-pur-28",
    italianName: "POLLO AL LIMONE CON PURÈ",
    tags: [],
    name: "Lemon Chicken with Mashed Potatoes",
    description: "Lemon chicken with mashed potatoes",
    price: 18,
    category: "secondi_carne",
    image: "/menu/POLLO AL LIMONE.webp"
  },
  {
    id: "pollo-affumicato-con-salsa-di-peperoni-affumicati-servito-con-pur-29",
    italianName: "POLLO AFFUMICATO CON SALSA DI PEPERONI AFFUMICATI SERVITO CON PURÈ",
    tags: [],
    name: "Smoked Chicken with Roasted Pepper Sauce",
    description: "Smoked chicken with smoked peppers sauce served with mashed potatoes",
    price: 18,
    category: "secondi_carne",
    image: ""
  },
  {
    id: "cotoletta-di-pollo-servita-con-insalata-verde-30",
    italianName: "COTOLETTA DI POLLO SERVITA CON INSALATA VERDE",
    tags: [],
    name: "Chicken Cutlet with Green Salad",
    description: "Chicken panè served with green salad",
    price: 20,
    category: "secondi_carne",
    image: "/menu/COTOLETTA DI POLLO.webp"
  },
  {
    id: "cotoletta-di-vitello-servita-con-rucola-e-scaglie-di-parmigiano-31",
    italianName: "COTOLETTA DI VITELLO SERVITA CON RUCOLA E SCAGLIE DI PARMIGIANO",
    tags: [],
    name: "Veal Cutlet with Arugula & Parmesan",
    description: "Veal panè served with rocket and parmesan scales",
    price: 22,
    category: "secondi_carne",
    image: "/menu/COTOLETTA DI VITELLO.webp"
  }
];

export const SECONDI_PESCE: MenuItem[] = [
  {
    id: "fritto-di-mare-con-verdure-croccanti-32",
    italianName: "FRITTO DI MARE CON VERDURE CROCCANTI",
    tags: [],
    name: "Fried Seafood with Crispy Vegetables",
    description: "Fried seafood with crispy vegetables",
    price: 22,
    category: "secondi_pesce",
    image: "/menu/FRITTO DIMARECON.webp"
  },
  {
    id: "filetto-di-salmone-con-salsa-ai-gamberi-servito-con-verdure-grigliate-33",
    italianName: "FILETTO DI SALMONE CON SALSA AI GAMBERI SERVITO CON VERDURE GRIGLIATE",
    tags: [],
    name: "Salmon Fillet with Shrimp Sauce",
    description: "Salmon fillet with shrimps sauce served with grilled vegetables",
    price: 24,
    category: "secondi_pesce",
    image: "/menu/FILETTO DI SALMONE CON SALSA AL GAMBERI.webp"
  },
  {
    id: "tagliata-di-tonno-in-crosta-di-pistacchio-su-crema-di-piselli-con-verdure-34",
    italianName: "TAGLIATA DI TONNO IN CROSTA DI PISTACCHIO SU CREMA DI PISELLI CON VERDURE",
    tags: [],
    name: "Pistachio-Crusted Tuna Steak on Pea Cream",
    description: "Sliced tuna in a pistachio crust on pea cream and vegetables",
    price: 26,
    category: "secondi_pesce",
    image: "/menu/TAGLIATA DI TONNO.webp"
  },
  {
    id: "filetto-di-salmone-al-forno-su-crema-di-spinaci-con-patate-al-forno-35",
    italianName: "FILETTO DI SALMONE AL FORNO SU CREMA DI SPINACI CON PATATE AL FORNO",
    tags: [],
    name: "Baked Salmon on Spinach Cream",
    description: "Baked salmon fillet on creme of spinach with baked potatoes",
    price: 22,
    category: "secondi_pesce",
    image: "/menu/FILETTO DI SALMONE AL FORNO.webp"
  },
  {
    id: "gamberi-grigliati-con-verdure-grigliate-36",
    italianName: "GAMBERI GRIGLIATI CON VERDURE GRIGLIATE",
    tags: [],
    name: "Grilled Shrimp with Grilled Vegetables",
    description: "Grilled shrimps with grilled vegetables",
    price: 26,
    category: "secondi_pesce",
    image: "/menu/GAMBERI GRIGLIATI.webp"
  },
  {
    id: "spigola-all-arancia-con-patate-al-forno-37",
    italianName: "SPIGOLA ALL'ARANCIA CON PATATE AL FORNO",
    tags: [],
    name: "Sea Bass with Orange & Roast Potatoes",
    description: "Seabass with orange sauce served with baked potatoes",
    price: 22,
    category: "secondi_pesce",
    image: ""
  }
];

export const CONTORNI: MenuItem[] = [
  {
    id: "verdure-grigliate-38",
    italianName: "VERDURE GRIGLIATE",
    tags: [],
    name: "Grilled Vegetables", description: "Grilled vegetables", price: 5, category: "contorni", image: "" },
  {
    id: "verdure-saltate-39",
    italianName: "VERDURE SALTATE",
    tags: [],
    name: "Sautéed Vegetables", description: "Sauteed vegetables", price: 5, category: "contorni", image: "" },
  {
    id: "insalata-40",
    italianName: "INSALATA",
    tags: [],
    name: "Mixed Green Salad", description: "Salad", price: 5, category: "contorni", image: "" },
  {
    id: "pur-41",
    italianName: "PURÈ",
    tags: [],
    name: "Mashed Potatoes", description: "Mashed potatoes", price: 5, category: "contorni", image: "" },
  {
    id: "patatine-fritte-42",
    italianName: "PATATINE FRITTE",
    tags: [],
    name: "French Fries", description: "French fries", price: 5, category: "contorni", image: "" },
  {
    id: "patate-al-forno-43",
    italianName: "PATATE AL FORNO",
    tags: [],
    name: "Roast Potatoes", description: "Baked potatoes", price: 5, category: "contorni", image: "" }
];

export const BURGERS: MenuItem[] = [
  {
    id: "cheeseburger-44",
    italianName: "CHEESEBURGER",
    tags: [],
    name: "Classic Cheeseburger",
    description: "BIG Beef burger 200g, cheddar cheese, onion and pickled cucumbers served with fried potatoes",
    price: 13,
    category: "burger",
    image: ""
  },
  {
    id: "smashburger-45",
    italianName: "SMASHBURGER",
    tags: [],
    name: "Smash Burger",
    description: "BIG Beef burger 200g, salad, tomatoes and mustard served with fried potatoes",
    price: 17,
    category: "burger",
    image: ""
  },
  {
    id: "vegan-burger-46",
    italianName: "VEGAN BURGER",
    tags: [],
    name: "Vegan Burger",
    description: "Vegan burger, salad, fresh cucumber and onion",
    price: 13,
    category: "burger",
    image: "/menu/VEGAN BURGER.webp"
  }
];

export const INSALATE: MenuItem[] = [
  {
    id: "salad-port-ghalib-47",
    italianName: "SALAD PORT GHALIB",
    tags: [],
    name: "Port Ghalib Salad",
    description: "Salad, grilled chicken, toasted bread, parmesan, caesar sauce",
    price: 15,
    category: "insalate",
    image: "/menu/CAESAR SALAD.webp"
  },
  {
    id: "tuna-salad-48",
    italianName: "TUNA SALAD",
    tags: [],
    name: "Tuna Salad",
    description: "Tuna slices, tomatoes, salad, carrots and mozzarella",
    price: 12,
    category: "insalate",
    image: "/menu/TUNA SALAD.webp"
  },
  {
    id: "caesar-49",
    italianName: "CAESAR",
    tags: [],
    name: "Caesar Salad",
    description: "Salad and parmesan",
    price: 12,
    category: "insalate",
    image: "/menu/CAESAR SALAD.webp"
  },
  {
    id: "caprese-50",
    italianName: "CAPRESE",
    tags: [],
    name: "Caprese Salad",
    description: "Fresh tomato, mozzarella and basil sauce",
    price: 15,
    category: "insalate",
    image: "/menu/CAPRESE.webp"
  },
  {
    id: "crudo-e-bufala-51",
    italianName: "CRUDO E BUFALA",
    tags: [],
    name: "Prosciutto & Buffalo Mozzarella Salad",
    description: "Raw ham and buffalo mozzarella",
    price: 19,
    category: "insalate",
    image: "/menu/CRUDO E BUFALA.webp"
  }
];

export const PIZZE_ROSSE: MenuItem[] = [
  {
    id: "margherita-52",
    italianName: "MARGHERITA",
    tags: [],
    name: "Margherita Pizza", description: "Tomato sauce, mozzarella and basil", price: 9, category: "pizze_rosse", image: "/menu/MARGHERITA.webp" },
  {
    id: "marinara-53",
    italianName: "MARINARA",
    tags: [],
    name: "Marinara Pizza", description: "Tomato sauce, garlic and oregano", price: 7, category: "pizze_rosse", image: "/menu/MARINARA.webp" },
  {
    id: "tonno-e-cipolla-54",
    italianName: "TONNO E CIPOLLA",
    tags: [],
    name: "Tuna & Onion Pizza", description: "Tomato sauce, mozzarella, tuna and onions", price: 10, category: "pizze_rosse", image: "" },
  {
    id: "napoli-55",
    italianName: "NAPOLI",
    tags: [],
    name: "Napoli Pizza", description: "Tomato sauce, mozzarella, anchovies, capers", price: 10, category: "pizze_rosse", image: "/menu/NAPOLI.webp" },
  {
    id: "crudo-rucola-e-grana-56",
    italianName: "CRUDO, RUCOLA E GRANA",
    tags: [],
    name: "Prosciutto, Arugula & Grana Pizza", description: "Tomato sauce, mozzarella, raw ham, rocket and parmesan flakes", price: 16, category: "pizze_rosse", image: "/menu/CRUDO RUCOLA E GRANA.webp" },
  {
    id: "bufalina-57",
    italianName: "BUFALINA",
    tags: [],
    name: "Buffalo Mozzarella Pizza", description: "Tomato sauce, buffalo mozzarella and basil", price: 14, category: "pizze_rosse", image: "/menu/BUFALINA.webp" },
  {
    id: "vegetariana-58",
    italianName: "VEGETARIANA",
    tags: [],
    name: "Vegetarian Pizza", description: "Tomato sauce, mozzarella and grilled vegetables", price: 12, category: "pizze_rosse", image: "/menu/VEGETARIANA.webp" },
  {
    id: "frutti-di-mare-59",
    italianName: "FRUTTI DI MARE",
    tags: [],
    name: "Seafood Pizza", description: "Tomato sauce, mozzarella and seafood", price: 15, category: "pizze_rosse", image: "/menu/110B2651.webp" },
  {
    id: "salamino-60",
    italianName: "SALAMINO",
    tags: [],
    name: "Salami Pizza", description: "Tomato sauce, mozzarella and salami (pork salami OR cow salami)", price: 16, category: "pizze_rosse", image: "/menu/SALAMINO.webp" },
  {
    id: "calzone-port-ghalib-61",
    italianName: "CALZONE PORT GHALIB",
    tags: [],
    name: "Port Ghalib Calzone", description: "Tomato sauce, mozzarella, cooked ham", price: 12, category: "pizze_rosse", image: "/menu/CALZONE.webp" }
];

export const PIZZE_BIANCHE: MenuItem[] = [
  {
    id: "gamberi-e-zucchine-62",
    italianName: "GAMBERI E ZUCCHINE",
    tags: [],
    name: "Shrimp & Zucchini Pizza", description: "Mozzarella, shrimps and zucchinis", price: 14, category: "pizze_bianche", image: "/menu/GAMBERI E ZUCCHINE.webp" },
  {
    id: "mortadella-burrata-e-pistacchi-63",
    italianName: "MORTADELLA, BURRATA E PISTACCHI",
    tags: [],
    name: "Mortadella, Burrata & Pistachio Pizza", description: "Mozzarella, mortadella, burrata and pistachios", price: 18, category: "pizze_bianche", image: "/menu/MORTADELLA BURRATA E PISTACCHI.webp" },
  {
    id: "quattro-formaggi-64",
    italianName: "QUATTRO FORMAGGI",
    tags: [],
    name: "Four Cheese Pizza", description: "Four cheeses", price: 12, category: "pizze_bianche", image: "/menu/QUATTRO FORMAGGI.webp" },
  {
    id: "pane-arabo-salmone-avocado-e-formaggio-65",
    italianName: "PANE ARABO SALMONE, AVOCADO E FORMAGGIO",
    tags: [],
    name: "Arabic Bread with Salmon, Avocado & Cheese", description: "Salmon, avocado and cheese", price: 16, category: "pizze_bianche", image: "" },
  {
    id: "speck-mascarpone-e-noci-66",
    italianName: "SPECK, MASCARPONE E NOCI",
    tags: [],
    name: "Speck, Mascarpone & Walnut Pizza", description: "Speck, cheese and walnuts", price: 18, category: "pizze_bianche", image: "/menu/SPECK-MASCARPONE-E-NOCI.webp" },
  {
    id: "tartufo-67",
    italianName: "TARTUFO",
    tags: [],
    name: "Truffle Pizza", description: "Mozzarella, truffle cream and truffle oil", price: 18, category: "pizze_bianche", image: "/menu/TARTUFO.webp" }
];

export const DOLCI: MenuItem[] = [
  {
    id: "tiramis-68",
    italianName: "TIRAMISÙ",
    tags: [],
    name: "Traditional Tiramisù", description: "Traditional Tiramisù", price: 7, category: "dolci", image: "" },
  {
    id: "tortino-al-cioccolato-con-panna-69",
    italianName: "TORTINO AL CIOCCOLATO CON PANNA",
    tags: [],
    name: "Chocolate Lava Cake with Cream", description: "Chocolate cake with whipped cream", price: 6, category: "dolci", image: "" },
  {
    id: "sgroppino-70",
    italianName: "SGROPPINO",
    tags: [],
    name: "Sgroppino Lemon Sorbet Cocktail", description: "Lemon ice cream, vodka and prosecco", price: 7, category: "dolci", image: "" },
  {
    id: "gnocco-fritto-71",
    italianName: "GNOCCO FRITTO",
    tags: [],
    name: "Fried Dough Puffs", description: "Fried dumpling with chocolate, pistachio or white chocolate", price: 5, category: "dolci", image: "" },
  {
    id: "coppa-gelato-72",
    italianName: "COPPA GELATO",
    tags: [],
    name: "Gelato Cup", description: "Ice cream cup: lemon, strawberry, mango, chocolate or vanilla", price: 6, category: "dolci", image: "" },
  {
    id: "cheesecake-73",
    italianName: "CHEESECAKE",
    tags: [],
    name: "Cheesecake", description: "Cheesecake", price: 6, category: "dolci", image: "" },
  {
    id: "torta-del-giorno-74",
    italianName: "TORTA DEL GIORNO",
    tags: [],
    name: "Cake of the Day", description: "Cake of the day", price: 5, category: "dolci", image: "" }
];

export const CAFFETTERIA: MenuItem[] = [
  {
    id: "caff-espresso-75",
    italianName: "CAFFÈ ESPRESSO",
    tags: [],
    name: "Espresso", description: "", price: 2.5, category: "caffetteria", image: "" },
  {
    id: "caff-macchiato-76",
    italianName: "CAFFÈ MACCHIATO",
    tags: [],
    name: "Macchiato", description: "", price: 3, category: "caffetteria", image: "" },
  {
    id: "cappuccino-77",
    italianName: "CAPPUCCINO",
    tags: [],
    name: "Cappuccino", description: "", price: 3.5, category: "caffetteria", image: "" },
  {
    id: "latte-bianco-78",
    italianName: "LATTE BIANCO",
    tags: [],
    name: "Steamed Milk", description: "White milk", price: 2, category: "caffetteria", image: "" },
  {
    id: "latte-macchiato-79",
    italianName: "LATTE MACCHIATO",
    tags: [],
    name: "Latte Macchiato", description: "Flat white", price: 3, category: "caffetteria", image: "" },
  {
    id: "caff-americano-80",
    italianName: "CAFFÈ AMERICANO",
    tags: [],
    name: "Americano", description: "", price: 2.5, category: "caffetteria", image: "" },
  {
    id: "macha-latte-81",
    italianName: "MACHA LATTE",
    tags: [],
    name: "Matcha Latte", description: "", price: 4, category: "caffetteria", image: "" },
  {
    id: "caff-freddo-82",
    italianName: "CAFFÈ FREDDO",
    tags: [],
    name: "Iced Coffee", description: "Ice coffee", price: 3.5, category: "caffetteria", image: "" }
];

export const BIBITE: MenuItem[] = [
  {
    id: "acqua-1l-still-83",
    italianName: "ACQUA 1L STILL",
    tags: [],
    name: "Still Water 1L", description: "Still water 1L", price: 3.5, category: "bibite", image: "" },
  {
    id: "acqua-0-5l-sparkling-84",
    italianName: "ACQUA 0.5L SPARKLING",
    tags: [],
    name: "Sparkling Water 0.5L", description: "Sparkling water 0.5L", price: 2.5, category: "bibite", image: "" },
  {
    id: "schweppes-soda-85",
    italianName: "SCHWEPPES SODA",
    tags: [],
    name: "Schweppes Soda", description: "", price: 2.5, category: "bibite", image: "" },
  {
    id: "schweppes-tonic-86",
    italianName: "SCHWEPPES TONIC",
    tags: [],
    name: "Schweppes Tonic", description: "", price: 2.5, category: "bibite", image: "" },
  {
    id: "sprite-87",
    italianName: "SPRITE",
    tags: [],
    name: "Sprite", description: "", price: 2.5, category: "bibite", image: "" },
  {
    id: "fanta-88",
    italianName: "FANTA",
    tags: [],
    name: "Fanta", description: "", price: 2.5, category: "bibite", image: "" },
  {
    id: "coca-cola-89",
    italianName: "COCA COLA",
    tags: [],
    name: "Coca Cola", description: "", price: 2.5, category: "bibite", image: "" },
  {
    id: "coca-cola-zero-90",
    italianName: "COCA COLA ZERO",
    tags: [],
    name: "Coca Cola Zero", description: "", price: 2.5, category: "bibite", image: "" },
  {
    id: "the-sant-anna-91",
    italianName: "THE SANT'ANNA",
    tags: [],
    name: "Sant'Anna Iced Tea", description: "", price: 2.5, category: "bibite", image: "" },
  {
    id: "red-bull-92",
    italianName: "RED BULL",
    tags: [],
    name: "Red Bull", description: "", price: 4, category: "bibite", image: "" },
  {
    id: "spremuta-fresh-juice-93",
    italianName: "SPREMUTA FRESH JUICE",
    tags: [],
    name: "Fresh Squeezed Juice", description: "Lemon, Orange, or Mango", price: 5, category: "bibite", image: "" },
  {
    id: "fever-tree-ginger-ale-94",
    italianName: "FEVER-TREE GINGER ALE",
    tags: [],
    name: "Fever Tree Ginger Ale", description: "", price: 3, category: "bibite", image: "" },
  {
    id: "fever-tree-soda-mexican-lime-95",
    italianName: "FEVER-TREE SODA MEXICAN LIME",
    tags: [],
    name: "Fever Tree Mexican Lime Soda", description: "", price: 3, category: "bibite", image: "" },
  {
    id: "fever-tree-soda-pink-grapefruit-96",
    italianName: "FEVER-TREE SODA PINK GRAPEFRUIT",
    tags: [],
    name: "Fever Tree Pink Grapefruit Soda", description: "", price: 3, category: "bibite", image: "" },
  {
    id: "fever-tree-tonic-water-97",
    italianName: "FEVER-TREE TONIC WATER",
    tags: [],
    name: "Fever Tree Tonic Water", description: "", price: 3, category: "bibite", image: "" }
];

export const VINI: MenuItem[] = [
  {
    id: "capebay-white-98",
    italianName: "CAPEBAY WHITE",
    tags: [],
    name: "Capebay White Wine", description: "Chardonnay (Glass: €6)", price: 30, category: "vini", image: "" },
  {
    id: "castello-di-trevi-white-99",
    italianName: "CASTELLO DI TREVI WHITE",
    tags: [],
    name: "Castello di Trevi White Wine", description: "Vermentino (Glass: €7)", price: 35, category: "vini", image: "" },
  {
    id: "chateau-de-granville-white-100",
    italianName: "CHATEAU DE GRANVILLE WHITE",
    tags: [],
    name: "Chateau de Granville White Wine", description: "Semillon (Glass: €8)", price: 40, category: "vini", image: "" },
  {
    id: "jardin-du-nil-white-101",
    italianName: "JARDIN DU NIL WHITE",
    tags: [],
    name: "Jardin du Nil White Wine", description: "Vermentino (Glass: €7)", price: 35, category: "vini", image: "" },
  {
    id: "grand-marquis-white-102",
    italianName: "GRAND MARQUIS WHITE",
    tags: [],
    name: "Grand Marquis White Wine", description: "Sultanine Blanche (Glass: €8)", price: 40, category: "vini", image: "" },
  {
    id: "chateau-byblos-white-103",
    italianName: "CHATEAU BYBLOS WHITE",
    tags: [],
    name: "Chateau Byblos White Wine", description: "Chardonnay, Sauvignon (Glass: €7)", price: 35, category: "vini", image: "" },
  {
    id: "capebay-red-104",
    italianName: "CAPEBAY RED",
    tags: [],
    name: "Capebay Red Wine", description: "Merlot (Glass: €6)", price: 30, category: "vini", image: "" },
  {
    id: "castello-di-trevi-red-105",
    italianName: "CASTELLO DI TREVI RED",
    tags: [],
    name: "Castello di Trevi Red Wine", description: "Merlot, Syrah (Glass: €7)", price: 35, category: "vini", image: "" },
  {
    id: "chateau-de-granville-red-106",
    italianName: "CHATEAU DE GRANVILLE RED",
    tags: [],
    name: "Chateau de Granville Red Wine", description: "Cabernet, Sauvignon (Glass: €8)", price: 40, category: "vini", image: "" },
  {
    id: "grand-marquis-red-107",
    italianName: "GRAND MARQUIS RED",
    tags: [],
    name: "Grand Marquis Red Wine", description: "Carignan, Syrah (Glass: €8)", price: 40, category: "vini", image: "" },
  {
    id: "jardin-du-nil-red-108",
    italianName: "JARDIN DU NIL RED",
    tags: [],
    name: "Jardin du Nil Red Wine", description: "Cabernet, Sauvignon, Syrah (Glass: €7)", price: 35, category: "vini", image: "" },
  {
    id: "castello-di-trevi-ros-109",
    italianName: "CASTELLO DI TREVI ROSÉ",
    tags: [],
    name: "Castello di Trevi Rosé Wine", description: "Rosé (Glass: €8)", price: 40, category: "vini", image: "" },
  {
    id: "le-baron-ros-110",
    italianName: "LE BARON ROSÉ",
    tags: [],
    name: "Le Baron Rosé Wine", description: "Sparkling Rosé", price: 45, category: "vini", image: "" },
  {
    id: "le-baron-white-111",
    italianName: "LE BARON WHITE",
    tags: [],
    name: "Le Baron White Wine", description: "Sparkling White", price: 45, category: "vini", image: "" },
  {
    id: "valmont-ros-112",
    italianName: "VALMONT ROSÉ",
    tags: [],
    name: "Valmont Rosé Wine", description: "Sparkling Rosé (Glass: €7)", price: 35, category: "vini", image: "" },
  {
    id: "valmont-white-113",
    italianName: "VALMONT WHITE",
    tags: [],
    name: "Valmont White Wine", description: "Sparkling White (Glass: €7)", price: 35, category: "vini", image: "" }
];

export const BIRRE: MenuItem[] = [
  {
    id: "heineken-114",
    italianName: "HEINEKEN",
    tags: [],
    name: "Heineken Beer", description: "", price: 5, category: "birre", image: "" },
  {
    id: "stella-115",
    italianName: "STELLA",
    tags: [],
    name: "Stella Artois Beer", description: "", price: 5, category: "birre", image: "" },
  {
    id: "sakara-116",
    italianName: "SAKARA",
    tags: [],
    name: "Sakara Beer", description: "", price: 5, category: "birre", image: "" },
  {
    id: "meister-max-117",
    italianName: "MEISTER MAX",
    tags: [],
    name: "Meister Max Beer", description: "", price: 5, category: "birre", image: "" },
  {
    id: "desperados-118",
    italianName: "DESPERADOS",
    tags: [],
    name: "Desperados Beer", description: "", price: 5, category: "birre", image: "" }
];

export const COCKTAILS: MenuItem[] = [
  {
    id: "cosmopolitan-119",
    italianName: "COSMOPOLITAN",
    tags: [],
    name: "Cosmopolitan", description: "Vodka, triple sec, sour mix, cranberry juice", price: 10, category: "cocktails", image: "" },
  {
    id: "espresso-martini-120",
    italianName: "ESPRESSO MARTINI",
    tags: [],
    name: "Espresso Martini", description: "Vodka, espresso, kahlua liquor", price: 10, category: "cocktails", image: "" },
  {
    id: "martini-121",
    italianName: "MARTINI",
    tags: [],
    name: "Martini Cocktail", description: "Gin, dry vermouth, sour mix (choose flavour)", price: 10, category: "cocktails", image: "" },
  {
    id: "margarita-122",
    italianName: "MARGARITA",
    tags: [],
    name: "Margarita", description: "Tequila, cointreau, sour mix (choose flavour)", price: 10, category: "cocktails", image: "" },
  {
    id: "daiquiri-123",
    italianName: "DAIQUIRI",
    tags: [],
    name: "Daiquiri", description: "Rum, triple sec, sour mix (choose flavour)", price: 10, category: "cocktails", image: "" },
  {
    id: "mojito-124",
    italianName: "MOJITO",
    tags: [],
    name: "Mojito", description: "Light rum, lime wedge, fresh mint, soda", price: 10, category: "cocktails", image: "" },
  {
    id: "pina-colada-125",
    italianName: "PINA COLADA",
    tags: [],
    name: "Piña Colada", description: "Light rum, coconut milk, pineapple juice", price: 10, category: "cocktails", image: "" },
  {
    id: "mai-tai-126",
    italianName: "MAI TAI",
    tags: [],
    name: "Mai Tai", description: "Light rum, almond, triple sec, sour mix, dark rum", price: 10, category: "cocktails", image: "" },
  {
    id: "moscow-mule-127",
    italianName: "MOSCOW MULE",
    tags: [],
    name: "Moscow Mule", description: "Vodka, ginger beer, lime juice", price: 10, category: "cocktails", image: "" },
  {
    id: "whisky-sour-128",
    italianName: "WHISKY SOUR",
    tags: [],
    name: "Whisky Sour", description: "Whisky, sour mix, egg white", price: 10, category: "cocktails", image: "" },
  {
    id: "caipirinha-129",
    italianName: "CAIPIRINHA",
    tags: [],
    name: "Caipirinha", description: "Rum, sour mix, lime wedge", price: 10, category: "cocktails", image: "" },
  {
    id: "glue-wine-130",
    italianName: "GLUE WINE",
    tags: [],
    name: "Mulled Wine", description: "Hot red wine, fresh orange, fresh lemon, sugar syrup, anise and cinnamon stick", price: 10, category: "cocktails", image: "" },
  {
    id: "long-island-131",
    italianName: "LONG ISLAND",
    tags: [],
    name: "Long Island Iced Tea", description: "Vodka, rum, gin, triple sec, sour mix, cola", price: 10, category: "cocktails", image: "" },
  {
    id: "bull-frog-132",
    italianName: "BULL FROG",
    tags: [],
    name: "Bull Frog Cocktail", description: "Vodka, rum, gin, tequila, blue curacao, redbull", price: 10, category: "cocktails", image: "" },
  {
    id: "sex-on-the-beach-133",
    italianName: "SEX ON THE BEACH",
    tags: [],
    name: "Sex on the Beach", description: "Vodka, peach schnapps, orange, cranberry", price: 10, category: "cocktails", image: "" },
  
  {
    id: "fruit-smoothie-134",
    italianName: "FRUIT SMOOTHIE",
    tags: [],
    name: "Fruit Smoothie", description: "Avocado, cucumber, banana", price: 7, category: "cocktails", image: "" },
  {
    id: "passion-fruit-smoothie-135",
    italianName: "PASSION FRUIT SMOOTHIE",
    tags: [],
    name: "Passion Fruit Smoothie", description: "Passion puree, vanilla ice cream, milk", price: 7, category: "cocktails", image: "" },
  {
    id: "virgin-blue-hawaii-136",
    italianName: "VIRGIN BLUE HAWAII",
    tags: [],
    name: "Virgin Blue Hawaii", description: "Coconut milk, blue curacao, almond, pineapple", price: 7, category: "cocktails", image: "" },
  {
    id: "miami-voice-137",
    italianName: "MIAMI VOICE",
    tags: [],
    name: "Miami Voice Mocktail", description: "Strawberry, banana, coconut milk", price: 7, category: "cocktails", image: "" },
  {
    id: "melon-ball-138",
    italianName: "MELON BALL",
    tags: [],
    name: "Melon Ball Cocktail", description: "Melon, pineapple rings, redbull", price: 7, category: "cocktails", image: "" },
  {
    id: "kiwi-kama-139",
    italianName: "KIWI KAMA",
    tags: [],
    name: "Kiwi Kama Cocktail", description: "Kiwi, banana, pineapple, coconut milk", price: 7, category: "cocktails", image: "" },
  {
    id: "virgin-mojito-140",
    italianName: "VIRGIN MOJITO",
    tags: [],
    name: "Virgin Mojito", description: "Lime wedge, fresh mint, sprite, brown sugar", price: 7, category: "cocktails", image: "" },
  {
    id: "virgin-pina-colada-141",
    italianName: "VIRGIN PINA COLADA",
    tags: [],
    name: "Virgin Piña Colada", description: "Coconut milk, pineapple juice", price: 7, category: "cocktails", image: "" },
  {
    id: "blueberry-fruit-boba-142",
    italianName: "BLUEBERRY FRUIT BOBA",
    tags: [],
    name: "Blueberry Fruit Boba", description: "Blueberry puree, vanilla ice cream, milk, boba", price: 7, category: "cocktails", image: "" },
  {
    id: "passion-fruit-boba-143",
    italianName: "PASSION FRUIT BOBA",
    tags: [],
    name: "Passion Fruit Boba", description: "Passion puree, vanilla ice cream, pineapple juice, boba", price: 7, category: "cocktails", image: "" },

  {
    id: "orange-spritz-144",
    italianName: "ORANGE SPRITZ",
    tags: [],
    name: "Orange Spritz", description: "Aperitif cocktail", price: 12, category: "cocktails", image: "" },
  {
    id: "red-spritz-145",
    italianName: "RED SPRITZ",
    tags: [],
    name: "Red Spritz", description: "Aperitif cocktail", price: 12, category: "cocktails", image: "" },
  {
    id: "lemon-spritz-146",
    italianName: "LEMON SPRITZ",
    tags: [],
    name: "Lemon Spritz", description: "Aperitif cocktail", price: 12, category: "cocktails", image: "" },
  {
    id: "hugo-spritz-147",
    italianName: "HUGO SPRITZ",
    tags: [],
    name: "Hugo Spritz", description: "Elderflower, prosecco and soda", price: 12, category: "cocktails", image: "" },
  {
    id: "bellini-148",
    italianName: "BELLINI",
    tags: [],
    name: "Bellini", description: "Peach, prosecco", price: 12, category: "cocktails", image: "" },
  {
    id: "rossini-149",
    italianName: "ROSSINI",
    tags: [],
    name: "Rossini", description: "Strawberry, prosecco", price: 12, category: "cocktails", image: "" },
  {
    id: "negroni-150",
    italianName: "NEGRONI",
    tags: [],
    name: "Negroni", description: "Classic Negroni cocktail", price: 12, category: "cocktails", image: "" },
  {
    id: "pear-whisper-151",
    italianName: "PEAR WHISPER",
    tags: [],
    name: "Pear Whisper Mocktail", description: "Vodka, pear puree, rosemary syrup, soda", price: 10, category: "cocktails", image: "" },
  {
    id: "bamboska-152",
    italianName: "BAMBOSKA",
    tags: [],
    name: "Bamboska Cocktail", description: "Vodka, cardamom, coconut milk, mango juice", price: 10, category: "cocktails", image: "" },
  {
    id: "spa-cucumber-153",
    italianName: "SPA CUCUMBER",
    tags: [],
    name: "Spa Cucumber Mocktail", description: "Rum, fresh cucumber, watermelon, honey, redbull", price: 10, category: "cocktails", image: "" },
  {
    id: "kink-tout-154",
    italianName: "KINK TOUT",
    tags: [],
    name: "Kink Tout Cocktail", description: "Gin, hibiscus, lime, cranberry", price: 10, category: "cocktails", image: "" },
  {
    id: "matcha-lift-155",
    italianName: "MATCHA LIFT",
    tags: [],
    name: "Matcha Lift Mocktail", description: "Dark rum, matcha, banana, vanilla, soda", price: 10, category: "cocktails", image: "" },
  {
    id: "bob-marley-156",
    italianName: "BOB MARLEY",
    tags: [],
    name: "Bob Marley Mocktail", description: "Vodka, pineapple juice, grenadine, blue curacao", price: 10, category: "cocktails", image: "" },

  {
    id: "dodo-157",
    italianName: "DODO",
    tags: [],
    name: "Dodo Cocktail", description: "Vodka, lemon, tabasco, olive", price: 5, category: "cocktails", image: "" },
  {
    id: "black-russian-158",
    italianName: "BLACK RUSSIAN",
    tags: [],
    name: "Black Russian", description: "Vodka, kahlua", price: 5, category: "cocktails", image: "" },
  {
    id: "snake-bite-159",
    italianName: "SNAKE BITE",
    tags: [],
    name: "Snake Bite Cocktail", description: "Tequila, sour mix", price: 5, category: "cocktails", image: "" },
  {
    id: "green-tea-shoot-160",
    italianName: "GREEN TEA SHOOT",
    tags: [],
    name: "Green Tea Shot", description: "Irish whisky, peach schnapps, sour mix", price: 5, category: "cocktails", image: "" },
  {
    id: "sambuca-161",
    italianName: "SAMBUCA",
    tags: [],
    name: "Sambuca Digestif", description: "Shot", price: 5, category: "cocktails", image: "" },
  {
    id: "grappa-162",
    italianName: "GRAPPA",
    tags: [],
    name: "Grappa Digestif", description: "Shot", price: 5, category: "cocktails", image: "" },
  {
    id: "limoncello-163",
    italianName: "LIMONCELLO",
    tags: [],
    name: "Limoncello Digestif", description: "Shot", price: 5, category: "cocktails", image: "" },
  {
    id: "amaro-164",
    italianName: "AMARO",
    tags: [],
    name: "Amaro Digestif", description: "Shot", price: 5, category: "cocktails", image: "" }
];

export const COLAZIONE: MenuItem[] = [
  {
    id: "cornetto-vuoto-165",
    italianName: "CORNETTO VUOTO",
    tags: [],
    name: "Plain Croissant", description: "Plain croissant", price: 2, category: "colazione", image: "" },
  {
    id: "cornetto-ripieno-166",
    italianName: "CORNETTO RIPIENO",
    tags: [],
    name: "Filled Croissant", description: "Filled croissant with chocolate, white chocolate, pistachio cream, or jam", price: 2.5, category: "colazione", image: "" },
  {
    id: "cornetto-con-gelato-167",
    italianName: "CORNETTO CON GELATO",
    tags: [],
    name: "Croissant with Gelato", description: "Ice-cream croissant", price: 4, category: "colazione", image: "" },
  {
    id: "muffin-gluten-free-168",
    italianName: "MUFFIN GLUTEN FREE",
    tags: [],
    name: "Gluten Free Muffin", description: "Gluten-free muffin", price: 2.5, category: "colazione", image: "" },
  {
    id: "pan-au-chocolat-169",
    italianName: "PAN AU CHOCOLAT",
    tags: [],
    name: "Pain au Chocolat", description: "Saccottino", price: 2.5, category: "colazione", image: "" },
  {
    id: "torta-del-giorno-170",
    italianName: "TORTA DEL GIORNO",
    tags: [],
    name: "Cake of the Day", description: "Cake of the day", price: 5, category: "colazione", image: "" },
  {
    id: "cornetto-salato-pomodoro-e-mozzarella-171",
    italianName: "CORNETTO SALATO - POMODORO E MOZZARELLA",
    tags: [],
    name: "Savory Croissant - Tomato & Mozzarella", description: "Savory croissant with tomato and mozzarella", price: 5, category: "colazione", image: "" },
  {
    id: "cornetto-salato-salmone-avocado-e-formaggio-172",
    italianName: "CORNETTO SALATO - SALMONE, AVOCADO E FORMAGGIO",
    tags: [],
    name: "Savory Croissant - Salmon, Avocado & Cheese", description: "Savory croissant with salmon, avocado and cheese", price: 7, category: "colazione", image: "" },
  {
    id: "cornetto-salato-tonno-pomodoro-e-maionese-173",
    italianName: "CORNETTO SALATO - TONNO, POMODORO E MAIONESE",
    tags: [],
    name: "Savory Croissant - Tuna, Tomato & Mayo", description: "Savory croissant with tuna, tomato and mayo", price: 5, category: "colazione", image: "" },
  {
    id: "omelette-174",
    italianName: "OMELETTE",
    tags: [],
    name: "Omelette", description: "Breakfast Omelette", price: 9, category: "colazione", image: "" }
];

export const FULL_MENU: MenuItem[] = [
  ...ANTIPASTI,
  ...PRIMI,
  ...PASTA_FRESCA,
  ...SECONDI_CARNE,
  ...SECONDI_PESCE,
  ...CONTORNI,
  ...BURGERS,
  ...INSALATE,
  ...PIZZE_ROSSE,
  ...PIZZE_BIANCHE,
  ...DOLCI,
  ...CAFFETTERIA,
  ...BIBITE,
  ...VINI,
  ...BIRRE,
  ...COCKTAILS,
  ...COLAZIONE
];

export const MENU_ITEMS: MenuItem[] = FULL_MENU;


