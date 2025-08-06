import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Euro, Plus, Trash2 } from 'lucide-react';

const currencies = [
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'USD', label: 'Dollar US ($)' },
  { value: 'GBP', label: 'Livre Sterling (£)' },
];

const priceTypes = [
  { value: 'per_person', label: 'Par personne' },
  { value: 'per_group', label: 'Par groupe' },
  { value: 'per_night', label: 'Par nuit' },
  { value: 'per_hour', label: 'Par heure' },
  { value: 'fixed', label: 'Prix fixe' },
];

interface PricingStepProps {
  data: any;
  onNext: (data: any) => void;
}

const PricingStep = ({ data, onNext }: PricingStepProps) => {
  const [formData, setFormData] = useState({
    basePrice: data.pricing?.basePrice || '',
    currency: data.pricing?.currency || 'EUR',
    priceType: data.pricing?.priceType || 'per_person',
    packages: data.pricing?.packages || []
  });

  const [newPackage, setNewPackage] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    includes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ 
      pricing: {
        ...formData,
        basePrice: parseFloat(formData.basePrice) || 0,
        packages: formData.packages.map((pkg: any) => ({
          ...pkg,
          price: parseFloat(pkg.price) || 0
        }))
      }
    });
  };

  const addPackage = () => {
    if (newPackage.name && newPackage.price) {
      setFormData(prev => ({
        ...prev,
        packages: [...prev.packages, {
          id: Date.now().toString(),
          ...newPackage,
          price: parseFloat(newPackage.price) || 0,
          includes: newPackage.includes.split(',').map(item => item.trim()).filter(Boolean)
        }]
      }));
      setNewPackage({ name: '', description: '', price: '', duration: '', includes: '' });
    }
  };

  const removePackage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter((_: any, i: number) => i !== index)
    }));
  };

  const isValid = formData.basePrice && formData.currency && formData.priceType;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tarification</h2>
        <p className="text-gray-600 text-lg">
          Définissez vos prix et options tarifaires
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Euro className="h-5 w-5 text-green-600" />
              Prix de base
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="basePrice" className="text-base font-semibold text-gray-700">Montant *</Label>
                <Input
                  id="basePrice"
                  type="number"
                  placeholder="50"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold text-gray-700">Devise *</Label>
                <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                  <SelectTrigger className="border-gray-300 focus:border-green-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold text-gray-700">Type de tarif *</Label>
                <Select value={formData.priceType} onValueChange={(value) => setFormData({ ...formData, priceType: value })}>
                  <SelectTrigger className="border-gray-300 focus:border-green-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plus className="h-5 w-5 text-purple-600" />
              Forfaits optionnels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Nom du forfait</Label>
                <Input
                  placeholder="Menu dégustation"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Prix</Label>
                <Input
                  type="number"
                  placeholder="80"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Durée</Label>
                <Input
                  placeholder="2 heures"
                  value={newPackage.duration}
                  onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Inclus (séparé par virgules)</Label>
                <Input
                  placeholder="Apéritif, 5 plats, vins"
                  value={newPackage.includes}
                  onChange={(e) => setNewPackage({ ...newPackage, includes: e.target.value })}
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={addPackage}
              variant="outline"
              className="w-full border-purple-300 hover:bg-purple-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter ce forfait
            </Button>

            {formData.packages.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Forfaits ajoutés :</h4>
                {formData.packages.map((pkg: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium">{pkg.name} - {pkg.price} {formData.currency}</p>
                      <p className="text-sm text-gray-600">{pkg.duration}</p>
                    </div>
                    <Button
                      type="button"
                      onClick={() => removePackage(index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

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

export default PricingStep;