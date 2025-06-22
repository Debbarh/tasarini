
import React, { useState, useMemo } from 'react';
import { PlanTripFormData, StepProps } from '../../../types/planTrip';
import { useDestinationLogic } from '../../../hooks/useDestinationLogic';
import { useCountriesData } from '../../../hooks/useCountriesData';
import DestinationFilters from './components/DestinationFilters';
import CountryGrid from './components/CountryGrid';
import CountryConfiguration from './components/CountryConfiguration';

export default function DestinationStep({ formData, setFormData }: StepProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCountryIndex, setActiveCountryIndex] = useState(0);

  const selectedCountries = useMemo(() => 
    formData.destination.countries || [], 
    [formData.destination.countries]
  );

  const activeCountry = useMemo(() => 
    selectedCountries[activeCountryIndex], 
    [selectedCountries, activeCountryIndex]
  );

  const { countriesList, citiesList } = useCountriesData(activeCountry);

  const {
    addCountry,
    removeCountry,
    addCity,
    removeCity,
    updateCityDates,
    navigateToCountry,
    isCountryComplete
  } = useDestinationLogic({
    formData,
    setFormData,
    selectedCountries,
    activeCountryIndex,
    setActiveCountryIndex
  });

  // Filter countries based on search term and get regions
  const filteredCountries = useMemo(() => {
    const countries = countriesList.map(country => ({
      code: country.name.toLowerCase().replace(/\s+/g, '_'),
      name: country.name,
      flagCode: '🌍',
      region: 'Monde'
    }));

    if (!searchTerm.trim()) return countries;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return countries.filter((country) =>
      country.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [countriesList, searchTerm]);

  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(filteredCountries.map(c => c.region))];
    return ['Toutes les régions', ...uniqueRegions];
  }, [filteredCountries]);

  const [selectedRegion, setSelectedRegion] = useState('Toutes les régions');

  const finalFilteredCountries = useMemo(() => {
    if (selectedRegion === 'Toutes les régions') return filteredCountries;
    return filteredCountries.filter(c => c.region === selectedRegion);
  }, [filteredCountries, selectedRegion]);

  return (
    <div className="space-y-0.25">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0.25">
        <div className="space-y-0.25">
          <DestinationFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            regions={regions}
          />

          <CountryGrid 
            filteredCountries={finalFilteredCountries}
            selectedCountries={selectedCountries}
            searchTerm={searchTerm}
            addCountry={addCountry}
            removeCountry={removeCountry}
          />
        </div>

        <CountryConfiguration 
          activeCountry={activeCountry}
          removeCountry={removeCountry}
          addCity={addCity}
          removeCity={removeCity}
          updateCityDates={updateCityDates}
          isCountryComplete={isCountryComplete}
        />
      </div>
    </div>
  );
}
