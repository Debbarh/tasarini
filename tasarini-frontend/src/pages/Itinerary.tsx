
import ItineraryDisplay from "@/components/ItineraryDisplay";

const Itinerary = () => {
  // Données d'exemple pour afficher l'itinéraire
  const sampleData = {
    mode: 'inspire' as const,
    inspiration: {
      budget: 'medium',
      duration: '7-days',
      season: 'spring',
      interests: 'culture-history'
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ItineraryDisplay data={sampleData} onBack={handleBack} />
    </div>
  );
};

export default Itinerary;
