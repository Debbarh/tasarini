
import React, { useMemo, useCallback, useState } from 'react';
import { Search } from 'lucide-react';

interface City {
  id: number;
  name: string;
}

interface CitySelectorProps {
  citiesList: City[];
  selectedCityNames: Set<string>;
  onCityToggle: (cityName: string) => void;
}

const CitySelector = React.memo<CitySelectorProps>(({ 
  citiesList, 
  selectedCityNames, 
  onCityToggle 
}) => {
  const [citySearchTerm, setCitySearchTerm] = useState('');

  const filteredCities = useMemo(() => {
    if (!citySearchTerm.trim()) return citiesList;
    
    const lowerSearchTerm = citySearchTerm.toLowerCase();
    return citiesList.filter((city) =>
      city.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [citiesList, citySearchTerm]);

  const handleCityClick = useCallback((cityName: string) => {
    onCityToggle(cityName);
  }, [onCityToggle]);

  const handleCitySearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCitySearchTerm(e.target.value);
  }, []);

  const clearCitySearch = useCallback(() => {
    setCitySearchTerm('');
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h6 className="text-lg font-semibold text-gray-800">Villes</h6>
        <span className="text-sm text-gray-500">
          {filteredCities.length} ville{filteredCities.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {citiesList.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher une ville..."
            value={citySearchTerm}
            onChange={handleCitySearchChange}
            className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
          />
          {citySearchTerm && (
            <button
              onClick={clearCitySearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 w-4 h-4 flex items-center justify-center"
              aria-label="Effacer la recherche"
            >
              ×
            </button>
          )}
        </div>
      )}

      {filteredCities.length === 0 && citySearchTerm.trim() ? (
        <div className="text-center py-4 text-gray-500">
          <Search className="w-6 h-6 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Aucune ville trouvée pour "{citySearchTerm}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
          {filteredCities.map((city) => {
            const isSelected = selectedCityNames.has(city.name);
            return (
              <button
                key={city.id}
                onClick={() => handleCityClick(city.name)}
                className={`p-2 border rounded text-sm text-center transition-colors ${
                  isSelected
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50'
                }`}
              >
                <div className="font-medium">{city.name}</div>
                {isSelected && (
                  <div className="text-xs text-blue-600 mt-1">✓</div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

CitySelector.displayName = 'CitySelector';

export default CitySelector;
