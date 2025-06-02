
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const TermsOfServicePage = () => {
  const navigate = useNavigate();

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
          <h1 className="text-xl font-bold">Conditions d'Utilisation</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-forest/10 p-4 rounded-full">
            <FileText className="h-8 w-8 text-forest" />
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : 2 juin 2025
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Acceptation des Conditions</h2>
            <p className="text-muted-foreground">
              En utilisant DogRunner, vous acceptez d'être lié par ces conditions d'utilisation. 
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre application.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-3">2. Description du Service</h2>
            <p className="text-muted-foreground">
              DogRunner est une application mobile dédiée au suivi d'activités sportives avec votre chien. 
              Elle permet de tracker vos courses, gérer la santé de votre animal et connecter avec d'autres propriétaires.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Utilisation Acceptable</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>Vous vous engagez à :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Utiliser l'application de manière légale et éthique</li>
                <li>Ne pas partager de contenu inapproprié ou offensant</li>
                <li>Respecter les autres utilisateurs de la communauté</li>
                <li>Fournir des informations exactes concernant votre chien</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Propriété Intellectuelle</h2>
            <p className="text-muted-foreground">
              Tous les contenus de l'application DogRunner, incluant les textes, images, logos et fonctionnalités, 
              sont protégés par les droits d'auteur et autres droits de propriété intellectuelle.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Limitation de Responsabilité</h2>
            <p className="text-muted-foreground">
              DogRunner ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation 
              de l'application. Les conseils de santé fournis ne remplacent pas une consultation vétérinaire.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-3">6. Modifications des Conditions</h2>
            <p className="text-muted-foreground">
              Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. 
              Les utilisateurs seront notifiés des changements importants.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-3">7. Contact</h2>
            <p className="text-muted-foreground">
              Pour toute question concernant ces conditions d'utilisation, 
              veuillez nous contacter à : support@dogrunner.app
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
