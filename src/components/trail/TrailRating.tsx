
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TrailRatingProps {
  rating: number;
  reviews: number;
}

const TrailRating = ({ rating, reviews }: TrailRatingProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Évaluations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="text-lg font-semibold">{rating}</span>
          <span className="text-muted-foreground">({reviews} avis)</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrailRating;
