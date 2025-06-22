import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, ArrowRightIcon, SparklesIcon, HeartIcon } from "lucide-react";

interface TripData {
  mode: 'plan' | 'inspire';
  travelerProfile?: {
    segment: string;
    subSegment: string;
    groupComposition: string;
  };
  preferences?: {
    accommodation: string;
    ambiance: string;
    gastronomy: string[];
    experiences: string[];
  };
  inspiration?: {
    budget: string;
    duration: string;
    season: string;
    interests: string;
  };
}

interface BeInspiredFormProps {
  onComplete: (data: TripData) => void;
  onBack: () => void;
}

const travelerSegments = {
  "Senior": ["Retraité actif", "Voyage de luxe", "Croisière", "Circuit culturel"],
  "Junior": ["Backpacker", "Étudiant", "Digital nomad", "Aventurier"],
  "Famille": ["Famille avec enfants", "Famille recomposée", "Grands-parents et petits-enfants"],
  "Couple": ["Lune de miel", "Anniversaire", "Voyage romantique", "Week-end"],
  "Groupe": ["Amis", "Voyage d'affaires", "Événement spécial", "Club/Association"]
};

const accommodationTypes = [
  "Hôtel", "Riad", "Maison d'hôtes", "Villa", "Appartement", "Auberge", "Camping", "Resort"
];

const ambianceTypes = [
  "Luxe", "Authentique", "Décontractée", "Aventure", "Romantique", "Familiale", "Culturelle", "Nature"
];

const gastronomyOptions = [
  "Cuisine locale", "Gastronomie fine", "Street food", "Végétarien/Vegan", "Halal", "Sans gluten", "Cours de cuisine"
];

const experienceTypes = [
  "Trekking", "Culture", "Gastronomie", "Bien-être", "Aventure", "Shopping", "Photographie", "Art", "Musique", "Histoire"
];

const budgetRanges = [
  "Économique (< 50€/jour)", 
  "Moyen (50-100€/jour)", 
  "Confort (100-200€/jour)", 
  "Luxe (> 200€/jour)"
];

const durations = [
  "Week-end (2-3 jours)",
  "Court séjour (4-7 jours)",
  "Séjour moyen (1-2 semaines)",
  "Long voyage (3+ semaines)"
];

const seasons = [
  "Printemps", "Été", "Automne", "Hiver", "Peu importe"
];

