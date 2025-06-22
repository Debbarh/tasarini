
import React, { useState } from 'react';
import { Home, Search, Filter } from 'lucide-react';
import { Button } from '../../../../ui/button';
import { Input } from '../../../../ui/input';
import { accommodationCategories } from '../data/accommodationData';
import { getCategoryColorClasses, filterAccommodationsBySearch } from '../utils/accommodationUtils';

interface AccommodationTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export default function AccommodationTypeSelector({ selectedType, onTypeChange }: AccommodationTypeSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>(Object.keys(accommodationCategories));

  const handleCategoryToggle = (category: string) => {
    setActiveCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleShowAll = () => {
    setActiveCategories(Object.keys(accommodationCategories));
    setSearchTerm('');
  };

  const getFilteredAccommodations = () => {
    const allAccommodations = Object.entries(accommodationCategories)
      .filter(([category]) => activeCategories.includes(category))
      .flatMap(([category, data]) => 
        data.items.map(item => ({ ...item, category, categoryData: data }))
      );

    return filterAccommodationsBySearch(allAccommodations, searchTerm);
  };

  const filteredAccommodations = getFilteredAccommodations();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
          <Home className="w-4 h-4 text-white" />
        </div>
        <h4 className="text-2xl font-bold text-gray-900">Type d'hébergement</h4>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Rechercher un type d'hébergement..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 text-lg py-3 border-2 border-gray-200 focus:border-purple-500"
        />
      </div>

      {/* Filtres par catégorie */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-gray-900">Filtrer par catégorie</span>
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
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(accommodationCategories).map(([category, data]) => {
            const isActive = activeCategories.includes(category);
            const count = data.items.length;
            
            return (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
                  isActive 
                    ? getCategoryColorClasses(data.color, true) + ' border-transparent' 
                    : getCategoryColorClasses(data.color, false) + ' border-gray-200'
                }`}
              >
                {data.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Compteur de résultats */}
      <div className="text-sm text-gray-600">
        {filteredAccommodations.length} hébergement{filteredAccommodations.length > 1 ? 's' : ''} trouvé{filteredAccommodations.length > 1 ? 's' : ''}
      </div>

      {/* Grille des hébergements */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAccommodations.map((option) => (
          <button
            key={option.value}
            onClick={() => onTypeChange(option.value)}
            className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
              selectedType === option.value
                ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xl ring-4 ring-purple-100'
                : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-lg'
            }`}
          >
            <div className="text-2xl mb-2">{option.icon}</div>
            <h5 className="text-sm font-bold mb-1 leading-tight">{option.label}</h5>
            <p className="text-gray-600 text-xs line-clamp-2">{option.description}</p>
          </button>
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filteredAccommodations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h5 className="text-xl font-semibold text-gray-600 mb-2">Aucun hébergement trouvé</h5>
          <p className="text-gray-500">Essayez de modifier votre recherche ou vos filtres</p>
        </div>
      )}
    </div>
  );
}
