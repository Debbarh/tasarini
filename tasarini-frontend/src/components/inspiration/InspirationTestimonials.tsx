
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import TestimonialsStats from "./components/TestimonialsStats";
import TestimonialsGrid from "./components/TestimonialsGrid";
import { getRelevantTestimonials, getMatchReason } from "./utils/testimonialsUtils";

interface FormData {
  activities: string[];
  travelWith: string;
  budget: string;
  accommodation: string;
  mode: string;
}

interface InspirationTestimonialsProps {
  formData: FormData;
}

const InspirationTestimonials = ({ formData }: InspirationTestimonialsProps) => {
  const relevantTestimonials = getRelevantTestimonials(formData);

  const handleGetMatchReason = (testimonial: any) => {
    return getMatchReason(testimonial, formData);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ils Ont Vécu l'Expérience
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez les témoignages de voyageurs qui partagent vos passions
        </p>
      </div>

      {/* Stats Section */}
      <TestimonialsStats />

      {/* Testimonials Grid */}
      <TestimonialsGrid 
        testimonials={relevantTestimonials}
        getMatchReason={handleGetMatchReason}
      />

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl">
        <CardContent className="p-8 text-center">
          <Star className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-2xl font-bold mb-4">Prêt à Vivre Votre Propre Aventure ?</h3>
          <p className="text-lg opacity-90 mb-6">
            Rejoignez des milliers de voyageurs qui ont transformé leurs rêves en souvenirs inoubliables
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-sm">
              💫 <strong>Promesse :</strong> Votre voyage sera aussi unique que vous l'êtes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InspirationTestimonials;
