import React, { useState } from "react";
import ActivityCard from "@/components/ActivityCard";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityRecommendations from "@/components/ActivityRecommendations";
import UserHeader from "@/components/UserHeader";
import FeedFilters from "@/components/FeedFilters";
import ChallengesList from "@/components/ChallengesList";

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

  // Données d'exemple des posts avec commentaires
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
      comments: 2,
      isLiked: false,
      postComments: [
        {
          id: "c1",
          userId: "user3",
          userName: "Emma Wilson",
          userAvatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
          content: "Génial ! Combien de temps avez-vous mis ?",
          timestamp: "il y a 2h"
        },
        {
          id: "c2",
          userId: "user2",
          userName: "Mike Roberts",
          userAvatar: "",
          content: "Bravo ! Quel sentier avez-vous pris ?",
          timestamp: "il y a 1h"
        }
      ]
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
      comments: 1,
      isLiked: true,
      postComments: [
        {
          id: "c3",
          userId: "user1",
          userName: "Sarah Johnson",
          userAvatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          content: "Magnifique ! Luna a l'air ravie 🐕",
          timestamp: "il y a 3h"
        }
      ]
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
      comments: 0,
      isLiked: false,
      postComments: []
    }
  ]);

  // Données d'exemple des défis
  const [challenges] = useState([
    {
      id: "1",
      title: "Défi Trail d'Été",
      description: "Complétez 50km dans les 14 prochains jours avec votre compagnon canin",
      startDate: "15 juin 2025",
      endDate: "29 juin 2025",
      registrationDeadline: "10 juin 2025",
      price: 25,
      currency: "€",
      maxParticipants: 50,
      currentParticipants: 23,
      location: "Région Parisienne",
      difficulty: "intermédiaire" as const,
      requiredEquipment: ["Harnais canicross", "Laisse élastique", "Chaussures trail"],
      rewards: ["Médaille finisher", "Bon d'achat 50€", "Photo souvenir"],
      activityType: "canicross",
      organizer: "Club Canicross Paris",
      isRegistered: false
    },
    {
      id: "2", 
      title: "Marathon Canin",
      description: "Défi ultime: 42km en équipe avec votre chien sur 30 jours",
      startDate: "1 juillet 2025",
      endDate: "31 juillet 2025", 
      registrationDeadline: "25 juin 2025",
      price: 45,
      currency: "€",
      maxParticipants: 30,
      currentParticipants: 18,
      location: "France entière",
      difficulty: "expert" as const,
      requiredEquipment: ["Équipement complet canicross", "GPS", "Trousse premiers secours"],
      rewards: ["Trophée champion", "Pack premium", "Séance photo pro"],
      activityType: "canicross",
      organizer: "Fédération Française Canicross",
      isRegistered: true
    },
    {
      id: "3",
      title: "Rando Découverte",
      description: "Initiez-vous au cani-hiking avec des parcours adaptés",
      startDate: "20 juin 2025", 
      endDate: "27 juin 2025",
      registrationDeadline: "18 juin 2025",
      price: 0,
      currency: "€",
      maxParticipants: 100,
      currentParticipants: 67,
      location: "Forêt de Fontainebleau",
      difficulty: "débutant" as const,
      requiredEquipment: ["Harnais basique", "Laisse 2m", "Chaussures marche"],
      rewards: ["Badge numérique", "Guide hiking"],
      activityType: "cani-hiking",
      organizer: "Nature & Chiens",
      isRegistered: false
    }
  ]);

  // États et variables d'état
  const [unreadNotifications] = useState<number>(4);
  const [unreadFriendRequests] = useState<number>(2);
  const [feedFilter, setFeedFilter] = useState<string>("all");
  const [isPremiumUser] = useState<boolean>(true);
  const [showChallenges, setShowChallenges] = useState<boolean>(false);

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

  const handleAddComment = (postId: string, content: string) => {
    const newComment = {
      id: `c${Date.now()}`,
      userId: "currentUser",
      userName: "John Doe",
      userAvatar: "",
      content: content,
      timestamp: "à l'instant"
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
          postComments: [...post.postComments, newComment]
        };
      }
      return post;
    }));
  };

  const handleChallengeRegister = (challengeId: string) => {
    console.log(`Inscription au défi ${challengeId}`);
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
        <UserHeader 
          unreadNotifications={unreadNotifications}
          unreadFriendRequests={unreadFriendRequests}
        />

        <section className="mb-6">
          <ActivityRecommendations isPremium={isPremiumUser} />
        </section>

        {showChallenges && (
          <ChallengesList 
            challenges={challenges}
            onChallengeRegister={handleChallengeRegister}
          />
        )}

        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="feed">Fil d'Actualité</TabsTrigger>
            <TabsTrigger value="activities">Vos Activités</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed">
            <FeedFilters 
              feedFilter={feedFilter}
              setFeedFilter={setFeedFilter}
            />
            
            <div className="space-y-4">
              {filteredPosts().map(post => (
                <PostCard 
                  key={post.id}
                  post={post}
                  onLike={() => handlePostLike(post.id)}
                  onComment={() => handlePostComment(post.id)}
                  onAddComment={handleAddComment}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activities">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Vos Activités</h2>
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
            <Button 
              size="sm" 
              variant="secondary" 
              className="bg-white text-forest hover:bg-gray-100"
              onClick={() => setShowChallenges(!showChallenges)}
            >
              {showChallenges ? "Masquer" : "Rejoindre"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
