
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TrailActionsProps {
  trailId: string;
  isPremiumUser: boolean;
}

const TrailActions = ({ trailId, isPremiumUser }: TrailActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGpxDownload = () => {
    if (!isPremiumUser) {
      toast({
        title: "Fonctionnalité Premium",
        description: "Le téléchargement GPX est réservé aux abonnés Premium. Passez à Premium pour accéder à cette fonctionnalité.",
        variant: "destructive",
      });
      setTimeout(() => {
        navigate("/subscription");
      }, 2000);
      return;
    }

    toast({
      title: "Téléchargement en cours",
      description: "Le fichier GPX va être téléchargé.",
    });
    
    console.log("Downloading GPX file for trail:", trailId);
  };

  const handleViewOnMap = () => {
    toast({
      title: "Redirection vers la carte",
      description: "Ouverture de la vue carte...",
    });
  };

  return (
    <div className="space-y-3">
      <Button className="w-full bg-forest text-white hover:bg-forest-dark" size="lg">
        Commencer ce parcours
      </Button>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={handleViewOnMap}>
          Voir sur la carte
        </Button>
        <Button 
          variant="outline" 
          onClick={handleGpxDownload}
          className={!isPremiumUser ? "relative" : ""}
        >
          {!isPremiumUser && (
            <Crown className="h-4 w-4 mr-2 text-yellow-500" />
          )}
          Télécharger GPX
          {!isPremiumUser && (
            <span className="text-xs text-yellow-600 ml-1">Premium</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default TrailActions;
