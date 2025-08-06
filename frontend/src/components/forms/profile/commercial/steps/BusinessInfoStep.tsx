import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Building, Mail, Phone, Globe } from 'lucide-react';

interface BusinessInfoStepProps {
  data: any;
  onNext: (data: any) => void;
}

const BusinessInfoStep = ({ data, onNext }: BusinessInfoStepProps) => {
  const [formData, setFormData] = useState({
    ownerName: data.businessInfo?.ownerName || '',
    businessName: data.businessInfo?.businessName || '',
    email: data.businessInfo?.email || '',
    phone: data.businessInfo?.phone || '',
    website: data.businessInfo?.website || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ businessInfo: formData });
  };

  const isValid = formData.ownerName.trim() && formData.businessName.trim() && 
                  formData.email.trim() && formData.phone.trim();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Informations professionnelles</h2>
        <p className="text-gray-600 text-lg">
          Complétez vos informations de contact et business
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="ownerName" className="text-base font-semibold text-gray-700">Nom du propriétaire *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="ownerName"
                placeholder="Votre nom complet"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="businessName" className="text-base font-semibold text-gray-700">Nom commercial *</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="businessName"
                placeholder="Nom de votre établissement"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-base font-semibold text-gray-700">Email professionnel *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="contact@restaurant.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="phone" className="text-base font-semibold text-gray-700">Téléphone *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="+33 1 23 45 67 89"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="website" className="text-base font-semibold text-gray-700">Site web (optionnel)</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="website"
              type="url"
              placeholder="https://www.monrestaurant.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">🔒 Confidentialité</h4>
          <p className="text-sm text-blue-700">
            Vos informations de contact ne seront visibles que par les voyageurs qui réservent chez vous. 
            Elles nous permettent de vous contacter pour la validation de votre établissement.
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

export default BusinessInfoStep;