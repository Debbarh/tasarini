import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Euro, Star, Edit, Trash2, Eye } from 'lucide-react';
import { CommercialPOI } from '@/types/commercialPOI';

interface POIListProps {
  pois: CommercialPOI[];
  onEdit: (poi: CommercialPOI) => void;
  onDelete: (poiId: string) => void;
}

const getTypeLabel = (type: string) => {
  const labels = {
    restaurant: 'Restaurant',
    accommodation: 'Hébergement',
    experience: 'Expérience',
    activity: 'Activité',
    workshop: 'Atelier',
    tour: 'Tour',
    service: 'Service'
  };
  return labels[type as keyof typeof labels] || type;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-700 border-green-200';
    case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'draft': return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'suspended': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStatusLabel = (status: string) => {
  const labels = {
    approved: 'Approuvé',
    pending: 'En attente',
    draft: 'Brouillon',
    suspended: 'Suspendu'
  };
  return labels[status as keyof typeof labels] || status;
};

const POIList = ({ pois, onEdit, onDelete }: POIListProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pois.map((poi) => (
        <Card key={poi.id} className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <CardHeader className="p-0">
            <div className="relative">
              <img
                src={poi.media.photos[0] || '/placeholder.svg'}
                alt={poi.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 right-3">
                <Badge className={`${getStatusColor(poi.status)} border`}>
                  {getStatusLabel(poi.status)}
                </Badge>
              </div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
                  {getTypeLabel(poi.type)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-xl text-gray-800 line-clamp-1 group-hover:text-purple-600 transition-colors">
                  {poi.title}
                </h3>
                <div className="flex items-center gap-1 text-gray-500 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm line-clamp-1">{poi.location.address}</span>
                </div>
              </div>

              <p className="text-gray-600 line-clamp-2 leading-relaxed">
                {poi.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-700">
                    À partir de {poi.pricing.basePrice}€
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {poi.categories.slice(0, 3).map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                    {category}
                  </Badge>
                ))}
                {poi.categories.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{poi.categories.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Eye className="h-3 w-3" />
                  Voir
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 hover:bg-purple-50 hover:border-purple-300"
                    onClick={() => onEdit(poi)}
                  >
                    <Edit className="h-3 w-3" />
                    Modifier
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 hover:bg-red-50 hover:border-red-300 text-red-600"
                    onClick={() => onDelete(poi.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default POIList;