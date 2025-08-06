import { useState } from 'react';
import { FileText, MapPin, Search, Filter, MoreVertical, Eye, Heart, Bookmark, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const content = [
    {
      id: '1',
      title: 'Restaurant Le Petit Bistrot',
      author: 'Marie Dubois',
      type: 'restaurant',
      status: 'published',
      likes: 234,
      saves: 89,
      views: 1250,
      reports: 0,
      createdAt: '2024-01-15',
      location: 'Paris, France'
    },
    {
      id: '2',
      title: 'Randonnée Mont Blanc',
      author: 'Pierre Legrand',
      type: 'activity',
      status: 'published',
      likes: 198,
      saves: 156,
      views: 980,
      reports: 0,
      createdAt: '2024-01-12',
      location: 'Chamonix, France'
    },
    {
      id: '3',
      title: 'Hôtel Vue Sur Mer',
      author: 'Sophie Chen',
      type: 'hotel',
      status: 'pending',
      likes: 45,
      saves: 23,
      views: 234,
      reports: 1,
      createdAt: '2024-01-18',
      location: 'Nice, France'
    },
    {
      id: '4',
      title: 'POI Commercial - Boutique Mode',
      author: 'Julie Martin',
      type: 'commercial',
      status: 'published',
      likes: 67,
      saves: 34,
      views: 456,
      reports: 0,
      createdAt: '2024-01-10',
      location: 'Lyon, France'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Publié</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">En attente</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Rejeté</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Brouillon</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Inconnu</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'restaurant':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Restaurant</Badge>;
      case 'hotel':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Hôtel</Badge>;
      case 'activity':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Activité</Badge>;
      case 'commercial':
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Commercial</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Autre</Badge>;
    }
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-2">
          Gestion du Contenu
        </h2>
        <p className="text-gray-600">Modérez les recommandations et points d'intérêt de votre plateforme</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Contenu</p>
                <p className="text-xl font-bold">{content.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Publiés</p>
                <p className="text-xl font-bold">{content.filter(c => c.status === 'published').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-100">
                <Flag className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-xl font-bold">{content.filter(c => c.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100">
                <Flag className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Signalements</p>
                <p className="text-xl font-bold">{content.reduce((acc, c) => acc + c.reports, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par titre ou auteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
                size="sm"
              >
                Tous
              </Button>
              <Button
                variant={filterType === 'restaurant' ? 'default' : 'outline'}
                onClick={() => setFilterType('restaurant')}
                size="sm"
              >
                Restaurants
              </Button>
              <Button
                variant={filterType === 'hotel' ? 'default' : 'outline'}
                onClick={() => setFilterType('hotel')}
                size="sm"
              >
                Hôtels
              </Button>
              <Button
                variant={filterType === 'activity' ? 'default' : 'outline'}
                onClick={() => setFilterType('activity')}
                size="sm"
              >
                Activités
              </Button>
              <Button
                variant={filterType === 'commercial' ? 'default' : 'outline'}
                onClick={() => setFilterType('commercial')}
                size="sm"
              >
                Commercial
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Table */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Liste du Contenu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContent.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-2 rounded-full bg-blue-100">
                    {item.type === 'restaurant' && <FileText className="h-5 w-5 text-orange-600" />}
                    {item.type === 'hotel' && <FileText className="h-5 w-5 text-blue-600" />}
                    {item.type === 'activity' && <FileText className="h-5 w-5 text-green-600" />}
                    {item.type === 'commercial' && <MapPin className="h-5 w-5 text-purple-600" />}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">par {item.author}</p>
                    <p className="text-xs text-gray-500">{item.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(item.status)}
                      {getTypeBadge(item.type)}
                      {item.reports > 0 && (
                        <Badge className="bg-red-100 text-red-700 border-red-200">
                          {item.reports} signalement{item.reports > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600 mr-4">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{item.views}</span>
                  </div>
                  <div className="flex items-center gap-1 text-red-500">
                    <Heart className="h-4 w-4" />
                    <span>{item.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-500">
                    <Bookmark className="h-4 w-4" />
                    <span>{item.saves}</span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      Voir détails
                    </DropdownMenuItem>
                    {item.status === 'pending' && (
                      <>
                        <DropdownMenuItem className="text-green-600">
                          <Eye className="h-4 w-4 mr-2" />
                          Approuver
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Flag className="h-4 w-4 mr-2" />
                          Rejeter
                        </DropdownMenuItem>
                      </>
                    )}
                    {item.status === 'published' && (
                      <DropdownMenuItem className="text-red-600">
                        <Flag className="h-4 w-4 mr-2" />
                        Masquer
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;