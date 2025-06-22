
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import BrandLogo from '@/components/layout/BrandLogo';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { ArrowLeft, Heart, MessageSquare, Share2, Flag, Clock, MapPin, Send, ThumbsUp } from 'lucide-react';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: '1',
      userName: 'Pierre Leroy',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      content: 'Merci pour ce partage ! J\'ai fait le même voyage l\'année dernière et tes conseils sont parfaits.',
      createdAt: 'Il y a 1h',
      likes: 3
    },
    {
      id: '2',
      userName: 'Emma Garcia',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      content: 'Combien de temps as-tu passé à Kyoto ? Je prévois 3 jours, est-ce suffisant ?',
      createdAt: 'Il y a 45min',
      likes: 1
    }
  ]);

  // Données exemple pour le post
  const post = {
    id: postId,
    userName: 'Sophie Martin',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b900?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    title: 'Conseils pour un premier voyage au Japon',
    content: `Je reviens tout juste d'un voyage incroyable au Japon et je voulais partager mes conseils pour ceux qui préparent leur premier voyage !

**Transport :**
Le JR Pass est un must ! Il vous permet de voyager facilement entre les villes. N'hésitez pas à télécharger l'app Hyperdia pour les horaires.

**Hébergement :**
J'ai alterné entre ryokans traditionnels et hôtels modernes. Les ryokans sont une expérience unique mais réservez à l'avance !

**Nourriture :**
Goûtez absolument les rāmen authentiques, le sushi au marché de Tsukiji, et n'ayez pas peur des konbini (convenience stores) - la nourriture y est délicieuse !

**Culture :**
Respectez les coutumes locales, enlevez vos chaussures quand nécessaire, et apprenez quelques mots de base en japonais - les locaux apprécient vraiment l'effort.

Des questions ? N'hésitez pas !`,
    category: 'conseil',
    destination: 'Japon',
    createdAt: 'Il y a 4h',
    likes: 24,
    replies: 8,
    tags: ['japon', 'premier-voyage', 'conseils', 'transport', 'culture']
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        userName: 'Vous',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        content: newComment,
        createdAt: 'À l\'instant',
        likes: 0
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Post principal */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/30 shadow-2xl hover:bg-white/90 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="ring-4 ring-white/50">
                  <AvatarImage src={post.userAvatar} alt={post.userName} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {post.userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{post.userName}</h3>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {post.createdAt}
                    </span>
                    {post.destination && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <MapPin className="w-3 h-3 mr-1" />
                        {post.destination}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {post.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="prose max-w-none mb-6">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:from-blue-50 hover:to-purple-50 hover:border-blue-200">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-6">
                  <Button
                    variant="ghost"
                    onClick={handleLike}
                    className={`flex items-center gap-2 hover:bg-red-50 transition-all duration-300 ${liked ? 'text-red-500' : 'text-gray-600'}`}
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                    <span>{liked ? post.likes + 1 : post.likes} likes</span>
                  </Button>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageSquare className="w-5 h-5" />
                    <span>{comments.length} réponses</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-red-50">
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section commentaires */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                Réponses ({comments.length})
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Formulaire nouveau commentaire */}
              <div className="p-6 bg-gradient-to-r from-gray-50/80 to-white/80 rounded-xl border border-white/50">
                <h4 className="font-semibold text-gray-800 mb-4">Ajouter une réponse</h4>
                <div className="space-y-4">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Partagez votre réponse, conseil ou expérience..."
                    className="min-h-[120px] border-gray-200 focus:border-purple-500 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleComment}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Répondre
                    </Button>
                  </div>
                </div>
              </div>

              {/* Liste des commentaires */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-gradient-to-r from-white/60 to-gray-50/60 rounded-xl border border-white/30 hover:from-white/80 hover:to-gray-50/80 transition-all duration-300">
                    <div className="flex gap-4">
                      <Avatar className="ring-2 ring-white/50">
                        <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                        <AvatarFallback className="bg-gradient-to-r from-gray-500 to-gray-600 text-white text-sm">
                          {comment.userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-gray-800">{comment.userName}</span>
                          <span className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            {comment.createdAt}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed mb-3">{comment.content}</p>
                        
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600 hover:bg-purple-50">
                            Répondre
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
