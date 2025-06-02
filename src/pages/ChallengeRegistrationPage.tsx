
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CalendarDays, Users, DollarSign, Clock, MapPin, Wrench, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ChallengeRegistrationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Données d'exemple du défi (normalement récupérées via API)
  const challenge = {
    id: "1",
    title: "Défi Trail d'Été",
    description: "Complétez 50km dans les 14 prochains jours avec votre compagnon canin",
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
    isRegistered: false
  };

  const [formData, setFormData] = useState({
    participantName: "",
    email: "",
    phone: "",
    dogName: "",
    dogBreed: "",
    dogAge: "",
    emergencyContact: "",
    emergencyPhone: "",
    hasRequiredEquipment: false,
    acceptsTerms: false,
    acceptsWaiver: false,
    specialRequirements: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const difficultyColors = {
    "débutant": "bg-green-100 text-green-800",
    "intermédiaire": "bg-yellow-100 text-yellow-800",
    "avancé": "bg-orange-100 text-orange-800",
    "expert": "bg-red-100 text-red-800"
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation basique
    if (!formData.participantName || !formData.email || !formData.dogName || 
        !formData.hasRequiredEquipment || !formData.acceptsTerms || !formData.acceptsWaiver) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulation de l'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Inscription confirmée !",
      description: "Vous êtes maintenant inscrit au défi. Un email de confirmation vous a été envoyé.",
    });

    setIsSubmitting(false);
    navigate("/home");
  };

  const spotsAvailable = challenge.maxParticipants - challenge.currentParticipants;

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <header className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-3"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Inscription au Défi</h1>
      </header>

      {/* Résumé du défi */}
      <Card className="mb-6">
        <div className="bg-gradient-to-r from-forest to-forest-dark text-white p-4">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-semibold">{challenge.title}</h2>
            <Badge className={difficultyColors[challenge.difficulty]}>
              {challenge.difficulty}
            </Badge>
          </div>
          <p className="text-sm opacity-90 mb-3">{challenge.description}</p>
          <div className="flex items-center text-sm opacity-90">
            <Users className="h-4 w-4 mr-1" />
            <span>{spotsAvailable} places restantes</span>
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{challenge.startDate} - {challenge.endDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Inscription jusqu'au: {challenge.registrationDeadline}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{challenge.location}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-semibold">{challenge.price} {challenge.currency}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire d'inscription */}
      <Card>
        <CardHeader>
          <CardTitle>Informations d'inscription</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations participant */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Vos informations</h3>
              
              <div className="space-y-2">
                <Label htmlFor="participantName">Nom complet *</Label>
                <Input
                  id="participantName"
                  value={formData.participantName}
                  onChange={(e) => handleInputChange("participantName", e.target.value)}
                  placeholder="Votre nom et prénom"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>

            {/* Informations chien */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Informations de votre chien</h3>
              
              <div className="space-y-2">
                <Label htmlFor="dogName">Nom du chien *</Label>
                <Input
                  id="dogName"
                  value={formData.dogName}
                  onChange={(e) => handleInputChange("dogName", e.target.value)}
                  placeholder="Nom de votre compagnon"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dogBreed">Race</Label>
                  <Input
                    id="dogBreed"
                    value={formData.dogBreed}
                    onChange={(e) => handleInputChange("dogBreed", e.target.value)}
                    placeholder="Race du chien"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dogAge">Âge</Label>
                  <Input
                    id="dogAge"
                    value={formData.dogAge}
                    onChange={(e) => handleInputChange("dogAge", e.target.value)}
                    placeholder="2 ans"
                  />
                </div>
              </div>
            </div>

            {/* Contact d'urgence */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Contact d'urgence</h3>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Nom du contact</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="Nom de votre contact d'urgence"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Téléphone d'urgence</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>

            {/* Matériel requis */}
            <div className="space-y-4">
              <div className="flex items-center mb-2">
                <Wrench className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="font-medium">Matériel requis</span>
              </div>
              <div className="bg-muted p-3 rounded-md">
                <ul className="text-sm space-y-1">
                  {challenge.requiredEquipment.map((equipment, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                      {equipment}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasEquipment"
                  checked={formData.hasRequiredEquipment}
                  onCheckedChange={(checked) => handleInputChange("hasRequiredEquipment", !!checked)}
                />
                <Label htmlFor="hasEquipment" className="text-sm">
                  Je possède tout le matériel requis *
                </Label>
              </div>
            </div>

            {/* Besoins spéciaux */}
            <div className="space-y-2">
              <Label htmlFor="specialRequirements">Besoins spéciaux ou remarques</Label>
              <Input
                id="specialRequirements"
                value={formData.specialRequirements}
                onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                placeholder="Allergies, besoins particuliers..."
              />
            </div>

            {/* Conditions */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptsTerms"
                  checked={formData.acceptsTerms}
                  onCheckedChange={(checked) => handleInputChange("acceptsTerms", !!checked)}
                />
                <Label htmlFor="acceptsTerms" className="text-sm leading-relaxed">
                  J'accepte les conditions générales et le règlement du défi *
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptsWaiver"
                  checked={formData.acceptsWaiver}
                  onCheckedChange={(checked) => handleInputChange("acceptsWaiver", !!checked)}
                />
                <Label htmlFor="acceptsWaiver" className="text-sm leading-relaxed">
                  Je décharge l'organisateur de toute responsabilité et participe à mes risques et périls *
                </Label>
              </div>
            </div>

            {/* Prix et inscription */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total à payer:</span>
                <span className="text-2xl font-bold text-forest">
                  {challenge.price} {challenge.currency}
                </span>
              </div>

              <Button
                type="submit"
                className="w-full bg-forest text-white hover:bg-forest-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Inscription en cours..." : "Confirmer l'inscription"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeRegistrationPage;
