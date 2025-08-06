import { useState } from 'react';
import ExperienceActionSelector from './components/ExperienceActionSelector';
import CreateExperienceForm from './CreateExperienceForm';
import DiscoverExperiences from './DiscoverExperiences';
import HomeNavigation from '@/components/layout/HomeNavigation';

type ExperienceAction = 'create' | 'discover' | null;

interface ExperienceMainProps {
  onBack?: () => void;
  onModeSelect?: (mode: 'plan' | 'be-inspired' | 'recommendations' | 'profile') => void;
}

const ExperienceMain = ({ onBack, onModeSelect }: ExperienceMainProps) => {
  const [action, setAction] = useState<ExperienceAction>(null);

  const handleActionSelect = (selectedAction: ExperienceAction) => {
    setAction(selectedAction);
  };

  const handleBackToActionSelector = () => {
    setAction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <HomeNavigation onModeSelect={onModeSelect} />
      
      {!action && <ExperienceActionSelector onActionSelect={handleActionSelect} />}
      
      {action === 'create' && (
        <CreateExperienceForm onBack={onBack || handleBackToActionSelector} />
      )}
      
      {action === 'discover' && (
        <DiscoverExperiences onBack={onBack || handleBackToActionSelector} />
      )}
    </div>
  );
};

export default ExperienceMain;