import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const activityCategories = [
  'Culture', 'Gastronomie', 'Nature', 'Adventure', 'Shopping', 
  'Vie nocturne', 'Wellness', 'Histoire', 'Art', 'Sport'
];

const travelerTypes = [
  'Solo', 'Couple', 'Famille', 'Amis', 'Business', 'Groupe'
];

const budgetOptions = [
  { value: 'economic', label: 'Économique (€)' },
  { value: 'standard', label: 'Standard (€€)' },
  { value: 'premium', label: 'Premium (€€€)' },
  { value: 'luxury', label: 'Luxe (€€€€)' }
];

interface CategoryStepProps {
  data: {
    categories?: {
      activities: string[];
      travelerType: string[];
      budget: string;
    };
  };
  onNext: (data: any) => void;
}

const CategoryStep = ({ data, onNext }: CategoryStepProps) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>(
    data.categories?.activities || []
  );
  const [selectedTravelers, setSelectedTravelers] = useState<string[]>(
    data.categories?.travelerType || []
  );
  const [selectedBudget, setSelectedBudget] = useState<string>(
    data.categories?.budget || ''
  );

  const handleActivityChange = (activity: string, checked: boolean) => {
    if (checked) {
      setSelectedActivities([...selectedActivities, activity]);
    } else {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    }
  };

  const handleTravelerChange = (traveler: string, checked: boolean) => {
    if (checked) {
      setSelectedTravelers([...selectedTravelers, traveler]);
    } else {
      setSelectedTravelers(selectedTravelers.filter(t => t !== traveler));
    }
  };

  const handleSubmit = () => {
    onNext({
      categories: {
        activities: selectedActivities,
        travelerType: selectedTravelers,
        budget: selectedBudget
      }
    });
  };

  const isValid = selectedActivities.length > 0 && selectedTravelers.length > 0 && selectedBudget;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Catégorisation</h2>
        <p className="text-muted-foreground">
          Aidez-nous à classer votre recommandation pour qu'elle soit plus facilement trouvée
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <Label className="text-base font-semibold">Types d'activités *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {activityCategories.map((activity) => (
              <div key={activity} className="flex items-center space-x-2">
                <Checkbox
                  id={activity}
                  checked={selectedActivities.includes(activity)}
                  onCheckedChange={(checked) => handleActivityChange(activity, checked as boolean)}
                />
                <Label htmlFor={activity} className="text-sm font-normal">
                  {activity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">Types de voyageurs *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {travelerTypes.map((traveler) => (
              <div key={traveler} className="flex items-center space-x-2">
                <Checkbox
                  id={traveler}
                  checked={selectedTravelers.includes(traveler)}
                  onCheckedChange={(checked) => handleTravelerChange(traveler, checked as boolean)}
                />
                <Label htmlFor={traveler} className="text-sm font-normal">
                  {traveler}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="budget" className="text-base font-semibold">Gamme de budget *</Label>
          <Select value={selectedBudget} onValueChange={setSelectedBudget}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une gamme de budget" />
            </SelectTrigger>
            <SelectContent>
              {budgetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!isValid} size="lg">
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryStep;