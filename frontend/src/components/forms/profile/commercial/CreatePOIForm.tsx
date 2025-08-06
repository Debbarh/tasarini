import { useState } from 'react';
import { ArrowLeft, MapPin, Euro, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BasicInfoStep from './steps/BasicInfoStep';
import LocationStep from './steps/LocationStep';
import PricingStep from './steps/PricingStep';
import MediaStep from './steps/MediaStep';
import BusinessInfoStep from './steps/BusinessInfoStep';
import ReviewStep from './steps/ReviewStep';
import { CommercialPOI, CommercialPOIType } from '@/types/commercialPOI';

interface CreatePOIFormProps {
  onBack: () => void;
  onPOICreated: (poi: CommercialPOI) => void;
}

interface POIFormData {
  basicInfo?: {
    title: string;
    description: string;
    type: CommercialPOIType;
    categories: string[];
    amenities: string[];
  };
  location?: {
    address: string;
    city: string;
    country: string;
    coordinates: { latitude: number; longitude: number };
  };
  pricing?: {
    basePrice: number;
    currency: string;
    priceType: string;
    packages?: any[];
  };
  media?: {
    photos: string[];
    videos: string[];
  };
  businessInfo?: {
    ownerName: string;
    businessName: string;
    email: string;
    phone: string;
    website?: string;
  };
}

const CreatePOIForm = ({ onBack, onPOICreated }: CreatePOIFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<POIFormData>({});

  const steps = [
    { id: 1, title: "Informations de base", icon: MapPin, component: BasicInfoStep },
    { id: 2, title: "Localisation", icon: MapPin, component: LocationStep },
    { id: 3, title: "Tarification", icon: Euro, component: PricingStep },
    { id: 4, title: "Médias", icon: Users, component: MediaStep },
    { id: 5, title: "Informations business", icon: Clock, component: BusinessInfoStep },
    { id: 6, title: "Validation", icon: Clock, component: ReviewStep },
  ];

  const handleNext = (stepData: Partial<POIFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = (finalData: Partial<POIFormData>) => {
    const completeData = { ...formData, ...finalData };
    
    // Créer le POI complet
    const newPOI: CommercialPOI = {
      id: Date.now().toString(),
      title: completeData.basicInfo?.title || '',
      description: completeData.basicInfo?.description || '',
      type: completeData.basicInfo?.type || 'restaurant',
      location: {
        address: completeData.location?.address || '',
        city: completeData.location?.city || '',
        country: completeData.location?.country || '',
        coordinates: completeData.location?.coordinates || { latitude: 0, longitude: 0 }
      },
      pricing: {
        basePrice: completeData.pricing?.basePrice || 0,
        currency: completeData.pricing?.currency || 'EUR',
        priceType: completeData.pricing?.priceType as any || 'per_person'
      },
      availability: {
        schedule: {
          monday: { isOpen: true },
          tuesday: { isOpen: true },
          wednesday: { isOpen: true },
          thursday: { isOpen: true },
          friday: { isOpen: true },
          saturday: { isOpen: true },
          sunday: { isOpen: true }
        },
        capacity: 50,
        advanceBooking: 1
      },
      media: {
        photos: completeData.media?.photos || [],
        videos: completeData.media?.videos || []
      },
      amenities: completeData.basicInfo?.amenities || [],
      categories: completeData.basicInfo?.categories || [],
      languages: ['Français', 'Anglais'],
      businessInfo: {
        ownerName: completeData.businessInfo?.ownerName || '',
        businessName: completeData.businessInfo?.businessName || '',
        email: completeData.businessInfo?.email || '',
        phone: completeData.businessInfo?.phone || '',
        website: completeData.businessInfo?.website
      },
      policies: {
        cancellation: 'Annulation gratuite 24h avant',
        payment: ['Carte bancaire', 'Espèces']
      },
      seo: {
        keywords: completeData.basicInfo?.categories || [],
        highlights: []
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorId: 'current-user'
    };

    onPOICreated(newPOI);
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8 pt-8">
          <Button variant="ghost" onClick={handleBack} className="gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Créer un Point d'Intérêt Commercial
            </h1>
            <p className="text-gray-600 text-lg">
              Étape {currentStep} sur {steps.length}: {steps[currentStep - 1].title}
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index + 1 <= currentStep
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-16 rounded-full transition-all duration-300 ${
                      index + 1 < currentStep ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <CurrentStepComponent
          data={formData}
          onNext={handleNext}
          onSubmit={currentStep === steps.length ? handleSubmit : undefined}
        />
      </div>
    </div>
  );
};

export default CreatePOIForm;