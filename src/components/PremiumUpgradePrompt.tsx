
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PremiumUpgradePrompt = () => {
  const navigate = useNavigate();

  return (
    <Card className="border-dashed border-primary/50 bg-primary/5">
      <CardContent className="pt-6 pb-6 text-center">
        <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary opacity-80" />
        <h3 className="text-lg font-semibold mb-2">Recommandations d'Activités Personnalisées</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Obtenez des recommandations basées sur l'IA selon votre historique d'activités et les préférences de votre chien.
        </p>
        <Button 
          onClick={() => navigate('/subscription')}
          className="mt-2"
        >
          Passer à Premium
        </Button>
      </CardContent>
    </Card>
  );
};

export default PremiumUpgradePrompt;
