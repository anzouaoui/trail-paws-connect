
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

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Premium Features Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Crown className="h-5 w-5 mr-2 text-amber-500" />
            Premium Features
          </h2>
          
          <SettingsSection
            icon={<Heart className="h-5 w-5" />}
            title="Dog Health Records"
            description="Comprehensive health tracking, vaccinations, and vet reports"
            onClick={() => navigate("/health-records")}
          />
          
          <SettingsSection
            icon={<BarChart3 className="h-5 w-5" />}
            title="Advanced Analytics"
            description="Interactive charts and detailed performance insights"
            onClick={() => navigate("/analytics")}
          />
          
          <SettingsSection
            icon={<Smartphone className="h-5 w-5" />}
            title="Device Integration"
            description="Connect smartwatches and GPS trackers"
            onClick={() => navigate("/devices")}
          />
          
          <SettingsSection
            icon={<Crown className="h-5 w-5" />}
            title="Manage Subscription"
            description="View your premium plan and billing"
            onClick={() => navigate("/subscription")}
          />
        </div>

        <Separator />

        {/* Account Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Account</h2>
          
          <SettingsSection
            icon={<User className="h-5 w-5" />}
            title="Profile Settings"
            description="Edit your personal information"
            onClick={() => navigate("/runner-profile")}
          />
          
          <SettingsSection
            icon={<Dog className="h-5 w-5" />}
            title="Dog Profiles"
            description="Manage your dog's information"
            onClick={() => navigate("/dogs")}
          />
          
          <SettingsSection
            icon={<Bell className="h-5 w-5" />}
            title="Notifications"
            description="Configure your notification preferences"
            onClick={() => navigate("/notification-settings")}
          />
          
          <SettingsSection
            icon={<Bell className="h-5 w-5" />}
            title="Health Alerts"
            description="Set up health monitoring and reminders"
            onClick={() => navigate("/health-alerts")}
          />
        </div>

        <Separator />

        {/* App Settings */}
        <div>
          <h2 className="text-lg font-semibold mb-3">App Settings</h2>
          
          <SettingsSection
            icon={<Shield className="h-5 w-5" />}
            title="Privacy & Security"
            description="Manage your privacy and security settings"
          />
          
          <SettingsSection
            icon={<MessageSquare className="h-5 w-5" />}
            title="Messages"
            description="Chat and communication settings"
            onClick={() => navigate("/messages")}
          />
        </div>

        <Separator />

        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Support</h2>
          
          <SettingsSection
            icon={<HelpCircle className="h-5 w-5" />}
            title="Help & Support"
            description="Get help and contact support"
          />
        </div>

        <Separator />

        {/* Account Actions */}
        <div className="pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
