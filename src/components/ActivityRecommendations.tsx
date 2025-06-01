
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Sparkles, RefreshCw, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ActivityType } from "./ActivityCard";
import { Badge } from "./ui/badge";

interface RecommendedActivity {
  id: string;
  title: string;
  type: ActivityType;
  description: string;
  duration: string;
  distance: string;
  location: string;
  elevation: string;
  rating: number;
  image?: string;
  dogNames: string[];
}

const MOCK_RECOMMENDATIONS: RecommendedActivity[] = [
  {
    id: "rec1",
    title: "Sunrise Trail Run",
    type: "canicross",
    description: "Based on your recent runs, this moderate trail would be perfect for improving your endurance.",
    duration: "40-50 min",
    distance: "5.2 km",
    location: "Woodland Park Trails",
    elevation: "150m",
    rating: 3,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    dogNames: ["Max"]
  },
  {
    id: "rec2",
    title: "Highland Loop",
    type: "cani-hiking",
    description: "Given your preference for hills and your dog's energy levels, this challenging hike is recommended.",
    duration: "1h 30min",
    distance: "8.4 km",
    location: "Mountain Ridge Path",
    elevation: "320m",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    dogNames: ["Luna", "Rocky"]
  },
  {
    id: "rec3",
    title: "River Valley Ride",
    type: "cani-MTB",
    description: "Perfect for you and Bella based on your recent biking activity patterns and her running speed.",
    duration: "55-65 min",
    distance: "11.8 km",
    location: "Riverside Trail Network",
    elevation: "90m",
    rating: 3.5,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    dogNames: ["Bella"]
  }
];

interface ActivityRecommendationsProps {
  isPremium?: boolean;
}

const ActivityRecommendations = ({ isPremium = false }: ActivityRecommendationsProps) => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendedActivity[]>(MOCK_RECOMMENDATIONS);
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filteredRecommendations = selectedTab === "all" 
    ? recommendations 
    : recommendations.filter(rec => rec.type === selectedTab);

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate API call for new recommendations
    setTimeout(() => {
      // In a real app, we would fetch new recommendations here
      setIsLoading(false);
    }, 1500);
  };

  const getActivityTypeLabel = (type: ActivityType) => {
    switch(type) {
      case "canicross": return "Course";
      case "cani-hiking": return "Randonnée";
      case "cani-MTB": return "Vélo";
      default: return type;
    }
  };

  const getDifficultyColor = (rating: number) => {
    if (rating >= 4.5) return "bg-red-500/20 text-red-700";
    if (rating >= 3.5) return "bg-orange-500/20 text-orange-700";
    if (rating >= 2.5) return "bg-yellow-500/20 text-yellow-700";
    return "bg-green-500/20 text-green-700";
  };

  const getDifficultyText = (rating: number) => {
    if (rating >= 4.5) return "Expert";
    if (rating >= 3.5) return "Avancé";
    if (rating >= 2.5) return "Intermédiaire";
    if (rating >= 1.5) return "Débutant";
    return "Facile";
  };

  if (!isPremium) {
    return (
      <Card className="border-dashed border-primary/50 bg-primary/5">
        <CardContent className="pt-6 pb-6 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary opacity-80" />
          <h3 className="text-lg font-semibold mb-2">Recommandations d'Activités Personnalisées</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Obtenez des recommandations basées sur l'IA selon votre historique d'activités et les préférences de votre chien.
          </p>
          <Button 
            onClick={() => navigate('/subscription')}
            className="mt-2"
          >
            Passer à Premium
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-primary" />
            Recommandé Pour Vous
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-1">
        <Tabs 
          defaultValue="all" 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">Tout</TabsTrigger>
            <TabsTrigger value="canicross">Course</TabsTrigger>
            <TabsTrigger value="cani-hiking">Randonnée</TabsTrigger>
            <TabsTrigger value="cani-MTB">Vélo</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedTab} className="mt-0 space-y-3">
            {filteredRecommendations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Aucune recommandation disponible.</p>
              </div>
            ) : (
              filteredRecommendations.map((rec) => (
                <div 
                  key={rec.id}
                  className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => navigate(`/activity/${rec.id}`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{rec.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="bg-background">
                          {getActivityTypeLabel(rec.type)}
                        </Badge>
                        <Badge className={getDifficultyColor(rec.rating)}>
                          {getDifficultyText(rec.rating)}
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {rec.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs mt-3">
                    <div>
                      <span className="text-muted-foreground">Distance:</span>
                      <p className="font-medium">{rec.distance}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Durée:</span>
                      <p className="font-medium">{rec.duration}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Dénivelé:</span>
                      <p className="font-medium">{rec.elevation}</p>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-border/30 flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 inline mr-1" />
                      {rec.location}
                    </div>
                    <div className="text-xs">
                      Recommandé pour: <span className="font-medium">{rec.dogNames.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ActivityRecommendations;
