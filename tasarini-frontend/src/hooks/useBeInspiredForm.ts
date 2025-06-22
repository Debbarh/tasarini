
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { beInspiredStepConfigs } from "@/constants/beInspiredSteps";

interface FormData {
  activities: string[];
  travelWith: string;
  budget: string;
  accommodation: string;
}

export const useBeInspiredForm = (onComplete: (data: any) => void) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    activities: [],
    travelWith: '',
    budget: '',
    accommodation: ''
  });

  const isStepValid = () => {
    const step = beInspiredStepConfigs[currentStep];
    switch (step.id) {
      case 'activities':
        if (formData.activities.length === 0) {
          toast({
            title: "Activités manquantes",
            description: "Veuillez sélectionner au moins une activité qui vous passionne.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'travelWith':
        if (!formData.travelWith) {
          toast({
            title: "Compagnons de voyage manquants",
            description: "Veuillez indiquer avec qui vous voulez voyager.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'budget':
        if (!formData.budget) {
          toast({
            title: "Budget et période manquants",
            description: "Veuillez sélectionner votre budget et la durée de votre voyage.",
            variant: "destructive"
          });
          return false;
        }
        try {
          const budgetData = JSON.parse(formData.budget);
          if (!budgetData.budget || !budgetData.period) {
            toast({
              title: "Informations incomplètes",
              description: "Veuillez sélectionner à la fois votre budget et la durée de voyage.",
              variant: "destructive"
            });
            return false;
          }
        } catch {
          toast({
            title: "Budget et période manquants",
            description: "Veuillez sélectionner votre budget et la durée de votre voyage.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'accommodation':
        if (!formData.accommodation) {
          toast({
            title: "Hébergement manquant",
            description: "Veuillez choisir votre type d'hébergement préféré.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < beInspiredStepConfigs.length - 1) {
      if (isStepValid()) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      if (isStepValid()) {
        const finalData = { ...formData, mode: 'inspire' };
        onComplete(finalData);
      }
    }
  };

  const handleBack = (onBackToHome: () => void) => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBackToHome();
    }
  };

  return {
    currentStep,
    formData,
    setFormData,
    handleNext,
    handleBack,
    isLastStep: currentStep === beInspiredStepConfigs.length - 1
  };
};
