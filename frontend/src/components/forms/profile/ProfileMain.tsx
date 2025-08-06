import { useState } from 'react';
import AuthenticationForm from './AuthenticationForm';
import UserDashboard from './UserDashboard';
import { UserProfile } from '@/types/recommendations';
import HomeNavigation from '@/components/layout/HomeNavigation';

interface ProfileMainProps {
  onBack?: () => void;
  onModeSelect?: (mode: 'plan' | 'be-inspired' | 'recommendations' | 'profile') => void;
}

const ProfileMain = ({ onBack, onModeSelect }: ProfileMainProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = (userData: UserProfile) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <HomeNavigation onModeSelect={onModeSelect} />
        <AuthenticationForm
          onAuthSuccess={handleAuthSuccess}
          onBack={onBack}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <HomeNavigation onModeSelect={onModeSelect} />
      <UserDashboard
        user={user!}
        onLogout={handleLogout}
        onBack={onBack}
      />
    </div>
  );
};

export default ProfileMain;