
import { beInspiredStepConfigs } from "@/constants/beInspiredSteps";
import BeInspiredHeader from "./BeInspiredHeader";
import BeInspiredProgressIndicator from "./BeInspiredProgressIndicator";

interface BeInspiredLayoutProps {
  currentStep: number;
  onBack: () => void;
  children: React.ReactNode;
  navigation: React.ReactNode;
}

const BeInspiredLayout = ({ currentStep, onBack, children, navigation }: BeInspiredLayoutProps) => {
  const currentStepData = beInspiredStepConfigs[currentStep];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentStepData.image}
          alt={currentStepData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/30 to-pink-900/40"></div>
      </div>

      <BeInspiredHeader onBack={onBack} />

      {/* Progress Indicator - Compact */}
      <div className="relative z-10 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <BeInspiredProgressIndicator currentStep={currentStep} />
          
          <div className="text-center text-white mt-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {currentStepData.title}
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              {currentStepData.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
            {children}
          </div>

          {navigation}
        </div>
      </main>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default BeInspiredLayout;
