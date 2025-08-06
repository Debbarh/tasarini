import { useState } from "react";
import { PlanTripStepsProps, PlanTripFormData } from "@/types/planTrip";
import { stepConfigs } from "@/constants/stepConfigs";
import DestinationStep from "./DestinationStep";
import TravelWithStep from "./TravelWithStep";
import UnifiedBudgetStep from "./UnifiedBudgetStep";
import CuisineStep from "./CuisineStep";
import UnifiedAccommodationStep from "./UnifiedAccommodationStep";
import UnifiedActivitiesStep from "./UnifiedActivitiesStep";
import DefaultStep from "./DefaultStep";
import UnifiedStepper from "./components/UnifiedStepper";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import HomeNavigation from "@/components/layout/HomeNavigation";

const PlanTripSteps = ({ onComplete, onBack, onModeSelect }: PlanTripStepsProps) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PlanTripFormData>({
    destination: { countries: [] },
    travelWith: { segment: '', subSegment: '' },
    cuisine: { cuisine: [] },
    budget: { budget: '' },
    accommodation: { type: '', preferences: [], services: [], criteria: [] },
    activities: []
  });

  const handleNext = () => {
    if (currentStep < stepConfigs.length - 1) {
      if (isStepValid()) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      if (isStepValid()) {
        const finalData = { ...formData, mode: 'plan' };
        onComplete(finalData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const isStepValid = () => {
    const step = stepConfigs[currentStep];
    switch (step.id) {
      case 'destination':
        return true;
      case 'travelWith':
        if (!formData.travelWith.segment) {
          toast({
            title: "Profil de voyage manquant",
            description: "Veuillez sélectionner votre profil de voyage.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'cuisine':
        if (formData.cuisine.cuisine.length === 0) {
          toast({
            title: "Préférences culinaires manquantes",
            description: "Veuillez sélectionner au moins une préférence culinaire.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'budget':
        if (!formData.budget.budget) {
          toast({
            title: "Budget manquant",
            description: "Veuillez indiquer votre budget pour le voyage.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'accommodation':
        if (!formData.accommodation.type) {
          toast({
            title: "Type d'hébergement manquant",
            description: "Veuillez sélectionner votre type d'hébergement préféré.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'activities':
        if (formData.activities.length === 0) {
          toast({
            title: "Activités manquantes",
            description: "Veuillez sélectionner au moins une activité qui vous intéresse.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    const step = stepConfigs[currentStep];
    
    switch (step.id) {
      case 'destination':
        return <DestinationStep formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 'travelWith':
        return <TravelWithStep formData={formData} setFormData={setFormData} />;
      case 'cuisine':
        return (
          <CuisineStep
            selectedCuisines={formData.cuisine.cuisine}
            onCuisineToggle={(cuisine) => {
              const newCuisines = formData.cuisine.cuisine.includes(cuisine)
                ? formData.cuisine.cuisine.filter(c => c !== cuisine)
                : [...formData.cuisine.cuisine, cuisine];
              setFormData({
                ...formData,
                cuisine: { cuisine: newCuisines }
              });
            }}
          />
        );
      case 'budget':
        return (
          <UnifiedBudgetStep
            mode="simple"
            budget={formData.budget.budget}
            setBudget={(budget) => setFormData({ 
              ...formData, 
              budget: { budget } 
            })}
          />
        );
      case 'accommodation':
        return (
          <UnifiedAccommodationStep
            mode="advanced"
            selectedAccommodation={formData.accommodation.type}
            onAccommodationChange={(type) => setFormData({ 
              ...formData, 
              accommodation: { ...formData.accommodation, type } 
            })}
            selectedPreferences={formData.accommodation.preferences}
            onPreferenceToggle={(preference) => {
              const newPreferences = formData.accommodation.preferences.includes(preference)
                ? formData.accommodation.preferences.filter(p => p !== preference)
                : [...formData.accommodation.preferences, preference];
              setFormData({
                ...formData,
                accommodation: { ...formData.accommodation, preferences: newPreferences }
              });
            }}
            selectedServices={formData.accommodation.services}
            onServiceToggle={(service) => {
              const newServices = formData.accommodation.services.includes(service)
                ? formData.accommodation.services.filter(s => s !== service)
                : [...formData.accommodation.services, service];
              setFormData({
                ...formData,
                accommodation: { ...formData.accommodation, services: newServices }
              });
            }}
            selectedCriteria={formData.accommodation.criteria}
            onCriteriaToggle={(criteria) => {
              const newCriteria = formData.accommodation.criteria.includes(criteria)
                ? formData.accommodation.criteria.filter(c => c !== criteria)
                : [...formData.accommodation.criteria, criteria];
              setFormData({
                ...formData,
                accommodation: { ...formData.accommodation, criteria: newCriteria }
              });
            }}
          />
        );
      case 'activities':
        return (
          <UnifiedActivitiesStep
            mode="advanced"
            selectedActivities={formData.activities}
            onActivitiesChange={(activities) => setFormData({ ...formData, activities })}
          />
        );
      default:
        return <DefaultStep />;
    }
  };

  const currentStepData = stepConfigs[currentStep];
  const isLastStep = currentStep === stepConfigs.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <HomeNavigation onModeSelect={onModeSelect} />
      
      <UnifiedStepper
        currentStep={currentStep}
        totalSteps={stepConfigs.length}
        stepConfig={currentStepData}
        onBack={handleBack}
        onNext={handleNext}
        onBackToHome={onBack}
        isLastStep={isLastStep}
        mode="plan"
      >
        {renderStepContent()}
      </UnifiedStepper>
    </div>
  );
};

export default PlanTripSteps;
