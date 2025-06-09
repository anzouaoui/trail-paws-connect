
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { userService } from "@/services/userService";
import { dogService } from "@/services/dogService";
import type { Dog } from "@/types/dog";
import { User } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Trophy, Medal, PawPrint, Edit, BarChart2 } from "lucide-react";
import { Dog as DogIcon } from "lucide-react";
import DogProfileCard from "@/components/DogProfileCard";
import ActivityCard from "@/components/ActivityCard";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user: authUser } = useFirebaseAuth();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userDogs, setUserDogs] = useState<Dog[]>([]);

  const loadUserDogs = useCallback(async (userId: string) => {
    try {
      const dogs = await dogService.getUserDogs(userId);
      setUserDogs(dogs);
    } catch (error: any) {
      console.error('Erreur lors du chargement des chiens:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les chiens",
      });
    }
  }, [toast]);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!authUser?.uid) return;

      try {
        console.log('Chargement du profil pour:', authUser.uid);
        const userData = await userService.getUserById(authUser.uid);
        console.log('Données du profil:', userData);
        
        if (userData) {
          setUser(userData);
          await loadUserDogs(authUser.uid);
        } else {
          console.log('Profil non trouvé, redirection vers create-profile');
          toast({
            variant: "destructive",
            title: "Profil manquant",
            description: "Veuillez créer votre profil",
          });
          navigate('/create-profile', { replace: true });
        }
      } catch (error: any) {
        console.error('Erreur lors du chargement du profil:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [authUser, navigate, toast]);
  
  // Sample activities
  const userActivities = [
    {
      id: "1",
      title: "Course matinale avec Max",
      type: "canicross" as const,
      date: "2025-05-21",
      duration: "45:32",
      distance: "5.7 km",
      location: "Sentier du Parc Central",
      dogName: "Max",
      dogImage: undefined,
      likes: 14
    },
    {
      id: "2",
      title: "Entraînement en côte",
      type: "cani-hiking" as const,
      date: "2025-05-19",
      duration: "1:12:05",
      distance: "7.3 km",
      location: "Sentier de la Vue Montagne",
      dogName: "Bella",
      dogImage: undefined,
      likes: 23
    }
  ];

  // Sample achievements
  const achievements = [
    { id: "1", title: "Lève-tôt", description: "Terminer 5 activités avant 8h du matin", icon: <PawPrint className="h-6 w-6" />, progress: 100 },
    { id: "2", title: "Explorateur", description: "Terminer 10 sentiers différents", icon: <Trophy className="h-6 w-6" />, progress: 70 },
    { id: "3", title: "Prêt pour le marathon", description: "Courir 42km en un mois", icon: <Medal className="h-6 w-6" />, progress: 50 }
  ];

  return (
    <div className="pb-24">
      {/* Profile header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-forest to-forest-dark"></div>
        <div className="absolute top-20 left-0 right-0 px-4">
          <div className="flex items-center justify-between mb-6">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarImage src={user?.photoURL || ''} alt={user?.firstName || 'Utilisateur'} />
              <AvatarFallback className="bg-forest text-white text-xl">
                {user ? `${user.firstName[0]}${user.lastName[0]}` : '?'}
              </AvatarFallback>
            </Avatar>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white h-10 w-10"
                onClick={() => navigate("/stats")}
              >
                <BarChart2 className="h-5 w-5 text-forest" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white h-10 w-10"
                onClick={() => navigate("/edit-profile")}
              >
                <Edit className="h-5 w-5 text-forest" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white h-10 w-10"
                onClick={() => navigate("/settings")}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <h1 className="text-2xl font-bold">{user ? `${user.firstName} ${user.lastName}` : 'Chargement...'}</h1>
            <p className="text-muted-foreground">{user?.bio || 'Aucune bio'}</p>
            <div className="flex space-x-2 mt-2">
              <Badge variant="outline">{user?.location || 'Localisation non définie'}</Badge>
              <Badge className="bg-forest text-white"></Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="mt-32 px-4 grid grid-cols-3 gap-3">
        <div className="stats-card">
          <span className="text-xs text-muted-foreground">Activités</span>
          <span className="text-lg font-semibold">42</span>
        </div>
        <div className="stats-card">
          <span className="text-xs text-muted-foreground">Distance</span>
          <span className="text-lg font-semibold">187 km</span>
        </div>
        <div className="stats-card">
          <span className="text-xs text-muted-foreground">Heures</span>
          <span className="text-lg font-semibold">24.5</span>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-6 px-4">
        <Tabs defaultValue="dogs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dogs">Chiens</TabsTrigger>
            <TabsTrigger value="activities">Activités</TabsTrigger>
            <TabsTrigger value="achievements">Badges</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dogs" className="mt-4">
            <div className="space-y-4">
              {userDogs.length > 0 ? (
                userDogs.map(dog => (
                  <DogProfileCard 
                    key={dog.id}
                    name={dog.name}
                    breed={dog.breed}
                    birthDate={dog.birthDate}
                    weight={dog.weight}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun chien ajouté
                </div>
              )}
              
              <Button 
                onClick={() => navigate("/dogs")} 
                className="w-full mt-4 flex items-center justify-center bg-forest text-white"
              >
                <DogIcon className="mr-2 h-4 w-4" />
                Gérer mes chiens
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="activities" className="mt-4 space-y-4">
            {userActivities.map(activity => (
              <ActivityCard 
                key={activity.id}
                {...activity}
                onClick={() => navigate(`/activity/${activity.id}`)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-4">
            <div className="space-y-4">
              {achievements.map(achievement => (
                <div key={achievement.id} className="flex items-start p-4 border rounded-xl">
                  <div className="mr-3 rounded-full bg-forest/10 p-3 text-forest">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-forest h-2 rounded-full" 
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
