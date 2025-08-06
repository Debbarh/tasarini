import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, MapPin, Clock, DollarSign, Phone, Globe, Heart, Plus } from 'lucide-react';
import { POI } from '@/types/beInspired';
import { activityCategories, budgetOptions, durationOptions } from '@/constants/beInspiredData';

interface POIDetailModalProps {
  poi: POI;
  onClose: () => void;
  onSave: (poi: POI) => void;
  onAddToTrip: (poi: POI) => void;
}

const POIDetailModal = ({ poi, onClose, onSave, onAddToTrip }: POIDetailModalProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const categoryData = activityCategories.find(cat => cat.id === poi.category);
  const budgetData = budgetOptions.find(budget => budget.id === poi.budget);
  const durationData = durationOptions.find(duration => duration.id === poi.duration);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(poi);
  };

  const handleAddToTrip = () => {
    onAddToTrip(poi);
    onClose();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <span className="text-2xl">{categoryData?.emoji}</span>
            {poi.name}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Image principale */}
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={poi.photos[0] || '/placeholder.svg'} 
                alt={poi.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Informations principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Colonne gauche */}
              <div className="space-y-4">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{poi.description}</p>
                </div>

                {/* Évaluation */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Évaluation</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(poi.rating)}</div>
                    <span className="font-semibold">{poi.rating}</span>
                    <span className="text-gray-500">({poi.reviews.length} avis)</span>
                  </div>
                </div>

                {/* Caractéristiques */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Caractéristiques</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{categoryData?.emoji}</span>
                      <span className="text-sm">{categoryData?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm capitalize">{budgetData?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{durationData?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span className="text-sm">Proche de vous</span>
                    </div>
                  </div>
                </div>

                {/* Segments de voyageurs */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Adapté pour</h3>
                  <div className="flex flex-wrap gap-2">
                    {poi.travelerSegment.map((segment) => (
                      <Badge key={segment} variant="secondary" className="capitalize">
                        {segment}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colonne droite */}
              <div className="space-y-4">
                {/* Informations pratiques */}
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Informations pratiques</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Horaires</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{poi.practicalInfo.openingHours}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Prix</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{poi.practicalInfo.price}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span className="font-medium">Adresse</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{poi.practicalInfo.address}</p>
                    </div>

                    {poi.practicalInfo.phone && (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Phone className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">Téléphone</span>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">{poi.practicalInfo.phone}</p>
                      </div>
                    )}

                    {poi.practicalInfo.website && (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Globe className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">Site web</span>
                        </div>
                        <a 
                          href={`https://${poi.practicalInfo.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline ml-6"
                        >
                          {poi.practicalInfo.website}
                        </a>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-4 h-4 text-center">♿</span>
                        <span className="font-medium">Accessibilité</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{poi.practicalInfo.accessibility}</p>
                    </div>
                  </div>
                </Card>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={handleSave}
                    variant={isSaved ? "default" : "outline"}
                    className="flex items-center gap-2"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    {isSaved ? 'Sauvegardé' : 'Sauvegarder'}
                  </Button>
                  
                  <Button 
                    onClick={handleAddToTrip}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter à mon voyage
                  </Button>
                </div>
              </div>
            </div>

            {/* Avis */}
            {poi.reviews.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-4">Avis des visiteurs</h3>
                  <div className="space-y-4">
                    {poi.reviews.map((review) => (
                      <Card key={review.id} className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {review.userName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{review.userName}</div>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <div className="ml-auto text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default POIDetailModal;