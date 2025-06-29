
import React, { useState } from "react";
import ActivityCard from "@/components/ActivityCard";
import { Button } from "@/components/ui/button";
import { Award, Trophy, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChallengeCard from "@/components/ChallengeCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FriendsFeed from "@/components/FriendsFeed";

const HomePage = () => {
  const navigate = useNavigate();
  
  // Données d'exemple des 3 dernières activités (réduites pour faire place au fil d'actualité)
  const recentActivities = [
    {
      id: "1",
      title: "Course Matinale avec Max",
      type: "canicross" as const,
      date: "2025-06-05",
      duration: "35:20",
      distance: "4.2 km",
      location: "Parc de la Ville",
      dogName: "Max",
      dogImage: undefined,
      likes: 8,
      rating: 3.0
    },
    {
      id: "2",
      title: "Trail en Montagne",
      type: "cani-hiking" as const,
      date: "2025-06-03",
      duration: "1:15:45",
      distance: "8.5 km",
      location: "Sentier des Crêtes",
      dogName: "Bella",
      dogImage: undefined,
      likes: 15,
      rating: 4.5
    },
    {
      id: "3",
      title: "Sortie VTT",
      type: "cani-MTB" as const,
      date: "2025-06-01",
      duration: "48:30",
      distance: "12.3 km",
      location: "Piste Forestière",
      dogName: "Rocky",
      dogImage: undefined,
      likes: 22,
      rating: 3.5
    }
  ];

  // Dernier badge obtenu
  const latestBadge = {
    id: "badge_5km",
    name: "Coureur 5K",
    description: "Première course de 5km accomplie !",
    dateEarned: "2025-06-05",
    icon: "🏃‍♂️",
    rarity: "Bronze"
  };

  // Défis disponibles (réduits à 2 pour faire place au fil d'actualité)
  const [challenges] = useState([
    {
      id: "1",
      title: "Défi Canicross Été",
      description: "Courez 30km en 2 semaines avec votre compagnon",
      startDate: "10 juin 2025",
      endDate: "24 juin 2025",
      registrationDeadline: "8 juin 2025",
      price: 15,
      currency: "€",
      maxParticipants: 40,
      currentParticipants: 18,
      location: "Région Parisienne",
      difficulty: "intermédiaire" as const,
      requiredEquipment: ["Harnais canicross", "Laisse élastique"],
      rewards: ["Badge Coureur Été", "Bon d'achat 30€"],
      activityType: "canicross",
      organizer: "Club Canicross Paris",
      isRegistered: false
    },
    {
      id: "2",
      title: "Rando VTT Aventure",
      description: "Explorez 50km de sentiers VTT en équipe canine",
      startDate: "15 juin 2025",
      endDate: "30 juin 2025",
      registrationDeadline: "12 juin 2025",
      price: 35,
      currency: "€",
      maxParticipants: 25,
      currentParticipants: 12,
      location: "Massif des Vosges",
      difficulty: "avancé" as const,
      requiredEquipment: ["VTT", "Harnais VTT", "Casque"],
      rewards: ["Médaille finisher", "Pack technique"],
      activityType: "cani-MTB",
      organizer: "VTT Nature & Chiens",
      isRegistered: true
    }
  ]);

  const handleActivityClick = (id: string) => {
    navigate(`/activity/${id}`);
  };

  const handleChallengeRegister = (challengeId: string) => {
    navigate(`/challenge/${challengeId}/register`);
  };

  const handleViewAllActivities = () => {
    navigate(`/stats`);
  };

  const handleViewAllChallenges = () => {
    navigate(`/explore`);
  };

  return (
    <div className="pb-24 px-4 pt-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Tableau de Bord</h1>
        <p className="text-muted-foreground">Suivez vos progrès et découvrez de nouveaux défis</p>
      </div>

      {/* Dernier Badge */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Dernier Badge Obtenu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-3xl">{latestBadge.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold">{latestBadge.name}</h3>
              <p className="text-sm text-muted-foreground">{latestBadge.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{latestBadge.rarity}</Badge>
                <span className="text-xs text-muted-foreground">
                  Obtenu le {new Date(latestBadge.dateEarned).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
            <Award className="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>

      {/* Fil d'Actualité des Amis */}
      <section>
        <FriendsFeed />
      </section>

      {/* Dernières Activités */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Mes Dernières Activités</h2>
          <Button variant="outline" size="sm" onClick={handleViewAllActivities}>
            Voir tout
          </Button>
        </div>
        <div className="space-y-4">
          {recentActivities.map(activity => (
            <ActivityCard 
              key={activity.id}
              {...activity}
              onClick={() => handleActivityClick(activity.id)}
            />
          ))}
        </div>
      </section>

      {/* Défis Disponibles */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Défis Disponibles
          </h2>
          <Button variant="outline" size="sm" onClick={handleViewAllChallenges}>
            Tous les défis
          </Button>
        </div>
        <div className="space-y-4">
          {challenges.map(challenge => (
            <ChallengeCard 
              key={challenge.id}
              challenge={challenge}
              onRegister={handleChallengeRegister}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
