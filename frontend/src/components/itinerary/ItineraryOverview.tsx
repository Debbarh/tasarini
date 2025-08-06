
import { Badge } from "@/components/ui/badge";
import { TripData, GeneratedItinerary } from "@/types/itinerary";

interface ItineraryOverviewProps {
  itinerary: GeneratedItinerary;
  data: TripData;
}

const ItineraryOverview = ({ itinerary, data }: ItineraryOverviewProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            Points forts de votre voyage
          </h3>
          <div className="space-y-3">
            {itinerary.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <span className="text-gray-800">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {'reasoning' in itinerary && itinerary.reasoning && (
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h4 className="text-lg font-bold text-gray-900 mb-3">
              Pourquoi cette destination ?
            </h4>
            <p className="text-gray-700 leading-relaxed">{itinerary.reasoning}</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-lg font-bold mb-4 text-gray-900">
            Votre profil voyageur
          </h3>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg border">
              <div className="font-semibold text-gray-700">Segment</div>
              <div className="text-gray-600">{data.travelerProfile?.segment}</div>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <div className="font-semibold text-gray-700">Style</div>
              <div className="text-gray-600">{data.preferences?.ambiance}</div>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <div className="font-semibold text-gray-700">Hébergement</div>
              <div className="text-gray-600">{data.preferences?.accommodation}</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-lg font-bold mb-4 text-gray-900">
            Vos expériences
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.preferences?.experiences?.map(exp => (
              <Badge 
                key={exp} 
                className="bg-purple-100 text-purple-800 border-purple-200"
              >
                {exp}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryOverview;
