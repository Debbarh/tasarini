
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Edit, Trash, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface TourData {
  id: string;
  title: string;
  destination: string;
  best_period: string;
  similar_destinations: string[];
  must_see_count: number;
  gift_ideas_count: number;
  created: string;
  updated: string;
}

const ToursGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  // Données d'exemple correspondant à votre modèle Tour
  const tours: TourData[] = [
    { 
      id: '1', 
      title: 'Circuit Impérial du Maroc', 
      destination: 'Marrakech, Fès, Casablanca', 
      best_period: 'Octobre à Avril',
      similar_destinations: ['Tunisie', 'Égypte', 'Jordanie'],
      must_see_count: 8,
      gift_ideas_count: 6,
      created: '2024-01-15', 
      updated: '2024-01-20' 
    },
    { 
      id: '2', 
      title: 'Paris Romantique', 
      destination: 'Paris et environs', 
      best_period: 'Mai à Septembre',
      similar_destinations: ['Rome', 'Vienne', 'Prague'],
      must_see_count: 12,
      gift_ideas_count: 4,
      created: '2024-01-16', 
      updated: '2024-01-22' 
    },
    { 
      id: '3', 
      title: 'Espagne Authentique', 
      destination: 'Barcelone, Madrid, Séville', 
      best_period: 'Avril à Juin, Septembre à Novembre',
      similar_destinations: ['Portugal', 'Italie du Sud', 'Grèce'],
      must_see_count: 15,
      gift_ideas_count: 8,
      created: '2024-01-17', 
      updated: '2024-01-21' 
    },
  ];

  const filteredTours = tours.filter(tour =>
    tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewTour = (tour: TourData) => {
    console.log('Viewing tour:', tour.id);
    toast({
      title: "Affichage du circuit",
      description: `Ouverture de "${tour.title}"`,
    });
  };

  const handleEditTour = (tour: TourData) => {
    console.log('Editing tour:', tour.id);
    toast({
      title: "Édition du circuit",
      description: `Modification de "${tour.title}"`,
    });
  };

  const handleDeleteTour = (tour: TourData) => {
    console.log('Deleting tour:', tour.id);
    toast({
      title: "Circuit supprimé",
      description: `"${tour.title}" a été supprimé avec succès.`,
    });
  };

  const handleAddTour = () => {
    toast({
      title: "Nouveau circuit",
      description: "Fonctionnalité d'ajout à implémenter",
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-semibold">Gestion des Circuits</h3>
          <p className="text-gray-600">Gérez les circuits et packages touristiques</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un circuit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau circuit</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <p className="text-gray-600 mb-4">
                Formulaire complet d'ajout de circuit à implémenter avec tous les champs du modèle Tour.
              </p>
              <Button onClick={handleAddTour} className="w-full">
                Implémenter le formulaire
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recherche */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Rechercher un circuit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <span className="text-sm text-blue-600">Total Circuits</span>
          <p className="text-2xl font-bold text-blue-800">{tours.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <span className="text-sm text-green-600">Destinations Uniques</span>
          <p className="text-2xl font-bold text-green-800">
            {new Set(tours.map(t => t.destination)).size}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <span className="text-sm text-purple-600">Lieux Incontournables</span>
          <p className="text-2xl font-bold text-purple-800">
            {tours.reduce((acc, t) => acc + t.must_see_count, 0)}
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <span className="text-sm text-orange-600">Idées Cadeaux</span>
          <p className="text-2xl font-bold text-orange-800">
            {tours.reduce((acc, t) => acc + t.gift_ideas_count, 0)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre du Circuit</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Meilleure Période</TableHead>
              <TableHead>Destinations Similaires</TableHead>
              <TableHead>Contenu</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell className="font-medium">
                  <div className="max-w-xs">
                    <div className="font-semibold">{tour.title}</div>
                    <div className="text-sm text-gray-500">ID: {tour.id}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    {tour.destination}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-blue-100 text-blue-800">
                    {tour.best_period}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {tour.similar_destinations.slice(0, 2).map((dest, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {dest}
                      </Badge>
                    ))}
                    {tour.similar_destinations.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{tour.similar_destinations.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{tour.must_see_count} lieux</div>
                    <div className="text-gray-500">{tour.gift_ideas_count} cadeaux</div>
                  </div>
                </TableCell>
                <TableCell>{new Date(tour.created).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewTour(tour)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditTour(tour)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteTour(tour)}
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

export default ToursGrid;
