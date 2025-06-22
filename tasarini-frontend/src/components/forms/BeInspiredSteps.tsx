
import { useBeInspiredForm } from "@/hooks/useBeInspiredForm";
import BeInspiredStepContent from "./components/BeInspiredStepContent";
import UnifiedStepper from "./components/UnifiedStepper";
import { beInspiredStepConfigs } from "@/constants/beInspiredSteps";

interface BeInspiredStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const BeInspiredSteps = ({ onComplete, onBack }: BeInspiredStepsProps) => {
  const {
    currentStep,
    formData,
    setFormData,
    handleNext,
    handleBack,
    isLastStep
  } = useBeInspiredForm(onComplete);

  const currentStepConfig = beInspiredStepConfigs[currentStep];

  return (
    <UnifiedStepper
      currentStep={currentStep}
      totalSteps={beInspiredStepConfigs.length}
      stepConfig={currentStepConfig}
      onBack={() => handleBack(onBack)}
      onNext={handleNext}
      onBackToHome={onBack}
      isLastStep={isLastStep}
      mode="inspire"
    >
      <BeInspiredStepContent
        currentStep={currentStep}
        formData={formData}
        setFormData={setFormData}
      />
    </UnifiedStepper>
  );
};

export default BeInspiredSteps;
