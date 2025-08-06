
import { MapPin, Users, DollarSign, Bed, Activity, ChefHat } from "lucide-react";

export const stepConfigs = [
  {
    id: 'destination',
    title: 'Destination',
    subtitle: 'Où souhaitez-vous voyager ?',
    image: '/placeholder.svg',
    icon: MapPin
  },
  {
    id: 'travelWith',
    title: 'Avec qui voyagez-vous ?',
    subtitle: 'Définissez votre profil de voyage',
    image: '/placeholder.svg',
    icon: Users
  },
  {
    id: 'budget',
    title: 'Budget',
    subtitle: 'Quel est votre budget pour le voyage ?',
    image: '/placeholder.svg',
    icon: DollarSign
  },
  {
    id: 'cuisine',
    title: 'Cuisine et Expérience Culinaire',
    subtitle: 'Quelles sont vos préférences culinaires ?',
    image: '/placeholder.svg',
    icon: ChefHat
  },
  {
    id: 'accommodation',
    title: 'Hébergement',
    subtitle: 'Quel type d\'hébergement préférez-vous ?',
    image: '/placeholder.svg',
    icon: Bed
  },
  {
    id: 'activities',
    title: 'Activités',
    subtitle: 'Quelles activités vous intéressent ?',
    image: '/placeholder.svg',
    icon: Activity
  }
];

export const travelSegments = [
  {
    id: 'solo',
    name: 'En solo',
    desc: 'Voyage en solitaire pour une expérience personnelle',
    emoji: '🧳',
    subSegments: [
      {
        id: 'solo-young',
        name: 'Solo junior (18-35 ans)',
        desc: 'Voyage dynamique avec budget étudiant/jeune actif',
        emoji: '🎒'
      },
      {
        id: 'solo-adult',
        name: 'Solo adulte (36-55 ans)',
        desc: 'Voyage équilibré entre confort et découverte',
        emoji: '🚶‍♀️'
      },
      {
        id: 'solo-senior',
        name: 'Solo senior (55+ ans)',
        desc: 'Voyage confortable avec rythme adapté',
        emoji: '🧘'
      }
    ]
  },
  {
    id: 'couple',
    name: 'En couple',
    desc: 'Voyage romantique à deux',
    emoji: '💑',
    subSegments: [
      {
        id: 'couple-honeymoon',
        name: 'Lune de miel',
        desc: 'Voyage romantique de noces ou anniversaire',
        emoji: '💍'
      },
      {
        id: 'couple-romantic',
        name: 'Escapade romantique',
        desc: 'Weekend ou séjour intimiste à deux',
        emoji: '💕'
      },
      {
        id: 'couple-adventure',
        name: 'Couple aventurier',
        desc: 'Aventures et activités partagées',
        emoji: '⛰️'
      },
      {
        id: 'couple-relax',
        name: 'Couple détente',
        desc: 'Voyage bien-être et relaxation à deux',
        emoji: '🌅'
      }
    ]
  },
  {
    id: 'family',
    name: 'En famille',
    desc: 'Voyage avec enfants et famille',
    emoji: '👨‍👩‍👧‍👦',
    subSegments: [
      {
        id: 'family-young',
        name: 'Jeunes enfants',
        desc: 'Famille avec enfants de moins de 10 ans',
        emoji: '👶'
      },
      {
        id: 'family-teens',
        name: 'Adolescents',
        desc: 'Famille avec adolescents',
        emoji: '👦'
      }
    ]
  },
  {
    id: 'friends',
    name: 'Entre amis',
    desc: 'Voyage en groupe d\'amis',
    emoji: '👥',
    subSegments: [
      {
        id: 'friends-party',
        name: 'Groupe festif',
        desc: 'Voyage axé sur la fête et les sorties',
        emoji: '🎉'
      },
      {
        id: 'friends-culture',
        name: 'Groupe culturel',
        desc: 'Voyage culturel et découverte',
        emoji: '🏛️'
      }
    ]
  },
  {
    id: 'business',
    name: 'Professionnel',
    desc: 'Voyage d\'affaires ou conférence',
    emoji: '💼'
  }
];
