import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, MapPin, Calendar, DollarSign } from 'lucide-react';
import { WorldDiscoveryPreferences, DestinationSuggestion } from '@/types/beInspiredModes';

interface DestinationSuggestionsProps {
  preferences: WorldDiscoveryPreferences;
  onDestinationSelect: (destination: DestinationSuggestion) => void;
  onBack: () => void;
}

const DestinationSuggestions = ({ preferences, onDestinationSelect, onBack }: DestinationSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<DestinationSuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement et la génération de suggestions
    setLoading(true);
    
    setTimeout(() => {
      const mockSuggestions: DestinationSuggestion[] = [
        {
          id: 'bali',
          name: 'Bali',
          country: 'Indonésie',
          description: 'Une île paradisiaque parfaite pour la culture, la nature et la détente. Temples anciens, rizières en terrasses et plages de rêve.',
          image: '/placeholder.svg',
          score: 95,
          highlights: ['Temples sacrés', 'Rizières d\'Ubud', 'Plages de Seminyak', 'Couchers de soleil'],
          matchingActivities: preferences.activities.filter(a => ['culture', 'nature', 'beach'].includes(a)),
          suggestedDuration: Math.min(preferences.duration, 10),
          averageBudget: {
            budget: 800,
            'mid-range': 1400,
            luxury: 2800
          },
          bestSeason: ['avril', 'mai', 'juin', 'juillet', 'août', 'septembre'],
          latitude: -8.3405,
          longitude: 115.0920
        },
        {
          id: 'kyoto',
          name: 'Kyoto',
          country: 'Japon',
          description: 'L\'ancienne capitale du Japon, riche en temples, jardins zen et traditions. Une immersion culturelle unique.',
          image: '/placeholder.svg',
          score: 88,
          highlights: ['Temples dorés', 'Jardins zen', 'Geishas', 'Cuisine raffinée'],
          matchingActivities: preferences.activities.filter(a => ['culture', 'food', 'history'].includes(a)),
          suggestedDuration: Math.min(preferences.duration, 8),
          averageBudget: {
            budget: 1200,
            'mid-range': 2000,
            luxury: 4000
          },
          bestSeason: ['mars', 'avril', 'mai', 'octobre', 'novembre'],
          latitude: 35.0116,
          longitude: 135.7681
        },
        {
          id: 'patagonia',
          name: 'Patagonie',
          country: 'Argentine/Chili',
          description: 'Un terrain de jeu pour les amoureux de nature et d\'aventure. Glaciers, montagnes et faune sauvage.',
          image: '/placeholder.svg',
          score: 82,
          highlights: ['Glaciers', 'Trekking', 'Faune sauvage', 'Paysages épiques'],
          matchingActivities: preferences.activities.filter(a => ['nature', 'adventure', 'hiking'].includes(a)),
          suggestedDuration: Math.min(preferences.duration, 14),
          averageBudget: {
            budget: 1500,
            'mid-range': 2500,
            luxury: 4500
          },
          bestSeason: ['décembre', 'janvier', 'février', 'mars'],
          latitude: -49.3756,
          longitude: -73.2360
        }
      ];
      
      setSuggestions(mockSuggestions);
      setLoading(false);
    }, 1500);
  }, [preferences]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Analyse de vos préférences en cours...
          </h2>
          <p className="text-gray-500 mt-2">
            Nous trouvons les destinations parfaites pour vous
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Modifier mes préférences
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Vos destinations recommandées
          </h2>
          <p className="text-gray-600">
            Basées sur vos préférences - {suggestions.length} suggestions trouvées
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {suggestions.map((destination) => (
          <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500 text-white flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {destination.score}%
                </Badge>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">{destination.country}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {destination.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {destination.description}
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">
                    {destination.suggestedDuration} jours recommandés
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm">
                    ~{destination.averageBudget[preferences.budget]}€
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Points forts :</p>
                <div className="flex flex-wrap gap-1">
                  {destination.highlights.slice(0, 3).map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Activités correspondantes :</p>
                <div className="flex flex-wrap gap-1">
                  {destination.matchingActivities.slice(0, 3).map((activity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={() => onDestinationSelect(destination)}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Créer mon programme
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DestinationSuggestions;