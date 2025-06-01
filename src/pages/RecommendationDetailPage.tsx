
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, Star, Route, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MOCK_RECOMMENDATIONS } from "@/data/mockRecommendations";
import { getActivityTypeLabel, getDifficultyColor, getDifficultyText } from "@/utils/activityUtils";
import DogAvatar from "@/components/DogAvatar";

const RecommendationDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const recommendation = MOCK_RECOMMENDATIONS.find(rec => rec.id === id);

  if (!recommendation) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Recommandation introuvable</h2>
        <p className="text-muted-foreground mb-8">La recommandation que vous recherchez n'existe pas.</p>
        <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
      </div>
    );
  }

  const getActivityIcon = () => {
    switch (recommendation.type) {
      case "canicross":
        return <Users className="h-6 w-6 text-forest" />;
      case "cani-hiking":
        return <Mountain className="h-6 w-6 text-earth" />;
      case "cani-MTB":
        return <Route className="h-6 w-6 text-sky" />;
      default:
        return <Route className="h-6 w-6" />;
    }
  };

  const getActivityBenefits = () => {
    switch (recommendation.type) {
      case "canicross":
        return [
          "Améliore l'endurance cardiovasculaire",
          "Renforce le lien avec votre chien",
          "Développe la coordination",
          "Brûle efficacement les calories"
        ];
      case "cani-hiking":
        return [
          "Exploration de nouveaux territoires",
          "Renforcement musculaire",
          "Réduction du stress",
          "Amélioration de l'équilibre"
        ];
      case "cani-MTB":
        return [
          "Entraînement complet du corps",
          "Amélioration de la vitesse",
          "Développement de l'agilité",
          "Aventure et adrénaline"
        ];
      default:
        return [];
    }
  };

  const getEquipmentNeeded = () => {
    switch (recommendation.type) {
      case "canicross":
        return [
          "Harnais de canicross",
          "Ligne de trait élastique",
          "Ceinture de canicross",
          "Chaussures de trail"
        ];
      case "cani-hiking":
        return [
          "Harnais de randonnée",
          "Laisse courte",
          "Sac à dos avec eau",
          "Chaussures de randonnée"
        ];
      case "cani-MTB":
        return [
          "VTT adapté",
          "Harnais spécialisé",
          "Ligne de trait courte",
          "Casque et protections"
        ];
      default:
        return [];
    }
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Détails de la recommandation</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Image placeholder */}
        {recommendation.image && (
          <div 
            className="h-48 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${recommendation.image})` }}
          />
        )}

        {/* Title and Type */}
        <div>
          <div className="flex items-center mb-2">
            {getActivityIcon()}
            <h2 className="text-2xl font-bold ml-3">{recommendation.title}</h2>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-background">
              {getActivityTypeLabel(recommendation.type)}
            </Badge>
            <Badge className={getDifficultyColor(recommendation.rating)}>
              {getDifficultyText(recommendation.rating)}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pourquoi cette recommandation ?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{recommendation.description}</p>
          </CardContent>
        </Card>

        {/* Activity Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Détails de l'activité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Route className="h-5 w-5 text-muted-foreground mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">Distance</div>
                  <div className="font-semibold">{recommendation.distance}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">Durée estimée</div>
                  <div className="font-semibold">{recommendation.duration}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mountain className="h-5 w-5 text-muted-foreground mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">Dénivelé</div>
                  <div className="font-semibold">{recommendation.elevation}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Star className="h-5 w-5 text-muted-foreground mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">Difficulté</div>
                  <div className="font-semibold">{recommendation.rating}/5</div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <div className="text-sm text-muted-foreground">Lieu</div>
                <div className="font-semibold">{recommendation.location}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Dogs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recommandé pour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              {recommendation.dogNames.map((dogName) => (
                <div key={dogName} className="flex items-center">
                  <DogAvatar name={dogName} size="sm" />
                  <span className="ml-2 font-medium">{dogName}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bénéfices de cette activité</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {getActivityBenefits().map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-forest rounded-full mr-3" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Equipment Needed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Équipement nécessaire</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {getEquipmentNeeded().map((equipment, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-sky rounded-full mr-3" />
                  <span className="text-sm">{equipment}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="pt-4">
          <Button 
            className="w-full bg-forest text-white hover:bg-forest-dark"
            size="lg"
            onClick={() => {
              // Dans une vraie app, cela lancerait l'activité ou naviguerait vers une page de planification
              navigate('/track');
            }}
          >
            Commencer cette activité
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetailPage;
