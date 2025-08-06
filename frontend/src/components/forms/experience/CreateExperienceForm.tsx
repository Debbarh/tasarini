import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExperienceTypeStep from './steps/ExperienceTypeStep';
import BasicInfoStep from './steps/BasicInfoStep';
import CategoryStep from './steps/CategoryStep';
import MediaStep from './steps/MediaStep';
import ReviewStep from './steps/ReviewStep';
import { ExperienceType } from '@/types/recommendations';

interface ExperienceFormData {
  type?: ExperienceType;
  title?: string;
  description?: string;
  location?: {
    address: string;
    coordinates: { latitude: number; longitude: number };
  };
  categories?: {
    activities: string[];
    travelerType: string[];
    budget: string;
  };
  media?: {
    photos: string[];
    videos: string[];
  };
  practicalTips?: string[];
}

interface CreateExperienceFormProps {
  onBack: () => void;
}

const CreateExperienceForm = ({ onBack }: CreateExperienceFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ExperienceFormData>({});

  const steps = [
    { id: 1, title: "Type d'expérience", component: ExperienceTypeStep },
    { id: 2, title: "Informations de base", component: BasicInfoStep },
    { id: 3, title: "Catégorisation", component: CategoryStep },
    { id: 4, title: "Médias", component: MediaStep },
    { id: 5, title: "Validation", component: ReviewStep },
  ];

  const handleNext = (stepData: Partial<ExperienceFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = (finalData: Partial<ExperienceFormData>) => {
    const completeData = { ...formData, ...finalData };
    console.log('Soumission de recommandation:', completeData);
    // TODO: Intégrer avec Supabase pour sauvegarder
    onBack();
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8 pt-8">
          <Button variant="ghost" onClick={handleBack} className="gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Recommander une Expérience</h1>
            <p className="text-gray-600 text-lg">
              Étape {currentStep} sur {steps.length}: {steps[currentStep - 1].title}
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  index + 1 <= currentStep
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-16 rounded-full transition-all duration-300 ${
                    index + 1 < currentStep ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <CurrentStepComponent
          data={formData}
          onNext={handleNext}
          onSubmit={currentStep === steps.length ? handleSubmit : undefined}
        />
      </div>
    </div>
  );
};

export default CreateExperienceForm;