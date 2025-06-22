
import React, { useState } from 'react';
import { Star, Bookmark, Users, MapPin, Heart, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface Tour {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  duration: string;
  rating: number;
  reviewCount: number;
  price: number;
  isBookmarked: boolean;
  likes: number;
  createdBy: string;
  tags: string[];
}

const mockTours: Tour[] = [
  {
    id: '1',
    title: 'Temples cachés de Kyoto',
    description: 'Découverte des temples secrets loin des foules touristiques',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Kyoto, Japon',
    duration: '3 jours',
    rating: 4.8,
    reviewCount: 124,
    price: 350,
    isBookmarked: false,
    likes: 89,
    createdBy: 'Marie L.',
    tags: ['Culture', 'Spiritualité', 'Photo']
  },
  {
    id: '2',
    title: 'Couchers de soleil à Santorini',
    description: 'Les meilleurs spots pour admirer le coucher de soleil grec',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Santorini, Grèce',
    duration: '2 jours',
    rating: 4.9,
    reviewCount: 201,
    price: 280,
    isBookmarked: true,
    likes: 156,
    createdBy: 'Thomas P.',
    tags: ['Romance', 'Photo', 'Détente']
  },
  {
    id: '3',
    title: 'Aventure en Islande sauvage',
    description: 'Exploration des fjords et chasse aux aurores boréales',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Islande',
    duration: '5 jours',
    rating: 4.7,
    reviewCount: 78,
    price: 750,
    isBookmarked: false,
    likes: 234,
    createdBy: 'Emma D.',
    tags: ['Aventure', 'Nature', 'Photo']
  },
  {
    id: '4',
    title: 'Plages secrètes de Bali',
    description: 'Découverte des plages cachées et de la culture locale',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Bali, Indonésie',
    duration: '4 jours',
    rating: 4.6,
    reviewCount: 167,
    price: 420,
    isBookmarked: false,
    likes: 198,
    createdBy: 'Lucas M.',
    tags: ['Plage', 'Culture', 'Détente']
  }
];

const ToursSection = () => {
  const { t } = useLanguage();
  const [tours, setTours] = useState<Tour[]>(mockTours);
  const [filter, setFilter] = useState<'all' | 'recommended' | 'popular' | 'bookmarked'>('all');

  const handleBookmark = (tourId: string) => {
    setTours(prevTours =>
      prevTours.map(tour =>
        tour.id === tourId
          ? { ...tour, isBookmarked: !tour.isBookmarked }
          : tour
      )
    );
  };

  const handleLike = (tourId: string) => {
    setTours(prevTours =>
      prevTours.map(tour =>
        tour.id === tourId
          ? { ...tour, likes: tour.likes + 1 }
          : tour
      )
    );
  };

  const getFilteredTours = () => {
    switch (filter) {
      case 'recommended':
        return tours.filter(tour => tour.rating >= 4.7);
      case 'popular':
        return tours.sort((a, b) => b.likes - a.likes);
      case 'bookmarked':
        return tours.filter(tour => tour.isBookmarked);
      default:
        return tours;
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-gray-900 mb-6">
            Tours <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-medium">Authentiques</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Découvrez des expériences uniques créées par notre communauté de voyageurs passionnés
          </p>
          
          {/* Filters */}
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="rounded-full"
            >
              Tous les tours
            </Button>
            <Button 
              variant={filter === 'recommended' ? 'default' : 'outline'}
              onClick={() => setFilter('recommended')}
              className="rounded-full"
            >
              <Star className="w-4 h-4 mr-2" />
              Recommandés
            </Button>
            <Button 
              variant={filter === 'popular' ? 'default' : 'outline'}
              onClick={() => setFilter('popular')}
              className="rounded-full"
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              Populaires
            </Button>
            <Button 
              variant={filter === 'bookmarked' ? 'default' : 'outline'}
              onClick={() => setFilter('bookmarked')}
              className="rounded-full"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Mes favoris
            </Button>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {getFilteredTours().map((tour) => (
            <Card key={tour.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/90 backdrop-blur-sm">
              <div className="relative overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleBookmark(tour.id)}
                    className={`bg-white/90 backdrop-blur-sm hover:bg-white ${
                      tour.isBookmarked ? 'text-purple-600' : 'text-gray-600'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${tour.isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                    {tour.duration}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{tour.location}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {tour.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {tour.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900">{tour.rating}</span>
                    <span className="text-sm text-gray-500">({tour.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(tour.id)}
                      className="p-1 hover:text-red-500"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-600">{tour.likes}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {tour.tags.slice(0, 2).map((tag) => (
                    <span 
                      key={tag}
                      className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">€{tour.price}</span>
                    <span className="text-sm text-gray-500 ml-1">/ pers</span>
                  </div>
                  <span className="text-xs text-gray-500">par {tour.createdBy}</span>
                </div>
                
                <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Ajouter au voyage
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full">
            Créer mon propre tour
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToursSection;
