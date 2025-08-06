import { useState } from 'react';
import { MapPin, Utensils, Hotel, Calendar, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExperienceType } from '@/types/recommendations';

const experienceTypes = [
  {
    type: 'generated-tour' as ExperienceType,
    icon: Route,
    title: 'Tour/Programme',
    description: 'Un programme de voyage complet généré par la plateforme'
  },
  {
    type: 'activity' as ExperienceType,
    icon: Calendar,
    title: 'Activité',
    description: 'Une activité spécifique ou un événement'
  },
  {
    type: 'restaurant' as ExperienceType,
    icon: Utensils,
    title: 'Restaurant',
    description: 'Un restaurant ou une expérience gastronomique'
  },
  {
    type: 'hotel' as ExperienceType,
    icon: Hotel,
    title: 'Hébergement',
    description: 'Un hôtel, B&B ou autre type de logement'
  },
  {
    type: 'simple-experience' as ExperienceType,
    icon: MapPin,
    title: 'Lieu/Expérience',
    description: 'Un lieu d\'intérêt ou une expérience simple'
  }
];

interface ExperienceTypeStepProps {
  data: { type?: ExperienceType };
  onNext: (data: { type: ExperienceType }) => void;
}

const ExperienceTypeStep = ({ data, onNext }: ExperienceTypeStepProps) => {
  const [selectedType, setSelectedType] = useState<ExperienceType | undefined>(data.type);

  const handleSubmit = () => {
    if (selectedType) {
      onNext({ type: selectedType });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quel type d'expérience souhaitez-vous recommander ?</h2>
        <p className="text-gray-600 text-lg">
          Choisissez le type qui correspond le mieux à votre recommandation
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {experienceTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Card
              key={type.type}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm border-2 hover:scale-105 ${
                selectedType === type.type
                  ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => setSelectedType(type.type)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedType === type.type 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-110' 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-purple-100'
                }`}>
                  <Icon className="h-8 w-8" />
                </div>
                <CardTitle className={`text-lg transition-colors ${
                  selectedType === type.type ? 'text-purple-700' : 'text-gray-800'
                }`}>{type.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-center text-gray-600">
                  {type.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedType}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-12"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default ExperienceTypeStep;