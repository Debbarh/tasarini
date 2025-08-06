
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Activity } from "@/types/itinerary";

interface EditActivityDialogProps {
  activity: Activity;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedActivity: Activity) => void;
}

const EditActivityDialog = ({ activity, isOpen, onClose, onSave }: EditActivityDialogProps) => {
  const [formData, setFormData] = useState(activity);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleChange = (field: keyof Activity, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-purple-800">Modifier l'activité</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right text-purple-700">
              Heure
            </Label>
            <Input
              id="time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="activity" className="text-right text-purple-700">
              Activité
            </Label>
            <Input
              id="activity"
              value={formData.activity}
              onChange={(e) => handleChange('activity', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right text-purple-700">
              Type
            </Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right text-purple-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right text-purple-700">
              Prix
            </Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right text-purple-700">
              Note
            </Label>
            <Input
              id="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
              className="col-span-3"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditActivityDialog;
