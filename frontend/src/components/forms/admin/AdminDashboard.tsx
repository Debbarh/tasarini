import { Users, FileText, BarChart3, TrendingUp, Eye, Heart, Bookmark, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Utilisateurs Total',
      value: '2,547',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Recommandations',
      value: '1,834',
      change: '+8%',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Vues Mensuelles',
      value: '45.2K',
      change: '+23%',
      changeType: 'positive' as const,
      icon: Eye,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Engagement',
      value: '89.5%',
      change: '+5%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentActivity = [
    {
      user: 'Marie Dubois',
      action: 'A publié une nouvelle recommandation',
      location: 'Paris, France',
      time: 'Il y a 2 minutes',
      type: 'recommendation'
    },
    {
      user: 'Jean Martin',
      action: 'S\'est inscrit sur la plateforme',
      location: 'Lyon, France',
      time: 'Il y a 15 minutes',
      type: 'user'
    },
    {
      user: 'Sophie Chen',
      action: 'A créé un POI commercial',
      location: 'Nice, France',
      time: 'Il y a 1 heure',
      type: 'poi'
    },
    {
      user: 'Alexandre Roy',
      action: 'A sauvegardé 5 expériences',
      location: 'Bordeaux, France',
      time: 'Il y a 2 heures',
      type: 'save'
    }
  ];

  const topRecommendations = [
    {
      title: 'Restaurant Le Petit Bistrot',
      author: 'Marie Dubois',
      likes: 234,
      saves: 89,
      location: 'Paris'
    },
    {
      title: 'Randonnée Mont Blanc',
      author: 'Pierre Legrand',
      likes: 198,
      saves: 156,
      location: 'Chamonix'
    },
    {
      title: 'Marché de Provence',
      author: 'Julie Martin',
      likes: 167,
      saves: 78,
      location: 'Aix-en-Provence'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-2">
          Tableau de Bord
        </h2>
        <p className="text-gray-600">Vue d'ensemble de votre plateforme TASARINI</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <Badge className={`bg-gradient-to-r ${stat.color} text-white px-2 py-1 text-xs`}>
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Activité Récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'recommendation' ? 'bg-green-100 text-green-600' :
                    activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'poi' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {activity.type === 'recommendation' && <FileText className="h-4 w-4" />}
                    {activity.type === 'user' && <Users className="h-4 w-4" />}
                    {activity.type === 'poi' && <MapPin className="h-4 w-4" />}
                    {activity.type === 'save' && <Bookmark className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-500">{activity.location}</p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Recommendations */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Recommandations Populaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRecommendations.map((rec, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-green-50/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <p className="text-sm text-gray-600">par {rec.author}</p>
                    <p className="text-xs text-gray-500">{rec.location}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-red-500">
                      <Heart className="h-4 w-4" />
                      <span>{rec.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-500">
                      <Bookmark className="h-4 w-4" />
                      <span>{rec.saves}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="p-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Users className="h-6 w-6 mb-2" />
              <h3 className="font-semibold">Gérer Utilisateurs</h3>
              <p className="text-sm text-blue-100">Modérer les comptes</p>
            </button>
            
            <button className="p-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              <FileText className="h-6 w-6 mb-2" />
              <h3 className="font-semibold">Modérer Contenu</h3>
              <p className="text-sm text-green-100">Réviser les publications</p>
            </button>
            
            <button className="p-4 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              <BarChart3 className="h-6 w-6 mb-2" />
              <h3 className="font-semibold">Voir Analytics</h3>
              <p className="text-sm text-purple-100">Analyser les données</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;