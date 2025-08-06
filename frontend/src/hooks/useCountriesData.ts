
import { useState, useEffect, useMemo } from 'react';
import { countriesData } from '@/data/countries';

interface Country {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

export const useCountriesData = (activeCountry?: { countryName: string }) => {
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [citiesList, setCitiesList] = useState<City[]>([]);

  // Convert countries data to the expected format
  const allCountries = useMemo(() => 
    countriesData.map((country, index) => ({
      id: index + 1,
      name: country.name
    })), 
    []
  );

  useEffect(() => {
    setCountriesList(allCountries);
  }, [allCountries]);

  useEffect(() => {
    if (!activeCountry) {
      setCitiesList([]);
      return;
    }
    
    const timer = setTimeout(() => {
      // Find cities for the active country
      const countryData = countriesData.find(c => c.name === activeCountry.countryName);
      const cities = countryData?.cities || [];
      
      const formattedCities = cities.map((city, index) => ({
        id: index + 1,
        name: city
      }));
      
      setCitiesList(formattedCities);
    }, 100);

    return () => clearTimeout(timer);
  }, [activeCountry]);

  return { countriesList, citiesList };
};
