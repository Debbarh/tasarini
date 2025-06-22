
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Map, Wallet, Calendar, Shield, Camera, Compass, Star } from "lucide-react";

interface FormData {
  activities: string[];
  travelWith: string;
  budget: string;
  accommodation: string;
  mode: string;
}

interface InspirationTipsProps {
  formData: FormData;
}

const InspirationTips = ({ formData }: InspirationTipsProps) => {
  // Parse budget data
  let budgetInfo = { budget: '', period: '' };
  try {
    if (formData.budget) {
      budgetInfo = JSON.parse(formData.budget);
    }
  } catch {
    budgetInfo = { budget: formData.budget, period: '' };
  }

  // Generate personalized tips based on user preferences
  const getPersonalizedTips = () => {
    const baseTips = [
      {
        id: 'budget-optimization',
        title: 'Optimisez votre Budget',
        description: 'Conseils pour maximiser votre expérience selon votre budget',
        icon: Wallet,
        color: 'from-green-500 to-emerald-600',
        tips: budgetInfo.budget === 'low' 
          ? [
              'Réservez vos vols 2-3 mois à l\'avance',
              'Choisissez des hébergements avec cuisine',
              'Explorez les transports locaux publics',
              'Recherchez les activités gratuites et festivals'
            ]
          : budgetInfo.budget === 'luxury'
          ? [
              'Réservez les expériences exclusives en priorité',
              'Considérez un service de conciergerie',
              'Explorez les restaurants étoilés',
              'Optez pour des transferts privés'
            ]
          : [
              'Mélangez hébergements de charme et expériences locales',
              'Réservez quelques activités premium',
              'Alternez restaurants locaux et gastronomiques',
              'Utilisez les transports en commun et taxis'
            ]
      },
      {
        id: 'timing-travel',
        title: 'Timing Parfait',
        description: 'Choisissez la meilleure période selon vos préférences',
        icon: Calendar,
        color: 'from-blue-500 to-cyan-600',
        tips: budgetInfo.period === 'city-break'
          ? [
              'Privilégiez les week-ends longs',
              'Arrivez le vendredi, repartez le lundi',
              'Concentrez-vous sur un quartier',
              'Préparez un itinéraire dense mais flexible'
            ]
          : budgetInfo.period === 'long-haul'
          ? [
              'Planifiez les saisons selon les régions',
              'Prévoyez du temps pour s\'acclimater',
              'Variez les rythmes : exploration et détente',
              'Documentez votre voyage au fur et à mesure'
            ]
          : [
              'Réservez les activités principales à l\'avance',
              'Gardez 1-2 jours flexibles pour les découvertes',
              'Alternez visites culturelles et moments de détente',
              'Prévoyez un jour de repos au milieu du séjour'
            ]
      },
      {
        id: 'safety-tips',
        title: 'Sécurité & Sérénité',
        description: 'Voyagez l\'esprit tranquille avec nos conseils',
        icon: Shield,
        color: 'from-red-500 to-rose-600',
        tips: [
          'Souscrivez une assurance voyage adaptée',
          'Partagez votre itinéraire avec vos proches',
          'Numérisez vos documents importants',
          'Informez-vous sur les coutumes locales',
          'Gardez toujours de l\'argent liquide de secours'
        ]
      },
      {
        id: 'photography-tips',
        title: 'Immortalisez vos Souvenirs',
        description: 'Conseils pour capturer la magie de votre voyage',
        icon: Camera,
        color: 'from-purple-500 to-violet-600',
        tips: [
          'Shootez pendant la golden hour (lever/coucher)',
          'Capturez les détails autant que les panoramas',
          'Photographiez la cuisine locale',
          'Demandez permission pour les portraits',
          'Sauvegardez vos photos quotidiennement'
        ]
      }
    ];

    // Add activity-specific tips
    if (formData.activities.includes('culture')) {
      baseTips.push({
        id: 'culture-tips',
        title: 'Immersion Culturelle',
        description: 'Vivez comme un local et découvrez l\'authenticité',
        icon: Star,
        color: 'from-orange-500 to-amber-600',
        tips: [
          'Apprenez quelques mots de base dans la langue locale',
          'Visitez les marchés locaux le matin',
          'Participez aux festivals et événements saisonniers',
          'Échangez avec les habitants dans les cafés',
          'Explorez les quartiers résidentiels'
        ]
      });
    }

    if (formData.activities.includes('nature')) {
      baseTips.push({
        id: 'nature-tips',
        title: 'Aventures Nature',
        description: 'Connectez-vous avec la nature en toute sécurité',
        icon: Compass,
        color: 'from-green-500 to-teal-600',
        tips: [
          'Vérifiez les conditions météo avant les excursions',
          'Emportez une trousse de premiers secours',
          'Respectez la faune et la flore locales',
          'Suivez les sentiers balisés',
          'Partez tôt pour éviter les foules'
        ]
      });
    }

    if (formData.travelWith === 'family') {
      baseTips.push({
        id: 'family-tips',
        title: 'Voyage en Famille',
        description: 'Créez des souvenirs inoubliables avec vos proches',
        icon: Map,
        color: 'from-pink-500 to-rose-600',
        tips: [
          'Alternez activités pour adultes et enfants',
          'Prévoyez des pauses régulières',
          'Emportez des snacks et divertissements',
          'Recherchez les réductions famille',
          'Choisissez des hébergements familiaux'
        ]
      });
    }

    return baseTips;
  };

  const personalizedTips = getPersonalizedTips();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Conseils Personnalisés pour Votre Voyage
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Des conseils d'experts adaptés à votre profil pour un voyage inoubliable
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {personalizedTips.map((tipCategory, index) => (
          <Card 
            key={tipCategory.id} 
            className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/70 backdrop-blur-sm border-0 overflow-hidden"
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${tipCategory.color} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                  <tipCategory.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{tipCategory.title}</h3>
                  <p className="text-sm text-gray-600">{tipCategory.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {tipCategory.tips.map((tip, tipIndex) => (
                  <div 
                    key={tipIndex} 
                    className="flex items-start space-x-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Lightbulb className="w-3 h-3 text-purple-600" />
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Action Tips */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center">
            <Star className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-2xl font-bold mb-4">Conseil Pro du Jour</h3>
            <p className="text-lg opacity-90 mb-6">
              "Les meilleures découvertes se font souvent en s'éloignant des sentiers battus. 
              Laissez-vous guider par votre curiosité et les rencontres locales !"
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block">
              <p className="text-sm">
                💡 <strong>Astuce :</strong> Gardez toujours 20% de votre planning flexible pour les découvertes spontanées
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InspirationTips;
