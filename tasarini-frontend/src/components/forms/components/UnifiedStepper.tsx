
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface StepConfig {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface UnifiedStepperProps {
  currentStep: number;
  totalSteps: number;
  stepConfig: StepConfig;
  onBack: () => void;
  onNext: () => void;
  onBackToHome: () => void;
  isLastStep: boolean;
  children: React.ReactNode;
  mode: 'plan' | 'inspire';
}

const UnifiedStepper = ({
  currentStep,
  totalSteps,
  stepConfig,
  onBack,
  onNext,
  onBackToHome,
  isLastStep,
  children,
  mode
}: UnifiedStepperProps) => {
  const modeConfig = {
    plan: {
      gradient: 'from-blue-600 via-purple-600 to-pink-600',
      buttonGradient: 'from-blue-600 to-purple-600',
      accentColor: 'blue',
      title: 'Plan Your Trip',
      icon: '✈️'
    },
    inspire: {
      gradient: 'from-orange-500 via-rose-500 to-pink-500',
      buttonGradient: 'from-orange-500 to-rose-600',
      accentColor: 'orange',
      title: 'Be Inspired',
      icon: '✨'
    }
  };

  const config = modeConfig[mode];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating decorative elements like homepage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={stepConfig.image}
          alt={stepConfig.title}
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            onClick={onBackToHome}
            variant="ghost"
            size="lg"
            className="text-gray-700 hover:text-purple-600 hover:bg-white/80 backdrop-blur-sm border border-white/30 px-6 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              {config.icon} {config.title}
            </h1>
          </div>
          
          <div className="text-gray-700 backdrop-blur-sm bg-white/80 px-4 py-2 rounded-full border border-white/30 text-sm font-medium shadow-lg">
            {currentStep + 1} / {totalSteps}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="w-full bg-white/30 rounded-full h-2 backdrop-blur-sm shadow-sm">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 shadow-md"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Step Title */}
      <div className="relative z-10 px-6 py-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            {stepConfig.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {stepConfig.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-300">
            <CardContent className="p-8 md:p-12">
              {children}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={onBack}
              variant="ghost"
              size="lg"
              disabled={currentStep === 0}
              className="text-gray-700 hover:text-purple-600 hover:bg-white/80 backdrop-blur-sm border border-white/30 px-6 shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>
            
            <Button
              onClick={onNext}
              size="lg"
              className={`bg-gradient-to-r ${config.buttonGradient} hover:opacity-90 text-white px-8 py-3 rounded-2xl shadow-2xl border-0 font-semibold transition-all duration-300 hover:shadow-3xl hover:scale-105`}
            >
              {isLastStep ? (
                mode === 'inspire' ? '✨ Révéler ma destination' : '🎯 Créer mon voyage'
              ) : (
                'Suivant'
              )}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedStepper;
