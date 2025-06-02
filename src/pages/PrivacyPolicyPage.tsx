
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicyPage = () => {
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
          <h1 className="text-xl font-bold">Politique de Confidentialité</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-forest/10 p-4 rounded-full">
            <Shield className="h-8 w-8 text-forest" />
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : 2 juin 2025
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Collecte des Données</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>Nous collectons les informations suivantes :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Informations de profil (nom, email, photo)</li>
                <li>Données d'activité (courses, distance, temps)</li>
                <li>Informations sur votre chien (race, âge, santé)</li>
                <li>Données de localisation lors du tracking</li>
                <li>Préférences et paramètres de l'application</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-3">2. Utilisation des Données</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>Vos données sont utilisées pour :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Fournir et améliorer nos services</li>
                <li>Personnaliser votre expérience</li>
                <li>Générer des statistiques et analyses</li>
                <li>Envoyer des notifications importantes</li>
                <li>Assurer la sécurité de l'application</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Partage des Données</h2>
            <p className="text-muted-foreground">
              Nous ne vendons jamais vos données personnelles. Nous pouvons partager des informations 
              anonymisées à des fins statistiques ou avec votre consentement explicite pour des fonctionnalités 
              spécifiques comme le partage d'activités avec vos amis.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Sécurité des Données</h2>
            <p className="text-muted-foreground">
              Nous utilisons des mesures de sécurité avancées pour protéger vos données, incluant le chiffrement, 
              l'authentification sécurisée et des protocoles de transmission sécurisés.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Vos Droits</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>Vous avez le droit de :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Accéder à vos données personnelles</li>
                <li>Corriger ou mettre à jour vos informations</li>
                <li>Supprimer votre compte et vos données</li>
                <li>Exporter vos données</li>
                <li>Contrôler les paramètres de confidentialité</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-3">6. Cookies et Technologies de Suivi</h2>
            <p className="text-muted-foreground">
              Nous utilisons des cookies et technologies similaires pour améliorer votre expérience, 
              analyser l'utilisation de l'application et personnaliser le contenu.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-3">7. Modifications de la Politique</h2>
            <p className="text-muted-foreground">
              Cette politique de confidentialité peut être mise à jour. Nous vous informerons 
              des changements importants par notification dans l'application.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold mb-3">8. Contact</h2>
            <p className="text-muted-foreground">
              Pour toute question concernant cette politique de confidentialité ou vos données, 
              contactez-nous à : privacy@dogrunner.app
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
