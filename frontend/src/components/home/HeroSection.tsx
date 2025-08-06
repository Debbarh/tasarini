
import { Button } from "@/components/ui/button";
import { ArrowRight, Plane, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Destination {
  name: string;
  image: string;
  description: string;
}

interface HeroSectionProps {
  destinations: Destination[];
  currentDestination: number;
  onModeSelect: (mode: 'plan' | 'be-inspired') => void;
}

const HeroSection = ({ destinations, currentDestination, onModeSelect }: HeroSectionProps) => {
  const { t } = useLanguage();

  return (
    <main className="relative z-10 px-6">
      <div className="max-w-6xl mx-auto text-center pt-16 pb-20">
        {/* Floating destination badge */}
        <div className="mb-8 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20 animate-fade-in">
          <span className="text-sm font-medium text-gray-700">
            {destinations[currentDestination].name} • {destinations[currentDestination].description}
          </span>
        </div>

        {/* Hero Title */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-8 leading-tight">
            Votre prochaine
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium animate-fade-in">
              aventure
            </span>
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Créez des itinéraires personnalisés pour des voyages inoubliables
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-24">
          <Button 
            onClick={() => onModeSelect('plan')}
            className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-8 text-xl rounded-3xl h-auto transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-purple-500/25 border-0"
          >
            <Plane className="w-7 h-7 mr-4 group-hover:rotate-12 transition-transform duration-300" />
            Planifier mon voyage
            <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
          
          <Button 
            onClick={() => onModeSelect('be-inspired')}
            className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-8 text-xl rounded-3xl h-auto transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-purple-500/25 border-0"
          >
            <Lightbulb className="w-7 h-7 mr-4 group-hover:rotate-12 transition-transform duration-300" />
            Be Inspired
            <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
