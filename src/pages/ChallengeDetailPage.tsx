
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, Users, MapPin, Clock, DollarSign, Trophy, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Données d'exemple - normalement récupérées via l'ID
  const challenge = {
    id: id || "1",
    title: "Défi Trail d'Été",
    description: "Complétez 50km dans les 14 prochains jours avec votre compagnon canin. Ce défi vous permettra de découvrir de nouveaux sentiers et de renforcer votre lien avec votre chien tout en maintenant une excellente forme physique.",
    startDate: "15 juin 2025",
    endDate: "29 juin 2025",
    registrationDeadline: "10 juin 2025",
    price: 25,
    currency: "€",
    maxParticipants: 50,
    currentParticipants: 23,
    location: "Région Parisienne",
    difficulty: "intermédiaire" as const,
    requiredEquipment: ["Harnais canicross", "Laisse élastique", "Chaussures trail"],
    rewards: ["Médaille finisher", "Bon d'achat 50€", "Photo souvenir"],
    activityType: "canicross",
    organizer: "Club Canicross Paris",
    isRegistered: false,
    detailedDescription: "Ce défi d'été est conçu pour les coureurs de niveau intermédiaire qui souhaitent pousser leurs limites avec leur compagnon canin. Vous aurez 14 jours pour parcourir 50km au total, répartis comme vous le souhaitez. C'est l'occasion parfaite pour explorer de nouveaux sentiers en région parisienne tout en profitant du beau temps estival.",
    rules: [
      "Minimum 2km par sortie",
      "Maximum 15km par jour",
      "Photos obligatoires à chaque sortie",
      "Respect des autres utilisateurs des sentiers",
      "Port du harnais obligatoire pour le chien"
    ],
    schedule: [
      { date: "15 juin", event: "Début du défi - Session d'échauffement" },
      { date: "22 juin", event: "Point d'étape - Vérification des progrès" },
      { date: "29 juin", event: "Fin du défi - Remise des récompenses" }
    ]
  };

  const difficultyColors = {
    "débutant": "bg-green-100 text-green-800",
    "intermédiaire": "bg-yellow-100 text-yellow-800",
    "avancé": "bg-orange-100 text-orange-800",
    "expert": "bg-red-100 text-red-800"
  };

  const participationProgress = (challenge.currentParticipants / challenge.maxParticipants) * 100;
  const spotsAvailable = challenge.maxParticipants - challenge.currentParticipants;
  const isRegistrationOpen = new Date() < new Date(challenge.registrationDeadline);

  const handleRegister = () => {
    navigate(`/challenge/${challenge.id}/register`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest to-forest-dark text-white">
        <div className="px-4 py-6">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Détail du Défi</h1>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold">{challenge.title}</h2>
              <Badge className={difficultyColors[challenge.difficulty]}>
                {challenge.difficulty}
              </Badge>
            </div>
            
            <p className="text-sm opacity-90">{challenge.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">{challenge.currentParticipants}/{challenge.maxParticipants} participants</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-lg font-semibold">
                  {challenge.price === 0 ? "Gratuit" : `${challenge.price} ${challenge.currency}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Informations principales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2" />
              Informations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Période du défi</span>
                <span className="font-medium">{challenge.startDate} - {challenge.endDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Inscription jusqu'au</span>
                <span className="font-medium">{challenge.registrationDeadline}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Lieu</span>
                <span className="font-medium">{challenge.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Organisateur</span>
                <span className="font-medium">{challenge.organizer}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression des inscriptions</span>
                <span>{challenge.currentParticipants}/{challenge.maxParticipants}</span>
              </div>
              <Progress value={participationProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">{spotsAvailable} places restantes</p>
            </div>
          </CardContent>
        </Card>

        {/* Description détaillée */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{challenge.detailedDescription}</p>
          </CardContent>
        </Card>

        {/* Matériel requis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wrench className="h-5 w-5 mr-2" />
              Matériel requis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {challenge.requiredEquipment.map((equipment, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {equipment}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Règles */}
        <Card>
          <CardHeader>
            <CardTitle>Règles du défi</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {challenge.rules.map((rule, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="text-forest mr-2">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Planning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Planning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {challenge.schedule.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium text-sm">{item.date}</span>
                  <span className="text-sm text-muted-foreground">{item.event}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Récompenses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Récompenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {challenge.rewards.map((reward, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                  <span>{reward}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Bouton d'inscription */}
        <div className="pt-4">
          {challenge.isRegistered ? (
            <Button variant="outline" className="w-full" disabled>
              Déjà inscrit
            </Button>
          ) : !isRegistrationOpen ? (
            <Button variant="outline" className="w-full" disabled>
              Inscriptions fermées
            </Button>
          ) : spotsAvailable === 0 ? (
            <Button variant="outline" className="w-full" disabled>
              Complet
            </Button>
          ) : (
            <Button 
              className="w-full bg-forest text-white hover:bg-forest-dark"
              onClick={handleRegister}
            >
              S'inscrire au défi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
