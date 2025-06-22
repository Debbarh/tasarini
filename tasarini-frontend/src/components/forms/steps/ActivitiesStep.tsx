
import { activityOptions } from "@/constants/beInspiredSteps";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface ActivitiesStepProps {
  activities: string[];
  setActivities: (activities: string[]) => void;
}

const ActivitiesStep = ({ activities, setActivities }: ActivitiesStepProps) => {
  const [customActivity, setCustomActivity] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleActivityToggle = (activityId: string) => {
    if (activityId === 'other') {
      setShowCustomInput(!showCustomInput);
      if (showCustomInput) {
        // Si on ferme le champ, on retire toutes les activités personnalisées
        const newActivities = activities.filter(id => !id.startsWith('custom:'));
        setActivities(newActivities);
        setCustomActivity("");
      }
      return;
    }

    const isSelected = activities.includes(activityId);
    const newActivities = isSelected
      ? activities.filter(id => id !== activityId)
      : [...activities, activityId];
    setActivities(newActivities);
  };

  const handleAddCustomActivity = () => {
    if (customActivity.trim()) {
      const customId = `custom:${customActivity.trim()}`;
      // Vérifier si l'activité n'existe pas déjà
      if (!activities.includes(customId)) {
        setActivities([...activities, customId]);
      }
      setCustomActivity("");
    }
  };

  const handleRemoveCustomActivity = (customId: string) => {
    const newActivities = activities.filter(id => id !== customId);
    setActivities(newActivities);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomActivity();
    }
  };

  const customActivities = activities.filter(id => id.startsWith('custom:'));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {activityOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleActivityToggle(option.id)}
            className={`group p-6 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              activities.includes(option.id)
                ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xl'
                : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50/50'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {option.emoji}
            </div>
            <div className="font-bold text-lg mb-2">{option.label}</div>
            <div className="text-sm opacity-70">{option.desc}</div>
          </button>
        ))}
        
        {/* Option Autres */}
        <button
          onClick={() => handleActivityToggle('other')}
          className={`group p-6 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
            showCustomInput
              ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xl'
              : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50/50'
          }`}
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            ✨
          </div>
          <div className="font-bold text-lg mb-2">Autres</div>
          <div className="text-sm opacity-70">Précisez vos passions</div>
        </button>
      </div>

      {/* Champ de saisie personnalisé */}
      {showCustomInput && (
        <div className="mt-6 p-6 bg-purple-50 rounded-3xl border-2 border-purple-200">
          <Label htmlFor="custom-activity" className="text-lg font-semibold text-purple-800 mb-3 block">
            Ajoutez vos activités personnalisées :
          </Label>
          
          <div className="flex gap-3 mb-4">
            <Input
              id="custom-activity"
              type="text"
              value={customActivity}
              onChange={(e) => setCustomActivity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ex: Photographie, Astronomie, Plongée sous-marine..."
              className="flex-1 px-4 py-3 border-2 border-purple-300 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-lg"
            />
            <Button
              onClick={handleAddCustomActivity}
              disabled={!customActivity.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-2xl"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Liste des activités personnalisées ajoutées */}
          {customActivities.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-semibold text-purple-800 mb-2">
                Activités ajoutées :
              </div>
              <div className="flex flex-wrap gap-2">
                {customActivities.map((customId) => {
                  const activityName = customId.replace('custom:', '');
                  return (
                    <div
                      key={customId}
                      className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-2 rounded-full border border-purple-300"
                    >
                      <span className="text-sm font-medium">{activityName}</span>
                      <button
                        onClick={() => handleRemoveCustomActivity(customId)}
                        className="text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivitiesStep;
