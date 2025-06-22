
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash, Search, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface CountryData {
  id: string;
  name: string;
  code: string;
  user_count: number;
  cities_count: number;
  created: string;
  updated: string;
}

interface CountryFormData {
  name: string;
  code: string;
}

const CountriesGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<CountryData | null>(null);
  const { toast } = useToast();

  const form = useForm<CountryFormData>({
    defaultValues: {
      name: '',
      code: ''
    }
  });

  // Données d'exemple correspondant à votre modèle Django
  const countries: CountryData[] = [
    { id: '1', name: 'France', code: 'FR', user_count: 15, cities_count: 8, created: '2024-01-15', updated: '2024-01-20' },
    { id: '2', name: 'Maroc', code: 'MA', user_count: 23, cities_count: 12, created: '2024-01-16', updated: '2024-01-22' },
    { id: '3', name: 'Espagne', code: 'ES', user_count: 18, cities_count: 10, created: '2024-01-17', updated: '2024-01-21' },
    { id: '4', name: 'Italie', code: 'IT', user_count: 31, cities_count: 15, created: '2024-01-18', updated: '2024-01-23' },
  ];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCountry = (data: CountryFormData) => {
    console.log('Adding country:', data);
    toast({
      title: "Pays ajouté",
      description: `${data.name} a été ajouté avec succès.`,
    });
    setIsAddDialogOpen(false);
    form.reset();
  };

  const handleEditCountry = (data: CountryFormData) => {
    console.log('Editing country:', data);
    toast({
      title: "Pays modifié",
      description: `${data.name} a été modifié avec succès.`,
    });
    setIsEditDialogOpen(false);
    form.reset();
  };

  const handleDeleteCountry = (country: CountryData) => {
    console.log('Deleting country:', country.id);
    toast({
      title: "Pays supprimé",
      description: `${country.name} a été supprimé avec succès.`,
    });
  };

  const openEditDialog = (country: CountryData) => {
    setEditingCountry(country);
    form.reset({
      name: country.name,
      code: country.code
    });
    setIsEditDialogOpen(true);
  };

  const CountryForm = ({ onSubmit, submitLabel }: { onSubmit: (data: CountryFormData) => void, submitLabel: string }) => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Le nom est requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du pays</FormLabel>
              <FormControl>
                <Input placeholder="France" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="code"
          rules={{ 
            required: "Le code est requis",
            pattern: {
              value: /^[A-Z]{2,3}$/,
              message: "Le code doit contenir 2-3 lettres majuscules"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code pays (ISO)</FormLabel>
              <FormControl>
                <Input placeholder="FR" maxLength={3} {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
              </FormControl>
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
          <h3 className="text-2xl font-semibold">Gestion des Pays</h3>
          <p className="text-gray-600">Gérez les pays disponibles dans le système</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un pays
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau pays</DialogTitle>
            </DialogHeader>
            <CountryForm onSubmit={handleAddCountry} submitLabel="Ajouter" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Recherche */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Rechercher un pays..."
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
              <TableHead>Nom</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Utilisateurs</TableHead>
              <TableHead>Villes</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead>Modifié le</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCountries.map((country) => (
              <TableRow key={country.id}>
                <TableCell className="font-medium">{country.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{country.code}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    {country.user_count}
                  </div>
                </TableCell>
                <TableCell>{country.cities_count} villes</TableCell>
                <TableCell>{new Date(country.created).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(country.updated).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(country)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCountry(country)}
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
            <DialogTitle>Modifier le pays</DialogTitle>
          </DialogHeader>
          <CountryForm onSubmit={handleEditCountry} submitLabel="Modifier" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CountriesGrid;
