import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Cog,
  ChevronRight
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { AdminSection } from './AdminMain';

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

const menuItems = [
  {
    title: 'Tableau de Bord',
    section: 'dashboard' as AdminSection,
    icon: LayoutDashboard,
    description: 'Vue d\'ensemble'
  },
  {
    title: 'Utilisateurs',
    section: 'users' as AdminSection,
    icon: Users,
    description: 'Gestion des comptes'
  },
  {
    title: 'Contenu',
    section: 'content' as AdminSection,
    icon: FileText,
    description: 'Recommandations & POI'
  },
  {
    title: 'Analytics',
    section: 'analytics' as AdminSection,
    icon: BarChart3,
    description: 'Statistiques'
  },
  {
    title: 'Plateforme',
    section: 'platform-settings' as AdminSection,
    icon: Settings,
    description: 'Configuration'
  },
  {
    title: 'Système',
    section: 'system-settings' as AdminSection,
    icon: Cog,
    description: 'Paramètres avancés'
  }
];

const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className={collapsed ? "w-16" : "w-72"} collapsible="icon">
      <div className="p-4 border-b border-white/20">
        <SidebarTrigger className="mb-2" />
        {!collapsed && (
          <div className="text-center">
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Panel
            </h2>
            <p className="text-xs text-gray-500 mt-1">TASARINI Platform</p>
          </div>
        )}
      </div>

      <SidebarContent className="bg-white/50 backdrop-blur-sm">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 font-semibold">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.section}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.section)}
                    className={`w-full justify-start gap-3 p-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.section
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'hover:bg-white/60 text-gray-700'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${
                      activeSection === item.section ? 'text-white' : 'text-blue-600'
                    }`} />
                    
                    {!collapsed && (
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item.title}</div>
                        <div className={`text-xs ${
                          activeSection === item.section ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                    )}
                    
                    {!collapsed && activeSection === item.section && (
                      <ChevronRight className="h-4 w-4 text-white" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;