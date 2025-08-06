import { StepProps } from "@/types/planTrip";
import { travelSegments } from "@/constants/stepConfigs";
import TravelDetailsForm from "./components/TravelDetailsForm";

const TravelWithStep = ({ formData, setFormData }: StepProps) => {
  const selectedSegment = formData.travelWith.segment;
  const selectedSubSegment = formData.travelWith.subSegment;
  const currentSegment = travelSegments.find(segment => segment.id === selectedSegment);

  const handleSegmentSelect = (segmentId: string) => {
    setFormData({
      ...formData,
      travelWith: { 
        segment: segmentId, 
        subSegment: '',
        details: {} 
      }
    });
  };

  const handleSubSegmentSelect = (subSegmentId: string) => {
    setFormData({
      ...formData,
      travelWith: { 
        ...formData.travelWith,
        subSegment: subSegmentId,
        details: formData.travelWith.details || {}
      }
    });
  };

  const handleDetailsChange = (details: any) => {
    setFormData({
      ...formData,
      travelWith: { 
        ...formData.travelWith,
        details 
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Sélection du segment principal */}
      <div className="space-y-6">
        {travelSegments.map((segment) => (
          <div key={segment.id} className="space-y-4">
            <button
              onClick={() => handleSegmentSelect(segment.id)}
              className={`group w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                selectedSegment === segment.id
                  ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md'
                  : 'border-gray-200 hover:border-pink-300 bg-white hover:bg-pink-50/30'
              }`}
            >
              <div className="flex items-center space-x-5">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {segment.emoji}
                </div>
                <div>
                  <div className="font-bold text-xl mb-1">{segment.name}</div>
                  <div className="text-base opacity-80">{segment.desc}</div>
                </div>
              </div>
            </button>

            {/* Sélection du sous-segment directement après le segment */}
            {selectedSegment === segment.id && segment.subSegments && (
              <div className="ml-8 space-y-3">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Précisez votre profil :
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {segment.subSegments.map((subSegment) => (
                    <button
                      key={subSegment.id}
                      onClick={() => handleSubSegmentSelect(subSegment.id)}
                      className={`group p-3 rounded-xl border-2 text-left transition-all duration-300 hover:scale-[1.02] ${
                        selectedSubSegment === subSegment.id
                          ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-sm'
                          : 'border-gray-200 hover:border-rose-300 bg-white hover:bg-rose-50/30'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-xl group-hover:scale-110 transition-transform duration-300">
                          {subSegment.emoji}
                        </div>
                        <div>
                          <div className="font-semibold text-sm mb-1">{subSegment.name}</div>
                          <div className="text-xs opacity-80">{subSegment.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Formulaire de détails selon le segment */}
      {selectedSegment === 'family' && (
        <TravelDetailsForm 
          subSegment="family"
          details={formData.travelWith.details || {}}
          onDetailsChange={handleDetailsChange}
        />
      )}

      {/* Formulaire de détails pour les autres segments avec sous-segments */}
      {selectedSubSegment && selectedSegment !== 'family' && (
        <TravelDetailsForm 
          subSegment={selectedSubSegment}
          details={formData.travelWith.details || {}}
          onDetailsChange={handleDetailsChange}
        />
      )}
    </div>
  );
};

export default TravelWithStep;
