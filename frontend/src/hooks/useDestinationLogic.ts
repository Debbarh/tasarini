import { useCallback } from 'react';
import { PlanTripFormData, CountryWithCities } from '../types/planTrip';
import { toast } from '@/hooks/use-toast';

interface UseDestinationLogicProps {
  formData: PlanTripFormData;
  setFormData: (data: PlanTripFormData) => void;
  selectedCountries: CountryWithCities[];
  activeCountryIndex: number;
  setActiveCountryIndex: (index: number) => void;
}

export const useDestinationLogic = ({
  formData,
  setFormData,
  selectedCountries,
  activeCountryIndex,
  setActiveCountryIndex
}: UseDestinationLogicProps) => {
  const addCountry = useCallback((name: string) => {
    if (!name.trim() || selectedCountries.some((c) => c.countryName === name)) {
      return;
    }
    
    const updated = [...selectedCountries, { countryName: name, cities: [] }];
    setFormData({ 
      ...formData, 
      destination: { countries: updated } 
    });
    setActiveCountryIndex(updated.length - 1);
  }, [selectedCountries, formData, setFormData, setActiveCountryIndex]);

  const removeCountry = useCallback((name: string) => {
    const updated = selectedCountries.filter((c) => c.countryName !== name);
    setFormData({ 
      ...formData, 
      destination: { countries: updated } 
    });
    
    // Ajuster l'index actif si nécessaire
    if (updated.length === 0) {
      setActiveCountryIndex(0);
    } else {
      const newIndex = Math.min(activeCountryIndex, updated.length - 1);
      setActiveCountryIndex(newIndex);
    }
  }, [selectedCountries, formData, setFormData, activeCountryIndex, setActiveCountryIndex]);

  const addCity = useCallback((cityName: string) => {
    if (!cityName.trim()) return;

    const activeCountry = selectedCountries[activeCountryIndex];
    if (!activeCountry || activeCountry.cities.some(city => city.cityName === cityName)) {
      return;
    }

    const updated = selectedCountries.map((c, idx) =>
      idx === activeCountryIndex
        ? {
            ...c,
            cities: [...c.cities, { cityName, startDate: '', endDate: '' }],
          }
        : c
    );
    
    setFormData({ 
      ...formData, 
      destination: { countries: updated } 
    });
  }, [selectedCountries, activeCountryIndex, formData, setFormData]);

  const removeCity = useCallback((cityName: string) => {
    const updated = selectedCountries.map((c, idx) =>
      idx === activeCountryIndex
        ? { ...c, cities: c.cities.filter((ci) => ci.cityName !== cityName) }
        : c
    );
    
    setFormData({ 
      ...formData, 
      destination: { countries: updated } 
    });
  }, [selectedCountries, activeCountryIndex, formData, setFormData]);

  const updateCityDates = useCallback((cityName: string, field: string, value: string) => {
    const updated = selectedCountries.map((c, idx) =>
      idx === activeCountryIndex
        ? {
            ...c,
            cities: c.cities.map((ci) => {
              if (ci.cityName === cityName) {
                const updatedCity = { ...ci, [field]: value };
                
                // Validation en temps réel
                if (field === 'startDate' && updatedCity.endDate) {
                  const startDate = new Date(value);
                  const endDate = new Date(updatedCity.endDate);
                  if (startDate >= endDate) {
                    toast({
                      title: "Date invalide",
                      description: "La date d'arrivée doit être antérieure à la date de départ.",
                      variant: "destructive"
                    });
                    return ci; // Garder l'ancienne valeur
                  }
                }
                
                if (field === 'endDate' && updatedCity.startDate) {
                  const startDate = new Date(updatedCity.startDate);
                  const endDate = new Date(value);
                  if (endDate <= startDate) {
                    toast({
                      title: "Date invalide",
                      description: "La date de départ doit être postérieure à la date d'arrivée.",
                      variant: "destructive"
                    });
                    return ci; // Garder l'ancienne valeur
                  }
                }
                
                return updatedCity;
              }
              return ci;
            }),
          }
        : c
    );
    
    setFormData({ 
      ...formData, 
      destination: { countries: updated } 
    });
  }, [selectedCountries, activeCountryIndex, formData, setFormData]);

  const navigateToCountry = useCallback((index: number) => {
    if (index >= 0 && index < selectedCountries.length) {
      setActiveCountryIndex(index);
    }
  }, [selectedCountries.length, setActiveCountryIndex]);

  const isCountryComplete = useCallback((country: CountryWithCities) => {
    return country.cities.length > 0 && 
           country.cities.every((city) => city.startDate && city.endDate);
  }, []);

  const detectDateGaps = useCallback(() => {
    const gaps: string[] = [];
    
    for (const country of selectedCountries) {
      if (country.cities.length <= 1) continue;
      
      // Trier les villes par date d'arrivée
      const sortedCities = [...country.cities]
        .filter(city => city.startDate && city.endDate)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      
      for (let i = 0; i < sortedCities.length - 1; i++) {
        const currentCity = sortedCities[i];
        const nextCity = sortedCities[i + 1];
        
        const currentEndDate = new Date(currentCity.endDate);
        const nextStartDate = new Date(nextCity.startDate);
        
        // Calculer la différence en jours
        const diffTime = nextStartDate.getTime() - currentEndDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
          gaps.push(`${diffDays - 1} jour(s) entre ${currentCity.cityName} et ${nextCity.cityName} en ${country.countryName}`);
        }
      }
    }
    
    return gaps;
  }, [selectedCountries]);

  const validateDestinationData = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedCountries.length === 0) {
      toast({
        title: "Destination manquante",
        description: "Veuillez sélectionner au moins un pays pour votre voyage.",
        variant: "destructive"
      });
      return false;
    }

    for (const country of selectedCountries) {
      if (country.cities.length === 0) {
        toast({
          title: "Villes manquantes",
          description: `Veuillez sélectionner au moins une ville pour ${country.countryName}.`,
          variant: "destructive"
        });
        return false;
      }

      // Trier les villes par date d'arrivée pour vérifier les chevauchements
      const citiesWithDates = country.cities.filter(city => city.startDate && city.endDate);
      const sortedCities = [...citiesWithDates].sort((a, b) => 
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );

      for (const city of country.cities) {
        if (!city.startDate) {
          toast({
            title: "Date d'arrivée manquante",
            description: `Veuillez renseigner la date d'arrivée pour ${city.cityName}.`,
            variant: "destructive"
          });
          return false;
        }

        if (!city.endDate) {
          toast({
            title: "Date de départ manquante",
            description: `Veuillez renseigner la date de départ pour ${city.cityName}.`,
            variant: "destructive"
          });
          return false;
        }

        const startDate = new Date(city.startDate);
        const endDate = new Date(city.endDate);

        // Règle 1: Les dates ne peuvent pas être dans le passé
        if (startDate < today) {
          toast({
            title: "Date d'arrivée invalide",
            description: `La date d'arrivée à ${city.cityName} ne peut pas être dans le passé.`,
            variant: "destructive"
          });
          return false;
        }

        if (endDate < today) {
          toast({
            title: "Date de départ invalide",
            description: `La date de départ de ${city.cityName} ne peut pas être dans le passé.`,
            variant: "destructive"
          });
          return false;
        }

        // Règle 2: La date de départ doit être après la date d'arrivée
        if (endDate <= startDate) {
          toast({
            title: "Dates incohérentes",
            description: `La date de départ de ${city.cityName} doit être après la date d'arrivée.`,
            variant: "destructive"
          });
          return false;
        }

        // Règle 3: Séjour minimum d'une nuit
        const diffTime = endDate.getTime() - startDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 1) {
          toast({
            title: "Séjour trop court",
            description: `Le séjour à ${city.cityName} doit être d'au moins une nuit.`,
            variant: "destructive"
          });
          return false;
        }
      }

      // Règle 4: Vérifier les chevauchements de dates dans le même pays
      for (let i = 0; i < sortedCities.length - 1; i++) {
        const currentCity = sortedCities[i];
        const nextCity = sortedCities[i + 1];
        
        const currentEndDate = new Date(currentCity.endDate);
        const nextStartDate = new Date(nextCity.startDate);
        
        if (nextStartDate < currentEndDate) {
          toast({
            title: "Dates qui se chevauchent",
            description: `Les séjours à ${currentCity.cityName} et ${nextCity.cityName} se chevauchent en ${country.countryName}.`,
            variant: "destructive"
          });
          return false;
        }
      }
    }

    // Vérifier les jours creux et afficher un avertissement (sans bloquer)
    const gaps = detectDateGaps();
    if (gaps.length > 0) {
      toast({
        title: "⚠️ Jours creux détectés",
        description: gaps.join(', '),
        variant: "default"
      });
    }

    return true;
  }, [selectedCountries, detectDateGaps]);

  return {
    addCountry,
    removeCountry,
    addCity,
    removeCity,
    updateCityDates,
    navigateToCountry,
    isCountryComplete,
    validateDestinationData,
    detectDateGaps
  };
};
