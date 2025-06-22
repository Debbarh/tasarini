
import React, { useState } from 'react';
import { StepProps } from '../../../../types/planTrip';
import { DollarSign, Utensils, ChefHat } from 'lucide-react';

const budgetOptions = [
  { value: 'budget', label: 'Économique', icon: '💰' },
  { value: 'standard', label: 'Standard', icon: '💵' },
  { value: 'premium', label: 'Premium', icon: '💎' },
  { value: 'luxury', label: 'Luxe', icon: '👑' }
];

const cuisineTypes = [
  { value: 'local', label: 'Cuisine locale', icon: '🍽️' },
  { value: 'moroccan', label: 'Cuisine marocaine', icon: '🍛' },
  { value: 'french', label: 'Cuisine française', icon: '🥖' },
  { value: 'international', label: 'Cuisine internationale', icon: '🌍' },
  { value: 'italian', label: 'Cuisine italienne', icon: '🍝' },
  { value: 'japanese', label: 'Cuisine japonaise', icon: '🍣' },
  { value: 'spanish', label: 'Cuisine espagnole', icon: '🥘' },
  { value: 'asian', label: 'Cuisine asiatique', icon: '🥢' },
  { value: 'lebanese', label: 'Cuisine libanaise', icon: '🧆' }
];

const diningPreferences = [
  { value: 'casual', label: 'Restauration décontractée', icon: '🍔' },
  { value: 'fast-food', label: 'Fast food', icon: '🍟' },
  { value: 'fine-dining', label: 'Gastronomie', icon: '🍷' },
  { value: 'buffet', label: 'Buffet', icon: '🍽️' },
  { value: 'cafe', label: 'Café ou bistro', icon: '☕' },
  { value: 'pub', label: 'Pub ou bar', icon: '🍺' },
  { value: 'food-trucks', label: 'Food trucks', icon: '🚚' },
  { value: 'street-food', label: 'Street food', icon: '🌮' },
  { value: 'farm-to-table', label: 'Farm to table', icon: '🌾' },
  { value: 'seafood', label: 'Fruits de mer', icon: '🦞' },
  { value: 'vegetarian', label: 'Végétarien ou vegan', icon: '🥗' },
  { value: 'barbecue', label: 'Barbecue', icon: '🔥' }
];

export default function BudgetAndFoodStep({ formData, setFormData }: StepProps) {
  const [selectedBudget, setSelectedBudget] = useState(formData.budgetAndFood.budget);
  const [selectedCuisines, setSelectedCuisines] = useState(formData.budgetAndFood.cuisine);

  const handleBudgetChange = (budget: string) => {
    setSelectedBudget(budget);
    setFormData({
      ...formData,
      budgetAndFood: {
        ...formData.budgetAndFood,
        budget
      }
    });
  };

  const handleCuisineToggle = (cuisine: string) => {
    const updatedCuisines = selectedCuisines.includes(cuisine)
      ? selectedCuisines.filter(c => c !== cuisine)
      : [...selectedCuisines, cuisine];
    
    setSelectedCuisines(updatedCuisines);
    setFormData({
      ...formData,
      budgetAndFood: {
        ...formData.budgetAndFood,
        cuisine: updatedCuisines
      }
    });
  };

  return (
    <div className="space-y-12">
      {/* Budget Selection */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900">Votre budget par personne</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {budgetOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleBudgetChange(option.value)}
              className={`p-6 rounded-3xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                selectedBudget === option.value
                  ? 'border-green-500 bg-green-50 text-green-700 shadow-xl ring-4 ring-green-100'
                  : 'border-gray-200 hover:border-green-300 bg-white hover:shadow-lg'
              }`}
            >
              <div className="text-4xl mb-4">{option.icon}</div>
              <h5 className="text-xl font-bold">{option.label}</h5>
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine Preferences */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <ChefHat className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900">J'ai envie d'essayer cette cuisine</h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cuisineTypes.map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine.value);
            return (
              <label
                key={cuisine.value}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-lg'
                    : 'border-gray-200 hover:border-orange-300 bg-white hover:shadow-md'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCuisineToggle(cuisine.value)}
                  className="sr-only"
                />
                <span className="text-2xl">{cuisine.icon}</span>
                <span className="font-medium text-sm">{cuisine.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Dining Preferences */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Utensils className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900">Et je préfère manger</h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {diningPreferences.map((preference) => {
            const isSelected = selectedCuisines.includes(preference.value);
            return (
              <label
                key={preference.value}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-md'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCuisineToggle(preference.value)}
                  className="sr-only"
                />
                <span className="text-2xl">{preference.icon}</span>
                <span className="font-medium text-sm">{preference.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Selected Summary */}
      {selectedCuisines.length > 0 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-purple-50 rounded-3xl border-2 border-orange-200">
          <h5 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-orange-600" />
            Vos préférences culinaires :
          </h5>
          <div className="flex flex-wrap gap-3">
            {selectedCuisines.map(cuisine => {
              const cuisineData = [...cuisineTypes, ...diningPreferences].find(c => c.value === cuisine);
              return (
                <span key={cuisine} className="px-4 py-2 bg-white text-gray-800 rounded-full text-sm font-medium shadow-sm border border-gray-200">
                  {cuisineData?.icon} {cuisineData?.label}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
