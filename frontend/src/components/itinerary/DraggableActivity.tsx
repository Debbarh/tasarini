
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Activity } from "@/types/itinerary";
import { Edit, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditActivityDialog from "@/components/itinerary/EditActivityDialog";
import DeleteActivityDialog from "@/components/itinerary/DeleteActivityDialog";

interface DraggableActivityProps {
  id: string;
  activity: Activity;
  activityIndex: number;
  onEdit: (updatedActivity: Activity, activityIndex: number) => void;
  onDelete: () => void;
}

const DraggableActivity = ({ id, activity, activityIndex, onEdit, onDelete }: DraggableActivityProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleUpdate = (updatedActivity: Activity) => {
    onEdit(updatedActivity, activityIndex);
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsDeleteDialogOpen(false);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white/90 backdrop-blur-sm rounded-xl p-4 border-l-4 border-l-purple-500 hover:bg-white transition-all duration-300 ${
        isDragging ? 'opacity-50 shadow-2xl scale-105' : 'shadow-lg hover:shadow-xl'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <h4 className="text-lg font-semibold text-gray-800">{activity.time} - {activity.activity}</h4>
          <p className="text-sm text-gray-600">{activity.description}</p>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-purple-700">{activity.type}</span>
            <span className="text-xs text-gray-500">Prix: {activity.price}</span>
            <span className="text-xs text-yellow-500">Note: {activity.rating}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Zone de drag séparée */}
          <div 
            {...attributes} 
            {...listeners}
            className="cursor-grab hover:cursor-grabbing p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          
          {/* Boutons d'action séparés */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleEditClick}
            className="hover:bg-purple-100 text-purple-600"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDeleteClick}
            className="hover:bg-red-100 text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <EditActivityDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleUpdate}
        activity={activity}
      />

      <DeleteActivityDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        activityName={activity.activity}
      />
    </div>
  );
};

export default DraggableActivity;
