
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Données d'exemple pour les profils utilisateurs
  const userProfiles = {
    "user1": {
      id: "user1",
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      location: "Paris, France",
      joinDate: "Mars 2024",
      followers: 156,
      following: 89,
      activities: 24,
      bio: "Passionnée de canicross depuis 5 ans avec mon fidèle compagnon Max. J'adore explorer de nouveaux sentiers !",
      sports: ["canicross", "cani-hiking"],
      achievements: ["5K en moins de 25min", "100km ce mois", "Trail découverte"]
    },
    "user2": {
      id: "user2",
      name: "Mike Roberts",
      avatar: "",
      location: "Lyon, France",
      joinDate: "Janvier 2024",
      followers: 89,
      following: 142,
      activities: 18,
      bio: "Nouveau dans le canicross mais déjà accro ! Luna et moi progressons ensemble chaque jour.",
      sports: ["cani-hiking", "cani-MTB"],
      achievements: ["Premier trail", "Première montagne", "10 sorties"]
    },
    "user3": {
      id: "user3",
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      location: "Marseille, France",
      joinDate: "Décembre 2023",
      followers: 203,
      following: 67,
      activities: 31,
      bio: "Compétitrice en canicross. Bella et moi visons les championnats régionaux cette année !",
      sports: ["canicross", "cani-MTB", "cani-hiking"],
      achievements: ["Podium régional", "Marathon 42K", "Coach certifiée"]
    }
  };

  const user = userProfiles[id as keyof typeof userProfiles];

  if (!user) {
    return (
      <div className="pb-24 p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Profil utilisateur</h1>
        </div>
        <p className="text-center text-muted-foreground">Utilisateur non trouvé</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Profil</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* En-tête du profil */}
        <div className="text-center space-y-4">
          <Avatar className="h-24 w-24 mx-auto">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-forest text-white text-xl">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <div className="flex items-center justify-center text-muted-foreground text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {user.location}
            </div>
            <div className="flex items-center justify-center text-muted-foreground text-sm mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              Membre depuis {user.joinDate}
            </div>
          </div>

          {/* Statistiques */}
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-xl font-bold">{user.activities}</div>
              <div className="text-xs text-muted-foreground">Activités</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{user.followers}</div>
              <div className="text-xs text-muted-foreground">Abonnés</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{user.following}</div>
              <div className="text-xs text-muted-foreground">Abonnements</div>
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            <Button size="sm" className="bg-forest hover:bg-forest-dark">
              <Users className="h-4 w-4 mr-1" />
              Suivre
            </Button>
            <Button variant="outline" size="sm">
              Message
            </Button>
          </div>
        </div>

        {/* Bio */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">À propos</h3>
            <p className="text-sm text-muted-foreground">{user.bio}</p>
          </CardContent>
        </Card>

        {/* Sports pratiqués */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Sports pratiqués</h3>
            <div className="flex flex-wrap gap-2">
              {user.sports.map(sport => (
                <Badge key={sport} variant="secondary" className="bg-forest/10 text-forest">
                  <Activity className="h-3 w-3 mr-1" />
                  {sport}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Réussites */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Réussites</h3>
            <div className="space-y-2">
              {user.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-forest rounded-full"></div>
                  <span className="text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfilePage;
