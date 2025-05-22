
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  Shield, 
  MapPin, 
  Camera, 
  Microphone, 
  Languages, 
  ShieldCheck, 
  Lock, 
  UserX, 
  Settings, 
  ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import SettingsSection from "@/components/SettingsSection";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account",
      });
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "There was a problem signing you out",
      });
    }
  };

  const confirmLogout = () => {
    // In a real app, you might want to show a confirmation dialog
    handleLogout();
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Settings</h1>
          <div className="flex-1"></div>
          <Settings className="h-5 w-5 text-forest" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Notifications */}
        <SettingsSection
          icon={<Bell className="h-5 w-5" />}
          title="Notifications"
          description="Manage your notification preferences"
        >
          <div className="space-y-3 mt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Activity Updates</p>
                <p className="text-sm text-muted-foreground">Get notified about new activities</p>
              </div>
              <Switch id="activity-updates" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Health Reminders</p>
                <p className="text-sm text-muted-foreground">Receive reminders about your dog's health</p>
              </div>
              <Switch id="health-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Community Interactions</p>
                <p className="text-sm text-muted-foreground">Get notified about likes and comments</p>
              </div>
              <Switch id="community-interactions" defaultChecked />
            </div>
          </div>
        </SettingsSection>

        {/* Security */}
        <SettingsSection
          icon={<Shield className="h-5 w-5" />}
          title="Security"
          description="Protect your account"
        >
          <div className="space-y-4 mt-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast({
                title: "Feature coming soon",
                description: "Password change functionality will be available soon"
              })}
            >
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch id="two-factor" />
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast({
                title: "Feature coming soon",
                description: "Session management will be available in future updates"
              })}
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              Manage Active Sessions
            </Button>
          </div>
        </SettingsSection>

        {/* Permissions */}
        <SettingsSection
          icon={<MapPin className="h-5 w-5" />}
          title="Permissions"
          description="Control app access to device features"
        >
          <div className="space-y-3 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="font-medium">Location Services</p>
              </div>
              <Switch id="location-permission" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Camera className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="font-medium">Camera</p>
              </div>
              <Switch id="camera-permission" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Microphone className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="font-medium">Microphone</p>
              </div>
              <Switch id="microphone-permission" />
            </div>
          </div>
        </SettingsSection>

        {/* Language */}
        <SettingsSection
          icon={<Languages className="h-5 w-5" />}
          title="Language"
          description="Select your preferred language"
        >
          <RadioGroup defaultValue="english" className="mt-2">
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="english" id="english" />
              <Label htmlFor="english">English</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="spanish" id="spanish" />
              <Label htmlFor="spanish">Español</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="french" id="french" />
              <Label htmlFor="french">Français</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="german" id="german" />
              <Label htmlFor="german">Deutsch</Label>
            </div>
          </RadioGroup>
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection
          icon={<Shield className="h-5 w-5" />}
          title="Privacy"
          description="Manage your data and privacy preferences"
        >
          <div className="space-y-3 mt-2">
            <p className="text-sm font-medium mb-2">Data Sharing Preferences</p>
            <ToggleGroup type="multiple" defaultValue={["activity"]} className="flex flex-wrap gap-2">
              <ToggleGroupItem value="activity" className="text-xs">
                Activity Data
              </ToggleGroupItem>
              <ToggleGroupItem value="health" className="text-xs">
                Health Stats
              </ToggleGroupItem>
              <ToggleGroupItem value="location" className="text-xs">
                Location
              </ToggleGroupItem>
              <ToggleGroupItem value="photos" className="text-xs">
                Photos
              </ToggleGroupItem>
            </ToggleGroup>
            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs"
                onClick={() => toast({
                  title: "Privacy Policy",
                  description: "Privacy policy would open in a new view"
                })}
              >
                Review Privacy Policy
              </Button>
            </div>
          </div>
        </SettingsSection>

        {/* Logout */}
        <SettingsSection
          icon={<UserX className="h-5 w-5" />}
          title="Logout"
          description="Securely sign out from your account"
          onClick={confirmLogout}
          className="bg-red-50 hover:bg-red-100 transition-colors"
        />
      </div>
    </div>
  );
};

export default SettingsPage;
