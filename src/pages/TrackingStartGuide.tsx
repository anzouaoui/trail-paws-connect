
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, MapPin, Timer, Heart, Settings, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TrackingStartGuide = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "Préparez votre chien",
      description: "Assurez-vous que votre chien est en bonne santé et prêt pour l'activité",
      icon: <Heart className="h-6 w-6" />,
      details: [
        "Vérifiez que votre chien a suffisamment d'énergie",
        "Assurez-vous qu'il a bu de l'eau récemment",
        "Vérifiez les conditions météo",
        "Préparez les accessoires nécessaires (laisse, sac à crottes, eau)"
      ]
    },
    {
      id: 2,
      title: "Sélectionnez votre chien",
      description: "Choisissez le profil du chien avec lequel vous allez faire l'activité",
      icon: <Settings className="h-6 w-6" />,
      details: [
        "Allez dans l'onglet 'Suivre l'Activité'",
        "Sélectionnez le bon profil de chien",
        "Vérifiez que les informations du chien sont à jour",
        "Choisissez le type d'activité (course, marche, randonnée)"
      ]
    },
    {
      id: 3,
      title: "Configurez les paramètres",
      description: "Ajustez les réglages selon vos préférences",
      icon: <Settings className="h-6 w-6" />,
      details: [
        "Activez la précision GPS haute définition",
        "Configurez les notifications vocales",
        "Réglez la fréquence de mise à jour",
        "Activez l'écran toujours actif si besoin"
      ]
    },
    {
      id: 4,
      title: "Démarrez le tracking",
      description: "Lancez l'enregistrement de votre activité",
      icon: <Play className="h-6 w-6" />,
      details: [
        "Appuyez sur 'Commencer le Suivi'",
        "Attendez la confirmation du signal GPS",
        "Commencez votre activité",
        "Surveillez les données en temps réel"
      ]
    }
  ];

  const tips = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      text: "Gardez votre téléphone dans une poche sécurisée"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      text: "Assurez-vous d'avoir suffisamment de batterie"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      text: "Activez les notifications pour recevoir les mises à jour"
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-amber-600" />,
      text: "Le GPS peut prendre quelques secondes à se connecter"
    }
  ];

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
          <h1 className="text-xl font-bold">Comment démarrer le tracking</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Introduction */}
        <Card className="bg-forest/5 border-forest/20">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <div className="bg-forest/10 p-2 rounded-full mr-3">
                <Play className="h-6 w-6 text-forest" />
              </div>
              <h2 className="text-lg font-semibold">Guide de démarrage rapide</h2>
            </div>
            <p className="text-muted-foreground">
              Suivez ces étapes simples pour commencer à tracker vos activités avec votre chien. 
              DogRunner vous permet de surveiller les performances, la santé et les progrès de votre compagnon.
            </p>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Étapes à suivre</h3>
          
          {steps.map((step, index) => (
            <Card key={step.id} className="relative">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-base">
                  <div className="bg-forest/10 p-2 rounded-full mr-3 text-forest">
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Étape {step.id}</span>
                    <h4 className="font-medium">{step.title}</h4>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-3">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-forest rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              {index < steps.length - 1 && (
                <div className="absolute left-8 bottom-0 w-0.5 h-4 bg-gray-200 transform translate-y-full" />
              )}
            </Card>
          ))}
        </div>

        <Separator />

        {/* Tips */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Conseils utiles</h3>
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                {tip.icon}
                <span className="text-sm">{tip.text}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
          <div className="grid grid-cols-1 gap-3">
            <Button 
              className="justify-start h-14 bg-forest"
              onClick={() => navigate("/track")}
            >
              <Play className="h-5 w-5 mr-3" />
              Aller au tracking
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-14"
              onClick={() => navigate("/dogs")}
            >
              <Heart className="h-5 w-5 mr-3" />
              Gérer mes chiens
            </Button>
          </div>
        </div>

        {/* Troubleshooting */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-red-800">
              <AlertCircle className="h-5 w-5 mr-2" />
              Problèmes fréquents
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 text-sm text-red-700">
              <p><strong>GPS ne se connecte pas :</strong> Sortez à l'extérieur et attendez quelques minutes</p>
              <p><strong>Application se ferme :</strong> Vérifiez que vous avez suffisamment de batterie</p>
              <p><strong>Données incorrectes :</strong> Redémarrez l'application et réessayez</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrackingStartGuide;
