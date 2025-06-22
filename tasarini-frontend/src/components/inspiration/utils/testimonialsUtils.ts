
import { Testimonial, testimonialsData } from "../data/testimonialsData";

interface FormData {
  activities: string[];
  travelWith: string;
  budget: string;
  accommodation: string;
  mode: string;
}

export const getRelevantTestimonials = (formData: FormData): Testimonial[] => {
  // Parse budget data
  let budgetInfo = { budget: '', period: '' };
  try {
    if (formData.budget) {
      budgetInfo = JSON.parse(formData.budget);
    }
  } catch {
    budgetInfo = { budget: formData.budget, period: '' };
  }

  // Filter testimonials based on user profile
  return testimonialsData
    .filter(testimonial => {
      // Match by travel companion
      if (formData.travelWith && testimonial.categories.includes(formData.travelWith)) {
        return true;
      }
      
      // Match by activities
      const hasMatchingActivity = formData.activities.some(activity => 
        testimonial.categories.includes(activity)
      );
      
      // Match by budget
      const budgetMatch = budgetInfo.budget === testimonial.budget;
      
      return hasMatchingActivity || budgetMatch;
    })
    .slice(0, 6); // Limit to 6 testimonials
};

export const getMatchReason = (testimonial: Testimonial, formData: FormData): string => {
  const reasons = [];
  
  if (formData.travelWith && testimonial.categories.includes(formData.travelWith)) {
    reasons.push('Même type de voyage');
  }
  
  const matchingActivities = formData.activities.filter(activity => 
    testimonial.categories.includes(activity)
  );
  if (matchingActivities.length > 0) {
    reasons.push('Mêmes passions');
  }
  
  let budgetInfo = { budget: '', period: '' };
  try {
    if (formData.budget) {
      budgetInfo = JSON.parse(formData.budget);
    }
  } catch {
    budgetInfo = { budget: formData.budget, period: '' };
  }
  
  if (budgetInfo.budget === testimonial.budget) {
    reasons.push('Budget similaire');
  }
  
  return reasons.join(' • ') || 'Profil compatible';
};
