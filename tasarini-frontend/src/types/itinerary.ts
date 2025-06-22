export interface TripData {
  mode: 'plan' | 'inspire';
  countries?: string[];
  cities?: { [country: string]: string[] };
  dates?: { [city: string]: { start: string; end: string } };
  travelerProfile?: {
    segment: string;
    subSegment: string;
    groupComposition: string;
  };
  preferences?: {
    accommodation: string;
    ambiance: string;
    gastronomy: string[];
    experiences: string[];
  };
  inspiration?: {
    budget: string;
    duration: string;
    season: string;
    interests: string;
  };
}

export interface ItineraryDisplayProps {
  data: TripData;
  onBack: () => void;
}

export interface Activity {
  time: string;
  activity: string;
  type: string;
  description: string;
  price: string;
  rating: number;
  // Nouveaux champs pour l'affiliation
  affiliate?: {
    affiliateId: string;
    bookingUrl: string;
    commission: number;
    available: boolean;
    originalPrice: number;
    discountedPrice?: number;
    provider: string;
    providerName: string;
    rating?: number;
    reviews?: number;
    instantConfirmation?: boolean;
    freeCancellation?: boolean;
  };
  bookingOptions?: {
    transport?: BookingOption[];
    accommodation?: BookingOption[];
    restaurant?: BookingOption[];
  };
}

export interface BookingOption {
  id: string;
  title: string;
  price: number;
  provider: string;
  rating: number;
  features: string[];
  bookingUrl: string;
  affiliate: AffiliateData;
}

export interface DayItinerary {
  day: number;
  city: string;
  title: string;
  weather: { icon: any; temp: string };
  image: string;
  activities: Activity[];
}

export interface GeneratedItinerary {
  title: string;
  destinations: string[];
  duration: string;
  overview: string;
  reasoning?: string;
  budget: string;
  bestTime: string;
  highlights: string[];
  weather: { icon: any; temp: string; condition: string };
  days: DayItinerary[];
}

import { AffiliateData } from "./affiliate";
