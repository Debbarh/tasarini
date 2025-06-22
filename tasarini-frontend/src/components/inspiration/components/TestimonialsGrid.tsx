
import { Heart } from "lucide-react";
import { Testimonial } from "../data/testimonialsData";
import TestimonialCard from "./TestimonialCard";

interface TestimonialsGridProps {
  testimonials: Testimonial[];
  getMatchReason: (testimonial: Testimonial) => string;
}

const TestimonialsGrid = ({ testimonials, getMatchReason }: TestimonialsGridProps) => {
  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Soyez parmi les premiers !
        </h3>
        <p className="text-gray-600">
          Votre profil est unique. Créez votre voyage et inspirez les futurs voyageurs !
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          matchReason={getMatchReason(testimonial)}
        />
      ))}
    </div>
  );
};

export default TestimonialsGrid;
