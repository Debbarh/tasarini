
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Share, X } from "lucide-react";
import { GeneratedItinerary } from "@/types/itinerary";

interface ShareItineraryDialogProps {
  itinerary: GeneratedItinerary;
}

const ShareItineraryDialog = ({ itinerary }: ShareItineraryDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleShare = () => {
    // Ici vous implémenterez la logique de partage
    console.log("Partage d'itinéraire:", {
      title: itinerary.title,
      description,
      isPublic,
      tags,
      destinations: itinerary.destinations,
      duration: itinerary.duration,
      budget: itinerary.budget
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2">
          <Share className="w-4 h-4" />
          Partager
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Partager votre itinéraire</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Titre de l'itinéraire</Label>
            <Input
              id="title"
              value={itinerary.title}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div>
            <Label htmlFor="description">Description (optionnelle)</Label>
            <Textarea
              id="description"
              placeholder="Décrivez votre expérience, vos conseils..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter un tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Ajouter
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="public">Rendre public</Label>
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>

          <div className="text-sm text-gray-600">
            {isPublic ? 
              "Votre itinéraire sera visible par tous les utilisateurs" : 
              "Seules les personnes avec le lien pourront voir votre itinéraire"
            }
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleShare} className="flex-1">
              Partager
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareItineraryDialog;
