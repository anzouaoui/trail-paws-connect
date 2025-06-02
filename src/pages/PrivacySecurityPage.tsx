
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Lock, UserX, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import SettingsSection from "@/components/SettingsSection";

const PrivacySecurityPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Confidentialité et Sécurité</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Privacy Settings */}
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Eye className="h-5 w-5 mr-2 text-forest" />
            Confidentialité
          </h2>
          
          <SettingsSection
            icon={<Eye className="h-5 w-5" />}
            title="Profil Privé"
            description="Seuls vos amis peuvent voir vos activités"
          >
            <Switch />
          </SettingsSection>
          
          <SettingsSection
            icon={<Eye className="h-5 w-5" />}
            title="Activités Visibles"
            description="Permettre à d'autres utilisateurs de voir vos courses"
          >
            <Switch defaultChecked />
          </SettingsSection>
          
          <SettingsSection
            icon={<Eye className="h-5 w-5" />}
            title="Localisation"
            description="Partager votre position avec vos amis pendant les courses"
          >
            <Switch />
          </SettingsSection>
        </div>

        <Separator />

        {/* Security Settings */}
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-forest" />
            Sécurité
          </h2>
          
          <SettingsSection
            icon={<Lock className="h-5 w-5" />}
            title="Changer le Mot de Passe"
            description="Modifiez votre mot de passe de connexion"
          />
          
          <SettingsSection
            icon={<Shield className="h-5 w-5" />}
            title="Authentification à Deux Facteurs"
            description="Ajoutez une couche de sécurité supplémentaire"
          >
            <Switch />
          </SettingsSection>
          
          <SettingsSection
            icon={<UserX className="h-5 w-5" />}
            title="Sessions Actives"
            description="Gérez vos appareils connectés"
          />
        </div>

        <Separator />

        {/* Data Management */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Gestion des Données</h2>
          
          <SettingsSection
            icon={<Download className="h-5 w-5" />}
            title="Télécharger mes Données"
            description="Obtenez une copie de toutes vos données"
          />
          
          <SettingsSection
            icon={<Trash2 className="h-5 w-5" />}
            title="Supprimer mon Compte"
            description="Supprimez définitivement votre compte et toutes vos données"
            className="border-red-200 hover:bg-red-50"
          />
        </div>

        <Separator />

        {/* Permissions */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Permissions</h2>
          
          <SettingsSection
            icon={<Shield className="h-5 w-5" />}
            title="Accès à la Caméra"
            description="Autoriser l'accès pour prendre des photos"
          >
            <Switch defaultChecked />
          </SettingsSection>
          
          <SettingsSection
            icon={<Shield className="h-5 w-5" />}
            title="Accès aux Contacts"
            description="Trouver vos amis sur l'application"
          >
            <Switch />
          </SettingsSection>
          
          <SettingsSection
            icon={<Shield className="h-5 w-5" />}
            title="Notifications Push"
            description="Recevoir des notifications sur cet appareil"
          >
            <Switch defaultChecked />
          </SettingsSection>
        </div>
      </div>
    </div>
  );
};

export default PrivacySecurityPage;
