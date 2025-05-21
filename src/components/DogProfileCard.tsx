
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DogAvatar from "./DogAvatar";

interface DogProfileCardProps {
  name: string;
  breed: string;
  age: number;
  weight: string;
  imageSrc?: string;
  sportPreference?: string;
  level?: "beginner" | "intermediate" | "advanced" | "professional";
}

const DogProfileCard = ({
  name,
  breed,
  age,
  weight,
  imageSrc,
  sportPreference,
  level = "intermediate"
}: DogProfileCardProps) => {
  const levelColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-blue-100 text-blue-800",
    advanced: "bg-purple-100 text-purple-800",
    professional: "bg-red-100 text-red-800"
  };

  const levelText = level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-forest to-forest-dark h-20 flex items-center justify-center">
        <div className="translate-y-10">
          <DogAvatar name={name} imageSrc={imageSrc} size="lg" />
        </div>
      </div>
      <CardContent className="pt-12 pb-4">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-muted-foreground text-sm">{breed}</p>
          <div className="flex justify-center mt-2 space-x-2">
            <Badge variant="outline" className="text-xs">
              {age} years
            </Badge>
            <Badge variant="outline" className="text-xs">
              {weight}
            </Badge>
            {sportPreference && (
              <Badge className="bg-forest text-white text-xs">
                {sportPreference}
              </Badge>
            )}
          </div>
          <div className="mt-3">
            <Badge className={`${levelColors[level]} text-xs`}>
              {levelText}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="stats-card bg-forest/10">
            <span className="text-xs text-muted-foreground">Activities</span>
            <span className="text-lg font-medium">27</span>
          </div>
          <div className="stats-card bg-sky/10">
            <span className="text-xs text-muted-foreground">Distance</span>
            <span className="text-lg font-medium">87 km</span>
          </div>
          <div className="stats-card bg-earth/10">
            <span className="text-xs text-muted-foreground">Avg. Pace</span>
            <span className="text-lg font-medium">5:30</span>
          </div>
          <div className="stats-card bg-sunny/10">
            <span className="text-xs text-muted-foreground">Badges</span>
            <span className="text-lg font-medium">8</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DogProfileCard;
