import { useState } from 'react';
import { ArrowLeft, Plus, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CreatePOIForm from './CreatePOIForm';
import POIList from './POIList';
import { CommercialPOI } from '@/types/commercialPOI';

interface CommercialPOIManagerProps {
  onBack: () => void;
}

const CommercialPOIManager = ({ onBack }: CommercialPOIManagerProps) => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [pois, setPois] = useState<CommercialPOI[]>([]);

  const handleCreatePOI = () => {
    setView('create');
  };

  const handleBackToList = () => {
    setView('list');
  };

  const handlePOICreated = (poi: CommercialPOI) => {
    setPois([...pois, poi]);
    setView('list');
  };

  if (view === 'create') {
    return (
      <CreatePOIForm
        onBack={handleBackToList}
        onPOICreated={handlePOICreated}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8 pt-8">
          <Button variant="ghost" onClick={onBack} className="gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour au profil
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Mes Points d'Intérêt Commerciaux
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              Créez et gérez vos établissements, expériences et services sur la plateforme
            </p>
          </div>
        </div>

        {pois.length === 0 ? (
          <Card className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-xl">
            <CardContent className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <Store className="h-12 w-12 text-purple-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Commencez à commercialiser vos services
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Créez votre premier point d'intérêt commercial et commencez à accueillir des voyageurs du monde entier. 
                Que ce soit un restaurant, un hébergement, une expérience ou un atelier, partagez votre passion !
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-100 to-orange-100 flex items-center justify-center">
                    🍽️
                  </div>
                  <h3 className="font-semibold text-gray-800">Restaurants</h3>
                  <p className="text-sm text-gray-600">Cuisine locale, fine dining</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                    🏨
                  </div>
                  <h3 className="font-semibold text-gray-800">Hébergements</h3>
                  <p className="text-sm text-gray-600">Hôtels, B&B, chambres d'hôtes</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                    🎯
                  </div>
                  <h3 className="font-semibold text-gray-800">Activités</h3>
                  <p className="text-sm text-gray-600">Sports, loisirs, aventure</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                    👨‍🍳
                  </div>
                  <h3 className="font-semibold text-gray-800">Ateliers</h3>
                  <p className="text-sm text-gray-600">Cuisine, artisanat, culture</p>
                </div>
              </div>

              <Button 
                onClick={handleCreatePOI}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2 px-8 py-3 text-lg"
              >
                <Plus className="h-5 w-5" />
                Créer mon premier point d'intérêt
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {pois.length} point{pois.length > 1 ? 's' : ''} d'intérêt
              </h2>
              <Button 
                onClick={handleCreatePOI}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
              >
                <Plus className="h-4 w-4" />
                Nouveau point d'intérêt
              </Button>
            </div>

            <POIList pois={pois} onEdit={() => {}} onDelete={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommercialPOIManager;