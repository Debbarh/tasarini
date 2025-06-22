
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Search, MapPin, Users, Plus, Edit, Trash, Settings } from 'lucide-react';
import { CountryService } from '@/services/countryService';
import { Country, regions } from '@/data/countries';
import BrandLogo from '@/components/layout/BrandLogo';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CountryFormData {
  name: string;
  code: string;
  flagCode: string;
  region: string;
  cities: string;
}

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  const form = useForm<CountryFormData>({
    defaultValues: {
      name: '',
      code: '',
      flagCode: '',
      region: '',
      cities: ''
    }
  });

  useEffect(() => {
    const allCountries = CountryService.getAllCountries();
    setCountries(allCountries);
    setFilteredCountries(allCountries);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = CountryService.searchCountries(searchTerm);
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchTerm, countries]);

  const refreshCountries = () => {
    const allCountries = CountryService.getAllCountries();
    setCountries(allCountries);
    setFilteredCountries(allCountries);
  };

  const handleAddCountry = (data: CountryFormData) => {
    const cities = data.cities.split(',').map(city => city.trim()).filter(city => city);
    const newCountry = CountryService.addCountry({
      name: data.name,
      code: data.code,
      flagCode: data.flagCode,
      region: data.region,
      cities
    });
    
    refreshCountries();
    setIsAddDialogOpen(false);
    form.reset();
    toast({
      title: "Pays ajouté",
      description: `${newCountry.name} a été ajouté avec succès.`,
    });
  };

  const handleEditCountry = (data: CountryFormData) => {
    if (!editingCountry) return;
    
    const cities = data.cities.split(',').map(city => city.trim()).filter(city => city);
    const updatedCountry = CountryService.updateCountry(editingCountry.id, {
      name: data.name,
      code: data.code,
      flagCode: data.flagCode,
      region: data.region,
      cities
    });

    if (updatedCountry) {
      refreshCountries();
      setIsEditDialogOpen(false);
      setEditingCountry(null);
      form.reset();
      toast({
        title: "Pays modifié",
        description: `${updatedCountry.name} a été modifié avec succès.`,
      });
    }
  };

  const handleDeleteCountry = (country: Country) => {
    const success = CountryService.deleteCountry(country.id);
    if (success) {
      refreshCountries();
      toast({
        title: "Pays supprimé",
        description: `${country.name} a été supprimé avec succès.`,
      });
    }
  };

  const openEditDialog = (country: Country) => {
    setEditingCountry(country);
    form.reset({
      name: country.name,
      code: country.code,
      flagCode: country.flagCode,
      region: country.region,
      cities: country.cities?.join(', ') || ''
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
              value: /^[A-Z]{2}$/,
              message: "Le code doit contenir 2 lettres majuscules"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code pays (2 lettres)</FormLabel>
              <FormControl>
                <Input placeholder="FR" maxLength={2} {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="flagCode"
          rules={{ required: "Le drapeau est requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emoji drapeau</FormLabel>
              <FormControl>
                <Input placeholder="🇫🇷" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="region"
          rules={{ required: "La région est requise" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Région</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une région" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regions.filter(region => region !== 'Tous').map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="cities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Villes (séparées par des virgules)</FormLabel>
              <FormControl>
                <Input placeholder="Paris, Lyon, Marseille" {...field} />
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="px-6 py-6 border-b border-white/20 bg-white/30 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <BrandLogo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-purple-600 transition-colors font-medium flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Admin
            </Link>
            <LanguageSelector />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-light text-gray-900 mb-2">
                Gestion des
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
                  Pays
                </span>
              </h1>
              <p className="text-xl text-gray-700">
                {countries.length} pays dans la base de données
              </p>
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

          {/* Search */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Rechercher un pays..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-white/30 bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Countries Table */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/30">
          <CardHeader>
            <CardTitle>Liste des pays</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Drapeau</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Région</TableHead>
                  <TableHead>Villes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCountries.map((country) => (
                  <TableRow key={country.id}>
                    <TableCell>
                      <span className="text-2xl">{country.flagCode}</span>
                    </TableCell>
                    <TableCell className="font-medium">{country.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{country.code}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{country.region}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{country.cities?.length || 0} villes</span>
                      </div>
                    </TableCell>
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

            {filteredCountries.length === 0 && searchTerm && (
              <div className="text-center py-8">
                <p className="text-xl text-gray-600">
                  Aucun pays trouvé pour "{searchTerm}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le pays</DialogTitle>
            </DialogHeader>
            <CountryForm onSubmit={handleEditCountry} submitLabel="Modifier" />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Countries;
