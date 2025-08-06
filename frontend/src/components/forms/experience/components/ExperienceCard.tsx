import { Heart, Bookmark, MapPin, Star, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Recommendation } from '@/types/recommendations';

interface ExperienceCardProps {
  recommendation: Recommendation;
  onSave?: (id: string) => void;
  onLike?: (id: string) => void;
  onClick?: (recommendation: Recommendation) => void;
}

const ExperienceCard = ({ recommendation, onSave, onLike, onClick }: ExperienceCardProps) => {
  const handleCardClick = () => {
    onClick?.(recommendation);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave?.(recommendation.id);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(recommendation.id);
  };

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/80 backdrop-blur-sm border border-white/30 hover:bg-white/95 hover:scale-105"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={recommendation.media.photos[0] || '/placeholder.svg'}
            alt={recommendation.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 bg-white/90 hover:bg-white border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleSave}
            >
              <Bookmark className="h-4 w-4 text-gray-600" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 bg-white/90 hover:bg-white border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleLike}
            >
              <Heart className="h-4 w-4 text-red-500" />
            </Button>
          </div>
          <Badge className="absolute bottom-3 left-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-lg">
            {recommendation.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-xl line-clamp-1 group-hover:text-purple-600 transition-colors duration-300">
              {recommendation.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{recommendation.location.address}</span>
            </div>
          </div>

          <p className="text-gray-600 line-clamp-2 leading-relaxed">
            {recommendation.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {recommendation.categories.activities.slice(0, 3).map((activity) => (
              <Badge key={activity} variant="secondary" className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200">
                {activity}
              </Badge>
            ))}
            {recommendation.categories.activities.length > 3 && (
              <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                +{recommendation.categories.activities.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-800">{recommendation.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Heart className="h-4 w-4" />
                <span className="text-sm">{recommendation.likes}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-gray-500">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{recommendation.authorName}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;