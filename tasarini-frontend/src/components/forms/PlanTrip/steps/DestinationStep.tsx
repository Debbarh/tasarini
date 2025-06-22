
import React, { useState, useMemo } from 'react';
import { PlanTripFormData, StepProps } from '../../../../types/planTrip';
import { useDestinationLogic } from '../../../../hooks/useDestinationLogic';
import { useCountriesData } from '../../../../hooks/useCountriesData';
import DestinationSummary from './components/DestinationSummary';
import CountrySelector from './components/CountrySelector';
import CityConfiguration from './components/CityConfiguration';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
    isCountryComplete,
    validateDestinationData
  } = useDestinationLogic({
    formData,
    setFormData,
    selectedCountries,
    activeCountryIndex,
    setActiveCountryIndex
  });

  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) return countriesList;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return countriesList.filter((country) =>
      country.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [countriesList, searchTerm]);

  const handleNext = () => {
    if (validateDestinationData() && onNext) {
      onNext();
    }
  };

  return (
    <div className="space-y-4">
      <DestinationSummary 
        selectedCountries={selectedCountries}
        activeCountryIndex={activeCountryIndex}
        navigateToCountry={navigateToCountry}
        isCountryComplete={isCountryComplete}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CountrySelector 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredCountries={filteredCountries}
          selectedCountries={selectedCountries}
          addCountry={addCountry}
          removeCountry={removeCountry}
        />

        <CityConfiguration 
          activeCountry={activeCountry}
          citiesList={citiesList}
          removeCountry={removeCountry}
          addCity={addCity}
          removeCity={removeCity}
          updateCityDates={updateCityDates}
          isCountryComplete={isCountryComplete}
        />
      </div>

      {/* Navigation Button for first step */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={handleNext}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl border-0"
        >
          {t('planTrip.next')}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
