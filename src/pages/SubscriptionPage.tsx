
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ChartBar, Activity, Heart, Smartphone, BarChart3, Timer, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = () => {
    // This would connect to a payment processor in a real application
    toast({
      title: "Subscription started",
      description: "You would be directed to payment processing in a real app.",
      duration: 3000,
    });
  };

  const features = [
    {
      icon: <ChartBar className="h-5 w-5 text-forest" />,
      name: "Advanced Analytics",
      description: "Interactive charts for speed, elevation, and cadence tracking"
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-forest" />,
      name: "Activity Comparison",
      description: "Compare multiple activities side by side with detailed metrics"
    },
    {
      icon: <Heart className="h-5 w-5 text-forest" />,
      name: "Dog Health Alerts",
      description: "Veterinary reminders and heart rate threshold monitoring"
    },
    {
      icon: <Smartphone className="h-5 w-5 text-forest" />,
      name: "Device Integration",
      description: "Connect with smartwatches and GPS trackers for dogs"
    },
    {
      icon: <Activity className="h-5 w-5 text-forest" />,
      name: "Health Insights",
      description: "Long-term health trend analysis for you and your dogs"
    },
    {
      icon: <Timer className="h-5 w-5 text-forest" />,
      name: "Training Programs",
      description: "Access to premium training routines and plans"
    },
    {
      icon: <Shield className="h-5 w-5 text-forest" />,
      name: "Priority Support",
      description: "Get answers and assistance quickly when you need it"
    },
    {
      icon: <Zap className="h-5 w-5 text-forest" />,
      name: "Early Access",
      description: "Be the first to try new features and improvements"
    }
  ];

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
          <h1 className="text-xl font-bold">Premium Subscription</h1>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Hero section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Unlock Premium Features</h2>
          <p className="text-muted-foreground">
            Take your running experience with your dogs to the next level
          </p>
        </div>

        {/* Main subscription card */}
        <Card className="mb-6 border-2 border-primary shadow-lg">
          <CardHeader className="pb-3 text-center bg-primary/5 border-b border-primary/20">
            <CardTitle className="text-2xl text-primary">Premium Plan</CardTitle>
            <CardDescription>All the advanced features you need</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-baseline">
                <span className="text-4xl font-bold">€6.99</span>
                <span className="text-lg text-muted-foreground ml-1">/month</span>
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.name}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full py-6 text-lg shadow-md hover:shadow-lg transition-all"
              onClick={handleSubscribe}
            >
              Subscribe Now
            </Button>
          </CardFooter>
        </Card>

        {/* Highlights section */}
        <div className="space-y-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <Check className="h-5 w-5 mr-2 text-primary" />
              Advanced Analytics
            </h3>
            <p className="text-sm text-muted-foreground">
              Track your performance with detailed charts and visualizations. Analyze your speed, 
              elevation, cadence, and more to optimize your training.
            </p>
            <div className="mt-3 bg-white p-2 rounded border">
              <img 
                src="https://placehold.co/600x300/e6f7ff/0066cc?text=Analytics+Charts+Preview" 
                alt="Analytics Preview" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <Check className="h-5 w-5 mr-2 text-primary" />
              Dog Health Monitoring
            </h3>
            <p className="text-sm text-muted-foreground">
              Receive health alerts, track heart rate patterns, and get veterinary reminders. 
              Keep your dogs in optimal condition for all your adventures together.
            </p>
            <div className="mt-3 bg-white p-2 rounded border">
              <img 
                src="https://placehold.co/600x300/fff5e6/ff9900?text=Health+Monitoring+Preview" 
                alt="Health Monitoring Preview" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>

        {/* FAQs or additional information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold">Can I cancel anytime?</h4>
              <p className="text-sm text-muted-foreground">Yes, you can cancel your subscription at any time with no cancellation fees.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold">How do I get started?</h4>
              <p className="text-sm text-muted-foreground">Click the "Subscribe Now" button, complete the payment process, and immediately get access to all premium features.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold">What payment methods are accepted?</h4>
              <p className="text-sm text-muted-foreground">We accept credit/debit cards and PayPal for your convenience.</p>
            </div>
          </CardContent>
        </Card>

        {/* Additional benefits */}
        <div className="mt-8 text-center">
          <Button 
            size="lg" 
            className="py-6 px-8 text-lg shadow-md hover:shadow-lg transition-all"
            onClick={handleSubscribe}
          >
            Start Your Premium Experience
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            No commitment. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
