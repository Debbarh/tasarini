
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/layout/BrandLogo";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import UserHeader from "@/components/ui/UserHeader";
import MobileNavigationMenu from "./MobileNavigationMenu";

interface HomeNavigationProps {
  onModeSelect?: (mode: 'plan' | 'inspire') => void;
}

const HomeNavigation = ({ onModeSelect }: HomeNavigationProps) => {
  const { t } = useLanguage();

  const handleModeSelect = (mode: 'plan' | 'inspire') => {
    if (onModeSelect) {
      onModeSelect(mode);
    } else {
      // Navigate to home and trigger mode
      window.location.href = `/?mode=${mode}`;
    }
  };

  return (
    <header className="relative z-10 px-6 py-6">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <BrandLogo />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Button 
            onClick={() => handleModeSelect('plan')}
            variant="ghost"
            className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
          >
            {t('hero.plan')}
          </Button>
          <Button 
            onClick={() => handleModeSelect('inspire')}
            variant="ghost"
            className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
          >
            {t('hero.inspire')}
          </Button>
          <Link to="/countries" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
            {t('nav.adventures')}
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
            Profil
          </Link>
          <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">{t('nav.about')}</a>
          <UserHeader />
          <LanguageSelector />
        </div>

        {/* Mobile Navigation */}
        <MobileNavigationMenu onModeSelect={handleModeSelect} />
      </nav>
    </header>
  );
};

export default HomeNavigation;
