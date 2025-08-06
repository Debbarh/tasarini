import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MapPin, Euro, Image, User, Building } from 'lucide-react';

interface ReviewStepProps {
  data: any;
  onSubmit?: (data: any) => void;
}

const ReviewStep = ({ data, onSubmit }: ReviewStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    onSubmit?.({});
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      restaurant: 'Restaurant',
      accommodation: 'Hébergement',
      experience: 'Expérience',
      activity: 'Activité',
      workshop: 'Atelier',
      tour: 'Tour guidé',
      service: 'Service'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Vérification et Publication</h2>
        <p className="text-gray-600 text-lg">
          Vérifiez vos informations avant publication
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Résumé des informations */}
        <Card className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Récapitulatif de votre point d'intérêt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">{data.basicInfo?.title}</p>
                    <p className="text-sm text-purple-600">{getTypeLabel(data.basicInfo?.type)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Localisation</p>
                    <p className="text-sm text-gray-600">
                      {data.location?.address}, {data.location?.city}, {data.location?.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Euro className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Tarification</p>
                    <p className="text-sm text-gray-600">
                      À partir de {data.pricing?.basePrice} {data.pricing?.currency}
                    </p>
                    {data.pricing?.packages?.length > 0 && (
                      <p className="text-xs text-gray-500">
                        + {data.pricing.packages.length} forfait(s) supplémentaire(s)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Image className="h-5 w-5 text-pink-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Médias</p>
                    <p className="text-sm text-gray-600">
                      {data.media?.photos?.length || 0} photo(s), {data.media?.videos?.length || 0} vidéo(s)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Contact</p>
                    <p className="text-sm text-gray-600">{data.businessInfo?.businessName}</p>
                    <p className="text-sm text-gray-600">{data.businessInfo?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-800 mb-2">Description :</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {data.basicInfo?.description}
              </p>
            </div>

            {data.basicInfo?.categories?.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">Catégories :</p>
                <div className="flex flex-wrap gap-2">
                  {data.basicInfo.categories.map((category: string) => (
                    <span 
                      key={category} 
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Processus de validation */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">📋 Processus de validation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</div>
              <p className="text-sm text-blue-700">Soumission de votre point d'intérêt</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold">2</div>
              <p className="text-sm text-gray-600">Vérification par notre équipe (24-48h)</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold">3</div>
              <p className="text-sm text-gray-600">Publication sur la plateforme</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold">4</div>
              <p className="text-sm text-gray-600">Début des réservations</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-6">
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-12"
          >
            {isSubmitting ? 'Publication en cours...' : 'Publier mon point d\'intérêt'}
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500">
          En publiant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;