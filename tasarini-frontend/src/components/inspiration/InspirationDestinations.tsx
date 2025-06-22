
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Clock, Users, ArrowRight } from "lucide-react";

interface FormData {
  activities: string[];
  travelWith: string;
  budget: string;
  accommodation: string;
  mode: string;
}

interface InspirationDestinationsProps {
  formData: FormData;
  onCreateItinerary: (destination: any) => void;
}

const InspirationDestinations = ({ formData, onCreateItinerary }: InspirationDestinationsProps) => {
  // Parse budget data
  let budgetInfo = { budget: '', period: '' };
  try {
    if (formData.budget) {
      budgetInfo = JSON.parse(formData.budget);
    }
  } catch {
    budgetInfo = { budget: formData.budget, period: '' };
  }

  // Generate personalized destinations based on user preferences
  const getPersonalizedDestinations = () => {
    const destinations = [
      {
        id: 'marrakech',
        name: 'Marrakech',
        country: 'Maroc',
        image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d0b678?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        rating: 4.8,
        matchScore: 95,
        highlights: ['Culture & Histoire', 'Gastronomie', 'Art & Design'],
        duration: '4-7 jours',
        bestFor: ['couple', 'friends', 'solo'],
        budget: ['medium', 'high'],
        description: 'La ville rouge vous séduira par ses souks colorés, sa médina authentique et ses riads somptueux.',
        reasons: ['Parfait pour les passionnés de culture', 'Gastronomie exceptionnelle', 'Architecture unique']
      },
      {
        id: 'istanbul',
        name: 'Istanbul',
        country: 'Turquie',
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        rating: 4.7,
        matchScore: 88,
        highlights: ['Culture & Histoire', 'Gastronomie', 'Vie Nocturne'],
        duration: '3-5 jours',
        bestFor: ['couple', 'friends', 'family'],
        budget: ['low', 'medium'],
        description: 'Entre Europe et Asie, Istanbul offre un mélange unique de traditions et de modernité.',
        reasons: ['Riche patrimoine historique', 'Cuisine délicieuse', 'Ambiance cosmopolite']
      },
      {
        id: 'kyoto',
        name: 'Kyoto',
        country: 'Japon',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        rating: 4.9,
        matchScore: 85,
        highlights: ['Culture & Histoire', 'Nature & Paysages', 'Détente & Spa'],
        duration: '5-10 jours',
        bestFor: ['couple', 'solo', 'family'],
        budget: ['medium', 'high', 'luxury'],
        description: 'L\'ancienne capitale impériale vous transportera dans un Japon authentique et spirituel.',
        reasons: ['Temples majestueux', 'Jardins zen', 'Traditions préservées']
      },
      {
        id: 'santorini',
        name: 'Santorin',
        country: 'Grèce',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        rating: 4.6,
        matchScore: 82,
        highlights: ['Nature & Paysages', 'Détente & Spa', 'Gastronomie'],
        duration: '3-6 jours',
        bestFor: ['couple', 'friends'],
        budget: ['medium', 'high', 'luxury'],
        description: 'L\'île volcanique aux maisons blanches et couchers de soleil inoubliables.',
        reasons: ['Paysages à couper le souffle', 'Romantisme absolu', 'Gastronomie méditerranéenne']
      },
      {
        id: 'bali',
        name: 'Bali',
        country: 'Indonésie',
        image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        rating: 4.5,
        matchScore: 90,
        highlights: ['Nature & Paysages', 'Détente & Spa', 'Sports & Aventure'],
        duration: '7-14 jours',
        bestFor: ['couple', 'friends', 'solo'],
        budget: ['low', 'medium'],
        description: 'L\'île des dieux offre plages paradisiaques, temples mystiques et bien-être absolu.',
        reasons: ['Nature tropicale luxuriante', 'Spiritualité balinaise', 'Rapport qualité-prix excellent']
      },
      {
        id: 'dubai',
        name: 'Dubai',
        country: 'Émirats Arabes Unis',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        rating: 4.4,
        matchScore: 75,
        highlights: ['Vie Nocturne', 'Shopping', 'Architecture moderne'],
        duration: '3-5 jours',
        bestFor: ['couple', 'friends', 'family'],
        budget: ['high', 'luxury'],
        description: 'La métropole futuriste où le luxe et l\'innovation redéfinissent le voyage.',
        reasons: ['Architecture spectaculaire', 'Shopping de luxe', 'Expériences uniques']
      }
    ];

    // Filter destinations based on user preferences
    return destinations
      .filter(dest => {
        // Filter by budget
        if (budgetInfo.budget && !dest.budget.includes(budgetInfo.budget)) return false;
        
        // Filter by travel companion
        if (formData.travelWith && !dest.bestFor.includes(formData.travelWith)) return false;
        
        // Filter by activities (at least one match)
        const hasMatchingActivity = formData.activities.some(activity => {
          const activityMap: { [key: string]: string[] } = {
            'culture': ['Culture & Histoire'],
            'nature': ['Nature & Paysages'],
            'food': ['Gastronomie'],
            'nightlife': ['Vie Nocturne'],
            'sport': ['Sports & Aventure'],
            'relax': ['Détente & Spa'],
            'adventure': ['Sports & Aventure'],
            'art': ['Art & Design']
          };
          
          const mappedActivities = activityMap[activity] || [activity];
          return mappedActivities.some(mapped => 
            dest.highlights.some(highlight => highlight.includes(mapped))
          );
        });
        
        return hasMatchingActivity;
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6);
  };

  const personalizedDestinations = getPersonalizedDestinations();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Destinations Parfaites pour Vous
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Basées sur vos passions et préférences, voici les destinations qui vous correspondent le mieux
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {personalizedDestinations.map((destination, index) => (
          <Card 
            key={destination.id} 
            className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/70 backdrop-blur-sm border-0 overflow-hidden"
          >
            <div className="relative">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Match Score Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                {destination.matchScore}% match
              </div>
              
              {/* Ranking Badge */}
              {index < 3 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  #{index + 1} pour vous
                </div>
              )}
              
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <p className="text-sm opacity-90">{destination.country}</p>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{destination.rating}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{destination.duration}</span>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4">{destination.description}</p>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Pourquoi c'est parfait pour vous :</h4>
                <ul className="space-y-1">
                  {destination.reasons.slice(0, 2).map((reason, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {destination.highlights.slice(0, 3).map((highlight) => (
                  <span
                    key={highlight}
                    className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <Button
                onClick={() => onCreateItinerary(destination)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Créer mon itinéraire
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {personalizedDestinations.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Aucune destination trouvée
          </h3>
          <p className="text-gray-600">
            Essayez de modifier vos préférences pour découvrir plus d'options
          </p>
        </div>
      )}
    </div>
  );
};

export default InspirationDestinations;
