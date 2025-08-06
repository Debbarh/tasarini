export interface POI {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  category: string;
  rating: number;
  photos: string[];
  videos?: string[];
  reviews: Review[];
  practicalInfo: PracticalInfo;
  budget: 'economic' | 'standard' | 'premium' | 'luxury';
  duration: 'hours' | 'day' | 'weekend' | 'week';
  travelerSegment: string[];
  accommodationType?: string[];
  distance?: number; // Distance calculée dynamiquement
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PracticalInfo {
  openingHours: string;
  price: string;
  accessibility: string;
  website?: string;
  phone?: string;
  address: string;
}

export interface FilterOptions {
  activities: string[];
  travelerSegment: {
    type: 'solo' | 'couple' | 'family' | 'friends' | 'business';
    subType?: string;
    details?: {
      children?: Array<{ age: number }>;
      groupSize?: number;
    };
  };
  budget: 'economic' | 'standard' | 'premium' | 'luxury' | null;
  duration: 'hours' | 'day' | 'weekend' | 'week' | null;
  proximity: number; // in kilometers
  accommodationType: string[];
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}