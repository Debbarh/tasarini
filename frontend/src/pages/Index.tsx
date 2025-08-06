import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PlanTripSteps from "@/components/forms/plan-trip/steps/PlanTripSteps";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import HomeScreen from "@/components/home/HomeScreen";
import BeInspiredMain from "@/components/forms/be-inspired/BeInspiredMain";
import ExperienceMain from "@/components/forms/experience/ExperienceMain";
import ProfileMain from "@/components/forms/profile/ProfileMain";

type Mode = 'home' | 'plan' | 'itinerary' | 'be-inspired' | 'recommendations' | 'profile';

interface PlanTripFormData {
  mode: 'plan';
  [key: string]: any;
}

const Index = () => {
  const [mode, setMode] = useState<Mode>('home');
  const [tripData, setTripData] = useState<PlanTripFormData | null>(null);
  const [searchParams] = useSearchParams();

  const createInitialTripData = (): PlanTripFormData => ({
    mode: 'plan'
  });

  // Handle URL params for mode selection
  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'plan') {
      setMode('plan');
      setTripData(createInitialTripData());
    } else if (modeParam === 'be-inspired') {
      setMode('be-inspired');
    }
  }, [searchParams]);

  const handleModeSelect = (selectedMode: 'plan' | 'be-inspired' | 'recommendations' | 'profile') => {
    setMode(selectedMode);
    if (selectedMode === 'plan') {
      setTripData(createInitialTripData());
    }
  };

  const handleFormComplete = (data: PlanTripFormData) => {
    setTripData(data);
    setMode('itinerary');
  };

  const handleBackToHome = () => {
    setMode('home');
    setTripData(null);
  };

  const renderContent = () => {
    switch (mode) {
      case 'itinerary':
        return tripData ? (
          <ItineraryDisplay 
            data={tripData} 
            onBack={handleBackToHome} 
          />
        ) : null;
      case 'plan':
        return (
          <PlanTripSteps 
            onComplete={handleFormComplete} 
            onBack={handleBackToHome}
            onModeSelect={handleModeSelect}
          />
        );
      case 'be-inspired':
        return (
          <BeInspiredMain 
            onBack={handleBackToHome}
            onModeSelect={handleModeSelect}
          />
        );
      case 'recommendations':
        return (
          <ExperienceMain 
            onBack={handleBackToHome}
            onModeSelect={handleModeSelect}
          />
        );
      case 'profile':
        return (
          <ProfileMain 
            onBack={handleBackToHome}
            onModeSelect={handleModeSelect}
          />
        );
      case 'home':
      default:
        return <HomeScreen onModeSelect={handleModeSelect} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderContent()}
    </div>
  );
};

export default Index;
