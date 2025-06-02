
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Clock, Calendar, MapPin, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PhoneSupportPage = () => {
  const navigate = useNavigate();

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

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
          <h1 className="text-xl font-bold">Support Téléphonique</h1>
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* Header Info */}
        <div className="text-center mb-6">
          <div className="bg-forest/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Phone className="h-8 w-8 text-forest" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Assistance Téléphonique</h2>
          <p className="text-muted-foreground text-sm">
            Parlez directement avec notre équipe support pour une assistance personnalisée.
          </p>
        </div>

        {/* Main Phone Number */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-forest">
              <Phone className="h-5 w-5 mr-2" />
              Numéro Principal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-forest mb-2">
                +33 1 23 45 67 89
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Support technique et assistance générale
              </p>
              <Button 
                onClick={() => handleCall("+33123456789")}
                className="w-full bg-forest hover:bg-forest/90"
              >
                <Phone className="h-4 w-4 mr-2" />
                Appeler Maintenant
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hours of Operation */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Horaires d'Ouverture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Lundi - Vendredi</span>
                <span className="text-forest font-semibold">9h00 - 18h00</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Samedi</span>
                <span className="text-muted-foreground">10h00 - 16h00</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Dimanche</span>
                <span className="text-muted-foreground">Fermé</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg mt-4">
              <p className="text-sm text-blue-700 flex items-start">
                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                Les horaires peuvent varier pendant les jours fériés. Consultez notre site web pour les mises à jour.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Specialized Support */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Support Spécialisé
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Support Technique</h3>
                <span className="text-sm text-muted-foreground">Ext. 101</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Problèmes de synchronisation, bugs, dispositifs connectés
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCall("+33123456789,101")}
                className="w-full"
              >
                <Phone className="h-4 w-4 mr-2" />
                Appeler le Support Technique
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Support Premium</h3>
                <span className="text-sm text-muted-foreground">Ext. 102</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Fonctionnalités Premium, abonnements, facturation
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCall("+33123456789,102")}
                className="w-full"
              >
                <Phone className="h-4 w-4 mr-2" />
                Appeler le Support Premium
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Support Communauté</h3>
                <span className="text-sm text-muted-foreground">Ext. 103</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Événements, challenges, groupes de course
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCall("+33123456789,103")}
                className="w-full"
              >
                <Phone className="h-4 w-4 mr-2" />
                Appeler le Support Communauté
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* International Support */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Support International
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">Belgique</span>
                <p className="text-sm text-muted-foreground">+32 2 123 45 67</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCall("+3221234567")}
              >
                <Phone className="h-4 w-4" />
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">Suisse</span>
                <p className="text-sm text-muted-foreground">+41 22 123 45 67</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCall("+41221234567")}
              >
                <Phone className="h-4 w-4" />
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">Canada</span>
                <p className="text-sm text-muted-foreground">+1 514 123 4567</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCall("+15141234567")}
              >
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips for Calling */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Conseils pour votre Appel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>• Ayez votre numéro de compte ou email d'inscription à portée de main</p>
              <p>• Préparez une description détaillée de votre problème</p>
              <p>• Notez les étapes que vous avez déjà essayées</p>
              <p>• Si possible, appelez depuis l'appareil concerné</p>
              <p>• Temps d'attente moyen : 2-5 minutes</p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Urgence Vétérinaire
          </h3>
          <p className="text-sm text-red-700">
            En cas d'urgence concernant la santé de votre chien, contactez immédiatement votre vétérinaire ou un service d'urgence vétérinaire. 
            Notre support téléphonique ne peut pas fournir de conseils médicaux.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhoneSupportPage;
