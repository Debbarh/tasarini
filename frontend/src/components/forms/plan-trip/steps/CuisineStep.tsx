import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface CuisineStepProps {
  selectedCuisines: string[];
  onCuisineToggle: (cuisine: string) => void;
}

const cuisineOptions = [
  { id: 'french', name: 'Française', emoji: '🇫🇷', desc: 'Gastronomie raffinée' },
  { id: 'italian', name: 'Italienne', emoji: '🇮🇹', desc: 'Pâtes et pizza authentiques' },
  { id: 'asian', name: 'Asiatique', emoji: '🥢', desc: 'Saveurs d\'Asie' },
  { id: 'mediterranean', name: 'Méditerranéenne', emoji: '🫒', desc: 'Cuisine saine et savoureuse' },
  { id: 'mexican', name: 'Mexicaine', emoji: '🌮', desc: 'Épices et saveurs authentiques' },
  { id: 'indian', name: 'Indienne', emoji: '🍛', desc: 'Épices et curry' },
  { id: 'japanese', name: 'Japonaise', emoji: '🍣', desc: 'Sushi et cuisine traditionnelle' },
  { id: 'thai', name: 'Thaïlandaise', emoji: '🌶️', desc: 'Équilibre sucré-salé-épicé' },
  { id: 'local', name: 'Cuisine locale', emoji: '🏠', desc: 'Spécialités de la région' },
  { id: 'vegetarian', name: 'Végétarienne', emoji: '🥗', desc: 'Options sans viande' },
  { id: 'vegan', name: 'Végane', emoji: '🌱', desc: '100% végétal' },
  { id: 'street-food', name: 'Street Food', emoji: '🥙', desc: 'Cuisine de rue authentique' }
];

const experienceTypes = [
  { id: 'fine-dining', name: 'Gastronomie Fine', emoji: '🍽️', desc: 'Restaurants étoilés et haute cuisine' },
  { id: 'local-markets', name: 'Marchés Locaux', emoji: '🛒', desc: 'Découverte des produits locaux' },
  { id: 'cooking-classes', name: 'Cours de Cuisine', emoji: '👨‍🍳', desc: 'Apprendre à cuisiner local' },
  { id: 'food-tours', name: 'Tours Gastronomiques', emoji: '🚶‍♂️', desc: 'Visites guidées culinaires' },
  { id: 'wine-tasting', name: 'Dégustation de Vins', emoji: '🍷', desc: 'Œnologie et vignobles' },
  { id: 'casual-dining', name: 'Restaurants Décontractés', emoji: '🍽️', desc: 'Bonne cuisine sans chichi' }
];

export default function CuisineStep({ selectedCuisines, onCuisineToggle }: CuisineStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Vos préférences culinaires</h3>
          <p className="text-gray-600">Découvrons les saveurs qui vous font rêver</p>
        </div>

        {/* Types de cuisine */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-900">Types de cuisine préférés</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cuisineOptions.map((cuisine) => (
              <div
                key={cuisine.id}
                className={`group p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
                  selectedCuisines.includes(cuisine.id)
                    ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                    : 'border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50/30'
                }`}
                onClick={() => onCuisineToggle(cuisine.id)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={cuisine.id}
                    checked={selectedCuisines.includes(cuisine.id)}
                    onChange={() => {}} // Handled by parent onClick
                    className="pointer-events-none"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xl">{cuisine.emoji}</span>
                      <span className="font-semibold">{cuisine.name}</span>
                    </div>
                    <p className="text-sm opacity-80">{cuisine.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expériences culinaires */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-900">Expériences culinaires souhaitées</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experienceTypes.map((experience) => (
              <div
                key={experience.id}
                className={`group p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
                  selectedCuisines.includes(experience.id)
                    ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-md'
                    : 'border-gray-200 hover:border-amber-300 bg-white hover:bg-amber-50/30'
                }`}
                onClick={() => onCuisineToggle(experience.id)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={experience.id}
                    checked={selectedCuisines.includes(experience.id)}
                    onChange={() => {}} // Handled by parent onClick
                    className="pointer-events-none"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xl">{experience.emoji}</span>
                      <span className="font-semibold">{experience.name}</span>
                    </div>
                    <p className="text-sm opacity-80">{experience.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}