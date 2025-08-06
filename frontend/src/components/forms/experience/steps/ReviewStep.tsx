import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Tag, Image, Lightbulb } from 'lucide-react';

interface ReviewStepProps {
  data: any;
  onSubmit?: (data: any) => void;
}

const ReviewStep = ({ data, onSubmit }: ReviewStepProps) => {
  const [practicalTips, setPracticalTips] = useState<string>('');

  const handleSubmit = () => {
    const tips = practicalTips.split('\n').filter(tip => tip.trim());
    onSubmit?.({
      practicalTips: tips
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Vérification et Conseils</h2>
        <p className="text-gray-600 text-lg">
          Vérifiez vos informations et ajoutez des conseils pratiques
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Review Summary */}
        <Card className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Résumé de votre recommandation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">{data.title}</p>
                <p className="text-sm text-muted-foreground">Type: {data.type}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Localisation</p>
                <p className="text-sm text-muted-foreground">{data.location?.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Image className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Médias</p>
                <p className="text-sm text-muted-foreground">
                  {data.media?.photos?.length || 0} photo(s), {data.media?.videos?.length || 0} vidéo(s)
                </p>
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm">{data.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {data.categories?.activities?.map((activity: string) => (
                <span key={activity} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {activity}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Practical Tips */}
        <div className="space-y-4">
          <Label htmlFor="tips" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Conseils pratiques (optionnel)
          </Label>
          <Textarea
            id="tips"
            placeholder="Ajoutez des conseils pratiques (un par ligne) :
- Meilleur moment pour visiter
- Comment s'y rendre
- Ce qu'il faut prévoir
- Astuces particulières..."
            value={practicalTips}
            onChange={(e) => setPracticalTips(e.target.value)}
            rows={6}
            className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div className="flex justify-center pt-6">
          <Button 
            onClick={handleSubmit} 
            size="lg" 
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-12"
          >
            Publier ma recommandation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;