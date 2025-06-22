
import React, { useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CityDateConfiguration from './CityDateConfiguration';

interface Country {
  countryName: string;
  cities: Array<{
    cityName: string;
    startDate: string;
    endDate: string;
  }>;
}

interface CountryConfigurationProps {
  activeCountry?: Country;
  removeCountry: (countryName: string) => void;
  addCity: (cityName: string) => void;
  removeCity: (countryName: string, cityName: string) => void;
  updateCityDates: (countryName: string, cityName: string, field: string, value: string) => void;
  isCountryComplete: (country: Country) => boolean;
}

const CountryConfiguration = React.memo<CountryConfigurationProps>(({
  activeCountry,
  removeCountry,
  addCity,
  removeCity,
  updateCityDates,
  isCountryComplete
}) => {
  const [newCityName, setNewCityName] = React.useState('');

  const handleAddCity = () => {
    if (newCityName.trim()) {
      addCity(newCityName.trim());
      setNewCityName('');
    }
  };

  if (!activeCountry) {
    return (
      <div className="bg-gray-50 p-1 rounded border text-center">
        <p className="text-xs text-gray-500">Sélectionnez un pays pour configurer</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded p-1">
      <div className="mb-0.5">
        <h5 className="text-xs font-semibold text-gray-900 mb-0.25">{activeCountry.countryName}</h5>
        
        <div className="flex gap-0.25 mb-0.25">
          <input
            type="text"
            placeholder="Nom de la ville"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            className="flex-1 px-0.5 py-0.25 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <Button
            onClick={handleAddCity}
            disabled={!newCityName.trim()}
            size="sm"
            className="px-0.5 py-0.25 h-auto text-xs"
          >
            <Plus className="w-1.5 h-1.5" />
          </Button>
        </div>
      </div>

      <div className="space-y-0.25">
        {activeCountry.cities.map((city) => (
          <CityDateConfiguration
            key={city.cityName}
            city={city}
            countryName={activeCountry.countryName}
            removeCity={removeCity}
            updateCityDates={updateCityDates}
          />
        ))}
      </div>
    </div>
  );
});

CountryConfiguration.displayName = 'CountryConfiguration';

export default CountryConfiguration;
