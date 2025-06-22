
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Edit, Trash, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProgramData {
  id: string;
  title: string;
  city: string;
  country: string;
  days_count: number;
  activities_count: number;
  preference_id: string;
  created: string;
  updated: string;
}

const ProgramsGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Données d'exemple correspondant à votre modèle Program
  const programs: ProgramData[] = [
    { 
      id: '1', 
      title: 'Découverte de Paris en 5 jours', 
      city: 'Paris', 
      country: 'France', 
      days_count: 5, 
      activities_count: 25, 
      preference_id: 'pref_1',
      created: '2024-01-15', 
      updated: '2024-01-20' 
    },
    { 
      id: '2', 
      title: 'Marrakech authentique - 4 jours', 
      city: 'Marrakech', 
      country: 'Maroc', 
      days_count: 4, 
      activities_count: 18, 
      preference_id: 'pref_2',
      created: '2024-01-16', 
      updated: '2024-01-22' 
    },
    { 
      id: '3', 
      title: 'Barcelone culturelle - 6 jours', 
      city: 'Barcelone', 
      country: 'Espagne', 
      days_count: 6, 
      activities_count: 32, 
      preference_id: 'pref_3',
      created: '2024-01-17', 
      updated: '2024-01-21' 
    },
  ];

  const filteredPrograms = programs.filter(program =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProgram = (program: ProgramData) => {
    console.log('Viewing program:', program.id);
    toast({
      title: "Affichage du programme",
      description: `Ouverture de "${program.title}"`,
    });
  };

  const handleEditProgram = (program: ProgramData) => {
    console.log('Editing program:', program.id);
    toast({
      title: "Édition du programme",
      description: `Modification de "${program.title}"`,
    });
  };

  const handleDeleteProgram = (program: ProgramData) => {
    console.log('Deleting program:', program.id);
    toast({
      title: "Programme supprimé",
      description: `"${program.title}" a été supprimé avec succès.`,
    });
  };

  const getDurationColor = (days: number) => {
    if (days <= 3) return 'bg-green-100 text-green-800';
    if (days <= 6) return 'bg-blue-100 text-blue-800';
    return 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-semibold">Gestion des Programmes</h3>
          <p className="text-gray-600">Gérez les itinéraires générés par l'IA</p>
        </div>
      </div>

      {/* Recherche */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Rechercher un programme..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-600">Total Programmes</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{programs.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600">Durée Moyenne</span>
          </div>
          <p className="text-2xl font-bold text-green-800">
            {Math.round(programs.reduce((acc, p) => acc + p.days_count, 0) / programs.length)} jours
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-purple-600">Activités Totales</span>
          </div>
          <p className="text-2xl font-bold text-purple-800">
            {programs.reduce((acc, p) => acc + p.activities_count, 0)}
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-orange-600">Longs Séjours</span>
          </div>
          <p className="text-2xl font-bold text-orange-800">
            {programs.filter(p => p.days_count > 6).length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre du Programme</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Activités</TableHead>
              <TableHead>Préférence</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead>Modifié le</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrograms.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">
                  <div className="max-w-xs">
                    <div className="font-semibold truncate">{program.title}</div>
                    <div className="text-sm text-gray-500">ID: {program.id}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{program.city}</div>
                    <div className="text-sm text-gray-500">{program.country}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getDurationColor(program.days_count)}>
                    {program.days_count} jours
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {program.activities_count} activités
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{program.preference_id}</Badge>
                </TableCell>
                <TableCell>{new Date(program.created).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(program.updated).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProgram(program)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProgram(program)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProgram(program)}
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

export default ProgramsGrid;
