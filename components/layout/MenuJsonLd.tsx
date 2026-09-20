import React from 'react';

export function MenuJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': 'https://casaitaliarestaurants.com/menu#menu',
    name: 'Casa Italia Full Menu & Wine List',
    description:
      'Complete digital menu of Casa Italia Ristorante in Porto Ghalib Marina. Wood-fired Neapolitan pizza, fresh handmade pasta, Angus charcoal steaks, Red Sea seafood, Italian DOCG wines, and homemade desserts.',
    url: 'https://casaitaliarestaurants.com/menu',
    mainEntityOfPage: 'https://casaitaliarestaurants.com/menu',
    inLanguage: ['it', 'en'],
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Antipasti & Bruschette',
        description:
          'Traditional Italian starters: bruschetta al pomodoro, carpaccio di manzo, burrata, caprese, and seasonal appetizers',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Bruschetta al Pomodoro',
            description: 'Toasted bread with fresh tomatoes, garlic, basil, and extra virgin olive oil',
            suitableForDiet: ['https://schema.org/VegetarianDiet', 'https://schema.org/VeganDiet'],
          },
          {
            '@type': 'MenuItem',
            name: 'Carpaccio di Manzo',
            description: 'Thinly sliced raw beef with rocket, parmesan shavings, and lemon dressing',
          },
          {
            '@type': 'MenuItem',
            name: 'Burrata Pugliese',
            description: 'Creamy burrata cheese with cherry tomatoes, rocket, and aged balsamic reduction',
            suitableForDiet: ['https://schema.org/VegetarianDiet'],
          },
        ],
      },
      {
        '@type': 'MenuSection',
        name: 'Pasta Fresca Artigianale',
        description:
          'Daily handmade fresh pasta: tagliatelle, pappardelle, ravioli, gnocchi, and more, prepared with traditional Italian recipes and seasonal ingredients',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Tagliatelle al Ragù Bolognese',
            description: 'Fresh egg tagliatelle with slow-cooked Bolognese meat sauce',
          },
          {
            '@type': 'MenuItem',
            name: 'Pappardelle ai Funghi Porcini',
            description: 'Wide ribbon pasta with porcini mushroom cream sauce and truffle oil',
            suitableForDiet: ['https://schema.org/VegetarianDiet'],
          },
          {
            '@type': 'MenuItem',
            name: 'Ravioli di Ricotta e Spinaci',
            description: 'Handmade ravioli filled with ricotta and spinach in sage butter sauce',
            suitableForDiet: ['https://schema.org/VegetarianDiet'],
          },
        ],
      },
      {
        '@type': 'MenuSection',
        name: 'Pizza Napoletana al Forno a Legna',
        description:
          'Traditional Neapolitan pizzas baked in our authentic wood-fired oven at 450°C, using 48-hour fermented dough and San Marzano tomatoes. Gluten-free options available.',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Margherita',
            description: 'San Marzano tomato, fior di latte mozzarella, fresh basil, extra virgin olive oil',
            suitableForDiet: ['https://schema.org/VegetarianDiet'],
          },
          {
            '@type': 'MenuItem',
            name: 'Diavola',
            description: 'San Marzano tomato, mozzarella, spicy salami piccante, chilli flakes',
          },
          {
            '@type': 'MenuItem',
            name: 'Quattro Formaggi',
            description: 'Mozzarella, gorgonzola, fontina, and parmigiano-reggiano',
            suitableForDiet: ['https://schema.org/VegetarianDiet'],
          },
        ],
      },
      {
        '@type': 'MenuSection',
        name: 'Carne alla Brace',
        description:
          'Premium Angus beef steaks and meats grilled over natural charcoal: ribeye, T-bone, lamb chops, and chicken alla griglia',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Ribeye Angus alla Griglia',
            description: 'Premium Angus ribeye steak grilled over charcoal, served with roasted potatoes and grilled vegetables',
          },
          {
            '@type': 'MenuItem',
            name: 'T-Bone Fiorentina',
            description: 'Classic Florentine-style T-bone steak, charcoal grilled, with Tuscan herbs',
          },
        ],
      },
      {
        '@type': 'MenuSection',
        name: 'Pesce Fresco del Mar Rosso',
        description:
          'Fresh catch of the day from the Red Sea, grilled, pan-seared, or served crudo. Seafood pasta and risotto available.',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Grigliata Mista di Pesce',
            description: 'Mixed grilled seafood platter with Red Sea catch of the day',
          },
          {
            '@type': 'MenuItem',
            name: 'Risotto ai Frutti di Mare',
            description: 'Creamy Italian risotto with mixed Red Sea seafood, white wine, and cherry tomatoes',
          },
        ],
      },
      {
        '@type': 'MenuSection',
        name: 'Insalate Fresche',
        description: 'Fresh seasonal salads with imported Italian ingredients and house-made dressings',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Caesar Salad',
            description: 'Crisp romaine lettuce, parmesan, croutons, and house-made Caesar dressing',
            suitableForDiet: ['https://schema.org/VegetarianDiet'],
          },
        ],
      },
      {
        '@type': 'MenuSection',
        name: 'Dolci Fatti in Casa',
        description:
          'Homemade Italian desserts: tiramisù classico, panna cotta, chocolate fondant, and artisanal gelato',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Tiramisù Classico',
            description: 'Traditional Italian tiramisù with mascarpone cream, espresso-soaked ladyfingers, and cocoa',
            suitableForDiet: ['https://schema.org/VegetarianDiet'],
          },
          {
            '@type': 'MenuItem',
            name: 'Panna Cotta alla Vaniglia',
            description: 'Silky Bourbon vanilla panna cotta with seasonal berry coulis',
            suitableForDiet: ['https://schema.org/VegetarianDiet'],
          },
        ],
      },
      {
        '@type': 'MenuSection',
        name: 'Carta dei Vini & Bevande',
        description:
          'Curated selection of Italian DOCG wines, prosecco, Aperol spritz, craft cocktails, fresh juices, and non-alcoholic beverages',
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
