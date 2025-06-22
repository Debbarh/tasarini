
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlusCircle, X, Utensils, Accessibility, Heart, MessageSquare } from 'lucide-react';

interface SpecialSpecificationsProps {
  specifications: {
    dietary: string[];
    accessibility: string[];
    medical: string;
    specialRequests: string;
    customPreferences: string[];
  };
  onSpecificationsChange: (specifications: any) => void;
}

export default function SpecialSpecifications({ 
  specifications, 
  onSpecificationsChange 
}: SpecialSpecificationsProps) {
  const [newCustomPreference, setNewCustomPreference] = useState('');

  const dietaryOptions = [
    { value: 'vegetarian', label: 'Végétarien', icon: '🥗' },
    { value: 'vegan', label: 'Végétalien', icon: '🌱' },
    { value: 'halal', label: 'Halal', icon: '☪️' },
    { value: 'kosher', label: 'Casher', icon: '✡️' },
    { value: 'gluten-free', label: 'Sans gluten', icon: '🌾' },
    { value: 'lactose-free', label: 'Sans lactose', icon: '🥛' },
    { value: 'allergies', label: 'Allergies alimentaires', icon: '⚠️' }
  ];

  const accessibilityOptions = [
    { value: 'wheelchair', label: 'Accès fauteuil roulant', icon: '♿' },
    { value: 'mobility', label: 'Mobilité réduite', icon: '🦽' },
    { value: 'visual', label: 'Déficience visuelle', icon: '👁️' },
    { value: 'hearing', label: 'Déficience auditive', icon: '👂' },
    { value: 'elevator', label: 'Ascenseur nécessaire', icon: '🛗' }
  ];

  const toggleOption = (category: 'dietary' | 'accessibility', value: string) => {
    const newSpecs = {
      ...specifications,
      [category]: specifications[category].includes(value)
        ? specifications[category].filter(item => item !== value)
        : [...specifications[category], value]
    };
    onSpecificationsChange(newSpecs);
  };

  const addCustomPreference = () => {
    if (newCustomPreference.trim()) {
      const newSpecs = {
        ...specifications,
        customPreferences: [...specifications.customPreferences, newCustomPreference.trim()]
      };
      onSpecificationsChange(newSpecs);
      setNewCustomPreference('');
    }
  };

  const removeCustomPreference = (index: number) => {
    const newSpecs = {
      ...specifications,
      customPreferences: specifications.customPreferences.filter((_, i) => i !== index)
    };
    onSpecificationsChange(newSpecs);
  };

  const updateField = (field: string, value: string) => {
    const newSpecs = { ...specifications, [field]: value };
    onSpecificationsChange(newSpecs);
  };

  return (
    <div className="space-y-6">
      {/* Restrictions alimentaires */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-lg font-semibold">
          <Utensils className="w-5 h-5 text-orange-600" />
          Restrictions alimentaires
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {dietaryOptions.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption('dietary', option.value)}
              className={`p-3 rounded-lg border-2 text-sm transition-all ${
                specifications.dietary.includes(option.value)
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accessibilité */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-lg font-semibold">
          <Accessibility className="w-5 h-5 text-blue-600" />
          Besoins d'accessibilité
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {accessibilityOptions.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption('accessibility', option.value)}
              className={`p-3 rounded-lg border-2 text-sm transition-all ${
                specifications.accessibility.includes(option.value)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conditions médicales */}
      <div className="space-y-3">
        <Label htmlFor="medical" className="flex items-center gap-2 text-lg font-semibold">
          <Heart className="w-5 h-5 text-red-600" />
          Conditions médicales particulières
        </Label>
        <Textarea
          id="medical"
          placeholder="Décrivez brièvement toute condition médicale dont nous devrions tenir compte..."
          value={specifications.medical}
          onChange={(e) => updateField('medical', e.target.value)}
          className="min-h-[80px]"
        />
      </div>

      {/* Demandes spéciales */}
      <div className="space-y-3">
        <Label htmlFor="special" className="flex items-center gap-2 text-lg font-semibold">
          <MessageSquare className="w-5 h-5 text-purple-600" />
          Demandes spéciales
        </Label>
        <Textarea
          id="special"
          placeholder="Occasion spéciale, préférences particulières, demandes spécifiques..."
          value={specifications.specialRequests}
          onChange={(e) => updateField('specialRequests', e.target.value)}
          className="min-h-[80px]"
        />
      </div>

      {/* Préférences personnalisées */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-lg font-semibold">
          <PlusCircle className="w-5 h-5 text-green-600" />
          Autres préférences
        </Label>
        <div className="flex gap-2">
          <Input
            placeholder="Ajouter une préférence personnalisée..."
            value={newCustomPreference}
            onChange={(e) => setNewCustomPreference(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomPreference()}
          />
          <Button onClick={addCustomPreference} size="sm" variant="outline" type="button">
            Ajouter
          </Button>
        </div>
        {specifications.customPreferences.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {specifications.customPreferences.map((pref, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {pref}
                <button
                  type="button"
                  onClick={() => removeCustomPreference(index)}
                  className="text-green-600 hover:text-green-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
