import { useState } from 'react';
import { Users, Search, Filter, MoreVertical, Shield, Ban, Edit } from 'lucide-react';
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

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const users = [
    {
      id: '1',
      name: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      avatar: '',
      status: 'active',
      role: 'user',
      recommendations: 12,
      likes: 234,
      joinDate: '2024-01-15',
      lastActive: '2024-01-20'
    },
    {
      id: '2',
      name: 'Jean Martin',
      email: 'jean.martin@email.com',
      avatar: '',
      status: 'active',
      role: 'user',
      recommendations: 8,
      likes: 156,
      joinDate: '2024-01-10',
      lastActive: '2024-01-19'
    },
    {
      id: '3',
      name: 'Sophie Chen',
      email: 'sophie.chen@email.com',
      avatar: '',
      status: 'suspended',
      role: 'commercial',
      recommendations: 25,
      likes: 445,
      joinDate: '2023-12-05',
      lastActive: '2024-01-18'
    },
    {
      id: '4',
      name: 'Alexandre Roy',
      email: 'alex.roy@email.com',
      avatar: '',
      status: 'active',
      role: 'admin',
      recommendations: 3,
      likes: 89,
      joinDate: '2023-11-20',
      lastActive: '2024-01-20'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Actif</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Suspendu</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Inactif</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Inconnu</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Admin</Badge>;
      case 'commercial':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Commercial</Badge>;
      case 'user':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Utilisateur</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Utilisateur</Badge>;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-2">
          Gestion des Utilisateurs
        </h2>
        <p className="text-gray-600">Gérez les comptes utilisateurs de votre plateforme</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Utilisateurs</p>
                <p className="text-xl font-bold">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Actifs</p>
                <p className="text-xl font-bold">{users.filter(u => u.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100">
                <Ban className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Suspendus</p>
                <p className="text-xl font-bold">{users.filter(u => u.status === 'suspended').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-100">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
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
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                size="sm"
              >
                Tous
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('active')}
                size="sm"
              >
                Actifs
              </Button>
              <Button
                variant={filterStatus === 'suspended' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('suspended')}
                size="sm"
              >
                Suspendus
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Liste des Utilisateurs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(user.status)}
                      {getRoleBadge(user.role)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{user.recommendations}</p>
                    <p>Recommandations</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{user.likes}</p>
                    <p>Likes</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{user.joinDate}</p>
                    <p>Inscription</p>
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
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Shield className="h-4 w-4 mr-2" />
                      Changer le rôle
                    </DropdownMenuItem>
                    {user.status === 'active' ? (
                      <DropdownMenuItem className="text-red-600">
                        <Ban className="h-4 w-4 mr-2" />
                        Suspendre
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="text-green-600">
                        <Shield className="h-4 w-4 mr-2" />
                        Réactiver
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

export default UserManagement;