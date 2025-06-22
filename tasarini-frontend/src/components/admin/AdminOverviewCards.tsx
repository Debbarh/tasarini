
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { adminSections } from '@/constants/adminSections';

interface AdminOverviewCardsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const AdminOverviewCards = ({ activeTab, onTabChange }: AdminOverviewCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {adminSections.map((section) => (
        <Card 
          key={section.id} 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            activeTab === section.id ? 'ring-2 ring-purple-500 bg-purple-50' : 'bg-white/80'
          }`}
          onClick={() => onTabChange(section.id)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <section.icon className="w-5 h-5 text-purple-600" />
                {section.label}
              </div>
              <Badge variant="secondary">{section.count}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{section.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminOverviewCards;
