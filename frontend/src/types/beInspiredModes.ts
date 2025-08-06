export type BeInspiredMode = 'local' | 'world';

export interface WorldDiscoveryPreferences {
  activities: string[];
  budget: 'budget' | 'mid-range' | 'luxury';
  duration: number; // en jours
  climate: 'tropical' | 'temperate' | 'cold' | 'desert';
  travelerSegment: {
    type: 'solo' | 'couple' | 'family' | 'friends' | 'business';
  };
  accommodationType: string[];
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
}

export interface DestinationSuggestion {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  score: number;
  highlights: string[];
  matchingActivities: string[];
  suggestedDuration: number;
  averageBudget: {
    budget: number;
    'mid-range': number;
    luxury: number;
  };
  bestSeason: string[];
  latitude: number;
  longitude: number;
}

export interface GeneratedProgram {
  destination: DestinationSuggestion;
  days: ProgramDay[];
  totalBudget: number;
  recommendations: string[];
}

export interface ProgramDay {
  day: number;
  date: string;
  theme: string;
  activities: ProgramActivity[];
  accommodation?: string;
  meals: string[];
}

export interface ProgramActivity {
  id: string;
  name: string;
  type: string;
  duration: string;
  description: string;
  cost?: number;
  location: string;
  tips?: string[];
}