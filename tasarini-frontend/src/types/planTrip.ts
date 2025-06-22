
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
    children?: Array<{ name: string; age: string }>;
    groupSize?: number;
  };
}

export interface BudgetAndFood {
  budget: string;
  cuisine: string[];
}

export interface Accommodation {
  type: string;
  preferences: string[];
}

export interface PlanTripFormData {
  destination: Destination;
  travelWith: TravelWith;
  budgetAndFood: BudgetAndFood;
  accommodation: Accommodation;
  activities: string[];
}

export interface PlanTripStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export interface StepProps {
  formData: PlanTripFormData;
  setFormData: (data: PlanTripFormData) => void;
}
