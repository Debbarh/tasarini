import { useState } from 'react';
import { ArrowLeft, Save, User, Mail, Heart, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfile } from '@/types/recommendations';
import { toast } from '@/hooks/use-toast';

interface EditProfileFormProps {
  user: UserProfile;
  onSave: (updatedUser: UserProfile) => void;
  onCancel: () => void;
}

const EditProfileForm = ({ user, onSave, onCancel }: EditProfileFormProps) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || '',
    avatar: user.avatar,
    preferences: {
      activities: user.preferences.activities,
      budget: user.preferences.budget,
      travelerType: user.preferences.travelerType
    }
  });

  const [newActivity, setNewActivity] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const handleAddActivity = () => {
    if (newActivity.trim() && !formData.preferences.activities.includes(newActivity.trim())) {
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          activities: [...prev.preferences.activities, newActivity.trim()]
        }
      }));
      setNewActivity('');
    }
  };

  const handleRemoveActivity = (activity: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        activities: prev.preferences.activities.filter(a => a !== activity)
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedUser: UserProfile = {
      ...user,
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      avatar: formData.avatar,
      preferences: formData.preferences
    };

    onSave(updatedUser);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-8 pt-4">
        <Button variant="ghost" onClick={onCancel} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold">Modifier mon profil</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Info */}
        <Card className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.avatar} />
                <AvatarFallback className="text-lg">
                  {formData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nom complet
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio (optionnel)</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Parlez-nous de vous et de vos passions de voyage..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel Preferences */}
        <Card className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Préférences de voyage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Budget préféré
                </Label>
                <select
                  id="budget"
                  value={formData.preferences.budget}
                  onChange={(e) => handlePreferenceChange('budget', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Économique">Économique</option>
                  <option value="Moyen">Moyen</option>
                  <option value="Élevé">Élevé</option>
                  <option value="Luxe">Luxe</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelerType" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Type de voyageur
                </Label>
                <select
                  id="travelerType"
                  value={formData.preferences.travelerType}
                  onChange={(e) => handlePreferenceChange('travelerType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Solo">Solo</option>
                  <option value="En couple">En couple</option>
                  <option value="Famille">Famille</option>
                  <option value="Entre amis">Entre amis</option>
                  <option value="Groupe">Groupe</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Activités préférées
              </Label>
              
              <div className="flex gap-2">
                <Input
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  placeholder="Ajouter une activité..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddActivity())}
                />
                <Button type="button" onClick={handleAddActivity} variant="outline">
                  Ajouter
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.preferences.activities.map((activity) => (
                  <Badge
                    key={activity}
                    className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border-pink-200 px-3 py-1 cursor-pointer hover:bg-red-100 transition-colors"
                    onClick={() => handleRemoveActivity(activity)}
                  >
                    {activity} ×
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button 
            type="submit"
            className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Save className="h-4 w-4" />
            Sauvegarder
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;