
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItineraryDisplayProps } from "@/types/itinerary";
import { generateSampleItinerary } from "@/utils/itineraryGenerator";
import ItineraryOverview from "@/components/itinerary/ItineraryOverview";
import DayCard from "@/components/itinerary/DayCard";
import AccommodationsTab from "@/components/itinerary/AccommodationsTab";
import ExperiencesTab from "@/components/itinerary/ExperiencesTab";
import PracticalInfoTab from "@/components/itinerary/PracticalInfoTab";
import UnifiedResultsLayout from "@/components/results/UnifiedResultsLayout";

const ItineraryDisplay = ({ data, onBack }: ItineraryDisplayProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [favorites, setFavorites] = useState<number[]>([]);

  const itinerary = generateSampleItinerary(data);

  const toggleFavorite = (dayIndex: number) => {
    setFavorites(prev => 
      prev.includes(dayIndex) 
        ? prev.filter(i => i !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  const mode = data.mode || 'plan';

  const headerActions = (
    <>
      <Button
        variant="ghost"
        size="lg"
        className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30"
      >
        Sauvegarder
      </Button>
      <Button
        size="lg"
        className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30"
      >
        Personnaliser
      </Button>
    </>
  );

  const title = itinerary.destinations.join(", ");
  const subtitle = `${itinerary.duration} • ${itinerary.budget} • Voyage planifié`;
  const backgroundImage = itinerary.days[0]?.image || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80";

  return (
    <UnifiedResultsLayout
      title={title}
      subtitle={subtitle}
      backgroundImage={backgroundImage}
      mode={mode}
      onBack={onBack}
      headerActions={headerActions}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-50 border-b">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-white data-[state=active]:text-purple-700 font-medium"
          >
            📋 Aperçu
          </TabsTrigger>
          <TabsTrigger 
            value="itinerary" 
            className="data-[state=active]:bg-white data-[state=active]:text-purple-700 font-medium"
          >
            🗓️ Programme
          </TabsTrigger>
          <TabsTrigger 
            value="practical" 
            className="data-[state=active]:bg-white data-[state=active]:text-purple-700 font-medium"
          >
            📚 Infos Pratiques
          </TabsTrigger>
          <TabsTrigger 
            value="accommodations" 
            className="data-[state=active]:bg-white data-[state=active]:text-purple-700 font-medium"
          >
            🏨 Hébergements
          </TabsTrigger>
          <TabsTrigger 
            value="experiences" 
            className="data-[state=active]:bg-white data-[state=active]:text-purple-700 font-medium"
          >
            ⭐ Expériences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="p-8">
          <ItineraryOverview itinerary={itinerary} data={data} />
        </TabsContent>

        <TabsContent value="itinerary" className="p-8">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Votre programme jour par jour
              </h3>
              <p className="text-lg text-gray-600">Découvrez votre itinéraire détaillé</p>
            </div>

            {itinerary.days.map((day, dayIndex) => (
              <DayCard
                key={day.day}
                day={day}
                dayIndex={dayIndex}
                isFavorite={favorites.includes(dayIndex)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practical" className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Informations Pratiques
            </h3>
            <p className="text-lg text-gray-600">Conseils et recommandations pour votre voyage</p>
          </div>
          <PracticalInfoTab />
        </TabsContent>

        <TabsContent value="accommodations" className="p-8">
          <AccommodationsTab />
        </TabsContent>

        <TabsContent value="experiences" className="p-8">
          <ExperiencesTab />
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="p-8 border-t bg-gray-50/50">
        <div className="flex justify-center gap-4">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white px-8 py-3"
          >
            Personnaliser cet itinéraire
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3"
          >
            Sauvegarder
          </Button>
        </div>
      </div>
    </UnifiedResultsLayout>
  );
};

export default ItineraryDisplay;
