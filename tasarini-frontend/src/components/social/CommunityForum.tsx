import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, HelpCircle, Lightbulb, MapPin, Coffee, TrendingUp, Clock, Heart } from "lucide-react";
import { CommunityPost, ForumCategory } from "@/types/social";

const CommunityForum = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories: ForumCategory[] = [
    {
      id: "questions",
      name: "Questions",
      description: "Posez vos questions sur les voyages",
      icon: "❓",
      postCount: 142,
      lastActivity: "Il y a 2h"
    },
    {
      id: "conseils",
      name: "Conseils",
      description: "Partagez vos bons plans et astuces",
      icon: "💡",
      postCount: 89,
      lastActivity: "Il y a 1h"
    },
    {
      id: "experiences",
      name: "Expériences",
      description: "Racontez vos voyages",
      icon: "📸",
      postCount: 67,
      lastActivity: "Il y a 3h"
    },
    {
      id: "rencontres",
      name: "Rencontres",
      description: "Trouvez des compagnons de voyage",
      icon: "👥",
      postCount: 34,
      lastActivity: "Il y a 5h"
    }
  ];

  const samplePosts: CommunityPost[] = [
    {
      id: "1",
      userId: "user1",
      userName: "Sophie Martin",
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b900?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      title: "Conseils pour un premier voyage au Japon ?",
      content: "Je prévois mon premier voyage au Japon pour le printemps prochain. Quelqu'un aurait-il des conseils sur les incontournables à ne pas manquer ?",
      category: "question",
      destination: "Japon",
      createdAt: "Il y a 2h",
      likes: 12,
      replies: 8,
      tags: ["japon", "premier-voyage", "conseils"]
    },
    {
      id: "2",
      userId: "user2",
      userName: "Marc Dubois",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      title: "Mon itinéraire de 2 semaines en Thaïlande",
      content: "Je reviens d'un voyage incroyable en Thaïlande ! Voici mon retour d'expérience et mes recommandations...",
      category: "experience",
      destination: "Thaïlande",
      createdAt: "Il y a 4h",
      likes: 28,
      replies: 15,
      tags: ["thaïlande", "itinéraire", "retour-experience"]
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "question": return <HelpCircle className="w-4 h-4" />;
      case "conseil": return <Lightbulb className="w-4 h-4" />;
      case "experience": return <MapPin className="w-4 h-4" />;
      case "rencontre": return <Coffee className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const handlePostClick = (postId: string) => {
    navigate(`/community/post/${postId}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Header with gradient text */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Communauté Voyageurs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Échangez avec d'autres passionnés de voyage, partagez vos expériences et découvrez de nouvelles destinations
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg">
            <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">Tout</TabsTrigger>
            <TabsTrigger value="questions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">Questions</TabsTrigger>
            <TabsTrigger value="conseils" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">Conseils</TabsTrigger>
            <TabsTrigger value="experiences" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">Expériences</TabsTrigger>
            <TabsTrigger value="rencontres" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">Rencontres</TabsTrigger>
          </TabsList>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* Categories Card */}
              <Card className="bg-white/80 backdrop-blur-sm border-white/30 shadow-xl hover:bg-white/95 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Catégories
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="p-4 rounded-xl bg-gradient-to-r from-gray-50/80 to-white/80 hover:from-white/90 hover:to-gray-50/90 cursor-pointer border border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </h4>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {category.postCount} posts
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {category.lastActivity}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="bg-white/80 backdrop-blur-sm border-white/30 shadow-xl hover:bg-white/95 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Statistiques
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-lg">
                      <span className="text-gray-700">Membres actifs</span>
                      <span className="font-bold text-blue-600 text-lg">1,247</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-lg">
                      <span className="text-gray-700">Posts aujourd'hui</span>
                      <span className="font-bold text-purple-600 text-lg">23</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-pink-50/80 to-rose-50/80 rounded-lg">
                      <span className="text-gray-700">Nouveaux membres</span>
                      <span className="font-bold text-pink-600 text-lg">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Posts Section */}
            <div className="md:col-span-3 space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Discussions récentes
                </h2>
                <Button 
                  onClick={() => navigate('/community/create')}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Nouveau post
                </Button>
              </div>

              <TabsContent value="all" className="space-y-6 mt-0">
                {samplePosts.map((post) => (
                  <Card 
                    key={post.id} 
                    className="bg-white/80 backdrop-blur-sm border-white/30 shadow-xl hover:bg-white/95 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group cursor-pointer"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Avatar className="ring-4 ring-white/50 group-hover:ring-blue-200/50 transition-all duration-300">
                          <AvatarImage src={post.userAvatar} alt={post.userName} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {post.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-1.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                              {getCategoryIcon(post.category)}
                            </div>
                            <h3 className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors text-lg group-hover:text-blue-600">
                              {post.title}
                            </h3>
                            {post.destination && (
                              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none shadow-md">
                                {post.destination}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-gray-700 mb-4 line-clamp-2 leading-relaxed">{post.content}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                            <span className="font-medium text-gray-700">Par {post.userName}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.createdAt}
                            </span>
                            <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer transition-colors">
                              <MessageSquare className="w-4 h-4" />
                              {post.replies} réponses
                            </span>
                            <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer transition-colors">
                              <Heart className="w-4 h-4" />
                              {post.likes} likes
                            </span>
                          </div>
                          
                          <div className="flex gap-2 flex-wrap">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:from-blue-50 hover:to-purple-50 hover:border-blue-200 cursor-pointer transition-all duration-300">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Enhanced placeholder sections */}
              <TabsContent value="questions" className="mt-0">
                <Card className="bg-white/80 backdrop-blur-sm border-white/30 shadow-xl">
                  <CardContent className="text-center py-16">
                    <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <HelpCircle className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Section Questions</h3>
                    <p className="text-gray-600">En cours de développement - Bientôt disponible !</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityForum;
