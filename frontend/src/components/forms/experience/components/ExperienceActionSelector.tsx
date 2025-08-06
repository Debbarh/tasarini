import { Plus, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExperienceActionSelectorProps {
  onActionSelect: (action: 'create' | 'discover') => void;
}

const ExperienceActionSelector = ({ onActionSelect }: ExperienceActionSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto pt-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Moteur de Recommandation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Partagez vos meilleures expériences de voyage ou découvrez de nouveaux lieux recommandés par la communauté
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 hover:border-purple-200 bg-white/80 backdrop-blur-sm hover:bg-white/95 hover:scale-105"
                onClick={() => onActionSelect('create')}>
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg">
                <Plus className="h-10 w-10 text-purple-600" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Recommander une Expérience</CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg">
                Partagez vos découvertes et aidez d'autres voyageurs à vivre des expériences inoubliables
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                  Tours et programmes de voyage
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                  Restaurants et hébergements
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                  Activités et événements
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                  Conseils pratiques
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
                Commencer à recommander
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 hover:border-blue-200 bg-white/80 backdrop-blur-sm hover:bg-white/95 hover:scale-105"
                onClick={() => onActionSelect('discover')}>
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg">
                <Search className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Découvrir des Expériences</CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg">
                Explorez les recommandations de la communauté et trouvez votre prochaine aventure
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
                  Recherche par localisation
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
                  Filtres par catégories
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
                  Notes et avis détaillés
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
                  Sauvegarder vos favoris
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
                Explorer les recommandations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExperienceActionSelector;