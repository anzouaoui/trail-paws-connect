
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, TrendingUp, Camera } from "lucide-react";

interface TrailInfoProps {
  trail: {
    distance: string;
    duration: string;
    elevationGain: string;
    surface: string;
    location: string;
  };
}

const TrailInfo = ({ trail }: TrailInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du parcours</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
            <div>
              <p className="font-medium">{trail.distance}</p>
              <p className="text-sm text-muted-foreground">Distance</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-muted-foreground mr-3" />
            <div>
              <p className="font-medium">{trail.duration}</p>
              <p className="text-sm text-muted-foreground">Durée estimée</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-muted-foreground mr-3" />
            <div>
              <p className="font-medium">{trail.elevationGain}</p>
              <p className="text-sm text-muted-foreground">Dénivelé</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Camera className="h-5 w-5 text-muted-foreground mr-3" />
            <div>
              <p className="font-medium">{trail.surface}</p>
              <p className="text-sm text-muted-foreground">Surface</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center pt-2">
          <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
          <div>
            <p className="font-medium">{trail.location}</p>
            <p className="text-sm text-muted-foreground">Localisation</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrailInfo;
