import { MenuItem } from '../data/menuData';
import { Language } from '../context/LanguageContext';

export interface TranslatedMenuFields {
  name: string;
  description: string;
  italianName: string;
}

// Utility to clean ALL-CAPS Italian dish titles into elegant Title Case
export function formatTitleCase(str: string): string {
  if (!str) return '';
  if (str !== str.toUpperCase()) return str;

  const words = str.trim().split(/\s+/);
  const lowers = new Set(['di', 'del', 'della', 'dello', 'degli', 'dei', "d'", "all'", 'alla', 'allo', 'agli', 'ai', 'al', 'con', 'e', 'in', 'su', 'a', 'da', 'per', 'tra', 'fra', 'o', 'ed']);
  
  const cased = words.map((w: string, idx: number) => {
    const lower = w.toLowerCase();
    if (idx > 0 && lowers.has(lower)) {
      return lower;
    }
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });

  let result = cased.join(' ');
  result = result.replace(/\b(all|d|dell|un|l)'([a-z])/gi, (_match: string, p1: string, p2: string) => p1.toLowerCase() + "'" + p2.toUpperCase());
  return result;
}

// Custom translations map for specific menu item IDs
const menuTranslationMap: Record<string, Record<string, { name?: string; description?: string }>> = {
  'tartare-di-tonno-all-arancia-1': {
    en: { name: "Tuna Tartare with Orange", description: "Tuna tartare with orange cream" },
  },
  'polpo-alla-piastra-su-vellutata-di-patate-olive-e-pomodorini-2': {
    en: { name: "Grilled Octopus on Potato Cream", description: "Grilled octopus on a cream of potatoes, olives and cherry tomatoes" },
  },
  'tartare-di-salmone-al-mango-3': {
    en: { name: "Salmon Tartare with Mango", description: "Salmon tartare with mango cream" },
  },
  'tris-di-crostini-con-pat-di-fegatini-pomodoro-e-basilico-pecorino-e-guanciale-4': {
    en: { name: "Tuscan Crostini Trio", description: "Trio of crostini with liver pâté, fresh tomato and basil, pecorino cheese and guanciale" },
  },
  'gran-tagliere-casa-italia-di-salumi-e-formaggi-5': {
    en: { name: "Casa Italia Grand Charcuterie Board", description: "Platter 'Casa Italia' with cold cuts and cheeses" },
  },
  'parmigiana-di-melanzane-6': {
    en: { name: "Eggplant Parmigiana", description: "Eggplant parmigiana" },
  },
  'carpaccio-di-manzo-servito-con-rucola-noci-scaglie-di-parmigiano-capperi-e-crema-di-parmigiano-7': {
    en: { name: "Gourmet Beef Carpaccio", description: "Beef carpaccio served with rocket, nuts, parmesan scales, capers and parmesan cream" },
  },
  'vitello-tonnato-8': {
    en: { name: "Classic Vitello Tonnato", description: "Veal with tuna sauce" },
  },
  'tartare-di-manzo-servita-con-tuorlo-d-uovo-e-crema-di-parmigiano-9': {
    en: { name: "Beef Tartare with Egg Yolk & Parmesan", description: "Beef tartare served with raw egg yolk and parmesan cream" },
  },
  'penne-pomodoro-basilico-e-stracciatella-10': {
    en: { name: "Penne Tomato & Stracciatella", description: "Penne with tomato, basil and stracciatella" },
  },
  'rigatoni-alla-bolognese-11': {
    en: { name: "Rigatoni Bolognese", description: "Rigatoni with bolognese ragù" },
  },
  'spaghetti-alla-carbonara-12': {
    en: { name: "Authentic Spaghetti Carbonara", description: "Spaghetti with eggs sauce and guanciale" },
  },
  'penne-al-salmone-13': {
    en: { name: "Penne with Salmon", description: "Penne with smoked salmon sauce" },
  },
  'spaghetti-ai-frutti-di-mare-14': {
    en: { name: "Seafood Spaghetti", description: "Seafood spaghetti" },
  },
  'risotto-ai-crostacei-e-burrata-15': {
    en: { name: "Shellfish & Burrata Risotto", description: "Risotto with shellfish and burrata" },
  },
  'risotto-al-tartufo-16': {
    en: { name: "Truffle Risotto", description: "Truffle risotto" },
  },
  'tortellini-panna-e-prosciutto-17': {
    en: { name: "Tortellini with Cream & Prosciutto", description: "Tortellini with cream and cooked ham" },
  },
  'lasagna-al-rag-18': {
    en: { name: "Beef Lasagna", description: "Lasagna with meat sauce" },
  },
  'gnocchi-verdi-agli-spinaci-19': {
    en: { name: "Spinach Gnocchi", description: "Green gnocchi with spinach sauce" },
  },
  'gnocchi-al-rag-20': {
    en: { name: "Gnocchi with Meat Ragù", description: "Gnocchi with meat sauce" },
  },
  'ravioli-ripieni-ai-4-formaggi-serviti-con-salsa-al-gorgonzola-21': {
    en: { name: "Four Cheese Ravioli with Gorgonzola Sauce", description: "Ravioli stuffed with four cheeses served with blue cheese sauce" },
  },
  'ravioli-ripieni-al-salmone-serviti-con-salsa-al-salmone-22': {
    en: { name: "Salmon Ravioli with Salmon Sauce", description: "Ravioli stuffed with salmon served with salmon sauce" },
  },
  'ravioli-ripieni-al-tartufo-serviti-con-salsa-al-tartufo-23': {
    en: { name: "Truffle Ravioli with Truffle Sauce", description: "Ravioli stuffed with truffle served with truffle sauce" },
  },
  'ravioli-ripieni-ricotta-e-spinaci-serviti-con-salsa-agli-spinaci-24': {
    en: { name: "Ricotta & Spinach Ravioli", description: "Ravioli stuffed with ricotta and spinach served with spinach sauce" },
  },
  'filetto-di-manzo-al-pepe-o-ai-funghi-con-patate-al-forno-e-verdure-saltate-25': {
    en: { name: "Beef Tenderloin Steak", description: "Beef fillet with pepper sauce or mushrooms sauce served with baked potatoes and sautèed vegetables" },
  },
  'bistecca-di-manzo-alla-piastra-con-verdure-e-patatine-fritte-26': {
    en: { name: "Grilled Beef Steak with Vegetables & Fries", description: "Grilled beef steak with vegetables and french fries" },
  },
  'filetto-di-cammello-al-pepe-con-patate-al-forno-e-verdure-saltate-27': {
    en: { name: "Camel Fillet with Pepper Sauce", description: "Camel fillet with pepper sauce served with baked potatoes and sautèed vegetables" },
  },
  'pollo-al-limone-con-pur-28': {
    en: { name: "Lemon Chicken with Mashed Potatoes", description: "Lemon chicken with mashed potatoes" },
  },
  'pollo-affumicato-con-salsa-di-peperoni-affumicati-servito-con-pur-29': {
    en: { name: "Smoked Chicken with Roasted Pepper Sauce", description: "Smoked chicken with smoked peppers sauce served with mashed potatoes" },
  },
  'cotoletta-di-pollo-servita-con-insalata-verde-30': {
    en: { name: "Chicken Cutlet with Green Salad", description: "Chicken panè served with green salad" },
  },
  'cotoletta-di-vitello-servita-con-rucola-e-scaglie-di-parmigiano-31': {
    en: { name: "Veal Cutlet with Arugula & Parmesan", description: "Veal panè served with rocket and parmesan scales" },
  },
  'fritto-di-mare-con-verdure-croccanti-32': {
    en: { name: "Fried Seafood with Crispy Vegetables", description: "Fried seafood with crispy vegetables" },
  },
  'filetto-di-salmone-con-salsa-ai-gamberi-servito-con-verdure-grigliate-33': {
    en: { name: "Salmon Fillet with Shrimp Sauce", description: "Salmon fillet with shrimps sauce served with grilled vegetables" },
  },
  'tagliata-di-tonno-in-crosta-di-pistacchio-su-crema-di-piselli-con-verdure-34': {
    en: { name: "Pistachio-Crusted Tuna Steak on Pea Cream", description: "Sliced tuna in a pistachio crust on pea cream and vegetables" },
  },
  'filetto-di-salmone-al-forno-su-crema-di-spinaci-con-patate-al-forno-35': {
    en: { name: "Baked Salmon on Spinach Cream", description: "Baked salmon fillet on creme of spinach with baked potatoes" },
  },
  'gamberi-grigliati-con-verdure-grigliate-36': {
    en: { name: "Grilled Shrimp with Grilled Vegetables", description: "Grilled shrimps with grilled vegetables" },
  },
  'spigola-all-arancia-con-patate-al-forno-37': {
    en: { name: "Sea Bass with Orange & Roast Potatoes", description: "Seabass with orange sauce served with baked potatoes" },
  },
  'verdure-grigliate-38': {
    en: { name: "Grilled Vegetables", description: "Grilled vegetables" },
  },
  'verdure-saltate-39': {
    en: { name: "Sautéed Vegetables", description: "Sauteed vegetables" },
  },
  'insalata-40': {
    en: { name: "Mixed Green Salad", description: "Salad" },
  },
  'pur-41': {
    en: { name: "Mashed Potatoes", description: "Mashed potatoes" },
  },
  'patatine-fritte-42': {
    en: { name: "French Fries", description: "French fries" },
  },
  'patate-al-forno-43': {
    en: { name: "Roast Potatoes", description: "Baked potatoes" },
  },
  'cheeseburger-44': {
    en: { name: "Classic Cheeseburger", description: "BIG Beef burger 200g, cheddar cheese, onion and pickled cucumbers served with fried potatoes" },
  },
  'smashburger-45': {
    en: { name: "Smash Burger", description: "BIG Beef burger 200g, salad, tomatoes and mustard served with fried potatoes" },
  },
  'vegan-burger-46': {
    en: { name: "Vegan Burger", description: "Vegan burger, salad, fresh cucumber and onion" },
  },
  'tuna-salad-48': {
    en: { name: "Tuna Salad", description: "Tuna slices, tomatoes, salad, carrots and mozzarella" },
  },
  'caesar-49': {
    en: { name: "Caesar Salad", description: "Salad and parmesan" },
  },
  'caprese-50': {
    en: { name: "Caprese Salad", description: "Fresh tomato, mozzarella and basil sauce" },
  },
  'crudo-e-bufala-51': {
    en: { name: "Prosciutto & Buffalo Mozzarella Salad", description: "Raw ham and buffalo mozzarella" },
  },
  'margherita-52': {
    en: { name: "Margherita Pizza", description: "Tomato sauce, mozzarella and basil" },
  },
  'marinara-53': {
    en: { name: "Marinara Pizza", description: "Tomato sauce, garlic and oregano" },
  },
  'tonno-e-cipolla-54': {
    en: { name: "Tuna & Onion Pizza", description: "Tomato sauce, mozzarella, tuna and onions" },
  },
  'napoli-55': {
    en: { name: "Napoli Pizza", description: "Tomato sauce, mozzarella, anchovies, capers" },
  },
  'crudo-rucola-e-grana-56': {
    en: { name: "Prosciutto, Arugula & Grana Pizza", description: "Tomato sauce, mozzarella, raw ham, rocket and parmesan flakes" },
  },
  'bufalina-57': {
    en: { name: "Buffalo Mozzarella Pizza", description: "Tomato sauce, buffalo mozzarella and basil" },
  },
  'vegetariana-58': {
    en: { name: "Vegetarian Pizza", description: "Tomato sauce, mozzarella and grilled vegetables" },
  },
  'frutti-di-mare-59': {
    en: { name: "Seafood Pizza", description: "Tomato sauce, mozzarella and seafood" },
  },
  'salamino-60': {
    en: { name: "Salami Pizza", description: "Tomato sauce, mozzarella and salami (pork salami OR cow salami)" },
  },
  'calzone-port-ghalib-61': {
    en: { name: "Port Ghalib Calzone", description: "Tomato sauce, mozzarella, cooked ham" },
  },
  'gamberi-e-zucchine-62': {
    en: { name: "Shrimp & Zucchini Pizza", description: "Mozzarella, shrimps and zucchinis" },
  },
  'mortadella-burrata-e-pistacchi-63': {
    en: { name: "Mortadella, Burrata & Pistachio Pizza", description: "Mozzarella, mortadella, burrata and pistachios" },
  },
  'quattro-formaggi-64': {
    en: { name: "Four Cheese Pizza", description: "Four cheeses" },
  },
  'pane-arabo-salmone-avocado-e-formaggio-65': {
    en: { name: "Arabic Bread with Salmon, Avocado & Cheese", description: "Salmon, avocado and cheese" },
  },
  'speck-mascarpone-e-noci-66': {
    en: { name: "Speck, Mascarpone & Walnut Pizza", description: "Speck, cheese and walnuts" },
  },
  'tartufo-67': {
    en: { name: "Truffle Pizza", description: "Mozzarella, truffle cream and truffle oil" },
  },
  'tiramis-68': {
    en: { name: "Traditional Tiramisù", description: "Traditional Tiramisù" },
  },
  'tortino-al-cioccolato-con-panna-69': {
    en: { name: "Chocolate Lava Cake with Cream", description: "Chocolate cake with whipped cream" },
  },
  'sgroppino-70': {
    en: { name: "Sgroppino Lemon Sorbet Cocktail", description: "Lemon ice cream, vodka and prosecco" },
  },
  'gnocco-fritto-71': {
    en: { name: "Fried Dough Puffs", description: "Fried dumpling with chocolate, pistachio or white chocolate" },
  },
  'coppa-gelato-72': {
    en: { name: "Gelato Cup", description: "Ice cream cup: lemon, strawberry, mango, chocolate or vanilla" },
  },
  'cheesecake-73': {
    en: { name: "Cheesecake", description: "Cheesecake" },
  },
  'torta-del-giorno-74': {
    en: { name: "Cake of the Day", description: "Cake of the day" },
  },
  'caff-espresso-75': {
    en: { name: "Espresso", description: "White milk" },
  },
  'latte-macchiato-79': {
    en: { name: "Latte Macchiato", description: "Flat white" },
  },
  'caff-americano-80': {
    en: { name: "Americano", description: "Ice coffee" },
  },
  'acqua-1l-still-83': {
    en: { name: "Still Water 1L", description: "Still water 1L" },
  },
  'acqua-0-5l-sparkling-84': {
    en: { name: "Sparkling Water 0.5L", description: "Sparkling water 0.5L" },
  },
  'schweppes-soda-85': {
    en: { name: "Schweppes Soda", description: "Lemon, Orange, or Mango" },
  },
  'fever-tree-ginger-ale-94': {
    en: { name: "Fever Tree Ginger Ale", description: "Chardonnay (Glass: €6)" },
  },
  'castello-di-trevi-white-99': {
    en: { name: "Castello di Trevi White Wine", description: "Vermentino (Glass: €7)" },
  },
  'chateau-de-granville-white-100': {
    en: { name: "Chateau de Granville White Wine", description: "Semillon (Glass: €8)" },
  },
  'jardin-du-nil-white-101': {
    en: { name: "Jardin du Nil White Wine", description: "Vermentino (Glass: €7)" },
  },
  'grand-marquis-white-102': {
    en: { name: "Grand Marquis White Wine", description: "Sultanine Blanche (Glass: €8)" },
  },
  'chateau-byblos-white-103': {
    en: { name: "Chateau Byblos White Wine", description: "Chardonnay, Sauvignon (Glass: €7)" },
  },
  'capebay-red-104': {
    en: { name: "Capebay Red Wine", description: "Merlot (Glass: €6)" },
  },
  'castello-di-trevi-red-105': {
    en: { name: "Castello di Trevi Red Wine", description: "Merlot, Syrah (Glass: €7)" },
  },
  'chateau-de-granville-red-106': {
    en: { name: "Chateau de Granville Red Wine", description: "Cabernet, Sauvignon (Glass: €8)" },
  },
  'grand-marquis-red-107': {
    en: { name: "Grand Marquis Red Wine", description: "Carignan, Syrah (Glass: €8)" },
  },
  'jardin-du-nil-red-108': {
    en: { name: "Jardin du Nil Red Wine", description: "Cabernet, Sauvignon, Syrah (Glass: €7)" },
  },
  'castello-di-trevi-ros-109': {
    en: { name: "Castello di Trevi Rosé Wine", description: "Rosé (Glass: €8)" },
  },
  'le-baron-ros-110': {
    en: { name: "Le Baron Rosé Wine", description: "Sparkling Rosé" },
  },
  'le-baron-white-111': {
    en: { name: "Le Baron White Wine", description: "Sparkling White" },
  },
  'valmont-ros-112': {
    en: { name: "Valmont Rosé Wine", description: "Sparkling Rosé (Glass: €7)" },
  },
  'valmont-white-113': {
    en: { name: "Valmont White Wine", description: "Sparkling White (Glass: €7)" },
  },
  'heineken-114': {
    en: { name: "Heineken Beer", description: "Vodka, triple sec, sour mix, cranberry juice" },
  },
  'espresso-martini-120': {
    en: { name: "Espresso Martini", description: "Vodka, espresso, kahlua liquor" },
  },
  'martini-121': {
    en: { name: "Martini Cocktail", description: "Gin, dry vermouth, sour mix (choose flavour)" },
  },
  'margarita-122': {
    en: { name: "Margarita", description: "Tequila, cointreau, sour mix (choose flavour)" },
  },
  'daiquiri-123': {
    en: { name: "Daiquiri", description: "Rum, triple sec, sour mix (choose flavour)" },
  },
  'mojito-124': {
    en: { name: "Mojito", description: "Light rum, lime wedge, fresh mint, soda" },
  },
  'pina-colada-125': {
    en: { name: "Piña Colada", description: "Light rum, coconut milk, pineapple juice" },
  },
  'mai-tai-126': {
    en: { name: "Mai Tai", description: "Light rum, almond, triple sec, sour mix, dark rum" },
  },
  'moscow-mule-127': {
    en: { name: "Moscow Mule", description: "Vodka, ginger beer, lime juice" },
  },
  'whisky-sour-128': {
    en: { name: "Whisky Sour", description: "Whisky, sour mix, egg white" },
  },
  'caipirinha-129': {
    en: { name: "Caipirinha", description: "Rum, sour mix, lime wedge" },
  },
  'glue-wine-130': {
    en: { name: "Mulled Wine", description: "Hot red wine, fresh orange, fresh lemon, sugar syrup, anise and cinnamon stick" },
  },
  'long-island-131': {
    en: { name: "Long Island Iced Tea", description: "Vodka, rum, gin, triple sec, sour mix, cola" },
  },
  'bull-frog-132': {
    en: { name: "Bull Frog Cocktail", description: "Vodka, rum, gin, tequila, blue curacao, redbull" },
  },
  'sex-on-the-beach-133': {
    en: { name: "Sex on the Beach", description: "Vodka, peach schnapps, orange, cranberry" },
  },
  'fruit-smoothie-134': {
    en: { name: "Fruit Smoothie", description: "Avocado, cucumber, banana" },
  },
  'passion-fruit-smoothie-135': {
    en: { name: "Passion Fruit Smoothie", description: "Passion puree, vanilla ice cream, milk" },
  },
  'virgin-blue-hawaii-136': {
    en: { name: "Virgin Blue Hawaii", description: "Coconut milk, blue curacao, almond, pineapple" },
  },
  'miami-voice-137': {
    en: { name: "Miami Voice Mocktail", description: "Strawberry, banana, coconut milk" },
  },
  'melon-ball-138': {
    en: { name: "Melon Ball Cocktail", description: "Melon, pineapple rings, redbull" },
  },
  'kiwi-kama-139': {
    en: { name: "Kiwi Kama Cocktail", description: "Kiwi, banana, pineapple, coconut milk" },
  },
  'virgin-mojito-140': {
    en: { name: "Virgin Mojito", description: "Lime wedge, fresh mint, sprite, brown sugar" },
  },
  'virgin-pina-colada-141': {
    en: { name: "Virgin Piña Colada", description: "Coconut milk, pineapple juice" },
  },
  'blueberry-fruit-boba-142': {
    en: { name: "Blueberry Fruit Boba", description: "Blueberry puree, vanilla ice cream, milk, boba" },
  },
  'passion-fruit-boba-143': {
    en: { name: "Passion Fruit Boba", description: "Passion puree, vanilla ice cream, pineapple juice, boba" },
  },
  'orange-spritz-144': {
    en: { name: "Orange Spritz", description: "Aperitif cocktail" },
  },
  'red-spritz-145': {
    en: { name: "Red Spritz", description: "Aperitif cocktail" },
  },
  'lemon-spritz-146': {
    en: { name: "Lemon Spritz", description: "Aperitif cocktail" },
  },
  'hugo-spritz-147': {
    en: { name: "Hugo Spritz", description: "Elderflower, prosecco and soda" },
  },
  'bellini-148': {
    en: { name: "Bellini", description: "Peach, prosecco" },
  },
  'rossini-149': {
    en: { name: "Rossini", description: "Strawberry, prosecco" },
  },
  'negroni-150': {
    en: { name: "Negroni", description: "Classic Negroni cocktail" },
  },
  'pear-whisper-151': {
    en: { name: "Pear Whisper Mocktail", description: "Vodka, pear puree, rosemary syrup, soda" },
  },
  'bamboska-152': {
    en: { name: "Bamboska Cocktail", description: "Vodka, cardamom, coconut milk, mango juice" },
  },
  'spa-cucumber-153': {
    en: { name: "Spa Cucumber Mocktail", description: "Rum, fresh cucumber, watermelon, honey, redbull" },
  },
  'kink-tout-154': {
    en: { name: "Kink Tout Cocktail", description: "Gin, hibiscus, lime, cranberry" },
  },
  'matcha-lift-155': {
    en: { name: "Matcha Lift Mocktail", description: "Dark rum, matcha, banana, vanilla, soda" },
  },
  'bob-marley-156': {
    en: { name: "Bob Marley Mocktail", description: "Vodka, pineapple juice, grenadine, blue curacao" },
  },
  'dodo-157': {
    en: { name: "Dodo Cocktail", description: "Vodka, lemon, tabasco, olive" },
  },
  'black-russian-158': {
    en: { name: "Black Russian", description: "Vodka, kahlua" },
  },
  'snake-bite-159': {
    en: { name: "Snake Bite Cocktail", description: "Tequila, sour mix" },
  },
  'green-tea-shoot-160': {
    en: { name: "Green Tea Shot", description: "Irish whisky, peach schnapps, sour mix" },
  },
  'sambuca-161': {
    en: { name: "Sambuca Digestif", description: "Shot" },
  },
  'grappa-162': {
    en: { name: "Grappa Digestif", description: "Shot" },
  },
  'limoncello-163': {
    en: { name: "Limoncello Digestif", description: "Shot" },
  },
  'amaro-164': {
    en: { name: "Amaro Digestif", description: "Shot" },
  },
  'cornetto-vuoto-165': {
    en: { name: "Plain Croissant", description: "Plain croissant" },
  },
  'cornetto-ripieno-166': {
    en: { name: "Filled Croissant", description: "Filled croissant with chocolate, white chocolate, pistachio cream, or jam" },
  },
  'cornetto-con-gelato-167': {
    en: { name: "Croissant with Gelato", description: "Ice-cream croissant" },
  },
  'muffin-gluten-free-168': {
    en: { name: "Gluten Free Muffin", description: "Gluten-free muffin" },
  },
  'pan-au-chocolat-169': {
    en: { name: "Pain au Chocolat", description: "Saccottino" },
  },
  'torta-del-giorno-170': {
    en: { name: "Cake of the Day", description: "Cake of the day" },
  },
  'cornetto-salato-pomodoro-e-mozzarella-171': {
    en: { name: "Savory Croissant - Tomato & Mozzarella", description: "Savory croissant with tomato and mozzarella" },
  },
  'cornetto-salato-salmone-avocado-e-formaggio-172': {
    en: { name: "Savory Croissant - Salmon, Avocado & Cheese", description: "Savory croissant with salmon, avocado and cheese" },
  },
  'cornetto-salato-tonno-pomodoro-e-maionese-173': {
    en: { name: "Savory Croissant - Tuna, Tomato & Mayo", description: "Savory croissant with tuna, tomato and mayo" },
  },
  'omelette-174': {
    en: { name: "Omelette", description: "Breakfast Omelette" },
  }
};

/**
 * Returns translated name and description for any MenuItem object based on current language.
 */
export function getTranslatedMenuItem(item: MenuItem, lang: Language): TranslatedMenuFields {
  const formattedItalian = formatTitleCase(item.italianName || item.name);
  const formattedEnglish = formatTitleCase(item.name || item.italianName);
  
  const custom = menuTranslationMap[item.id]?.[lang];

  // 1. Check custom map translation first
  if (custom && custom.name && custom.description) {
    return {
      name: custom.name,
      description: custom.description,
      italianName: formattedItalian,
    };
  }

  // 2. Language specific rules
  if (lang === 'it') {
    return {
      name: formattedItalian,
      description: item.description,
      italianName: formattedItalian,
    };
  }

  return {
    name: formattedEnglish,
    description: item.description,
    italianName: formattedItalian,
  };
}
