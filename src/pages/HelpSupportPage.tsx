
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, HelpCircle, MessageSquare, Mail, Phone, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SettingsSection from "@/components/SettingsSection";

const HelpSupportPage = () => {
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
          <h1 className="text-xl font-bold">Aide et Support</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-forest/10 p-4 rounded-full">
            <HelpCircle className="h-8 w-8 text-forest" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold mb-2">Comment pouvons-nous vous aider ?</h2>
          <p className="text-muted-foreground">
            Trouvez rapidement les réponses à vos questions ou contactez notre équipe support.
          </p>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Questions Fréquentes</h3>
          
          <SettingsSection
            icon={<FileText className="h-5 w-5" />}
            title="Comment démarrer le tracking ?"
            description="Guide pour commencer à tracker vos activités avec votre chien"
            onClick={() => navigate("/tracking-guide")}
          />
          
          <SettingsSection
            icon={<FileText className="h-5 w-5" />}
            title="Gestion des profils de chiens"
            description="Ajouter, modifier et gérer les informations de vos chiens"
            onClick={() => navigate("/dog-management-guide")}
          />
          
          <SettingsSection
            icon={<FileText className="h-5 w-5" />}
            title="Fonctionnalités Premium"
            description="Découvrez tous les avantages de l'abonnement Premium"
            onClick={() => navigate("/premium-features-guide")}
          />
          
          <SettingsSection
            icon={<FileText className="h-5 w-5" />}
            title="Problèmes de synchronisation"
            description="Résoudre les problèmes de synchronisation des données"
            onClick={() => navigate("/sync-troubleshooting")}
          />
        </div>

        <Separator />

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Nous Contacter</h3>
          
          <SettingsSection
            icon={<MessageSquare className="h-5 w-5" />}
            title="Chat en Direct"
            description="Assistance immédiate avec notre équipe support"
            onClick={() => navigate("/live-chat")}
          />
          
          <SettingsSection
            icon={<Mail className="h-5 w-5" />}
            title="Email Support"
            description="support@dogrunner.app - Réponse sous 24h"
            onClick={() => navigate("/email-support")}
          />
          
          <SettingsSection
            icon={<Phone className="h-5 w-5" />}
            title="Support Téléphonique"
            description="Lun-Ven 9h-18h : +33 1 23 45 67 89"
            onClick={() => navigate("/phone-support")}
          />
        </div>

        <Separator />

        {/* Resources Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Ressources Utiles</h3>
          
          <SettingsSection
            icon={<ExternalLink className="h-5 w-5" />}
            title="Guide de Démarrage"
            description="Tout ce qu'il faut savoir pour bien commencer"
            onClick={() => navigate("/tracking-guide")}
          />
          
          <SettingsSection
            icon={<ExternalLink className="h-5 w-5" />}
            title="Conseils d'Entraînement"
            description="Tips pour améliorer vos performances et celles de votre chien"
          />
          
          <SettingsSection
            icon={<ExternalLink className="h-5 w-5" />}
            title="Communauté DogRunner"
            description="Rejoignez notre communauté sur les réseaux sociaux"
          />
        </div>

        <Separator />

        {/* App Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Informations de l'Application</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Version : 2.1.0</p>
            <p>Dernière mise à jour : 2 juin 2025</p>
            <p>Système : iOS/Android</p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Urgence Vétérinaire</h3>
          <p className="text-sm text-red-700">
            En cas d'urgence concernant la santé de votre chien, contactez immédiatement votre vétérinaire. 
            DogRunner ne remplace pas les conseils médicaux professionnels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
