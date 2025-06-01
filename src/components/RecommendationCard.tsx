
import React from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { RecommendedActivity } from "@/types/recommendations";
import { getActivityTypeLabel, getDifficultyColor, getDifficultyText } from "@/utils/activityUtils";

interface RecommendationCardProps {
  recommendation: RecommendedActivity;
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
      onClick={() => navigate(`/activity/${recommendation.id}`)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium">{recommendation.title}</h3>
          <div className="flex gap-2 mt-1">
            <Badge variant="outline" className="bg-background">
              {getActivityTypeLabel(recommendation.type)}
            </Badge>
            <Badge className={getDifficultyColor(recommendation.rating)}>
              {getDifficultyText(recommendation.rating)}
            </Badge>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <p className="text-sm text-muted-foreground mb-2">
        {recommendation.description}
      </p>
      
      <div className="grid grid-cols-3 gap-2 text-xs mt-3">
        <div>
          <span className="text-muted-foreground">Distance:</span>
          <p className="font-medium">{recommendation.distance}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Durée:</span>
          <p className="font-medium">{recommendation.duration}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Dénivelé:</span>
          <p className="font-medium">{recommendation.elevation}</p>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-border/30 flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 inline mr-1" />
          {recommendation.location}
        </div>
        <div className="text-xs">
          Recommandé pour: <span className="font-medium">{recommendation.dogNames.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
