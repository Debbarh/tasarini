
import React, { useState } from 'react';
import { StepProps } from '../../../../types/planTrip';
import AccommodationTypeSelector from './components/AccommodationTypeSelector';
import AccommodationPreferences from './components/AccommodationPreferences';

export default function AccommodationStep({ formData, setFormData }: StepProps) {
  const [selectedType, setSelectedType] = useState(formData.accommodation.type);
  const [selectedPreferences, setSelectedPreferences] = useState(formData.accommodation.preferences);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setFormData({
      ...formData,
      accommodation: {
        ...formData.accommodation,
        type
      }
    });
  };

  const handlePreferenceToggle = (preference: string) => {
    const updatedPreferences = selectedPreferences.includes(preference)
      ? selectedPreferences.filter(p => p !== preference)
      : [...selectedPreferences, preference];
    
    setSelectedPreferences(updatedPreferences);
    setFormData({
      ...formData,
      accommodation: {
        ...formData.accommodation,
        preferences: updatedPreferences
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Type d'hébergement avec recherche et filtres */}
      <AccommodationTypeSelector
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
      />

      {/* Preferences */}
      <AccommodationPreferences
        selectedPreferences={selectedPreferences}
        onPreferenceToggle={handlePreferenceToggle}
      />
    </div>
  );
}
