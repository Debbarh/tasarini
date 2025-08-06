import { useState, useMemo } from 'react';
import { Cog, Database, Shield, Plus, Edit, Trash2, Globe, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countriesData, Country } from '@/data/countries';
import { travelSegments } from '@/constants/stepConfigs';

const SystemSettings = () => {
  const [countries, setCountries] = useState<Country[]>(countriesData);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Cities management state
  const [selectedCity, setSelectedCity] = useState<{ name: string; countryId: string; country: string } | null>(null);
  const [isAddCityDialogOpen, setIsAddCityDialogOpen] = useState(false);
  const [isEditCityDialogOpen, setIsEditCityDialogOpen] = useState(false);
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [newCityData, setNewCityData] = useState({
    name: '',
    countryId: ''
  });

  // Travel segments management state
  const [segments, setSegments] = useState(travelSegments);
  const [selectedSegment, setSelectedSegment] = useState<any>(null);
  const [isAddSegmentDialogOpen, setIsAddSegmentDialogOpen] = useState(false);
  const [isEditSegmentDialogOpen, setIsEditSegmentDialogOpen] = useState(false);
  const [segmentSearchTerm, setSegmentSearchTerm] = useState('');
  const [newSegmentData, setNewSegmentData] = useState({
    id: '',
    name: '',
    desc: '',
    emoji: '',
    subSegments: [] as any[]
  });
  const [newSubSegment, setNewSubSegment] = useState({
    id: '',
    name: '',
    desc: '',
    emoji: ''
  });

  // Cuisine management state
  const [cuisineTypes, setCuisineTypes] = useState([
    { id: 'french', name: 'Française', emoji: '🇫🇷', desc: 'Gastronomie raffinée' },
    { id: 'italian', name: 'Italienne', emoji: '🇮🇹', desc: 'Pâtes et pizza authentiques' },
    { id: 'asian', name: 'Asiatique', emoji: '🥢', desc: 'Saveurs d\'Asie' },
    { id: 'mediterranean', name: 'Méditerranéenne', emoji: '🫒', desc: 'Cuisine saine et savoureuse' },
    { id: 'mexican', name: 'Mexicaine', emoji: '🌮', desc: 'Épices et saveurs authentiques' },
    { id: 'indian', name: 'Indienne', emoji: '🍛', desc: 'Épices et curry' },
    { id: 'japanese', name: 'Japonaise', emoji: '🍣', desc: 'Sushi et cuisine traditionnelle' },
    { id: 'thai', name: 'Thaïlandaise', emoji: '🌶️', desc: 'Équilibre sucré-salé-épicé' },
    { id: 'local', name: 'Cuisine locale', emoji: '🏠', desc: 'Spécialités de la région' },
    { id: 'vegetarian', name: 'Végétarienne', emoji: '🥗', desc: 'Options sans viande' },
    { id: 'vegan', name: 'Végane', emoji: '🌱', desc: '100% végétal' },
    { id: 'street-food', name: 'Street Food', emoji: '🥙', desc: 'Cuisine de rue authentique' }
  ]);
  
  const [experienceTypes, setExperienceTypes] = useState([
    { id: 'fine-dining', name: 'Gastronomie Fine', emoji: '🍽️', desc: 'Restaurants étoilés et haute cuisine' },
    { id: 'local-markets', name: 'Marchés Locaux', emoji: '🛒', desc: 'Découverte des produits locaux' },
    { id: 'cooking-classes', name: 'Cours de Cuisine', emoji: '👨‍🍳', desc: 'Apprendre à cuisiner local' },
    { id: 'food-tours', name: 'Tours Gastronomiques', emoji: '🚶‍♂️', desc: 'Visites guidées culinaires' },
    { id: 'wine-tasting', name: 'Dégustation de Vins', emoji: '🍷', desc: 'Œnologie et vignobles' },
    { id: 'casual-dining', name: 'Restaurants Décontractés', emoji: '🍽️', desc: 'Bonne cuisine sans chichi' }
  ]);
  
  const [cuisineDialogOpen, setCuisineDialogOpen] = useState(false);
  const [experienceDialogOpen, setExperienceDialogOpen] = useState(false);
  const [editingCuisine, setEditingCuisine] = useState<any>(null);
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [cuisineForm, setCuisineForm] = useState({ id: '', name: '', emoji: '', desc: '' });
  const [experienceForm, setExperienceForm] = useState({ id: '', name: '', emoji: '', desc: '' });

  const [newCountry, setNewCountry] = useState({
    name: '',
    code: '',
    flagCode: '',
    region: '',
    cities: [] as string[]
  });

  const [newCity, setNewCity] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cities data management
  const allCities = useMemo(() => {
    const cities: { name: string; countryId: string; country: string }[] = [];
    countries.forEach(country => {
      if (country.cities) {
        country.cities.forEach(city => {
          cities.push({
            name: city,
            countryId: country.id,
            country: country.name
          });
        });
      }
    });
    return cities;
  }, [countries]);

  const filteredCities = allCities.filter(city =>
    city.name.toLowerCase().includes(citySearchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(citySearchTerm.toLowerCase())
  );

  // Travel segments data management
  const filteredSegments = segments.filter(segment =>
    segment.name.toLowerCase().includes(segmentSearchTerm.toLowerCase()) ||
    segment.desc.toLowerCase().includes(segmentSearchTerm.toLowerCase())
  );

  // Travel segments CRUD functions
  const handleAddSegment = () => {
    if (newSegmentData.id && newSegmentData.name && newSegmentData.desc && newSegmentData.emoji) {
      const segment = {
        id: newSegmentData.id,
        name: newSegmentData.name,
        desc: newSegmentData.desc,
        emoji: newSegmentData.emoji,
        subSegments: newSegmentData.subSegments
      };
      setSegments([...segments, segment]);
      setNewSegmentData({ id: '', name: '', desc: '', emoji: '', subSegments: [] });
      setIsAddSegmentDialogOpen(false);
    }
  };

  const handleEditSegment = () => {
    if (selectedSegment) {
      setSegments(segments.map(s => 
        s.id === selectedSegment.id ? selectedSegment : s
      ));
      setIsEditSegmentDialogOpen(false);
      setSelectedSegment(null);
    }
  };

  const handleDeleteSegment = (id: string) => {
    setSegments(segments.filter(s => s.id !== id));
  };

  const addSubSegmentToNew = () => {
    if (newSubSegment.id && newSubSegment.name && newSubSegment.desc && newSubSegment.emoji) {
      setNewSegmentData({
        ...newSegmentData,
        subSegments: [...newSegmentData.subSegments, { ...newSubSegment }]
      });
      setNewSubSegment({ id: '', name: '', desc: '', emoji: '' });
    }
  };

  const removeSubSegmentFromNew = (index: number) => {
    setNewSegmentData({
      ...newSegmentData,
      subSegments: newSegmentData.subSegments.filter((_, i) => i !== index)
    });
  };

  const addSubSegmentToSelected = () => {
    if (newSubSegment.id && newSubSegment.name && newSubSegment.desc && newSubSegment.emoji && selectedSegment) {
      setSelectedSegment({
        ...selectedSegment,
        subSegments: [...(selectedSegment.subSegments || []), { ...newSubSegment }]
      });
      setNewSubSegment({ id: '', name: '', desc: '', emoji: '' });
    }
  };

  const removeSubSegmentFromSelected = (index: number) => {
    if (selectedSegment) {
      setSelectedSegment({
        ...selectedSegment,
        subSegments: selectedSegment.subSegments?.filter((_, i) => i !== index) || []
      });
    }
  };

  const handleAddCountry = () => {
    if (newCountry.name && newCountry.code && newCountry.flagCode && newCountry.region) {
      const country: Country = {
        id: `${countries.length + 1}`,
        name: newCountry.name,
        code: newCountry.code,
        flagCode: newCountry.flagCode,
        region: newCountry.region,
        cities: newCountry.cities
      };
      setCountries([...countries, country]);
      setNewCountry({ name: '', code: '', flagCode: '', region: '', cities: [] });
      setIsAddDialogOpen(false);
    }
  };

  // Fonctions pour les cuisines
  const handleCuisineSubmit = () => {
    if (editingCuisine) {
      setCuisineTypes(cuisineTypes.map(c => c.id === editingCuisine.id ? { ...cuisineForm } : c));
      toast({ title: "Type de cuisine modifié avec succès" });
    } else {
      setCuisineTypes([...cuisineTypes, { ...cuisineForm }]);
      toast({ title: "Type de cuisine ajouté avec succès" });
    }
    setCuisineDialogOpen(false);
    setEditingCuisine(null);
    setCuisineForm({ id: '', name: '', emoji: '', desc: '' });
  };

  const handleCuisineEdit = (cuisine: any) => {
    setEditingCuisine(cuisine);
    setCuisineForm({ ...cuisine });
    setCuisineDialogOpen(true);
  };

  const handleCuisineDelete = (cuisineId: string) => {
    setCuisineTypes(cuisineTypes.filter(c => c.id !== cuisineId));
    toast({ title: "Type de cuisine supprimé avec succès" });
  };

  // Fonctions pour les expériences
  const handleExperienceSubmit = () => {
    if (editingExperience) {
      setExperienceTypes(experienceTypes.map(e => e.id === editingExperience.id ? { ...experienceForm } : e));
      toast({ title: "Expérience culinaire modifiée avec succès" });
    } else {
      setExperienceTypes([...experienceTypes, { ...experienceForm }]);
      toast({ title: "Expérience culinaire ajoutée avec succès" });
    }
    setExperienceDialogOpen(false);
    setEditingExperience(null);
    setExperienceForm({ id: '', name: '', emoji: '', desc: '' });
  };

  const handleExperienceEdit = (experience: any) => {
    setEditingExperience(experience);
    setExperienceForm({ ...experience });
    setExperienceDialogOpen(true);
  };

  const handleExperienceDelete = (experienceId: string) => {
    setExperienceTypes(experienceTypes.filter(e => e.id !== experienceId));
    toast({ title: "Expérience culinaire supprimée avec succès" });
  };

  const handleEditCountry = () => {
    if (selectedCountry) {
      setCountries(countries.map(c => 
        c.id === selectedCountry.id ? selectedCountry : c
      ));
      setIsEditDialogOpen(false);
      setSelectedCountry(null);
    }
  };

  const handleDeleteCountry = (id: string) => {
    setCountries(countries.filter(c => c.id !== id));
  };

  const addCityToNewCountry = () => {
    if (newCity.trim()) {
      setNewCountry({
        ...newCountry,
        cities: [...newCountry.cities, newCity.trim()]
      });
      setNewCity('');
    }
  };

  const removeCityFromNewCountry = (index: number) => {
    setNewCountry({
      ...newCountry,
      cities: newCountry.cities.filter((_, i) => i !== index)
    });
  };

  const addCityToSelectedCountry = () => {
    if (newCity.trim() && selectedCountry) {
      setSelectedCountry({
        ...selectedCountry,
        cities: [...(selectedCountry.cities || []), newCity.trim()]
      });
      setNewCity('');
    }
  };

  const removeCityFromSelectedCountry = (index: number) => {
    if (selectedCountry) {
      setSelectedCountry({
        ...selectedCountry,
        cities: selectedCountry.cities?.filter((_, i) => i !== index) || []
      });
    }
  };

  // Cities CRUD functions
  const handleAddCity = () => {
    if (newCityData.name && newCityData.countryId) {
      setCountries(countries.map(country => 
        country.id === newCityData.countryId 
          ? { ...country, cities: [...(country.cities || []), newCityData.name] }
          : country
      ));
      setNewCityData({ name: '', countryId: '' });
      setIsAddCityDialogOpen(false);
    }
  };

  const handleEditCity = () => {
    if (selectedCity && newCityData.name) {
      setCountries(countries.map(country => {
        if (country.id === selectedCity.countryId) {
          const updatedCities = country.cities?.map(city => 
            city === selectedCity.name ? newCityData.name : city
          ) || [];
          return { ...country, cities: updatedCities };
        }
        return country;
      }));
      setSelectedCity(null);
      setNewCityData({ name: '', countryId: '' });
      setIsEditCityDialogOpen(false);
    }
  };

  const handleDeleteCity = (cityName: string, countryId: string) => {
    setCountries(countries.map(country => 
      country.id === countryId 
        ? { ...country, cities: country.cities?.filter(city => city !== cityName) || [] }
        : country
    ));
  };

  const CountryForm = ({ country, isEdit = false }: { country: any, isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nom du pays</Label>
          <Input
            id="name"
            value={country.name}
            onChange={(e) => isEdit 
              ? setSelectedCountry({...selectedCountry!, name: e.target.value})
              : setNewCountry({...newCountry, name: e.target.value})
            }
            placeholder="France"
          />
        </div>
        <div>
          <Label htmlFor="code">Code pays</Label>
          <Input
            id="code"
            value={country.code}
            onChange={(e) => isEdit 
              ? setSelectedCountry({...selectedCountry!, code: e.target.value})
              : setNewCountry({...newCountry, code: e.target.value})
            }
            placeholder="FR"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="flagCode">Emoji drapeau</Label>
          <Input
            id="flagCode"
            value={country.flagCode}
            onChange={(e) => isEdit 
              ? setSelectedCountry({...selectedCountry!, flagCode: e.target.value})
              : setNewCountry({...newCountry, flagCode: e.target.value})
            }
            placeholder="🇫🇷"
          />
        </div>
        <div>
          <Label htmlFor="region">Région</Label>
          <Input
            id="region"
            value={country.region}
            onChange={(e) => isEdit 
              ? setSelectedCountry({...selectedCountry!, region: e.target.value})
              : setNewCountry({...newCountry, region: e.target.value})
            }
            placeholder="Europe"
          />
        </div>
      </div>

      <div>
        <Label>Villes</Label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="Ajouter une ville"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  isEdit ? addCityToSelectedCountry() : addCityToNewCountry();
                }
              }}
            />
            <Button 
              type="button"
              onClick={isEdit ? addCityToSelectedCountry : addCityToNewCountry}
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {country.cities?.map((city: string, index: number) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {city}
                <button
                  type="button"
                  onClick={() => isEdit ? removeCityFromSelectedCountry(index) : removeCityFromNewCountry(index)}
                  className="ml-1 hover:text-red-600"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-2">
          Paramètres Système
        </h2>
        <p className="text-gray-600">Configuration technique de la plateforme</p>
      </div>

      <Tabs defaultValue="countries" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="countries">Pays</TabsTrigger>
          <TabsTrigger value="cities">Villes</TabsTrigger>
          <TabsTrigger value="travel-segments">Profils Voyage</TabsTrigger>
          <TabsTrigger value="system">Configuration</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="countries">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Gestion des Pays
                </CardTitle>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Ajouter un pays
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Ajouter un nouveau pays</DialogTitle>
                    </DialogHeader>
                    <CountryForm country={newCountry} />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleAddCountry}>
                        Ajouter
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Rechercher un pays ou une région..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
                <Badge variant="outline">{filteredCountries.length} pays</Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pays</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Région</TableHead>
                      <TableHead>Villes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCountries.map((country) => (
                      <TableRow key={country.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{country.flagCode}</span>
                            {country.name}
                          </div>
                        </TableCell>
                        <TableCell>{country.code}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{country.region}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {country.cities?.length || 0} villes
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Dialog open={isEditDialogOpen && selectedCountry?.id === country.id} onOpenChange={setIsEditDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedCountry(country)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Modifier {selectedCountry?.name}</DialogTitle>
                                </DialogHeader>
                                {selectedCountry && <CountryForm country={selectedCountry} isEdit />}
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" onClick={() => {
                                    setIsEditDialogOpen(false);
                                    setSelectedCountry(null);
                                  }}>
                                    Annuler
                                  </Button>
                                  <Button onClick={handleEditCountry}>
                                    Sauvegarder
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCountry(country.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          </TabsContent>

          {/* Onglet Expériences Culinaires */}
          <TabsContent value="cuisine" className="space-y-6">
            {/* Types de Cuisine */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Types de Cuisine</CardTitle>
                  <CardDescription>Gérer les types de cuisine disponibles</CardDescription>
                </div>
                <Button 
                  onClick={() => {
                    setEditingCuisine(null);
                    setCuisineForm({ id: '', name: '', emoji: '', desc: '' });
                    setCuisineDialogOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un type de cuisine
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Emoji</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cuisineTypes.map((cuisine) => (
                      <TableRow key={cuisine.id}>
                        <TableCell className="font-mono text-sm">{cuisine.id}</TableCell>
                        <TableCell className="text-xl">{cuisine.emoji}</TableCell>
                        <TableCell className="font-medium">{cuisine.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{cuisine.desc}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCuisineEdit(cuisine)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCuisineDelete(cuisine.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Expériences Culinaires */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Expériences Culinaires</CardTitle>
                  <CardDescription>Gérer les expériences culinaires proposées</CardDescription>
                </div>
                <Button 
                  onClick={() => {
                    setEditingExperience(null);
                    setExperienceForm({ id: '', name: '', emoji: '', desc: '' });
                    setExperienceDialogOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une expérience
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Emoji</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {experienceTypes.map((experience) => (
                      <TableRow key={experience.id}>
                        <TableCell className="font-mono text-sm">{experience.id}</TableCell>
                        <TableCell className="text-xl">{experience.emoji}</TableCell>
                        <TableCell className="font-medium">{experience.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{experience.desc}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleExperienceEdit(experience)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleExperienceDelete(experience.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

        <TabsContent value="cities">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Gestion des Villes
                </CardTitle>
                <Dialog open={isAddCityDialogOpen} onOpenChange={setIsAddCityDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Ajouter une ville
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Ajouter une nouvelle ville</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cityName">Nom de la ville</Label>
                        <Input
                          id="cityName"
                          value={newCityData.name}
                          onChange={(e) => setNewCityData({...newCityData, name: e.target.value})}
                          placeholder="Paris"
                        />
                      </div>
                      <div>
                        <Label htmlFor="countrySelect">Pays</Label>
                        <Select 
                          value={newCityData.countryId} 
                          onValueChange={(value) => setNewCityData({...newCityData, countryId: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un pays" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.id} value={country.id}>
                                <div className="flex items-center gap-2">
                                  <span>{country.flagCode}</span>
                                  {country.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddCityDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleAddCity}>
                        Ajouter
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Rechercher une ville ou un pays..."
                  value={citySearchTerm}
                  onChange={(e) => setCitySearchTerm(e.target.value)}
                  className="max-w-md"
                />
                <Badge variant="outline">{filteredCities.length} villes</Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ville</TableHead>
                      <TableHead>Pays</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCities.map((city, index) => (
                      <TableRow key={`${city.countryId}-${city.name}-${index}`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {city.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {countries.find(c => c.id === city.countryId)?.flagCode}
                            </span>
                            {city.country}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Dialog 
                              open={isEditCityDialogOpen && selectedCity?.name === city.name && selectedCity?.countryId === city.countryId} 
                              onOpenChange={setIsEditCityDialogOpen}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedCity(city);
                                    setNewCityData({ name: city.name, countryId: city.countryId });
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Modifier {selectedCity?.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="editCityName">Nom de la ville</Label>
                                    <Input
                                      id="editCityName"
                                      value={newCityData.name}
                                      onChange={(e) => setNewCityData({...newCityData, name: e.target.value})}
                                      placeholder="Paris"
                                    />
                                  </div>
                                  <div>
                                    <Label>Pays actuel</Label>
                                    <div className="flex items-center gap-2 p-2 border rounded">
                                      <span>{countries.find(c => c.id === selectedCity?.countryId)?.flagCode}</span>
                                      {selectedCity?.country}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" onClick={() => {
                                    setIsEditCityDialogOpen(false);
                                    setSelectedCity(null);
                                  }}>
                                    Annuler
                                  </Button>
                                  <Button onClick={handleEditCity}>
                                    Sauvegarder
                                  </Button>
                                </div>
                              </DialogContent>
        </Dialog>

        {/* Dialog pour Types de Cuisine */}
        <Dialog open={cuisineDialogOpen} onOpenChange={setCuisineDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCuisine ? 'Modifier le type de cuisine' : 'Ajouter un type de cuisine'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cuisine-id">ID (unique)</Label>
                <Input
                  id="cuisine-id"
                  value={cuisineForm.id}
                  onChange={(e) => setCuisineForm({ ...cuisineForm, id: e.target.value })}
                  placeholder="Ex: french"
                  disabled={!!editingCuisine}
                />
              </div>
              <div>
                <Label htmlFor="cuisine-name">Nom</Label>
                <Input
                  id="cuisine-name"
                  value={cuisineForm.name}
                  onChange={(e) => setCuisineForm({ ...cuisineForm, name: e.target.value })}
                  placeholder="Ex: Française"
                />
              </div>
              <div>
                <Label htmlFor="cuisine-emoji">Emoji</Label>
                <Input
                  id="cuisine-emoji"
                  value={cuisineForm.emoji}
                  onChange={(e) => setCuisineForm({ ...cuisineForm, emoji: e.target.value })}
                  placeholder="Ex: 🇫🇷"
                />
              </div>
              <div>
                <Label htmlFor="cuisine-desc">Description</Label>
                <Input
                  id="cuisine-desc"
                  value={cuisineForm.desc}
                  onChange={(e) => setCuisineForm({ ...cuisineForm, desc: e.target.value })}
                  placeholder="Ex: Gastronomie raffinée"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setCuisineDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCuisineSubmit}>
                  {editingCuisine ? 'Modifier' : 'Ajouter'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog pour Expériences Culinaires */}
        <Dialog open={experienceDialogOpen} onOpenChange={setExperienceDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingExperience ? 'Modifier l\'expérience culinaire' : 'Ajouter une expérience culinaire'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="experience-id">ID (unique)</Label>
                <Input
                  id="experience-id"
                  value={experienceForm.id}
                  onChange={(e) => setExperienceForm({ ...experienceForm, id: e.target.value })}
                  placeholder="Ex: fine-dining"
                  disabled={!!editingExperience}
                />
              </div>
              <div>
                <Label htmlFor="experience-name">Nom</Label>
                <Input
                  id="experience-name"
                  value={experienceForm.name}
                  onChange={(e) => setExperienceForm({ ...experienceForm, name: e.target.value })}
                  placeholder="Ex: Gastronomie Fine"
                />
              </div>
              <div>
                <Label htmlFor="experience-emoji">Emoji</Label>
                <Input
                  id="experience-emoji"
                  value={experienceForm.emoji}
                  onChange={(e) => setExperienceForm({ ...experienceForm, emoji: e.target.value })}
                  placeholder="Ex: 🍽️"
                />
              </div>
              <div>
                <Label htmlFor="experience-desc">Description</Label>
                <Input
                  id="experience-desc"
                  value={experienceForm.desc}
                  onChange={(e) => setExperienceForm({ ...experienceForm, desc: e.target.value })}
                  placeholder="Ex: Restaurants étoilés et haute cuisine"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setExperienceDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleExperienceSubmit}>
                  {editingExperience ? 'Modifier' : 'Ajouter'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCity(city.name, city.countryId)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="travel-segments">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Profils de Voyage
                </CardTitle>
                <Dialog open={isAddSegmentDialogOpen} onOpenChange={setIsAddSegmentDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Ajouter un profil
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Ajouter un nouveau profil de voyage</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="segmentId">ID du profil</Label>
                          <Input
                            id="segmentId"
                            value={newSegmentData.id}
                            onChange={(e) => setNewSegmentData({...newSegmentData, id: e.target.value})}
                            placeholder="solo"
                          />
                        </div>
                        <div>
                          <Label htmlFor="segmentEmoji">Emoji</Label>
                          <Input
                            id="segmentEmoji"
                            value={newSegmentData.emoji}
                            onChange={(e) => setNewSegmentData({...newSegmentData, emoji: e.target.value})}
                            placeholder="🧳"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="segmentName">Nom du profil</Label>
                        <Input
                          id="segmentName"
                          value={newSegmentData.name}
                          onChange={(e) => setNewSegmentData({...newSegmentData, name: e.target.value})}
                          placeholder="En solo"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="segmentDesc">Description</Label>
                        <Textarea
                          id="segmentDesc"
                          value={newSegmentData.desc}
                          onChange={(e) => setNewSegmentData({...newSegmentData, desc: e.target.value})}
                          placeholder="Voyage en solitaire pour une expérience personnelle"
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label>Sous-profils</Label>
                        <div className="space-y-3">
                          <div className="border rounded-lg p-4 space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                value={newSubSegment.id}
                                onChange={(e) => setNewSubSegment({...newSubSegment, id: e.target.value})}
                                placeholder="ID sous-profil"
                              />
                              <Input
                                value={newSubSegment.emoji}
                                onChange={(e) => setNewSubSegment({...newSubSegment, emoji: e.target.value})}
                                placeholder="Emoji"
                              />
                            </div>
                            <Input
                              value={newSubSegment.name}
                              onChange={(e) => setNewSubSegment({...newSubSegment, name: e.target.value})}
                              placeholder="Nom du sous-profil"
                            />
                            <Textarea
                              value={newSubSegment.desc}
                              onChange={(e) => setNewSubSegment({...newSubSegment, desc: e.target.value})}
                              placeholder="Description du sous-profil"
                              rows={2}
                            />
                            <Button type="button" onClick={addSubSegmentToNew} size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Ajouter le sous-profil
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                            {newSegmentData.subSegments.map((subSegment, index) => (
                              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                <span>{subSegment.emoji}</span>
                                {subSegment.name}
                                <button
                                  type="button"
                                  onClick={() => removeSubSegmentFromNew(index)}
                                  className="ml-1 hover:text-red-600"
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddSegmentDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleAddSegment}>
                        Ajouter
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Rechercher un profil..."
                  value={segmentSearchTerm}
                  onChange={(e) => setSegmentSearchTerm(e.target.value)}
                  className="max-w-md"
                />
                <Badge variant="outline">{filteredSegments.length} profils</Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Profil</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Sous-profils</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSegments.map((segment) => (
                      <TableRow key={segment.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{segment.emoji}</span>
                            <div>
                              <div className="font-semibold">{segment.name}</div>
                              <div className="text-xs text-muted-foreground">ID: {segment.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="text-sm text-gray-600 truncate">
                            {segment.desc}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {segment.subSegments?.map((sub, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <span className="mr-1">{sub.emoji}</span>
                                {sub.name}
                              </Badge>
                            ))}
                            {(!segment.subSegments || segment.subSegments.length === 0) && (
                              <span className="text-xs text-muted-foreground">Aucun sous-profil</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Dialog open={isEditSegmentDialogOpen && selectedSegment?.id === segment.id} onOpenChange={setIsEditSegmentDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedSegment({...segment})}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Modifier {selectedSegment?.name}</DialogTitle>
                                </DialogHeader>
                                {selectedSegment && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label htmlFor="editSegmentId">ID du profil</Label>
                                        <Input
                                          id="editSegmentId"
                                          value={selectedSegment.id}
                                          onChange={(e) => setSelectedSegment({...selectedSegment, id: e.target.value})}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="editSegmentEmoji">Emoji</Label>
                                        <Input
                                          id="editSegmentEmoji"
                                          value={selectedSegment.emoji}
                                          onChange={(e) => setSelectedSegment({...selectedSegment, emoji: e.target.value})}
                                        />
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <Label htmlFor="editSegmentName">Nom du profil</Label>
                                      <Input
                                        id="editSegmentName"
                                        value={selectedSegment.name}
                                        onChange={(e) => setSelectedSegment({...selectedSegment, name: e.target.value})}
                                      />
                                    </div>
                                    
                                    <div>
                                      <Label htmlFor="editSegmentDesc">Description</Label>
                                      <Textarea
                                        id="editSegmentDesc"
                                        value={selectedSegment.desc}
                                        onChange={(e) => setSelectedSegment({...selectedSegment, desc: e.target.value})}
                                        rows={2}
                                      />
                                    </div>

                                    <div>
                                      <Label>Sous-profils</Label>
                                      <div className="space-y-3">
                                        <div className="border rounded-lg p-4 space-y-3">
                                          <div className="grid grid-cols-2 gap-2">
                                            <Input
                                              value={newSubSegment.id}
                                              onChange={(e) => setNewSubSegment({...newSubSegment, id: e.target.value})}
                                              placeholder="ID sous-profil"
                                            />
                                            <Input
                                              value={newSubSegment.emoji}
                                              onChange={(e) => setNewSubSegment({...newSubSegment, emoji: e.target.value})}
                                              placeholder="Emoji"
                                            />
                                          </div>
                                          <Input
                                            value={newSubSegment.name}
                                            onChange={(e) => setNewSubSegment({...newSubSegment, name: e.target.value})}
                                            placeholder="Nom du sous-profil"
                                          />
                                          <Textarea
                                            value={newSubSegment.desc}
                                            onChange={(e) => setNewSubSegment({...newSubSegment, desc: e.target.value})}
                                            placeholder="Description du sous-profil"
                                            rows={2}
                                          />
                                          <Button type="button" onClick={addSubSegmentToSelected} size="sm">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Ajouter le sous-profil
                                          </Button>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                                          {selectedSegment.subSegments?.map((subSegment, index) => (
                                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                              <span>{subSegment.emoji}</span>
                                              {subSegment.name}
                                              <button
                                                type="button"
                                                onClick={() => removeSubSegmentFromSelected(index)}
                                                className="ml-1 hover:text-red-600"
                                              >
                                                ×
                                              </button>
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" onClick={() => {
                                    setIsEditSegmentDialogOpen(false);
                                    setSelectedSegment(null);
                                  }}>
                                    Annuler
                                  </Button>
                                  <Button onClick={handleEditSegment}>
                                    Sauvegarder
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSegment(segment.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog className="h-5 w-5" />
                Configuration Système
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Paramètres système avancés</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Paramètres de Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Configuration sécurité</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;