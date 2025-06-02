
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ActivityFormHeaderProps {
  isLoading: boolean;
  isPremiumUser: boolean;
  activityId: string;
  onCancel: () => void;
  onSave: () => void;
}

const ActivityFormHeader = ({ 
  isLoading, 
  isPremiumUser, 
  activityId, 
  onCancel, 
  onSave 
}: ActivityFormHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleExportGpx = () => {
    if (!isPremiumUser) {
      toast({
        title: "Fonctionnalité Premium",
        description: "L'export GPX est réservé aux abonnés Premium. Passez à Premium pour accéder à cette fonctionnalité.",
        variant: "destructive",
      });
      setTimeout(() => {
        navigate("/subscription");
      }, 2000);
      return;
    }

    toast({
      title: "Export en cours",
      description: "Le fichier GPX va être généré et téléchargé.",
    });
    
    console.log("Exporting GPX file for activity:", activityId);
  };

  return (
    <div className="bg-white sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between p-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold flex-1">Modifier l'activité</h1>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-1" />
            Annuler
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={handleExportGpx}
            disabled={isLoading}
            className={!isPremiumUser ? "relative" : ""}
          >
            {!isPremiumUser && (
              <Crown className="h-4 w-4 mr-1 text-yellow-500" />
            )}
            GPX
            {!isPremiumUser && (
              <span className="text-xs text-yellow-600 ml-1">Premium</span>
            )}
          </Button>
          <Button 
            size="sm"
            onClick={onSave}
            disabled={isLoading}
            className="bg-forest"
          >
            <Save className="h-4 w-4 mr-1" />
            {isLoading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFormHeader;
