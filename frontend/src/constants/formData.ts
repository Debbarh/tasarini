
import { MapPin, Users, DollarSign, Bed, Activity, Sparkles } from "lucide-react";

// Unified activity options (merged from both files)
export const activityOptions = [
  { id: 'culture', label: 'Culture & Histoire', emoji: '🏛️', desc: 'Musées, monuments, traditions' },
  { id: 'nature', label: 'Nature & Paysages', emoji: '🌿', desc: 'Montagnes, forêts, océans' },
  { id: 'food', label: 'Gastronomie', emoji: '🍽️', desc: 'Saveurs locales et restaurants' },
  { id: 'nightlife', label: 'Vie Nocturne', emoji: '🌃', desc: 'Bars, clubs, spectacles' },
  { id: 'sport', label: 'Sports & Aventure', emoji: '🏔️', desc: 'Randonnée, sports extrêmes' },
  { id: 'relax', label: 'Détente & Spa', emoji: '🧘‍♀️', desc: 'Bien-être et relaxation' },
  { id: 'adventure', label: 'Aventure Extrême', emoji: '🪂', desc: 'Sensations fortes garanties' },
  { id: 'art', label: 'Art & Design', emoji: '🎨', desc: 'Galeries, artisanat, créativité' }
];

// Extended activity categories for advanced mode
export const activityCategories = [
  {
    category: 'Culture & Histoire',
    icon: '🏛️',
    activities: [
      { value: 'museums', label: 'Musées', icon: '🖼️' },
      { value: 'monuments', label: 'Monuments historiques', icon: '🏰' },
      { value: 'medina', label: 'Visite de médina', icon: '🕌' },
      { value: 'artisanat', label: 'Artisanat', icon: '🎨' },
      { value: 'culture', label: 'Culture', icon: '🏛️' }
    ]
  },
  {
    category: 'Aventure & Sport',
    icon: '🏔️',
    activities: [
      { value: 'trekking', label: 'Randonnée/Trekking', icon: '🥾' },
      { value: 'desert', label: 'Excursion désert', icon: '🐪' },
      { value: 'surf', label: 'Surf', icon: '🏄' },
      { value: 'climbing', label: 'Escalade', icon: '🧗' },
      { value: 'golf', label: 'Golf', icon: '⛳' },
      { value: 'safari', label: 'Safari', icon: '🦁' }
    ]
  },
  {
    category: 'Détente & Bien-être',
    icon: '🧘',
    activities: [
      { value: 'spa', label: 'Spa & Hammam', icon: '🛁' },
      { value: 'yoga', label: 'Yoga & Méditation', icon: '🧘' },
      { value: 'beach', label: 'Plage & Farniente', icon: '🏖️' },
      { value: 'meditation', label: 'Méditation', icon: '🧘‍♀️' }
    ]
  },
  {
    category: 'Gastronomie & Saveurs',
    icon: '🍽️',
    activities: [
      { value: 'cooking', label: 'Cours de cuisine', icon: '👨‍🍳' },
      { value: 'food-tour', label: 'Tour gastronomique', icon: '🍴' },
      { value: 'wine-tasting', label: 'Dégustation de vins', icon: '🍷' },
      { value: 'market', label: 'Marchés locaux', icon: '🛒' }
    ]
  }
];

// Unified budget options
export const budgetOptions = [
  { id: 'low', label: 'Économique', desc: 'Voyage à petit budget', emoji: '💰', color: 'from-green-500 to-emerald-600' },
  { id: 'medium', label: 'Modéré', desc: 'Budget intermédiaire', emoji: '💳', color: 'from-blue-500 to-cyan-600' },
  { id: 'high', label: 'Confortable', desc: 'Voyage haut de gamme', emoji: '💎', color: 'from-purple-500 to-violet-600' },
  { id: 'luxury', label: 'Luxe', desc: 'Expérience premium', emoji: '👑', color: 'from-yellow-500 to-orange-600' }
];

