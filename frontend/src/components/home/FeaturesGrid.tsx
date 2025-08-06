
import { SparklesIcon, Globe, Heart, MessageSquare, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesGrid = () => {
  const { t } = useLanguage();

  return (
    <div className="relative z-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <SparklesIcon className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.aiIntuitive')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('features.aiDescription')}
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.secretDestinations')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('features.secretDescription')}
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-7 h-7 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.authenticExperiences')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('features.authenticDescription')}
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recommandations</h3>
            <p className="text-gray-600 leading-relaxed">
              Partagez vos découvertes et explorez les recommandations de la communauté de voyageurs
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <User className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Profil Voyageur</h3>
            <p className="text-gray-600 leading-relaxed">
              Gérez vos préférences, sauvegardez vos expériences et suivez vos recommandations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;
