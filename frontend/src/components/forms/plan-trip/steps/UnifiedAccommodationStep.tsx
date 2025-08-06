
import React from 'react';
import { accommodationOptions } from '@/constants/formData';
import { Badge } from '@/components/ui/badge';
import { Wifi, Coffee, Car, Dumbbell, Baby, Shield, Volume2, Map, Star, TreePine } from 'lucide-react';

// Services d'hébergement disponibles
const accommodationServices = [
  { id: 'wifi', label: 'WiFi gratuit', icon: Wifi, category: 'essentiel' },
  { id: 'breakfast', label: 'Petit déjeuner', icon: Coffee, category: 'comfort' },
  { id: 'parking', label: 'Parking', icon: Car, category: 'pratique' },
  { id: 'gym', label: 'Salle de sport', icon: Dumbbell, category: 'wellness' },
  { id: 'spa', label: 'Spa & Wellness', icon: TreePine, category: 'wellness' },
  { id: 'kids', label: 'Services enfants', icon: Baby, category: 'famille' },
  { id: 'security', label: 'Sécurité 24h/24', icon: Shield, category: 'essentiel' },
  { id: 'quiet', label: 'Environnement calme', icon: Volume2, category: 'comfort' },
  { id: 'location', label: 'Emplacement central', icon: Map, category: 'pratique' },
  { id: 'luxury', label: 'Services de luxe', icon: Star, category: 'premium' }
];

// Critères qui conditionnent le choix d'hébergement
const accommodationCriteria = [
  { id: 'proximity_transport', label: 'Proximité transports', desc: 'Facilité d\'accès aux transports en commun', priority: 'high' },
  { id: 'city_center', label: 'Centre-ville', desc: 'Proche des attractions principales', priority: 'high' },
  { id: 'quiet_area', label: 'Quartier calme', desc: 'Environnement paisible pour se reposer', priority: 'medium' },
  { id: 'view', label: 'Belle vue', desc: 'Vue sur mer, montagne ou ville', priority: 'medium' },
  { id: 'local_culture', label: 'Immersion culturelle', desc: 'Quartier authentique et traditionnel', priority: 'medium' },
  { id: 'nightlife', label: 'Vie nocturne', desc: 'Proche des bars et restaurants', priority: 'low' },
  { id: 'business_district', label: 'Quartier d\'affaires', desc: 'Pour les voyages professionnels', priority: 'low' },
  { id: 'beach_access', label: 'Accès plage', desc: 'Proximité de la plage', priority: 'medium' },
  { id: 'shopping', label: 'Zone commerciale', desc: 'Proche des centres commerciaux', priority: 'low' },
  { id: 'family_friendly', label: 'Adapté aux familles', desc: 'Environnement sûr pour les enfants', priority: 'high' }
];

const serviceCategories = {
  essentiel: { label: 'Essentiels', color: 'bg-blue-500' },
  comfort: { label: 'Confort', color: 'bg-green-500' },
  pratique: { label: 'Pratique', color: 'bg-orange-500' },
  wellness: { label: 'Bien-être', color: 'bg-purple-500' },
  famille: { label: 'Famille', color: 'bg-pink-500' },
  premium: { label: 'Premium', color: 'bg-yellow-500' }
};

const priorityColors = {
  high: 'border-red-200 bg-red-50 text-red-800',
  medium: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  low: 'border-gray-200 bg-gray-50 text-gray-800'
};

interface UnifiedAccommodationStepProps {
  mode: 'simple' | 'advanced';
  selectedAccommodation: string;
  onAccommodationChange: (accommodation: string) => void;
  selectedPreferences?: string[];
  onPreferenceToggle?: (preference: string) => void;
  selectedServices?: string[];
  onServiceToggle?: (service: string) => void;
  selectedCriteria?: string[];
  onCriteriaToggle?: (criteria: string) => void;
}

export default function UnifiedAccommodationStep({ 
  mode,
  selectedAccommodation, 
  onAccommodationChange,
  selectedPreferences = [],
  onPreferenceToggle,
  selectedServices = [],
  onServiceToggle,
  selectedCriteria = [],
  onCriteriaToggle
}: UnifiedAccommodationStepProps) {
  
  if (mode === 'simple') {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Quel type d'hébergement préférez-vous ?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodationOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onAccommodationChange(option.id)}
              className={`group p-6 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                selectedAccommodation === option.id
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-xl'
                  : 'border-gray-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/50'
              }`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {option.emoji}
              </div>
              <div className="font-bold text-lg mb-2">{option.label}</div>
              <div className="text-sm opacity-70">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Advanced mode avec services et critères
  return (
    <div className="space-y-8">
      {/* Section Type d'hébergement */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Quel type d'hébergement préférez-vous ?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodationOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onAccommodationChange(option.id)}
              className={`group p-6 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                selectedAccommodation === option.id
                  ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xl'
                  : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50/50'
              }`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {option.emoji}
              </div>
              <div className="font-bold text-lg mb-2">{option.label}</div>
              <div className="text-sm opacity-70">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Section Services d'hébergement */}
      {onServiceToggle && (
        <div className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl border-2 border-blue-200">
          <h4 className="text-xl font-bold text-gray-900 text-center mb-4">
            🛎️ Quels services sont importants pour vous ?
          </h4>
          
          {/* Services par catégorie */}
          {Object.entries(serviceCategories).map(([categoryKey, category]) => {
            const categoryServices = accommodationServices.filter(service => service.category === categoryKey);
            if (categoryServices.length === 0) return null;
            
            return (
              <div key={categoryKey} className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`${category.color} text-white`}>
                    {category.label}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryServices.map((service) => {
                    const IconComponent = service.icon;
                    const isSelected = selectedServices.includes(service.id);
                    
                    return (
                      <button
                        key={service.id}
                        onClick={() => onServiceToggle(service.id)}
                        className={`group flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-100 text-blue-800 shadow-lg'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <IconComponent className="w-5 h-5 text-current" />
                        <span className="font-medium text-sm">{service.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Section Critères de choix */}
      {onCriteriaToggle && (
        <div className="space-y-6 p-6 bg-gradient-to-r from-green-50 to-yellow-50 rounded-3xl border-2 border-green-200">
          <h4 className="text-xl font-bold text-gray-900 text-center mb-4">
            🎯 Qu'est-ce qui conditionne votre choix d'hébergement ?
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accommodationCriteria.map((criteria) => {
              const isSelected = selectedCriteria.includes(criteria.id);
              
              return (
                <button
                  key={criteria.id}
                  onClick={() => onCriteriaToggle(criteria.id)}
                  className={`group p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? 'border-green-500 bg-green-100 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className={`font-bold text-lg ${isSelected ? 'text-green-800' : 'text-gray-900'}`}>
                      {criteria.label}
                    </h5>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${priorityColors[criteria.priority]} border-none`}
                    >
                      {criteria.priority === 'high' ? 'Important' : 
                       criteria.priority === 'medium' ? 'Modéré' : 'Optionnel'}
                    </Badge>
                  </div>
                  <p className={`text-sm ${isSelected ? 'text-green-700' : 'text-gray-600'}`}>
                    {criteria.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Résumé des sélections */}
      {(selectedServices.length > 0 || selectedCriteria.length > 0) && (
        <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border-2 border-purple-200">
          <h5 className="font-bold text-lg text-purple-900 mb-4 text-center">
            ✨ Votre profil d'hébergement personnalisé
          </h5>
          
          {selectedServices.length > 0 && (
            <div className="mb-4">
              <h6 className="font-semibold text-purple-800 mb-2">Services sélectionnés :</h6>
              <div className="flex flex-wrap gap-2">
                {selectedServices.map(serviceId => {
                  const service = accommodationServices.find(s => s.id === serviceId);
                  return service ? (
                    <Badge key={serviceId} variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                      {service.label}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
          
          {selectedCriteria.length > 0 && (
            <div>
              <h6 className="font-semibold text-purple-800 mb-2">Critères importants :</h6>
              <div className="flex flex-wrap gap-2">
                {selectedCriteria.map(criteriaId => {
                  const criteria = accommodationCriteria.find(c => c.id === criteriaId);
                  return criteria ? (
                    <Badge key={criteriaId} variant="outline" className="bg-green-100 text-green-800 border-green-300">
                      {criteria.label}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
