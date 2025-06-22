
export const accommodationCategories = {
  'luxe': {
    label: 'Luxe & Prestige',
    color: 'purple',
    items: [
      { value: 'palais', label: 'Palais', description: 'Luxe royal et raffinement', icon: '🏰' },
      { value: 'hotel-5', label: 'Hôtel 5*', description: 'Excellence et prestige', icon: '⭐' },
      { value: 'hotel-4', label: 'Hôtel 4*', description: 'Confort et qualité premium', icon: '🌟' },
      { value: 'centres-villegiature', label: 'Centres de villégiature', description: 'Détente et loisirs haut de gamme', icon: '🌴' }
    ]
  },
  'confort': {
    label: 'Confort & Praticité',
    color: 'blue',
    items: [
      { value: 'hotel-3', label: 'Hôtel 3*', description: 'Bon rapport qualité-prix', icon: '✨' },
      { value: 'hotel-2', label: 'Hôtel 2*', description: 'Simple et économique', icon: '🏨' },
      { value: 'motel', label: 'Motel', description: 'Pratique et accessible', icon: '🛣️' },
      { value: 'appartements-services', label: 'Appartements avec services', description: 'Confort résidentiel avec services', icon: '🏢' }
    ]
  },
  'authentique': {
    label: 'Authentique & Local',
    color: 'orange',
    items: [
      { value: 'riad', label: 'Riad', description: 'Charme traditionnel marocain', icon: '🕌' },
      { value: 'gite', label: 'Gîte', description: 'Séjour à la campagne', icon: '🏡' },
      { value: 'chambres-hotes', label: 'Chambres d\'hôtes', description: 'Accueil familial personnalisé', icon: '🏠' },
      { value: 'maisons-hotes', label: 'Maisons d\'hôtes', description: 'Intimité et authenticité', icon: '🏘️' },
      { value: 'auberges', label: 'Auberges', description: 'Convivialité et économie', icon: '🎒' }
    ]
  },
  'nature': {
    label: 'Nature & Aventure',
    color: 'green',
    items: [
      { value: 'terrains-camping', label: 'Terrains de camping', description: 'Nature et aventure', icon: '⛺' },
      { value: 'glamping', label: 'Glamping', description: 'Camping de luxe avec confort', icon: '✨' },
      { value: 'sejours-ferme', label: 'Séjours à la ferme', description: 'Expérience rurale authentique', icon: '🚜' },
      { value: 'locations-vacances', label: 'Locations de vacances', description: 'Liberté et indépendance', icon: '🗝️' }
    ]
  },
  'specialise': {
    label: 'Spécialisé & Unique',
    color: 'pink',
    items: [
      { value: 'peniches', label: 'Péniches', description: 'Séjour flottant unique', icon: '🛥️' },
      { value: 'retraites', label: 'Retraites', description: 'Ressourcement et bien-être', icon: '🧘' }
    ]
  }
};

export const preferences = [
  // Services de base
  { value: 'wifi', label: 'WiFi gratuit', icon: '📶', category: 'services' },
  { value: 'breakfast', label: 'Petit déjeuner inclus', icon: '🥐', category: 'services' },
  { value: 'restaurant', label: 'Restaurant', icon: '🍽️', category: 'services' },
  { value: 'room-service', label: 'Service d\'étage', icon: '🛎️', category: 'services' },
  { value: 'concierge', label: 'Service de conciergerie', icon: '🎩', category: 'services' },
  { value: 'laundry', label: 'Service de blanchisserie', icon: '🧺', category: 'services' },
  
  // Bien-être & Loisirs
  { value: 'pool', label: 'Piscine', icon: '🏊', category: 'wellness' },
  { value: 'spa', label: 'Spa & Bien-être', icon: '🧘', category: 'wellness' },
  { value: 'fitness', label: 'Salle de sport', icon: '💪', category: 'wellness' },
  { value: 'hammam', label: 'Hammam', icon: '♨️', category: 'wellness' },
  { value: 'jacuzzi', label: 'Jacuzzi', icon: '🛁', category: 'wellness' },
  { value: 'massage', label: 'Service de massage', icon: '💆', category: 'wellness' },
  
  // Proximité & Localisation
  { value: 'city-center', label: 'Centre-ville', icon: '🏙️', category: 'location' },
  { value: 'attractions', label: 'Proche des attractions', icon: '🎭', category: 'location' },
  { value: 'beach', label: 'Proche de la plage', icon: '🏖️', category: 'location' },
  { value: 'airport', label: 'Proche de l\'aéroport', icon: '✈️', category: 'location' },
  { value: 'transport', label: 'Transports publics', icon: '🚇', category: 'location' },
  { value: 'shopping', label: 'Centres commerciaux', icon: '🛍️', category: 'location' },
  
  // Pratique & Confort
  { value: 'parking', label: 'Parking gratuit', icon: '🚗', category: 'practical' },
  { value: 'air-conditioning', label: 'Climatisation', icon: '❄️', category: 'practical' },
  { value: 'elevator', label: 'Ascenseur', icon: '🛗', category: 'practical' },
  { value: 'balcony', label: 'Balcon/Terrasse', icon: '🌅', category: 'practical' },
  { value: 'kitchen', label: 'Kitchenette', icon: '🍳', category: 'practical' },
  { value: 'minibar', label: 'Minibar', icon: '🥤', category: 'practical' },
  
  // Accessibilité & Sécurité
  { value: 'wheelchair', label: 'Accessible PMR', icon: '♿', category: 'accessibility' },
  { value: 'security', label: 'Sécurité 24h/24', icon: '🔒', category: 'accessibility' },
  { value: 'safe', label: 'Coffre-fort', icon: '🔐', category: 'accessibility' },
  { value: 'cctv', label: 'Vidéosurveillance', icon: '📹', category: 'accessibility' },
  
  // Atmosphère & Ambiance
  { value: 'quiet', label: 'Environnement calme', icon: '🤫', category: 'atmosphere' },
  { value: 'romantic', label: 'Ambiance romantique', icon: '💕', category: 'atmosphere' },
  { value: 'family', label: 'Adapté aux familles', icon: '👨‍👩‍👧‍👦', category: 'atmosphere' },
  { value: 'business', label: 'Business center', icon: '💼', category: 'atmosphere' },
  { value: 'nightlife', label: 'Proche de la vie nocturne', icon: '🌙', category: 'atmosphere' },
  { value: 'cultural', label: 'Quartier culturel', icon: '🎨', category: 'atmosphere' }
];

export const preferenceCategories = {
  'services': { label: 'Services', color: 'blue', icon: '🛎️' },
  'wellness': { label: 'Bien-être', color: 'green', icon: '🧘' },
  'location': { label: 'Localisation', color: 'purple', icon: '📍' },
  'practical': { label: 'Confort', color: 'orange', icon: '🏠' },
  'accessibility': { label: 'Accessibilité & Sécurité', color: 'red', icon: '🛡️' },
  'atmosphere': { label: 'Atmosphère', color: 'pink', icon: '✨' }
};
