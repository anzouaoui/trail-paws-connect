
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, MapPin, Timer, Heart, Trophy, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TrackingStartGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-xl font-bold">Guide de Démarrage</h1>
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* Welcome Section */}
        <div className="text-center mb-6">
          <div className="bg-forest/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Play className="h-8 w-8 text-forest" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Bienvenue sur DogRunner !</h2>
          <p className="text-muted-foreground text-sm">
            Suivez ce guide étape par étape pour commencer à tracker vos activités avec votre chien.
          </p>
        </div>

        {/* Step 1 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-forest">
              <div className="bg-forest text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                1
              </div>
              Configurez votre profil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Complétez vos informations</p>
                  <p className="text-sm text-muted-foreground">Ajoutez votre nom, photo et préférences d'activité</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Définissez vos objectifs</p>
                  <p className="text-sm text-muted-foreground">Distance quotidienne, fréquence d'entraînement, etc.</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-3"
                onClick={() => navigate("/profile")}
              >
                Aller au Profil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-forest">
              <div className="bg-forest text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                2
              </div>
              Ajoutez votre chien
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Créez le profil de votre chien</p>
                  <p className="text-sm text-muted-foreground">Nom, race, âge, poids et niveau d'activité</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Ajoutez une photo</p>
                  <p className="text-sm text-muted-foreground">Pour personnaliser l'expérience</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-3"
                onClick={() => navigate("/dogs")}
              >
                Gérer les Profils de Chiens
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-forest">
              <div className="bg-forest text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                3
              </div>
              Démarrez votre premier tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Choisissez votre activité
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Course à pied avec votre chien</li>
                  <li>• Marche ou randonnée</li>
                  <li>• Vélo avec chien qui court à côté</li>
                  <li>• Entraînement dans un parc</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                  <Timer className="h-4 w-4 mr-2" />
                  Pendant l'activité
                </h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• L'app track automatiquement votre position</li>
                  <li>• Surveillez la distance et le temps</li>
                  <li>• Prenez des pauses si nécessaire</li>
                  <li>• Observez le comportement de votre chien</li>
                </ul>
              </div>

              <Button 
                className="w-full bg-forest hover:bg-forest/90"
                onClick={() => navigate("/track")}
              >
                <Play className="h-4 w-4 mr-2" />
                Commencer le Tracking
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-forest">
              <div className="bg-forest text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                4
              </div>
              Analysez vos performances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start">
                <Heart className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Consultez vos statistiques</p>
                  <p className="text-sm text-muted-foreground">Distance, vitesse, calories brûlées</p>
                </div>
              </div>
              <div className="flex items-start">
                <Trophy className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Suivez vos progrès</p>
                  <p className="text-sm text-muted-foreground">Évolution de vos performances dans le temps</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-3"
                onClick={() => navigate("/stats")}
              >
                Voir les Statistiques
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Tips Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Conseils pour bien commencer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Commencez par des distances courtes et augmentez progressivement</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Assurez-vous que votre chien est en bonne santé avant de commencer</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Emportez toujours de l'eau pour vous et votre chien</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Respectez le rythme de votre chien et faites des pauses</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Utilisez une laisse adaptée à la course si nécessaire</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Warning */}
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-orange-800 mb-2 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Important - Sécurité
          </h3>
          <div className="text-sm text-orange-700 space-y-1">
            <p>• Consultez votre vétérinaire avant de commencer un programme d'exercice intense</p>
            <p>• Surveillez les signes de fatigue chez votre chien (halètement excessif, langue bleue)</p>
            <p>• Évitez les activités intenses par temps très chaud ou très froid</p>
            <p>• Respectez les règlements locaux concernant les chiens en laisse</p>
          </div>
        </div>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Prochaines étapes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/explore")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Explorez les sentiers près de chez vous
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/challenges")}
              >
                <Trophy className="h-4 w-4 mr-2" />
                Rejoignez des challenges communautaires
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/subscription")}
              >
                <Heart className="h-4 w-4 mr-2" />
                Découvrez les fonctionnalités Premium
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrackingStartGuide;
