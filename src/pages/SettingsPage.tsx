
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  Shield, 
  MapPin, 
  Camera, 
  Mic, 
  Languages, 
  ShieldCheck, 
  Lock, 
  UserX, 
  Settings, 
  ArrowLeft,
  Crown,
  Sparkles,
  ChevronRight,
  Heart,
  Watch,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import SettingsSection from "@/components/SettingsSection";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  interval: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  highlighted?: boolean;
}

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<'free' | 'premium' | 'pro'>('free');
  const [showPlanDialog, setShowPlanDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Mock subscription status - in a real app, this would come from your API
    // Check local storage for demo purposes
    const savedStatus = localStorage.getItem('pup_runner_subscription');
    if (savedStatus) {
      setSubscriptionStatus(savedStatus as 'free' | 'premium' | 'pro');
    }
  }, []);

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

  const plans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      interval: "/month",
      description: "Basic features for casual dog runners",
      features: [
        "Track up to 5 runs per month",
        "Basic activity statistics",
        "Single dog profile"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: "$9.99",
      interval: "/month",
      description: "Advanced features for dedicated dog runners",
      features: [
        "Unlimited activity tracking",
        "Advanced analytics and charts",
        "Up to 3 dog profiles",
        "Health alerts and reminders",
        "Data export options"
      ],
      isPopular: true,
      highlighted: true
    },
    {
      id: "pro",
      name: "Pro",
      price: "$19.99",
      interval: "/month",
      description: "Ultimate experience for professional trainers",
      features: [
        "All Premium features",
        "Unlimited dog profiles",
        "Wearable device integration",
        "Side-by-side activity comparison",
        "Priority support",
        "Custom training plans"
      ]
    }
  ];

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowConfirmation(true);
  };

  const handleConfirmSubscription = () => {
    if (selectedPlan) {
      // In a real app, this would integrate with a payment provider
      localStorage.setItem('pup_runner_subscription', selectedPlan.id);
      setSubscriptionStatus(selectedPlan.id as 'free' | 'premium' | 'pro');
      setShowConfirmation(false);
      setShowPlanDialog(false);
      
      toast({
        title: "Subscription updated!",
        description: `You're now on the ${selectedPlan.name} plan.`,
        variant: "default",
      });
    }
  };

  const handleManageSubscription = () => {
    setShowPlanDialog(true);
  };

  const isPremium = subscriptionStatus === 'premium' || subscriptionStatus === 'pro';
  const isPro = subscriptionStatus === 'pro';

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
        {/* Premium Subscription */}
        <SettingsSection
          icon={<Crown className="h-5 w-5" />}
          title="Premium Subscription"
          description={
            isPremium ? 
            `You're on the ${subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1)} plan` : 
            "Unlock advanced features and analytics"
          }
          onClick={handleManageSubscription}
          className={isPremium ? "bg-amber-50 border border-amber-200" : ""}
        >
          {isPremium ? (
            <div className="mt-2 flex items-center justify-between">
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 flex items-center">
                <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
                {subscriptionStatus.toUpperCase()}
              </Badge>
              <Button 
                size="sm" 
                onClick={handleManageSubscription}
                className="text-xs"
              >
                Manage Subscription
              </Button>
            </div>
          ) : null}
        </SettingsSection>

        {/* Premium Features - only displayed for premium/pro users */}
        {isPremium && (
          <SettingsSection
            icon={<Sparkles className="h-5 w-5" />}
            title="Premium Features"
            description="Access your premium features"
          >
            <div className="space-y-3 mt-2">
              <div 
                className="flex items-center justify-between p-3 bg-white rounded-lg border cursor-pointer hover:bg-gray-50"
                onClick={() => navigate("/analytics")}
              >
                <div className="flex items-center">
                  <div className="bg-forest/10 p-2 rounded-full mr-3">
                    <Heart className="h-4 w-4 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium">Advanced Analytics</p>
                    <p className="text-sm text-muted-foreground">Interactive charts and detailed metrics</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>

              {isPro && (
                <div 
                  className="flex items-center justify-between p-3 bg-white rounded-lg border cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate("/compare")}
                >
                  <div className="flex items-center">
                    <div className="bg-forest/10 p-2 rounded-full mr-3">
                      <Heart className="h-4 w-4 text-forest" />
                    </div>
                    <div>
                      <p className="font-medium">Activity Comparison</p>
                      <p className="text-sm text-muted-foreground">Compare multiple activities side by side</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              )}

              <div 
                className="flex items-center justify-between p-3 bg-white rounded-lg border cursor-pointer hover:bg-gray-50"
                onClick={() => navigate("/health-alerts")}
              >
                <div className="flex items-center">
                  <div className="bg-forest/10 p-2 rounded-full mr-3">
                    <Heart className="h-4 w-4 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium">Health Alerts</p>
                    <p className="text-sm text-muted-foreground">Veterinary reminders and health monitoring</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>

              {isPro && (
                <div 
                  className="flex items-center justify-between p-3 bg-white rounded-lg border cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate("/devices")}
                >
                  <div className="flex items-center">
                    <div className="bg-forest/10 p-2 rounded-full mr-3">
                      <Smartphone className="h-4 w-4 text-forest" />
                    </div>
                    <div>
                      <p className="font-medium">Device Integration</p>
                      <p className="text-sm text-muted-foreground">Connect smartwatches and dog GPS trackers</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          </SettingsSection>
        )}

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
                <Mic className="h-4 w-4 mr-2 text-muted-foreground" />
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

      {/* Subscription Plans Dialog */}
      <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center">
              <Crown className="mr-2 h-5 w-5 text-amber-500" />
              Subscription Plans
            </DialogTitle>
            <DialogDescription>
              Choose the best plan for your dog running adventures
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`p-4 relative flex flex-col ${
                    plan.highlighted ? 'border-amber-300 shadow-lg' : ''
                  } ${subscriptionStatus === plan.id ? 'ring-2 ring-forest' : ''}`}
                >
                  {plan.isPopular && (
                    <Badge className="absolute top-2 right-2 bg-amber-100 text-amber-800 border-0">
                      Popular
                    </Badge>
                  )}
                  {subscriptionStatus === plan.id && (
                    <Badge className="absolute top-2 right-2 bg-forest text-white border-0">
                      Current
                    </Badge>
                  )}
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.interval}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <ul className="space-y-2 mb-auto">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <div className="mr-2 mt-0.5 bg-green-100 rounded-full p-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="mt-4 w-full"
                    variant={subscriptionStatus === plan.id ? "outline" : plan.highlighted ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan)}
                    disabled={subscriptionStatus === plan.id}
                  >
                    {subscriptionStatus === plan.id ? "Current Plan" : "Select Plan"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Subscription</DialogTitle>
            <DialogDescription>
              {selectedPlan && `You are about to subscribe to the ${selectedPlan.name} plan for ${selectedPlan.price}${selectedPlan.interval}.`}
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>Cancel</Button>
            <Button onClick={handleConfirmSubscription}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPage;
