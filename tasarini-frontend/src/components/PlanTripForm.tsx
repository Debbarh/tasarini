
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeftIcon, ArrowRightIcon, HeartIcon, MapIcon, UsersIcon } from "lucide-react";

interface TripData {
  mode: 'plan' | 'inspire';
  countries?: string[];
  cities?: { [country: string]: string[] };
  dates?: { [city: string]: { start: string; end: string } };
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
}

interface PlanTripFormProps {
  onComplete: (data: TripData) => void;
  onBack: () => void;
}

const countries = [
  { name: "Maroc", emoji: "🇲🇦", description: "Magie berbère et palais enchantés", color: "from-orange-400 to-red-600" },
  { name: "France", emoji: "🇫🇷", description: "Art de vivre et châteaux romantiques", color: "from-blue-400 to-purple-600" },
  { name: "Espagne", emoji: "🇪🇸", description: "Passion flamenco et plages dorées", color: "from-yellow-400 to-orange-600" },
  { name: "Italie", emoji: "🇮🇹", description: "Renaissance et dolce vita", color: "from-green-400 to-blue-600" },
  { name: "Grèce", emoji: "🇬🇷", description: "Mythologie et îles paradisiaques", color: "from-blue-400 to-cyan-600" },
  { name: "Turquie", emoji: "🇹🇷", description: "Orient mystérieux et hammams", color: "from-red-400 to-pink-600" },
  { name: "Portugal", emoji: "🇵🇹", description: "Fado mélancolique et azulejos", color: "from-blue-400 to-teal-600" },
  { name: "Égypte", emoji: "🇪🇬", description: "Pyramides et croisières sur le Nil", color: "from-yellow-400 to-brown-600" },
  { name: "Tunisie", emoji: "🇹🇳", description: "Médina authentique et oasis", color: "from-orange-400 to-yellow-600" },
  { name: "Jordanie", emoji: "🇯🇴", description: "Pétra rose et désert étoilé", color: "from-pink-400 to-purple-600" },
  { name: "Japon", emoji: "🇯🇵", description: "Tradition zen et modernité", color: "from-pink-400 to-red-600" },
  { name: "Thaïlande", emoji: "🇹🇭", description: "Temples dorés et plages tropicales", color: "from-green-400 to-yellow-600" }
];

const travelerProfiles = [
  { segment: "Senior", icon: "👴", description: "Confort et découvertes culturelles", color: "from-blue-400 to-indigo-600" },
  { segment: "Junior", icon: "🎒", description: "Aventure et expériences authentiques", color: "from-green-400 to-teal-600" },
  { segment: "Famille", icon: "👨‍👩‍👧‍👦", description: "Activités pour tous les âges", color: "from-orange-400 to-yellow-600" },
  { segment: "Couple", icon: "💑", description: "Romance et moments intimes", color: "from-pink-400 to-red-600" },
  { segment: "Groupe", icon: "👥", description: "Partage et convivialité", color: "from-purple-400 to-pink-600" }
];

const accommodationTypes = [
  { type: "Hôtel", emoji: "🏨", description: "Service impeccable", image: "luxury-hotel" },
  { type: "Riad", emoji: "🕌", description: "Charme oriental authentique", image: "moroccan-riad" },
  { type: "Villa", emoji: "🏖️", description: "Intimité et liberté", image: "beachfront-villa" },
  { type: "Maison d'hôtes", emoji: "🏡", description: "Accueil familial chaleureux", image: "guesthouse" },
  { type: "Resort", emoji: "🌴", description: "Luxe et détente absolue", image: "tropical-resort" },
  { type: "Appartement", emoji: "🏠", description: "Comme chez soi", image: "city-apartment" }
];

const ambianceTypes = [
  { type: "Luxe", emoji: "💎", color: "from-purple-500 to-pink-600", description: "Raffinement absolu" },
  { type: "Authentique", emoji: "🎭", color: "from-orange-500 to-red-600", description: "Traditions locales" },
  { type: "Aventure", emoji: "🏔️", color: "from-green-500 to-blue-600", description: "Sensations fortes" },
  { type: "Romantique", emoji: "💕", color: "from-pink-500 to-red-600", description: "Moments magiques" },
  { type: "Décontractée", emoji: "🌊", color: "from-blue-500 to-cyan-600", description: "Zen et relaxation" },
  { type: "Culturelle", emoji: "🎨", color: "from-indigo-500 to-purple-600", description: "Art et histoire" }
];

