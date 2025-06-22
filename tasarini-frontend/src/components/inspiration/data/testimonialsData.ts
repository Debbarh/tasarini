
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  trip: string;
  categories: string[];
  budget: string;
  testimonial: string;
  highlight: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 'culture-lover',
    name: 'Marie L.',
    location: 'Paris, France',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332f87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    date: 'Il y a 2 semaines',
    trip: 'Kyoto, Japon',
    categories: ['culture', 'solo'],
    budget: 'medium',
    testimonial: "Une expérience transformatrice ! Les recommandations étaient parfaitement adaptées à ma passion pour la culture japonaise. Les temples suggérés étaient authentiques et moins touristiques.",
    highlight: "Les conseils culturels m'ont permis de vivre des moments magiques"
  },
  {
    id: 'adventure-couple',
    name: 'Thomas & Sarah',
    location: 'Lyon, France',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    date: 'Il y a 1 mois',
    trip: 'Bali, Indonésie',
    categories: ['adventure', 'nature', 'couple'],
    budget: 'medium',
    testimonial: "Nous cherchions l'aventure et la détente à la fois. Le système d'inspiration nous a proposé exactement ce qu'il fallait : plongée le matin, spa volcaniques l'après-midi !",
    highlight: "Un équilibre parfait entre aventure et romantisme"
  },
  {
    id: 'family-explorer',
    name: 'Famille Rodriguez',
    location: 'Marseille, France',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    date: 'Il y a 3 semaines',
    trip: 'Marrakech, Maroc',
    categories: ['culture', 'food', 'family'],
    budget: 'medium',
    testimonial: "Voyage en famille réussi ! Les enfants ont adoré l'atelier de cuisine, et nous avons découvert des lieux authentiques loin des pièges à touristes. Parfait pour tous les âges.",
    highlight: "Des activités parfaites pour petits et grands"
  },
  {
    id: 'luxury-couple',
    name: 'Elena K.',
    location: 'Monaco',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    date: 'Il y a 1 semaine',
    trip: 'Santorin, Grèce',
    categories: ['relax', 'couple'],
    budget: 'luxury',
    testimonial: "Le niveau de personnalisation est exceptionnel. Chaque recommandation correspondait parfaitement à nos attentes de luxe et d'intimité. Le spa avec vue sur la caldeira était magique.",
    highlight: "Un service haut de gamme qui dépasse les attentes"
  },
  {
    id: 'budget-solo',
    name: 'Alex M.',
    location: 'Toulouse, France',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    date: 'Il y a 2 mois',
    trip: 'Istanbul, Turquie',
    categories: ['culture', 'art', 'solo'],
    budget: 'low',
    testimonial: "Même avec un budget serré, j'ai vécu un voyage incroyable ! Les conseils pour économiser tout en découvrant la vraie culture locale ont été précieux. Istanbul m'a conquis !",
    highlight: "Un voyage riche en découvertes malgré un petit budget"
  },
  {
    id: 'friends-party',
    name: 'Groupe de Copains',
    location: 'Bordeaux, France',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    date: 'Il y a 6 semaines',
    trip: 'Dubai, EAU',
    categories: ['nightlife', 'friends'],
    budget: 'high',
    testimonial: "Entre amis, on voulait du spectaculaire et de la fête. Dubai était parfait ! Les recommandations pour les rooftops et les expériences uniques ont rendu notre voyage légendaire.",
    highlight: "Des expériences spectaculaires parfaites entre amis"
  }
];
