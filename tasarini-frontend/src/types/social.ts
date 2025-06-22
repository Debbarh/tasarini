
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

export interface SharedItinerary {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  description: string;
  destinations: string[];
  duration: string;
  budget: string;
  sharedAt: string;
  likes: number;
  views: number;
  isPublic: boolean;
  tags: string[];
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  category: 'question' | 'conseil' | 'experience' | 'rencontre';
  destination?: string;
  createdAt: string;
  likes: number;
  replies: number;
  tags: string[];
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  postCount: number;
  lastActivity: string;
}
