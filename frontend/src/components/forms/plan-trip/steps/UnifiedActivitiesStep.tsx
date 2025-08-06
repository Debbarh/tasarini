
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { activityOptions, activityCategories } from '@/constants/formData';

interface UnifiedActivitiesStepProps {
  mode: 'simple' | 'advanced';
  selectedActivities: string[];
  onActivitiesChange: (activities: string[]) => void;
}

export default function UnifiedActivitiesStep({ 
  mode, 
  selectedActivities, 
  onActivitiesChange 
}: UnifiedActivitiesStepProps) {
  const [customActivity, setCustomActivity] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(
    mode === 'advanced' ? activityCategories.map(cat => cat.category) : []
  );

  const handleActivityToggle = (activityId: string) => {
    if (activityId === 'other') {
      setShowCustomInput(!showCustomInput);
      if (showCustomInput) {
        const newActivities = selectedActivities.filter(id => !id.startsWith('custom:'));
        onActivitiesChange(newActivities);
        setCustomActivity("");
      }
      return;
    }

    const isSelected = selectedActivities.includes(activityId);
    const newActivities = isSelected
      ? selectedActivities.filter(id => id !== activityId)
      : [...selectedActivities, activityId];
    onActivitiesChange(newActivities);
  };

  const handleAddCustomActivity = () => {
    if (customActivity.trim()) {
      const customId = `custom:${customActivity.trim()}`;
      if (!selectedActivities.includes(customId)) {
        onActivitiesChange([...selectedActivities, customId]);
      }
      setCustomActivity("");
    }
  };

  const handleRemoveCustomActivity = (customId: string) => {
    const newActivities = selectedActivities.filter(id => id !== customId);
    onActivitiesChange(newActivities);
  };

  const handleFilterToggle = (category: string) => {
    setActiveFilters(prev => 
      prev.includes(category) 
        ? prev.filter(f => f !== category)
        : [...prev, category]
    );
  };

  const customActivities = selectedActivities.filter(id => id.startsWith('custom:'));

  if (mode === 'simple') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {activityOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleActivityToggle(option.id)}
              className={`group p-6 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                selectedActivities.includes(option.id)
                  ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xl'
                  : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50/50'
              }`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {option.emoji}
              </div>
              <div className="font-bold text-lg mb-2">{option.label}</div>
              <div className="text-sm opacity-70">{option.desc}</div>
            </button>
          ))}
          
          {/* Option Autres */}
          <button
            onClick={() => handleActivityToggle('other')}
            className={`group p-6 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              showCustomInput
                ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xl'
                : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50/50'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              ✨
            </div>
            <div className="font-bold text-lg mb-2">Autres</div>
            <div className="text-sm opacity-70">Précisez vos passions</div>
          </button>
        </div>

        {/* Champ de saisie personnalisé */}
        {showCustomInput && (
          <div className="mt-6 p-6 bg-purple-50 rounded-3xl border-2 border-purple-200">
            <Label htmlFor="custom-activity" className="text-lg font-semibold text-purple-800 mb-3 block">
              Ajoutez vos activités personnalisées :
            </Label>
            
            <div className="flex gap-3 mb-4">
              <Input
                id="custom-activity"
                type="text"
                value={customActivity}
                onChange={(e) => setCustomActivity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCustomActivity()}
                placeholder="Ex: Photographie, Astronomie, Plongée sous-marine..."
                className="flex-1 px-4 py-3 border-2 border-purple-300 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-lg"
              />
              <Button
                onClick={handleAddCustomActivity}
                disabled={!customActivity.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-2xl"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            {customActivities.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-semibold text-purple-800 mb-2">
                  Activités ajoutées :
                </div>
                <div className="flex flex-wrap gap-2">
                  {customActivities.map((customId) => {
                    const activityName = customId.replace('custom:', '');
                    return (
                      <div
                        key={customId}
                        className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-2 rounded-full border border-purple-300"
                      >
                        <span className="text-sm font-medium">{activityName}</span>
                        <button
                          onClick={() => handleRemoveCustomActivity(customId)}
                          className="text-purple-600 hover:text-purple-800 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Advanced mode
  const filteredActivities = activityCategories
    .filter(category => activeFilters.includes(category.category))
    .flatMap(category => 
      category.activities.map(activity => ({
        ...activity,
        category: category.category,
        categoryIcon: category.icon
      }))
    );

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-indigo-600" />
            <h4 className="text-lg font-semibold text-gray-900">Filtrer par catégorie</h4>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setActiveFilters(activityCategories.map(cat => cat.category))}
              className="text-xs"
            >
              Tout afficher
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setActiveFilters([])}
              className="text-xs"
            >
              Tout masquer
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {activityCategories.map((category) => (
            <Button
              key={category.category}
              variant={activeFilters.includes(category.category) ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterToggle(category.category)}
              className="text-xs h-8"
            >
              <span className="mr-1">{category.icon}</span>
              {category.category}
            </Button>
          ))}
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredActivities.map((activity) => {
          const isSelected = selectedActivities.includes(activity.value);
          return (
            <button
              key={activity.value}
              onClick={() => handleActivityToggle(activity.value)}
              className={`p-3 rounded-xl border-2 text-center transition-all duration-200 hover:scale-105 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-lg ring-2 ring-indigo-200'
                  : 'border-gray-200 hover:border-indigo-300 bg-white hover:shadow-md'
              }`}
            >
              <div className="text-2xl mb-1">{activity.icon}</div>
              <span className="font-medium text-xs leading-tight block">{activity.label}</span>
            </button>
          );
        })}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h5 className="text-xl font-semibold text-gray-600 mb-2">Aucune activité trouvée</h5>
          <p className="text-gray-500">Essayez de sélectionner d'autres filtres</p>
        </div>
      )}

      {selectedActivities.length > 0 && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-200">
          <h5 className="font-bold text-indigo-900 mb-3 text-lg">🎯 Activités sélectionnées ({selectedActivities.length}) :</h5>
          <div className="flex flex-wrap gap-2">
            {selectedActivities.map(activityValue => {
              const activity = activityCategories
                .flatMap(cat => cat.activities)
                .find(act => act.value === activityValue);
              
              return activity ? (
                <div key={activityValue} className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-sm font-medium">
                  <span>{activity.icon}</span>
                  <span>{activity.label}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
