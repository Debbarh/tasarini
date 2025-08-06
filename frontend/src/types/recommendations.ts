export type ExperienceType = 'generated-tour' | 'simple-experience' | 'restaurant' | 'hotel' | 'activity' | 'event';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: ExperienceType;
  location: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  categories: {
    activities: string[];
    travelerType: string[];
    budget: 'economic' | 'standard' | 'premium' | 'luxury';
  };
  media: {
    photos: string[];
    videos?: string[];
  };
  rating: number;
  practicalTips: string[];
  authorId: string;
  authorName: string;
  createdAt: string;
  likes: number;
  saves: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  preferences: {
    activities: string[];
    budget: string;
    travelerType: string;
  };
  stats: {
    recommendationsSubmitted: number;
    totalLikes: number;
    totalSaves: number;
  };
  savedRecommendations: string[];
  submittedRecommendations: string[];
}

export interface RecommendationFilters {
  keywords?: string;
  location?: string;
  categories?: string[];
  type?: ExperienceType;
  budget?: string;
  minRating?: number;
}