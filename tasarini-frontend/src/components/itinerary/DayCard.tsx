
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DayItinerary, Activity } from "@/types/itinerary";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DraggableActivity from './DraggableActivity';
import DayCardHeader from './DayCardHeader';
import DayCardSummary from './DayCardSummary';
import DragDropInstructions from './DragDropInstructions';
import { useToast } from "@/hooks/use-toast";

interface DayCardProps {
  day: DayItinerary;
  dayIndex: number;
  isFavorite: boolean;
  onToggleFavorite: (dayIndex: number) => void;
}

const DayCard = ({ day, dayIndex, isFavorite, onToggleFavorite }: DayCardProps) => {
  const [activities, setActivities] = useState(day.activities);
  const { toast } = useToast();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setActivities((items) => {
        const oldIndex = items.findIndex((item, index) => `${dayIndex}-${index}` === active.id);
        const newIndex = items.findIndex((item, index) => `${dayIndex}-${index}` === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleEditActivity = (updatedActivity: Activity, activityIndex: number) => {
    setActivities(prev => 
      prev.map((activity, index) => 
        index === activityIndex ? updatedActivity : activity
      )
    );
    toast({
      title: "Activité modifiée",
      description: "L'activité a été mise à jour avec succès.",
    });
  };

  const handleDeleteActivity = (activityIndex: number) => {
    setActivities(prev => prev.filter((_, index) => index !== activityIndex));
    toast({
      title: "Activité supprimée",
      description: "L'activité a été supprimée de votre programme.",
      variant: "destructive",
    });
  };

  // Calculer le temps total et le budget total
  const totalDuration = activities.length * 2.5; // Estimation
  const totalBudget = activities.reduce((sum, activity) => {
    const price = parseFloat(activity.price.replace(/[€/\D]/g, '')) || 0;
    return sum + price;
  }, 0);

  return (
    <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
      <DayCardHeader
        day={day}
        dayIndex={dayIndex}
        isFavorite={isFavorite}
        totalDuration={totalDuration}
        totalBudget={totalBudget}
        onToggleFavorite={onToggleFavorite}
      />

      <CardContent className="p-0">
        <div className="p-6">
          <DragDropInstructions />

          {/* Liste des activités avec drag & drop */}
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={activities.map((_, index) => `${dayIndex}-${index}`)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {activities.map((activity, idx) => (
                  <DraggableActivity
                    key={`${dayIndex}-${idx}`}
                    id={`${dayIndex}-${idx}`}
                    activity={activity}
                    activityIndex={idx}
                    onEdit={handleEditActivity}
                    onDelete={() => handleDeleteActivity(idx)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <DayCardSummary
            activitiesCount={activities.length}
            totalDuration={totalDuration}
            totalBudget={totalBudget}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DayCard;
