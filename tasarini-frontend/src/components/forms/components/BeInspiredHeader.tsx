
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";

interface BeInspiredHeaderProps {
  onBack: () => void;
}

const BeInspiredHeader = ({ onBack }: BeInspiredHeaderProps) => {
  return (
    <header className="relative z-10 px-6 py-6">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </Button>
        
        <BrandLogo textSize="text-2xl" />

        <div className="w-24" />
      </nav>
    </header>
  );
};

export default BeInspiredHeader;
