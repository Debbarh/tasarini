
import { Sparkles, Users, DollarSign, Bed } from "lucide-react";

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

export const travelOptions = [
  { id: 'solo', label: 'Seul(e)', emoji: '🧳', desc: 'Liberté totale et découvertes personnelles' },
  { id: 'couple', label: 'En couple', emoji: '💕', desc: 'Moments romantiques et complicité' },
  { id: 'family', label: 'En famille', emoji: '👨‍👩‍👧‍👦', desc: 'Souvenirs partagés avec vos proches' },
  { id: 'friends', label: 'Entre amis', emoji: '👥', desc: 'Fous rires et aventures collectives' },
  { id: 'group', label: 'En groupe', emoji: '🎭', desc: 'Voyage organisé avec d\'autres voyageurs' }
];

export const budgetOptions = [
  { id: 'low', label: 'Économique', desc: 'Voyage à petit budget', emoji: '💰', color: 'from-green-500 to-emerald-600' },
  { id: 'medium', label: 'Modéré', desc: 'Budget intermédiaire', emoji: '💳', color: 'from-blue-500 to-cyan-600' },
  { id: 'high', label: 'Confortable', desc: 'Voyage haut de gamme', emoji: '💎', color: 'from-purple-500 to-violet-600' },
  { id: 'luxury', label: 'Luxe', desc: 'Expérience premium', emoji: '👑', color: 'from-yellow-500 to-orange-600' }
];

export const accommodationOptions = [
  { id: 'hotel', label: 'Hôtel', emoji: '🏨', desc: 'Confort et services' },
  { id: 'apartment', label: 'Appartement', emoji: '🏠', desc: 'Comme à la maison' },
  { id: 'hostel', label: 'Auberge', emoji: '🏡', desc: 'Ambiance conviviale' },
  { id: 'villa', label: 'Villa', emoji: '🏘️', desc: 'Luxe et intimité' },
  { id: 'camping', label: 'Camping', emoji: '⛺', desc: 'Au cœur de la nature' },
  { id: 'unusual', label: 'Insolite', emoji: '🏕️', desc: 'Expérience unique' }
];
