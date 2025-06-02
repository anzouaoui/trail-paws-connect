
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, Wifi, WifiOff, Smartphone, AlertTriangle, CheckCircle, Settings, Bluetooth, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SyncTroubleshootingGuide = () => {
  const navigate = useNavigate();

  const commonIssues = [
    {
      id: 1,
      title: "Connexion Internet Instable",
      description: "La synchronisation nécessite une connexion stable",
      icon: <Wifi className="h-5 w-5" />,
      solutions: [
        "Vérifiez votre connexion Wi-Fi ou données mobiles",
        "Essayez de vous reconnecter au réseau",
        "Testez avec un autre réseau si possible",
        "Redémarrez votre routeur si vous êtes chez vous"
      ]
    },
    {
      id: 2,
      title: "Problème de Bluetooth",
      description: "Les appareils connectés ne synchronisent pas",
      icon: <Bluetooth className="h-5 w-5" />,
      solutions: [
        "Vérifiez que le Bluetooth est activé",
        "Rapprochez-vous de l'appareil (moins de 10m)",
        "Redémarrez le Bluetooth sur votre téléphone",
        "Reconnectez l'appareil dans les paramètres"
      ]
    },
    {
      id: 3,
      title: "Données en Attente",
      description: "Les activités ne remontent pas sur le serveur",
      icon: <Cloud className="h-5 w-5" />,
      solutions: [
        "Ouvrez l'application avec une bonne connexion",
        "Tirez vers le bas pour forcer la synchronisation",
        "Vérifiez l'espace de stockage disponible",
        "Redémarrez l'application"
      ]
    },
    {
      id: 4,
      title: "Application Obsolète",
      description: "Version de l'app incompatible avec le serveur",
      icon: <Smartphone className="h-5 w-5" />,
      solutions: [
        "Mettez à jour l'application depuis le store",
        "Redémarrez l'app après la mise à jour",
        "Vérifiez la compatibilité de votre OS",
        "Contactez le support si le problème persiste"
      ]
    }
  ];

  const quickFixes = [
    {
      title: "Synchronisation Manuelle",
      description: "Tirez vers le bas sur l'écran principal",
      icon: <RefreshCw className="h-4 w-4" />
    },
    {
      title: "Redémarrer l'App",
      description: "Fermez et rouvrez complètement l'application",
      icon: <Smartphone className="h-4 w-4" />
    },
    {
      title: "Vérifier la Connexion",
      description: "Testez votre connexion internet",
      icon: <Wifi className="h-4 w-4" />
    },
    {
      title: "Reconnecter les Appareils",
      description: "Déconnectez et reconnectez vos appareils",
      icon: <Settings className="h-4 w-4" />
    }
  ];

  const preventionTips = [
    "Gardez l'application à jour",
    "Synchronisez régulièrement quand vous avez une bonne connexion",
    "Évitez de fermer l'app pendant une synchronisation",
    "Vérifiez périodiquement l'état de vos appareils connectés",
    "Maintenez suffisamment d'espace libre sur votre téléphone"
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
          <h1 className="text-xl font-bold">Problèmes de Synchronisation</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Introduction */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <RefreshCw className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Résoudre les Problèmes de Sync</h2>
                <p className="text-muted-foreground">Guide pour diagnostiquer et corriger les problèmes</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              La synchronisation permet de garder vos données à jour entre vos appareils et notre serveur. 
              Voici comment résoudre les problèmes les plus courants.
            </p>
          </CardContent>
        </Card>

        {/* Quick Status Check */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Vérification Rapide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickFixes.map((fix, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    {fix.icon}
                    <span className="font-medium text-sm">{fix.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{fix.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Common Issues */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Problèmes Courants</h3>
          
          <div className="space-y-4">
            {commonIssues.map((issue) => (
              <Card key={issue.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-base">
                    <div className="bg-red-50 p-2 rounded-full mr-3 text-red-600">
                      {issue.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{issue.title}</h4>
                      <p className="text-sm text-muted-foreground font-normal">{issue.description}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <p className="font-medium text-sm mb-2">Solutions :</p>
                    {issue.solutions.map((solution, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-forest rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm">{solution}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        {/* Step by Step Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle>Diagnostic Étape par Étape</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-forest text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                <div>
                  <p className="font-medium">Vérifiez votre connexion</p>
                  <p className="text-sm text-muted-foreground">Assurez-vous d'avoir une connexion internet stable</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-forest text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                <div>
                  <p className="font-medium">Forcez la synchronisation</p>
                  <p className="text-sm text-muted-foreground">Tirez vers le bas sur l'écran principal</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-forest text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                <div>
                  <p className="font-medium">Redémarrez l'application</p>
                  <p className="text-sm text-muted-foreground">Fermez complètement et rouvrez l'app</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-forest text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</div>
                <div>
                  <p className="font-medium">Vérifiez les appareils connectés</p>
                  <p className="text-sm text-muted-foreground">Allez dans Paramètres > Appareils connectés</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-forest text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</div>
                <div>
                  <p className="font-medium">Contactez le support</p>
                  <p className="text-sm text-muted-foreground">Si le problème persiste après ces étapes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Prevention Tips */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Conseils de Prévention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {preventionTips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Alert */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Données importantes manquantes ?</strong> Si vous avez perdu des données d'activité importantes, 
            contactez immédiatement notre support technique. Nous pouvons parfois récupérer les données depuis nos sauvegardes.
          </AlertDescription>
        </Alert>

        {/* Contact Support */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Besoin d'Aide Supplémentaire ?</h3>
            <p className="text-muted-foreground mb-4">
              Notre équipe technique est là pour vous aider avec les problèmes de synchronisation complexes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/help-support")}
              >
                Contacter le Support
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/devices")}
              >
                Gérer mes Appareils
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SyncTroubleshootingGuide;
