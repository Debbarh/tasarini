
import React, { useState } from 'react';
import { Star, Search, Filter } from 'lucide-react';
import { Button } from '../../../../ui/button';
import { Input } from '../../../../ui/input';
import { preferences, preferenceCategories } from '../data/accommodationData';
import { getCategoryColorClasses, filterPreferencesBySearch, groupPreferencesByCategory } from '../utils/accommodationUtils';

interface AccommodationPreferencesProps {
  selectedPreferences: string[];
  onPreferenceToggle: (preference: string) => void;
}

export default function AccommodationPreferences({ selectedPreferences, onPreferenceToggle }: AccommodationPreferencesProps) {
  const [preferenceSearchTerm, setPreferenceSearchTerm] = useState('');
  const [activePreferenceCategories, setActivePreferenceCategories] = useState<string[]>(Object.keys(preferenceCategories));

  const handlePreferenceCategoryToggle = (category: string) => {
    setActivePreferenceCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleShowAllPreferences = () => {
    setActivePreferenceCategories(Object.keys(preferenceCategories));
    setPreferenceSearchTerm('');
  };

  const getFilteredPreferences = () => {
    const allPreferences = preferences.filter(pref => 
      activePreferenceCategories.includes(pref.category)
    );

    return filterPreferencesBySearch(allPreferences, preferenceSearchTerm);
  };

  const filteredPreferences = getFilteredPreferences();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
          <Star className="w-4 h-4 text-white" />
        </div>
        <h4 className="text-2xl font-bold text-gray-900">Critères & Services souhaités</h4>
      </div>

      {/* Barre de recherche pour les préférences */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Rechercher un service ou critère..."
          value={preferenceSearchTerm}
          onChange={(e) => setPreferenceSearchTerm(e.target.value)}
          className="pl-10 text-lg py-3 border-2 border-gray-200 focus:border-yellow-500"
        />
      </div>

      {/* Filtres par catégorie de préférences */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-gray-900">Filtrer par type</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleShowAllPreferences}
            className="text-xs"
          >
            Tout afficher
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(preferenceCategories).map(([category, data]) => {
            const isActive = activePreferenceCategories.includes(category);
            const count = preferences.filter(p => p.category === category).length;
            
            return (
              <button
                key={category}
                onClick={() => handlePreferenceCategoryToggle(category)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 flex items-center gap-1 ${
                  isActive 
                    ? getCategoryColorClasses(data.color, true) + ' border-transparent' 
                    : getCategoryColorClasses(data.color, false) + ' border-gray-200'
                }`}
              >
                <span>{data.icon}</span>
                {data.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Critères sélectionnés - déplacé ici juste après les filtres */}
      {selectedPreferences.length > 0 && (
        <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
          <h5 className="font-semibold text-yellow-900 mb-2">⭐ Critères sélectionnés ({selectedPreferences.length}) :</h5>
          <div className="flex flex-wrap gap-2">
            {selectedPreferences.map(pref => {
              const prefData = preferences.find(p => p.value === pref);
              return (
                <span key={pref} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {prefData?.icon} {prefData?.label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Compteur de critères */}
      <div className="text-sm text-gray-600">
        {filteredPreferences.length} critère{filteredPreferences.length > 1 ? 's' : ''} disponible{filteredPreferences.length > 1 ? 's' : ''}
      </div>

      {/* Grille des préférences par catégorie */}
      <div className="space-y-6">
        {Object.entries(groupPreferencesByCategory(filteredPreferences)).map(([category, categoryPrefs]) => {
          const categoryData = preferenceCategories[category as keyof typeof preferenceCategories];
          return (
            <div key={category} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{categoryData.icon}</span>
                <h5 className="font-semibold text-gray-800">{categoryData.label}</h5>
                <span className="text-sm text-gray-500">({categoryPrefs.length})</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categoryPrefs.map((option) => {
                  const isSelected = selectedPreferences.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      onClick={() => onPreferenceToggle(option.value)}
                      className={`p-3 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                        isSelected
                          ? `border-${categoryData.color}-500 bg-${categoryData.color}-50 text-${categoryData.color}-700 shadow-lg`
                          : `border-gray-200 hover:border-${categoryData.color}-300 bg-white hover:shadow-md`
                      }`}
                    >
                      <div className="text-xl mb-1">{option.icon}</div>
                      <span className="font-medium text-xs leading-tight">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
