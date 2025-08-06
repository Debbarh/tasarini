import { useState } from 'react';
import ModeSelector from './components/ModeSelector';
import LocalExplorer from './LocalExplorer';
import WorldDiscovery from './WorldDiscovery';
import { BeInspiredMode } from '@/types/beInspiredModes';
import HomeNavigation from '@/components/layout/HomeNavigation';

interface BeInspiredMainProps {
  onBack?: () => void;
  onModeSelect?: (mode: 'plan' | 'be-inspired' | 'recommendations' | 'profile') => void;
}

const BeInspiredMain = ({ onBack, onModeSelect }: BeInspiredMainProps) => {
  const [mode, setMode] = useState<BeInspiredMode | null>(null);

  const handleModeSelect = (selectedMode: BeInspiredMode) => {
    setMode(selectedMode);
  };

  const handleBackToModeSelector = () => {
    setMode(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <HomeNavigation onModeSelect={onModeSelect} />
      
      {!mode && <ModeSelector onModeSelect={handleModeSelect} />}
      
      {mode === 'local' && (
        <LocalExplorer onBack={onBack || handleBackToModeSelector} />
      )}
      
      {mode === 'world' && (
        <WorldDiscovery onBack={onBack || handleBackToModeSelector} />
      )}
    </div>
  );
};

export default BeInspiredMain;