
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
      title: "Abonnement commencé",
      description: "Vous seriez redirigé vers le processus de paiement dans une vraie application.",
      duration: 3000,
    });
  };

  const features = [
    {
      icon: <ChartBar className="h-5 w-5 text-forest" />,
      name: "Analyses Avancées",
      description: "Graphiques interactifs pour le suivi de la vitesse, de l'altitude et de la cadence"
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-forest" />,
      name: "Comparaison d'Activités",
      description: "Comparez plusieurs activités côte à côte avec des métriques détaillées"
    },
    {
      icon: <Heart className="h-5 w-5 text-forest" />,
      name: "Alertes Santé Chien",
      description: "Rappels vétérinaires et surveillance des seuils de fréquence cardiaque"
    },
    {
      icon: <Smartphone className="h-5 w-5 text-forest" />,
      name: "Intégration d'Appareils",
      description: "Connectez-vous avec des montres connectées et des trackers GPS pour chiens"
    },
    {
      icon: <Activity className="h-5 w-5 text-forest" />,
      name: "Insights Santé",
      description: "Analyse des tendances de santé à long terme pour vous et vos chiens"
    },
    {
      icon: <Timer className="h-5 w-5 text-forest" />,
      name: "Programmes d'Entraînement",
      description: "Accès aux routines et plans d'entraînement premium"
    },
    {
      icon: <Shield className="h-5 w-5 text-forest" />,
      name: "Support Prioritaire",
      description: "Obtenez des réponses et de l'aide rapidement quand vous en avez besoin"
    },
    {
      icon: <Zap className="h-5 w-5 text-forest" />,
      name: "Accès Anticipé",
      description: "Soyez le premier à essayer les nouvelles fonctionnalités et améliorations"
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
          <h1 className="text-xl font-bold">Abonnement Premium</h1>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Hero section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Débloquez les Fonctionnalités Premium</h2>
          <p className="text-muted-foreground">
            Portez votre expérience de course avec vos chiens au niveau supérieur
          </p>
        </div>

        {/* Main subscription card */}
        <Card className="mb-6 border-2 border-primary shadow-lg">
          <CardHeader className="pb-3 text-center bg-primary/5 border-b border-primary/20">
            <CardTitle className="text-2xl text-primary">Plan Premium</CardTitle>
            <CardDescription>Toutes les fonctionnalités avancées dont vous avez besoin</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-baseline">
                <span className="text-4xl font-bold">6,99 €</span>
                <span className="text-lg text-muted-foreground ml-1">/mois</span>
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
              S'abonner Maintenant
            </Button>
          </CardFooter>
        </Card>

        {/* Highlights section */}
        <div className="space-y-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <Check className="h-5 w-5 mr-2 text-primary" />
              Analyses Avancées
            </h3>
            <p className="text-sm text-muted-foreground">
              Suivez vos performances avec des graphiques et visualisations détaillés. Analysez votre vitesse, 
              altitude, cadence et plus pour optimiser votre entraînement.
            </p>
            <div className="mt-3 bg-white p-2 rounded border">
              <img 
                src="https://placehold.co/600x300/e6f7ff/0066cc?text=Aperçu+Graphiques+Analytics" 
                alt="Aperçu Analytics" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <Check className="h-5 w-5 mr-2 text-primary" />
              Surveillance Santé Chien
            </h3>
            <p className="text-sm text-muted-foreground">
              Recevez des alertes santé, suivez les patterns de fréquence cardiaque et obtenez des rappels vétérinaires. 
              Gardez vos chiens en condition optimale pour toutes vos aventures ensemble.
            </p>
            <div className="mt-3 bg-white p-2 rounded border">
              <img 
                src="https://placehold.co/600x300/fff5e6/ff9900?text=Aperçu+Surveillance+Santé" 
                alt="Aperçu Surveillance Santé" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>

        {/* FAQs or additional information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl">Questions Fréquemment Posées</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold">Puis-je annuler à tout moment ?</h4>
              <p className="text-sm text-muted-foreground">Oui, vous pouvez annuler votre abonnement à tout moment sans frais d'annulation.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold">Comment commencer ?</h4>
              <p className="text-sm text-muted-foreground">Cliquez sur le bouton "S'abonner Maintenant", complétez le processus de paiement et obtenez immédiatement accès à toutes les fonctionnalités premium.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold">Quels moyens de paiement sont acceptés ?</h4>
              <p className="text-sm text-muted-foreground">Nous acceptons les cartes de crédit/débit et PayPal pour votre convenance.</p>
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
            Commencez Votre Expérience Premium
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Aucun engagement. Annulez à tout moment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
