
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash, Search, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface CityData {
  id: string;
  name: string;
  country: string;
  country_code: string;
  periods_count: number;
  programs_count: number;
  created: string;
  updated: string;
}

interface CityFormData {
  name: string;
  country: string;
}

const CitiesGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<CityData | null>(null);
  const { toast } = useToast();

  const form = useForm<CityFormData>({
    defaultValues: {
      name: '',
      country: ''
    }
  });

  // Données d'exemple
  const cities: CityData[] = [
    { id: '1', name: 'Paris', country: 'France', country_code: 'FR', periods_count: 4, programs_count: 12, created: '2024-01-15', updated: '2024-01-20' },
    { id: '2', name: 'Marrakech', country: 'Maroc', country_code: 'MA', periods_count: 3, programs_count: 8, created: '2024-01-16', updated: '2024-01-22' },
    { id: '3', name: 'Barcelone', country: 'Espagne', country_code: 'ES', periods_count: 4, programs_count: 15, created: '2024-01-17', updated: '2024-01-21' },
    { id: '4', name: 'Rome', country: 'Italie', country_code: 'IT', periods_count: 4, programs_count: 18, created: '2024-01-18', updated: '2024-01-23' },
  ];

  const countries = ['France', 'Maroc', 'Espagne', 'Italie'];

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCity = (data: CityFormData) => {
    console.log('Adding city:', data);
    toast({
      title: "Ville ajoutée",
      description: `${data.name} a été ajoutée avec succès.`,
    });
    setIsAddDialogOpen(false);
    form.reset();
  };

  const handleEditCity = (data: CityFormData) => {
    console.log('Editing city:', data);
    toast({
      title: "Ville modifiée",
      description: `${data.name} a été modifiée avec succès.`,
    });
    setIsEditDialogOpen(false);
    form.reset();
  };

  const handleDeleteCity = (city: CityData) => {
    console.log('Deleting city:', city.id);
    toast({
      title: "Ville supprimée",
      description: `${city.name} a été supprimée avec succès.`,
    });
  };

  const openEditDialog = (city: CityData) => {
    setEditingCity(city);
    form.reset({
      name: city.name,
      country: city.country
    });
    setIsEditDialogOpen(true);
  };

  const CityForm = ({ onSubmit, submitLabel }: { onSubmit: (data: CityFormData) => void, submitLabel: string }) => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Le nom est requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la ville</FormLabel>
              <FormControl>
                <Input placeholder="Paris" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="country"
          rules={{ required: "Le pays est requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pays</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un pays" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </form>
    </Form>
  );

  return (
    <div className="space-y-6">
      {/* Header avec actions */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-semibold">Gestion des Villes</h3>
          <p className="text-gray-600">Gérez les villes et leurs informations</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une ville
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle ville</DialogTitle>
            </DialogHeader>
            <CityForm onSubmit={handleAddCity} submitLabel="Ajouter" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Recherche */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Rechercher une ville..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ville</TableHead>
              <TableHead>Pays</TableHead>
              <TableHead>Périodes</TableHead>
              <TableHead>Programmes</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead>Modifié le</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCities.map((city) => (
              <TableRow key={city.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {city.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{city.country_code}</Badge>
                    {city.country}
                  </div>
                </TableCell>
                <TableCell>{city.periods_count} périodes</TableCell>
                <TableCell>{city.programs_count} programmes</TableCell>
                <TableCell>{new Date(city.created).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(city.updated).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(city)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCity(city)}
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la ville</DialogTitle>
          </DialogHeader>
          <CityForm onSubmit={handleEditCity} submitLabel="Modifier" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CitiesGrid;
