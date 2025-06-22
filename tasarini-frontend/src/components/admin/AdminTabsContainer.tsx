
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { adminSections } from '@/constants/adminSections';
import CountriesGrid from '@/components/admin/CountriesGrid';
import CitiesGrid from '@/components/admin/CitiesGrid';
import PreferencesGrid from '@/components/admin/PreferencesGrid';
import ProgramsGrid from '@/components/admin/ProgramsGrid';
import ToursGrid from '@/components/admin/ToursGrid';
import WebPagesGrid from '@/components/admin/WebPagesGrid';

interface AdminTabsContainerProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const AdminTabsContainer = ({ activeTab, onTabChange }: AdminTabsContainerProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/30">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
          {adminSections.map((section) => (
            <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
              <section.icon className="w-4 h-4" />
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="p-6">
          <TabsContent value="countries">
            <CountriesGrid />
          </TabsContent>

          <TabsContent value="cities">
            <CitiesGrid />
          </TabsContent>

          <TabsContent value="preferences">
            <PreferencesGrid />
          </TabsContent>

          <TabsContent value="programs">
            <ProgramsGrid />
          </TabsContent>

          <TabsContent value="tours">
            <ToursGrid />
          </TabsContent>

          <TabsContent value="pages">
            <WebPagesGrid />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default AdminTabsContainer;
