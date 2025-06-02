
import React from "react";
import { useParams } from "react-router-dom";
import EventHeader from "@/components/event/EventHeader";
import EventDescription from "@/components/event/EventDescription";
import EventInfo from "@/components/event/EventInfo";
import EventOrganizer from "@/components/event/EventOrganizer";
import EventRequirements from "@/components/event/EventRequirements";
import EventActions from "@/components/event/EventActions";

const EventDetailPage = () => {
  const { id } = useParams();

  // Sample event data - normally this would come from an API
  const event = {
    id: id,
    title: "Weekend Canicross Meetup",
    description: "Rejoignez-nous pour une session de canicross dans le magnifique Central Park. Cette sortie est parfaite pour tous les niveaux, que vous soyez débutant ou expérimenté. Venez avec votre chien et découvrez les joies de la course ensemble !",
    date: "25 mai 2025",
    time: "09:00 - 12:00",
    location: "Central Park, New York",
    attendees: 14,
    maxAttendees: 25,
    distance: "5 km",
    type: "canicross",
    difficulty: "débutant",
    elevation: "faible",
    eventType: "meetup",
    organizer: {
      name: "Marie Dubois",
      avatar: "/placeholder.svg",
      rating: 4.8
    },
    requirements: [
      "Chien en bonne santé",
      "Harnais de canicross",
      "Laisse élastique",
      "Eau pour vous et votre chien"
    ],
    meetingPoint: "Entrée principale du Central Park, près de Columbus Circle",
    price: "Gratuit",
    weather: "Ensoleillé, 18°C"
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <EventHeader event={event} />

      <div className="p-4 space-y-6">
        <EventDescription description={event.description} />
        <EventInfo event={event} />
        <EventOrganizer organizer={event.organizer} />
        <EventRequirements requirements={event.requirements} />
        <EventActions eventId={id || ""} />
      </div>
    </div>
  );
};

export default EventDetailPage;
