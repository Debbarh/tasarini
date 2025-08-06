export type CommercialPOIType = 'restaurant' | 'accommodation' | 'experience' | 'activity' | 'workshop' | 'tour' | 'service';

export interface CommercialPOI {
  id: string;
  title: string;
  description: string;
  type: CommercialPOIType;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  pricing: {
    basePrice: number;
    currency: string;
    priceType: 'per_person' | 'per_group' | 'per_night' | 'per_hour' | 'fixed';
    packages?: PricingPackage[];
  };
  availability: {
    schedule: WeeklySchedule;
    capacity: number;
    advanceBooking: number; // days
    seasonality?: {
      openMonths: number[];
      closedPeriods?: { start: string; end: string }[];
    };
  };
  media: {
    photos: string[];
    videos?: string[];
    virtualTour?: string;
  };
  amenities: string[];
  categories: string[];
  languages: string[];
  businessInfo: {
    ownerName: string;
    businessName: string;
    email: string;
    phone: string;
    website?: string;
    socialMedia?: {
      instagram?: string;
      facebook?: string;
      tripadvisor?: string;
    };
  };
  policies: {
    cancellation: string;
    payment: string[];
    ageRestrictions?: string;
    groupSize?: { min: number; max: number };
  };
  seo: {
    keywords: string[];
    highlights: string[];
  };
  status: 'draft' | 'pending' | 'approved' | 'suspended';
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: string;
  includes: string[];
  maxParticipants?: number;
}

export interface WeeklySchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  timeSlots?: { start: string; end: string }[];
}