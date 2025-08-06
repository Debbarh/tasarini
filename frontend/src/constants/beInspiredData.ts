export const activityCategories = [
  {
    id: 'culture-history',
    name: 'Culture et Histoire',
    emoji: '🏛️',
    description: 'Musées, monuments historiques, sites culturels'
  },
  {
    id: 'adventure-sport',
    name: 'Aventure et Sport',
    emoji: '⛰️',
    description: 'Randonnée, sports extrêmes, activités outdoor'
  },
  {
    id: 'relaxation-wellness',
    name: 'Détente et Bien-être',
    emoji: '🧘',
    description: 'Spas, yoga, détente'
  },
  {
    id: 'gastronomy-flavors',
    name: 'Gastronomie et Saveurs',
    emoji: '🍷',
    description: 'Restaurants, marchés locaux, dégustation'
  },
  {
    id: 'nightlife-entertainment',
    name: 'Vie Nocturne et Divertissement',
    emoji: '🎭',
    description: 'Bars, clubs, spectacles'
  },
  {
    id: 'nature-landscapes',
    name: 'Nature et Paysages',
    emoji: '🌿',
    description: 'Parcs naturels, jardins, paysages'
  },
  {
    id: 'shopping-crafts',
    name: 'Shopping et Artisanat',
    emoji: '🛍️',
    description: 'Boutiques, marchés, artisanat local'
  }
];

export const budgetOptions = [
  {
    id: 'economic',
    name: 'Économique',
    emoji: '💰',
    description: 'Budget serré, options abordables'
  },
  {
    id: 'standard',
    name: 'Standard',
    emoji: '💳',
    description: 'Budget moyen, bon rapport qualité-prix'
  },
  {
    id: 'premium',
    name: 'Premium',
    emoji: '💎',
    description: 'Budget élevé, expériences haut de gamme'
  },
  {
    id: 'luxury',
    name: 'Luxe',
    emoji: '👑',
    description: 'Budget illimité, expériences exceptionnelles'
  }
];

export const durationOptions = [
  {
    id: 'hours',
    name: 'Quelques heures',
    emoji: '⏰',
    description: '2-4 heures'
  },
  {
    id: 'day',
    name: 'Une journée',
    emoji: '☀️',
    description: 'Journée complète'
  },
  {
    id: 'weekend',
    name: 'Week-end',
    emoji: '📅',
    description: '2-3 jours'
  },
  {
    id: 'week',
    name: 'Une semaine',
    emoji: '🗓️',
    description: '7 jours ou plus'
  }
];

export const accommodationTypes = [
  {
    id: 'hotel',
    name: 'Hôtel',
    emoji: '🏨',
    description: 'Hôtels traditionnels'
  },
  {
    id: 'boutique-hotel',
    name: 'Hôtel Boutique',
    emoji: '🏛️',
    description: 'Hôtels de charme'
  },
  {
    id: 'apartment',
    name: 'Appartement',
    emoji: '🏠',
    description: 'Location d\'appartement'
  },
  {
    id: 'villa',
    name: 'Villa',
    emoji: '🏡',
    description: 'Maisons et villas privées'
  },
  {
    id: 'hostel',
    name: 'Auberge de Jeunesse',
    emoji: '🎒',
    description: 'Hébergement économique'
  },
  {
    id: 'guesthouse',
    name: 'Maison d\'Hôtes',
    emoji: '🏘️',
    description: 'Hébergement chez l\'habitant'
  }
];

