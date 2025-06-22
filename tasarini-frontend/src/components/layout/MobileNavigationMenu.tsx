
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import UserHeader from '@/components/ui/UserHeader';
import LanguageSelector from '@/components/ui/LanguageSelector';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Menu, X, User } from 'lucide-react';

interface MobileNavigationMenuProps {
  onModeSelect: (mode: 'plan' | 'inspire') => void;
}

const MobileNavigationMenu = ({ onModeSelect }: MobileNavigationMenuProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = React.useState(false);

  const handleModeSelect = (mode: 'plan' | 'inspire') => {
    onModeSelect(mode);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="text-gray-700">
            <Menu className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="text-left border-b border-gray-200">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-semibold text-gray-900">
                Menu
              </DrawerTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DrawerHeader>
          
          <div className="flex flex-col h-full">
            {/* User section */}
            <div className="p-6 border-b border-gray-100">
              <UserHeader />
            </div>

            {/* Navigation items */}
            <div className="flex-1 p-6 space-y-4">
              <Button
                onClick={() => handleModeSelect('plan')}
                variant="ghost"
                className="w-full justify-start text-left text-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 h-12"
              >
                {t('hero.plan')}
              </Button>
              
              <Button
                onClick={() => handleModeSelect('inspire')}
                variant="ghost"
                className="w-full justify-start text-left text-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 h-12"
              >
                {t('hero.inspire')}
              </Button>
              
              <Link
                to="/countries"
                onClick={() => setOpen(false)}
                className="flex items-center w-full text-left text-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md p-3 h-12"
              >
                {t('nav.adventures')}
              </Link>
              
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 w-full text-left text-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md p-3 h-12"
              >
                <User className="w-5 h-5" />
                Profil
              </Link>
              
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="flex items-center w-full text-left text-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md p-3 h-12"
              >
                {t('nav.about')}
              </a>
            </div>

            {/* Language selector at bottom */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Langue</span>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNavigationMenu;
