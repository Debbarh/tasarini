
import React, { useMemo, useCallback } from 'react';
import { Calendar } from 'lucide-react';
import CityHeader from './CityHeader';
import CitySelector from './CitySelector';
import CityDatePicker from './CityDatePicker';
import CityProgress from './CityProgress';
import EmptyCountryState from './EmptyCountryState';

interface City {
  id: number;
  name: string;
}

interface CityData {
  cityName: string;
  startDate: string;
  endDate: string;
}

interface Country {
  countryName: string;
  cities: CityData[];
}

interface CityConfigurationProps {
  activeCountry: Country | undefined;
  citiesList: City[];
  removeCountry: (name: string) => void;
  addCity: (cityName: string) => void;
  removeCity: (cityName: string) => void;
  updateCityDates: (cityName: string, field: string, value: string) => void;
  isCountryComplete: (country: Country) => boolean;
}

const CityConfiguration = React.memo<CityConfigurationProps>(({ 
  activeCountry, 
  citiesList, 
  removeCountry, 
  addCity, 
  removeCity, 
  updateCityDates, 
  isCountryComplete 
}) => {
  const selectedCityNames = useMemo(
    () => new Set(activeCountry?.cities.map(city => city.cityName) || []),
    [activeCountry?.cities]
  );

  const handleCityToggle = useCallback((cityName: string) => {
    if (selectedCityNames.has(cityName)) {
      removeCity(cityName);
    } else {
      addCity(cityName);
    }
  }, [selectedCityNames, removeCity, addCity]);

  const handleRemoveCountry = useCallback(() => {
    if (activeCountry) {
      removeCountry(activeCountry.countryName);
    }
  }, [activeCountry, removeCountry]);

  if (!activeCountry) {
    return <EmptyCountryState />;
  }

  const isComplete = isCountryComplete(activeCountry);

  return (
    <div className="space-y-6 p-8 border-2 border-blue-200 rounded-3xl bg-gradient-to-br from-white to-blue-50 shadow-2xl">
      <CityHeader 
        countryName={activeCountry.countryName}
        onRemoveCountry={handleRemoveCountry}
      />

      <CitySelector 
        citiesList={citiesList}
        selectedCityNames={selectedCityNames}
        onCityToggle={handleCityToggle}
      />

      {activeCountry.cities.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <h6 className="text-xl font-bold text-gray-800">Définissez vos dates</h6>
          </div>
          <div className="space-y-4">
            {activeCountry.cities.map((cityData) => (
              <CityDatePicker
                key={cityData.cityName}
                city={cityData}
                onDateChange={updateCityDates}
                onRemoveCity={removeCity}
              />
            ))}
          </div>
        </div>
      )}

      <CityProgress 
        country={activeCountry}
        isComplete={isComplete}
      />
    </div>
  );
});

CityConfiguration.displayName = 'CityConfiguration';

export default CityConfiguration;
