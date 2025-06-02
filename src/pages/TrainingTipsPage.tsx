
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Heart, Clock, Target, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TrainingTipsPage = () => {
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
          <h1 className="text-xl font-bold">Conseils d'Entraînement</h1>
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* Welcome Section */}
        <div className="text-center mb-6">
          <div className="bg-forest/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Trophy className="h-8 w-8 text-forest" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Optimisez vos performances</h2>
          <p className="text-muted-foreground text-sm">
            Découvrez nos conseils d'experts pour améliorer vos entraînements avec votre chien.
          </p>
        </div>

        {/* Démarrer l'entraînement */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-forest">
              <Zap className="h-6 w-6 mr-3" />
              Démarrer l'entraînement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Échauffement progressif</p>
                  <p className="text-sm text-muted-foreground">Commencez toujours par 5-10 minutes de marche tranquille</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Vérifiez l'équipement</p>
                  <p className="text-sm text-muted-foreground">Laisse, harnais, eau, et friandises pour la motivation</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Choisissez le bon moment</p>
                  <p className="text-sm text-muted-foreground">Évitez les heures chaudes, privilégiez le matin ou le soir</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progression et Objectifs */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-forest">
              <Target className="h-6 w-6 mr-3" />
              Progression et Objectifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Règle des 10%</h3>
                <p className="text-sm text-blue-700">
                  N'augmentez jamais la distance ou l'intensité de plus de 10% par semaine
                </p>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Objectifs SMART</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Spécifique : "Courir 5km sans pause"</li>
                  <li>• Mesurable : Utilisez l'app pour tracker</li>
                  <li>• Atteignable : Adaptez selon votre niveau</li>
                  <li>• Réaliste : Considérez l'âge de votre chien</li>
                  <li>• Temporel : Fixez une échéance claire</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Techniques d'entraînement */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-forest">
              <Clock className="h-6 w-6 mr-3" />
              Techniques d'entraînement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Entraînement par intervalles</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">Alternez entre effort et récupération :</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 2 min course rapide + 1 min marche (répéter 5x)</li>
                    <li>• 30 sec sprint + 90 sec trot (répéter 8x)</li>
                    <li>• 5 min effort modéré + 2 min récupération (répéter 3x)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Entraînement en endurance</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">Pour développer la résistance :</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Course continue à rythme modéré (60-70% effort max)</li>
                    <li>• Augmentation progressive de la durée</li>
                    <li>• 1-2 sorties longues par semaine maximum</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivation et récompenses */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-forest">
              <Heart className="h-6 w-6 mr-3" />
              Motivation et récompenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Récompenses immédiates</p>
                  <p className="text-sm text-muted-foreground">Friandises et félicitations dès que votre chien obéit</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Variez les parcours</p>
                  <p className="text-sm text-muted-foreground">Explorez de nouveaux sentiers pour maintenir l'intérêt</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Jeux et défis</p>
                  <p className="text-sm text-muted-foreground">Intégrez des exercices ludiques pendant les pauses</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Suivez vos progrès</p>
                  <p className="text-sm text-muted-foreground">Utilisez l'app pour visualiser vos améliorations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Signes à surveiller */}
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-orange-800 mb-2 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Signes de fatigue à surveiller
          </h3>
          <div className="text-sm text-orange-700 space-y-2">
            <p><strong>Chez votre chien :</strong></p>
            <ul className="space-y-1 ml-4">
              <li>• Halètement excessif ou difficulté à respirer</li>
              <li>• Langue bleue ou gencives pâles</li>
              <li>• Refus d'avancer ou ralentissement marqué</li>
              <li>• Boiterie ou signes de douleur</li>
              <li>• Vomissements ou diarrhée</li>
            </ul>
            <p className="mt-3"><strong>Chez vous :</strong></p>
            <ul className="space-y-1 ml-4">
              <li>• Essoufflement excessif</li>
              <li>• Douleurs articulaires ou musculaires</li>
              <li>• Vertiges ou malaise</li>
              <li>• Perte de motivation persistante</li>
            </ul>
          </div>
        </div>

        {/* Récupération */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Récupération et repos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Prévoyez au moins 1 jour de repos par semaine</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Hydratation : eau fraîche disponible avant, pendant et après</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Massage doux des pattes de votre chien après l'effort</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Vérifiez les coussinets pour détecter d'éventuelles blessures</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Sommeil de qualité : 12-14h pour les chiens, 7-9h pour vous</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan d'entraînement exemple */}
        <Card>
          <CardHeader>
            <CardTitle>Plan d'entraînement débutant (4 semaines)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Semaine 1-2 : Base</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 3x/semaine : 20 min marche rapide</li>
                  <li>• 2x/semaine : 15 min marche + 5 min trot léger</li>
                  <li>• 2 jours de repos</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Semaine 3-4 : Progression</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 3x/semaine : 25 min alternance marche/trot</li>
                  <li>• 1x/semaine : 30 min marche en nature</li>
                  <li>• 1x/semaine : entraînement par intervalles (15 min)</li>
                  <li>• 2 jours de repos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingTipsPage;
