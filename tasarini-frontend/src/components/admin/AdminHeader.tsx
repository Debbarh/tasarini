
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import BrandLogo from '@/components/layout/BrandLogo';
import LanguageSelector from '@/components/ui/LanguageSelector';

const AdminHeader = () => {
  return (
    <header className="px-6 py-6 border-b border-white/20 bg-white/30 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <BrandLogo />
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
            Accueil
          </Link>
          <Link to="/admin" className="text-purple-600 font-medium flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Admin
          </Link>
          <LanguageSelector />
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
