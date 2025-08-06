import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Download, Share, MapPin, Clock, DollarSign } from 'lucide-react';
import { GeneratedProgram } from '@/types/beInspiredModes';

interface ProgramDisplayProps {
  program: GeneratedProgram;
  onBack: () => void;
  onModify: () => void;
}

const ProgramDisplay = ({ program, onBack, onModify }: ProgramDisplayProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Autres destinations
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Votre programme pour {program.destination.name}
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {program.destination.country} • {program.days.length} jours
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={onModify}>
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
          <Button variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Partager
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </div>

      {/* Résumé du voyage */}
      <Card className="p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {program.days.length} jours
            </div>
            <div className="text-sm text-gray-600">Durée du séjour</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {program.totalBudget}€
            </div>
            <div className="text-sm text-gray-600">Budget estimé</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {program.destination.score}%
            </div>
            <div className="text-sm text-gray-600">Compatibilité</div>
          </div>
        </div>
      </Card>

      {/* Description de la destination */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3">À propos de {program.destination.name}</h3>
        <p className="text-gray-700 mb-4">{program.destination.description}</p>
        <div className="flex flex-wrap gap-2">
          {program.destination.highlights.map((highlight, index) => (
            <Badge key={index} variant="secondary">
              {highlight}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Programme jour par jour */}
      <div className="space-y-6 mb-6">
        <h3 className="text-lg font-semibold">Programme détaillé</h3>
        
        {program.days.map((day) => (
          <Card key={day.day} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-purple-600">J{day.day}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{day.theme}</h4>
                <p className="text-sm text-gray-500">{day.date}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {day.activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{activity.name}</h5>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        {activity.duration}
                        {activity.cost && (
                          <>
                            <DollarSign className="w-3 h-3 ml-2" />
                            {activity.cost}€
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                      <span className="text-xs text-gray-500">📍 {activity.location}</span>
                    </div>
                    {activity.tips && activity.tips.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-blue-600 font-medium">💡 Conseil :</p>
                        <p className="text-xs text-gray-600">{activity.tips[0]}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {day.accommodation && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  🏨 <strong>Hébergement :</strong> {day.accommodation}
                </p>
              </div>
            )}
            
            {day.meals.length > 0 && (
              <div className="mt-2 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  🍽️ <strong>Repas :</strong> {day.meals.join(', ')}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Recommandations */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recommandations pour votre voyage</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {program.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-600 text-xs">💡</span>
              </div>
              <p className="text-sm text-gray-700">{recommendation}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProgramDisplay;