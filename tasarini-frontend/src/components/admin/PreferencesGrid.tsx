
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Trash, Users, Calendar, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PreferenceData {
  id: string;
  country: string;
  city: string;
  travel_segment: string;
  budget_level: string;
  destinations_count: number;
  activities_count: number;
  created: string;
  has_program: boolean;
}

const PreferencesGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Données d'exemple correspondant à votre modèle Preference
  const preferences: PreferenceData[] = [
    { 
      id: '1', 
      country: 'France', 
      city: 'Paris', 
      travel_segment: 'couple', 
      budget_level: 'normal', 
      destinations_count: 2, 
      activities_count: 8, 
      created: '2024-01-15', 
      has_program: true 
    },
    { 
      id: '2', 
      country: 'Maroc', 
      city: 'Marrakech', 
      travel_segment: 'family', 
      budget_level: 'high', 
      destinations_count: 1, 
      activities_count: 12, 
      created: '2024-01-16', 
      has_program: true 
    },
    { 
      id: '3', 
      country: 'Espagne', 
      city: 'Barcelone', 
      travel_segment: 'friends', 
      budget_level: 'low', 
      destinations_count: 3, 
      activities_count: 6, 
      created: '2024-01-17', 
      has_program: false 
    },
  ];

  const filteredPreferences = preferences.filter(pref =>
    pref.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pref.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pref.travel_segment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (preference: PreferenceData) => {
    console.log('Viewing preference details:', preference.id);
    toast({
      title: "Détails de la préférence",
      description: `Affichage des détails pour ${preference.city}, ${preference.country}`,
    });
  };

  const handleDeletePreference = (preference: PreferenceData) => {
    console.log('Deleting preference:', preference.id);
    toast({
      title: "Préférence supprimée",
      description: `La préférence pour ${preference.city} a été supprimée.`,
    });
  };

  const getBudgetColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSegmentIcon = (segment: string) => {
    switch (segment) {
      case 'couple': return '💑';
      case 'family': return '👨‍👩‍👧‍👦';
      case 'friends': return '👥';
      case 'solo': return '🧳';
      case 'business': return '💼';
      default: return '👥';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-semibold">Gestion des Préférences</h3>
          <p className="text-gray-600">Visualisez et gérez les préférences utilisateurs</p>
        </div>
      </div>

      {/* Recherche */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Rechercher par destination ou segment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-600">Total Préférences</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{preferences.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600">Avec Programme</span>
          </div>
          <p className="text-2xl font-bold text-green-800">
            {preferences.filter(p => p.has_program).length}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-purple-600">Budget Élevé</span>
          </div>
          <p className="text-2xl font-bold text-purple-800">
            {preferences.filter(p => p.budget_level === 'high').length}
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-orange-600">En Famille</span>
          </div>
          <p className="text-2xl font-bold text-orange-800">
            {preferences.filter(p => p.travel_segment === 'family').length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Destination</TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Destinations</TableHead>
              <TableHead>Activités</TableHead>
              <TableHead>Programme</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPreferences.map((preference) => (
              <TableRow key={preference.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-semibold">{preference.city}</div>
                    <div className="text-sm text-gray-500">{preference.country}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{getSegmentIcon(preference.travel_segment)}</span>
                    <span className="capitalize">{preference.travel_segment}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getBudgetColor(preference.budget_level)}>
                    {preference.budget_level}
                  </Badge>
                </TableCell>
                <TableCell>{preference.destinations_count}</TableCell>
                <TableCell>{preference.activities_count}</TableCell>
                <TableCell>
                  {preference.has_program ? (
                    <Badge className="bg-green-100 text-green-800">✓ Généré</Badge>
                  ) : (
                    <Badge variant="outline">Aucun</Badge>
                  )}
                </TableCell>
                <TableCell>{new Date(preference.created).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(preference)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePreference(preference)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PreferencesGrid;
