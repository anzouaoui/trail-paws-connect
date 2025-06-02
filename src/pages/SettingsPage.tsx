
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  User,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Crown,
  Dog,
  Heart,
  Smartphone,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SettingsSection from "@/components/SettingsSection";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <h1 className="text-xl font-bold">Paramètres</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Premium Features Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Crown className="h-5 w-5 mr-2 text-amber-500" />
            Fonctionnalités Premium
          </h2>
          
          <SettingsSection
            icon={<Heart className="h-5 w-5" />}
            title="Dossiers Santé"
            description="Suivi de santé complet, vaccinations et rapports vétérinaires"
            onClick={() => navigate("/health-records")}
          />
          
          <SettingsSection
            icon={<BarChart3 className="h-5 w-5" />}
            title="Analyses Avancées"
            description="Graphiques interactifs et insights de performance détaillés"
            onClick={() => navigate("/analytics")}
          />
          
          <SettingsSection
            icon={<Smartphone className="h-5 w-5" />}
            title="Intégration d'Appareils"
            description="Connectez montres connectées et trackers GPS"
            onClick={() => navigate("/devices")}
          />
          
          <SettingsSection
            icon={<Crown className="h-5 w-5" />}
            title="Gérer l'Abonnement"
            description="Consultez votre plan premium et facturation"
            onClick={() => navigate("/subscription")}
          />
        </div>

        <Separator />

        {/* Account Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Compte</h2>
          
          <SettingsSection
            icon={<User className="h-5 w-5" />}
            title="Paramètres du Profil"
            description="Modifiez vos informations personnelles"
            onClick={() => navigate("/runner-profile")}
          />
          
          <SettingsSection
            icon={<Dog className="h-5 w-5" />}
            title="Profils des Chiens"
            description="Gérez les informations de vos chiens"
            onClick={() => navigate("/dogs")}
          />
          
          <SettingsSection
            icon={<Bell className="h-5 w-5" />}
            title="Notifications"
            description="Configurez vos préférences de notification"
            onClick={() => navigate("/notification-settings")}
          />
          
          <SettingsSection
            icon={<Bell className="h-5 w-5" />}
            title="Alertes Santé"
            description="Configurez le monitoring santé et rappels"
            onClick={() => navigate("/health-alerts")}
          />
        </div>

        <Separator />

        {/* App Settings */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Paramètres de l'App</h2>
          
          <SettingsSection
            icon={<Shield className="h-5 w-5" />}
            title="Confidentialité et Sécurité"
            description="Gérez vos paramètres de confidentialité et sécurité"
          />
          
          <SettingsSection
            icon={<MessageSquare className="h-5 w-5" />}
            title="Messages"
            description="Paramètres de chat et communication"
            onClick={() => navigate("/messages")}
          />
        </div>

        <Separator />

        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Support</h2>
          
          <SettingsSection
            icon={<HelpCircle className="h-5 w-5" />}
            title="Aide et Support"
            description="Obtenez de l'aide et contactez le support"
          />
        </div>

        <Separator />

        {/* Account Actions */}
        <div className="pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Se Déconnecter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
