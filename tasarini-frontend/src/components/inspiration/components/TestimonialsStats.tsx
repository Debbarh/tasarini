
import { Star } from "lucide-react";

const TestimonialsStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      <div className="text-center">
        <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
        <div className="text-gray-600">Note moyenne</div>
        <div className="flex justify-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">15k+</div>
        <div className="text-gray-600">Voyageurs inspirés</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
        <div className="text-gray-600">Recommandent</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-pink-600 mb-2">150+</div>
        <div className="text-gray-600">Destinations</div>
      </div>
    </div>
  );
};

export default TestimonialsStats;
