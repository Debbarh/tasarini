
import React, { useState, useMemo } from 'react';
import { PlanTripFormData, StepProps } from '../../../../types/planTrip';
import { useDestinationLogic } from '../../../../hooks/useDestinationLogic';
import { countriesData } from '@/data/countries';
import DestinationSummary from './components/DestinationSummary';
import { Button } from '@/components/ui/button';
import { Search, MapPin, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DestinationStepProps extends StepProps {
  onNext?: () => void;
}

export default function DestinationStep({ formData, setFormData, onNext }: DestinationStepProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCountryIndex, setActiveCountryIndex] = useState(0);

  const selectedCountries = useMemo(() => 
    formData.destination.countries || [], 
    [formData.destination.countries]
  );

  const {
    addCountry,
    removeCountry,
    addCity,
    removeCity,
    updateCityDates,
    navigateToCountry,
    isCountryComplete,
    validateDestinationData
  } = useDestinationLogic({
    formData,
    setFormData,
    selectedCountries,
    activeCountryIndex,
    setActiveCountryIndex
  });

  // Top 7 destinations with Morocco first
  const topDestinations = useMemo(() => {
    const morocco = countriesData.find(country => country.name === 'Maroc');
    const otherCountries = countriesData
      .filter(country => country.name !== 'Maroc')
      .slice(0, 6); // 6 autres pays pour faire 7 au total
    
    return morocco ? [morocco, ...otherCountries] : otherCountries.slice(0, 7);
  }, []);

  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) {
      return topDestinations;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return countriesData.filter((country) =>
      country.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [searchTerm, topDestinations]);

  const handleCountrySelection = (countryName: string) => {
    const isSelected = selectedCountries.some(c => c.countryName === countryName);
    
    if (!isSelected) {
      addCountry(countryName);
    }
  };

  const handleCitySelection = (countryName: string, cityName: string) => {
    const countryIndex = selectedCountries.findIndex(c => c.countryName === countryName);
    if (countryIndex !== -1) {
      setActiveCountryIndex(countryIndex);
      setTimeout(() => addCity(cityName), 0);
    }
  };

  const handleRemoveCountry = (countryName: string) => {
    removeCountry(countryName);
  };

  return (
    <div className="space-y-6">
      <DestinationSummary 
        selectedCountries={selectedCountries}
        activeCountryIndex={activeCountryIndex}
        navigateToCountry={navigateToCountry}
        isCountryComplete={isCountryComplete}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Sélectionner des pays et des villes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un pays..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredCountries.map((country) => {
              const isSelected = selectedCountries.some(c => c.countryName === country.name);
              const selectedCountry = selectedCountries.find(c => c.countryName === country.name);
              
              return (
                <div key={country.id} className="border rounded-lg">
                  {/* En-tête du pays */}
                  <div className="flex items-center justify-between p-3">
                    <button
                      onClick={() => handleCountrySelection(country.name)}
                      className={`flex items-center gap-2 flex-1 text-left ${
                        isSelected ? 'text-purple-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{country.flagCode}</span>
                      <span>{country.name}</span>
                      {isSelected && (
                        <span className="text-purple-600 text-xs">
                          ({selectedCountry?.cities.length || 0} ville{(selectedCountry?.cities.length || 0) > 1 ? 's' : ''})
                        </span>
                      )}
                    </button>
                    
                    {isSelected && (
                      <Button
                        onClick={() => handleRemoveCountry(country.name)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Villes ajoutées pour ce pays */}
                  {isSelected && selectedCountry && selectedCountry.cities.length > 0 && (
                    <div className="px-3 pb-2 border-t bg-gray-50">
                      <div className="space-y-2 pt-2">
                        {selectedCountry.cities.map((city, index) => (
                          <div key={index} className="bg-white p-3 rounded border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {city.cityName}
                              </span>
                              <Button
                                onClick={() => removeCity(city.cityName)}
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-xs text-gray-600">Arrivée</label>
                                <Input
                                  type="date"
                                  value={city.startDate}
                                  onChange={(e) => updateCityDates(city.cityName, 'startDate', e.target.value)}
                                  className="text-xs h-8"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-600">Départ</label>
                                <Input
                                  type="date"
                                  value={city.endDate}
                                  onChange={(e) => updateCityDates(city.cityName, 'endDate', e.target.value)}
                                  className="text-xs h-8"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Liste des villes disponibles */}
                  {isSelected && country.cities && country.cities.length > 0 && (
                    <div className="px-3 pb-3 bg-purple-50 border-t">
                      <div className="pt-2">
                        <p className="text-xs text-gray-600 mb-2">Villes disponibles :</p>
                        <div className="grid grid-cols-2 gap-2">
                          {country.cities.map((cityName) => {
                            const isAlreadyAdded = selectedCountry?.cities.some(city => city.cityName === cityName);
                            return (
                              <button
                                key={cityName}
                                onClick={() => {
                                  if (!isAlreadyAdded) {
                                    handleCitySelection(country.name, cityName);
                                  }
                                }}
                                className={`text-xs px-2 py-1 rounded text-left transition-colors ${
                                  isAlreadyAdded
                                    ? 'bg-green-100 text-green-700 cursor-default'
                                    : 'bg-white hover:bg-purple-100 text-gray-700 hover:text-purple-700 border border-purple-200'
                                }`}
                                disabled={isAlreadyAdded}
                              >
                                {isAlreadyAdded && <span className="mr-1">✓</span>}
                                {cityName}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
