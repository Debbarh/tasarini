
import { Check } from "lucide-react";
import { stepConfigs } from "@/constants/planTripSteps";

interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator = ({ currentStep }: ProgressIndicatorProps) => {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      {stepConfigs.map((step, index) => (
        <div
          key={step.id}
          className={`flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-500 ${
            index < currentStep
              ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl scale-110'
              : index === currentStep
              ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl scale-125'
              : 'bg-white/30 text-white/70 backdrop-blur-sm'
          }`}
        >
          {index < currentStep ? (
            <Check className="w-7 h-7" />
          ) : (
            <step.icon className="w-7 h-7" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
