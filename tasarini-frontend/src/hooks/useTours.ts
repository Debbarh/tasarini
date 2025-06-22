
import { useState, useCallback } from 'react';

export interface Tour {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  duration: string;
  rating: number;
  reviewCount: number;
  price: number;
  isBookmarked: boolean;
  likes: number;
  createdBy: string;
  tags: string[];
  isRecommended?: boolean;
}

export const useTours = (initialTours: Tour[]) => {
  const [tours, setTours] = useState<Tour[]>(initialTours);

  const toggleBookmark = useCallback((tourId: string) => {
    setTours(prevTours =>
      prevTours.map(tour =>
        tour.id === tourId
          ? { ...tour, isBookmarked: !tour.isBookmarked }
          : tour
      )
    );
  }, []);

  const likeTour = useCallback((tourId: string) => {
    setTours(prevTours =>
      prevTours.map(tour =>
        tour.id === tourId
          ? { ...tour, likes: tour.likes + 1 }
          : tour
      )
    );
  }, []);

  const rateTour = useCallback((tourId: string, newRating: number) => {
    setTours(prevTours =>
      prevTours.map(tour =>
        tour.id === tourId
          ? { 
              ...tour, 
              rating: ((tour.rating * tour.reviewCount) + newRating) / (tour.reviewCount + 1),
              reviewCount: tour.reviewCount + 1
            }
          : tour
      )
    );
  }, []);

  const getRecommendedTours = useCallback(() => {
    return tours
      .filter(tour => tour.rating >= 4.7)
      .sort((a, b) => b.rating - a.rating);
  }, [tours]);

  const getPopularTours = useCallback(() => {
    return tours.sort((a, b) => b.likes - a.likes);
  }, [tours]);

  const getBookmarkedTours = useCallback(() => {
    return tours.filter(tour => tour.isBookmarked);
  }, [tours]);

  return {
    tours,
    toggleBookmark,
    likeTour,
    rateTour,
    getRecommendedTours,
    getPopularTours,
    getBookmarkedTours
  };
};
