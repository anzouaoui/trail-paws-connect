
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EventActionsProps {
  eventId: string;
}

const EventActions = ({ eventId }: EventActionsProps) => {
  const navigate = useNavigate();

  const handleJoinEvent = () => {
    navigate(`/event/${eventId}/register`);
  };

  return (
    <div className="space-y-3">
      <Button 
        className="w-full bg-forest text-white hover:bg-forest-dark" 
        size="lg"
        onClick={handleJoinEvent}
      >
        Rejoindre l'événement
      </Button>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline">
          Partager
        </Button>
        <Button variant="outline">
          Ajouter au calendrier
        </Button>
      </div>
    </div>
  );
};

export default EventActions;
