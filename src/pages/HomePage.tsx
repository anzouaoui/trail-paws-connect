
import React, { useState } from "react";
import ActivityCard from "@/components/ActivityCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Bell, Filter, Users, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityRecommendations from "@/components/ActivityRecommendations";

const HomePage = () => {
  const navigate = useNavigate();
  // Données d'exemple
  const recentActivities = [
    {
      id: "1",
      title: "Course Matinale avec Max",
      type: "canicross" as const,
      date: "2025-05-21",
      duration: "45:32",
      distance: "5.7 km",
      location: "Sentier du Parc Central",
      dogName: "Max",
      dogImage: undefined,
      likes: 14,
      rating: 2.5
    },
    {
      id: "2",
      title: "Entraînement en Collines",
      type: "cani-hiking" as const,
      date: "2025-05-19",
      duration: "1:12:05",
      distance: "7.3 km",
      location: "Sentier de la Vue Montagne",
      dogName: "Bella",
      dogImage: undefined,
      likes: 23,
      rating: 4.0
    },
    {
      id: "3",
      title: "Aventure de Week-end",
      type: "cani-MTB" as const,
      date: "2025-05-18",
      duration: "58:14",
      distance: "12.8 km",
      location: "Sentier de la Vallée Rivière",
      dogName: "Rocky",
      dogImage: undefined,
      likes: 31,
      rating: 3.5
    }
  ];

  // Données d'exemple des posts
  const [posts, setPosts] = useState([
    {
      id: "1",
      userId: "user1",
      userName: "Sarah Johnson",
      userAvatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      content: "Course incroyable avec Max aujourd'hui ! Nous avons battu notre record personnel sur le sentier forestier.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      activityId: "1",
      activityType: "canicross",
      location: "Sentier de Forest Hills",
      date: "2025-05-22",
      likes: 24,
      comments: 8,
      isLiked: false
    },
    {
      id: "2",
      userId: "user2",
      userName: "Mike Roberts",
      userAvatar: "",
      content: "Première fois en cani-rando avec Luna. Elle a adoré les vues montagne !",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      activityId: "2",
      activityType: "cani-hiking",
      location: "Crête de Blue Mountain",
      date: "2025-05-21",
      likes: 18,
      comments: 5,
      isLiked: true
    },
    {
      id: "3",
      userId: "user3",
      userName: "Emma Wilson",
      userAvatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      content: "Journée ensoleillée au lac avec Bella. Parfait pour un jogging relaxant !",
      image: "",
      activityId: "3",
      activityType: "canicross",
      location: "Parc du Lac",
      date: "2025-05-20",
      likes: 32,
      comments: 12,
      isLiked: false
    }
  ]);

  // Nombre de notifications non lues (simulation)
  const [unreadNotifications] = useState<number>(4);
  const [unreadFriendRequests] = useState<number>(2);
  
  // État pour le filtre du feed
  const [feedFilter, setFeedFilter] = useState<string>("all");
  // Statut premium simulé - Dans une vraie app, cela viendrait du contexte d'auth
  const [isPremiumUser] = useState<boolean>(true);

  const handleActivityClick = (id: string) => {
    console.log(`Activité cliquée ${id}`);
    navigate(`/activity/${id}`);
  };

  const handlePostLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handlePostComment = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const filteredPosts = () => {
    switch(feedFilter) {
      case "friends":
        return posts.filter(post => post.userId === "user1" || post.userId === "user3");
      case "nearby":
        return posts.filter(post => post.location.includes("Forest") || post.location.includes("Lac"));
      case "canicross":
        return posts.filter(post => post.activityType === "canicross");
      case "hiking":
        return posts.filter(post => post.activityType === "cani-hiking");
      default:
        return posts;
    }
  };

  return (
    <div className="pb-24">
      <header className="px-4 pt-4 pb-2">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src="" alt="Utilisateur" />
              <AvatarFallback className="bg-forest text-white">JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">Salut, John!</h1>
              <p className="text-sm text-muted-foreground">Prêt pour une nouvelle aventure ?</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full relative"
              onClick={() => navigate('/friend-requests')}
            >
              <Users className="h-5 w-5" />
              {unreadFriendRequests > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadFriendRequests}
                </Badge>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full relative"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Section Recommandations IA */}
        <section className="mb-6">
          <ActivityRecommendations isPremium={isPremiumUser} />
        </section>

        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="feed">Fil d'Actualité</TabsTrigger>
            <TabsTrigger value="activities">Vos Activités</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Fil d'Activité</h2>
              <div className="flex space-x-1">
                <Button 
                  variant={feedFilter === "friends" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setFeedFilter("friends")}
                  className="text-xs px-2"
                >
                  Amis
                </Button>
                <Button 
                  variant={feedFilter === "nearby" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setFeedFilter("nearby")}
                  className="text-xs px-2"
                >
                  <MapPin className="h-3 w-3 mr-1" /> Proche
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center"
                  onClick={() => setFeedFilter(feedFilter === "all" ? "canicross" : feedFilter === "canicross" ? "hiking" : "all")}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  {feedFilter === "all" ? "Tout" : feedFilter === "canicross" ? "Canicross" : feedFilter === "hiking" ? "Rando" : "Filtre"}
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredPosts().map(post => (
                <PostCard 
                  key={post.id}
                  post={post}
                  onLike={() => handlePostLike(post.id)}
                  onComment={() => handlePostComment(post.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activities">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Votre Activité</h2>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                Filtre
              </Button>
            </div>
            
            <section className="space-y-4">
              {recentActivities.map(activity => (
                <ActivityCard 
                  key={activity.id}
                  {...activity}
                  onClick={() => handleActivityClick(activity.id)}
                />
              ))}
            </section>
          </TabsContent>
        </Tabs>
      </header>

      <section className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">Défis à Venir</h2>
        <div className="activity-card bg-gradient-to-r from-forest to-forest-dark text-white">
          <h3 className="text-lg font-semibold">Défi Trail d'Été</h3>
          <p className="text-sm opacity-90 mb-3">Complétez 50km dans les 14 prochains jours</p>
          <div className="flex justify-between items-center">
            <span className="text-sm">23 participants</span>
            <Button size="sm" variant="secondary" className="bg-white text-forest hover:bg-gray-100">
              Rejoindre
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
