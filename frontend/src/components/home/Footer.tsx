
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 px-6 py-16 border-t border-white/20 bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('footer.readyForAdventure')}</h3>
        <p className="text-gray-700 mb-8 text-lg">{t('footer.joinTravelers')}</p>
        <div className="flex justify-center space-x-8 mb-8">
          <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">{t('footer.terms')}</a>
          <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">{t('footer.privacy')}</a>
          <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">{t('footer.support')}</a>
        </div>
        <p className="text-gray-600">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
