import { useState } from 'react';
import { ArrowLeft, User, Settings, Heart, Bookmark, Trophy, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/types/recommendations';
import CommercialPOIManager from './commercial/CommercialPOIManager';
import EditProfileForm from './EditProfileForm';

interface UserDashboardProps {
  user: UserProfile;
  onLogout: () => void;
  onBack?: () => void;
}

const UserDashboard = ({ user, onLogout, onBack }: UserDashboardProps) => {
  const [view, setView] = useState<'dashboard' | 'commercial' | 'edit-profile'>('dashboard');
  const [currentUser, setCurrentUser] = useState<UserProfile>(user);

  const handleCommercialPOI = () => {
    setView('commercial');
  };

  const handleEditProfile = () => {
    setView('edit-profile');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
  };

  const handleSaveProfile = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
    setView('dashboard');
  };

  if (view === 'commercial') {
    return <CommercialPOIManager onBack={handleBackToDashboard} />;
  }

  if (view === 'edit-profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <EditProfileForm
          user={currentUser}
          onSave={handleSaveProfile}
          onCancel={handleBackToDashboard}
        />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-8 pt-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
            )}
            <h1 className="text-2xl font-bold">Mon Profil Voyageur</h1>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Déconnexion
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border border-white/30 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="text-lg">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{currentUser.name}</h2>
                <p className="text-muted-foreground mb-4">{currentUser.email}</p>
                
                <div className="flex gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span>{currentUser.stats.recommendationsSubmitted} recommandations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{currentUser.stats.totalLikes} likes reçus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bookmark className="h-4 w-4 text-blue-500" />
                    <span>{currentUser.stats.totalSaves} sauvegardes</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleEditProfile}
                  className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Settings className="h-4 w-4" />
                  Modifier le profil
                </Button>
                
                <Button 
                  onClick={handleCommercialPOI}
                  className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Store className="h-4 w-4" />
                  Mes Points d'Intérêt
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="recommendations" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl p-1">
            <TabsTrigger 
              value="recommendations" 
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Mes Recommandations
            </TabsTrigger>
            <TabsTrigger 
              value="saved"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Sauvegardées
            </TabsTrigger>
            <TabsTrigger 
              value="commercial"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Points d'Intérêt
            </TabsTrigger>
            <TabsTrigger 
              value="preferences"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Préférences
            </TabsTrigger>
            <TabsTrigger 
              value="stats"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Statistiques
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Mes Recommandations Publiées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <User className="h-10 w-10 text-purple-600" />
                  </div>
                  <p className="text-gray-600 text-lg mb-6">Vous n'avez pas encore publié de recommandations.</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Créer ma première recommandation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Expériences Sauvegardées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Bookmark className="h-10 w-10 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-lg mb-6">Aucune expérience sauvegardée pour le moment.</p>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Découvrir des expériences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commercial" className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Mes Points d'Intérêt Commerciaux</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <Store className="h-10 w-10 text-green-600" />
                  </div>
                  <p className="text-gray-600 text-lg mb-6">Vous n'avez pas encore créé de points d'intérêt commerciaux.</p>
                  <Button 
                    onClick={handleCommercialPOI}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Créer mon premier point d'intérêt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Mes Préférences de Voyage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-pink-500" />
                      Activités préférées
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {currentUser.preferences.activities.length > 0 ? (
                        currentUser.preferences.activities.map((activity) => (
                          <Badge key={activity} className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border-pink-200 px-3 py-1">
                            {activity}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">Aucune préférence définie</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Budget préféré
                    </h3>
                    <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-yellow-200 px-4 py-2 text-base">
                      {currentUser.preferences.budget}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-500" />
                      Type de voyageur
                    </h3>
                    <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 px-4 py-2 text-base">
                      {currentUser.preferences.travelerType}
                    </Badge>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <Button 
                    onClick={handleEditProfile}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Modifier mes préférences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {currentUser.stats.recommendationsSubmitted}
                  </CardTitle>
                  <p className="text-gray-600 font-medium">Recommandations publiées</p>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                    {currentUser.stats.totalLikes}
                  </CardTitle>
                  <p className="text-gray-600 font-medium">Likes reçus</p>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Bookmark className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    {currentUser.stats.totalSaves}
                  </CardTitle>
                  <p className="text-gray-600 font-medium">Fois sauvegardé</p>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;