// Sample POI data for demonstration
export const samplePOIs = [
  {
    id: '1',
    name: 'Musée du Louvre',
    description: 'Le plus grand musée d\'art au monde',
    latitude: 48.8606,
    longitude: 2.3376,
    category: 'culture-history',
    rating: 4.7,
    photos: ['/placeholder.svg'],
    reviews: [
      {
        id: '1',
        userId: '1',
        userName: 'Marie',
        rating: 5,
        comment: 'Incontournable ! La Joconde vaut le détour.',
        date: '2024-01-15'
      }
    ],
    practicalInfo: {
      openingHours: '9h-18h (fermé mardi)',
      price: '17€ (gratuit -18 ans)',
      accessibility: 'Accessible PMR',
      website: 'www.louvre.fr',
      phone: '+33 1 40 20 50 50',
      address: 'Rue de Rivoli, 75001 Paris'
    },
    budget: 'standard' as const,
    duration: 'day' as const,
    travelerSegment: ['solo', 'couple', 'family', 'friends'],
    accommodationType: ['hotel', 'boutique-hotel']
  },
  {
    id: '2',
    name: 'Tour Eiffel',
    description: 'Monument emblématique de Paris et symbole de la France',
    latitude: 48.8584,
    longitude: 2.2945,
    category: 'culture-history',
    rating: 4.6,
    photos: ['/placeholder.svg'],
    reviews: [
      {
        id: '2',
        userId: '2',
        userName: 'Pierre',
        rating: 5,
        comment: 'Vue spectaculaire depuis le sommet !',
        date: '2024-01-20'
      }
    ],
    practicalInfo: {
      openingHours: '9h30-23h (été), 9h30-18h30 (hiver)',
      price: '29€ (sommet), 18€ (2e étage)',
      accessibility: 'Accessible PMR jusqu\'au 2e étage',
      website: 'www.toureiffel.paris',
      phone: '+33 8 92 70 12 39',
      address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris'
    },
    budget: 'standard' as const,
    duration: 'hours' as const,
    travelerSegment: ['solo', 'couple', 'family', 'friends'],
    accommodationType: ['hotel', 'boutique-hotel', 'apartment']
  },
  {
    id: '3',
    name: 'Montmartre & Sacré-Cœur',
    description: 'Quartier historique avec sa basilique emblématique',
    latitude: 48.8867,
    longitude: 2.3431,
    category: 'culture-history',
    rating: 4.5,
    photos: ['/placeholder.svg'],
    reviews: [
      {
        id: '3',
        userId: '3',
        userName: 'Sophie',
        rating: 5,
        comment: 'Atmosphère unique, vue magnifique sur Paris.',
        date: '2024-01-18'
      }
    ],
    practicalInfo: {
      openingHours: '6h-22h30 (basilique)',
      price: 'Gratuit (basilique), 7€ (dôme)',
      accessibility: 'Partiellement accessible',
      website: 'www.sacre-coeur-montmartre.com',
      address: '35 Rue du Chevalier de la Barre, 75018 Paris'
    },
    budget: 'economic' as const,
    duration: 'hours' as const,
    travelerSegment: ['solo', 'couple', 'family', 'friends'],
    accommodationType: ['hotel', 'boutique-hotel', 'apartment', 'guesthouse']
  },
  {
    id: '4',
    name: 'Parc des Buttes-Chaumont',
    description: 'Magnifique parc avec vue sur Paris',
    latitude: 48.8799,
    longitude: 2.3831,
    category: 'nature-landscapes',
    rating: 4.5,
    photos: ['/placeholder.svg'],
    reviews: [
      {
        id: '4',
        userId: '4',
        userName: 'Lucas',
        rating: 4,
        comment: 'Parfait pour une promenade relaxante.',
        date: '2024-01-20'
      }
    ],
    practicalInfo: {
      openingHours: '7h-20h (été), 7h-19h (hiver)',
      price: 'Gratuit',
      accessibility: 'Partiellement accessible',
      address: '1 Rue Botzaris, 75019 Paris'
    },
    budget: 'economic' as const,
    duration: 'hours' as const,
    travelerSegment: ['solo', 'couple', 'family'],
    accommodationType: ['apartment', 'hotel']
  },
  {
    id: '5',
    name: 'Champs-Élysées',
    description: 'Avenue mythique et paradis du shopping parisien',
    latitude: 48.8698,
    longitude: 2.3076,
    category: 'shopping-crafts',
    rating: 4.3,
    photos: ['/placeholder.svg'],
    reviews: [
      {
        id: '5',
        userId: '5',
        userName: 'Emma',
        rating: 4,
        comment: 'Incontournable pour le shopping et les cafés.',
        date: '2024-01-22'
      }
    ],
    practicalInfo: {
      openingHours: '24h/24 (avenue), horaires variables (boutiques)',
      price: 'Gratuit (promenade)',
      accessibility: 'Accessible PMR',
      address: 'Avenue des Champs-Élysées, 75008 Paris'
    },
    budget: 'premium' as const,
    duration: 'hours' as const,
    travelerSegment: ['solo', 'couple', 'friends'],
    accommodationType: ['hotel', 'boutique-hotel', 'apartment']
  },
  {
    id: '6',
    name: 'Quartier Latin',
    description: 'Quartier historique avec restaurants et vie nocturne',
    latitude: 48.8534,
    longitude: 2.3488,
    category: 'nightlife-entertainment',
    rating: 4.4,
    photos: ['/placeholder.svg'],
    reviews: [
      {
        id: '6',
        userId: '6',
        userName: 'Thomas',
        rating: 4,
        comment: 'Ambiance étudiante, nombreux bars et restaurants.',
        date: '2024-01-25'
      }
    ],
    practicalInfo: {
      openingHours: 'Variable selon établissements',
      price: 'Variable',
      accessibility: 'Partiellement accessible',
      address: 'Quartier Latin, 75005 Paris'
    },
    budget: 'standard' as const,
    duration: 'hours' as const,
    travelerSegment: ['solo', 'couple', 'friends'],
    accommodationType: ['hotel', 'apartment', 'hostel']
  },
  {
    id: '7',
    name: 'Spa Molitor',
    description: 'Spa luxueux dans un cadre Art Déco exceptionnel',
    latitude: 48.8476,
    longitude: 2.2539,
    category: 'relaxation-wellness',
    rating: 4.8,
    photos: ['/placeholder.svg'],
    reviews: [
      {
        id: '7',
        userId: '7',
        userName: 'Camille',
        rating: 5,
        comment: 'Détente absolue dans un cadre magnifique.',
        date: '2024-01-28'
      }
    ],
    practicalInfo: {
      openingHours: '7h-22h',
      price: 'À partir de 45€',
      accessibility: 'Accessible PMR',
      website: 'www.molitorparis.com',
      phone: '+33 1 56 07 08 50',
      address: '13 Rue Nungesser et Coli, 75016 Paris'
    },
    budget: 'luxury' as const,
    duration: 'hours' as const,
    travelerSegment: ['solo', 'couple'],
    accommodationType: ['boutique-hotel', 'villa']
  },
  {
    id: '8',
    name: 'Marché des Enfants Rouges',
    description: 'Plus ancien marché couvert de Paris, paradis des gourmets',
    latitude: 48.8633,
    longitude: 2.3647,
    category: 'gastronomy-flavors',
    rating: 4.6,
    photos: ['/placeholder.svg'],
    reviews: [
      {
        id: '8',
        userId: '8',
        userName: 'Julie',
        rating: 5,
        comment: 'Cuisine du monde et produits frais exceptionnels.',
        date: '2024-01-30'
      }
    ],
    practicalInfo: {
      openingHours: '8h30-19h30 (fermé lundi)',
      price: 'Variable selon stands',
      accessibility: 'Accès difficile PMR',
      address: '39 Rue de Bretagne, 75003 Paris'
    },
    budget: 'standard' as const,
    duration: 'hours' as const,
    travelerSegment: ['solo', 'couple', 'friends'],
    accommodationType: ['apartment', 'guesthouse', 'hotel']
  },
  {
    id: '9',
    name: 'Parc de Vincennes',
    description: 'Plus grand espace vert parisien avec château et zoo',
    latitude: 48.8275,
    longitude: 2.4324,
    category: 'nature-landscapes',
    rating: 4.4,
    photos: ['/placeholder.svg'],
    reviews: [
      {
        id: '9',
        userId: '9',
        userName: 'Antoine',
        rating: 4,
        comment: 'Parfait pour une journée nature en famille.',
        date: '2024-02-01'
      }
    ],
    practicalInfo: {
      openingHours: '24h/24 (parc), horaires variables (attractions)',
      price: 'Gratuit (parc), payant (zoo, château)',
      accessibility: 'Accessible PMR',
      address: 'Bois de Vincennes, 75012 Paris'
    },
    budget: 'economic' as const,
    duration: 'day' as const,
    travelerSegment: ['family', 'couple', 'friends'],
    accommodationType: ['apartment', 'villa', 'hotel']
  },
  {
    id: '10',
    name: 'Escalade à Fontainebleau',
    description: 'Site d\'escalade mondialement réputé en forêt',
    latitude: 48.4084,
    longitude: 2.7002,
    category: 'adventure-sport',
    rating: 4.7,
    photos: ['/placeholder.svg'],
    reviews: [
      {
        id: '10',
        userId: '10',
        userName: 'Maxime',
        rating: 5,
        comment: 'Blocs exceptionnels, un paradis pour grimpeurs.',
        date: '2024-02-03'
      }
    ],
    practicalInfo: {
      openingHours: 'Lever-coucher du soleil',
      price: 'Gratuit',
      accessibility: 'Non accessible PMR',
      address: 'Forêt de Fontainebleau, 77300 Fontainebleau'
    },
    budget: 'economic' as const,
    duration: 'day' as const,
    travelerSegment: ['solo', 'friends'],
    accommodationType: ['hostel', 'guesthouse', 'apartment']
  }
];