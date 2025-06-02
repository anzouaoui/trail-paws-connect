
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, ChartBar, BarChart3, Heart, Smartphone, Activity, Timer, Shield, Zap, CheckCircle, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PremiumFeaturesGuide = () => {
  const navigate = useNavigate();

  const premiumFeatures = [
    {
      id: 1,
      title: "Analyses Avancées",
      description: "Graphiques interactifs et analyses détaillées de vos performances",
      icon: <ChartBar className="h-6 w-6" />,
      details: [
        "Graphiques de vitesse en temps réel",
        "Analyse de l'altitude et du dénivelé",
        "Suivi de la cadence de course",
        "Zones de fréquence cardiaque détaillées",
        "Comparaison historique des performances",
        "Export des données pour analyse externe"
      ],
      category: "Analyse"
    },
    {
      id: 2,
      title: "Comparaison d'Activités",
      description: "Comparez plusieurs activités côte à côte avec des métriques détaillées",
      icon: <BarChart3 className="h-6 w-6" />,
      details: [
        "Comparaison visuelle de 2 à 4 activités",
        "Métriques côte à côte (temps, distance, vitesse)",
        "Analyse des tendances de progression",
        "Identification des points d'amélioration",
        "Graphiques superposés pour visualisation",
        "Rapports de performance personnalisés"
      ],
      category: "Analyse"
    },
    {
      id: 3,
      title: "Alertes Santé Chien",
      description: "Surveillance avancée de la santé et du bien-être de vos chiens",
      icon: <Heart className="h-6 w-6" />,
      details: [
        "Rappels automatiques de rendez-vous vétérinaires",
        "Suivi des vaccinations et traitements",
        "Surveillance de la fréquence cardiaque",
        "Alertes de fatigue et de surmenage",
        "Historique médical complet",
        "Recommandations personnalisées de repos"
      ],
      category: "Santé"
    },
    {
      id: 4,
      title: "Intégration d'Appareils",
      description: "Connectez vos montres connectées et trackers GPS",
      icon: <Smartphone className="h-6 w-6" />,
      details: [
        "Synchronisation avec Apple Watch et Garmin",
        "Intégration des trackers GPS pour chiens",
        "Import automatique des données d'activité",
        "Calibration automatique des capteurs",
        "Synchronisation en temps réel",
        "Support multi-appareils simultané"
      ],
      category: "Technologie"
    },
    {
      id: 5,
      title: "Insights Santé",
      description: "Analyse des tendances de santé à long terme",
      icon: <Activity className="h-6 w-6" />,
      details: [
        "Analyse des tendances de performance",
        "Prédiction des risques de blessure",
        "Recommandations d'entraînement personnalisées",
        "Suivi de la récupération",
        "Conseils nutritionnels adaptés",
        "Rapports mensuels de progression"
      ],
      category: "Santé"
    },
    {
      id: 6,
      title: "Programmes d'Entraînement",
      description: "Accès aux routines et plans d'entraînement premium",
      icon: <Timer className="h-6 w-6" />,
      details: [
        "Plans d'entraînement personnalisés",
        "Programmes spécialisés par race de chien",
        "Entraînements adaptatifs selon les progrès",
        "Sessions guidées avec instructions vocales",
        "Objectifs progressifs et motivants",
        "Conseils d'experts en sports canins"
      ],
      category: "Entraînement"
    },
    {
      id: 7,
      title: "Support Prioritaire",
      description: "Assistance dédiée et réponse rapide",
      icon: <Shield className="h-6 w-6" />,
      details: [
        "Chat en direct prioritaire",
        "Réponse email sous 2h en semaine",
        "Assistance téléphonique dédiée",
        "Accès aux experts vétérinaires",
        "Support technique avancé",
        "Formation personnalisée à l'utilisation"
      ],
      category: "Support"
    },
    {
      id: 8,
      title: "Accès Anticipé",
      description: "Découvrez les nouvelles fonctionnalités en avant-première",
      icon: <Zap className="h-6 w-6" />,
      details: [
        "Beta testing des nouvelles fonctionnalités",
        "Influence sur le développement de l'app",
        "Feedback direct avec l'équipe de développement",
        "Accès aux versions de test",
        "Priorité sur les demandes de fonctionnalités",
        "Communauté exclusive de beta testeurs"
      ],
      category: "Exclusivité"
    }
  ];

  const categories = ["Analyse", "Santé", "Technologie", "Entraînement", "Support", "Exclusivité"];
  const categoryColors = {
    "Analyse": "bg-blue-50 border-blue-200",
    "Santé": "bg-green-50 border-green-200",
    "Technologie": "bg-purple-50 border-purple-200",
    "Entraînement": "bg-orange-50 border-orange-200",
    "Support": "bg-indigo-50 border-indigo-200",
    "Exclusivité": "bg-pink-50 border-pink-200"
  };

  const getFeaturesByCategory = (category: string) => {
    return premiumFeatures.filter(feature => feature.category === category);
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
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Fonctionnalités Premium</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Introduction */}
        <Card className="bg-gradient-to-r from-forest/10 to-forest/5 border-forest/20">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-forest/10 p-3 rounded-full mr-4">
                <Crown className="h-8 w-8 text-forest" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Découvrez DogRunner Premium</h2>
                <p className="text-muted-foreground">Débloquez tout le potentiel de l'application</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              L'abonnement Premium vous donne accès à des fonctionnalités avancées pour optimiser 
              vos entraînements, surveiller la santé de vos chiens et profiter d'une expérience 
              personnalisée unique.
            </p>
            <Button 
              className="bg-forest hover:bg-forest/90"
              onClick={() => navigate("/subscription")}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Découvrir l'abonnement Premium
            </Button>
          </CardContent>
        </Card>

        {/* Features by Category */}
        {categories.map((category) => {
          const categoryFeatures = getFeaturesByCategory(category);
          if (categoryFeatures.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${category === 'Analyse' ? 'bg-blue-500' : 
                  category === 'Santé' ? 'bg-green-500' : 
                  category === 'Technologie' ? 'bg-purple-500' : 
                  category === 'Entraînement' ? 'bg-orange-500' : 
                  category === 'Support' ? 'bg-indigo-500' : 'bg-pink-500'}`} />
                {category}
              </h3>
              
              <div className="space-y-4">
                {categoryFeatures.map((feature) => (
                  <Card key={feature.id} className={categoryColors[feature.category as keyof typeof categoryColors]}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-base">
                        <div className="bg-white/80 p-2 rounded-full mr-3 text-forest">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground font-normal">{feature.description}</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 gap-2">
                        {feature.details.map((detail, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {category !== categories[categories.length - 1] && <Separator className="my-6" />}
            </div>
          );
        })}

        <Separator />

        {/* Pricing Reminder */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Prêt à passer au niveau supérieur ?</h3>
            <p className="text-muted-foreground mb-4">
              Toutes ces fonctionnalités premium pour seulement <span className="font-bold text-primary">6,99€/mois</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => navigate("/subscription")}
              >
                <Crown className="h-4 w-4 mr-2" />
                S'abonner maintenant
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/help-support")}
              >
                Retour à l'aide
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Premium */}
        <Card>
          <CardHeader>
            <CardTitle>Questions sur Premium</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">Puis-je essayer Premium gratuitement ?</h4>
              <p className="text-sm text-muted-foreground">
                Oui, nous offrons un essai gratuit de 7 jours pour découvrir toutes les fonctionnalités Premium.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-1">Que se passe-t-il si j'annule ?</h4>
              <p className="text-sm text-muted-foreground">
                Vous gardez l'accès aux fonctionnalités Premium jusqu'à la fin de votre période de facturation, 
                puis revenez automatiquement au plan gratuit.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-1">Les données Premium sont-elles sauvegardées ?</h4>
              <p className="text-sm text-muted-foreground">
                Toutes vos données restent accessibles même après annulation, 
                mais certaines analyses avancées nécessitent un abonnement actif.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PremiumFeaturesGuide;
