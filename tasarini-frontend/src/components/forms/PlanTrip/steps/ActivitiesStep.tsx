
import React, { useState } from 'react';
import { StepProps } from '../../../../types/planTrip';
import { Filter } from 'lucide-react';
import { Button } from '../../../ui/button';

const activityCategories = [
  {
    category: 'Culture & Histoire',
    icon: '🏛️',
    activities: [
      { value: 'museums', label: 'Musées', icon: '🖼️' },
      { value: 'monuments', label: 'Monuments historiques', icon: '🏰' },
      { value: 'medina', label: 'Visite de médina', icon: '🕌' },
      { value: 'artisanat', label: 'Artisanat', icon: '🎨' },
      { value: 'culture', label: 'Culture', icon: '🏛️' }
    ]
  },
  {
    category: 'Aventure & Sport',
    icon: '🏔️',
    activities: [
      { value: 'trekking', label: 'Randonnée/Trekking', icon: '🥾' },
      { value: 'desert', label: 'Excursion désert', icon: '🐪' },
      { value: 'surf', label: 'Surf', icon: '🏄' },
      { value: 'climbing', label: 'Escalade', icon: '🧗' },
      { value: 'golf', label: 'Golf', icon: '⛳' },
      { value: 'safari', label: 'Safari', icon: '🦁' }
    ]
  },
  {
    category: 'Détente & Bien-être',
    icon: '🧘',
    activities: [
      { value: 'spa', label: 'Spa & Hammam', icon: '🛁' },
      { value: 'yoga', label: 'Yoga & Méditation', icon: '🧘' },
      { value: 'beach', label: 'Plage & Farniente', icon: '🏖️' },
      { value: 'meditation', label: 'Méditation', icon: '🧘‍♀️' },
      { value: 'healthcare', label: 'Soins & Santé', icon: '🏥' }
    ]
  },
  {
    category: 'Gastronomie & Saveurs',
    icon: '🍽️',
    activities: [
      { value: 'cooking', label: 'Cours de cuisine', icon: '👨‍🍳' },
      { value: 'food-tour', label: 'Tour gastronomique', icon: '🍴' },
      { value: 'wine-tasting', label: 'Dégustation de vins', icon: '🍷' },
      { value: 'market', label: 'Marchés locaux', icon: '🛒' },
      { value: 'culinary', label: 'Expériences culinaires', icon: '🍽️' }
    ]
  },
  {
    category: 'Voyage & Transport',
    icon: '🚢',
    activities: [
      { value: 'cruise', label: 'Croisière', icon: '🚢' },
      { value: 'business-trip', label: 'Voyage d\'affaires', icon: '💼' },
      { value: 'eco-tourism', label: 'Écotourisme', icon: '🌿' },
      { value: 'sustainable-travel', label: 'Voyage durable', icon: '♻️' }
    ]
  },
  {
    category: 'Famille & Divertissement',
    icon: '👨‍👩‍👧‍👦',
    activities: [
      { value: 'family', label: 'Activités familiales', icon: '👨‍👩‍👧‍👦' },
      { value: 'nightlife', label: 'Vie nocturne', icon: '🌃' },
      { value: 'shopping', label: 'Shopping', icon: '🛍️' }
    ]
  },
  {
    category: 'Spirituel & Religieux',
    icon: '🕌',
    activities: [
      { value: 'religieux', label: 'Sites religieux', icon: '🕌' },
      { value: 'pilgrimage', label: 'Pèlerinage', icon: '🙏' },
      { value: 'spiritual', label: 'Retraite spirituelle', icon: '✨' }
    ]
  }
];

export default function ActivitiesStep({ formData, setFormData }: StepProps) {
  const [selectedActivities, setSelectedActivities] = useState(formData.activities);
  const [activeFilters, setActiveFilters] = useState<string[]>(activityCategories.map(cat => cat.category));

  const handleActivityToggle = (activity: string) => {
    const updatedActivities = selectedActivities.includes(activity)
      ? selectedActivities.filter(a => a !== activity)
      : [...selectedActivities, activity];
    
    setSelectedActivities(updatedActivities);
    setFormData({
      ...formData,
      activities: updatedActivities
    });
  };

  const handleFilterToggle = (category: string) => {
    setActiveFilters(prev => 
      prev.includes(category) 
        ? prev.filter(f => f !== category)
        : [...prev, category]
    );
  };

  const handleShowAll = () => {
    setActiveFilters(activityCategories.map(cat => cat.category));
  };

  const handleClearAll = () => {
    setActiveFilters([]);
  };

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
              onClick={handleShowAll}
              className="text-xs"
            >
              Tout afficher
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearAll}
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

      {/* No results message */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h5 className="text-xl font-semibold text-gray-600 mb-2">Aucune activité trouvée</h5>
          <p className="text-gray-500">Essayez de sélectionner d'autres filtres</p>
        </div>
      )}

      {/* Selected Activities Summary */}
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
