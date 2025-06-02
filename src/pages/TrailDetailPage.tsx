import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, TrendingUp, Star, Camera, Crown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TrailDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simulate premium user status - in real app this would come from auth context
  const isPremiumUser = false; // Change to true to test premium features

  // Sample trail data - normally this would come from an API
  const trail = {
    id: id,
    name: "Woodland Path",
    distance: "3.8 km",
    difficulty: "beginner",
    terrain: "flat",
    type: "canicross",
    elevation: "low",
    description: "Un magnifique sentier forestier parfait pour débuter en canicross. Le parcours serpente à travers une forêt de chênes centenaires avec un terrain plat et bien entretenu. Idéal pour une première expérience avec votre chien.",
    location: "Forêt de Fontainebleau",
    duration: "45 min",
    elevationGain: "50m",
    surface: "Terre battue",
    rating: 4.5,
    reviews: 23,
    features: [
      "Point d'eau disponible",
      "Parking gratuit",
      "Accessible toute l'année",
      "Toilettes publiques"
    ],
    tips: [
      "Meilleure période: tôt le matin",
      "Éviter les week-ends en été",
      "Prévoir de l'eau pour le chien"
    ]
  };

  const handleGpxDownload = () => {
    if (!isPremiumUser) {
      toast({
        title: "Fonctionnalité Premium",
        description: "Le téléchargement GPX est réservé aux abonnés Premium. Passez à Premium pour accéder à cette fonctionnalité.",
        variant: "destructive",
      });
      // Optionally redirect to subscription page
      setTimeout(() => {
        navigate("/subscription");
      }, 2000);
      return;
    }

    // Premium user - proceed with download
    toast({
      title: "Téléchargement en cours",
      description: "Le fichier GPX va être téléchargé.",
    });
    
    // Here you would implement the actual GPX download logic
    console.log("Downloading GPX file for trail:", id);
  };

  const handleViewOnMap = () => {
    // This feature remains free for all users
    toast({
      title: "Redirection vers la carte",
      description: "Ouverture de la vue carte...",
    });
  };

  const difficultyColors = {
    "beginner": "bg-green-100 text-green-800",
    "intermediate": "bg-yellow-100 text-yellow-800",
    "advanced": "bg-orange-100 text-orange-800",
    "expert": "bg-red-100 text-red-800"
  };

  const typeColors = {
    "canicross": "bg-forest text-white",
    "cani-hiking": "bg-earth text-white",
    "cani-MTB": "bg-sky text-white"
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
          <h1 className="text-xl font-semibold ml-2">Détails du parcours</h1>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{trail.name}</h2>
          <div className="flex flex-wrap gap-2">
            <Badge className={typeColors[trail.type as keyof typeof typeColors]}>
              {trail.type}
            </Badge>
            <Badge className={difficultyColors[trail.difficulty as keyof typeof difficultyColors]}>
              {trail.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-white/20 text-white border-white/30">
              {trail.terrain}
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
            <p className="text-muted-foreground leading-relaxed">{trail.description}</p>
          </CardContent>
        </Card>

        {/* Trail Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informations du parcours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <p className="font-medium">{trail.distance}</p>
                  <p className="text-sm text-muted-foreground">Distance</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <p className="font-medium">{trail.duration}</p>
                  <p className="text-sm text-muted-foreground">Durée estimée</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <p className="font-medium">{trail.elevationGain}</p>
                  <p className="text-sm text-muted-foreground">Dénivelé</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Camera className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <p className="font-medium">{trail.surface}</p>
                  <p className="text-sm text-muted-foreground">Surface</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center pt-2">
              <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <p className="font-medium">{trail.location}</p>
                <p className="text-sm text-muted-foreground">Localisation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating */}
        <Card>
          <CardHeader>
            <CardTitle>Évaluations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-lg font-semibold">{trail.rating}</span>
              <span className="text-muted-foreground">({trail.reviews} avis)</span>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Équipements disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {trail.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-forest rounded-full mr-3" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Conseils</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {trail.tips.map((tip, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-forest text-white hover:bg-forest-dark" size="lg">
            Commencer ce parcours
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleViewOnMap}>
              Voir sur la carte
            </Button>
            <Button 
              variant="outline" 
              onClick={handleGpxDownload}
              className={!isPremiumUser ? "relative" : ""}
            >
              {!isPremiumUser && (
                <Crown className="h-4 w-4 mr-2 text-yellow-500" />
              )}
              Télécharger GPX
              {!isPremiumUser && (
                <span className="text-xs text-yellow-600 ml-1">Premium</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailDetailPage;
