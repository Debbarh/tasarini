
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Check, Clock, Shield } from "lucide-react";
import { Activity } from "@/types/itinerary";

interface BookingWidgetProps {
  activity: Activity;
  onBooking: (activityId: string, affiliateId: string) => void;
}

const BookingWidget = ({ activity, onBooking }: BookingWidgetProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!activity.affiliate) return null;

  const handleBookNow = async () => {
    setIsLoading(true);
    
    // Tracking de l'affiliation
    const clickId = `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Enregistrer le clic pour le tracking
    console.log('Affiliate click tracked:', {
      clickId,
      affiliateId: activity.affiliate.affiliateId,
      activityId: activity.activity,
      timestamp: new Date(),
    });

    // Appeler le callback
    onBooking(activity.activity, activity.affiliate.affiliateId);

    // Rediriger vers le lien d'affiliation avec tracking
    const trackingUrl = `${activity.affiliate.bookingUrl}?ref=${activity.affiliate.affiliateId}&click_id=${clickId}`;
    window.open(trackingUrl, '_blank');
    
    setIsLoading(false);
  };

  const { affiliate } = activity;
  const hasDiscount = affiliate.discountedPrice && affiliate.discountedPrice < affiliate.originalPrice;

  return (
    <Card className="mt-4 border-green-200 bg-green-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-green-800">
            🎫 Réserver maintenant
          </CardTitle>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            {affiliate.providerName}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-bold text-green-600">
                    {affiliate.discountedPrice}€
                  </span>
                  <span className="text-lg line-through text-gray-500">
                    {affiliate.originalPrice}€
                  </span>
                  <Badge className="bg-red-100 text-red-700">
                    -{Math.round(((affiliate.originalPrice - affiliate.discountedPrice!) / affiliate.originalPrice) * 100)}%
                  </Badge>
                </>
              ) : (
                <span className="text-2xl font-bold text-green-600">
                  {affiliate.originalPrice}€
                </span>
              )}
            </div>
            
            {affiliate.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{affiliate.rating}</span>
                {affiliate.reviews && (
                  <span className="text-sm text-gray-600">({affiliate.reviews} avis)</span>
                )}
              </div>
            )}
          </div>

          <Button 
            onClick={handleBookNow}
            disabled={!affiliate.available || isLoading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
          >
            {isLoading ? 'Redirection...' : 'Réserver'}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {affiliate.instantConfirmation && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <Check className="w-4 h-4" />
              Confirmation immédiate
            </div>
          )}
          {affiliate.freeCancellation && (
            <div className="flex items-center gap-1 text-sm text-blue-600">
              <Shield className="w-4 h-4" />
              Annulation gratuite
            </div>
          )}
          {!affiliate.available && (
            <div className="flex items-center gap-1 text-sm text-red-600">
              <Clock className="w-4 h-4" />
              Non disponible
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingWidget;
