
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InspirationDestinations from "./InspirationDestinations";
import InspirationExperiences from "./InspirationExperiences";
import InspirationTestimonials from "./InspirationTestimonials";
import UnifiedResultsLayout from "@/components/results/UnifiedResultsLayout";

interface FormData {
  activities: string[];
  travelWith: string;
  budget: string;
  accommodation: string;
  mode: string;
}

interface InspirationLandingPageProps {
  formData: FormData;
  onBack: () => void;
  onCreateItinerary: (destinationOrExperience: any) => void;
}

const InspirationLandingPage = ({ formData, onBack, onCreateItinerary }: InspirationLandingPageProps) => {
  const [activeTab, setActiveTab] = useState("destinations");

  const headerActions = (
    <>
      <Button
        variant="ghost"
        size="lg"
        className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300 shadow-lg"
      >
        Sauvegarder mes inspirations
      </Button>
      <Button
        size="lg"
        className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30 transition-all duration-300 shadow-lg"
      >
        Partager
      </Button>
    </>
  );

  return (
    <UnifiedResultsLayout
      title="Vos Inspirations de Voyage"
      subtitle="Découvrez des destinations uniques et des expériences authentiques sélectionnées pour vous"
      backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
      mode="inspire"
      onBack={onBack}
      headerActions={headerActions}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-50 border-b mb-8">
          <TabsTrigger 
            value="destinations" 
            className="data-[state=active]:bg-white data-[state=active]:text-orange-600 font-medium px-6 py-3 transition-all duration-300"
          >
            🏛️ Destinations
          </TabsTrigger>
          <TabsTrigger 
            value="experiences" 
            className="data-[state=active]:bg-white data-[state=active]:text-orange-600 font-medium px-6 py-3 transition-all duration-300"
          >
            ✨ Expériences
          </TabsTrigger>
          <TabsTrigger 
            value="testimonials" 
            className="data-[state=active]:bg-white data-[state=active]:text-orange-600 font-medium px-6 py-3 transition-all duration-300"
          >
            💬 Témoignages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="destinations" className="p-8">
          <InspirationDestinations 
            formData={formData}
            onCreateItinerary={onCreateItinerary}
          />
        </TabsContent>

        <TabsContent value="experiences" className="p-8">
          <InspirationExperiences 
            formData={formData}
            onCreateItinerary={onCreateItinerary}
          />
        </TabsContent>

        <TabsContent value="testimonials" className="p-8">
          <InspirationTestimonials formData={formData} />
        </TabsContent>
      </Tabs>
    </UnifiedResultsLayout>
  );
};

export default InspirationLandingPage;
