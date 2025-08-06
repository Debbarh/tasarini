
export interface TripData {
  mode: 'plan';
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
