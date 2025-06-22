
export interface AffiliateData {
  affiliateId: string;
  bookingUrl: string;
  commission: number;
  available: boolean;
  originalPrice: number;
  discountedPrice?: number;
  provider: 'booking' | 'viator' | 'getyourguide' | 'expedia' | 'airbnb' | 'opentable' | 'skyscanner' | 'hertz';
  providerName: string;
  rating?: number;
  reviews?: number;
  instantConfirmation?: boolean;
  freeCancellation?: boolean;
}

export interface BookingItem {
  id: string;
  type: 'transport' | 'accommodation' | 'restaurant' | 'activity';
  title: string;
  description: string;
  price: number;
  date?: string;
  time?: string;
  affiliate: AffiliateData;
  quantity: number;
}

export interface Cart {
  items: BookingItem[];
  totalPrice: number;
  currency: string;
}

export interface ConversionTracking {
  clickId: string;
  affiliateId: string;
  activityId: string;
  timestamp: Date;
  converted: boolean;
  commission?: number;
  conversionValue?: number;
}
