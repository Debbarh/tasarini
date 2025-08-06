import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Search } from 'lucide-react';

interface LocationStepProps {
  data: any;
  onNext: (data: any) => void;
}

const LocationStep = ({ data, onNext }: LocationStepProps) => {
  const [formData, setFormData] = useState({
    address: data.location?.address || '',
    city: data.location?.city || '',
    country: data.location?.country || '',
    coordinates: data.location?.coordinates || { latitude: 48.8566, longitude: 2.3522 }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ location: formData });
  };

  const handleGeocode = () => {
    // Simulation géocodage - à remplacer par une vraie API
    const mockCoordinates = { latitude: 48.8566 + Math.random() * 0.1, longitude: 2.3522 + Math.random() * 0.1 };
    setFormData(prev => ({ ...prev, coordinates: mockCoordinates }));
  };

  const isValid = formData.address.trim() && formData.city.trim() && formData.country.trim();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Localisation</h2>
        <p className="text-gray-600 text-lg">
          Où se trouve votre établissement ou expérience ?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
        <div className="space-y-3">
          <Label htmlFor="address" className="text-base font-semibold text-gray-700">Adresse complète *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="address"
              placeholder="123 Rue de la Paix"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="city" className="text-base font-semibold text-gray-700">Ville *</Label>
            <Input
              id="city"
              placeholder="Paris"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="country" className="text-base font-semibold text-gray-700">Pays *</Label>
            <Input
              id="country"
              placeholder="France"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base font-semibold text-gray-700">Coordonnées GPS</Label>
            <Button
              type="button"
              onClick={handleGeocode}
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-purple-50"
            >
              <Search className="h-4 w-4" />
              Géolocaliser
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Latitude</Label>
              <Input
                value={formData.coordinates.latitude.toFixed(6)}
                onChange={(e) => setFormData({
                  ...formData,
                  coordinates: { ...formData.coordinates, latitude: parseFloat(e.target.value) || 0 }
                })}
                className="mt-1 text-sm"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Longitude</Label>
              <Input
                value={formData.coordinates.longitude.toFixed(6)}
                onChange={(e) => setFormData({
                  ...formData,
                  coordinates: { ...formData.coordinates, longitude: parseFloat(e.target.value) || 0 }
                })}
                className="mt-1 text-sm"
              />
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            Les coordonnées GPS permettront aux voyageurs de vous trouver facilement
          </p>
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

export default LocationStep;