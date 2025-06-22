
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BrandLogo from '@/components/layout/BrandLogo';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Plus, X, MapPin, MessageSquare, HelpCircle, Lightbulb, Users } from 'lucide-react';

const CreatePost = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [destination, setDestination] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const categories = [
    { value: 'question', label: 'Question', icon: HelpCircle, color: 'from-blue-500 to-cyan-500' },
    { value: 'conseil', label: 'Conseil', icon: Lightbulb, color: 'from-yellow-500 to-orange-500' },
    { value: 'experience', label: 'Expérience', icon: MapPin, color: 'from-green-500 to-emerald-500' },
    { value: 'rencontre', label: 'Rencontre', icon: Users, color: 'from-purple-500 to-pink-500' }
  ];

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating post:', { title, content, category, destination, tags });
    // Ici on ajouterait la logique pour sauvegarder le post
    navigate('/community');
  };

  const selectedCategory = categories.find(cat => cat.value === category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/community')}
            className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au forum</span>
          </Button>
          <LanguageSelector />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <BrandLogo size={60} textSize="text-2xl" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Créer un nouveau post
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Partagez votre question, conseil ou expérience avec la communauté
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-white/30 shadow-2xl hover:bg-white/90 transition-all duration-300 hover:shadow-3xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nouveau Post
                </span>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Titre */}
                <div>
                  <Label htmlFor="title" className="text-gray-700 font-semibold text-lg mb-3 block">
                    Titre de votre post *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Conseils pour un premier voyage au Japon"
                    className="h-14 text-lg rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300"
                    required
                  />
                </div>

                {/* Catégorie */}
                <div>
                  <Label className="text-gray-700 font-semibold text-lg mb-3 block">
                    Catégorie *
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger className="h-14 text-lg rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300">
                      <SelectValue placeholder="Choisissez une catégorie" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border-white/50">
                      {categories.map((cat) => {
                        const IconComponent = cat.icon;
                        return (
                          <SelectItem key={cat.value} value={cat.value} className="py-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 bg-gradient-to-r ${cat.color} rounded-lg`}>
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              <span className="font-medium">{cat.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Destination */}
                <div>
                  <Label htmlFor="destination" className="text-gray-700 font-semibold text-lg mb-3 block">
                    Destination (optionnel)
                  </Label>
                  <Input
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Ex: Japon, France, Italie..."
                    className="h-14 text-lg rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300"
                  />
                </div>

                {/* Contenu */}
                <div>
                  <Label htmlFor="content" className="text-gray-700 font-semibold text-lg mb-3 block">
                    Contenu de votre post *
                  </Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Décrivez votre question, partagez votre conseil ou racontez votre expérience..."
                    className="min-h-[200px] text-lg rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 resize-none"
                    required
                  />
                </div>

                {/* Tags */}
                <div>
                  <Label className="text-gray-700 font-semibold text-lg mb-3 block">
                    Tags (optionnel)
                  </Label>
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Ajouter un tag..."
                      className="h-12 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <Button
                      type="button"
                      onClick={handleAddTag}
                      className="h-12 px-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 px-3 py-1 text-sm hover:from-blue-200 hover:to-purple-200 transition-all duration-300"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 hover:text-red-600 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Aperçu de la catégorie sélectionnée */}
                {selectedCategory && (
                  <div className="p-6 bg-gradient-to-r from-gray-50/80 to-white/80 rounded-xl border border-white/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 bg-gradient-to-r ${selectedCategory.color} rounded-lg`}>
                        <selectedCategory.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-800">
                        Catégorie: {selectedCategory.label}
                      </span>
                    </div>
                  </div>
                )}

                {/* Boutons */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/community')}
                    className="flex-1 h-14 text-lg rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 transition-all duration-300"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-14 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    Publier le post
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
