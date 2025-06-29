
import React, { useState } from "react";
import PostCard from "@/components/PostCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity } from "lucide-react";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  activityId?: string;
  activityType?: string;
  location?: string;
  date: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  postComments: Comment[];
}

const FriendsFeed = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "post1",
      userId: "user1",
      userName: "Sarah Johnson",
      userAvatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      content: "Belle sortie canicross ce matin avec Bella ! 5km en 28 minutes, nous progressons bien 🏃‍♀️🐕",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256",
      activityId: "act1",
      activityType: "Canicross",
      location: "Parc de la Ville",
      date: "Il y a 2 heures",
      likes: 12,
      comments: 3,
      isLiked: false,
      postComments: [
        {
          id: "c1",
          userId: "user2",
          userName: "Marie Dubois",
          userAvatar: "",
          content: "Super performance ! Bella a l'air en pleine forme 💪",
          timestamp: "Il y a 1 heure"
        }
      ]
    },
    {
      id: "post2",
      userId: "user3",
      userName: "Emma Wilson",
      userAvatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      content: "Première randonnée en montagne avec Rex. Le paysage était magnifique mais le dénivelé nous a bien fatigués ! 🏔️",
      image: "https://images.unsplash.com/photo-1464822759844-d150baec3b94",
      activityId: "act2",
      activityType: "Cani-randonnée",
      location: "Massif Central",
      date: "Il y a 4 heures",
      likes: 18,
      comments: 5,
      isLiked: true,
      postComments: [
        {
          id: "c2",
          userId: "user1",
          userName: "Sarah Johnson",
          userAvatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          content: "Magnifique vue ! Rex a eu de la chance 😍",
          timestamp: "Il y a 3 heures"
        },
        {
          id: "c3",
          userId: "user4",
          userName: "Thomas Martin",
          userAvatar: "",
          content: "Quel courage ! Moi et Luna on n'ose pas encore s'attaquer à ce genre de dénivelé",
          timestamp: "Il y a 2 heures"
        }
      ]
    },
    {
      id: "post3",
      userId: "user5",
      userName: "Alex Petit",
      userAvatar: "",
      content: "Session VTT avec Maya aujourd'hui ! 15km de single track, elle commence vraiment à prendre le rythme 🚴‍♂️",
      activityId: "act3",
      activityType: "Cani-VTT",
      location: "Forêt de Rambouillet",
      date: "Il y a 6 heures",
      likes: 8,
      comments: 2,
      isLiked: false,
      postComments: [
        {
          id: "c4",
          userId: "user6",
          userName: "Julie Blanc",
          userAvatar: "",
          content: "Maya progresse vite ! Bientôt elle va te dépasser 😄",
          timestamp: "Il y a 5 heures"
        }
      ]
    }
  ]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    console.log(`Comment on post ${postId}`);
  };

  const handleAddComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      userId: "current_user",
      userName: "Vous",
      userAvatar: "",
      content,
      timestamp: "À l'instant"
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            postComments: [...post.postComments, newComment],
            comments: post.comments + 1
          }
        : post
    ));
  };

  if (posts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            Fil d'Actualité des Amis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucune activité récente de vos amis</p>
            <p className="text-sm text-muted-foreground mt-2">
              Ajoutez des amis pour voir leurs dernières sorties !
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-forest" />
        <h2 className="text-xl font-semibold">Fil d'Actualité des Amis</h2>
      </div>
      
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          onLike={() => handleLike(post.id)}
          onComment={() => handleComment(post.id)}
          onAddComment={handleAddComment}
        />
      ))}
    </div>
  );
};

export default FriendsFeed;
