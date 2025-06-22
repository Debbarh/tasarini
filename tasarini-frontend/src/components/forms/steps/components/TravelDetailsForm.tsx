
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus, Baby, User, Users } from "lucide-react";

interface TravelDetailsFormProps {
  subSegment: string;
  details: any;
  onDetailsChange: (details: any) => void;
}

const TravelDetailsForm = ({ subSegment, details, onDetailsChange }: TravelDetailsFormProps) => {
  const [children, setChildren] = useState(details?.children || []);
  const [groupSize, setGroupSize] = useState(details?.groupSize || 2);

  const addChild = () => {
    const newChild = { age: '', name: '' };
    const updatedChildren = [...children, newChild];
    setChildren(updatedChildren);
    onDetailsChange({ ...details, children: updatedChildren });
  };

  const removeChild = (index: number) => {
    const updatedChildren = children.filter((_, i) => i !== index);
    setChildren(updatedChildren);
    onDetailsChange({ ...details, children: updatedChildren });
  };

  const updateChild = (index: number, field: string, value: string) => {
    const updatedChildren = children.map((child, i) => 
      i === index ? { ...child, [field]: value } : child
    );
    setChildren(updatedChildren);
    onDetailsChange({ ...details, children: updatedChildren });
  };

  const updateGroupSize = (size: number) => {
    setGroupSize(size);
    onDetailsChange({ ...details, groupSize: size });
  };

  // Affichage des détails selon le sous-segment
  if (subSegment === 'young-family' || subSegment === 'senior-family') {
    return (
      <Card className="mt-6 border-2 border-pink-200 bg-pink-50/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Baby className="w-6 h-6 text-pink-600" />
            <h4 className="text-lg font-semibold text-pink-800">Détails des enfants</h4>
          </div>
          
          <div className="space-y-4">
            {children.map((child, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <User className="w-5 h-5 text-pink-500" />
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm text-gray-600">Prénom</Label>
                    <Input 
                      placeholder="Prénom de l'enfant"
                      value={child.name}
                      onChange={(e) => updateChild(index, 'name', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Âge</Label>
                    <Input 
                      type="number"
                      placeholder="Âge"
                      value={child.age}
                      onChange={(e) => updateChild(index, 'age', e.target.value)}
                      className="mt-1"
                      min="0"
                      max="18"
                    />
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeChild(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addChild}
              className="w-full border-pink-300 text-pink-600 hover:bg-pink-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un enfant
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (subSegment === 'group-friends' || subSegment === 'multi-generational') {
    return (
      <Card className="mt-6 border-2 border-purple-200 bg-purple-50/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-purple-600" />
            <h4 className="text-lg font-semibold text-purple-800">Taille du groupe</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-gray-600 mb-2 block">
                Nombre total de personnes dans le groupe
              </Label>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateGroupSize(Math.max(2, groupSize - 1))}
                  className="text-purple-600"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-2xl font-bold text-purple-700 min-w-[3rem] text-center">
                  {groupSize}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateGroupSize(Math.min(20, groupSize + 1))}
                  className="text-purple-600"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {subSegment === 'multi-generational' 
                  ? "Groupe avec différentes générations (enfants, parents, grands-parents)"
                  : "Groupe d'amis du même âge approximatif"
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default TravelDetailsForm;
