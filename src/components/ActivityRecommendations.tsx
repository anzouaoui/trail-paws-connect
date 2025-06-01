
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, RefreshCw } from "lucide-react";
import { ActivityRecommendationsProps, RecommendedActivity } from "@/types/recommendations";
import { MOCK_RECOMMENDATIONS } from "@/data/mockRecommendations";
import PremiumUpgradePrompt from "./PremiumUpgradePrompt";
import RecommendationCard from "./RecommendationCard";

const ActivityRecommendations = ({ isPremium = false }: ActivityRecommendationsProps) => {
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

  if (!isPremium) {
    return <PremiumUpgradePrompt />;
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
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ActivityRecommendations;
