
import ActivitiesStep from "../steps/ActivitiesStep";
import TravelCompanionsStep from "../steps/TravelCompanionsStep";
import BudgetStep from "../steps/BudgetStep";
import AccommodationStep from "../steps/AccommodationStep";
import { beInspiredStepConfigs } from "@/constants/beInspiredSteps";

interface BeInspiredStepContentProps {
  currentStep: number;
  formData: {
    activities: string[];
    travelWith: string;
    budget: string;
    accommodation: string;
  };
  setFormData: (data: any) => void;
}

const BeInspiredStepContent = ({ currentStep, formData, setFormData }: BeInspiredStepContentProps) => {
  const step = beInspiredStepConfigs[currentStep];
  
  switch (step.id) {
    case 'activities':
      return (
        <ActivitiesStep
          activities={formData.activities}
          setActivities={(activities) => setFormData({...formData, activities})}
        />
      );
    case 'travelWith':
      return (
        <TravelCompanionsStep
          travelWith={formData.travelWith}
          setTravelWith={(travelWith) => setFormData({...formData, travelWith})}
        />
      );
    case 'budget':
      return (
        <BudgetStep
          budget={formData.budget}
          setBudget={(budget) => setFormData({...formData, budget})}
        />
      );
    case 'accommodation':
      return (
        <AccommodationStep
          accommodation={formData.accommodation}
          setAccommodation={(accommodation) => setFormData({...formData, accommodation})}
        />
      );
    default:
      return null;
  }
};

export default BeInspiredStepContent;
