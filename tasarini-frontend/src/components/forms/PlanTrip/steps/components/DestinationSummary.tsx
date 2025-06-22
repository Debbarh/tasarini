
import React from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { CountryWithCities } from '../../../../../types/planTrip';

interface DestinationSummaryProps {
  selectedCountries: CountryWithCities[];
  activeCountryIndex: number;
  navigateToCountry: (index: number) => void;
  isCountryComplete: (country: CountryWithCities) => boolean;
}

const DestinationSummary = React.memo<DestinationSummaryProps>(({ 
  selectedCountries, 
  activeCountryIndex, 
  navigateToCountry,
  isCountryComplete 
}) => {
  if (selectedCountries.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 bg-white border-2 border-blue-200 rounded-2xl p-4 shadow-lg backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-3 h-3 text-white" />
          </div>
          Votre voyage ({selectedCountries.length} pays)
        </h4>
        
        {/* Navigation entre pays */}
        {selectedCountries.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateToCountry(Math.max(0, activeCountryIndex - 1))}
              disabled={activeCountryIndex === 0}
              className="p-1.5 rounded-lg border border-gray-200 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="text-sm font-semibold text-gray-700 px-3 py-1 bg-blue-50 rounded-lg border border-blue-200">
              {activeCountryIndex + 1} / {selectedCountries.length}
            </span>
            
            <button
              onClick={() => navigateToCountry(Math.min(selectedCountries.length - 1, activeCountryIndex + 1))}
              disabled={activeCountryIndex === selectedCountries.length - 1}
              className="p-1.5 rounded-lg border border-gray-200 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      {/* Liste des pays avec navigation rapide */}
      <div className="flex flex-wrap gap-2">
        {selectedCountries.map((country, index) => {
          const isComplete = isCountryComplete(country);
          const isActive = index === activeCountryIndex;
          
          return (
            <button
              key={country.countryName}
              onClick={() => navigateToCountry(index)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                isActive 
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md' 
                  : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{country.countryName}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                  {country.cities.length} ville{country.cities.length > 1 ? 's' : ''}
                </span>
              </div>
              {isComplete && (
                <span className="text-green-500 text-sm font-bold">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});

DestinationSummary.displayName = 'DestinationSummary';

export default DestinationSummary;
