
import { useState } from "react";
import { PlanTripStepsProps, PlanTripFormData } from "@/types/planTrip";
import { stepConfigs } from "@/constants/planTripSteps";
import DestinationStep from "./PlanTrip/steps/DestinationStep";
import TravelWithStep from "./steps/TravelWithStep";
import BudgetAndFoodStep from "./PlanTrip/steps/BudgetAndFoodStep";
import AccommodationStep from "./PlanTrip/steps/AccommodationStep";
import ActivitiesStep from "./PlanTrip/steps/ActivitiesStep";
import DefaultStep from "./steps/DefaultStep";
import UnifiedStepper from "./components/UnifiedStepper";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

const PlanTripSteps = ({ onComplete, onBack }: PlanTripStepsProps) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PlanTripFormData>({
    destination: { countries: [] },
    travelWith: { segment: '', subSegment: '' },
    budgetAndFood: { budget: '', cuisine: [] },
    accommodation: { type: '', preferences: [] },
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
      case 'budgetAndFood':
        if (!formData.budgetAndFood.budget) {
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
      case 'budgetAndFood':
        return <BudgetAndFoodStep formData={formData} setFormData={setFormData} />;
      case 'accommodation':
        return <AccommodationStep formData={formData} setFormData={setFormData} />;
      case 'activities':
        return <ActivitiesStep formData={formData} setFormData={setFormData} />;
      default:
        return <DefaultStep />;
    }
  };

  const currentStepData = stepConfigs[currentStep];
  const isLastStep = currentStep === stepConfigs.length - 1;

  return (
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
  );
};

export default PlanTripSteps;
