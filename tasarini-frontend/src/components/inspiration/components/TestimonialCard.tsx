
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Heart, MapPin, Calendar } from "lucide-react";
import { Testimonial } from "../data/testimonialsData";

interface TestimonialCardProps {
  testimonial: Testimonial;
  matchReason: string;
}

const TestimonialCard = ({ testimonial, matchReason }: TestimonialCardProps) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/70 backdrop-blur-sm border-0 overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-200"
            />
            <div>
              <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {testimonial.location}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center mb-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-xs text-gray-500 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {testimonial.date}
            </p>
          </div>
        </div>

        {/* Trip Info */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-purple-800">{testimonial.trip}</p>
              <p className="text-sm text-purple-600">{matchReason}</p>
            </div>
            <Heart className="w-5 h-5 text-pink-500" />
          </div>
        </div>

        {/* Quote */}
        <div className="relative mb-4">
          <Quote className="w-8 h-8 text-purple-300 mb-2" />
          <p className="text-gray-700 italic leading-relaxed">
            "{testimonial.testimonial}"
          </p>
        </div>

        {/* Highlight */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
          <p className="text-sm font-medium text-green-800">
            ✨ {testimonial.highlight}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