// Unified accommodation options
export const accommodationOptions = [
  { id: 'hotel', label: 'Hôtel', emoji: '🏨', desc: 'Confort et services' },
  { id: 'apartment', label: 'Appartement', emoji: '🏠', desc: 'Comme à la maison' },
  { id: 'hostel', label: 'Auberge', emoji: '🏡', desc: 'Ambiance conviviale' },
  { id: 'villa', label: 'Villa', emoji: '🏘️', desc: 'Luxe et intimité' },
  { id: 'camping', label: 'Camping', emoji: '⛺', desc: 'Au cœur de la nature' },
  { id: 'unusual', label: 'Insolite', emoji: '🏕️', desc: 'Expérience unique' },
  { id: 'chez-habitant', label: 'Chez l\'habitant', emoji: '🏠', desc: 'Séjour authentique en famille' },
  { id: 'hotelier-classe', label: 'Établissement hôtelier classé', emoji: '⭐', desc: 'Hôtels avec classification officielle' },
  { id: 'riad-traditionnel', label: 'Riad traditionnel', emoji: '🕌', desc: 'Charme authentique marocain' }
];

// Travel companion options with subSegments for TravelWithStep
export const travelOptions = [
  { 
    id: 'solo', 
    name: 'Seul(e)', 
    emoji: '🧳', 
    desc: 'Liberté totale et découvertes personnelles',
    label: 'Seul(e)'
  },
  { 
    id: 'couple', 
    name: 'En couple', 
    emoji: '💕', 
    desc: 'Moments romantiques et complicité',
    label: 'En couple'
  },
  { 
    id: 'family', 
    name: 'En famille', 
    emoji: '👨‍👩‍👧‍👦', 
    desc: 'Souvenirs partagés avec vos proches',
    label: 'En famille',
    subSegments: [
      { id: 'family-young', name: 'Famille avec jeunes enfants', emoji: '👶', desc: 'Enfants de 0 à 6 ans' },
      { id: 'family-teens', name: 'Famille avec adolescents', emoji: '👦', desc: 'Enfants de 7 à 17 ans' },
      { id: 'family-adults', name: 'Famille multigénérationnelle', emoji: '👴', desc: 'Adultes et seniors' }
    ]
  },
  { 
    id: 'friends', 
    name: 'Entre amis', 
    emoji: '👥', 
    desc: 'Fous rires et aventures collectives',
    label: 'Entre amis',
    subSegments: [
      { id: 'friends-small', name: 'Petit groupe d\'amis', emoji: '👫', desc: '2-4 personnes' },
      { id: 'friends-large', name: 'Grand groupe d\'amis', emoji: '👥', desc: '5-10 personnes' }
    ]
  },
  { 
    id: 'group', 
    name: 'En groupe', 
    emoji: '🎭', 
    desc: 'Voyage organisé avec d\'autres voyageurs',
    label: 'En groupe',
    subSegments: [
      { id: 'group-organized', name: 'Voyage organisé', emoji: '🚌', desc: 'Circuit avec guide' },
      { id: 'group-custom', name: 'Groupe personnalisé', emoji: '🎯', desc: 'Voyage sur mesure' }
    ]
  }
];

// Step configurations for BeInspired
export const beInspiredStepConfigs = [
  { 
    id: 'activities', 
    title: 'Vos Passions', 
    subtitle: 'Qu\'est-ce qui fait battre votre cœur de voyageur ?', 
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'travelWith', 
    title: 'Votre Tribu', 
    subtitle: 'Avec qui partagerez-vous ces instants magiques ?', 
    icon: Users,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'budget', 
    title: 'Votre Investissement Bonheur', 
    subtitle: 'Combien voulez-vous investir dans vos rêves ?', 
    icon: DollarSign,
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'accommodation', 
    title: 'Votre Cocon', 
    subtitle: 'Où aimez-vous poser vos valises pour rêver ?', 
    icon: Bed,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  }
];

// Step configurations for Plan Trip
export const planTripStepConfigs = [
  { 
    id: 'destination', 
    title: 'Votre Destination de Rêve', 
    subtitle: 'Où votre aventure commence-t-elle ?', 
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'travelWith', 
    title: 'Vos Compagnons d\'Aventure', 
    subtitle: 'Avec qui partagerez-vous ces moments magiques ?', 
    icon: Users,
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'budgetAndFood', 
    title: 'Budget & Saveurs', 
    subtitle: 'Définissons votre budget et vos envies culinaires', 
    icon: DollarSign,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'accommodation', 
    title: 'Votre Refuge', 
    subtitle: 'Où rêvez-vous de poser vos valises ?', 
    icon: Bed,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'activities', 
    title: 'Expériences Inoubliables', 
    subtitle: 'Quelles aventures vous font vibrer ?', 
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  }
];
