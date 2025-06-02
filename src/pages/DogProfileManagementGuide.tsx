
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Dog, Plus, Edit3, Heart, Settings, CheckCircle, AlertCircle, Camera, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const DogProfileManagementGuide = () => {
  const navigate = useNavigate();

  const managementSteps = [
    {
      id: 1,
      title: "Ajouter un nouveau chien",
      description: "Créez le profil de votre compagnon canin",
      icon: <Plus className="h-6 w-6" />,
      details: [
        "Accédez à 'Profil' puis 'Mes Chiens'",
        "Appuyez sur le bouton '+' en haut à droite",
        "Remplissez les informations de base (nom, race, âge)",
        "Ajoutez une photo de votre chien",
        "Définissez le poids et l'unité de mesure",
        "Choisissez le sport préféré et le niveau d'expérience"
      ]
    },
    {
      id: 2,
      title: "Modifier un profil existant",
      description: "Mettez à jour les informations de votre chien",
      icon: <Edit3 className="h-6 w-6" />,
      details: [
        "Allez dans 'Mes Chiens' depuis votre profil",
        "Appuyez sur la carte du chien à modifier",
        "Modifiez les informations nécessaires",
        "Changez la photo si besoin",
        "Mettez à jour le poids si votre chien a grandi",
        "Sauvegardez les modifications"
      ]
    },
    {
      id: 3,
      title: "Configurer les préférences sportives",
      description: "Adaptez les réglages selon l'activité de votre chien",
      icon: <Settings className="h-6 w-6" />,
      details: [
        "Sélectionnez le sport principal de votre chien",
        "Définissez le niveau d'expérience approprié",
        "Ces réglages influencent les recommandations",
        "Vous pouvez changer ces préférences à tout moment"
      ]
    },
    {
      id: 4,
      title: "Gérer plusieurs chiens",
      description: "Organisez les profils de tous vos compagnons",
      icon: <Dog className="h-6 w-6" />,
      details: [
        "Ajoutez autant de chiens que nécessaire",
        "Chaque chien a son propre profil complet",
        "Lors du tracking, choisissez le chien concerné",
        "Les statistiques sont séparées par chien"
      ]
    }
  ];

  const requiredInfo = [
    { field: "Nom", description: "Le nom de votre chien", required: true },
    { field: "Race", description: "La race ou le mélange de races", required: true },
    { field: "Âge", description: "L'âge en années", required: true },
    { field: "Poids", description: "Le poids actuel avec l'unité", required: true },
    { field: "Photo", description: "Une photo récente de votre chien", required: false },
    { field: "Sport préféré", description: "L'activité principale pratiquée", required: false },
    { field: "Niveau", description: "Débutant, Intermédiaire, Avancé ou Professionnel", required: false }
  ];

  const tips = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      text: "Mettez à jour le poids régulièrement pour des calculs précis"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      text: "Une photo facilite l'identification lors du suivi"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      text: "Le niveau d'expérience aide à personnaliser les recommandations"
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-amber-600" />,
      text: "Vérifiez les informations avant de commencer une activité"
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
          <h1 className="text-xl font-bold">Gestion des profils de chiens</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Introduction */}
        <Card className="bg-forest/5 border-forest/20">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <div className="bg-forest/10 p-2 rounded-full mr-3">
                <Dog className="h-6 w-6 text-forest" />
              </div>
              <h2 className="text-lg font-semibold">Gérez vos compagnons canins</h2>
            </div>
            <p className="text-muted-foreground">
              Créez et gérez les profils de tous vos chiens pour un suivi personnalisé de leurs activités. 
              Chaque profil permet d'adapter l'expérience DogRunner aux spécificités de votre compagnon.
            </p>
          </CardContent>
        </Card>

        {/* Management Steps */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Guide de gestion</h3>
          
          {managementSteps.map((step, index) => (
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
              {index < managementSteps.length - 1 && (
                <div className="absolute left-8 bottom-0 w-0.5 h-4 bg-gray-200 transform translate-y-full" />
              )}
            </Card>
          ))}
        </div>

        <Separator />

        {/* Required Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Informations à renseigner</h3>
          <div className="space-y-3">
            {requiredInfo.map((info, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium">{info.field}</span>
                    {info.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${info.required ? 'bg-red-500' : 'bg-green-500'}`} />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">* Champs obligatoires</p>
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
              onClick={() => navigate("/dogs")}
            >
              <Dog className="h-5 w-5 mr-3" />
              Voir mes chiens
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-14"
              onClick={() => navigate("/dog-profile/new")}
            >
              <Plus className="h-5 w-5 mr-3" />
              Ajouter un chien
            </Button>
          </div>
        </div>

        {/* Features Overview */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-blue-800">
              <Heart className="h-5 w-5 mr-2" />
              Fonctionnalités des profils
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 gap-3 text-sm text-blue-700">
              <div className="flex items-center">
                <Camera className="h-4 w-4 mr-2" />
                <span>Photos et avatars personnalisés</span>
              </div>
              <div className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                <span>Préférences sportives adaptées</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                <span>Suivi de santé et performance</span>
              </div>
              <div className="flex items-center">
                <Trash2 className="h-4 w-4 mr-2" />
                <span>Suppression sécurisée des profils</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DogProfileManagementGuide;
