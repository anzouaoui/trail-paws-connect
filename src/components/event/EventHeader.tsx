
import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface EventHeaderProps {
  event: {
    title: string;
    type: string;
    difficulty: string;
    eventType: string;
  };
}

const EventHeader = ({ event }: EventHeaderProps) => {
  const navigate = useNavigate();

  const difficultyColors = {
    "débutant": "bg-green-100 text-green-800",
    "intermédiaire": "bg-yellow-100 text-yellow-800",
    "avancé": "bg-orange-100 text-orange-800",
    "expert": "bg-red-100 text-red-800"
  };

  const typeColors = {
    "canicross": "bg-forest text-white",
    "cani-hiking": "bg-earth text-white",
    "cani-MTB": "bg-sky text-white"
  };

  return (
    <div className="bg-gradient-to-r from-forest to-forest-dark text-white p-4">
      <div className="flex items-center mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Détails de l'événement</h1>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{event.title}</h2>
        <div className="flex flex-wrap gap-2">
          <Badge className={typeColors[event.type as keyof typeof typeColors]}>
            {event.type}
          </Badge>
          <Badge className={difficultyColors[event.difficulty as keyof typeof difficultyColors]}>
            {event.difficulty}
          </Badge>
          <Badge variant="outline" className="bg-white/20 text-white border-white/30">
            {event.eventType}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
