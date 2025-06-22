
import React, { useMemo, useCallback, useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { countriesData } from '@/data/countries';

interface Country {
  id: number;
  name: string;
}

interface SelectedCountry {
  countryName: string;
  cities: Array<{
    cityName: string;
    startDate: string;
    endDate: string;
  }>;
}

interface CountrySelectorProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredCountries: Country[];
  selectedCountries: SelectedCountry[];
  addCountry: (name: string) => void;
  removeCountry: (name: string) => void;
}

const CountrySelector = React.memo<CountrySelectorProps>(({ 
  searchTerm, 
  setSearchTerm, 
  filteredCountries, 
  selectedCountries, 
  addCountry, 
  removeCountry 
}) => {
  const selectedCountryNames = useMemo(
    () => new Set(selectedCountries.map(sc => sc.countryName)),
    [selectedCountries]
  );

  // Initial 8 popular countries to display
  const initialCountries = useMemo(() => [
    'Maroc', 'France', 'Espagne', 'Italie', 'Grèce', 'Turquie', 'Portugal', 'Égypte'
  ], []);

  // Countries to display: if searching, show filtered results, otherwise show initial + selected
  const displayedCountries = useMemo(() => {
    if (searchTerm.trim()) {
      return filteredCountries;
    }
    
    // Show initial countries + any selected countries not in the initial list
    const initialCountriesData = filteredCountries.filter(c => 
      initialCountries.includes(c.name)
    );
    
    const additionalSelected = filteredCountries.filter(c => 
      selectedCountryNames.has(c.name) && !initialCountries.includes(c.name)
    );
    
    return [...initialCountriesData, ...additionalSelected];
  }, [filteredCountries, searchTerm, initialCountries, selectedCountryNames]);

  // Function to get flag for a country
  const getCountryFlag = useCallback((countryName: string) => {
    const country = countriesData.find(c => c.name === countryName);
    return country?.flagCode || '🌍';
  }, []);

  const handleCountryToggle = useCallback((countryName: string) => {
    if (selectedCountryNames.has(countryName)) {
      removeCountry(countryName);
    } else {
      addCountry(countryName);
    }
  }, [selectedCountryNames, removeCountry, addCountry]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, [setSearchTerm]);

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg border">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-purple-600" />
          Destinations
        </h4>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un pays..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 w-4 h-4 flex items-center justify-center"
              aria-label="Effacer la recherche"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900">
            {searchTerm.trim() ? 'Résultats de recherche' : 'Pays populaires'}
          </h4>
          <span className="text-sm text-gray-500">
            {displayedCountries.length} résultat{displayedCountries.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {displayedCountries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Aucun pays trouvé pour "{searchTerm}"</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
            {displayedCountries.map((country) => {
              const isSelected = selectedCountryNames.has(country.name);
              const flag = getCountryFlag(country.name);
              return (
                <button
                  key={country.id}
                  onClick={() => handleCountryToggle(country.name)}
                  className={`p-3 border rounded-lg text-left transition-colors ${
                    isSelected
                      ? 'bg-purple-50 border-purple-500 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{flag}</span>
                    <span className="font-medium">{country.name}</span>
                    {isSelected && (
                      <span className="ml-auto text-purple-600">✓</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
        
        {!searchTerm.trim() && (
          <p className="text-xs text-gray-500 text-center mt-2">
            💡 Utilisez la recherche pour explorer plus de 50 pays disponibles
          </p>
        )}
      </div>
    </div>
  );
});

CountrySelector.displayName = 'CountrySelector';

export default CountrySelector;
