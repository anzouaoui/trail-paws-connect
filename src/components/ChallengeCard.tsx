import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, DollarSign, Clock, MapPin, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  price: number;
  currency: string;
  maxParticipants: number;
  currentParticipants: number;
  location: string;
  difficulty: "débutant" | "intermédiaire" | "avancé" | "expert";
  requiredEquipment: string[];
  rewards: string[];
  activityType: string;
  organizer: string;
  isRegistered: boolean;
}

interface ChallengeCardProps {
  challenge: Challenge;
  onRegister: (challengeId: string) => void;
}

const ChallengeCard = ({ challenge, onRegister }: ChallengeCardProps) => {
  const navigate = useNavigate();

  const difficultyColors = {
    "débutant": "bg-green-100 text-green-800",
    "intermédiaire": "bg-yellow-100 text-yellow-800",
    "avancé": "bg-orange-100 text-orange-800",
    "expert": "bg-red-100 text-red-800"
  };

  const isRegistrationOpen = new Date() < new Date(challenge.registrationDeadline);
  const spotsAvailable = challenge.maxParticipants - challenge.currentParticipants;

  const handleRegisterClick = () => {
    navigate(`/challenge/${challenge.id}/register`);
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-forest to-forest-dark text-white p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{challenge.title}</h3>
          <Badge className={difficultyColors[challenge.difficulty]}>
            {challenge.difficulty}
          </Badge>
        </div>
        <p className="text-sm opacity-90 mb-3">{challenge.description}</p>
        <div className="flex items-center text-sm opacity-90">
          <Users className="h-4 w-4 mr-1" />
          <span>{challenge.currentParticipants}/{challenge.maxParticipants} participants</span>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Dates */}
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Défi: {challenge.startDate} - {challenge.endDate}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Inscription jusqu'au: {challenge.registrationDeadline}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{challenge.location}</span>
          </div>
        </div>

        {/* Prix */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-lg font-semibold">
              {challenge.price === 0 ? "Gratuit" : `${challenge.price} ${challenge.currency}`}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {spotsAvailable} places restantes
          </span>
        </div>

        {/* Matériel requis */}
        <div>
          <div className="flex items-center mb-2">
            <Wrench className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm font-medium">Matériel requis:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {challenge.requiredEquipment.map((equipment, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {equipment}
              </Badge>
            ))}
          </div>
        </div>

        {/* Récompenses */}
        {challenge.rewards.length > 0 && (
          <div>
            <span className="text-sm font-medium">Récompenses:</span>
            <ul className="text-xs text-muted-foreground mt-1">
              {challenge.rewards.map((reward, index) => (
                <li key={index}>• {reward}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Organisateur */}
        <div className="text-xs text-muted-foreground">
          Organisé par: {challenge.organizer}
        </div>

        {/* Bouton d'inscription */}
        <div className="pt-2">
          {challenge.isRegistered ? (
            <Button 
              variant="outline" 
              className="w-full"
              disabled
            >
              Déjà inscrit
            </Button>
          ) : !isRegistrationOpen ? (
            <Button 
              variant="outline" 
              className="w-full"
              disabled
            >
              Inscriptions fermées
            </Button>
          ) : spotsAvailable === 0 ? (
            <Button 
              variant="outline" 
              className="w-full"
              disabled
            >
              Complet
            </Button>
          ) : (
            <Button 
              className="w-full bg-forest text-white hover:bg-forest-dark"
              onClick={handleRegisterClick}
            >
              S'inscrire maintenant
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
