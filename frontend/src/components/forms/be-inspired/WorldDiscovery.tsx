import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import PreferencesQuestionnaire from './components/PreferencesQuestionnaire';
import DestinationSuggestions from './components/DestinationSuggestions';
import ProgramDisplay from './components/ProgramDisplay';
import { WorldDiscoveryPreferences, DestinationSuggestion, GeneratedProgram } from '@/types/beInspiredModes';

interface WorldDiscoveryProps {
  onBack: () => void;
}

type WorldDiscoveryStep = 'questionnaire' | 'suggestions' | 'program';

const WorldDiscovery = ({ onBack }: WorldDiscoveryProps) => {
  const [currentStep, setCurrentStep] = useState<WorldDiscoveryStep>('questionnaire');
  const [preferences, setPreferences] = useState<WorldDiscoveryPreferences | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<DestinationSuggestion | null>(null);
  const [generatedProgram, setGeneratedProgram] = useState<GeneratedProgram | null>(null);

  const handlePreferencesComplete = (prefs: WorldDiscoveryPreferences) => {
    setPreferences(prefs);
    setCurrentStep('suggestions');
  };

  const handleDestinationSelect = (destination: DestinationSuggestion) => {
    setSelectedDestination(destination);
    // Simuler la génération de programme
    const program: GeneratedProgram = {
      destination,
      days: [
        {
          day: 1,
          date: '2024-07-15',
          theme: 'Arrivée et découverte',
          activities: [
            {
              id: '1',
              name: 'Check-in à l\'hôtel',
              type: 'logement',
              duration: '1h',
              description: 'Installation et repos après le voyage',
              location: destination.name
            },
            {
              id: '2',
              name: 'Visite du centre historique',
              type: 'culture',
              duration: '3h',
              description: 'Découverte des monuments principaux',
              location: destination.name,
              cost: 25
            }
          ],
          accommodation: 'Hôtel central 4 étoiles',
          meals: ['Déjeuner local', 'Dîner traditionnel']
        }
      ],
      totalBudget: preferences?.budget === 'budget' ? 800 : preferences?.budget === 'luxury' ? 2500 : 1500,
      recommendations: [
        'Réservez vos billets d\'avion à l\'avance',
        'Vérifiez la météo avant le départ',
        'Apprenez quelques mots de la langue locale'
      ]
    };
    setGeneratedProgram(program);
    setCurrentStep('program');
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'questionnaire', label: 'Préférences', icon: '1' },
      { key: 'suggestions', label: 'Destinations', icon: '2' },
      { key: 'program', label: 'Programme', icon: '3' }
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
              ${currentStep === step.key 
                ? 'bg-purple-600 text-white' 
                : steps.findIndex(s => s.key === currentStep) > index
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }
            `}>
              {steps.findIndex(s => s.key === currentStep) > index ? (
                <Check className="w-5 h-5" />
              ) : (
                step.icon
              )}
            </div>
            <span className={`ml-2 text-sm ${
              currentStep === step.key ? 'text-purple-600 font-semibold' : 'text-gray-500'
            }`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 mx-4 text-gray-300" />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'questionnaire':
        return (
          <PreferencesQuestionnaire 
            onComplete={handlePreferencesComplete}
          />
        );
      case 'suggestions':
        return preferences ? (
          <DestinationSuggestions 
            preferences={preferences}
            onDestinationSelect={handleDestinationSelect}
            onBack={() => setCurrentStep('questionnaire')}
          />
        ) : null;
      case 'program':
        return generatedProgram ? (
          <ProgramDisplay 
            program={generatedProgram}
            onBack={() => setCurrentStep('suggestions')}
            onModify={() => setCurrentStep('questionnaire')}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Globe className="w-8 h-8 text-purple-600" />
                Découvrir le Monde
              </h1>
              <p className="text-gray-600 mt-1">
                Trouvez votre destination idéale et votre programme personnalisé
              </p>
            </div>
          </div>
        </div>

        {renderStepIndicator()}
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default WorldDiscovery;