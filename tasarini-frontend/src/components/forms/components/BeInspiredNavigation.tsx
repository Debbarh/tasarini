
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { beInspiredStepConfigs } from "@/constants/beInspiredSteps";

interface BeInspiredNavigationProps {
  currentStep: number;
  isLastStep: boolean;
  onNext: () => void;
  onBack: () => void;
}

const BeInspiredNavigation = ({ currentStep, isLastStep, onNext, onBack }: BeInspiredNavigationProps) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <Button
        onClick={onBack}
        variant="ghost"
        className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {currentStep === 0 ? 'Retour' : 'Précédent'}
      </Button>
      
      <div className="text-white/80 backdrop-blur-sm bg-white/20 px-4 py-2 rounded-full border border-white/30 text-sm">
        Étape {currentStep + 1} sur {beInspiredStepConfigs.length}
      </div>

      <Button
        onClick={onNext}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-2xl shadow-2xl border-0"
      >
        {isLastStep ? 'Trouvez mon inspiration' : 'Suivant'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default BeInspiredNavigation;
