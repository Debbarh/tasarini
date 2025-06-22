
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  MapPin, 
  Heart, 
  Star, 
  Calendar, 
  Camera, 
  Settings, 
  Bookmark,
  Share2,
  Edit,
  Plane
} from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { Link } from "react-router-dom";

// Données simulées pour l'utilisateur
const mockUser = {
  id: "1",
  name: "Marie Dubois",
  email: "marie.dubois@email.com",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b900?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  location: "Paris, France",
  memberSince: "2023",
  bio: "Passionnée de voyages et d'aventures authentiques. Toujours à la recherche de nouveaux horizons et d'expériences uniques.",
  stats: {
    tripsCompleted: 12,
    toursCreated: 3,
    recommendations: 28,
    followers: 156
  }
};

const mockTrips = [
  {
    id: "1",
    title: "Aventure au Maroc",
    destination: "Marrakech",
    dates: "15-22 Juillet 2024",
    status: "completed",
    rating: 5,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: "2", 
    title: "Road Trip en Islande",
    destination: "Reykjavik",
    dates: "10-18 Septembre 2024",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
  }
];

const mockTours = [
  {
    id: "1",
    title: "Temples cachés de Kyoto",
    description: "Découverte des temples secrets avec un guide local",
    likes: 45,
    bookmarks: 23,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
  }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="px-6 py-6 border-b border-white/20 bg-white/30 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <BrandLogo />
          </Link>
          
          <div className="flex items-center space-x-6">
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

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Terminer" : "Modifier"}
            </Button>
          </div>
          
          <CardContent className="relative pt-0">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 relative z-10">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="text-2xl">{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{mockUser.name}</h1>
                    <div className="flex items-center gap-4 text-gray-600 mt-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{mockUser.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Membre depuis {mockUser.memberSince}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-3 max-w-2xl">{mockUser.bio}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">{mockUser.stats.tripsCompleted}</div>
                      <div className="text-sm text-gray-600">Voyages</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-pink-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">{mockUser.stats.toursCreated}</div>
                      <div className="text-sm text-gray-600">Tours créés</div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-pink-600">{mockUser.stats.recommendations}</div>
                      <div className="text-sm text-gray-600">Recommandations</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">{mockUser.stats.followers}</div>
                      <div className="text-sm text-gray-600">Abonnés</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="trips">Mes Voyages</TabsTrigger>
            <TabsTrigger value="tours">Mes Tours</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Trips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="w-5 h-5 text-purple-600" />
                    Voyages récents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTrips.slice(0, 2).map((trip) => (
                    <div key={trip.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <img 
                        src={trip.image} 
                        alt={trip.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{trip.title}</h4>
                        <p className="text-sm text-gray-600">{trip.destination} • {trip.dates}</p>
                        <Badge 
                          variant={trip.status === 'completed' ? 'default' : 'secondary'}
                          className="mt-1"
                        >
                          {trip.status === 'completed' ? 'Terminé' : 'À venir'}
                        </Badge>
                      </div>
                      {trip.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{trip.rating}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Favorite Tours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    Tours favoris
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTours.map((tour) => (
                    <div key={tour.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold">{tour.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{tour.description}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-sm">{tour.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bookmark className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">{tour.bookmarks}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{tour.rating}</span>
                            </div>
                          </div>
                        </div>
                        <img 
                          src={tour.image} 
                          alt={tour.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trips Tab */}
          <TabsContent value="trips" className="space-y-6">
            <div className="grid gap-6">
              {mockTrips.map((trip) => (
                <Card key={trip.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <img 
                        src={trip.image} 
                        alt={trip.title}
                        className="w-32 h-32 rounded-2xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{trip.title}</h3>
                            <p className="text-lg text-gray-600 mt-1">{trip.destination}</p>
                            <p className="text-gray-500 mt-2">{trip.dates}</p>
                            <Badge 
                              variant={trip.status === 'completed' ? 'default' : 'secondary'}
                              className="mt-3"
                            >
                              {trip.status === 'completed' ? 'Terminé' : 'À venir'}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4 mr-2" />
                              Partager
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Modifier
                            </Button>
                          </div>
                        </div>
                        {trip.rating && (
                          <div className="flex items-center gap-2 mt-4">
                            <span className="text-sm font-medium">Votre évaluation:</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-4 h-4 ${star <= trip.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            <div className="grid gap-6">
              {mockTours.map((tour) => (
                <Card key={tour.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <img 
                        src={tour.image} 
                        alt={tour.title}
                        className="w-32 h-32 rounded-2xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{tour.title}</h3>
                            <p className="text-gray-600 mt-2">{tour.description}</p>
                            <div className="flex items-center gap-6 mt-4">
                              <div className="flex items-center gap-2">
                                <Heart className="w-5 h-5 text-red-500" />
                                <span className="font-medium">{tour.likes} likes</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Bookmark className="w-5 h-5 text-blue-500" />
                                <span className="font-medium">{tour.bookmarks} favoris</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{tour.rating}/5</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4 mr-2" />
                              Partager
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Modifier
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom complet</Label>
                    <Input id="name" defaultValue={mockUser.name} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={mockUser.email} />
                  </div>
                  <div>
                    <Label htmlFor="location">Localisation</Label>
                    <Input id="location" defaultValue={mockUser.location} />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" defaultValue={mockUser.bio} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Préférences de voyage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="budget">Budget préféré</Label>
                    <Input id="budget" placeholder="Ex: 1000-2000€" />
                  </div>
                  <div>
                    <Label htmlFor="accommodation">Type d'hébergement</Label>
                    <Input id="accommodation" placeholder="Ex: Hôtel 4 étoiles" />
                  </div>
                  <div>
                    <Label htmlFor="interests">Centres d'intérêt</Label>
                    <Input id="interests" placeholder="Ex: Culture, Aventure, Gastronomie" />
                  </div>
                  <div>
                    <Label htmlFor="season">Saison préférée</Label>
                    <Input id="season" placeholder="Ex: Printemps, Été" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Sauvegarder les modifications
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
