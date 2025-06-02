
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

interface EventInfoProps {
  event: {
    date: string;
    time: string;
    location: string;
    meetingPoint: string;
    attendees: number;
    maxAttendees: number;
    distance: string;
    weather: string;
  };
}

const EventInfo = ({ event }: EventInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
          <div>
            <p className="font-medium">{event.date}</p>
            <p className="text-sm text-muted-foreground">{event.time}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
          <div>
            <p className="font-medium">{event.location}</p>
            <p className="text-sm text-muted-foreground">{event.meetingPoint}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Users className="h-5 w-5 text-muted-foreground mr-3" />
          <div>
            <p className="font-medium">{event.attendees}/{event.maxAttendees} participants</p>
            <p className="text-sm text-muted-foreground">{event.maxAttendees - event.attendees} places restantes</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-muted-foreground mr-3" />
          <div>
            <p className="font-medium">Distance: {event.distance}</p>
            <p className="text-sm text-muted-foreground">Météo prévue: {event.weather}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventInfo;