const experienceTypes = [
  { type: "Trekking", emoji: "🥾", description: "Conquête des sommets" },
  { type: "Culture", emoji: "🏛️", description: "Patrimoine et traditions" },
  { type: "Gastronomie", emoji: "🍽️", description: "Saveurs du monde" },
  { type: "Bien-être", emoji: "🧘", description: "Sérénité et détente" },
  { type: "Aventure", emoji: "🏄", description: "Adrénaline garantie" },
  { type: "Shopping", emoji: "🛍️", description: "Trouvailles uniques" },
  { type: "Photographie", emoji: "📸", description: "Instants immortels" },
  { type: "Art", emoji: "🎨", description: "Créativité et inspiration" },
  { type: "Musique", emoji: "🎵", description: "Rythmes du monde" },
  { type: "Histoire", emoji: "📚", description: "Voyage dans le temps" }
];

const PlanTripForm = ({ onComplete, onBack }: PlanTripFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TripData>({ mode: 'plan' });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [budget, setBudget] = useState([2000]);
  const [duration, setDuration] = useState([7]);
  const [travelers, setTravelers] = useState([2]);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onComplete({
      ...formData,
      budget: budget[0],
      duration: duration[0],
      travelers: travelers[0]
    } as any);
  };

  const updateFormData = (updates: Partial<TripData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const toggleFavorite = (country: string) => {
    setFavorites(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const toggleCountrySelection = (countryName: string) => {
    const currentCountries = formData.countries || [];
    if (currentCountries.includes(countryName)) {
      updateFormData({ countries: currentCountries.filter(c => c !== countryName) });
    } else {
      updateFormData({ countries: [...currentCountries, countryName] });
    }
  };

  const stepBackgrounds = [
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ✨ Où rêvez-vous de partir ?
              </h2>
              <p className="text-lg text-gray-600">Sélectionnez les pays qui font battre votre cœur</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map(country => (
                <Card 
                  key={country.name} 
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 ${
                    formData.countries?.includes(country.name) 
                      ? 'border-blue-500 shadow-lg ring-4 ring-blue-100' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => toggleCountrySelection(country.name)}
                >
                  <CardHeader className={`bg-gradient-to-br ${country.color} text-white p-4 relative overflow-hidden`}>
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(country.name);
                        }}
                        className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        <HeartIcon 
                          className={`w-5 h-5 transition-colors ${
                            favorites.includes(country.name) ? 'text-red-500 fill-current' : 'text-white'
                          }`} 
                        />
                      </button>
                    </div>
                    <div className="text-4xl mb-2">{country.emoji}</div>
                    <CardTitle className="text-xl font-bold">{country.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{country.description}</p>
                    <div className={`mt-3 text-xs font-medium px-3 py-1 rounded-full inline-block bg-gradient-to-r ${country.color} text-white`}>
                      Découvrir ✨
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {formData.countries && formData.countries.length > 0 && (
              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">🎯 Destinations sélectionnées :</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.countries.map(country => {
                    const countryData = countries.find(c => c.name === country);
                    return (
                      <span key={country} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {countryData?.emoji} {country}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                👥 Quel type de voyageur êtes-vous ?
              </h2>
              <p className="text-lg text-gray-600">Nous personnaliserons votre expérience selon votre profil</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {travelerProfiles.map(profile => (
                <Card 
                  key={profile.segment}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                    formData.travelerProfile?.segment === profile.segment
                      ? 'border-emerald-500 shadow-lg ring-4 ring-emerald-100'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                  onClick={() => updateFormData({ 
                    travelerProfile: { ...formData.travelerProfile, segment: profile.segment } as any 
                  })}
                >
                  <CardHeader className={`bg-gradient-to-br ${profile.color} text-white p-6 text-center`}>
                    <div className="text-5xl mb-3">{profile.icon}</div>
                    <CardTitle className="text-xl font-bold">{profile.segment}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 text-center">
                    <p className="text-gray-600 text-sm">{profile.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  💰 Budget par personne
                </Label>
                <div className="px-4">
                  <Slider
                    value={budget}
                    onValueChange={setBudget}
                    max={10000}
                    min={500}
                    step={250}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>500€</span>
                    <span className="font-bold text-lg text-emerald-600">{budget[0]}€</span>
                    <span>10000€</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  📅 Durée du séjour
                </Label>
                <div className="px-4">
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    max={30}
                    min={3}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>3 jours</span>
                    <span className="font-bold text-lg text-emerald-600">{duration[0]} jours</span>
                    <span>30 jours</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <UsersIcon className="w-5 h-5" /> Nombre de voyageurs
                </Label>
                <div className="px-4">
                  <Slider
                    value={travelers}
                    onValueChange={setTravelers}
                    max={12}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>1</span>
                    <span className="font-bold text-lg text-emerald-600">{travelers[0]} {travelers[0] > 1 ? 'personnes' : 'personne'}</span>
                    <span>12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🏡 Votre nid douillet idéal
              </h2>
              <p className="text-lg text-gray-600">Choisissez le type d'hébergement qui vous fait rêver</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodationTypes.map(accommodation => (
                <Card 
                  key={accommodation.type}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                    formData.preferences?.accommodation === accommodation.type
                      ? 'border-purple-500 shadow-lg ring-4 ring-purple-100'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => updateFormData({ 
                    preferences: { ...formData.preferences, accommodation: accommodation.type } as any 
                  })}
                >
                  <CardHeader className="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="text-5xl mb-3">{accommodation.emoji}</div>
                    <CardTitle className="text-xl font-bold text-gray-800">{accommodation.type}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 text-center">
                    <p className="text-gray-600 text-sm">{accommodation.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                🎭 Quelle ambiance vous appelle ?
              </h2>
              <p className="text-lg text-gray-600">Définissez l'âme de votre voyage</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ambianceTypes.map(ambiance => (
                <Card 
                  key={ambiance.type}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 overflow-hidden ${
                    formData.preferences?.ambiance === ambiance.type
                      ? 'border-orange-500 shadow-lg ring-4 ring-orange-100'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => updateFormData({ 
                    preferences: { ...formData.preferences, ambiance: ambiance.type } as any 
                  })}
                >
                  <CardHeader className={`p-6 text-center text-white bg-gradient-to-br ${ambiance.color} relative`}>
                    <div className="text-5xl mb-3">{ambiance.emoji}</div>
                    <CardTitle className="text-xl font-bold">{ambiance.type}</CardTitle>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                  </CardHeader>
                  <CardContent className="p-4 text-center bg-white">
                    <p className="text-gray-600 text-sm">{ambiance.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                🌟 Vos expériences de rêve
              </h2>
              <p className="text-lg text-gray-600">Sélectionnez ce qui vous fait vibrer (plusieurs choix possibles)</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {experienceTypes.map(experience => {
                const isSelected = formData.preferences?.experiences?.includes(experience.type) || false;
                return (
                  <Card 
                    key={experience.type}
                    className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                      isSelected
                        ? 'border-green-500 shadow-lg ring-4 ring-green-100 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => {
                      const currentExperiences = formData.preferences?.experiences || [];
                      if (isSelected) {
                        updateFormData({ 
                          preferences: { 
                            ...formData.preferences, 
                            experiences: currentExperiences.filter(e => e !== experience.type) 
                          } as any 
                        });
                      } else {
                        updateFormData({ 
                          preferences: { 
                            ...formData.preferences, 
                            experiences: [...currentExperiences, experience.type] 
                          } as any 
                        });
                      }
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{experience.emoji}</div>
                      <h3 className="font-semibold text-sm mb-1">{experience.type}</h3>
                      <p className="text-xs text-gray-600">{experience.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {formData.preferences?.experiences && formData.preferences.experiences.length > 0 && (
              <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">✨ Expériences sélectionnées :</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.preferences.experiences.map(exp => {
                    const expData = experienceTypes.find(e => e.type === exp);
                    return (
                      <span key={exp} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {expData?.emoji} {exp}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background avec overlay */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          backgroundImage: `url('${stepBackgrounds[step - 1]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50"></div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  onClick={onBack}
                  className="text-white hover:bg-white/20"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Retour
                </Button>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <MapIcon className="w-6 h-6" />
                  Plan Your Trip
                </CardTitle>
                <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {step}/5
                </div>
              </div>
              
              {/* Barre de progression améliorée */}
              <div className="w-full bg-white/20 rounded-full h-3 mt-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${(step / 5) * 100}%` }}
                ></div>
              </div>
              
              {/* Étapes */}
              <div className="flex justify-between text-xs mt-2 opacity-90">
                <span className={step >= 1 ? 'text-yellow-300 font-semibold' : ''}>Destinations</span>
                <span className={step >= 2 ? 'text-yellow-300 font-semibold' : ''}>Profil</span>
                <span className={step >= 3 ? 'text-yellow-300 font-semibold' : ''}>Hébergement</span>
                <span className={step >= 4 ? 'text-yellow-300 font-semibold' : ''}>Ambiance</span>
                <span className={step >= 5 ? 'text-yellow-300 font-semibold' : ''}>Expériences</span>
              </div>
            </CardHeader>

            <CardContent className="p-8 min-h-[600px]">
              {renderStepContent()}
            </CardContent>

            <div className="flex justify-between p-8 pt-0 bg-gradient-to-r from-gray-50 to-blue-50">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={step === 1}
                className="flex items-center hover:bg-blue-50"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Précédent
              </Button>
              
              {step < 5 ? (
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center shadow-lg"
                >
                  Suivant
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg text-lg px-8 py-3"
                >
                  ✨ Créer mon voyage de rêve
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlanTripForm;
