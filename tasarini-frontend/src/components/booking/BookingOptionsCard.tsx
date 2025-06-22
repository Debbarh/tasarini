
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Car, Bed, Utensils } from "lucide-react";
import { BookingOption } from "@/types/itinerary";

interface BookingOptionsCardProps {
  type: 'transport' | 'accommodation' | 'restaurant';
  options: BookingOption[];
  onBooking: (optionId: string, affiliateId: string) => void;
}

const typeConfig = {
  transport: { icon: Car, title: 'Transport', emoji: '🚗' },
  accommodation: { icon: Bed, title: 'Hébergement', emoji: '🏨' },
  restaurant: { icon: Utensils, title: 'Restaurant', emoji: '🍽️' }
};

const BookingOptionsCard = ({ type, options, onBooking }: BookingOptionsCardProps) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  if (!options || options.length === 0) return null;

  const handleBooking = (option: BookingOption) => {
    const clickId = `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const trackingUrl = `${option.bookingUrl}?ref=${option.affiliate.affiliateId}&click_id=${clickId}`;
    
    console.log('Booking option clicked:', {
      clickId,
      affiliateId: option.affiliate.affiliateId,
      optionId: option.id,
      type,
      timestamp: new Date(),
    });

    onBooking(option.id, option.affiliate.affiliateId);
    window.open(trackingUrl, '_blank');
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          {config.emoji} {config.title} recommandé
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {options.slice(0, 3).map((option) => (
          <div key={option.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-900">{option.title}</h4>
                <Badge variant="outline">{option.provider}</Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{option.rating}</span>
                </div>
                <span className="font-semibold text-purple-600">{option.price}€</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {option.features.slice(0, 3).map((feature, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => handleBooking(option)}
              variant="outline" 
              className="ml-4 border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Voir l'offre
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BookingOptionsCard;
