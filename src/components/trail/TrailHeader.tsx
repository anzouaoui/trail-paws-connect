
import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface TrailHeaderProps {
  trail: {
    name: string;
    type: string;
    difficulty: string;
    terrain: string;
  };
}

const TrailHeader = ({ trail }: TrailHeaderProps) => {
  const navigate = useNavigate();

  const difficultyColors = {
    "beginner": "bg-green-100 text-green-800",
    "intermediate": "bg-yellow-100 text-yellow-800",
    "advanced": "bg-orange-100 text-orange-800",
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
        <h1 className="text-xl font-semibold ml-2">Détails du parcours</h1>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{trail.name}</h2>
        <div className="flex flex-wrap gap-2">
          <Badge className={typeColors[trail.type as keyof typeof typeColors]}>
            {trail.type}
          </Badge>
          <Badge className={difficultyColors[trail.difficulty as keyof typeof difficultyColors]}>
            {trail.difficulty}
          </Badge>
          <Badge variant="outline" className="bg-white/20 text-white border-white/30">
            {trail.terrain}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TrailHeader;
