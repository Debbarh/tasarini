import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { WorldDiscoveryPreferences } from '@/types/beInspiredModes';
import { activityCategories } from '@/constants/beInspiredData';
import { travelSegments } from '@/constants/stepConfigs';

interface PreferencesQuestionnaireProps {
  onComplete: (preferences: WorldDiscoveryPreferences) => void;
}

const PreferencesQuestionnaire = ({ onComplete }: PreferencesQuestionnaireProps) => {
  const [preferences, setPreferences] = useState<WorldDiscoveryPreferences>({
    activities: [],
    budget: 'mid-range',
    duration: 7,
    climate: 'temperate',
    travelerSegment: { type: 'solo' },
    accommodationType: []
  });

  const handleActivityToggle = (activityId: string) => {
    const newActivities = preferences.activities.includes(activityId)
      ? preferences.activities.filter(id => id !== activityId)
      : [...preferences.activities, activityId];
    
    setPreferences(prev => ({
      ...prev,
      activities: newActivities
    }));
  };

  const handleSubmit = () => {
    if (preferences.activities.length === 0) {
      alert('Veuillez sélectionner au moins une activité');
      return;
    }
    onComplete(preferences);
  };

  const budgetOptions = [
    { value: 'budget', label: 'Budget (< 1000€)', emoji: '💰' },
    { value: 'mid-range', label: 'Moyen (1000-2500€)', emoji: '💳' },
    { value: 'luxury', label: 'Luxe (> 2500€)', emoji: '💎' }
  ];

  const climateOptions = [
    { value: 'tropical', label: 'Tropical', emoji: '🌴' },
    { value: 'temperate', label: 'Tempéré', emoji: '🌤️' },
    { value: 'cold', label: 'Froid', emoji: '❄️' },
    { value: 'desert', label: 'Désertique', emoji: '🏜️' }
  ];

  const accommodationOptions = [
    { id: 'hotel', name: 'Hôtel', emoji: '🏨' },
    { id: 'hostel', name: 'Auberge de jeunesse', emoji: '🏠' },
    { id: 'airbnb', name: 'Airbnb/Location', emoji: '🏡' },
    { id: 'resort', name: 'Resort', emoji: '🏖️' },
    { id: 'camping', name: 'Camping', emoji: '⛺' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Parlez-nous de vos préférences
          </h2>
          <p className="text-gray-600">
            Plus nous en savons, mieux nous pouvons vous recommander la destination parfaite
          </p>
        </div>

        <div className="space-y-8">
          {/* Activités et Passions */}
          <div>
            <Label className="text-lg font-semibold mb-4 block">
              🎯 Quelles activités vous passionnent ?
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {activityCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={category.id}
                    checked={preferences.activities.includes(category.id)}
                    onCheckedChange={() => handleActivityToggle(category.id)}
                  />
                  <Label htmlFor={category.id} className="text-sm cursor-pointer flex-1">
                    <span className="mr-2">{category.emoji}</span>
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <Label className="text-lg font-semibold mb-4 block">
              💰 Quel est votre budget approximatif ?
            </Label>
            <Select 
              value={preferences.budget}
              onValueChange={(value: 'budget' | 'mid-range' | 'luxury') => 
                setPreferences(prev => ({ ...prev, budget: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="mr-2">{option.emoji}</span>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Durée */}
          <div>
            <Label className="text-lg font-semibold mb-4 block">
              📅 Durée de votre séjour : {preferences.duration} jour(s)
            </Label>
            <Slider
              value={[preferences.duration]}
              onValueChange={(value) => 
                setPreferences(prev => ({ ...prev, duration: value[0] }))
              }
              max={30}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>1 jour</span>
              <span>30 jours</span>
            </div>
          </div>

          {/* Climat */}
          <div>
            <Label className="text-lg font-semibold mb-4 block">
              🌡️ Quel climat préférez-vous ?
            </Label>
            <Select 
              value={preferences.climate}
              onValueChange={(value: 'tropical' | 'temperate' | 'cold' | 'desert') => 
                setPreferences(prev => ({ ...prev, climate: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {climateOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="mr-2">{option.emoji}</span>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type de voyageur */}
          <div>
            <Label className="text-lg font-semibold mb-4 block">
              👥 Avec qui voyagez-vous ?
            </Label>
            <Select 
              value={preferences.travelerSegment.type}
              onValueChange={(value: any) => 
                setPreferences(prev => ({
                  ...prev,
                  travelerSegment: { type: value }
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {travelSegments.map((segment) => (
                  <SelectItem key={segment.id} value={segment.id}>
                    <span className="mr-2">{segment.emoji}</span>
                    {segment.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type d'hébergement */}
          <div>
            <Label className="text-lg font-semibold mb-4 block">
              🏨 Types d'hébergement préférés
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {accommodationOptions.map((accommodation) => (
                <div key={accommodation.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={accommodation.id}
                    checked={preferences.accommodationType.includes(accommodation.id)}
                    onCheckedChange={() => {
                      const newAccommodations = preferences.accommodationType.includes(accommodation.id)
                        ? preferences.accommodationType.filter(id => id !== accommodation.id)
                        : [...preferences.accommodationType, accommodation.id];
                      setPreferences(prev => ({
                        ...prev,
                        accommodationType: newAccommodations
                      }));
                    }}
                  />
                  <Label htmlFor={accommodation.id} className="text-sm cursor-pointer flex-1">
                    <span className="mr-2">{accommodation.emoji}</span>
                    {accommodation.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button 
            onClick={handleSubmit}
            size="lg"
            className="px-8 py-3 text-lg"
            disabled={preferences.activities.length === 0}
          >
            Trouver mes destinations 🌍
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PreferencesQuestionnaire;