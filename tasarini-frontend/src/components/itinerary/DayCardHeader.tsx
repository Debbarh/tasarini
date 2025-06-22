
import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon, ClockIcon } from "lucide-react";
import { DayItinerary } from "@/types/itinerary";

interface DayCardHeaderProps {
  day: DayItinerary;
  dayIndex: number;
  isFavorite: boolean;
  totalDuration: number;
  totalBudget: number;
  onToggleFavorite: (dayIndex: number) => void;
}

const DayCardHeader = ({ 
  day, 
  dayIndex, 
  isFavorite, 
  totalDuration, 
  totalBudget, 
  onToggleFavorite 
}: DayCardHeaderProps) => {
  return (
    <div 
      className="h-32 bg-cover bg-center relative"
      style={{ backgroundImage: `url('${day.image}')` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 flex items-end p-4">
        <div className="text-white flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
              {day.day}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{day.title}</h3>
              <div className="flex items-center gap-3 text-sm text-white/90">
                <span>{day.city}</span>
                <span className="flex items-center gap-1">
                  <day.weather.icon className="w-4 h-4" />
                  {day.weather.temp}
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  ~{totalDuration}h
                </span>
                <span>{totalBudget}€</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="bg-white/20 hover:bg-white/30 text-white"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
          <button
            onClick={() => onToggleFavorite(dayIndex)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <HeartIcon 
              className={`w-5 h-5 ${
                isFavorite ? 'text-pink-500 fill-current' : 'text-white'
              }`} 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayCardHeader;
