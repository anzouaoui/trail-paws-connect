
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface EventOrganizerProps {
  organizer: {
    name: string;
    rating: number;
  };
}

const EventOrganizer = ({ organizer }: EventOrganizerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organisateur</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {organizer.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <p className="font-medium">{organizer.name}</p>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="text-sm text-muted-foreground">{organizer.rating}</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Contacter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventOrganizer;
