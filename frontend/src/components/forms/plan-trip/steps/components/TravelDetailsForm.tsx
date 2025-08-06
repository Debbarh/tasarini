
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface TravelDetailsFormProps {
  subSegment: string;
  details: any;
  onDetailsChange: (details: any) => void;
}

const TravelDetailsForm = ({ subSegment, details, onDetailsChange }: TravelDetailsFormProps) => {
  const [newChildAge, setNewChildAge] = useState('');

  const handleAddChild = () => {
    if (newChildAge.trim()) {
      const newChildren = [...(details.children || []), { age: newChildAge }];
      onDetailsChange({ ...details, children: newChildren });
      setNewChildAge('');
    }
  };

  const handleRemoveChild = (index: number) => {
    const newChildren = details.children?.filter((_: any, i: number) => i !== index) || [];
    onDetailsChange({ ...details, children: newChildren });
  };

  if (subSegment === 'family' || subSegment === 'family-young' || subSegment === 'family-teens') {
    return (
      <div className="space-y-6 p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-200">
        <h3 className="text-xl font-bold text-pink-800 mb-4">👨‍👩‍👧‍👦 Informations sur votre famille</h3>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="childAge" className="text-pink-700 font-medium">Âge de l&apos;enfant</Label>
              <Input
                id="childAge"
                value={newChildAge}
                onChange={(e) => setNewChildAge(e.target.value)}
                placeholder="Âge"
                type="number"
                className="border-pink-300 focus:border-pink-500"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleAddChild}
                size="sm"
                className="bg-pink-600 hover:bg-pink-700 text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {details.children && details.children.length > 0 && (
            <div className="space-y-2">
              <Label className="text-pink-700 font-medium">Enfants ajoutés :</Label>
              {details.children.map((child: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-pink-200">
                  <span className="text-pink-800">Enfant {index + 1}: {child.age} ans</span>
                  <Button
                    onClick={() => handleRemoveChild(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (subSegment === 'friends-party' || subSegment === 'friends-culture') {
    return (
      <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-4">👥 Informations sur votre groupe</h3>
        
        <div>
          <Label htmlFor="groupSize" className="text-blue-700 font-medium">Nombre de personnes dans le groupe</Label>
          <Input
            id="groupSize"
            type="number"
            value={details.groupSize || ''}
            onChange={(e) => onDetailsChange({ ...details, groupSize: parseInt(e.target.value) || 0 })}
            placeholder="Ex: 4"
            className="border-blue-300 focus:border-blue-500 mt-2"
          />
        </div>
      </div>
    );
  }

  return null;
};

export default TravelDetailsForm;
