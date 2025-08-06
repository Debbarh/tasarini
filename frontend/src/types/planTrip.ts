
export interface CityWithDates {
  cityName: string;
  startDate: string;
  endDate: string;
}

export interface CountryWithCities {
  countryName: string;
  cities: CityWithDates[];
}

export interface Destination {
  countries: CountryWithCities[];
}

export interface TravelWith {
  segment: string;
  subSegment: string;
  details?: {
    children?: Array<{ age: string }>;
    groupSize?: number;
  };
}

export interface Budget {
  budget: string;
}

export interface Cuisine {
  cuisine: string[];
}

export interface Accommodation {
  type: string;
  preferences: string[];
  services: string[];
  criteria: string[];
}

export interface PlanTripFormData {
  destination: Destination;
  travelWith: TravelWith;
  cuisine: Cuisine;
  budget: Budget;
  accommodation: Accommodation;
  activities: string[];
}

export interface PlanTripStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
  onModeSelect?: (mode: 'plan' | 'be-inspired' | 'recommendations' | 'profile') => void;
}

export interface StepProps {
  formData: PlanTripFormData;
  setFormData: (data: PlanTripFormData) => void;
  onNext?: () => void;
}
