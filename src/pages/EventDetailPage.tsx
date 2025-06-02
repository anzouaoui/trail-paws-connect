
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Users, Clock, Award, Star } from "lucide-react";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleJoinEvent = () => {
    navigate(`/event/${id}/register`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
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

      <div className="p-4 space-y-6">
        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </CardContent>
        </Card>

        {/* Informations principales */}
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

        {/* Organisateur */}
        <Card>
          <CardHeader>
            <CardTitle>Organisateur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {event.organizer.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium">{event.organizer.name}</p>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm text-muted-foreground">{event.organizer.rating}</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Contacter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Matériel requis */}
        <Card>
          <CardHeader>
            <CardTitle>Matériel requis</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {event.requirements.map((requirement, index) => (
                <li key={index} className="flex items-center">
                  <Award className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">{requirement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Boutons d'action */}
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
      </div>
    </div>
  );
};

export default EventDetailPage;
