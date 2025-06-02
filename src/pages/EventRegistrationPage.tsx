
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  dogName: string;
  dogBreed: string;
  dogAge: string;
  medicalConditions: string;
}

const EventRegistrationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      emergencyContact: "",
      emergencyPhone: "",
      dogName: "",
      dogBreed: "",
      dogAge: "",
      medicalConditions: ""
    }
  });

  // Sample event data - normally this would come from an API
  const event = {
    id: id,
    title: "Weekend Canicross Meetup",
    date: "25 mai 2025",
    time: "09:00 - 12:00",
    location: "Central Park, New York",
    attendees: 14,
    maxAttendees: 25,
    price: "Gratuit",
    type: "canicross",
    difficulty: "débutant",
    eventType: "meetup",
    organizer: {
      name: "Marie Dubois",
      website: "https://canicross-events.com/register/weekend-meetup-2025"
    },
    registrationMethod: "external" // "internal" or "external"
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

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Inscription confirmée !",
        description: "Vous êtes maintenant inscrit à cet événement. Un email de confirmation vous a été envoyé.",
      });
      
      navigate(`/event/${id}`);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExternalRegistration = () => {
    window.open(event.organizer.website, '_blank');
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
          <h1 className="text-xl font-semibold ml-2">Inscription à l'événement</h1>
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
        {/* Event Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Récapitulatif de l'événement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <p className="font-medium">{event.date}</p>
                <p className="text-sm text-muted-foreground">{event.time}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
              <p className="font-medium">{event.location}</p>
            </div>
            
            <div className="flex items-center">
              <Users className="h-5 w-5 text-muted-foreground mr-3" />
              <p className="font-medium">{event.attendees}/{event.maxAttendees} participants</p>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-green-800 font-medium">Prix: {event.price}</p>
            </div>
          </CardContent>
        </Card>

        {/* Registration Method */}
        {event.registrationMethod === "external" ? (
          <Card>
            <CardHeader>
              <CardTitle>Inscription externe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                L'inscription à cet événement se fait sur le site de l'organisateur.
              </p>
              <Button 
                className="w-full bg-forest text-white hover:bg-forest-dark" 
                size="lg"
                onClick={handleExternalRegistration}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                S'inscrire sur le site de l'organisateur
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Vous serez redirigé vers {event.organizer.website}
              </p>
            </CardContent>
          </Card>
        ) : (
          /* Internal Registration Form */
          <Card>
            <CardHeader>
              <CardTitle>Formulaire d'inscription</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informations personnelles</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        rules={{ required: "Le prénom est requis" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        rules={{ required: "Le nom est requis" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{ 
                        required: "L'email est requis",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Adresse email invalide"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{ required: "Le téléphone est requis" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Contact d'urgence</h3>
                    
                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      rules={{ required: "Le contact d'urgence est requis" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom du contact d'urgence</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="emergencyPhone"
                      rules={{ required: "Le téléphone d'urgence est requis" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone d'urgence</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Dog Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informations sur votre chien</h3>
                    
                    <FormField
                      control={form.control}
                      name="dogName"
                      rules={{ required: "Le nom du chien est requis" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom du chien</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dogBreed"
                        rules={{ required: "La race est requise" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Race</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="dogAge"
                        rules={{ required: "L'âge est requis" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Âge (années)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="medicalConditions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Conditions médicales (optionnel)</FormLabel>
                          <FormControl>
                            <Input placeholder="Allergies, blessures, médicaments..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-forest text-white hover:bg-forest-dark" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Inscription en cours..." : "Confirmer l'inscription"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventRegistrationPage;
