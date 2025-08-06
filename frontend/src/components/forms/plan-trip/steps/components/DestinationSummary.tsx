
import React from 'react';
import { CountryWithCities } from '@/types/planTrip';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, MapPin, Calendar } from 'lucide-react';
import { countriesData } from '@/data/countries';

interface DestinationSummaryProps {
  selectedCountries: CountryWithCities[];
  activeCountryIndex: number;
  navigateToCountry: (index: number) => void;
  isCountryComplete: (country: CountryWithCities) => boolean;
}

const DestinationSummary = ({
  selectedCountries,
  activeCountryIndex,
  navigateToCountry,
  isCountryComplete
}: DestinationSummaryProps) => {
  if (selectedCountries.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        Pays sélectionnés
      </h3>
      <div className="space-y-4">
        {selectedCountries.map((country, index) => {
          const countryData = countriesData.find(c => c.name === country.countryName);
          
          return (
            <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
              <Button
                onClick={() => navigateToCountry(index)}
                variant={index === activeCountryIndex ? "default" : "outline"}
                size="sm"
                className={`flex items-center gap-2 mb-3 ${
                  index === activeCountryIndex 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'hover:bg-purple-50'
                }`}
              >
                {isCountryComplete(country) ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
                <span className="text-lg">{countryData?.flagCode}</span>
                {country.countryName}
                <span className="text-xs opacity-70">
                  ({country.cities.length} ville{country.cities.length > 1 ? 's' : ''})
                </span>
              </Button>

              {country.cities.length > 0 && (
                <div className="ml-4 space-y-2">
                  {country.cities.map((city, cityIndex) => (
                    <div key={cityIndex} className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 rounded p-2">
                      <div className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3" />
                        {city.cityName}
                      </div>
                      {(city.startDate || city.endDate) && (
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="w-3 h-3" />
                          {city.startDate && formatDate(city.startDate)}
                          {city.startDate && city.endDate && ' → '}
                          {city.endDate && formatDate(city.endDate)}
                        </div>
                      )}
                      {!city.startDate && !city.endDate && (
                        <span className="text-xs text-amber-600">Dates à définir</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DestinationSummary;
