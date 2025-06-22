
import { MapPin, Users, DollarSign, Bed, Activity } from "lucide-react";
import { CountryService } from "@/services/countryService";

export const stepConfigs = [
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

// Utilisation de la nouvelle base de données pour les pays
export const countries = CountryService.getAllCountries().map(country => ({
  code: country.code,
  name: country.name,
  cities: country.cities || [],
  emoji: country.flagCode
}));

export const travelSegments = [
  { 
    id: 'solo', 
    name: 'Solo', 
    desc: 'Liberté totale et découvertes personnelles', 
    emoji: '🎒',
    subSegments: [
      { id: 'young-adult-solo', name: 'Young Adult Solo', desc: 'Aventure et découverte (18-35 ans)', emoji: '🌟' },
      { id: 'senior-solo', name: 'Senior Solo', desc: 'Voyage serein et culturel (55+ ans)', emoji: '🧳' }
    ]
  },
  { 
    id: 'couple', 
    name: 'En Couple', 
    desc: 'Moments romantiques et complicité', 
    emoji: '💕',
    subSegments: [
      { id: 'young-couple', name: 'Jeune Couple', desc: 'Romance et aventure (20-40 ans)', emoji: '💑' },
      { id: 'senior-couple', name: 'Couple Senior', desc: 'Confort et moments privilégiés (50+ ans)', emoji: '👫' }
    ]
  },
  { 
    id: 'family', 
    name: 'En Famille', 
    desc: 'Souvenirs partagés et joie des enfants', 
    emoji: '👨‍👩‍👧‍👦',
    subSegments: [
      { id: 'young-family', name: 'Jeune Famille', desc: 'Avec enfants en bas âge (0-12 ans)', emoji: '👶' },
      { id: 'senior-family', name: 'Famille Senior', desc: 'Voyage multi-générationnel', emoji: '👴👵' }
    ]
  },
  { 
    id: 'friends', 
    name: 'Entre Amis', 
    desc: 'Fous rires et aventures collectives', 
    emoji: '👥',
    subSegments: [
      { id: 'group-friends', name: 'Group of Friends', desc: 'Amis du même âge', emoji: '🎉' },
      { id: 'multi-generational', name: 'Multi-generational Group', desc: 'Groupe mixte d\'âges différents', emoji: '👨‍👩‍👧‍👦' }
    ]
  }
];
