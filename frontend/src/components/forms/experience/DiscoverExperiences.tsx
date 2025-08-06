import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ExperienceCard from './components/ExperienceCard';
import ExperienceFilters from './components/ExperienceFilters';
import { Recommendation, RecommendationFilters } from '@/types/recommendations';

// Mock data étendue pour démontrer les filtres
const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Tour gastronomique de Paris',
    description: 'Découvrez les meilleurs restaurants cachés du Marais avec un guide local passionné.',
    type: 'generated-tour',
    location: {
      address: 'Le Marais, Paris, France',
      coordinates: { latitude: 48.8566, longitude: 2.3522 }
    },
    categories: {
      activities: ['gastronomie', 'culture'],
      travelerType: ['couple', 'solo'],
      budget: 'standard'
    },
    media: {
      photos: ['/placeholder.svg'],
      videos: []
    },
    rating: 4.8,
    practicalTips: ['Réservez à l\'avance', 'Portez des chaussures confortables'],
    authorId: '1',
    authorName: 'Marie Dupont',
    createdAt: '2024-01-15',
    likes: 124,
    saves: 67,
    comments: []
  },
  {
    id: '2',
    title: 'Restaurant vue sur la Seine',
    description: 'Un restaurant romantique avec une vue imprenable sur la Seine et Notre-Dame.',
    type: 'restaurant',
    location: {
      address: 'Quai de Montebello, Paris, France',
      coordinates: { latitude: 48.8534, longitude: 2.3488 }
    },
    categories: {
      activities: ['gastronomie', 'romantique'],
      travelerType: ['couple'],
      budget: 'premium'
    },
    media: {
      photos: ['/placeholder.svg'],
      videos: []
    },
    rating: 4.5,
    practicalTips: ['Réservation obligatoire', 'Demandez une table côté Seine'],
    authorId: '2',
    authorName: 'Pierre Martin',
    createdAt: '2024-01-10',
    likes: 89,
    saves: 45,
    comments: []
  },
  {
    id: '3',
    title: 'Hôtel boutique Montmartre',
    description: 'Un charmant hôtel boutique au cœur de Montmartre, parfait pour un séjour authentique.',
    type: 'hotel',
    location: {
      address: 'Montmartre, Paris, France',
      coordinates: { latitude: 48.8867, longitude: 2.3431 }
    },
    categories: {
      activities: ['culture', 'art'],
      travelerType: ['couple', 'solo'],
      budget: 'standard'
    },
    media: {
      photos: ['/placeholder.svg'],
      videos: []
    },
    rating: 4.7,
    practicalTips: ['Proche du Sacré-Cœur', 'Petit-déjeuner inclus'],
    authorId: '3',
    authorName: 'Sophie Leroy',
    createdAt: '2024-01-08',
    likes: 156,
    saves: 78,
    comments: []
  }
];

interface DiscoverExperiencesProps {
  onBack: () => void;
}

const DiscoverExperiences = ({ onBack }: DiscoverExperiencesProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<RecommendationFilters>({});
  const [allRecommendations] = useState<Recommendation[]>(mockRecommendations);
  const [filteredRecommendations, setFilteredRecommendations] = useState<Recommendation[]>(mockRecommendations);

  console.log('🔍 DiscoverExperiences - État actuel:', {
    searchQuery,
    showFilters,
    filters,
    allRecommendations: allRecommendations.length,
    filteredRecommendations: filteredRecommendations.length
  });

  // Fonction de filtrage
  const applyFilters = () => {
    console.log('🔄 applyFilters appelée avec:', { searchQuery, filters });
    let filtered = [...allRecommendations];
    console.log('📊 Données initiales:', filtered.length);

    // Filtre par mots-clés
    if (searchQuery.trim()) {
      filtered = filtered.filter(rec => 
        rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.location.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par type
    if (filters.type) {
      filtered = filtered.filter(rec => rec.type === filters.type);
    }

    // Filtre par budget
    if (filters.budget) {
      filtered = filtered.filter(rec => rec.categories.budget === filters.budget);
    }

    // Filtre par note minimale
    if (filters.minRating) {
      filtered = filtered.filter(rec => rec.rating >= filters.minRating);
    }

    // Filtre par catégories
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(rec => 
        filters.categories!.some(category => 
          rec.categories.activities.includes(category)
        )
      );
    }

    // Filtre par localisation
    if (filters.location) {
      filtered = filtered.filter(rec => 
        rec.location.address.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    setFilteredRecommendations(filtered);
  };

  // Appliquer les filtres quand ils changent
  React.useEffect(() => {
    applyFilters();
  }, [searchQuery, filters, allRecommendations]);

  const handleFiltersChange = (newFilters: RecommendationFilters) => {
    console.log('🔧 handleFiltersChange appelée avec:', newFilters);
    setFilters(newFilters);
  };

  console.log('📋 Rendu avec showFilters:', showFilters);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8 pt-8">
          <Button variant="ghost" onClick={onBack} className="gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Découvrir des Expériences</h1>
        </div>

        {/* Search and filters */}
        <div className="mb-10 space-y-6">
          <div className="flex gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Rechercher des expériences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 text-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          </div>

          {showFilters && (
            <ExperienceFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredRecommendations.length} expérience{filteredRecommendations.length > 1 ? 's' : ''} trouvée{filteredRecommendations.length > 1 ? 's' : ''}
            </h2>
            {(searchQuery || Object.values(filters).some(f => f && (Array.isArray(f) ? f.length > 0 : true))) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setFilters({});
                }}
                className="text-gray-600 hover:text-purple-600"
              >
                Effacer les filtres
              </Button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecommendations.map((recommendation) => (
            <ExperienceCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <Search className="h-12 w-12 text-blue-500" />
            </div>
            <p className="text-gray-600 text-xl">
              Aucune expérience trouvée pour vos critères de recherche.
            </p>
            <p className="text-gray-500 mt-2">
              Essayez de modifier vos filtres ou votre recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverExperiences;