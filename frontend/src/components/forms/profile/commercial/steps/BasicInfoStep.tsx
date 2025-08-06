import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CommercialPOIType } from '@/types/commercialPOI';

const poiTypes = [
  { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { value: 'accommodation', label: 'Hébergement', icon: '🏨' },
  { value: 'experience', label: 'Expérience', icon: '🎯' },
  { value: 'activity', label: 'Activité', icon: '⚡' },
  { value: 'workshop', label: 'Atelier', icon: '👨‍🍳' },
  { value: 'tour', label: 'Tour guidé', icon: '🚶‍♂️' },
  { value: 'service', label: 'Service', icon: '🛎️' },
];

const categories = [
  'Gastronomie', 'Culture', 'Nature', 'Aventure', 'Détente', 'Sport',
  'Art', 'Histoire', 'Shopping', 'Vie nocturne', 'Famille', 'Romantique'
];

const amenities = [
  'WiFi gratuit', 'Parking', 'Climatisation', 'Accessible PMR', 'Animaux acceptés',
  'Service de conciergerie', 'Restaurant sur place', 'Bar', 'Piscine', 'Spa',
  'Salle de sport', 'Terrasse', 'Vue panoramique', 'Transport inclus'
];

interface BasicInfoStepProps {
  data: any;
  onNext: (data: any) => void;
}

const BasicInfoStep = ({ data, onNext }: BasicInfoStepProps) => {
  const [formData, setFormData] = useState({
    title: data.basicInfo?.title || '',
    description: data.basicInfo?.description || '',
    type: data.basicInfo?.type || '',
    categories: data.basicInfo?.categories || [],
    amenities: data.basicInfo?.amenities || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ basicInfo: formData });
  };

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const isValid = formData.title.trim() && formData.description.trim() && formData.type;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Informations de base</h2>
        <p className="text-gray-600 text-lg">
          Décrivez votre point d'intérêt commercial
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
        <div className="space-y-3">
          <Label htmlFor="title" className="text-base font-semibold text-gray-700">Nom de votre établissement/expérience *</Label>
          <Input
            id="title"
            placeholder="ex: Restaurant Le Petit Bistrot"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="type" className="text-base font-semibold text-gray-700">Type d'activité *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as CommercialPOIType })}>
            <SelectTrigger className="border-gray-300 focus:border-purple-500">
              <SelectValue placeholder="Sélectionnez le type" />
            </SelectTrigger>
            <SelectContent>
              {poiTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <span>{type.icon}</span>
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="description" className="text-base font-semibold text-gray-700">Description détaillée *</Label>
          <Textarea
            id="description"
            placeholder="Décrivez votre établissement, ce qui le rend unique, l'ambiance, les spécialités..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold text-gray-700">Catégories</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 transition-colors">
                <Checkbox
                  id={`category-${category}`}
                  checked={formData.categories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold text-gray-700">Équipements et services</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={formData.amenities.includes(amenity)}
                  onCheckedChange={() => toggleAmenity(amenity)}
                />
                <Label htmlFor={`amenity-${amenity}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <Button 
            type="submit" 
            disabled={!isValid} 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-12"
          >
            Continuer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfoStep;