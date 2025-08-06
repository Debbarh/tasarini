
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plane, Camera, Heart, Globe, SparklesIcon } from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import HomeNavigation from "@/components/layout/HomeNavigation";
import HeroSection from "./HeroSection";
import FeaturesGrid from "./FeaturesGrid";
import FloatingElements from "./FloatingElements";
import Footer from "./Footer";

interface HomeScreenProps {
  onModeSelect: (mode: 'plan' | 'be-inspired' | 'recommendations' | 'profile') => void;
}

const HomeScreen = ({ onModeSelect }: HomeScreenProps) => {
  const { t } = useLanguage();
  const [currentDestination, setCurrentDestination] = useState(0);

  const destinations = [
    {
      name: "Santorini, Grèce",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      description: "Couchers de soleil magiques sur la mer Égée"
    },
    {
      name: "Kyoto, Japon",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      description: "Temples ancestraux et jardins zen"
    },
    {
      name: "Bali, Indonésie",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      description: "Plages paradisiaques et culture authentique"
    },
    {
      name: "Islande",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      description: "Aurores boréales et paysages lunaires"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [destinations.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Hero Images Carousel */}
      <div className="absolute inset-0">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentDestination ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20"></div>
          </div>
        ))}
      </div>

      {/* Header */}
      <HomeNavigation onModeSelect={onModeSelect} />

      {/* Hero Section */}
      <HeroSection 
        destinations={destinations}
        currentDestination={currentDestination}
        onModeSelect={onModeSelect}
      />

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Floating Elements */}
      <FloatingElements />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeScreen;
