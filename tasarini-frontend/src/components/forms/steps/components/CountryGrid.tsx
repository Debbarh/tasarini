
import React from 'react';
import { countriesData } from '@/data/countries';

interface Country {
  code: string;
  name: string;
  flagCode: string;
  region: string;
}

interface SelectedCountry {
  countryName: string;
  cities: Array<{
    cityName: string;
    startDate: string;
    endDate: string;
  }>;
}

interface CountryGridProps {
  filteredCountries: Country[];
  selectedCountries: SelectedCountry[];
  searchTerm: string;
  addCountry: (name: string) => void;
  removeCountry: (name: string) => void;
}

const CountryGrid = React.memo<CountryGridProps>(({
  filteredCountries,
  selectedCountries,
  searchTerm,
  addCountry,
  removeCountry
}) => {
  // Function to get flag for a country
  const getCountryFlag = (countryName: string) => {
    const country = countriesData.find(c => c.name === countryName);
    return country?.flagCode || '🌍';
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">
        {searchTerm.trim() === "" 
          ? "Pays disponibles"
          : `${filteredCountries.length} résultat${filteredCountries.length !== 1 ? 's' : ''}`
        }
      </h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-80 overflow-y-auto">
        {filteredCountries.map((country) => {
          const isSelected = selectedCountries.find(c => c.countryName === country.name);
          const flag = getCountryFlag(country.name);
          
          return (
            <button
              key={country.code}
              onClick={() => isSelected ? removeCountry(country.name) : addCountry(country.name)}
              className={`px-3 py-2 text-left border rounded transition-colors ${
                isSelected
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{flag}</span>
                <span className="font-medium text-sm">{country.name}</span>
                {isSelected && (
                  <span className="ml-auto text-purple-600 text-xs">✓</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

CountryGrid.displayName = 'CountryGrid';

export default CountryGrid;
