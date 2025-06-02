
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, MessageCircle, Share2, Heart, Trophy, Camera, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SettingsSection from "@/components/SettingsSection";

const CommunityPage = () => {
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
          <h1 className="text-xl font-bold">Communauté DogRunner</h1>
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* Welcome Section */}
        <div className="text-center mb-6">
          <div className="bg-forest/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Users className="h-8 w-8 text-forest" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Rejoignez notre communauté</h2>
          <p className="text-muted-foreground text-sm">
            Connectez-vous avec d'autres passionnés de course à pied avec leur chien et partagez vos expériences.
          </p>
        </div>

        {/* Réseaux Sociaux */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-forest">
              <Share2 className="h-6 w-6 mr-3" />
              Suivez-nous sur les réseaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <SettingsSection
                icon={<ExternalLink className="h-5 w-5" />}
                title="Instagram @dogrunner_app"
                description="Photos inspirantes et conseils quotidiens"
                onClick={() => window.open('https://instagram.com/dogrunner_app', '_blank')}
              />
              
              <SettingsSection
                icon={<ExternalLink className="h-5 w-5" />}
                title="Facebook DogRunner France"
                description="Groupe communautaire avec 12k+ membres"
                onClick={() => window.open('https://facebook.com/groups/dogrunner', '_blank')}
              />
              
              <SettingsSection
                icon={<ExternalLink className="h-5 w-5" />}
                title="YouTube DogRunner"
                description="Tutoriels et documentaires sur le canicross"
                onClick={() => window.open('https://youtube.com/@dogrunner', '_blank')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Forums et Discussions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-forest">
              <MessageCircle className="h-6 w-6 mr-3" />
              Forums et Discussions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <SettingsSection
                icon={<MessageCircle className="h-5 w-5" />}
                title="Forum Débutants"
                description="Questions et conseils pour bien commencer"
                onClick={() => navigate("/forum/beginners")}
              />
              
              <SettingsSection
                icon={<Trophy className="h-5 w-5" />}
                title="Défis et Compétitions"
                description="Participez aux défis mensuels de la communauté"
                onClick={() => navigate("/forum/challenges")}
              />
              
              <SettingsSection
                icon={<Heart className="h-5 w-5" />}
                title="Santé et Bien-être"
                description="Conseils vétérinaires et nutrition"
                onClick={() => navigate("/forum/health")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Événements */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Événements à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Canicross Paris 2025</h3>
                <p className="text-sm text-blue-700 mb-2">15 juin 2025 - Bois de Vincennes</p>
                <p className="text-sm text-blue-600">Course officielle avec parcours 5km et 10km</p>
                <Button size="sm" className="mt-2" onClick={() => navigate("/event/canicross-paris-2025")}>
                  S'inscrire
                </Button>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Rencontre Lyon</h3>
                <p className="text-sm text-green-700 mb-2">8 juin 2025 - Parc de la Tête d'Or</p>
                <p className="text-sm text-green-600">Sortie découverte gratuite pour les nouveaux</p>
                <Button size="sm" className="mt-2" onClick={() => navigate("/event/rencontre-lyon")}>
                  Participer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partage de Photos */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-forest">
              <Camera className="h-6 w-6 mr-3" />
              Galerie Communautaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
              <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
              <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
              <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <Button className="w-full" onClick={() => navigate("/community/gallery")}>
              Voir toutes les photos
            </Button>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Statistiques Communauté */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Notre communauté en chiffres</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-forest">25,000+</div>
              <div className="text-sm text-muted-foreground">Membres actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-forest">150,000+</div>
              <div className="text-sm text-muted-foreground">Courses partagées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-forest">500+</div>
              <div className="text-sm text-muted-foreground">Événements organisés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-forest">50+</div>
              <div className="text-sm text-muted-foreground">Villes couvertes</div>
            </div>
          </div>
        </div>

        {/* Règles de la Communauté */}
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mt-6">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">Règles de la Communauté</h3>
          <div className="text-sm text-orange-700 space-y-1">
            <p>• Respectez les autres membres et leurs chiens</p>
            <p>• Partagez des contenus positifs et constructifs</p>
            <p>• Pas de publicité ou de spam</p>
            <p>• Privilégiez le bien-être animal avant tout</p>
            <p>• Demandez conseil aux vétérinaires pour la santé</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
