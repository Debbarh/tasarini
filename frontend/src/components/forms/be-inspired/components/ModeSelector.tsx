import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Globe, ArrowRight } from 'lucide-react';
import { BeInspiredMode } from '@/types/beInspiredModes';

interface ModeSelectorProps {
  onModeSelect: (mode: BeInspiredMode) => void;
}

const ModeSelector = ({ onModeSelect }: ModeSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comment souhaitez-vous être inspiré ?
          </h1>
          <p className="text-xl text-gray-600">
            Choisissez votre mode d'exploration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Explorer Local */}
          <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 cursor-pointer group"
                onClick={() => onModeSelect('local')}>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <MapPin className="w-10 h-10 text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Explorer Local
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Découvrez des expériences uniques près de votre localisation actuelle. 
                Parfait pour explorer votre région ou une ville que vous visitez.
              </p>
              
              <div className="space-y-2 mb-8">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  ✨ Géolocalisation automatique
                </div>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  🎯 POIs près de vous
                </div>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  📍 Navigation directe
                </div>
              </div>
              
              <Button className="w-full group-hover:bg-blue-700 transition-colors">
                Commencer l'exploration
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Découvrir le Monde */}
          <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300 cursor-pointer group"
                onClick={() => onModeSelect('world')}>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <Globe className="w-10 h-10 text-purple-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Découvrir le Monde
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Laissez-nous vous suggérer des destinations parfaites selon vos préférences. 
                Recevez un programme personnalisé pour votre prochain voyage.
              </p>
              
              <div className="space-y-2 mb-8">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  🎪 Questionnaire de préférences
                </div>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  🌍 Suggestions de destinations
                </div>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  📋 Programme personnalisé
                </div>
              </div>
              
              <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors">
                Découvrir ma destination
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;