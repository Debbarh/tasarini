
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Users, ArrowRight, Heart } from "lucide-react";

interface FormData {
  activities: string[];
  travelWith: string;
  budget: string;
  accommodation: string;
  mode: string;
}

interface InspirationExperiencesProps {
  formData: FormData;
  onCreateItinerary: (experience: any) => void;
}

const InspirationExperiences = ({ formData, onCreateItinerary }: InspirationExperiencesProps) => {
  // Parse budget data
  let budgetInfo = { budget: '', period: '' };
  try {
    if (formData.budget) {
      budgetInfo = JSON.parse(formData.budget);
    }
  } catch {
    budgetInfo = { budget: formData.budget, period: '' };
  }

  // Generate personalized experiences based on user preferences
  const getPersonalizedExperiences = () => {
    const experiences = [
      {
        id: 'cooking-marrakech',
        title: 'Cours de Cuisine Traditionnelle à Marrakech',
        location: 'Marrakech, Maroc',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        rating: 4.9,
        duration: '4 heures',
        groupSize: '2-8 personnes',
        category: 'food',
        budget: ['low', 'medium'],
        travelWith: ['couple', 'friends', 'family'],
        description: 'Apprenez les secrets de la cuisine marocaine dans un riad authentique avec un chef local.',
        highlights: ['Marché aux épices', 'Recettes traditionnelles', 'Déjeuner inclus'],
        price: 'À partir de 45€',
        matchScore: 95
      },
      {
        id: 'temple-meditation',
        title: 'Méditation au Lever du Soleil - Temple de Kyoto',
        location: 'Kyoto, Japon',
        image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        rating: 4.8,
        duration: '2 heures',
        groupSize: '1-15 personnes',
        category: 'culture',
        budget: ['medium', 'high'],
        travelWith: ['solo', 'couple'],
        description: 'Expérience spirituelle unique dans un temple séculaire avec un moine bouddhiste.',
        highlights: ['Cérémonie du thé', 'Enseignements zen', 'Jardin secret'],
        price: 'À partir de 65€',
        matchScore: 88
      },
      {
        id: 'street-art-istanbul',
        title: 'Tour Street Art & Quartiers Alternatifs d\'Istanbul',
        location: 'Istanbul, Turquie',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        rating: 4.7,
        duration: '3 heures',
        groupSize: '4-12 personnes',
        category: 'art',
        budget: ['low', 'medium'],
        travelWith: ['friends', 'solo'],
        description: 'Découvrez la scène artistique underground d\'Istanbul avec un artiste local.',
        highlights: ['Galeries cachées', 'Rencontre artistes', 'Quartier Beyoğlu'],
        price: 'À partir de 35€',
        matchScore: 92
      },
      {
        id: 'diving-bali',
        title: 'Plongée avec Raies Manta à Nusa Penida',
        location: 'Bali, Indonésie',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        rating: 4.9,
        duration: 'Journée complète',
        groupSize: '6-12 personnes',
        category: 'adventure',
        budget: ['medium', 'high'],
        travelWith: ['friends', 'couple'],
        description: 'Nagez avec les majestueuses raies manta dans les eaux cristallines de Nusa Penida.',
        highlights: ['Raies manta géantes', 'Récifs coralliens', 'Transport inclus'],
        price: 'À partir de 85€',
        matchScore: 85
      },
      {
        id: 'spa-santorini',
        title: 'Spa Volcanique avec Vue sur la Caldeira',
        location: 'Santorin, Grèce',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        rating: 4.6,
        duration: '2-3 heures',
        groupSize: '1-2 personnes',
        category: 'relax',
        budget: ['high', 'luxury'],
        travelWith: ['couple', 'solo'],
        description: 'Détente absolue dans un spa de luxe avec vue panoramique sur la mer Égée.',
        highlights: ['Massage aux pierres volcaniques', 'Vue exceptionnelle', 'Produits locaux'],
        price: 'À partir de 120€',
        matchScore: 78
      },
      {
        id: 'desert-safari',
        title: 'Safari Désert et Nuit sous les Étoiles',
        location: 'Dubai, EAU',
        image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        rating: 4.5,
        duration: '12 heures',
        groupSize: '8-20 personnes',
        category: 'adventure',
        budget: ['medium', 'high'],
        travelWith: ['friends', 'family', 'couple'],
        description: 'Aventure inoubliable dans le désert avec dîner bédouin et spectacle traditionnel.',
        highlights: ['Dunes de sable rouge', 'Dîner aux chandelles', 'Fauconnerie'],
        price: 'À partir de 95€',
        matchScore: 82
      }
    ];

    // Filter experiences based on user preferences
    return experiences
      .filter(exp => {
        // Filter by budget
        if (budgetInfo.budget && !exp.budget.includes(budgetInfo.budget)) return false;
        
        // Filter by travel companion
        if (formData.travelWith && !exp.travelWith.includes(formData.travelWith)) return false;
        
        // Filter by activities
        return formData.activities.includes(exp.category);
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6);
  };

  const personalizedExperiences = getPersonalizedExperiences();

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'food': '🍽️',
      'culture': '🏛️',
      'art': '🎨',
      'adventure': '🏔️',
      'relax': '🧘‍♀️',
      'nature': '🌿'
    };
    return icons[category] || '✨';
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Expériences Uniques pour Vous
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Des moments d'exception sélectionnés selon vos passions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {personalizedExperiences.map((experience, index) => (
          <Card 
            key={experience.id} 
            className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/70 backdrop-blur-sm border-0 overflow-hidden"
          >
            <div className="relative">
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Match Score Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                {experience.matchScore}% match
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                {getCategoryIcon(experience.category)} {experience.category}
              </div>
              
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold mb-1">{experience.title}</h3>
                <p className="text-sm opacity-90">{experience.location}</p>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{experience.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{experience.groupSize}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4">{experience.description}</p>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Points forts :</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-2 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-purple-600">
                  {experience.price}
                </div>
                <Button
                  onClick={() => onCreateItinerary(experience)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Réserver
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {personalizedExperiences.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Aucune expérience trouvée
          </h3>
          <p className="text-gray-600">
            Essayez de modifier vos préférences pour découvrir plus d'options
          </p>
        </div>
      )}
    </div>
  );
};

export default InspirationExperiences;
