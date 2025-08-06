import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import ContentManagement from './ContentManagement';
import PlatformSettings from './PlatformSettings';
import Analytics from './Analytics';
import SystemSettings from './SystemSettings';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type AdminSection = 
  | 'dashboard' 
  | 'users' 
  | 'content' 
  | 'analytics' 
  | 'platform-settings' 
  | 'system-settings';

interface AdminMainProps {
  onBack?: () => void;
}

const AdminMain = ({ onBack }: AdminMainProps) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'content':
        return <ContentManagement />;
      case 'analytics':
        return <Analytics />;
      case 'platform-settings':
        return <PlatformSettings />;
      case 'system-settings':
        return <SystemSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection}
          />
          
          <main className="flex-1 overflow-hidden">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-white/30 shadow-sm">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  {onBack && (
                    <Button variant="ghost" onClick={onBack} className="gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Retour
                    </Button>
                  )}
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                    Panel d'Administration
                  </h1>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    Admin • TASARINI
                  </div>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="p-6 max-w-full overflow-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminMain;