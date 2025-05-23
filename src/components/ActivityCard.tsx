
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Award, Heart, Star } from "lucide-react";
import DogAvatar from "./DogAvatar";

export type ActivityType = "canicross" | "cani-hiking" | "cani-MTB";

interface ActivityCardProps {
  id: string;
  title: string;
  type: ActivityType;
  date: string;
  duration: string;
  distance: string;
  location: string;
  dogName: string;
  dogImage?: string;
  likes: number;
  rating?: number;
  onClick?: () => void;
}

const ActivityCard = ({
  id,
  title,
  type,
  date,
  duration,
  distance,
  location,
  dogName,
  dogImage,
  likes,
  rating = 0,
  onClick
}: ActivityCardProps) => {
  const navigate = useNavigate();
  const activityColors = {
    "canicross": "bg-forest text-white",
    "cani-hiking": "bg-earth text-white",
    "cani-MTB": "bg-sky text-white"
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/activity/${id}`);
    }
  };

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return "Expert";
    if (rating >= 3.5) return "Advanced";
    if (rating >= 2.5) return "Intermediate";
    if (rating >= 1.5) return "Beginner";
    return "Easy";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-red-500";
    if (rating >= 3.5) return "text-orange-500";
    if (rating >= 2.5) return "text-yellow-500";
    if (rating >= 1.5) return "text-green-500";
    return "text-blue-500";
  };

  return (
    <Card 
      className="activity-card cursor-pointer" 
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="p-4 pb-3">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{formatDate(date)}</span>
                <span className="mx-1">•</span>
                <Badge className={activityColors[type]}>
                  {type}
                </Badge>
              </div>
            </div>
            <DogAvatar name={dogName} imageSrc={dogImage} size="sm" />
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="flex flex-col items-center">
              <Clock className="h-4 w-4 text-muted-foreground mb-1" />
              <span className="text-sm font-medium">{duration}</span>
              <span className="text-xs text-muted-foreground">Time</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-4 w-4 text-muted-foreground mb-1" />
              <span className="text-sm font-medium">{distance}</span>
              <span className="text-xs text-muted-foreground">Distance</span>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-4 w-4 text-muted-foreground mb-1" />
              <span className="text-sm font-medium">87%</span>
              <span className="text-xs text-muted-foreground">Pace</span>
            </div>
          </div>

          {rating > 0 && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Difficulty:</span>
                  <div className={`flex items-center ${getRatingColor(rating)}`}>
                    <span className="text-sm font-bold mr-1">{getRatingText(rating)}</span>
                    <Star className="h-3.5 w-3.5 fill-current" />
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`h-3.5 w-3.5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t p-3 text-sm">
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate max-w-[150px]">{location}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Heart className="h-3 w-3 mr-1" />
          <span>{likes}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
