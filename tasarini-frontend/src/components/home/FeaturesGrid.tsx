
import { SparklesIcon, Globe, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesGrid = () => {
  const { t } = useLanguage();

  return (
    <div className="relative z-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
              <SparklesIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('features.aiIntuitive')}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t('features.aiDescription')}
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('features.secretDestinations')}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t('features.secretDescription')}
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('features.authenticExperiences')}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t('features.authenticDescription')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;