const BeInspiredForm = ({ onComplete, onBack }: BeInspiredFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TripData>({ mode: 'inspire' });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  const updateFormData = (updates: Partial<TripData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <SparklesIcon className="w-12 h-12 mx-auto text-orange-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Qui êtes-vous ?</h3>
              <p className="text-gray-600">Aidez-nous à comprendre votre style de voyage</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-4 block">Votre profil voyageur</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.keys(travelerSegments).map(segment => (
                    <button
                      key={segment}
                      onClick={() => updateFormData({ 
                        travelerProfile: { ...formData.travelerProfile, segment } as any 
                      })}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                        formData.travelerProfile?.segment === segment
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">
                        {segment === 'Senior' ? '👴' : 
                         segment === 'Junior' ? '🎒' :
                         segment === 'Famille' ? '👨‍👩‍👧‍👦' :
                         segment === 'Couple' ? '💑' : '👥'}
                      </div>
                      <div className="font-medium">{segment}</div>
                    </button>
                  ))}
                </div>
              </div>

              {formData.travelerProfile?.segment && (
                <div>
                  <Label className="text-base font-medium mb-3 block">Précisez votre style</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {travelerSegments[formData.travelerProfile.segment as keyof typeof travelerSegments].map(subSegment => (
                      <button
                        key={subSegment}
                        onClick={() => updateFormData({ 
                          travelerProfile: { ...formData.travelerProfile, subSegment } as any 
                        })}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                          formData.travelerProfile?.subSegment === subSegment
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        {subSegment}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label className="text-base font-medium mb-3 block">Composition de votre groupe</Label>
                <Input 
                  placeholder="Ex: 2 adultes, 1 enfant de 8 ans"
                  value={formData.travelerProfile?.groupComposition || ""}
                  onChange={(e) => updateFormData({ 
                    travelerProfile: { ...formData.travelerProfile, groupComposition: e.target.value } as any 
                  })}
                  className="text-lg py-3"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <HeartIcon className="w-12 h-12 mx-auto text-rose-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Vos paramètres</h3>
              <p className="text-gray-600">Définissons le cadre de votre aventure</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label className="text-base font-medium mb-4 block">Budget par jour</Label>
                <div className="space-y-3">
                  {budgetRanges.map(budget => (
                    <button
                      key={budget}
                      onClick={() => updateFormData({ 
                        inspiration: { ...formData.inspiration, budget } as any 
                      })}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        formData.inspiration?.budget === budget
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="font-medium">{budget.split('(')[0]}</div>
                      <div className="text-sm opacity-70">{budget.match(/\(([^)]+)\)/)?.[1]}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Durée souhaitée</Label>
                <div className="space-y-3">
                  {durations.map(duration => (
                    <button
                      key={duration}
                      onClick={() => updateFormData({ 
                        inspiration: { ...formData.inspiration, duration } as any 
                      })}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        formData.inspiration?.duration === duration
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-medium">{duration.split('(')[0]}</div>
                      <div className="text-sm opacity-70">{duration.match(/\(([^)]+)\)/)?.[1]}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Saison préférée</Label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {seasons.map(season => (
                  <button
                    key={season}
                    onClick={() => updateFormData({ 
                      inspiration: { ...formData.inspiration, season } as any 
                    })}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 text-center ${
                      formData.inspiration?.season === season
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">
                      {season === 'Printemps' ? '🌸' :
                       season === 'Été' ? '☀️' :
                       season === 'Automne' ? '🍂' :
                       season === 'Hiver' ? '❄️' : '🌍'}
                    </div>
                    <div className="text-sm font-medium">{season}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Décrivez vos rêves de voyage</Label>
              <Textarea 
                placeholder="Parlez-nous de vos passions, vos envies, ce qui vous fait vibrer..."
                value={formData.inspiration?.interests || ""}
                onChange={(e) => updateFormData({ 
                  inspiration: { ...formData.inspiration, interests: e.target.value } as any 
                })}
                rows={4}
                className="text-lg"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-semibold mb-4 block">Préférences de séjour</Label>
            
            <div>
              <Label className="text-base font-medium mb-2 block">Type d'hébergement</Label>
              <Select 
                value={formData.preferences?.accommodation || ""} 
                onValueChange={(value) => updateFormData({ 
                  preferences: { ...formData.preferences, accommodation: value } as any 
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez votre hébergement" />
                </SelectTrigger>
                <SelectContent>
                  {accommodationTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">Ambiance recherchée</Label>
              <Select 
                value={formData.preferences?.ambiance || ""} 
                onValueChange={(value) => updateFormData({ 
                  preferences: { ...formData.preferences, ambiance: value } as any 
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez l'ambiance" />
                </SelectTrigger>
                <SelectContent>
                  {ambianceTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Préférences gastronomiques</Label>
              <div className="grid grid-cols-2 gap-3">
                {gastronomyOptions.map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option}
                      checked={formData.preferences?.gastronomy?.includes(option) || false}
                      onCheckedChange={(checked) => {
                        const currentGastronomy = formData.preferences?.gastronomy || [];
                        if (checked) {
                          updateFormData({ 
                            preferences: { 
                              ...formData.preferences, 
                              gastronomy: [...currentGastronomy, option] 
                            } as any 
                          });
                        } else {
                          updateFormData({ 
                            preferences: { 
                              ...formData.preferences, 
                              gastronomy: currentGastronomy.filter(g => g !== option) 
                            } as any 
                          });
                        }
                      }}
                    />
                    <label htmlFor={option} className="text-sm font-medium cursor-pointer">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-semibold mb-4 block">Types d'expériences souhaitées</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {experienceTypes.map(experience => (
                <div key={experience} className="flex items-center space-x-2">
                  <Checkbox 
                    id={experience}
                    checked={formData.preferences?.experiences?.includes(experience) || false}
                    onCheckedChange={(checked) => {
                      const currentExperiences = formData.preferences?.experiences || [];
                      if (checked) {
                        updateFormData({ 
                          preferences: { 
                            ...formData.preferences, 
                            experiences: [...currentExperiences, experience] 
                          } as any 
                        });
                      } else {
                        updateFormData({ 
                          preferences: { 
                            ...formData.preferences, 
                            experiences: currentExperiences.filter(e => e !== experience) 
                          } as any 
                        });
                      }
                    }}
                  />
                  <label htmlFor={experience} className="text-sm font-medium cursor-pointer">
                    {experience}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen py-8 relative"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="text-white hover:bg-white/20 border border-white/30"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <CardTitle className="text-3xl font-bold">✨ Be Inspired</CardTitle>
              <div className="text-lg font-medium">Étape {step}/4</div>
            </div>
            <div className="relative w-full bg-white/20 rounded-full h-3 mt-6">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </CardHeader>

          <CardContent className="p-10 min-h-[500px]">
            {renderStepContent()}
          </CardContent>

          <div className="flex justify-between p-10 pt-0 bg-gray-50">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={step === 1}
              className="flex items-center px-6 py-3 text-lg"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Précédent
            </Button>
            
            {step < 4 ? (
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 flex items-center px-6 py-3 text-lg shadow-lg"
              >
                Suivant
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-3 text-lg shadow-lg"
              >
                ✨ Révélez ma destination
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BeInspiredForm;
